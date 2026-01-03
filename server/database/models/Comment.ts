import { Model, RelationMappingsThunk } from 'objection'
import { BaseModel } from './BaseModel'
import { Film } from './Film'

export class Comment extends BaseModel {
  static tableName = 'comments'

  id!: number
  film_id!: number
  author_name!: string
  content!: string
  comment_date!: Date | null
  parent_id!: number | null
  is_approved!: boolean

  // Relations
  film?: Film
  parent?: Comment
  replies?: Comment[]

  static relationMappings: RelationMappingsThunk = () => ({
    film: {
      relation: Model.BelongsToOneRelation,
      modelClass: Film,
      join: {
        from: 'comments.film_id',
        to: 'films.id'
      }
    },
    parent: {
      relation: Model.BelongsToOneRelation,
      modelClass: Comment,
      join: {
        from: 'comments.parent_id',
        to: 'comments.id'
      }
    },
    replies: {
      relation: Model.HasManyRelation,
      modelClass: Comment,
      join: {
        from: 'comments.id',
        to: 'comments.parent_id'
      }
    }
  })
}

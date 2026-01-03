import { Model, RelationMappingsThunk } from 'objection'
import { BaseModel } from './BaseModel'
import { Film } from './Film'

export class Genre extends BaseModel {
  static tableName = 'genres'

  id!: number
  name!: string
  slug!: string

  // Relations
  films?: Film[]

  static relationMappings: RelationMappingsThunk = () => ({
    films: {
      relation: Model.ManyToManyRelation,
      modelClass: Film,
      join: {
        from: 'genres.id',
        through: {
          from: 'film_genres.genre_id',
          to: 'film_genres.film_id'
        },
        to: 'films.id'
      }
    }
  })
}

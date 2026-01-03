import { Model, RelationMappingsThunk } from 'objection'
import { BaseModel } from './BaseModel'
import { Film } from './Film'
import { Source } from './Source'

export class FilmSource extends BaseModel {
  static tableName = 'film_sources'

  id!: number
  name!: string
  film_id!: number
  source_id!: number
  priority!: number
  embed!: string | null
  quality!: string | null
  status!: boolean

  // Relations
  film?: Film
  source?: Source

  static relationMappings: RelationMappingsThunk = () => ({
    film: {
      relation: Model.BelongsToOneRelation,
      modelClass: Film,
      join: {
        from: 'film_sources.film_id',
        to: 'films.id'
      }
    },
    source: {
      relation: Model.BelongsToOneRelation,
      modelClass: Source,
      join: {
        from: 'film_sources.source_id',
        to: 'sources.id'
      }
    }
  })
}

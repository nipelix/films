import { Model, RelationMappingsThunk } from 'objection'
import { BaseModel } from './BaseModel'
import { Film } from './Film'

export class Country extends BaseModel {
  static tableName = 'countries'

  id!: number
  code!: string
  name!: string
  flag!: string | null

  // Relations
  films?: Film[]

  static relationMappings: RelationMappingsThunk = () => ({
    films: {
      relation: Model.ManyToManyRelation,
      modelClass: Film,
      join: {
        from: 'countries.id',
        through: {
          from: 'film_countries.country_id',
          to: 'film_countries.film_id'
        },
        to: 'films.id'
      }
    }
  })
}

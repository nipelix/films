import { Model, RelationMappingsThunk } from 'objection'
import { BaseModel } from './BaseModel'
import { Film } from './Film'

export class Director extends BaseModel {
  static tableName = 'directors'

  id!: number
  imdb_id!: string
  tmdb_id!: number | null
  name!: string
  slug!: string
  profile_path!: string | null
  poster!: string | null

  // Relations
  films?: Film[]

  static relationMappings: RelationMappingsThunk = () => ({
    films: {
      relation: Model.ManyToManyRelation,
      modelClass: Film,
      join: {
        from: 'directors.id',
        through: {
          from: 'film_directors.director_id',
          to: 'film_directors.film_id'
        },
        to: 'films.id'
      }
    }
  })
}

import { Model, RelationMappingsThunk } from 'objection'
import { BaseModel } from './BaseModel'
import { Film } from './Film'

export class Actor extends BaseModel {
  static tableName = 'actors'

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
        from: 'actors.id',
        through: {
          from: 'film_actors.actor_id',
          to: 'film_actors.film_id',
          extra: ['character_name', 'order']
        },
        to: 'films.id'
      }
    }
  })
}

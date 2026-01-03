import { Model, RelationMappings, RelationMappingsThunk } from 'objection'
import { BaseModel } from './BaseModel'
import { Genre } from './Genre'
import { Country } from './Country'
import { Actor } from './Actor'
import { Director } from './Director'
import { Comment } from './Comment'
import { LanguageType } from './LanguageType'
import { FilmSource } from './FilmSource'

export class Film extends BaseModel {
  static tableName = 'films'

  id!: number
  imdb_id!: string
  tmdb_id!: number | null
  title!: string
  original_title!: string | null
  slug!: string
  year!: string | null
  imdb_rating!: number | null
  rating_count!: number | null
  runtime!: number | null
  ozet!: string | null
  poster!: string | null
  certification!: string | null
  page_title!: string | null
  page_description!: string | null
  date_published!: Date | null
  upload_date!: Date | null
  is_featured!: boolean
  featured_order!: number

  // Relations
  genres?: Genre[]
  countries?: Country[]
  actors?: Actor[]
  directors?: Director[]
  comments?: Comment[]
  languageTypes?: LanguageType[]
  sources?: FilmSource[]

  static relationMappings: RelationMappingsThunk = () => ({
    genres: {
      relation: Model.ManyToManyRelation,
      modelClass: Genre,
      join: {
        from: 'films.id',
        through: {
          from: 'film_genres.film_id',
          to: 'film_genres.genre_id'
        },
        to: 'genres.id'
      }
    },
    countries: {
      relation: Model.ManyToManyRelation,
      modelClass: Country,
      join: {
        from: 'films.id',
        through: {
          from: 'film_countries.film_id',
          to: 'film_countries.country_id'
        },
        to: 'countries.id'
      }
    },
    actors: {
      relation: Model.ManyToManyRelation,
      modelClass: Actor,
      join: {
        from: 'films.id',
        through: {
          from: 'film_actors.film_id',
          to: 'film_actors.actor_id',
          extra: ['character_name', 'order']
        },
        to: 'actors.id'
      }
    },
    directors: {
      relation: Model.ManyToManyRelation,
      modelClass: Director,
      join: {
        from: 'films.id',
        through: {
          from: 'film_directors.film_id',
          to: 'film_directors.director_id'
        },
        to: 'directors.id'
      }
    },
    comments: {
      relation: Model.HasManyRelation,
      modelClass: Comment,
      join: {
        from: 'films.id',
        to: 'comments.film_id'
      }
    },
    languageTypes: {
      relation: Model.ManyToManyRelation,
      modelClass: LanguageType,
      join: {
        from: 'films.id',
        through: {
          from: 'film_language_types.film_id',
          to: 'film_language_types.language_type_id'
        },
        to: 'language_types.id'
      }
    },
    sources: {
      relation: Model.HasManyRelation,
      modelClass: FilmSource,
      join: {
        from: 'films.id',
        to: 'film_sources.film_id'
      }
    }
  })
}

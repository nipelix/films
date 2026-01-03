import { Model } from 'objection'
import { BaseModel } from './BaseModel'
import { Film } from './Film'

export class LanguageType extends BaseModel {
  static tableName = 'language_types'

  id!: number
  name!: string
  slug!: string
  color!: string
  badge_text!: string
  order!: number
  is_active!: boolean

  // Relations
  films?: Film[]

  static relationMappings = () => ({
    films: {
      relation: Model.ManyToManyRelation,
      modelClass: Film,
      join: {
        from: 'language_types.id',
        through: {
          from: 'film_language_types.language_type_id',
          to: 'film_language_types.film_id'
        },
        to: 'films.id'
      }
    }
  })

  // Aktif dil tiplerini getir
  static async getActive() {
    return this.query()
      .where('is_active', true)
      .orderBy('order', 'asc')
  }
}

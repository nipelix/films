import { Model } from 'objection'
import { BaseModel } from './BaseModel'
import { Film } from './Film'

export class FilmView extends BaseModel {
  static tableName = 'film_views'

  id!: number
  film_id!: number
  view_date!: string
  view_count!: number

  // Relations
  film?: Film

  static relationMappings = () => ({
    film: {
      relation: Model.BelongsToOneRelation,
      modelClass: Film,
      join: {
        from: 'film_views.film_id',
        to: 'films.id'
      }
    }
  })

  // Film izlenmesini kaydet veya güncelle
  static async trackView(filmId: number): Promise<void> {
    const today = new Date().toISOString().split('T')[0]

    // Upsert: varsa güncelle, yoksa ekle
    const existing = await this.query()
      .where('film_id', filmId)
      .where('view_date', today)
      .first()

    if (existing) {
      await this.query()
        .where('id', existing.id)
        .patch({ view_count: existing.view_count + 1 })
    } else {
      await this.query().insert({
        film_id: filmId,
        view_date: today,
        view_count: 1
      })
    }
  }

  // Bugünün trend filmleri
  static async getTodayTrending(limit: number = 5) {
    const today = new Date().toISOString().split('T')[0]

    return this.query()
      .select('film_views.*')
      .withGraphFetched('film.[genres]')
      .where('view_date', today)
      .orderBy('view_count', 'desc')
      .limit(limit)
  }

  // Son X günün trend filmleri
  static async getTrending(days: number = 7, limit: number = 5) {
    const startDate = new Date()
    startDate.setDate(startDate.getDate() - days)
    const startDateStr = startDate.toISOString().split('T')[0]

    const result = await FilmView.knex().raw(`
      SELECT
        f.id, f.slug, f.title, f.original_title, f.poster, f.year, f.imdb_rating,
        SUM(fv.view_count) as total_views
      FROM film_views fv
      JOIN films f ON f.id = fv.film_id
      WHERE fv.view_date >= ?
      GROUP BY f.id
      ORDER BY total_views DESC
      LIMIT ?
    `, [startDateStr, limit])

    return result.rows || result
  }
}

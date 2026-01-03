import { Director } from '../../database/models'
import '../../database/connection'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)

  const page = parseInt(query.page as string) || 1
  const limit = parseInt(query.limit as string) || 24
  const offset = (page - 1) * limit

  // Toplam sayı
  const totalResult = await Director.query().count('id as count').first()
  const total = parseInt((totalResult as any)?.count || '0')

  // Yönetmenleri getir
  const directors = await Director.query()
    .select('directors.*')
    .count('film_directors.film_id as film_count')
    .leftJoin('film_directors', 'directors.id', 'film_directors.director_id')
    .groupBy('directors.id')
    .orderByRaw('COUNT(film_directors.film_id) DESC')
    .limit(limit)
    .offset(offset)

  return {
    data: directors,
    meta: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit)
    }
  }
})

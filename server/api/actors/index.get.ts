import { Actor } from '../../database/models'
import '../../database/connection'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)

  const page = parseInt(query.page as string) || 1
  const limit = parseInt(query.limit as string) || 24
  const offset = (page - 1) * limit
  const letter = query.letter as string

  let actorsQuery = Actor.query()
    .select('actors.*')
    .count('film_actors.film_id as film_count')
    .leftJoin('film_actors', 'actors.id', 'film_actors.actor_id')
    .groupBy('actors.id')

  // Harf filtresi
  if (letter && letter.length === 1) {
    actorsQuery = actorsQuery.where('name', 'ilike', `${letter}%`)
  }

  // Toplam sayı
  const countQuery = Actor.query()
  if (letter && letter.length === 1) {
    countQuery.where('name', 'ilike', `${letter}%`)
  }
  const totalResult = await countQuery.count('id as count').first()
  const total = parseInt((totalResult as any)?.count || '0')

  // Oyuncuları getir
  const actors = await actorsQuery
    .orderByRaw('COUNT(film_actors.film_id) DESC')
    .limit(limit)
    .offset(offset)

  return {
    data: actors,
    meta: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit)
    }
  }
})

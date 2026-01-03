import { Film } from '../../../database/models'
import '../../../database/connection'

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug')
  const limit = parseInt(getQuery(event).limit as string) || 6

  if (!slug) {
    throw createError({
      statusCode: 400,
      message: 'Film slug gerekli'
    })
  }

  // Önce filmi ve türlerini bul
  const film = await Film.query()
    .where('slug', slug)
    .withGraphFetched('genres')
    .first()

  if (!film) {
    throw createError({
      statusCode: 404,
      message: 'Film bulunamadı'
    })
  }

  const genreIds = film.genres?.map(g => g.id) || []

  if (genreIds.length === 0) {
    return { data: [] }
  }

  // Benzer filmleri bul (aynı türde olanlar)
  const similarFilms = await Film.query()
    .select('films.*')
    .joinRelated('genres')
    .whereIn('genres.id', genreIds)
    .whereNot('films.id', film.id)
    .groupBy('films.id')
    .orderByRaw('COUNT(genres.id) DESC, films.imdb_rating DESC')
    .limit(limit)

  return { data: similarFilms }
})

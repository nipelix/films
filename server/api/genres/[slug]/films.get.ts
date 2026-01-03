import { Genre, Film } from '../../../database/models'
import '../../../database/connection'

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug')
  const query = getQuery(event)

  const page = parseInt(query.page as string) || 1
  const limit = parseInt(query.limit as string) || 24
  const offset = (page - 1) * limit
  const sort = query.sort as string || 'upload_date'
  const order = query.order as string || 'desc'

  if (!slug) {
    throw createError({
      statusCode: 400,
      message: 'Genre slug gerekli'
    })
  }

  // Genre'ı bul
  const genre = await Genre.query().where('slug', slug).first()

  if (!genre) {
    throw createError({
      statusCode: 404,
      message: 'Kategori bulunamadı'
    })
  }

  // Sıralama
  const validSortFields = ['upload_date', 'imdb_rating', 'year', 'title']
  const sortField = validSortFields.includes(sort) ? sort : 'upload_date'
  const sortOrder = order === 'asc' ? 'asc' : 'desc'

  // Toplam film sayısı
  const totalResult = await Film.query()
    .joinRelated('genres')
    .where('genres.id', genre.id)
    .count('films.id as count')
    .first()

  const total = parseInt((totalResult as any)?.count || '0')

  // Filmleri getir
  const films = await Film.query()
    .select('films.*')
    .joinRelated('genres')
    .where('genres.id', genre.id)
    .withGraphFetched('[genres, countries]')
    .orderBy(`films.${sortField}`, sortOrder)
    .limit(limit)
    .offset(offset)

  return {
    genre,
    data: films,
    meta: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit)
    }
  }
})

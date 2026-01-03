import { Director } from '../../database/models'
import '../../database/connection'

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug')
  const query = getQuery(event)

  const page = parseInt(query.page as string) || 1
  const limit = parseInt(query.limit as string) || 24
  const offset = (page - 1) * limit

  if (!slug) {
    throw createError({
      statusCode: 400,
      message: 'Yönetmen slug gerekli'
    })
  }

  const director = await Director.query()
    .where('slug', slug)
    .first()

  if (!director) {
    throw createError({
      statusCode: 404,
      message: 'Yönetmen bulunamadı'
    })
  }

  // Film sayısı
  const totalResult = await director.$relatedQuery('films').count('films.id as count').first()
  const total = parseInt((totalResult as any)?.count || '0')

  // Yönetmenin filmleri
  const films = await director.$relatedQuery('films')
    .select('films.*')
    .withGraphFetched('[genres]')
    .orderBy('films.year', 'desc')
    .limit(limit)
    .offset(offset)

  return {
    director,
    films,
    meta: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit)
    }
  }
})

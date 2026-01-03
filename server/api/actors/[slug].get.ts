import { Actor } from '../../database/models'
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
      message: 'Oyuncu slug gerekli'
    })
  }

  const actor = await Actor.query()
    .where('slug', slug)
    .first()

  if (!actor) {
    throw createError({
      statusCode: 404,
      message: 'Oyuncu bulunamadı'
    })
  }

  // Film sayısı
  const totalResult = await actor.$relatedQuery('films').count('films.id as count').first()
  const total = parseInt((totalResult as any)?.count || '0')

  // Oyuncunun filmleri
  const films = await actor.$relatedQuery('films')
    .select('films.*')
    .withGraphFetched('[genres]')
    .orderBy('films.year', 'desc')
    .limit(limit)
    .offset(offset)

  return {
    actor,
    films,
    meta: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit)
    }
  }
})

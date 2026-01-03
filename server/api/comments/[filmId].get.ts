import { Comment } from '../../database/models'
import '../../database/connection'

export default defineEventHandler(async (event) => {
  const filmId = getRouterParam(event, 'filmId')
  const query = getQuery(event)

  const page = parseInt(query.page as string) || 1
  const limit = parseInt(query.limit as string) || 20
  const offset = (page - 1) * limit

  if (!filmId) {
    throw createError({
      statusCode: 400,
      message: 'Film ID gerekli'
    })
  }

  // Toplam yorum sayısı
  const totalResult = await Comment.query()
    .where('film_id', filmId)
    .where('is_approved', true)
    .whereNull('parent_id')
    .count('id as count')
    .first()

  const total = parseInt((totalResult as any)?.count || '0')

  // Yorumları getir (üst seviye yorumlar + yanıtları)
  const comments = await Comment.query()
    .where('film_id', filmId)
    .where('is_approved', true)
    .whereNull('parent_id')
    .withGraphFetched('replies(approved)')
    .modifiers({
      approved(builder) {
        builder.where('is_approved', true).orderBy('comment_date', 'asc')
      }
    })
    .orderBy('comment_date', 'desc')
    .limit(limit)
    .offset(offset)

  return {
    data: comments,
    meta: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit)
    }
  }
})

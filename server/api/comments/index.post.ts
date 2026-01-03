import { Comment, Film } from '../../database/models'
import '../../database/connection'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const { filmId, authorName, content, parentId } = body

  // Validasyon
  if (!filmId) {
    throw createError({
      statusCode: 400,
      message: 'Film ID gerekli'
    })
  }

  if (!authorName || authorName.trim().length < 2) {
    throw createError({
      statusCode: 400,
      message: 'İsim en az 2 karakter olmalı'
    })
  }

  if (!content || content.trim().length < 3) {
    throw createError({
      statusCode: 400,
      message: 'Yorum en az 3 karakter olmalı'
    })
  }

  // Film var mı kontrol et
  const film = await Film.query().findById(filmId)
  if (!film) {
    throw createError({
      statusCode: 404,
      message: 'Film bulunamadı'
    })
  }

  // Parent yorum var mı kontrol et
  if (parentId) {
    const parentComment = await Comment.query().findById(parentId)
    if (!parentComment || parentComment.film_id !== filmId) {
      throw createError({
        statusCode: 400,
        message: 'Geçersiz üst yorum'
      })
    }
  }

  // Yorum oluştur
  const comment = await Comment.query().insert({
    film_id: filmId,
    author_name: authorName.trim(),
    content: content.trim(),
    parent_id: parentId || null,
    comment_date: new Date(),
    is_approved: false // Moderasyon için false
  })

  return {
    success: true,
    message: 'Yorumunuz onay bekliyor',
    data: comment
  }
})

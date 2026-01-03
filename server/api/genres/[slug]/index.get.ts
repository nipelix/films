import { Genre } from '../../../database/models'
import '../../../database/connection'

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug')

  if (!slug) {
    throw createError({
      statusCode: 400,
      message: 'Genre slug gerekli'
    })
  }

  const genre = await Genre.query()
    .where('slug', slug)
    .first()

  if (!genre) {
    throw createError({
      statusCode: 404,
      message: 'Kategori bulunamadı'
    })
  }

  return genre
})

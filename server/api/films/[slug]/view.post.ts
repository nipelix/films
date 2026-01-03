import { Film, FilmView } from '~/server/database/models'
import '~/server/database/connection'

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug')

  if (!slug) {
    throw createError({
      statusCode: 400,
      message: 'Film slug gerekli'
    })
  }

  try {
    // Film'i bul
    const film = await Film.query()
      .select('id')
      .where('slug', slug)
      .first()

    if (!film) {
      throw createError({
        statusCode: 404,
        message: 'Film bulunamadı'
      })
    }

    // İzlenmeyi kaydet
    await FilmView.trackView(film.id)

    return {
      success: true,
      message: 'İzlenme kaydedildi'
    }
  } catch (error: any) {
    if (error.statusCode) throw error

    console.error('View tracking error:', error)
    throw createError({
      statusCode: 500,
      message: 'İzlenme kaydedilirken bir hata oluştu'
    })
  }
})

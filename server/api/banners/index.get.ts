import { Banner, BannerPosition } from '~/server/database/models'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const position = query.position as BannerPosition | undefined

  try {
    let banners

    if (position) {
      banners = await Banner.getByPosition(position)
    } else {
      // Tüm aktif bannerları getir
      const now = new Date()

      banners = await Banner.query()
        .where('is_active', true)
        .where((builder) => {
          builder
            .whereNull('start_date')
            .orWhere('start_date', '<=', now)
        })
        .where((builder) => {
          builder
            .whereNull('end_date')
            .orWhere('end_date', '>=', now)
        })
        .orderBy('position')
        .orderBy('order', 'asc')
    }

    return {
      success: true,
      data: banners
    }
  } catch (error) {
    console.error('Banners fetch error:', error)
    throw createError({
      statusCode: 500,
      message: 'Banner verileri alınırken bir hata oluştu'
    })
  }
})

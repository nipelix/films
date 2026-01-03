import { Banner } from '~/server/database/models'

export default defineEventHandler(async () => {
  try {
    const announcement = await Banner.getAnnouncement()

    return {
      success: true,
      data: announcement || null
    }
  } catch (error) {
    console.error('Announcement fetch error:', error)
    throw createError({
      statusCode: 500,
      message: 'Duyuru verisi alınırken bir hata oluştu'
    })
  }
})

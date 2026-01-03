import { LanguageType } from '../../database/models'
import '../../database/connection'

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug')

  if (!slug) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Slug gerekli'
    })
  }

  const languageType = await LanguageType.query()
    .where('slug', slug)
    .where('is_active', true)
    .first()

  if (!languageType) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Dil tipi bulunamadı'
    })
  }

  return {
    data: languageType
  }
})

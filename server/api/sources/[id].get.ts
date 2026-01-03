import { FilmSource } from '../../database/models'
import '../../database/connection'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')

  if (!id) {
    throw createError({
      statusCode: 400,
      message: 'Kaynak ID gerekli'
    })
  }

  const source = await FilmSource.query()
    .where('id', id)
    .where('status', true)
    .withGraphFetched('source')
    .first()

  if (!source) {
    throw createError({
      statusCode: 404,
      message: 'Kaynak bulunamadı'
    })
  }

  return {
    id: source.id,
    name: source.name,
    embed: source.embed,
    quality: source.quality,
    source: source.source
  }
})

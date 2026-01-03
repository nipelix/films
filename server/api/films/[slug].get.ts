import { Film } from '../../database/models'
import '../../database/connection'

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug')

  if (!slug) {
    throw createError({
      statusCode: 400,
      message: 'Film slug gerekli'
    })
  }

  const film = await Film.query()
    .where('slug', slug)
    .withGraphFetched('[genres, countries, actors(orderByOrder), directors, comments(approved), sources(activeAndOrdered).source]')
    .modifiers({
      orderByOrder(builder) {
        builder.orderBy('film_actors.order', 'asc').limit(20)
      },
      approved(builder) {
        builder.where('is_approved', true).orderBy('comment_date', 'desc')
      },
      activeAndOrdered(builder) {
        // Embed kodunu hariç tut - sadece kaynak bilgilerini döndür
        builder
          .select('id', 'name', 'film_id', 'source_id', 'priority', 'quality')
          .where('status', true)
          .orderBy('priority', 'asc')
      }
    })
    .first()

  if (!film) {
    throw createError({
      statusCode: 404,
      message: 'Film bulunamadı'
    })
  }

  return film
})

import { Film } from '../../database/models'
import '../../database/connection'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const q = query.q as string
  const limit = parseInt(query.limit as string) || 10

  if (!q || q.length < 2) {
    return { data: [] }
  }

  const films = await Film.query()
    .where('title', 'ilike', `%${q}%`)
    .orWhere('original_title', 'ilike', `%${q}%`)
    .select('id', 'title', 'original_title', 'slug', 'year', 'poster', 'imdb_rating')
    .orderBy('imdb_rating', 'desc')
    .limit(limit)

  return { data: films }
})

import { Genre } from '../../database/models'
import '../../database/connection'

export default defineEventHandler(async () => {
  const genres = await Genre.query()
    .select('genres.*')
    .count('film_genres.film_id as film_count')
    .leftJoin('film_genres', 'genres.id', 'film_genres.genre_id')
    .groupBy('genres.id')
    .orderBy('name', 'asc')

  return { data: genres }
})

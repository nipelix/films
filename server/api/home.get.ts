import { Film, Genre } from '../database/models'
import '../database/connection'

export default defineEventHandler(async () => {
  // Öne çıkan (featured) filmler - slider için
  const featuredFilms = await Film.query()
    .withGraphFetched('[genres]')
    .where('is_featured', true)
    .orderBy('featured_order', 'asc')
    .limit(10)

  // Son eklenen filmler
  const latestFilms = await Film.query()
    .withGraphFetched('[genres, countries]')
    .orderBy('upload_date', 'desc')
    .limit(12)

  // En çok izlenen filmler (rating_count'a göre)
  const popularFilms = await Film.query()
    .withGraphFetched('[genres]')
    .whereNotNull('rating_count')
    .orderBy('rating_count', 'desc')
    .limit(10)

  // En yüksek puanlı filmler
  const topRatedFilms = await Film.query()
    .withGraphFetched('[genres]')
    .whereNotNull('imdb_rating')
    .where('imdb_rating', '>=', 7)
    .orderBy('imdb_rating', 'desc')
    .limit(10)

  // Kategoriler
  const genres = await Genre.query()
    .select('genres.*')
    .count('film_genres.film_id as film_count')
    .leftJoin('film_genres', 'genres.id', 'film_genres.genre_id')
    .groupBy('genres.id')
    .orderBy('name', 'asc')

  // Toplam film sayısı
  const totalResult = await Film.query().count('id as count').first()
  const totalFilms = parseInt((totalResult as any)?.count || '0')

  return {
    featuredFilms,
    latestFilms,
    popularFilms,
    topRatedFilms,
    genres,
    stats: {
      totalFilms
    }
  }
})

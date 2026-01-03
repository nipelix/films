import type { Knex } from 'knex'
import { readFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export async function seed(knex: Knex): Promise<void> {
  // Clear existing entries
  await knex('comments').del()
  await knex('film_directors').del()
  await knex('film_actors').del()
  await knex('film_countries').del()
  await knex('film_genres').del()
  await knex('films').del()

  // Read JSON files
  const filmsData = JSON.parse(
    readFileSync(resolve(__dirname, '../../../../dd/imdb_results_son.json'), 'utf-8')
  )
  const posterData = JSON.parse(
    readFileSync(resolve(__dirname, '../../../../dd/poster.json'), 'utf-8')
  )
  const genreData = JSON.parse(
    readFileSync(resolve(__dirname, '../../../../dd/genre.json'), 'utf-8')
  )

  // Prepare films for insertion
  const films = []
  const seenTmdbIds = new Set<number>()

  for (const imdbId in filmsData) {
    const film = filmsData[imdbId]
    const poster = posterData[imdbId]?.poster || null
    const genre = genreData[imdbId]

    // tmdb_id duplicate kontrolü
    let tmdbId = film.tmdb_id || null
    if (tmdbId && seenTmdbIds.has(tmdbId)) {
      tmdbId = null // Duplicate ise null yap
    } else if (tmdbId) {
      seenTmdbIds.add(tmdbId)
    }

    films.push({
      imdb_id: film.imdb_id,
      tmdb_id: tmdbId,
      title: film.title,
      original_title: film.original_title || null,
      slug: film.slug,
      year: film.year || null,
      imdb_rating: film.imdb_rating ? parseFloat(film.imdb_rating) : null,
      rating_count: film.ratingCount || null,
      runtime: film.runtime || null,
      ozet: film.ozet || null,
      poster: poster,
      certification: genre?.certification || null,
      page_title: film.page_title || null,
      page_description: film.page_description || null,
      date_published: film.datePublished ? new Date(film.datePublished) : null,
      upload_date: film.uploadDate ? new Date(film.uploadDate) : null
    })
  }

  // Insert in batches
  const batchSize = 500
  for (let i = 0; i < films.length; i += batchSize) {
    const batch = films.slice(i, i + batchSize)
    await knex('films').insert(batch)
    console.log(`Inserted films ${i + 1} - ${Math.min(i + batchSize, films.length)}`)
  }

  console.log(`Total: Inserted ${films.length} films`)
}

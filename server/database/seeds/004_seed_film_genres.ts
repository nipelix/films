import type { Knex } from 'knex'
import { readFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export async function seed(knex: Knex): Promise<void> {
  // Clear existing entries
  await knex('film_genres').del()

  // Read genre.json
  const genreData = JSON.parse(
    readFileSync(resolve(__dirname, '../../../../dd/genre.json'), 'utf-8')
  )

  // Get film id mapping
  const films = await knex('films').select('id', 'imdb_id')
  const filmMap = new Map(films.map(f => [f.imdb_id, f.id]))

  // Prepare film_genres for insertion
  const filmGenres = []

  for (const imdbId in genreData) {
    const filmId = filmMap.get(imdbId)
    if (!filmId) continue

    const film = genreData[imdbId]
    if (film.genres) {
      for (const genre of film.genres) {
        filmGenres.push({
          film_id: filmId,
          genre_id: genre.id
        })
      }
    }
  }

  // Insert in batches
  const batchSize = 1000
  for (let i = 0; i < filmGenres.length; i += batchSize) {
    const batch = filmGenres.slice(i, i + batchSize)
    await knex('film_genres').insert(batch)
    console.log(`Inserted film_genres ${i + 1} - ${Math.min(i + batchSize, filmGenres.length)}`)
  }

  console.log(`Total: Inserted ${filmGenres.length} film-genre relations`)
}

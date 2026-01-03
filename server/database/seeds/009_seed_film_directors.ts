import type { Knex } from 'knex'
import { readFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export async function seed(knex: Knex): Promise<void> {
  // Clear existing entries
  await knex('film_directors').del()

  // Read yonetmen.json
  const directorData = JSON.parse(
    readFileSync(resolve(__dirname, '../../../../dd/yonetmen.json'), 'utf-8')
  )

  // Get film id mapping
  const films = await knex('films').select('id', 'imdb_id')
  const filmMap = new Map(films.map(f => [f.imdb_id, f.id]))

  // Get director id mapping
  const directors = await knex('directors').select('id', 'imdb_id')
  const directorMap = new Map(directors.map(d => [d.imdb_id, d.id]))

  // Prepare film_directors for insertion
  const filmDirectors = []

  for (const imdbId in directorData) {
    const filmId = filmMap.get(imdbId)
    if (!filmId) continue

    const directorList = directorData[imdbId]
    if (Array.isArray(directorList)) {
      for (const director of directorList) {
        const directorId = directorMap.get(director.imdb_id)
        if (directorId) {
          filmDirectors.push({
            film_id: filmId,
            director_id: directorId
          })
        }
      }
    }
  }

  // Insert in batches
  const batchSize = 1000
  for (let i = 0; i < filmDirectors.length; i += batchSize) {
    const batch = filmDirectors.slice(i, i + batchSize)
    await knex('film_directors').insert(batch)
    console.log(`Inserted film_directors ${i + 1} - ${Math.min(i + batchSize, filmDirectors.length)}`)
  }

  console.log(`Total: Inserted ${filmDirectors.length} film-director relations`)
}

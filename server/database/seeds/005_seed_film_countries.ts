import type { Knex } from 'knex'
import { readFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export async function seed(knex: Knex): Promise<void> {
  // Clear existing entries
  await knex('film_countries').del()

  // Read genre.json (contains country data)
  const genreData = JSON.parse(
    readFileSync(resolve(__dirname, '../../../../dd/genre.json'), 'utf-8')
  )

  // Get film id mapping
  const films = await knex('films').select('id', 'imdb_id')
  const filmMap = new Map(films.map(f => [f.imdb_id, f.id]))

  // Get country id mapping
  const countries = await knex('countries').select('id', 'code')
  const countryMap = new Map(countries.map(c => [c.code, c.id]))

  // Prepare film_countries for insertion
  const filmCountries = []

  for (const imdbId in genreData) {
    const filmId = filmMap.get(imdbId)
    if (!filmId) continue

    const film = genreData[imdbId]
    if (film.origin_country) {
      for (const country of film.origin_country) {
        const countryId = countryMap.get(country.code)
        if (countryId) {
          filmCountries.push({
            film_id: filmId,
            country_id: countryId
          })
        }
      }
    }
  }

  // Insert in batches
  const batchSize = 1000
  for (let i = 0; i < filmCountries.length; i += batchSize) {
    const batch = filmCountries.slice(i, i + batchSize)
    await knex('film_countries').insert(batch)
    console.log(`Inserted film_countries ${i + 1} - ${Math.min(i + batchSize, filmCountries.length)}`)
  }

  console.log(`Total: Inserted ${filmCountries.length} film-country relations`)
}

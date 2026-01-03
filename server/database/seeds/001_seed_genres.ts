import type { Knex } from 'knex'
import { readFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/ğ/g, 'g')
    .replace(/ü/g, 'u')
    .replace(/ş/g, 's')
    .replace(/ı/g, 'i')
    .replace(/ö/g, 'o')
    .replace(/ç/g, 'c')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export async function seed(knex: Knex): Promise<void> {
  // Clear existing entries
  await knex('film_genres').del()
  await knex('genres').del()

  // Read genre.json
  const genreData = JSON.parse(
    readFileSync(resolve(__dirname, '../../../../dd/genre.json'), 'utf-8')
  )

  // Extract unique genres
  const genreMap = new Map<number, string>()

  for (const imdbId in genreData) {
    const film = genreData[imdbId]
    if (film.genres) {
      for (const genre of film.genres) {
        if (!genreMap.has(genre.id)) {
          genreMap.set(genre.id, genre.name)
        }
      }
    }
  }

  // Insert genres
  const genres = Array.from(genreMap.entries()).map(([id, name]) => ({
    id,
    name,
    slug: slugify(name)
  }))

  if (genres.length > 0) {
    await knex('genres').insert(genres)
  }

  console.log(`Inserted ${genres.length} genres`)
}

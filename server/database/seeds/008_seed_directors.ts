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
  await knex('film_directors').del()
  await knex('directors').del()

  // Read yonetmen.json
  const directorData = JSON.parse(
    readFileSync(resolve(__dirname, '../../../../dd/yonetmen.json'), 'utf-8')
  )

  // Extract unique directors
  const directorMap = new Map<string, any>()
  const slugCount = new Map<string, number>()

  for (const imdbId in directorData) {
    const directors = directorData[imdbId]
    if (Array.isArray(directors)) {
      for (const director of directors) {
        if (director.imdb_id && !directorMap.has(director.imdb_id)) {
          let baseSlug = slugify(director.isim)
          let slug = baseSlug

          // Slug duplicate kontrolü
          const count = slugCount.get(baseSlug) || 0
          if (count > 0) {
            slug = `${baseSlug}-${count + 1}`
          }
          slugCount.set(baseSlug, count + 1)

          directorMap.set(director.imdb_id, {
            imdb_id: director.imdb_id,
            tmdb_id: director.tmdb_id || null,
            name: director.isim,
            slug: slug,
            profile_path: director.profile_path || null,
            poster: director.poster || null
          })
        }
      }
    }
  }

  // Insert in batches
  const directors = Array.from(directorMap.values())
  const batchSize = 500
  for (let i = 0; i < directors.length; i += batchSize) {
    const batch = directors.slice(i, i + batchSize)
    await knex('directors').insert(batch)
    console.log(`Inserted directors ${i + 1} - ${Math.min(i + batchSize, directors.length)}`)
  }

  console.log(`Total: Inserted ${directors.length} directors`)
}

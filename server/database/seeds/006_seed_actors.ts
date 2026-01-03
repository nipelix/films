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
  await knex('film_actors').del()
  await knex('actors').del()

  // Read oyuncu.json
  const actorData = JSON.parse(
    readFileSync(resolve(__dirname, '../../../../dd/oyuncu.json'), 'utf-8')
  )

  // Extract unique actors
  const actorMap = new Map<string, any>()
  const slugCount = new Map<string, number>()

  for (const imdbId in actorData) {
    const actors = actorData[imdbId]
    if (Array.isArray(actors)) {
      for (const actor of actors) {
        if (actor.imdb_id && !actorMap.has(actor.imdb_id)) {
          let baseSlug = slugify(actor.isim)
          let slug = baseSlug

          // Slug duplicate kontrolü
          const count = slugCount.get(baseSlug) || 0
          if (count > 0) {
            slug = `${baseSlug}-${count + 1}`
          }
          slugCount.set(baseSlug, count + 1)

          actorMap.set(actor.imdb_id, {
            imdb_id: actor.imdb_id,
            tmdb_id: actor.tmdb_id || null,
            name: actor.isim,
            slug: slug,
            profile_path: actor.profile_path || null,
            poster: actor.poster || null
          })
        }
      }
    }
  }

  // Insert in batches
  const actors = Array.from(actorMap.values())
  const batchSize = 500
  for (let i = 0; i < actors.length; i += batchSize) {
    const batch = actors.slice(i, i + batchSize)
    await knex('actors').insert(batch)
    console.log(`Inserted actors ${i + 1} - ${Math.min(i + batchSize, actors.length)}`)
  }

  console.log(`Total: Inserted ${actors.length} actors`)
}

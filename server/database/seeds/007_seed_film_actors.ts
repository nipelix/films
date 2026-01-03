import type { Knex } from 'knex'
import { readFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export async function seed(knex: Knex): Promise<void> {
  // Clear existing entries
  await knex('film_actors').del()

  // Read oyuncu.json
  const actorData = JSON.parse(
    readFileSync(resolve(__dirname, '../../../../dd/oyuncu.json'), 'utf-8')
  )

  // Get film id mapping
  const films = await knex('films').select('id', 'imdb_id')
  const filmMap = new Map(films.map(f => [f.imdb_id, f.id]))

  // Get actor id mapping
  const actors = await knex('actors').select('id', 'imdb_id')
  const actorMap = new Map(actors.map(a => [a.imdb_id, a.id]))

  // Prepare film_actors for insertion
  const filmActors = []

  for (const imdbId in actorData) {
    const filmId = filmMap.get(imdbId)
    if (!filmId) continue

    const actorList = actorData[imdbId]
    if (Array.isArray(actorList)) {
      actorList.forEach((actor, index) => {
        const actorId = actorMap.get(actor.imdb_id)
        if (actorId) {
          filmActors.push({
            film_id: filmId,
            actor_id: actorId,
            order: index
          })
        }
      })
    }
  }

  // Insert in batches
  const batchSize = 1000
  for (let i = 0; i < filmActors.length; i += batchSize) {
    const batch = filmActors.slice(i, i + batchSize)
    await knex('film_actors').insert(batch)
    console.log(`Inserted film_actors ${i + 1} - ${Math.min(i + batchSize, filmActors.length)}`)
  }

  console.log(`Total: Inserted ${filmActors.length} film-actor relations`)
}

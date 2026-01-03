import type { Knex } from 'knex'
import { readFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export async function seed(knex: Knex): Promise<void> {
  // Clear existing entries
  await knex('comments').del()

  // Read comments.json
  const commentsData = JSON.parse(
    readFileSync(resolve(__dirname, '../../../../dd/comments.json'), 'utf-8')
  )

  // Get film id mapping
  const films = await knex('films').select('id', 'imdb_id')
  const filmMap = new Map(films.map(f => [f.imdb_id, f.id]))

  // Prepare comments for insertion
  const comments = []

  for (const imdbId in commentsData) {
    const filmId = filmMap.get(imdbId)
    if (!filmId) continue

    const commentList = commentsData[imdbId]
    if (Array.isArray(commentList)) {
      for (const comment of commentList) {
        comments.push({
          film_id: filmId,
          author_name: comment.isim,
          content: comment.yorum,
          comment_date: comment.tarih_datetime ? new Date(comment.tarih_datetime) : null,
          is_approved: true
        })
      }
    }
  }

  // Insert in batches
  const batchSize = 1000
  for (let i = 0; i < comments.length; i += batchSize) {
    const batch = comments.slice(i, i + batchSize)
    await knex('comments').insert(batch)
    console.log(`Inserted comments ${i + 1} - ${Math.min(i + batchSize, comments.length)}`)
  }

  console.log(`Total: Inserted ${comments.length} comments`)
}

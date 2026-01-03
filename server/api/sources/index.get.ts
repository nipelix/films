import { Source } from '../../database/models'
import '../../database/connection'

export default defineEventHandler(async () => {
  const sources = await Source.query()
    .where('status', true)
    .orderBy('priority', 'asc')

  return sources
})

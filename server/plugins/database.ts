import knex from '../database/connection'

export default defineNitroPlugin(() => {
  console.log('Database connection initialized')

  // Optionally test connection
  knex.raw('SELECT 1')
    .then(() => console.log('Database connected successfully'))
    .catch((err) => console.error('Database connection failed:', err))
})

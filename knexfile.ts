import type { Knex } from 'knex'

const config: { [key: string]: Knex.Config } = {
  development: {
    client: 'pg',
    connection: {
      host: process.env.DB_HOST || 'localhost',
      port: Number(process.env.DB_PORT) || 5432,
      user: process.env.DB_USER || 'Ramco',
      password: process.env.DB_PASSWORD || '1',
      database: process.env.DB_NAME || 'film'
    },
    migrations: {
      directory: './server/database/migrations',
      extension: 'ts'
    },
    seeds: {
      directory: './server/database/seeds',
      extension: 'ts'
    }
  },
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: './server/database/migrations',
      extension: 'ts'
    },
    seeds: {
      directory: './server/database/seeds',
      extension: 'ts'
    }
  }
}

export default config

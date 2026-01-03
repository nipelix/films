import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('actors', (table) => {
    table.increments('id').primary()
    table.string('imdb_id').unique().notNullable()
    table.integer('tmdb_id').unique()
    table.string('name').notNullable()
    table.string('slug').unique().notNullable()
    table.string('profile_path')
    table.string('poster')
    table.timestamps(true, true)

    table.index('slug')
    table.index('name')
  })
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists('actors')
}

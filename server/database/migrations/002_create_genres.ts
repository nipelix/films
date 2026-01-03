import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('genres', (table) => {
    table.increments('id').primary()
    table.string('name').unique().notNullable()
    table.string('slug').unique().notNullable()
    table.timestamps(true, true)

    table.index('slug')
  })
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists('genres')
}

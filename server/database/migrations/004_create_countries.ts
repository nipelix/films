import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('countries', (table) => {
    table.increments('id').primary()
    table.string('code', 5).unique().notNullable()
    table.string('name').notNullable()
    table.string('flag')
    table.timestamps(true, true)

    table.index('code')
  })
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists('countries')
}

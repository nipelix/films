import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('film_countries', (table) => {
    table.increments('id').primary()
    table.integer('film_id').unsigned().notNullable()
      .references('id').inTable('films').onDelete('CASCADE')
    table.integer('country_id').unsigned().notNullable()
      .references('id').inTable('countries').onDelete('CASCADE')
    table.timestamps(true, true)

    table.unique(['film_id', 'country_id'])
    table.index('film_id')
    table.index('country_id')
  })
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists('film_countries')
}

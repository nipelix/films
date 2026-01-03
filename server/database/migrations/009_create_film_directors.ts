import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('film_directors', (table) => {
    table.increments('id').primary()
    table.integer('film_id').unsigned().notNullable()
      .references('id').inTable('films').onDelete('CASCADE')
    table.integer('director_id').unsigned().notNullable()
      .references('id').inTable('directors').onDelete('CASCADE')
    table.timestamps(true, true)

    table.unique(['film_id', 'director_id'])
    table.index('film_id')
    table.index('director_id')
  })
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists('film_directors')
}

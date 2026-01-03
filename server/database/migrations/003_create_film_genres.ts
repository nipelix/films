import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('film_genres', (table) => {
    table.increments('id').primary()
    table.integer('film_id').unsigned().notNullable()
      .references('id').inTable('films').onDelete('CASCADE')
    table.integer('genre_id').unsigned().notNullable()
      .references('id').inTable('genres').onDelete('CASCADE')
    table.timestamps(true, true)

    table.unique(['film_id', 'genre_id'])
    table.index('film_id')
    table.index('genre_id')
  })
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists('film_genres')
}

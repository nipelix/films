import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('film_actors', (table) => {
    table.increments('id').primary()
    table.integer('film_id').unsigned().notNullable()
      .references('id').inTable('films').onDelete('CASCADE')
    table.integer('actor_id').unsigned().notNullable()
      .references('id').inTable('actors').onDelete('CASCADE')
    table.string('character_name')
    table.integer('order').defaultTo(0)
    table.timestamps(true, true)

    table.unique(['film_id', 'actor_id'])
    table.index('film_id')
    table.index('actor_id')
  })
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists('film_actors')
}

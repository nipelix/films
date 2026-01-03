import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('film_views', (table) => {
    table.increments('id').primary()
    table.integer('film_id').unsigned().notNullable()
      .references('id').inTable('films').onDelete('CASCADE')
    table.date('view_date').notNullable()
    table.integer('view_count').defaultTo(1)
    table.timestamps(true, true)

    // Her film için günde tek kayıt olacak
    table.unique(['film_id', 'view_date'])

    table.index('film_id')
    table.index('view_date')
    table.index(['view_date', 'view_count'])
  })
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists('film_views')
}

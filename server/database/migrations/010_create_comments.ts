import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('comments', (table) => {
    table.increments('id').primary()
    table.integer('film_id').unsigned().notNullable()
      .references('id').inTable('films').onDelete('CASCADE')
    table.string('author_name').notNullable()
    table.text('content').notNullable()
    table.timestamp('comment_date')
    table.integer('parent_id').unsigned()
      .references('id').inTable('comments').onDelete('CASCADE')
    table.boolean('is_approved').defaultTo(true)
    table.timestamps(true, true)

    table.index('film_id')
    table.index('parent_id')
    table.index('comment_date')
  })
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists('comments')
}

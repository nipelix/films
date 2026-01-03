import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('film_sources', (table) => {
    table.increments('id').primary()
    table.string('name', 100).notNullable().defaultTo('Kaynak 1')
    table.integer('film_id').unsigned().notNullable()
    table.integer('source_id').unsigned().notNullable()
    table.smallint('priority').notNullable().defaultTo(999)
    table.text('embed').nullable()
    table.string('quality', 20).nullable() // 4K, 1080p, 720p, etc.
    table.boolean('status').notNullable().defaultTo(true)
    table.timestamps(true, true)

    // Foreign keys
    table.foreign('film_id').references('id').inTable('films').onDelete('CASCADE')
    table.foreign('source_id').references('id').inTable('sources').onDelete('CASCADE')

    // Index
    table.index(['film_id', 'source_id'])
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('film_sources')
}

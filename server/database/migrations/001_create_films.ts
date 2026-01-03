import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('films', (table) => {
    table.increments('id').primary()
    table.string('imdb_id').unique().notNullable()
    table.integer('tmdb_id').unique()
    table.string('title').notNullable()
    table.string('original_title')
    table.string('slug').unique().notNullable()
    table.string('year', 4)
    table.decimal('imdb_rating', 3, 1)
    table.integer('rating_count')
    table.integer('runtime')
    table.text('ozet')
    table.string('poster')
    table.string('certification', 10)
    table.string('page_title')
    table.text('page_description')
    table.timestamp('date_published')
    table.timestamp('upload_date')
    table.timestamps(true, true)

    table.index('slug')
    table.index('year')
    table.index('imdb_rating')
  })
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists('films')
}

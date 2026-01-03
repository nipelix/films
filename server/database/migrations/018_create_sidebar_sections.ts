import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('sidebar_sections', (table) => {
    table.increments('id').primary()
    table.string('type').notNullable().unique() // trending, genres, languages, years, comments
    table.string('title').notNullable()
    table.string('icon').nullable()
    table.integer('order').defaultTo(0)
    table.boolean('is_active').defaultTo(true)
    table.integer('item_limit').defaultTo(10) // Kaç item gösterilecek
    table.string('footer_link').nullable() // Alt link URL
    table.string('footer_text').nullable() // Alt link metni
    table.timestamps(true, true)
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('sidebar_sections')
}

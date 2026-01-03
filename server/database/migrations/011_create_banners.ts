import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('banners', (table) => {
    table.increments('id').primary()
    table.string('name').notNullable()
    table.enum('position', ['header', 'sidebar', 'footer', 'video_top', 'video_bottom', 'between_content']).notNullable()
    table.enum('type', ['image', 'html', 'announcement']).defaultTo('image')
    table.string('image')
    table.string('link')
    table.text('html_content')
    table.string('alt_text')
    table.boolean('is_active').defaultTo(true)
    table.boolean('open_new_tab').defaultTo(true)
    table.integer('order').defaultTo(0)
    table.timestamp('start_date')
    table.timestamp('end_date')
    table.timestamps(true, true)

    table.index('position')
    table.index('is_active')
    table.index(['position', 'is_active'])
  })
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists('banners')
}

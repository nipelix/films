import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('menu_items', (table) => {
    table.increments('id').primary()
    table.string('title').notNullable()
    table.string('url').notNullable()
    table.string('icon').nullable() // FontAwesome icon class (fa-home, fa-fire, etc.)
    table.string('badge_text').nullable() // Badge metni (Yeni, Hot, vs.)
    table.string('badge_color').nullable() // Badge rengi
    table.enum('position', ['main', 'sub', 'mobile']).notNullable().defaultTo('main')
    table.integer('parent_id').unsigned().nullable()
      .references('id').inTable('menu_items').onDelete('CASCADE')
    table.integer('order').defaultTo(0)
    table.boolean('is_active').defaultTo(true)
    table.boolean('open_new_tab').defaultTo(false)
    table.timestamps(true, true)
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('menu_items')
}

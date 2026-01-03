import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  // Önce eski alanları kaldır
  await knex.schema.alterTable('films', (table) => {
    table.dropColumn('has_dublaj')
    table.dropColumn('has_altyazi')
  })

  // Dil tipleri tablosu
  await knex.schema.createTable('language_types', (table) => {
    table.increments('id').primary()
    table.string('name').notNullable() // TR Dublaj, TR Altyazı, EN Altyazı
    table.string('slug').unique().notNullable()
    table.string('color', 7).defaultTo('#3b82f6') // HEX renk kodu
    table.string('badge_text').notNullable() // Kısa gösterim: Dublaj, Altyazı
    table.integer('order').defaultTo(0)
    table.boolean('is_active').defaultTo(true)
    table.timestamps(true, true)

    table.index('slug')
    table.index('is_active')
  })

  // Film-Dil tipi pivot tablosu
  await knex.schema.createTable('film_language_types', (table) => {
    table.increments('id').primary()
    table.integer('film_id').unsigned().notNullable()
      .references('id').inTable('films').onDelete('CASCADE')
    table.integer('language_type_id').unsigned().notNullable()
      .references('id').inTable('language_types').onDelete('CASCADE')
    table.timestamps(true, true)

    table.unique(['film_id', 'language_type_id'])
    table.index('film_id')
    table.index('language_type_id')
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('film_language_types')
  await knex.schema.dropTableIfExists('language_types')

  await knex.schema.alterTable('films', (table) => {
    table.boolean('has_dublaj').defaultTo(false)
    table.boolean('has_altyazi').defaultTo(true)
  })
}

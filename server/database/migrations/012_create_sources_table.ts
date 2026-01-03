import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('sources', (table) => {
    table.increments('id').primary()
    table.string('name', 100).notNullable()
    table.string('slug', 100).notNullable().unique()
    table.smallint('priority').notNullable().defaultTo(999)
    table.boolean('status').notNullable().defaultTo(true)
    table.timestamps(true, true)
  })

  // Varsayılan kaynakları ekle
  await knex('sources').insert([
    { id: 1, name: 'DUAL', slug: 'dual', priority: 1, status: true },
    { id: 2, name: 'Türkçe Dublaj', slug: 'dublaj', priority: 2, status: true },
    { id: 3, name: 'Türkçe Altyazı', slug: 'altyazi', priority: 3, status: true },
    { id: 4, name: 'Yerli', slug: 'yerli', priority: 4, status: true }
  ])
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('sources')
}

import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable('films', (table) => {
    // Eski enum alanını kaldır
    table.dropColumn('language_type')

    // İki ayrı boolean alan
    table.boolean('has_dublaj').defaultTo(false)
    table.boolean('has_altyazi').defaultTo(true)

    table.index('has_dublaj')
    table.index('has_altyazi')
  })
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable('films', (table) => {
    table.dropIndex('has_dublaj')
    table.dropIndex('has_altyazi')
    table.dropColumn('has_dublaj')
    table.dropColumn('has_altyazi')

    table.enum('language_type', ['dublaj', 'altyazi', 'both']).defaultTo('altyazi')
  })
}

import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable('films', (table) => {
    // Dil tipi: dublaj, altyazi, both (ikisi de var)
    table.enum('language_type', ['dublaj', 'altyazi', 'both']).defaultTo('altyazi')

    table.index('language_type')
  })
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable('films', (table) => {
    table.dropIndex('language_type')
    table.dropColumn('language_type')
  })
}

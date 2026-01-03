import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable('films', (table) => {
    table.boolean('is_featured').defaultTo(false)
    table.integer('featured_order').defaultTo(0)

    table.index('is_featured')
  })
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable('films', (table) => {
    table.dropIndex('is_featured')
    table.dropColumn('featured_order')
    table.dropColumn('is_featured')
  })
}

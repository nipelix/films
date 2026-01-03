import type { Knex } from 'knex'

export async function seed(knex: Knex): Promise<void> {
  // Mevcut verileri temizle
  await knex('sidebar_sections').del()

  // Sidebar bölümleri
  const sections = [
    {
      type: 'trending',
      title: 'Trend Filmler',
      icon: 'fa-bolt',
      order: 1,
      is_active: true,
      item_limit: 5,
      footer_link: '/filmler',
      footer_text: 'Devamını Gör'
    },
    {
      type: 'genres',
      title: 'Film Türleri',
      icon: 'fa-th-large',
      order: 2,
      is_active: true,
      item_limit: 20,
      footer_link: null,
      footer_text: null
    },
    {
      type: 'languages',
      title: 'Dil Seçenekleri',
      icon: 'fa-language',
      order: 3,
      is_active: true,
      item_limit: 10,
      footer_link: null,
      footer_text: null
    },
    {
      type: 'years',
      title: 'Yıllar',
      icon: 'fa-calendar-alt',
      order: 4,
      is_active: true,
      item_limit: 20,
      footer_link: null,
      footer_text: null
    },
    {
      type: 'comments',
      title: 'Son Yorumlar',
      icon: 'fa-comments',
      order: 5,
      is_active: true,
      item_limit: 5,
      footer_link: null,
      footer_text: null
    }
  ]

  await knex('sidebar_sections').insert(sections)

  console.log(`Inserted ${sections.length} sidebar sections`)
}

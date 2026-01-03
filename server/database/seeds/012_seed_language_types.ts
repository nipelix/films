import type { Knex } from 'knex'

export async function seed(knex: Knex): Promise<void> {
  // Mevcut verileri temizle
  await knex('film_language_types').del()
  await knex('language_types').del()

  // Varsayılan dil tiplerini ekle
  await knex('language_types').insert([
    {
      id: 1,
      name: 'Türkçe Dublaj',
      slug: 'turkce-dublaj',
      color: '#22c55e', // Yeşil
      badge_text: 'Dublaj',
      order: 1,
      is_active: true
    },
    {
      id: 2,
      name: 'Türkçe Altyazı',
      slug: 'turkce-altyazi',
      color: '#3b82f6', // Mavi
      badge_text: 'Altyazı',
      order: 2,
      is_active: true
    },
    {
      id: 3,
      name: 'İngilizce Altyazı',
      slug: 'ingilizce-altyazi',
      color: '#f59e0b', // Turuncu
      badge_text: 'EN Sub',
      order: 3,
      is_active: true
    },
    {
      id: 4,
      name: 'Altyazısız',
      slug: 'altyazisiz',
      color: '#6b7280', // Gri
      badge_text: 'Raw',
      order: 4,
      is_active: true
    }
  ])

  console.log('Inserted 4 language types')
}

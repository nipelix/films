import type { Knex } from 'knex'

export async function seed(knex: Knex): Promise<void> {
  // Mevcut verileri temizle
  await knex('menu_items').del()

  // Ana menü öğeleri (main)
  const mainMenuItems = [
    {
      id: 1,
      title: 'Ana Sayfa',
      url: '/',
      icon: 'fa-home',
      position: 'main',
      order: 1,
      is_active: true
    },
    {
      id: 2,
      title: 'Trend Filmler',
      url: '/filmler?sort=rating_count&order=desc',
      icon: 'fa-fire',
      position: 'main',
      order: 2,
      is_active: true
    },
    {
      id: 3,
      title: 'IMDB 7+ Filmler',
      url: '/filmler?imdb_min=7',
      icon: 'fa-star',
      position: 'main',
      order: 3,
      is_active: true
    },
    {
      id: 4,
      title: 'Film Listesi',
      url: '/filmler',
      icon: 'fa-list',
      badge_text: 'Yeni',
      badge_color: '#ef4444',
      position: 'main',
      order: 4,
      is_active: true
    },
    {
      id: 5,
      title: 'Tercihler',
      url: '#',
      icon: 'fa-chevron-down',
      position: 'main',
      order: 5,
      is_active: true
    },
    {
      id: 6,
      title: 'Oyuncular',
      url: '/oyuncular',
      icon: 'fa-user',
      position: 'main',
      parent_id: 5,
      order: 1,
      is_active: true
    },
    {
      id: 7,
      title: 'Yönetmenler',
      url: '/yonetmenler',
      icon: 'fa-video',
      position: 'main',
      parent_id: 5,
      order: 2,
      is_active: true
    },
    {
      id: 8,
      title: 'İletişim',
      url: '/iletisim',
      icon: 'fa-envelope',
      position: 'main',
      order: 6,
      is_active: true
    }
  ]

  // Alt menü öğeleri (sub)
  const subMenuItems = [
    {
      id: 20,
      title: 'Türkçe Dublaj',
      url: '/dil/turkce-dublaj',
      position: 'sub',
      order: 1,
      is_active: true
    },
    {
      id: 21,
      title: 'Türkçe Altyazılı',
      url: '/dil/turkce-altyazi',
      position: 'sub',
      order: 2,
      is_active: true
    },
    {
      id: 22,
      title: 'İngilizce Altyazı',
      url: '/dil/ingilizce-altyazi',
      position: 'sub',
      order: 3,
      is_active: true
    },
    {
      id: 23,
      title: '2025 Filmleri',
      url: '/yil/2025',
      position: 'sub',
      order: 4,
      is_active: true
    },
    {
      id: 24,
      title: '2024 Filmleri',
      url: '/yil/2024',
      position: 'sub',
      order: 5,
      is_active: true
    }
  ]

  // Tüm öğeleri ekle
  await knex('menu_items').insert([...mainMenuItems, ...subMenuItems])

  console.log(`Inserted ${mainMenuItems.length + subMenuItems.length} menu items`)
}

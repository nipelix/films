import type { Knex } from 'knex'

export async function seed(knex: Knex): Promise<void> {
  // Önce mevcut verileri temizle
  await knex('banners').del()

  // Örnek banner verilerini ekle
  await knex('banners').insert([
    // Duyuru Banner
    {
      name: 'Ana Duyuru',
      position: 'header',
      type: 'announcement',
      html_content: 'Hoşgeldiniz! En yeni filmler Full HD kalitesinde sizleri bekliyor.',
      is_active: true,
      open_new_tab: false,
      order: 0
    },
    // Header Bannerlar
    {
      name: 'Header Banner 1',
      position: 'header',
      type: 'image',
      image: 'https://www.justwatch.com/appassets/img/mrr/mrr-tr-under_buybox.webp',
      link: '#',
      alt_text: 'Sponsor',
      is_active: true,
      open_new_tab: true,
      order: 1
    },
    {
      name: 'Header Banner 2',
      position: 'header',
      type: 'image',
      image: 'https://www.justwatch.com/appassets/img/mrr/mrr-tr-under_buybox.webp',
      link: '#',
      alt_text: 'Sponsor',
      is_active: true,
      open_new_tab: true,
      order: 2
    },
    // Sidebar Bannerlar
    {
      name: 'Sidebar Banner 1',
      position: 'sidebar',
      type: 'image',
      image: 'https://www.justwatch.com/appassets/img/mrr/mrr-tr-under_buybox.webp',
      link: '#',
      alt_text: 'Sidebar Reklam',
      is_active: true,
      open_new_tab: true,
      order: 0
    },
    // Video Üstü Banner
    {
      name: 'Video Üstü Banner',
      position: 'video_top',
      type: 'image',
      image: 'https://www.justwatch.com/appassets/img/mrr/mrr-tr-under_buybox.webp',
      link: '#',
      alt_text: 'Video Üstü Reklam',
      is_active: true,
      open_new_tab: true,
      order: 0
    },
    // Video Altı Banner
    {
      name: 'Video Altı Banner',
      position: 'video_bottom',
      type: 'image',
      image: 'https://www.justwatch.com/appassets/img/mrr/mrr-tr-under_buybox.webp',
      link: '#',
      alt_text: 'Video Altı Reklam',
      is_active: true,
      open_new_tab: true,
      order: 0
    },
    // Footer Banner
    {
      name: 'Footer Banner',
      position: 'footer',
      type: 'image',
      image: 'https://www.justwatch.com/appassets/img/mrr/mrr-tr-under_buybox.webp',
      link: '#',
      alt_text: 'Footer Reklam',
      is_active: true,
      open_new_tab: true,
      order: 0
    }
  ])
}

import { Genre, Film, Comment, FilmView, LanguageType, SidebarSection, MenuItem, Banner } from '../database/models'
import '../database/connection'

export default defineEventHandler(async () => {
  try {
    // Paralel olarak tüm verileri çek
    const [
      menuItems,
      banners,
      sidebarSections
    ] = await Promise.all([
      // Menu
      MenuItem.getAllGrouped(),
      // Banners
      Banner.getActiveByPosition(),
      // Sidebar sections
      SidebarSection.getActive()
    ])

    // Sidebar verileri için hangi section'lar aktif kontrol et
    const activeSectionTypes = sidebarSections.map(s => s.type)
    const sidebarData: Record<string, any> = {}

    // Sadece aktif section'lar için veri çek
    const sidebarPromises: Promise<void>[] = []

    if (activeSectionTypes.includes('trending')) {
      sidebarPromises.push(
        (async () => {
          const section = sidebarSections.find(s => s.type === 'trending')
          let trendingFilms = await FilmView.getTrending(7, section?.item_limit || 5)
          if (!trendingFilms || trendingFilms.length < (section?.item_limit || 5)) {
            trendingFilms = await Film.query()
              .select('id', 'slug', 'title', 'original_title', 'poster', 'year', 'imdb_rating')
              .whereNotNull('rating_count')
              .orderBy('rating_count', 'desc')
              .limit(section?.item_limit || 5)
          }
          sidebarData.trendingFilms = trendingFilms
        })()
      )
    }

    if (activeSectionTypes.includes('genres')) {
      sidebarPromises.push(
        (async () => {
          const section = sidebarSections.find(s => s.type === 'genres')
          sidebarData.genres = await Genre.query()
            .select('genres.id', 'genres.name', 'genres.slug')
            .count('film_genres.film_id as film_count')
            .leftJoin('film_genres', 'genres.id', 'film_genres.genre_id')
            .groupBy('genres.id')
            .havingRaw('count(film_genres.film_id) > 0')
            .orderBy('name', 'asc')
            .limit(section?.item_limit || 20)
        })()
      )
    }

    if (activeSectionTypes.includes('languages')) {
      sidebarPromises.push(
        (async () => {
          sidebarData.languageTypes = await LanguageType.getActive()
        })()
      )
    }

    if (activeSectionTypes.includes('years')) {
      sidebarPromises.push(
        (async () => {
          const section = sidebarSections.find(s => s.type === 'years')
          sidebarData.years = await Film.query()
            .select('year')
            .count('id as film_count')
            .whereNotNull('year')
            .where('year', '!=', '')
            .groupBy('year')
            .orderBy('year', 'desc')
            .limit(section?.item_limit || 20)
        })()
      )
    }

    if (activeSectionTypes.includes('comments')) {
      sidebarPromises.push(
        (async () => {
          const section = sidebarSections.find(s => s.type === 'comments')
          sidebarData.recentComments = await Comment.query()
            .select('comments.*')
            .withGraphFetched('film')
            .modifyGraph('film', (builder) => {
              builder.select('id', 'slug', 'title', 'poster')
            })
            .where('comments.is_approved', true)
            .orderBy('comments.comment_date', 'desc')
            .limit(section?.item_limit || 5)
        })()
      )
    }

    // Tüm sidebar verilerini paralel çek
    await Promise.all(sidebarPromises)

    return {
      success: true,
      data: {
        menu: menuItems,
        banners,
        sidebar: {
          sections: sidebarSections,
          ...sidebarData
        }
      }
    }
  } catch (error) {
    console.error('Layout fetch error:', error)
    throw createError({
      statusCode: 500,
      message: 'Layout verileri alınırken bir hata oluştu'
    })
  }
})

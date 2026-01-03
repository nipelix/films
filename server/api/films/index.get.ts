import { Film } from '../../database/models'
import '../../database/connection'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)

  const page = parseInt(query.page as string) || 1
  const limit = parseInt(query.limit as string) || 24
  const offset = (page - 1) * limit

  // Filtreleme parametreleri
  const genre = query.genre as string
  const year = query.year as string
  const country = query.country as string
  const languageType = query.language_type as string
  const sort = query.sort as string || 'upload_date'
  const order = query.order as string || 'desc'

  let filmsQuery = Film.query()
    .select('films.*')
    .withGraphFetched('[genres, countries, languageTypes]')

  // Genre filtresi
  if (genre) {
    filmsQuery = filmsQuery
      .joinRelated('genres')
      .where('genres.slug', genre)
  }

  // Yıl filtresi
  if (year) {
    filmsQuery = filmsQuery.where('films.year', year)
  }

  // Ülke filtresi
  if (country) {
    filmsQuery = filmsQuery
      .joinRelated('countries')
      .where('countries.code', country)
  }

  // Dil tipi filtresi (slug ile)
  if (languageType) {
    filmsQuery = filmsQuery
      .joinRelated('languageTypes')
      .where('languageTypes.slug', languageType)
  }

  // Sıralama
  const validSortFields = ['upload_date', 'imdb_rating', 'year', 'title', 'rating_count']
  const sortField = validSortFields.includes(sort) ? sort : 'upload_date'
  const sortOrder = order === 'asc' ? 'asc' : 'desc'

  // Toplam sayı - select'i temizle ve sadece count yap
  const totalQuery = filmsQuery.clone().clear('select').clearWithGraph()
  const totalResult = await totalQuery.count('films.id as count').first()
  const total = parseInt((totalResult as any)?.count || '0')

  // Filmler
  const films = await filmsQuery
    .orderBy(`films.${sortField}`, sortOrder)
    .limit(limit)
    .offset(offset)

  return {
    data: films,
    meta: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit)
    }
  }
})

interface FilmFilters {
  page?: number
  limit?: number
  genre?: string
  year?: string
  country?: string
  sort?: string
  order?: string
}

interface FilmResponse {
  data: any[]
  meta: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

export const useFilms = () => {
  const getFilms = async (filters: FilmFilters = {}): Promise<FilmResponse> => {
    const query = new URLSearchParams()

    if (filters.page) query.set('page', String(filters.page))
    if (filters.limit) query.set('limit', String(filters.limit))
    if (filters.genre) query.set('genre', filters.genre)
    if (filters.year) query.set('year', filters.year)
    if (filters.country) query.set('country', filters.country)
    if (filters.sort) query.set('sort', filters.sort)
    if (filters.order) query.set('order', filters.order)

    return await $fetch(`/api/films?${query.toString()}`)
  }

  const getFilm = async (slug: string) => {
    return await $fetch(`/api/films/${slug}`)
  }

  const searchFilms = async (q: string, limit = 10) => {
    return await $fetch(`/api/films/search?q=${encodeURIComponent(q)}&limit=${limit}`)
  }

  const getSimilarFilms = async (slug: string, limit = 6) => {
    return await $fetch(`/api/films/similar/${slug}?limit=${limit}`)
  }

  // SSR uyumlu async data hooks
  const useFilmsList = (filters: FilmFilters = {}) => {
    return useAsyncData(
      `films-${JSON.stringify(filters)}`,
      () => getFilms(filters)
    )
  }

  const useFilmDetail = (slug: string) => {
    return useAsyncData(
      `film-${slug}`,
      () => getFilm(slug)
    )
  }

  const useFilmSearch = (q: Ref<string>) => {
    return useAsyncData(
      () => `search-${q.value}`,
      () => searchFilms(q.value),
      { watch: [q] }
    )
  }

  return {
    // Direct API calls
    getFilms,
    getFilm,
    searchFilms,
    getSimilarFilms,

    // SSR async data
    useFilmsList,
    useFilmDetail,
    useFilmSearch
  }
}

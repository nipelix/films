interface GenreFilmFilters {
  page?: number
  limit?: number
  sort?: string
  order?: string
}

export const useGenres = () => {
  const getGenres = async () => {
    return await $fetch('/api/genres')
  }

  const getGenre = async (slug: string) => {
    return await $fetch(`/api/genres/${slug}`)
  }

  const getGenreFilms = async (slug: string, filters: GenreFilmFilters = {}) => {
    const query = new URLSearchParams()

    if (filters.page) query.set('page', String(filters.page))
    if (filters.limit) query.set('limit', String(filters.limit))
    if (filters.sort) query.set('sort', filters.sort)
    if (filters.order) query.set('order', filters.order)

    return await $fetch(`/api/genres/${slug}/films?${query.toString()}`)
  }

  return {
    getGenres,
    getGenre,
    getGenreFilms
  }
}

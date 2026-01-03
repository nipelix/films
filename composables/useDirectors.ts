interface DirectorFilters {
  page?: number
  limit?: number
}

export const useDirectors = () => {
  const getDirectors = async (filters: DirectorFilters = {}) => {
    const query = new URLSearchParams()

    if (filters.page) query.set('page', String(filters.page))
    if (filters.limit) query.set('limit', String(filters.limit))

    return await $fetch(`/api/directors?${query.toString()}`)
  }

  const getDirector = async (slug: string, page = 1) => {
    return await $fetch(`/api/directors/${slug}?page=${page}`)
  }

  return {
    getDirectors,
    getDirector
  }
}

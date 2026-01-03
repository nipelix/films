interface ActorFilters {
  page?: number
  limit?: number
  letter?: string
}

export const useActors = () => {
  const getActors = async (filters: ActorFilters = {}) => {
    const query = new URLSearchParams()

    if (filters.page) query.set('page', String(filters.page))
    if (filters.limit) query.set('limit', String(filters.limit))
    if (filters.letter) query.set('letter', filters.letter)

    return await $fetch(`/api/actors?${query.toString()}`)
  }

  const getActor = async (slug: string, page = 1) => {
    return await $fetch(`/api/actors/${slug}?page=${page}`)
  }

  return {
    getActors,
    getActor
  }
}

interface CommentFilters {
  page?: number
  limit?: number
}

interface NewComment {
  filmId: number
  authorName: string
  content: string
  parentId?: number
}

export const useComments = () => {
  const getComments = async (filmId: number, filters: CommentFilters = {}) => {
    const query = new URLSearchParams()

    if (filters.page) query.set('page', String(filters.page))
    if (filters.limit) query.set('limit', String(filters.limit))

    return await $fetch(`/api/comments/${filmId}?${query.toString()}`)
  }

  const addComment = async (comment: NewComment) => {
    return await $fetch('/api/comments', {
      method: 'POST',
      body: comment
    })
  }

  return {
    getComments,
    addComment
  }
}

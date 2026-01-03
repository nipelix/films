export interface Film {
  id: number
  slug: string
  name: string
  originalName?: string
  poster: string
  year: number
  category: string
  rating: number
  type: 'movie' | 'serie'
  source?: 'altyazi' | 'dublaj' | 'dual' | 'yerli'
  quality?: string
  duration?: string
  description?: string
  director?: string
  cast?: string[]
  imdbId?: string
  trailerUrl?: string
}

export interface SearchResult {
  id: number
  slug: string
  name: string
  originalName?: string
  poster: string
  year: number
  category: string
  rating: number
  type: 'movie' | 'serie'
}

export interface Category {
  id: number
  slug: string
  name: string
  type: 'movie' | 'serie'
}

export interface UpcomingFilm {
  id: number
  name: string
  poster: string
  releaseDate: string
  trailerVideoId?: string
  filmUrl?: string
  isReleased?: boolean
}

export interface SidebarFilm {
  id: number
  slug: string
  name: string
  poster: string
  rating: number
  year: number
  type: 'movie' | 'serie'
}

export interface FilterOptions {
  genre?: string
  type?: string
  year?: number
  rating?: number
  quality?: string
}

export interface PaginationMeta {
  currentPage: number
  totalPages: number
  totalItems: number
  perPage: number
}

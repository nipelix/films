import { defineStore } from 'pinia'
import type { Film, UpcomingFilm, FilterOptions, PaginationMeta } from '~/types'

interface FilmsState {
  films: Film[]
  featuredFilms: Film[]
  latestFilms: Film[]
  upcomingFilms: UpcomingFilm[]
  currentFilm: Film | null
  filters: FilterOptions
  pagination: PaginationMeta
  isLoading: boolean
  error: string | null
}

export const useFilmsStore = defineStore('films', {
  state: (): FilmsState => ({
    films: [],
    featuredFilms: [],
    latestFilms: [],
    upcomingFilms: [],
    currentFilm: null,
    filters: {},
    pagination: {
      currentPage: 1,
      totalPages: 1,
      totalItems: 0,
      perPage: 24
    },
    isLoading: false,
    error: null
  }),

  getters: {
    getFilmBySlug: (state) => (slug: string) => {
      return state.films.find(f => f.slug === slug)
    },

    filteredFilms: (state) => {
      let result = [...state.films]

      if (state.filters.genre) {
        result = result.filter(f => f.category === state.filters.genre)
      }
      if (state.filters.year) {
        result = result.filter(f => f.year === state.filters.year)
      }
      if (state.filters.rating) {
        result = result.filter(f => f.rating >= state.filters.rating!)
      }

      return result
    }
  },

  actions: {
    async fetchFeaturedFilms() {
      this.isLoading = true
      try {
        // Demo data - API'ye bağlandığında burası değişecek
        this.featuredFilms = getDemoFilms().slice(0, 5)
      } catch (error) {
        this.error = 'Filmler yüklenirken hata oluştu'
      } finally {
        this.isLoading = false
      }
    },

    async fetchLatestFilms(page = 1) {
      this.isLoading = true
      try {
        // Demo data
        this.latestFilms = getDemoFilms()
        this.pagination.currentPage = page
        this.pagination.totalPages = 100
        this.pagination.totalItems = 2400
      } catch (error) {
        this.error = 'Filmler yüklenirken hata oluştu'
      } finally {
        this.isLoading = false
      }
    },

    async fetchUpcomingFilms() {
      this.upcomingFilms = getDemoUpcomingFilms()
    },

    async fetchFilmBySlug(slug: string) {
      this.isLoading = true
      try {
        // Demo - Normalde API'den gelecek
        this.currentFilm = getDemoFilms().find(f => f.slug === slug) || null
      } catch (error) {
        this.error = 'Film bulunamadı'
      } finally {
        this.isLoading = false
      }
    },

    setFilters(filters: FilterOptions) {
      this.filters = { ...this.filters, ...filters }
    },

    clearFilters() {
      this.filters = {}
    },

    setPage(page: number) {
      this.pagination.currentPage = page
      this.fetchLatestFilms(page)
    }
  }
})

// Demo Data
function getDemoFilms(): Film[] {
  return [
    {
      id: 1,
      slug: 'tuzak',
      name: 'Tuzak',
      originalName: 'Locked',
      poster: 'https://media.themoviedb.org/t/p/w220_and_h330_face/6WwBMHuauYm7vU9YvDgSShG0Im9.jpg',
      year: 2025,
      category: 'Aksiyon',
      rating: 7.5,
      type: 'movie',
      source: 'altyazi',
      quality: '1080p'
    },
    {
      id: 2,
      slug: 'fantastik-dortlu',
      name: 'Fantastik Dörtlü: İlk Adımlar',
      originalName: 'The Fantastic 4: First Steps',
      poster: 'https://media.themoviedb.org/t/p/w220_and_h330_face/8kknNk7PbOcDUXynUZYZ7EHnKAA.jpg',
      year: 2025,
      category: 'Aksiyon',
      rating: 7.5,
      type: 'movie',
      source: 'dublaj'
    },
    {
      id: 3,
      slug: 'parisin-altinda',
      name: "Paris'in Altında",
      originalName: 'Sous la Seine',
      poster: 'https://media.themoviedb.org/t/p/w220_and_h330_face/nrM2xFUfKJJEmZzd5d7kohT2G0C.jpg',
      year: 2024,
      category: 'Bilim Kurgu',
      rating: 8.2,
      type: 'movie',
      source: 'dual'
    },
    {
      id: 4,
      slug: 'atlas',
      name: 'Atlas',
      originalName: 'Atlas',
      poster: 'https://media.themoviedb.org/t/p/w220_and_h330_face/hjVNQA2a12OxkpDEOQTBMbKVZ1K.jpg',
      year: 2024,
      category: 'Bilim Kurgu',
      rating: 8.2,
      type: 'movie',
      source: 'yerli'
    },
    {
      id: 5,
      slug: 'esrarengiz-canavar',
      name: 'Esrarengiz Canavar',
      originalName: 'Troll',
      poster: 'https://media.themoviedb.org/t/p/w220_and_h330_face/3Cz7ySOQJmqiuTdrc6CY0r65yDI.jpg',
      year: 2022,
      category: 'Korku',
      rating: 6.8,
      type: 'movie',
      source: 'altyazi'
    },
    {
      id: 6,
      slug: 'yeni-film',
      name: 'Yeni Film',
      originalName: 'New Movie',
      poster: 'https://media.themoviedb.org/t/p/w220_and_h330_face/6WwBMHuauYm7vU9YvDgSShG0Im9.jpg',
      year: 2025,
      category: 'Aksiyon',
      rating: 7.5,
      type: 'movie',
      source: 'altyazi'
    }
  ]
}

function getDemoUpcomingFilms(): UpcomingFilm[] {
  return [
    {
      id: 1,
      name: 'Captain America: Brave New World',
      poster: 'https://image.tmdb.org/t/p/w500/pzIddUEMWhWzfvLI3TwxUG2wGoi.jpg',
      releaseDate: '14 Şub 2025',
      trailerVideoId: '82xS4goDWZY',
      isReleased: true
    },
    {
      id: 2,
      name: 'Mickey 17',
      poster: 'https://image.tmdb.org/t/p/w500/pzIddUEMWhWzfvLI3TwxUG2wGoi.jpg',
      releaseDate: '7 Mar 2025',
      trailerVideoId: 'hNlGLwvZBNw'
    },
    {
      id: 3,
      name: 'Thunderbolts*',
      poster: 'https://image.tmdb.org/t/p/w500/pzIddUEMWhWzfvLI3TwxUG2wGoi.jpg',
      releaseDate: '2 May 2025',
      trailerVideoId: 'yQEondeGvKo'
    },
    {
      id: 4,
      name: 'Mission: Impossible 8',
      poster: 'https://image.tmdb.org/t/p/w500/pzIddUEMWhWzfvLI3TwxUG2wGoi.jpg',
      releaseDate: '23 May 2025',
      trailerVideoId: '82xS4goDWZY',
      isReleased: true
    },
    {
      id: 5,
      name: 'Superman',
      poster: 'https://image.tmdb.org/t/p/w500/pzIddUEMWhWzfvLI3TwxUG2wGoi.jpg',
      releaseDate: '11 Tem 2025',
      trailerVideoId: '82xS4goDWZY'
    }
  ]
}

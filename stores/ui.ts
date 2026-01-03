import { defineStore } from 'pinia'

interface TrailerModal {
  isOpen: boolean
  videoId: string
  title: string
  thumbnail: string
  filmUrl: string
}

interface UiState {
  trailerModal: TrailerModal
  isMobileMenuOpen: boolean
  isFilmRobotOpen: boolean
  activeFilters: {
    genre: string | null
    type: string | null
    year: number | null
    rating: number | null
    quality: string | null
  }
}

export const useUiStore = defineStore('ui', {
  state: (): UiState => ({
    trailerModal: {
      isOpen: false,
      videoId: '',
      title: '',
      thumbnail: '',
      filmUrl: ''
    },
    isMobileMenuOpen: false,
    isFilmRobotOpen: false,
    activeFilters: {
      genre: null,
      type: null,
      year: null,
      rating: null,
      quality: null
    }
  }),

  actions: {
    openTrailerModal(payload: {
      videoId: string
      title: string
      thumbnail?: string
      filmUrl?: string
    }) {
      this.trailerModal = {
        isOpen: true,
        videoId: payload.videoId,
        title: payload.title,
        thumbnail: payload.thumbnail || '',
        filmUrl: payload.filmUrl || ''
      }
      // Prevent body scroll
      document.body.style.overflow = 'hidden'
    },

    closeTrailerModal() {
      this.trailerModal.isOpen = false
      this.trailerModal.videoId = ''
      // Restore body scroll
      document.body.style.overflow = ''
    },

    toggleMobileMenu() {
      this.isMobileMenuOpen = !this.isMobileMenuOpen
    },

    closeMobileMenu() {
      this.isMobileMenuOpen = false
    },

    toggleFilmRobot() {
      this.isFilmRobotOpen = !this.isFilmRobotOpen
    },

    setFilter(key: keyof UiState['activeFilters'], value: any) {
      this.activeFilters[key] = value
    },

    clearFilters() {
      this.activeFilters = {
        genre: null,
        type: null,
        year: null,
        rating: null,
        quality: null
      }
    }
  }
})

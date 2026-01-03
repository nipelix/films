import { useUiStore } from '~/stores/ui'
import { useFilmsStore } from '~/stores/films'

export function useFilmRobot() {
  const uiStore = useUiStore()
  const filmsStore = useFilmsStore()

  const isOpen = computed(() => uiStore.isFilmRobotOpen)
  const activeFilters = computed(() => uiStore.activeFilters)

  const toggle = () => {
    uiStore.toggleFilmRobot()
  }

  const setFilter = (key: 'genre' | 'type' | 'year' | 'rating' | 'quality', value: any) => {
    uiStore.setFilter(key, value)
  }

  const clearFilters = () => {
    uiStore.clearFilters()
  }

  const applyFilters = async () => {
    const filters: any = {}

    if (activeFilters.value.genre) filters.genre = activeFilters.value.genre
    if (activeFilters.value.year) filters.year = activeFilters.value.year
    if (activeFilters.value.rating) filters.rating = activeFilters.value.rating

    filmsStore.setFilters(filters)
    await filmsStore.fetchLatestFilms()
  }

  const genres = [
    'Aksiyon', 'Komedi', 'Dram', 'Korku', 'Bilim Kurgu', 'Romantik', 'Gerilim', 'Animasyon'
  ]

  const types = ['Yerli', 'Yabancı', 'Anime', 'Belgesel']

  const years = [2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018]

  const ratings = ['9+', '8+', '7+', '6+']

  const qualities = ['4K', '1080p', '720p', 'CAM']

  return {
    isOpen,
    activeFilters,
    toggle,
    setFilter,
    clearFilters,
    applyFilters,
    genres,
    types,
    years,
    ratings,
    qualities
  }
}

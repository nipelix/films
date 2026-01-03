import { useUiStore } from '~/stores/ui'

export function useTrailer() {
  const uiStore = useUiStore()

  const openTrailer = (options: {
    videoId: string
    title: string
    thumbnail?: string
    filmUrl?: string
  }) => {
    uiStore.openTrailerModal(options)
  }

  const closeTrailer = () => {
    uiStore.closeTrailerModal()
  }

  const isOpen = computed(() => uiStore.trailerModal.isOpen)

  return {
    openTrailer,
    closeTrailer,
    isOpen
  }
}

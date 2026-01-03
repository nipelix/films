import { defineStore } from 'pinia'

// Types
interface MenuItem {
  id: number
  title: string
  url: string
  icon: string | null
  badge_text: string | null
  badge_color: string | null
  position: 'main' | 'sub' | 'mobile'
  parent_id: number | null
  order: number
  is_active: boolean
  open_new_tab: boolean
  children?: MenuItem[]
}

interface MenuData {
  main: MenuItem[]
  sub: MenuItem[]
  mobile: MenuItem[]
}

interface Banner {
  id: number
  name: string
  position: string
  type: 'image' | 'html' | 'announcement'
  image: string | null
  link: string | null
  html_content: string | null
  alt_text: string | null
  is_active: boolean
  open_new_tab: boolean
  order: number
}

interface BannersData {
  header: Banner[]
  sidebar: Banner[]
  footer: Banner[]
  video_top: Banner[]
  video_bottom: Banner[]
  between_content: Banner[]
}

interface SidebarSection {
  id: number
  type: 'trending' | 'genres' | 'languages' | 'years' | 'comments'
  title: string
  icon: string | null
  order: number
  is_active: boolean
  item_limit: number
  footer_link: string | null
  footer_text: string | null
}

interface Genre {
  id: number
  name: string
  slug: string
  film_count: number
}

interface Year {
  year: number
  film_count: number
}

interface Film {
  id: number
  slug: string
  title: string
  original_title: string
  poster: string | null
  year: number | null
  imdb_rating: number | null
}

interface Comment {
  id: number
  author_name: string
  content: string
  comment_date: string
  film?: {
    id: number
    slug: string
    title: string
    poster: string | null
  }
}

interface LanguageType {
  id: number
  name: string
  slug: string
  badge_text: string
  color: string
}

interface SidebarData {
  sections: SidebarSection[]
  genres: Genre[]
  years: Year[]
  trendingFilms: Film[]
  recentComments: Comment[]
  languageTypes: LanguageType[]
}

interface LayoutState {
  menu: MenuData
  banners: BannersData
  sidebar: SidebarData
  isLoaded: boolean
  isLoading: boolean
  lastFetchTime: number | null
  refreshInterval: ReturnType<typeof setInterval> | null
}

export const useLayoutStore = defineStore('layout', {
  state: (): LayoutState => ({
    menu: { main: [], sub: [], mobile: [] },
    banners: {
      header: [],
      sidebar: [],
      footer: [],
      video_top: [],
      video_bottom: [],
      between_content: []
    },
    sidebar: {
      sections: [],
      genres: [],
      years: [],
      trendingFilms: [],
      recentComments: [],
      languageTypes: []
    },
    isLoaded: false,
    isLoading: false,
    lastFetchTime: null,
    refreshInterval: null
  }),

  getters: {
    // Menu getters
    mainMenu: (state) => state.menu.main,
    subMenu: (state) => state.menu.sub,
    mobileMenu: (state) => state.menu.mobile,

    // Banner getters
    headerBanners: (state) => state.banners.header,
    sidebarBanners: (state) => state.banners.sidebar,
    footerBanners: (state) => state.banners.footer,
    videoTopBanners: (state) => state.banners.video_top,
    videoBottomBanners: (state) => state.banners.video_bottom,
    betweenContentBanners: (state) => state.banners.between_content,

    // Sidebar getters
    sidebarSections: (state) => state.sidebar.sections,
    genres: (state) => state.sidebar.genres,
    years: (state) => state.sidebar.years,
    trendingFilms: (state) => state.sidebar.trendingFilms,
    recentComments: (state) => state.sidebar.recentComments,
    languageTypes: (state) => state.sidebar.languageTypes,

    // Sidebar section data check
    hasSidebarData: (state) => (type: string) => {
      switch (type) {
        case 'trending': return state.sidebar.trendingFilms.length > 0
        case 'genres': return state.sidebar.genres.length > 0
        case 'languages': return state.sidebar.languageTypes.length > 0
        case 'years': return state.sidebar.years.length > 0
        case 'comments': return state.sidebar.recentComments.length > 0
        default: return false
      }
    }
  },

  actions: {
    async fetchLayout(force = false) {
      // Zaten yüklendiyse ve force değilse tekrar çekme
      if (this.isLoaded && !force) return

      // Zaten yükleniyorsa bekle
      if (this.isLoading) return

      this.isLoading = true

      try {
        const response = await $fetch<{ success: boolean; data: any }>('/api/layout')

        if (response.success && response.data) {
          // Menu
          if (response.data.menu) {
            this.menu = response.data.menu
          }

          // Banners
          if (response.data.banners) {
            this.banners = response.data.banners
          }

          // Sidebar
          if (response.data.sidebar) {
            this.sidebar = {
              sections: response.data.sidebar.sections || [],
              genres: response.data.sidebar.genres || [],
              years: response.data.sidebar.years || [],
              trendingFilms: response.data.sidebar.trendingFilms || [],
              recentComments: response.data.sidebar.recentComments || [],
              languageTypes: response.data.sidebar.languageTypes || []
            }
          }

          this.isLoaded = true
          this.lastFetchTime = Date.now()
        }
      } catch (error) {
        console.error('Layout fetch error:', error)
      } finally {
        this.isLoading = false
      }
    },

    // Otomatik yenileme başlat (varsayılan 30 saniye)
    startAutoRefresh(intervalMs = 30000) {
      this.stopAutoRefresh()

      if (import.meta.client) {
        this.refreshInterval = setInterval(() => {
          this.fetchLayout(true)
        }, intervalMs)
      }
    },

    // Otomatik yenilemeyi durdur
    stopAutoRefresh() {
      if (this.refreshInterval) {
        clearInterval(this.refreshInterval)
        this.refreshInterval = null
      }
    },

    // Belirli bir pozisyondaki banner'ları getir
    getBannersByPosition(position: keyof BannersData) {
      return this.banners[position] || []
    }
  }
})

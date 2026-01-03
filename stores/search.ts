import { defineStore } from 'pinia'
import type { SearchResult } from '~/types'

interface SearchState {
  query: string
  results: SearchResult[]
  isLoading: boolean
  isOpen: boolean
  recentSearches: string[]
}

export const useSearchStore = defineStore('search', {
  state: (): SearchState => ({
    query: '',
    results: [],
    isLoading: false,
    isOpen: false,
    recentSearches: []
  }),

  actions: {
    async setQuery(query: string) {
      this.query = query

      if (query.length < 2) {
        this.results = []
        return
      }

      this.isLoading = true
      this.isOpen = true

      try {
        // Simulate API call - will be replaced with actual API
        await new Promise(resolve => setTimeout(resolve, 300))
        this.results = this.searchDemoData(query)
      } catch (error) {
        console.error('Search error:', error)
        this.results = []
      } finally {
        this.isLoading = false
      }
    },

    searchDemoData(query: string): SearchResult[] {
      const demoData: SearchResult[] = [
        {
          id: 1,
          slug: 'tuzak',
          name: 'Tuzak',
          originalName: 'Locked',
          poster: 'https://media.themoviedb.org/t/p/w220_and_h330_face/6WwBMHuauYm7vU9YvDgSShG0Im9.jpg',
          year: 2025,
          category: 'Aksiyon',
          rating: 7.5,
          type: 'movie'
        },
        {
          id: 2,
          slug: 'fantastik-dortlu',
          name: 'Fantastik Dörtlü',
          originalName: 'The Fantastic 4',
          poster: 'https://media.themoviedb.org/t/p/w220_and_h330_face/8kknNk7PbOcDUXynUZYZ7EHnKAA.jpg',
          year: 2025,
          category: 'Aksiyon',
          rating: 7.5,
          type: 'movie'
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
          type: 'movie'
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
          type: 'movie'
        },
        {
          id: 5,
          slug: 'breaking-bad',
          name: 'Breaking Bad',
          originalName: 'Breaking Bad',
          poster: 'https://media.themoviedb.org/t/p/w220_and_h330_face/ggFHVNu6YYI5L9pCfOacjizRGt.jpg',
          year: 2008,
          category: 'Dram',
          rating: 9.5,
          type: 'serie'
        }
      ]

      const lowerQuery = query.toLowerCase()
      return demoData.filter(item =>
        item.name.toLowerCase().includes(lowerQuery) ||
        item.originalName?.toLowerCase().includes(lowerQuery)
      )
    },

    openResults() {
      this.isOpen = true
    },

    closeResults() {
      this.isOpen = false
    },

    clearSearch() {
      this.query = ''
      this.results = []
      this.isOpen = false
    },

    addToRecentSearches(query: string) {
      if (!this.recentSearches.includes(query)) {
        this.recentSearches.unshift(query)
        if (this.recentSearches.length > 5) {
          this.recentSearches.pop()
        }
      }
    }
  },

  persist: {
    pick: ['recentSearches']
  }
})

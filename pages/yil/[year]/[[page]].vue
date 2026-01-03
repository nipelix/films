<script setup lang="ts">
import type { Film } from '~/components/film/Card.vue'
import { useFilmUtils } from '~/composables/useFilmUtils'

const { getFilmPoster } = useFilmUtils()

const route = useRoute()
const year = computed(() => route.params.year as string)
const currentPage = computed(() => {
  const page = route.params.page
  return page ? parseInt(page as string) : 1
})

// API'den film verilerini çek
const { data, pending, error } = await useAsyncData(
  `films-year-${year.value}-page-${currentPage.value}`,
  () => $fetch(`/api/films?year=${year.value}&page=${currentPage.value}&limit=24`),
  { watch: [currentPage] }
)

// Film verilerini dönüştür
const films = computed<Film[]>(() => {
  if (!data.value?.data) return []
  return data.value.data.map((film: any) => ({
    slug: film.slug,
    title: film.title,
    subtitle: film.original_title,
    poster: getFilmPoster(film.poster),
    year: film.year,
    category: film.genres?.[0]?.name,
    rating: film.imdb_rating
  }))
})

const totalPages = computed(() => data.value?.meta?.totalPages || 1)
const totalFilms = computed(() => data.value?.meta?.total || 0)

// SEO
useSeoMeta({
  title: () => {
    if (currentPage.value > 1) {
      return `${year.value} Filmleri - Sayfa ${currentPage.value} - FilmİzleJet`
    }
    return `${year.value} Filmleri izle - FilmİzleJet`
  },
  description: () => `${year.value} yılında çıkan en iyi filmler. ${year.value} yapımı ${totalFilms.value} film Full HD kalitesinde izle.`
})

// 404 kontrolü - geçersiz yıl
const isValidYear = computed(() => {
  const y = parseInt(year.value)
  return y >= 1900 && y <= new Date().getFullYear() + 1
})

if (!isValidYear.value) {
  throw createError({
    statusCode: 404,
    message: 'Geçersiz yıl'
  })
}
</script>

<template>
  <main class="subpage-container">
    <div class="content-wrapper">
      <div class="content-left">
        <div class="section-header-line">
          <h1 class="section-title">{{ year }} Filmleri</h1>
          <span v-if="totalFilms > 0" class="film-count">({{ totalFilms }} film)</span>
        </div>

        <!-- Loading State -->
        <div v-if="pending" class="loading-state">
          <p>Yükleniyor...</p>
        </div>

        <!-- Error State -->
        <div v-else-if="error" class="error-state">
          <p>Filmler yüklenirken bir hata oluştu.</p>
        </div>

        <!-- Empty State -->
        <div v-else-if="films.length === 0" class="empty-state">
          <p>{{ year }} yılına ait film bulunamadı.</p>
        </div>

        <!-- Film Grid -->
        <div v-else class="film-grid">
          <FilmCard
            v-for="film in films"
            :key="film.slug"
            :film="film"
            small
          />
        </div>

        <!-- Pagination -->
        <CommonAppPagination
          :current-page="currentPage"
          :total-pages="totalPages"
          :base-path="`/yil/${year}`"
        />
      </div>

      <div class="content-right">
        <LayoutAppSidebar />
      </div>
    </div>
  </main>
</template>

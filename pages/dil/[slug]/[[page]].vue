<script setup lang="ts">
import type { Film } from '~/components/film/Card.vue'
import { useFilmUtils } from '~/composables/useFilmUtils'

const { getFilmPoster } = useFilmUtils()

interface LanguageType {
  id: number
  name: string
  slug: string
  color: string
  badge_text: string
}

const route = useRoute()
const slug = computed(() => route.params.slug as string)
const currentPage = computed(() => {
  const page = route.params.page
  return page ? parseInt(page as string) : 1
})

// Dil tipi bilgisini çek
const { data: languageTypeData, error: languageTypeError } = await useAsyncData(
  `language-type-${slug.value}`,
  () => $fetch<{ data: LanguageType }>(`/api/language-types/${slug.value}`)
)

// 404 kontrolü
if (languageTypeError.value || !languageTypeData.value?.data) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Dil tipi bulunamadı'
  })
}

const languageType = computed(() => languageTypeData.value?.data)

// API'den film verilerini çek
const { data, pending, error } = await useAsyncData(
  `films-dil-${slug.value}-page-${currentPage.value}`,
  () => $fetch(`/api/films?language_type=${slug.value}&page=${currentPage.value}&limit=24`),
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
    const name = languageType.value?.name || 'Filmler'
    if (currentPage.value > 1) {
      return `${name} - Sayfa ${currentPage.value} - FilmİzleJet`
    }
    return `${name} Film izle - FilmİzleJet`
  },
  description: () => {
    const name = languageType.value?.name || 'Filmler'
    return `${name} filmler. ${totalFilms.value} film Full HD kalitesinde izle.`
  }
})
</script>

<template>
  <main class="subpage-container">
    <div class="content-wrapper">
      <div class="content-left">
        <div class="section-header-line">
          <h1 class="section-title">
            {{ languageType?.name }} Filmler
            <span
              v-if="languageType?.color"
              class="language-badge"
              :style="{ backgroundColor: languageType.color }"
            >
              {{ languageType.badge_text }}
            </span>
          </h1>
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
          <p>{{ languageType?.name }} film bulunamadı.</p>
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
          :base-path="`/dil/${slug}`"
        />
      </div>

      <div class="content-right">
        <LayoutAppSidebar />
      </div>
    </div>
  </main>
</template>

<style scoped>
.language-badge {
  font-size: 0.75rem;
  padding: 2px 8px;
  border-radius: 4px;
  color: white;
  margin-left: 8px;
  vertical-align: middle;
}
</style>

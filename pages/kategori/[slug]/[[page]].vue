<script setup lang="ts">
import type { Film } from '~/components/film/Card.vue'
import { useFilmUtils } from '~/composables/useFilmUtils'

const { getFilmPoster } = useFilmUtils()

const route = useRoute()
const slug = computed(() => route.params.slug as string)
const currentPage = computed(() => {
  const page = route.params.page
  return page ? parseInt(page as string) : 1
})

// API'den kategori ve film verilerini çek
const { data, pending, error } = await useAsyncData(
  `genre-${slug.value}-page-${currentPage.value}`,
  () => $fetch(`/api/genres/${slug.value}/films?page=${currentPage.value}&limit=24`),
  { watch: [slug, currentPage] }
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

const genreName = computed(() => data.value?.genre?.name || slug.value)
const totalPages = computed(() => data.value?.meta?.totalPages || 1)

useSeoMeta({
  title: () => currentPage.value > 1 ? `${genreName.value} Filmleri - Sayfa ${currentPage.value} - FilmİzleJet` : `${genreName.value} Filmleri - FilmİzleJet`,
  description: () => `${genreName.value} - En iyi filmleri HD kalitesinde izle`
})
</script>

<template>
  <main class="subpage-container">
    <div class="content-wrapper">
      <div class="content-left">
        <div class="section-header-line">
          <h2 class="section-title">{{ genreName }} Filmleri</h2>
        </div>

        <!-- Loading State -->
        <div v-if="pending" class="loading-state">
          <div class="film-grid">
            <div v-for="i in 12" :key="i" class="film-card-skeleton"></div>
          </div>
        </div>

        <!-- Error State -->
        <div v-else-if="error" class="error-state">
          <p>Filmler yüklenirken bir hata oluştu.</p>
        </div>

        <!-- Films Grid -->
        <div v-else class="film-grid">
          <FilmCard
            v-for="film in films"
            :key="film.slug"
            :film="film"
            small
          />
        </div>

        <CommonAppPagination
          :current-page="currentPage"
          :total-pages="totalPages"
          :base-path="`/kategori/${slug}`"
        />
      </div>

      <div class="content-right">
        <LayoutAppSidebar />
      </div>
    </div>
  </main>
</template>

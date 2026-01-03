<script setup lang="ts">
import type { Film } from '~/components/film/Card.vue'
import { useFilmUtils } from '~/composables/useFilmUtils'

const { getFilmPoster } = useFilmUtils()

const route = useRoute()
const code = computed(() => (route.params.code as string).toUpperCase())
const currentPage = computed(() => {
  const page = route.params.page
  return page ? parseInt(page as string) : 1
})

// Ülke adları
const countryNames: Record<string, string> = {
  US: 'Amerika',
  GB: 'İngiltere',
  FR: 'Fransa',
  DE: 'Almanya',
  IT: 'İtalya',
  ES: 'İspanya',
  JP: 'Japonya',
  KR: 'Güney Kore',
  CN: 'Çin',
  HK: 'Hong Kong',
  TW: 'Tayvan',
  IN: 'Hindistan',
  CA: 'Kanada',
  AU: 'Avustralya',
  NZ: 'Yeni Zelanda',
  MX: 'Meksika',
  BR: 'Brezilya',
  AR: 'Arjantin',
  RU: 'Rusya',
  TR: 'Türkiye',
  SE: 'İsveç',
  NO: 'Norveç',
  DK: 'Danimarka',
  FI: 'Finlandiya',
  NL: 'Hollanda',
  BE: 'Belçika',
  CH: 'İsviçre',
  AT: 'Avusturya',
  PL: 'Polonya',
  CZ: 'Çekya',
  IE: 'İrlanda',
  PT: 'Portekiz',
  GR: 'Yunanistan',
  IL: 'İsrail',
  ZA: 'Güney Afrika',
  EG: 'Mısır',
  TH: 'Tayland',
  PH: 'Filipinler',
  ID: 'Endonezya',
  MY: 'Malezya',
  SG: 'Singapur',
  VN: 'Vietnam',
  AE: 'BAE',
  SA: 'Suudi Arabistan',
  UA: 'Ukrayna',
  RO: 'Romanya',
  HU: 'Macaristan',
  CO: 'Kolombiya',
  CL: 'Şili',
  PE: 'Peru'
}

const countryName = computed(() => countryNames[code.value] || code.value)

// API'den film verilerini çek
const { data, pending, error } = await useAsyncData(
  `films-country-${code.value}-page-${currentPage.value}`,
  () => $fetch(`/api/films?country=${code.value}&page=${currentPage.value}&limit=24`),
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
      return `${countryName.value} Filmleri - Sayfa ${currentPage.value} - FilmİzleJet`
    }
    return `${countryName.value} Filmleri izle - FilmİzleJet`
  },
  description: () => `${countryName.value} yapımı filmler. ${totalFilms.value} ${countryName.value} filmi Full HD kalitesinde izle.`
})
</script>

<template>
  <main class="subpage-container">
    <div class="content-wrapper">
      <div class="content-left">
        <div class="section-header-line">
          <h1 class="section-title">{{ countryName }} Filmleri</h1>
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
          <p>{{ countryName }} filmi bulunamadı.</p>
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
          :base-path="`/ulke/${code.toLowerCase()}`"
        />
      </div>

      <div class="content-right">
        <LayoutAppSidebar />
      </div>
    </div>
  </main>
</template>

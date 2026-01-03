<script setup lang="ts">
import type { Film } from '~/components/film/Card.vue'
import type { UpcomingItem } from '~/components/film/UpcomingGrid.vue'
import { useFilmUtils } from '~/composables/useFilmUtils'

const { getFilmPoster } = useFilmUtils()

// API'den anasayfa verilerini çek
const { data: homeData, pending } = await useAsyncData('home', () => $fetch('/api/home'))

// Film verilerini dönüştür
const latestFilms = computed<Film[]>(() => {
  if (!homeData.value?.latestFilms) return []
  return homeData.value.latestFilms.map((film: any) => ({
    slug: film.slug,
    title: film.title,
    subtitle: film.original_title,
    poster: getFilmPoster(film.poster),
    year: film.year,
    category: film.genres?.[0]?.name,
    rating: film.imdb_rating
  }))
})

// Öne çıkan (featured) filmler - slider için
const featuredFilms = computed<Film[]>(() => {
  if (!homeData.value?.featuredFilms) return []
  return homeData.value.featuredFilms.map((film: any) => ({
    slug: film.slug,
    title: film.title,
    subtitle: film.original_title,
    poster: getFilmPoster(film.poster),
    year: film.year,
    category: film.genres?.[0]?.name,
    rating: film.imdb_rating
  }))
})

// Featured film var mı kontrolü
const hasFeaturedFilms = computed(() => featuredFilms.value.length > 0)

const totalFilms = computed(() => homeData.value?.stats?.totalFilms || 0)
const totalPages = computed(() => Math.ceil(totalFilms.value / 24))

// Trailer Modal State
const trailerModalOpen = ref(false)
const trailerData = ref({
  videoId: '',
  title: '',
  thumb: '',
  link: ''
})

const openTrailerModal = (item: UpcomingItem) => {
  trailerData.value = {
    videoId: item.videoId,
    title: item.title,
    thumb: item.thumb,
    link: item.link
  }
  trailerModalOpen.value = true
}

const closeTrailerModal = () => {
  trailerModalOpen.value = false
  trailerData.value.videoId = ''
}

// Yakında gelecek filmler (statik - bu ayrı bir API'den gelebilir)
const upcomingFilms: UpcomingItem[] = [
  { videoId: '82xS4goDWZY', title: 'Captain America: Brave New World', thumb: 'https://image.tmdb.org/t/p/w500/pzIddUEMWhWzfvLI3TwxUG2wGoi.jpg', link: '/film/captain-america', date: '14 Şub 2025', released: true },
  { videoId: 'hNlGLwvZBNw', title: 'Mickey 17', thumb: 'https://image.tmdb.org/t/p/w500/pzIddUEMWhWzfvLI3TwxUG2wGoi.jpg', link: '/film/mickey-17', date: '7 Mar 2025' },
  { videoId: 'yQEondeGvKo', title: 'Thunderbolts*', thumb: 'https://image.tmdb.org/t/p/w500/pzIddUEMWhWzfvLI3TwxUG2wGoi.jpg', link: '/film/thunderbolts', date: '2 May 2025' },
  { videoId: '82xS4goDWZY', title: 'Mission: Impossible 8', thumb: 'https://image.tmdb.org/t/p/w500/pzIddUEMWhWzfvLI3TwxUG2wGoi.jpg', link: '/film/mission-impossible-8', date: '23 May 2025', released: true },
  { videoId: '82xS4goDWZY', title: 'Karate Kid: Legends', thumb: 'https://image.tmdb.org/t/p/w500/pzIddUEMWhWzfvLI3TwxUG2wGoi.jpg', link: '/film/karate-kid-legends', date: '30 May 2025' }
]

useSeoMeta({
  title: 'FilmİzleJet - Film izle',
  description: 'En yeni filmler Full HD kalitesinde. Türkçe dublaj ve altyazılı film izle.'
})
</script>

<template>
  <main class="main-content">
    <!-- Duyuru Banner -->
    <CommonAnnouncementBanner />

    <!-- Header Altı Reklam -->
    <CommonBannerArea />

    <!-- Ana İçerik Section -->
    <section class="section section-editor-pick">
      <!-- Öne Çıkan Filmler - Sadece featured film varsa göster -->
      <template v-if="hasFeaturedFilms">
        <!-- Editörün Seçimi - Sadece Desktop -->
        <CommonSectionHeader title="Öne Çıkan Filmler" class="desktop-only" />

        <!-- Mobil: Yeni Kart Slider -->
        <div id="movie-slider-container" class="mobile-only"></div>

        <!-- Desktop: Slider -->
        <div v-if="pending" class="loading-state">Yükleniyor...</div>
        <FilmEditorPickSlider v-else :films="featuredFilms" />

        <!-- Film Robotu Bar -->
        <FilmRobotBar />
      </template>

      <!-- Ayırıcı Çizgi - Sadece featured film varsa göster -->
      <div v-if="hasFeaturedFilms" class="section-divider"></div>

      <!-- Gelecek Filmler -->
      <CommonSectionHeader title="Gelecek Filmler" show-line />
      <FilmUpcomingGrid :items="upcomingFilms" @open-trailer="openTrailerModal" />

      <!-- İki Sütunlu Alan -->
      <div class="content-wrapper">
        <!-- Sol Taraf -->
        <div class="content-left">
          <CommonSectionHeader title="Son Eklenen Filmler" show-line />

          <div v-if="pending" class="loading-state">Yükleniyor...</div>
          <div v-else class="film-grid">
            <FilmCard
              v-for="film in latestFilms"
              :key="film.slug"
              :film="film"
              small
            />
          </div>

          <!-- Pagination -->
          <CommonAppPagination :current-page="1" :total-pages="totalPages" base-path="/filmler" />
        </div>

        <!-- Sağ Taraf - Sidebar -->
        <div class="content-right">
          <LayoutAppSidebar />
        </div>
      </div>
    </section>
  </main>

  <!-- Fragman Modal -->
  <ModalTrailerModal
    :open="trailerModalOpen"
    :video-id="trailerData.videoId"
    :title="trailerData.title"
    :thumb="trailerData.thumb"
    :link="trailerData.link"
    @close="closeTrailerModal"
  />
</template>

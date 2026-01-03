<script setup lang="ts">
import type { Person } from '~/components/person/Card.vue'
import { useFilmUtils } from '~/composables/useFilmUtils'

const { getProfileImage } = useFilmUtils()

const route = useRoute()
const currentPage = computed(() => {
  const page = route.params.page
  return page ? parseInt(page as string) : 1
})

// API'den oyuncu verilerini çek
const { data, pending, error } = await useAsyncData(
  `actors-page-${currentPage.value}`,
  () => $fetch(`/api/actors?page=${currentPage.value}&limit=24`),
  { watch: [currentPage] }
)

// Oyuncu verilerini dönüştür
const actors = computed<Person[]>(() => {
  if (!data.value?.data) return []
  return data.value.data.map((actor: any) => ({
    slug: actor.slug,
    name: actor.name,
    image: actor.poster
      ? getProfileImage(actor.poster)
      : actor.profile_path
        ? `https://image.tmdb.org/t/p/w220_and_h330_face${actor.profile_path}`
        : '/images/no-profile.jpg',
    filmCount: parseInt(actor.film_count) || 0
  }))
})

const totalPages = computed(() => data.value?.meta?.totalPages || 1)

useSeoMeta({
  title: () => currentPage.value > 1 ? `Oyuncular - Sayfa ${currentPage.value} - FilmİzleJet` : 'Oyuncular - FilmİzleJet',
  description: 'Film oyuncuları, aktörler ve aktrisler'
})
</script>

<template>
  <main class="subpage-container">
    <div class="content-wrapper">
      <div class="content-left">
        <div class="section-header-line">
          <h2 class="section-title">Oyuncular</h2>
        </div>

        <!-- Loading State -->
        <div v-if="pending" class="loading-state">
          <div class="actor-grid">
            <div v-for="i in 12" :key="i" class="actor-card-skeleton"></div>
          </div>
        </div>

        <!-- Error State -->
        <div v-else-if="error" class="error-state">
          <p>Oyuncular yüklenirken bir hata oluştu.</p>
        </div>

        <!-- Actors Grid -->
        <div v-else class="actor-grid">
          <PersonCard
            v-for="actor in actors"
            :key="actor.slug"
            :person="actor"
            type="oyuncu"
          />
        </div>

        <CommonAppPagination
          :current-page="currentPage"
          :total-pages="totalPages"
          base-path="/oyuncular"
        />
      </div>

      <div class="content-right">
        <LayoutAppSidebar />
      </div>
    </div>
  </main>
</template>

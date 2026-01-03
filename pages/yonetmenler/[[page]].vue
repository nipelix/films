<script setup lang="ts">
import type { Person } from '~/components/person/Card.vue'
import { useFilmUtils } from '~/composables/useFilmUtils'

const { getProfileImage } = useFilmUtils()

const route = useRoute()
const currentPage = computed(() => {
  const page = route.params.page
  return page ? parseInt(page as string) : 1
})

// API'den yönetmen verilerini çek
const { data, pending, error } = await useAsyncData(
  `directors-page-${currentPage.value}`,
  () => $fetch(`/api/directors?page=${currentPage.value}&limit=24`),
  { watch: [currentPage] }
)

// Yönetmen verilerini dönüştür
const directors = computed<Person[]>(() => {
  if (!data.value?.data) return []
  return data.value.data.map((director: any) => ({
    slug: director.slug,
    name: director.name,
    image: director.poster
      ? getProfileImage(director.poster)
      : director.profile_path
        ? `https://image.tmdb.org/t/p/w220_and_h330_face${director.profile_path}`
        : '/images/no-profile.jpg',
    filmCount: parseInt(director.film_count) || 0
  }))
})

const totalPages = computed(() => data.value?.meta?.totalPages || 1)

useSeoMeta({
  title: () => currentPage.value > 1 ? `Yönetmenler - Sayfa ${currentPage.value} - FilmİzleJet` : 'Yönetmenler - FilmİzleJet',
  description: 'En popüler yönetmenler ve filmografi bilgileri'
})
</script>

<template>
  <main class="subpage-container">
    <div class="content-wrapper">
      <div class="content-left">
        <div class="section-header-line">
          <h2 class="section-title">Popüler Yönetmenler</h2>
        </div>

        <!-- Loading State -->
        <div v-if="pending" class="loading-state">
          <div class="actor-grid">
            <div v-for="i in 12" :key="i" class="actor-card-skeleton"></div>
          </div>
        </div>

        <!-- Error State -->
        <div v-else-if="error" class="error-state">
          <p>Yönetmenler yüklenirken bir hata oluştu.</p>
        </div>

        <!-- Directors Grid -->
        <div v-else class="actor-grid">
          <PersonCard
            v-for="director in directors"
            :key="director.slug"
            :person="director"
            type="yonetmen"
          />
        </div>

        <CommonAppPagination
          :current-page="currentPage"
          :total-pages="totalPages"
          base-path="/yonetmenler"
        />
      </div>

      <div class="content-right">
        <LayoutAppSidebar />
      </div>
    </div>
  </main>
</template>

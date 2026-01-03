<script setup lang="ts">
import type { Film } from '~/components/film/Card.vue'
import { useFilmUtils } from '~/composables/useFilmUtils'

const { getFilmPoster, getProfileImage } = useFilmUtils()

const route = useRoute()
const slug = computed(() => route.params.slug as string)

// API'den oyuncu verilerini çek
const { data, pending, error } = await useAsyncData(
  `actor-${slug.value}`,
  () => $fetch(`/api/actors/${slug.value}`)
)

const actor = computed(() => data.value?.actor)
const totalPages = computed(() => data.value?.meta?.totalPages || 1)

// Film verilerini dönüştür
const films = computed<Film[]>(() => {
  if (!data.value?.films) return []
  return data.value.films.map((film: any) => ({
    slug: film.slug,
    title: film.title,
    subtitle: film.original_title,
    poster: getFilmPoster(film.poster),
    year: film.year,
    category: film.genres?.[0]?.name,
    rating: film.imdb_rating
  }))
})

const actorImage = computed(() => {
  if (!actor.value) return '/images/no-profile.jpg'
  if (actor.value.poster) return getProfileImage(actor.value.poster)
  if (actor.value.profile_path) return `https://image.tmdb.org/t/p/w220_and_h330_face${actor.value.profile_path}`
  return '/images/no-profile.jpg'
})

useSeoMeta({
  title: () => actor.value ? `${actor.value.name} Filmleri - FilmİzleJet` : 'Oyuncu - FilmİzleJet',
  description: () => actor.value ? `${actor.value.name} filmleri ve biyografisi` : ''
})

// 404 kontrolü
if (error.value) {
  throw createError({
    statusCode: 404,
    message: 'Oyuncu bulunamadı'
  })
}
</script>

<template>
  <main class="subpage-container">
    <div class="content-wrapper">
      <div class="content-left">
        <!-- Loading State -->
        <div v-if="pending" class="loading-state">
          <p>Yükleniyor...</p>
        </div>

        <template v-else-if="actor">
          <!-- Oyuncu Profil -->
          <div class="actor-profile-bar">
            <div class="actor-profile-left">
              <div class="actor-avatar">
                <img :src="actorImage" :alt="actor.name">
              </div>
              <div class="actor-profile-text">
                <h1 class="actor-profile-name">{{ actor.name }}</h1>
                <div class="actor-profile-meta">
                  <span class="meta-item">
                    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M18 4l2 4h-3l-2-4h-2l2 4h-3l-2-4H8l2 4H7L5 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4h-4z"/></svg>
                    {{ data?.meta?.total || 0 }} Film
                  </span>
                  <span class="meta-divider"></span>
                  <span class="meta-item">
                    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
                    Oyuncu
                  </span>
                </div>
              </div>
            </div>
            <NuxtLink to="/oyuncular" class="actor-back-btn">
              <i class="fas fa-arrow-left"></i>
              Geri Dön
            </NuxtLink>
          </div>

          <!-- Filmler Başlık -->
          <div class="section-header-line">
            <h2 class="section-title">{{ actor.name }} Filmleri</h2>
          </div>

          <!-- Film Grid -->
          <div class="film-grid">
            <FilmCard
              v-for="film in films"
              :key="film.slug"
              :film="film"
              small
            />
          </div>

          <!-- Pagination -->
          <CommonAppPagination
            :current-page="1"
            :total-pages="totalPages"
            :base-path="`/oyuncu/${slug}`"
          />
        </template>
      </div>

      <div class="content-right">
        <LayoutAppSidebar />
      </div>
    </div>
  </main>
</template>

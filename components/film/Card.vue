<script setup lang="ts">
export interface Film {
  slug: string
  title: string
  subtitle?: string
  poster: string
  year?: string | number
  category?: string
  rating?: string | number
  badge?: string
  badgeType?: 'altyazi' | 'dublaj' | 'dual' | 'yerli' | 'yakinda'
  quality?: string
}

defineProps<{
  film: Film
  small?: boolean
}>()
</script>

<template>
  <NuxtLink :to="`/film/${film.slug}`" :class="['film-card', { 'film-card-sm': small }]">
    <div class="film-poster">
      <img :src="film.poster" :alt="film.title">
      <span v-if="film.quality" class="film-badge">{{ film.quality }}</span>
      <span v-if="film.badge" :class="['film-badge-sub', film.badgeType || 'altyazi']">{{ film.badge }}</span>
      <div class="film-play"><i class="fas fa-play"></i></div>
      <div class="film-info">
        <h3 class="film-title">{{ film.title }}</h3>
        <p v-if="film.subtitle" class="film-subtitle">{{ film.subtitle }}</p>
        <span v-if="film.year || film.category || film.rating" class="film-year">
          <span v-if="film.year" class="year-text">{{ film.year }}</span>
          <span v-if="film.category" class="category-text">{{ film.category }}</span>
          <span v-if="film.rating" class="rating-text">{{ film.rating }}</span>
        </span>
      </div>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
import type { Film } from '../film/Card.vue'

defineProps<{
  films: Film[]
}>()
</script>

<template>
  <div class="similar-films">
    <CommonSectionHeader title="Benzer Filmler" show-line />
    <div class="similar-slider">
      <button class="slider-arrow prev">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor"><path d="M15 12H6V3H4v11h11z" transform="rotate(45 8 8)"/></svg>
      </button>
      <div class="similar-container">
        <NuxtLink
          v-for="film in films"
          :key="film.slug"
          :to="`/film/${film.slug}`"
          class="film-card"
        >
          <div class="film-poster">
            <img :src="film.poster" :alt="film.title">
            <span v-if="film.quality" class="film-badge">{{ film.quality }}</span>
            <span v-if="film.badge" :class="['film-badge-sub', film.badgeType || 'dublaj']">{{ film.badge }}</span>
            <div class="film-play"><i class="fas fa-play"></i></div>
            <div class="film-info">
              <h3 class="film-title">{{ film.title }}</h3>
              <p v-if="film.subtitle" class="film-subtitle">{{ film.subtitle }}</p>
              <span class="film-year">{{ film.year }}</span>
            </div>
          </div>
        </NuxtLink>
      </div>
      <button class="slider-arrow next">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor"><path d="M15 12H6V3H4v11h11z" transform="rotate(-135 8 8)"/></svg>
      </button>
    </div>
  </div>
</template>

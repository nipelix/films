<script setup lang="ts">
import type { Film } from './Card.vue'

defineProps<{
  films: Film[]
}>()
</script>

<template>
  <div class="slider-wrapper desktop-only">
    <button class="slider-arrow prev">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor"><path d="M15 12H6V3H4v11h11z" transform="rotate(45 8 8)"/></svg>
    </button>

    <div class="slider-container">
      <NuxtLink
        v-for="film in films"
        :key="film.slug"
        :to="`/film/${film.slug}`"
        class="film-card"
      >
        <div class="film-poster">
          <img :src="film.poster" :alt="film.title">
          <div class="film-play"><i class="fas fa-play"></i></div>
          <div class="film-info">
            <h3 class="film-title">{{ film.title }}</h3>
            <p v-if="film.subtitle" class="film-subtitle">{{ film.subtitle }}</p>
            <span class="film-year">
              <span v-if="film.year" class="year-text">{{ film.year }}</span>
              <span v-if="film.category" class="category-text">{{ film.category }}</span>
              <span v-if="film.rating" class="rating-text">{{ film.rating }}</span>
            </span>
          </div>
        </div>
      </NuxtLink>
    </div>

    <button class="slider-arrow next">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor"><path d="M15 12H6V3H4v11h11z" transform="rotate(-135 8 8)"/></svg>
    </button>
  </div>
</template>

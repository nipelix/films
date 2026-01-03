<script setup lang="ts">
import type { Film } from './Card.vue'

defineProps<{
  films: Film[]
}>()
</script>

<template>
  <div class="film-grid">
    <FilmCard
      v-for="film in films"
      :key="film.slug"
      :film="film"
      small
    />
  </div>
</template>

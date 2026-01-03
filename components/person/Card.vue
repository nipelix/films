<script setup lang="ts">
export interface Person {
  slug: string
  name: string
  image: string
  filmCount?: number
  role?: string
}

defineProps<{
  person: Person
  type?: 'oyuncu' | 'yonetmen'
}>()
</script>

<template>
  <NuxtLink :to="`/${type || 'oyuncu'}/${person.slug}`" class="actor-card">
    <div class="actor-poster">
      <img :src="person.image" :alt="person.name">
      <div class="actor-info">
        <h3 class="actor-name">{{ person.name }}</h3>
        <span class="actor-film-count">{{ person.filmCount || 0 }} Film</span>
      </div>
      <div class="film-play"><i class="fas fa-play"></i></div>
    </div>
  </NuxtLink>
</template>

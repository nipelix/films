<script setup lang="ts">
export interface FilmList {
  slug: string
  title: string
  poster: string
  count: number
}

defineProps<{
  lists: FilmList[]
}>()
</script>

<template>
  <div class="recommended-lists">
    <CommonSectionHeader
      title="Önerilen Film Listeleri"
      link="/film-listeleri"
      link-text="Film Listeleri"
      show-line
    />
    <div class="lists-slider">
      <button class="slider-arrow prev">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor"><path d="M15 12H6V3H4v11h11z" transform="rotate(45 8 8)"/></svg>
      </button>
      <div class="lists-container">
        <NuxtLink
          v-for="list in lists"
          :key="list.slug"
          :to="`/liste/${list.slug}`"
          class="list-card"
        >
          <div class="list-poster">
            <img :src="list.poster" :alt="list.title">
            <span class="list-count">{{ list.count }} Film</span>
            <div class="film-play"><i class="fas fa-play"></i></div>
            <h4 class="list-title">{{ list.title }}</h4>
          </div>
        </NuxtLink>
      </div>
      <button class="slider-arrow next">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor"><path d="M15 12H6V3H4v11h11z" transform="rotate(-135 8 8)"/></svg>
      </button>
    </div>
  </div>
</template>

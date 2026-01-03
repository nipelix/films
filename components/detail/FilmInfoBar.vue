<script setup lang="ts">
export interface FilmInfo {
  title: string
  views: number | string
  imdb: number | string
  rating: string
  breadcrumbs: { label: string; link: string }[]
}

defineProps<{
  info: FilmInfo
}>()

const emit = defineEmits<{
  openTrailer: []
}>()
</script>

<template>
  <div class="film-info-bar">
    <div class="film-info-left">
      <h1 class="film-title">{{ info.title }}</h1>
      <nav class="film-breadcrumb">
        <template v-for="(crumb, index) in info.breadcrumbs" :key="index">
          <NuxtLink :to="crumb.link">{{ crumb.label }}</NuxtLink>
          <span v-if="index < info.breadcrumbs.length - 1" class="breadcrumb-separator">›</span>
        </template>
      </nav>
    </div>
    <div class="film-info-right">
      <div class="stat-wrapper views">
        <div class="stat-btn"><i class="fas fa-tv"></i></div>
        <div class="stat-value-box">{{ info.views }}</div>
      </div>
      <div class="stat-wrapper imdb">
        <div class="stat-btn">IMDB</div>
        <div class="stat-value-box">{{ info.imdb }}</div>
      </div>
      <div class="stat-wrapper rating">
        <div class="stat-btn"><i class="fas fa-star"></i></div>
        <div class="stat-value-box">{{ info.rating }}</div>
      </div>
      <button class="btn-trailer-mobile" @click="emit('openTrailer')">
        <i class="fas fa-play"></i> Fragman
      </button>
    </div>
  </div>
</template>

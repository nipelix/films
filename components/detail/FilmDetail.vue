<script setup lang="ts">
export interface FilmMeta {
  label: string
  value: string
  links?: { text: string; link: string }[]
  country?: { code: string; name: string }
}

export interface FilmDetailData {
  poster: string
  quality: string[]
  duration: string
  description: string
  meta: FilmMeta[]
}

defineProps<{
  detail: FilmDetailData
}>()

const emit = defineEmits<{
  openTrailer: []
}>()
</script>

<template>
  <div class="film-detail">
    <div class="film-detail-left">
      <div class="film-poster-wrapper">
        <img :src="detail.poster" alt="Film Poster">
        <div class="film-quality-badges">
          <span
            v-for="q in detail.quality"
            :key="q"
            :class="['quality-badge', q.toLowerCase() === '4k' ? 'q4k' : 'hd']"
          >{{ q }}</span>
        </div>
        <span class="film-duration">{{ detail.duration }}</span>
      </div>
      <button class="btn-trailer" @click="emit('openTrailer')">Fragmanı İzle</button>
    </div>
    <div class="film-detail-right">
      <div class="film-description">{{ detail.description }}</div>
      <div class="film-meta-list">
        <div v-for="meta in detail.meta" :key="meta.label" class="film-meta-item">
          <span class="meta-label">{{ meta.label }}</span>
          <span class="meta-separator">:</span>
          <span class="meta-value">
            <template v-if="meta.links">
              <template v-for="(link, i) in meta.links" :key="link.link">
                <NuxtLink :to="link.link">{{ link.text }}</NuxtLink>
                <template v-if="i < meta.links.length - 1">, </template>
              </template>
            </template>
            <template v-else-if="meta.country">
              <span class="meta-country">
                <img :src="`https://react-circle-flags.pages.dev/${meta.country.code.toLowerCase()}.svg`" :alt="meta.country.code" width="14" height="14" style="vertical-align: middle;">
                {{ meta.country.name }}
              </span>
            </template>
            <template v-else>{{ meta.value }}</template>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

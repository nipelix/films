<script setup lang="ts">
export interface UpcomingItem {
  videoId: string
  title: string
  thumb: string
  link: string
  date: string
  released?: boolean
}

defineProps<{
  items: UpcomingItem[]
}>()

const emit = defineEmits<{
  openTrailer: [item: UpcomingItem]
}>()
</script>

<template>
  <div class="upcoming-grid">
    <a
      v-for="item in items"
      :key="item.videoId"
      href="javascript:void(0)"
      class="upcoming-item"
      @click="emit('openTrailer', item)"
    >
      <div class="upcoming-poster">
        <img :src="item.thumb" :alt="item.title">
        <span v-if="item.released" class="upcoming-badge">Yayınlandı</span>
      </div>
      <h4 class="upcoming-title">{{ item.title }}</h4>
      <span class="upcoming-season">{{ item.date }}</span>
    </a>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  open: boolean
  videoId: string
  title: string
  thumb: string
  link: string
}>()

const emit = defineEmits<{
  close: []
}>()
</script>

<template>
  <div class="trailer-modal" :class="{ active: open }">
    <div class="trailer-modal-content">
      <div class="trailer-modal-header">
        <NuxtLink :to="link" class="trailer-badge">Bu Sezon Başladı: Şimdi İzle!</NuxtLink>
        <button class="trailer-close" @click="emit('close')">
          <i class="fas fa-times"></i>
          Kapat
        </button>
      </div>
      <div class="trailer-video-container">
        <iframe
          v-if="open && videoId"
          width="100%"
          height="480"
          frameborder="0"
          title="fragman izle"
          allowfullscreen
          :src="`https://www.youtube.com/embed/${videoId}?autoplay=1`"
        ></iframe>
      </div>
      <div class="trailer-info">
        <div class="trailer-info-icon">
          <img :src="thumb" alt="">
        </div>
        <span class="trailer-info-text">{{ title }}</span>
      </div>
    </div>
  </div>
</template>

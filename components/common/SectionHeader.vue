<script setup lang="ts">
defineProps<{
  title: string
  link?: string
  linkText?: string
  showLine?: boolean
  count?: number
}>()
</script>

<template>
  <div :class="showLine ? 'section-header-line' : 'section-header'">
    <h2 class="section-title">
      {{ title }}
      <span v-if="count !== undefined" class="comments-count">{{ count }}</span>
    </h2>
    <NuxtLink v-if="link" :to="link" class="section-link">
      {{ linkText || 'Tümünü Gör' }} <i class="fas fa-chevron-right"></i>
    </NuxtLink>
    <div v-if="!showLine && !link" class="slider-indicators">
      <span class="slider-indicator active"></span>
      <span class="slider-indicator"></span>
    </div>
  </div>
</template>

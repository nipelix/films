<script setup lang="ts">
import { useLayoutStore } from '~/stores/layout'

const layoutStore = useLayoutStore()

// İlk yüklemede layout verilerini çek
await layoutStore.fetchLayout()

// Client-side'da otomatik yenileme başlat (30 saniye)
onMounted(() => {
  layoutStore.startAutoRefresh(30000)
})

// Unmount'ta temizle
onUnmounted(() => {
  layoutStore.stopAutoRefresh()
})
</script>

<template>
  <div>
    <LayoutAppHeader />
    <slot />
    <LayoutAppFooter />
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  currentPage: number
  totalPages: number
  basePath: string
}>()

// Sayfa numaralarını hesapla
const visiblePages = computed(() => {
  const pages: (number | string)[] = []
  const current = props.currentPage
  const total = props.totalPages

  if (total <= 7) {
    // 7 veya daha az sayfa varsa hepsini göster
    for (let i = 1; i <= total; i++) {
      pages.push(i)
    }
  } else {
    // Her zaman ilk sayfayı göster
    pages.push(1)

    if (current > 3) {
      pages.push('...')
    }

    // Ortadaki sayfalar
    const start = Math.max(2, current - 1)
    const end = Math.min(total - 1, current + 1)

    for (let i = start; i <= end; i++) {
      pages.push(i)
    }

    if (current < total - 2) {
      pages.push('...')
    }

    // Her zaman son sayfayı göster
    pages.push(total)
  }

  return pages
})

// Sayfa URL'ini oluştur
const getPageUrl = (page: number) => {
  if (page === 1) {
    return props.basePath
  }
  return `${props.basePath}/${page}`
}

const prevPage = computed(() => Math.max(1, props.currentPage - 1))
const nextPage = computed(() => Math.min(props.totalPages, props.currentPage + 1))
</script>

<template>
  <div v-if="totalPages > 1" class="pagination">
    <NuxtLink
      v-if="currentPage > 1"
      :to="getPageUrl(prevPage)"
      class="prev"
    >
      Geri
    </NuxtLink>
    <span v-else class="prev disabled">Geri</span>

    <template v-for="(page, index) in visiblePages" :key="index">
      <span v-if="page === '...'" class="dots">...</span>
      <span v-else-if="page === currentPage" class="active">{{ page }}</span>
      <NuxtLink v-else :to="getPageUrl(page as number)">{{ page }}</NuxtLink>
    </template>

    <NuxtLink
      v-if="currentPage < totalPages"
      :to="getPageUrl(nextPage)"
      class="next"
    >
      İleri
    </NuxtLink>
    <span v-else class="next disabled">İleri</span>
  </div>
</template>

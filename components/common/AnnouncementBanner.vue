<script setup lang="ts">
const props = defineProps<{
  message?: string
}>()

// API'den duyuru verisini çek (sadece prop olarak verilmediyse)
const { data: announcementData } = await useAsyncData(
  'announcement-banner',
  () => $fetch('/api/banners/announcement'),
  {
    immediate: !props.message,
    default: () => ({ data: null })
  }
)

const displayMessage = computed(() => {
  if (props.message) return props.message
  if (announcementData.value?.data?.html_content) return announcementData.value.data.html_content
  return 'Hoşgeldiniz! En yeni filmler Full HD kalitesinde sizleri bekliyor.'
})

const announcementLink = computed(() => {
  return announcementData.value?.data?.link || null
})
</script>

<template>
  <div v-if="displayMessage" class="announcement">
    <i class="fas fa-arrow-right"></i>
    <NuxtLink v-if="announcementLink" :to="announcementLink">
      <p>{{ displayMessage }}</p>
    </NuxtLink>
    <p v-else>{{ displayMessage }}</p>
  </div>
</template>

<script setup lang="ts">
import { useLayoutStore } from '~/stores/layout'

export type BannerPosition = 'header' | 'sidebar' | 'footer' | 'video_top' | 'video_bottom' | 'between_content'

const props = withDefaults(defineProps<{
  position?: BannerPosition
  single?: boolean
}>(), {
  position: 'header',
  single: false
})

const layoutStore = useLayoutStore()

// Store'dan banner al
const displayBanners = computed(() => {
  const bannerList = layoutStore.getBannersByPosition(props.position)
  // Image tipindeki bannerları filtrele
  const imageBanners = bannerList.filter(b => b.type === 'image')

  if (props.single) {
    return imageBanners.slice(0, 1)
  }
  return imageBanners
})
</script>

<template>
  <div v-if="displayBanners.length > 0" class="banner-area">
    <div
      v-for="banner in displayBanners"
      :key="banner.id"
      class="banner-item"
    >
      <a
        v-if="banner.link"
        :href="banner.link"
        :target="banner.open_new_tab ? '_blank' : '_self'"
        :rel="banner.open_new_tab ? 'noopener noreferrer' : undefined"
      >
        <img :src="banner.image!" :alt="banner.alt_text || 'Sponsor'">
      </a>
      <img v-else :src="banner.image!" :alt="banner.alt_text || 'Sponsor'">
    </div>
  </div>
</template>

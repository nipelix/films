<script setup lang="ts">
export interface FilmSourceItem {
  id: number
  name: string
  source_id: number
  priority: number
  quality: string | null
  source?: {
    id: number
    name: string
    slug: string
  }
}

const props = defineProps<{
  sources?: FilmSourceItem[]
}>()

const emit = defineEmits<{
  openErrorModal: []
}>()

// Aktif kaynak index
const activeSourceIndex = ref(0)

// Embed kodu (AJAX ile yüklenir)
const currentEmbed = ref<string | null>(null)
const loadingEmbed = ref(false)
const embedError = ref(false)

// Tüm kaynakları düz liste olarak al
const allSources = computed(() => props.sources || [])

// Aktif kaynak
const activeSource = computed(() => allSources.value[activeSourceIndex.value])

// Embed kodunu yükle
const loadEmbed = async (sourceId: number) => {
  loadingEmbed.value = true
  embedError.value = false
  currentEmbed.value = null

  try {
    const data = await $fetch<{ embed: string | null }>(`/api/sources/${sourceId}`)
    currentEmbed.value = data.embed
  } catch (error) {
    console.error('Embed yüklenirken hata:', error)
    embedError.value = true
  } finally {
    loadingEmbed.value = false
  }
}

// Kaynak değiştir
const setActiveSource = async (index: number) => {
  activeSourceIndex.value = index
  const source = allSources.value[index]
  if (source) {
    await loadEmbed(source.id)
  }
}

// Sayfa yüklendiğinde ilk kaynağı yükle
onMounted(() => {
  if (allSources.value.length > 0) {
    loadEmbed(allSources.value[0].id)
  }
})

// Sources değiştiğinde ilk kaynağı yükle
watch(() => props.sources, (newSources) => {
  if (newSources && newSources.length > 0) {
    activeSourceIndex.value = 0
    loadEmbed(newSources[0].id)
  }
}, { immediate: false })

// Kaynak türü renkleri
const getSourceColor = (sourceName: string) => {
  const colors: Record<string, string> = {
    'DUAL': '#9b59b6',
    'Türkçe Dublaj': '#e74c3c',
    'DUBLAJ': '#e74c3c',
    'Türkçe Altyazı': '#3498db',
    'ALTYAZI': '#3498db',
    'Yerli': '#27ae60',
    'YERLİ': '#27ae60'
  }
  return colors[sourceName] || '#95a5a6'
}
</script>

<template>
  <div class="video-section">
    <!-- Player Üstü Reklam -->
    <CommonBannerArea position="video_top" />

    <!-- Kaynak Seçici -->
    <div v-if="allSources.length > 0" class="source-selector">
      <div class="source-tabs">
        <button
          v-for="(source, index) in allSources"
          :key="source.id"
          class="source-tab"
          :class="{ active: activeSourceIndex === index }"
          :style="{ '--source-color': getSourceColor(source.source?.name || '') }"
          @click="setActiveSource(index)"
        >
          <span class="source-type">{{ source.source?.name || 'Kaynak' }}</span>
          <span class="source-name">{{ source.name }}</span>
          <span v-if="source.quality" class="source-quality">{{ source.quality }}</span>
        </button>
      </div>
    </div>

    <!-- Video Player -->
    <div class="video-player">
      <!-- Loading State -->
      <div v-if="loadingEmbed" class="video-placeholder loading">
        <div class="loading-spinner"></div>
        <span>Video yükleniyor...</span>
      </div>

      <!-- Error State -->
      <div v-else-if="embedError" class="video-placeholder error">
        <i class="fas fa-exclamation-triangle"></i>
        <span>Video yüklenirken hata oluştu</span>
        <button class="retry-btn" @click="loadEmbed(activeSource?.id || 0)">
          <i class="fas fa-redo"></i> Tekrar Dene
        </button>
      </div>

      <!-- Video iframe -->
      <div v-else-if="currentEmbed" class="video-iframe-container" v-html="currentEmbed"></div>

      <!-- No Source State -->
      <div v-else class="video-placeholder">
        <i class="fas fa-play-circle"></i>
        <span v-if="allSources.length === 0">Kaynak bulunamadı</span>
        <span v-else>Kaynağı seçin</span>
      </div>
    </div>

    <!-- Player Kontrolleri -->
    <DetailPlayerControls @open-error-modal="emit('openErrorModal')" />

    <!-- Player Altı Reklam -->
    <CommonBannerArea position="video_bottom" single />
  </div>
</template>

<style scoped>
.source-selector {
  margin-bottom: 15px;
}

.source-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.source-tab {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  background: #1a1a2e;
  border: 2px solid transparent;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.source-tab:hover {
  background: #252540;
}

.source-tab.active {
  border-color: var(--source-color, #e50914);
  background: rgba(229, 9, 20, 0.1);
}

.source-type {
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  padding: 3px 8px;
  border-radius: 4px;
  background: var(--source-color, #e50914);
  color: #fff;
}

.source-name {
  font-size: 14px;
  font-weight: 500;
  color: #fff;
}

.source-quality {
  font-size: 11px;
  font-weight: 600;
  padding: 2px 6px;
  border-radius: 3px;
  background: #ffc107;
  color: #000;
}

.video-iframe-container {
  position: relative;
  width: 100%;
  padding-top: 56.25%;
  background: #000;
  border-radius: 8px;
  overflow: hidden;
}

.video-iframe-container :deep(iframe) {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: none;
}

.video-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  background: #1a1a2e;
  border-radius: 8px;
  color: #888;
}

.video-placeholder i {
  font-size: 64px;
  margin-bottom: 15px;
  color: #e50914;
}

.video-placeholder.loading {
  color: #fff;
}

.video-placeholder.error {
  color: #e74c3c;
}

.video-placeholder.error i {
  color: #e74c3c;
}

.loading-spinner {
  width: 50px;
  height: 50px;
  border: 4px solid rgba(229, 9, 20, 0.2);
  border-top-color: #e50914;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 15px;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.retry-btn {
  margin-top: 15px;
  padding: 10px 20px;
  background: #e50914;
  border: none;
  border-radius: 5px;
  color: #fff;
  font-size: 14px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: background 0.2s;
}

.retry-btn:hover {
  background: #b20710;
}

@media (max-width: 768px) {
  .source-tabs {
    gap: 6px;
  }

  .source-tab {
    padding: 8px 12px;
    flex: 1;
    min-width: calc(50% - 6px);
    justify-content: center;
  }

  .source-type {
    font-size: 10px;
  }

  .source-name {
    font-size: 12px;
  }
}
</style>

<script setup lang="ts">
const robotOpen = ref(false)
const activeDropdown = ref<string | null>(null)

// Seçilen değerler
const selected = ref<Record<string, string>>({
  tarz: '',
  tur: '',
  yil: '',
  imdb: '',
  kalite: ''
})

const toggleRobotBar = () => {
  robotOpen.value = !robotOpen.value
  if (!robotOpen.value) {
    activeDropdown.value = null
  }
}

const toggleDropdown = (name: string, event: Event) => {
  event.stopPropagation()
  activeDropdown.value = activeDropdown.value === name ? null : name
}

const selectItem = (filterName: string, value: string, event: Event) => {
  event.preventDefault()
  event.stopPropagation()
  selected.value[filterName] = value
  activeDropdown.value = null
}

const getButtonText = (filterName: string, defaultText: string) => {
  return selected.value[filterName] || defaultText
}

const filters = {
  tarz: ['Aksiyon', 'Komedi', 'Dram', 'Korku', 'Bilim Kurgu', 'Romantik', 'Gerilim', 'Animasyon'],
  tur: ['Yerli', 'Yabancı', 'Anime', 'Belgesel'],
  yil: ['2025', '2024', '2023', '2022', '2021', '2020', '2019', '2018'],
  imdb: ['9+', '8+', '7+', '6+'],
  kalite: ['4K', '1080p', '720p', 'CAM']
}
</script>

<template>
  <div class="film-robot-bar" :class="{ active: robotOpen }">
    <div class="robot-bar-header" @click="toggleRobotBar">
      <div class="robot-bar-left">
        <i class="fas fa-robot"></i>
      </div>
      <div class="robot-bar-center">
        <span class="robot-bar-title">Zevkine göre film önerisi al</span>
        <span class="robot-bar-subtitle">Seçenekleri kullanarak aradığın filmi kolayca bul</span>
      </div>
      <div class="robot-bar-right">
        <i class="fas fa-robot"></i>
        <span>Film Robotu</span>
        <i class="fas fa-chevron-down arrow"></i>
      </div>
    </div>
    <div class="robot-filters" :class="{ active: robotOpen }">
      <div class="robot-dropdown" :class="{ active: activeDropdown === 'tarz' }">
        <button class="robot-dropdown-btn" @click="toggleDropdown('tarz', $event)">
          <span>{{ getButtonText('tarz', 'Film Tarzı') }}</span>
          <i class="fas fa-chevron-down arrow"></i>
        </button>
        <div class="robot-dropdown-menu">
          <a
            v-for="item in filters.tarz"
            :key="item"
            href="#"
            class="robot-dropdown-item"
            :class="{ active: selected.tarz === item }"
            @click="selectItem('tarz', item, $event)"
          >{{ item }}</a>
        </div>
      </div>
      <div class="robot-dropdown" :class="{ active: activeDropdown === 'tur' }">
        <button class="robot-dropdown-btn" @click="toggleDropdown('tur', $event)">
          <span>{{ getButtonText('tur', 'Film Türü') }}</span>
          <i class="fas fa-chevron-down arrow"></i>
        </button>
        <div class="robot-dropdown-menu">
          <a
            v-for="item in filters.tur"
            :key="item"
            href="#"
            class="robot-dropdown-item"
            :class="{ active: selected.tur === item }"
            @click="selectItem('tur', item, $event)"
          >{{ item }}</a>
        </div>
      </div>
      <div class="robot-dropdown" :class="{ active: activeDropdown === 'yil' }">
        <button class="robot-dropdown-btn" @click="toggleDropdown('yil', $event)">
          <span>{{ getButtonText('yil', 'Film Yılı') }}</span>
          <i class="fas fa-chevron-down arrow"></i>
        </button>
        <div class="robot-dropdown-menu">
          <a
            v-for="item in filters.yil"
            :key="item"
            href="#"
            class="robot-dropdown-item"
            :class="{ active: selected.yil === item }"
            @click="selectItem('yil', item, $event)"
          >{{ item }}</a>
        </div>
      </div>
      <div class="robot-dropdown" :class="{ active: activeDropdown === 'imdb' }">
        <button class="robot-dropdown-btn" @click="toggleDropdown('imdb', $event)">
          <span>{{ getButtonText('imdb', 'IMDB Puanı') }}</span>
          <i class="fas fa-chevron-down arrow"></i>
        </button>
        <div class="robot-dropdown-menu">
          <a
            v-for="item in filters.imdb"
            :key="item"
            href="#"
            class="robot-dropdown-item"
            :class="{ active: selected.imdb === item }"
            @click="selectItem('imdb', item, $event)"
          >{{ item }}</a>
        </div>
      </div>
      <div class="robot-dropdown" :class="{ active: activeDropdown === 'kalite' }">
        <button class="robot-dropdown-btn" @click="toggleDropdown('kalite', $event)">
          <span>{{ getButtonText('kalite', 'Kalite') }}</span>
          <i class="fas fa-chevron-down arrow"></i>
        </button>
        <div class="robot-dropdown-menu">
          <a
            v-for="item in filters.kalite"
            :key="item"
            href="#"
            class="robot-dropdown-item"
            :class="{ active: selected.kalite === item }"
            @click="selectItem('kalite', item, $event)"
          >{{ item }}</a>
        </div>
      </div>
      <button class="robot-search-btn" @click.stop>
        <i class="fas fa-search"></i>
        <span>Filmleri Getir</span>
      </button>
    </div>
  </div>
</template>

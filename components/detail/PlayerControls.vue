<script setup lang="ts">
const emit = defineEmits<{
  openErrorModal: []
}>()

const langDropdownOpen = ref(false)
const sourceDropdownOpen = ref(false)

const toggleLangDropdown = () => {
  langDropdownOpen.value = !langDropdownOpen.value
  sourceDropdownOpen.value = false
}

const toggleSourceDropdown = () => {
  sourceDropdownOpen.value = !sourceDropdownOpen.value
  langDropdownOpen.value = false
}
</script>

<template>
  <div class="player-controls">
    <div class="player-controls-left">
      <div class="player-toggle-group">
        <!-- Dil Dropdown -->
        <div class="player-lang-dropdown" :class="{ active: langDropdownOpen }">
          <button class="player-lang-btn" @click="toggleLangDropdown">
            <span class="lang-code">TR</span>
            <span>Türkçe Dublaj</span>
            <i class="fas fa-chevron-down"></i>
          </button>
          <div class="player-lang-menu">
            <a href="#" class="player-lang-item active">
              <span class="lang-code">TR</span> Türkçe Dublaj
            </a>
            <a href="#" class="player-lang-item">
              <span class="lang-code">TR</span> Türkçe Altyazı
            </a>
            <a href="#" class="player-lang-item">
              <span class="lang-code">EN</span> Orijinal
            </a>
          </div>
        </div>

        <!-- Desktop: Buttons -->
        <div class="player-source-buttons">
          <button class="player-toggle active">Kaynak 1</button>
          <button class="player-toggle">Kaynak 2</button>
          <button class="player-toggle">Kaynak 3</button>
        </div>

        <!-- Mobile: Dropdown -->
        <div class="player-source-dropdown" :class="{ active: sourceDropdownOpen }">
          <button class="player-source-btn" @click="toggleSourceDropdown">
            <i class="fas fa-server"></i>
            <span>Kaynak 1</span>
            <i class="fas fa-chevron-down"></i>
          </button>
          <div class="player-source-menu">
            <a href="#" class="player-source-item active">Kaynak 1</a>
            <a href="#" class="player-source-item">Kaynak 2</a>
            <a href="#" class="player-source-item">Kaynak 3</a>
          </div>
        </div>
      </div>
    </div>
    <div class="player-controls-right">
      <button class="btn-report" @click="emit('openErrorModal')">
        <i class="fas fa-bug"></i>
        Hata Bildir
      </button>
    </div>
  </div>
</template>

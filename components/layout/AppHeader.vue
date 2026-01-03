<script setup lang="ts">
import { useLayoutStore } from '~/stores/layout'

const layoutStore = useLayoutStore()

const mobileMenuOpen = ref(false)
const mobileSidebarOpen = ref(false)

// Store'dan menü verileri
const mainMenu = computed(() => layoutStore.mainMenu)
const subMenu = computed(() => layoutStore.subMenu)

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
  if (mobileMenuOpen.value) {
    mobileSidebarOpen.value = false
  }
}

const closeMobileMenu = () => {
  mobileMenuOpen.value = false
}

const toggleMobileSidebar = () => {
  mobileSidebarOpen.value = !mobileSidebarOpen.value
  if (mobileSidebarOpen.value) {
    mobileMenuOpen.value = false
  }
}

const closeMobileSidebar = () => {
  mobileSidebarOpen.value = false
}

// Dropdown kontrolü için
const hasChildren = (item: any) => item.children && item.children.length > 0
</script>

<template>
  <!-- Header -->
  <header class="header">
    <div class="header-top">
      <div class="header-container">
        <!-- Hamburger Menu Button (Mobile) -->
        <button class="mobile-menu-btn" id="mobileMenuBtn" @click="toggleMobileMenu">
          <span class="hamburger-line"></span>
          <span class="hamburger-line"></span>
          <span class="hamburger-line"></span>
        </button>

        <!-- Logo -->
        <NuxtLink to="/" class="logo">
          <div class="logo-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 612 612" fill="currentColor"><path d="M602.332 513.647c-46.115-28.305-93.803-34.281-134.848-31.037 41.53-47.079 66.74-108.895 66.74-176.609 0-147.526-119.598-267.112-267.117-267.112C119.598 38.887 0 158.475 0 305.999s119.598 267.112 267.107 267.112c38.167 0 74.455-8.022 107.297-22.444 1.089-.348 9.069-4.181 10.499-4.884 29.521-13.783 116.625-46.458 196.228 2.403 9.536 5.853 22.016 2.87 27.87-6.669 5.856-9.539 2.871-22.016-6.669-27.87zM382.328 204.694c30.304-9.847 62.848 6.732 72.684 37.029 9.843 30.298-6.74 62.837-37.034 72.684-30.291 9.842-62.832-6.74-72.681-37.036-9.839-30.293 6.74-62.838 37.031-72.677zm-115.221-99.491c31.86 0 57.69 25.826 57.69 57.683 0 31.854-25.83 57.68-57.69 57.68-31.852 0-57.674-25.826-57.674-57.68 0-31.856 25.824-57.683 57.674-57.683zm-187.89 136.52c9.839-30.294 42.377-46.877 72.681-37.031 30.294 9.839 46.87 42.385 37.025 72.677-9.843 30.299-42.383 46.88-72.674 37.034-30.305-9.843-46.888-42.382-37.032-72.68zm152.335 208.1c-31.857 0-57.683-25.826-57.683-57.68 0-31.857 25.826-57.683 57.683-57.683 31.854 0 57.68 25.826 57.68 57.683 0 31.854-25.826 57.68-57.68 57.68z"/></svg>
          </div>
          <span class="logo-text">FİLMİZLE<span class="logo-accent">JET</span></span>
        </NuxtLink>

        <!-- Ana Navigasyon (Desktop) -->
        <nav class="main-nav">
          <template v-for="item in mainMenu" :key="item.id">
            <!-- Dropdown menü -->
            <div v-if="hasChildren(item)" class="nav-dropdown">
              <a href="#" class="nav-link">
                {{ item.title }}
                <i v-if="item.icon" :class="`fas ${item.icon}`"></i>
              </a>
              <div class="dropdown-menu">
                <NuxtLink
                  v-for="child in item.children"
                  :key="child.id"
                  :to="child.url"
                  :target="child.open_new_tab ? '_blank' : undefined"
                >
                  {{ child.title }}
                </NuxtLink>
              </div>
            </div>
            <!-- Normal link -->
            <NuxtLink
              v-else
              :to="item.url"
              class="nav-link"
              :target="item.open_new_tab ? '_blank' : undefined"
            >
              {{ item.title }}
              <span
                v-if="item.badge_text"
                class="nav-badge"
                :style="item.badge_color ? { backgroundColor: item.badge_color } : {}"
              >
                {{ item.badge_text }}
              </span>
            </NuxtLink>
          </template>
        </nav>

        <!-- Mobile Sidebar Button -->
        <button class="mobile-sidebar-btn" id="mobileSidebarBtn" @click="toggleMobileSidebar">
          <i class="fas fa-grip-vertical"></i>
        </button>
      </div>
    </div>
    <div class="header-spacer"></div>

    <!-- Alt Bar -->
    <div class="header-sub">
      <div class="header-sub-container">
        <div class="sub-links">
          <NuxtLink
            v-for="item in subMenu"
            :key="item.id"
            :to="item.url"
            class="sub-link"
            :target="item.open_new_tab ? '_blank' : undefined"
          >
            {{ item.title }}
          </NuxtLink>
        </div>
        <div class="search-box">
          <i class="fas fa-search"></i>
          <input type="search" id="searchInput" name="film-search" placeholder="Film ara..." autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" data-form-type="other">
          <button class="search-clear" id="searchClear"><i class="fas fa-times"></i></button>
          <div class="search-results" id="searchResults"></div>
        </div>
      </div>
    </div>
  </header>

  <!-- Mobile Menu Overlay -->
  <div class="mobile-menu-overlay" :class="{ active: mobileMenuOpen }" @click="closeMobileMenu"></div>

  <!-- Mobile Menu (Soldan Açılan) -->
  <nav class="mobile-menu" :class="{ active: mobileMenuOpen }">
    <div class="mobile-menu-header">
      <NuxtLink to="/" class="mobile-menu-logo" @click="closeMobileMenu">
        <div class="logo-icon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 612 612" fill="currentColor"><path d="M602.332 513.647c-46.115-28.305-93.803-34.281-134.848-31.037 41.53-47.079 66.74-108.895 66.74-176.609 0-147.526-119.598-267.112-267.117-267.112C119.598 38.887 0 158.475 0 305.999s119.598 267.112 267.107 267.112c38.167 0 74.455-8.022 107.297-22.444 1.089-.348 9.069-4.181 10.499-4.884 29.521-13.783 116.625-46.458 196.228 2.403 9.536 5.853 22.016 2.87 27.87-6.669 5.856-9.539 2.871-22.016-6.669-27.87zM382.328 204.694c30.304-9.847 62.848 6.732 72.684 37.029 9.843 30.298-6.74 62.837-37.034 72.684-30.291 9.842-62.832-6.74-72.681-37.036-9.839-30.293 6.74-62.838 37.031-72.677zm-115.221-99.491c31.86 0 57.69 25.826 57.69 57.683 0 31.854-25.83 57.68-57.69 57.68-31.852 0-57.674-25.826-57.674-57.68 0-31.856 25.824-57.683 57.674-57.683zm-187.89 136.52c9.839-30.294 42.377-46.877 72.681-37.031 30.294 9.839 46.87 42.385 37.025 72.677-9.843 30.299-42.383 46.88-72.674 37.034-30.305-9.843-46.888-42.382-37.032-72.68zm152.335 208.1c-31.857 0-57.683-25.826-57.683-57.68 0-31.857 25.826-57.683 57.683-57.683 31.854 0 57.68 25.826 57.68 57.683 0 31.854-25.826 57.68-57.68 57.68z"/></svg>
        </div>
        <span class="logo-text">FİLMİZLE<span class="logo-accent">JET</span></span>
      </NuxtLink>
      <button class="mobile-menu-close" @click="closeMobileMenu">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
          <path d="M18 6L6 18M6 6l12 12"/>
        </svg>
      </button>
    </div>

    <div class="mobile-menu-content">
      <template v-for="(item, index) in mainMenu" :key="item.id">
        <!-- Alt menü öğeleri varsa onları da göster -->
        <template v-if="hasChildren(item)">
          <div class="mobile-menu-divider"></div>
          <NuxtLink
            v-for="child in item.children"
            :key="child.id"
            :to="child.url"
            class="mobile-nav-link"
            :target="child.open_new_tab ? '_blank' : undefined"
            @click="closeMobileMenu"
          >
            <i v-if="child.icon" :class="`fas ${child.icon}`"></i>
            {{ child.title }}
          </NuxtLink>
          <div class="mobile-menu-divider"></div>
        </template>
        <!-- Normal link -->
        <NuxtLink
          v-else
          :to="item.url"
          class="mobile-nav-link"
          :target="item.open_new_tab ? '_blank' : undefined"
          @click="closeMobileMenu"
        >
          <i v-if="item.icon" :class="`fas ${item.icon}`"></i>
          {{ item.title }}
          <span
            v-if="item.badge_text"
            class="mobile-nav-badge"
            :style="item.badge_color ? { backgroundColor: item.badge_color } : {}"
          >
            {{ item.badge_text }}
          </span>
        </NuxtLink>
      </template>
    </div>
  </nav>

  <!-- Mobile Sidebar Overlay -->
  <div class="mobile-sidebar-overlay" :class="{ active: mobileSidebarOpen }" @click="closeMobileSidebar"></div>

  <!-- Mobile Sidebar (Sağdan Açılan) -->
  <div class="mobile-sidebar" :class="{ active: mobileSidebarOpen }">
    <div class="mobile-sidebar-header">
      <span class="mobile-sidebar-title">
        <i class="fas fa-fire"></i>
        Keşfet
      </span>
      <button class="mobile-sidebar-close" @click="closeMobileSidebar">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
          <path d="M18 6L6 18M6 6l12 12"/>
        </svg>
      </button>
    </div>
    <div class="mobile-sidebar-content" id="mobileSidebarContent">
      <LayoutAppSidebar />
    </div>
  </div>
</template>

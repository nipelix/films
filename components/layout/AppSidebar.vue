<script setup lang="ts">
import { useLayoutStore } from '~/stores/layout'
import { useFilmUtils } from '~/composables/useFilmUtils'

const layoutStore = useLayoutStore()
const { getFilmPoster, formatRelativeDate, truncateText } = useFilmUtils()

// Store'dan veriler
const sections = computed(() => layoutStore.sidebarSections)
const genres = computed(() => layoutStore.genres)
const years = computed(() => layoutStore.years)
const trendingFilms = computed(() => layoutStore.trendingFilms)
const recentComments = computed(() => layoutStore.recentComments)
const languageTypes = computed(() => layoutStore.languageTypes)
const hasData = (type: string) => layoutStore.hasSidebarData(type)

// Kategori ikonları
const genreIcons: Record<string, string> = {
  'aile': 'fa-home',
  'aksiyon': 'fa-bolt',
  'animasyon': 'fa-play-circle',
  'belgesel': 'fa-file-video',
  'bilim-kurgu': 'fa-robot',
  'biyografi': 'fa-book',
  'dram': 'fa-heart',
  'fantastik': 'fa-star',
  'gerilim': 'fa-question-circle',
  'komedi': 'fa-laugh',
  'korku': 'fa-ghost',
  'macera': 'fa-compass',
  'muzikal': 'fa-music',
  'romantik': 'fa-heart',
  'savas': 'fa-fighter-jet',
  'spor': 'fa-futbol',
  'suc': 'fa-user-secret',
  'tarih': 'fa-landmark',
  'western': 'fa-hat-cowboy'
}

const getGenreIcon = (slug: string) => {
  return genreIcons[slug] || 'fa-film'
}
</script>

<template>
  <!-- Sidebar -->
  <!-- Sidebar Reklam -->
  <CommonBannerArea position="sidebar" single />

  <template v-for="(section, index) in sections" :key="section.id">
    <div v-if="hasData(section.type)" class="menu-divider"></div>

    <!-- Trend Filmler -->
    <div v-if="section.type === 'trending' && hasData('trending')" class="sidebar-box menu-section">
      <div class="sidebar-header">
        <i :class="`fas ${section.icon || 'fa-bolt'}`"></i>
        <h3 class="sidebar-title">{{ section.title }}</h3>
      </div>

      <div class="trend-list">
        <NuxtLink
          v-for="(film, filmIndex) in trendingFilms"
          :key="film.id || film.slug"
          :to="`/film/${film.slug}`"
          class="trend-item"
        >
          <div class="trend-poster">
            <img :src="getFilmPoster(film.poster)" :alt="film.title">
          </div>
          <div class="trend-info">
            <h4 class="trend-title">{{ film.title }}</h4>
            <div class="trend-meta">
              <span v-if="film.year" class="trend-tag">{{ film.year }}</span>
              <span v-if="film.imdb_rating" class="trend-tag sub">{{ film.imdb_rating }}</span>
            </div>
          </div>
          <div class="trend-rank"><span><span>{{ filmIndex + 1 }}</span></span></div>
        </NuxtLink>
      </div>

      <div v-if="section.footer_link && section.footer_text" class="sidebar-footer">
        <NuxtLink :to="section.footer_link">{{ section.footer_text }} <i class="fas fa-arrow-right"></i></NuxtLink>
      </div>
    </div>

    <!-- Film Türleri -->
    <div v-if="section.type === 'genres' && hasData('genres')" class="film-categories menu-section">
      <div class="sidebar-section-header">
        <i :class="`fas ${section.icon || 'fa-th-large'}`"></i>
        <h3 class="sidebar-section-title">{{ section.title }}</h3>
      </div>

      <div class="categories-grid">
        <NuxtLink
          v-for="genre in genres"
          :key="genre.id"
          :to="`/kategori/${genre.slug}`"
          class="category-item"
        >
          <i :class="`fas ${getGenreIcon(genre.slug)}`"></i> {{ genre.name }}
        </NuxtLink>
      </div>

      <div v-if="section.footer_link && section.footer_text" class="sidebar-footer">
        <NuxtLink :to="section.footer_link">{{ section.footer_text }} <i class="fas fa-arrow-right"></i></NuxtLink>
      </div>
    </div>

    <!-- Dil Seçenekleri -->
    <div v-if="section.type === 'languages' && hasData('languages')" class="language-section menu-section">
      <div class="sidebar-section-header">
        <i :class="`fas ${section.icon || 'fa-language'}`"></i>
        <h3 class="sidebar-section-title">{{ section.title }}</h3>
      </div>

      <div class="language-grid">
        <NuxtLink
          v-for="lang in languageTypes"
          :key="lang.id"
          :to="`/dil/${lang.slug}`"
          class="language-item"
          :style="{ borderColor: lang.color }"
        >
          <span class="language-badge" :style="{ backgroundColor: lang.color }">{{ lang.badge_text }}</span>
          <span class="language-name">{{ lang.name }}</span>
        </NuxtLink>
      </div>

      <div v-if="section.footer_link && section.footer_text" class="sidebar-footer">
        <NuxtLink :to="section.footer_link">{{ section.footer_text }} <i class="fas fa-arrow-right"></i></NuxtLink>
      </div>
    </div>

    <!-- Yıllar -->
    <div v-if="section.type === 'years' && hasData('years')" class="years-section menu-section">
      <div class="sidebar-section-header">
        <i :class="`fas ${section.icon || 'fa-calendar-alt'}`"></i>
        <h3 class="sidebar-section-title">{{ section.title }}</h3>
      </div>

      <div class="years-grid">
        <NuxtLink
          v-for="year in years"
          :key="year.year"
          :to="`/yil/${year.year}`"
          class="year-item"
        >
          {{ year.year }}
        </NuxtLink>
      </div>

      <div v-if="section.footer_link && section.footer_text" class="sidebar-footer">
        <NuxtLink :to="section.footer_link">{{ section.footer_text }} <i class="fas fa-arrow-right"></i></NuxtLink>
      </div>
    </div>

    <!-- Son Yorumlar -->
    <div v-if="section.type === 'comments' && hasData('comments')" class="comments-section menu-section">
      <div class="sidebar-section-header">
        <i :class="`fas ${section.icon || 'fa-comments'}`"></i>
        <h3 class="sidebar-section-title">{{ section.title }}</h3>
      </div>

      <div class="comments-list">
        <NuxtLink
          v-for="comment in recentComments"
          :key="comment.id"
          :to="`/film/${comment.film?.slug}`"
          class="comment-item"
        >
          <div class="comment-poster">
            <img :src="getFilmPoster(comment.film?.poster)" :alt="comment.film?.title">
          </div>
          <div class="comment-content">
            <div class="comment-header">
              <span class="comment-author">{{ comment.author_name }}</span>
              <span class="comment-time">{{ formatRelativeDate(comment.comment_date) }}</span>
            </div>
            <h4 class="comment-film">{{ comment.film?.title }}</h4>
            <p class="comment-text">{{ truncateText(comment.content) }}</p>
          </div>
        </NuxtLink>
      </div>

      <div v-if="section.footer_link && section.footer_text" class="sidebar-footer">
        <NuxtLink :to="section.footer_link">{{ section.footer_text }} <i class="fas fa-arrow-right"></i></NuxtLink>
      </div>
    </div>
  </template>
</template>

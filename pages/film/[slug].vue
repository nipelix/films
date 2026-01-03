<script setup lang="ts">
import type { Film } from '~/components/film/Card.vue'
import type { FilmInfo } from '~/components/detail/FilmInfoBar.vue'
import type { FilmDetailData } from '~/components/detail/FilmDetail.vue'
import type { Comment } from '~/components/comment/CommentItem.vue'
import { useFilmUtils } from '~/composables/useFilmUtils'

const { getFilmPoster, formatRelativeDate } = useFilmUtils()

const route = useRoute()
const slug = computed(() => route.params.slug as string)

// API'den film verilerini çek
const { data: film, pending, error } = await useAsyncData(
  `film-${slug.value}`,
  () => $fetch(`/api/films/${slug.value}`)
)

// Benzer filmleri çek
const { data: similarData } = await useAsyncData(
  `similar-${slug.value}`,
  () => $fetch(`/api/films/similar/${slug.value}?limit=6`),
  { lazy: true }
)

// Modal states
const spoilerModalOpen = ref(false)
const errorModalOpen = ref(false)
const trailerModalOpen = ref(false)

// Film Info
const filmInfo = computed<FilmInfo>(() => {
  if (!film.value) return { title: '', views: 0, imdb: 0, rating: '', breadcrumbs: [] }

  return {
    title: `${film.value.title}${film.value.original_title ? ' - ' + film.value.original_title : ''}`,
    views: film.value.rating_count || 0,
    imdb: parseFloat(film.value.imdb_rating) || 0,
    rating: `${film.value.imdb_rating || '-'}/10`,
    breadcrumbs: [
      { label: 'Film izle', link: '/' },
      ...(film.value.genres?.slice(0, 2).map((g: any) => ({
        label: g.name,
        link: `/kategori/${g.slug}`
      })) || []),
      ...(film.value.year ? [{ label: `${film.value.year} Filmleri`, link: `/filmler?year=${film.value.year}` }] : [])
    ]
  }
})

// Film Detail
const filmDetail = computed<FilmDetailData>(() => {
  if (!film.value) return { poster: '', quality: [], duration: '', description: '', meta: [] }

  return {
    poster: getFilmPoster(film.value.poster),
    quality: ['HD'],
    duration: film.value.runtime ? `${film.value.runtime} Dakika` : '',
    description: film.value.ozet || '',
    meta: [
      {
        label: 'Yönetmen',
        value: '',
        links: film.value.directors?.slice(0, 3).map((d: any) => ({
          text: d.name,
          link: `/yonetmen/${d.slug}`
        })) || []
      },
      {
        label: 'Oyuncular',
        value: '',
        links: film.value.actors?.slice(0, 5).map((a: any) => ({
          text: a.name,
          link: `/oyuncu/${a.slug}`
        })) || []
      },
      {
        label: 'Yapım',
        value: film.value.year ? `${film.value.year} Filmleri` : '',
        links: film.value.year ? [{ text: `${film.value.year} Filmleri`, link: `/filmler?year=${film.value.year}` }] : [],
        country: film.value.countries?.[0] ? { code: film.value.countries[0].code, name: film.value.countries[0].name } : undefined
      },
      {
        label: 'Tür',
        value: '',
        links: film.value.genres?.map((g: any) => ({
          text: g.name,
          link: `/kategori/${g.slug}`
        })) || []
      }
    ]
  }
})

// Similar Films
const similarFilms = computed<Film[]>(() => {
  if (!similarData.value?.data) return []
  return similarData.value.data.map((f: any) => ({
    slug: f.slug,
    title: f.title,
    subtitle: f.original_title,
    poster: getFilmPoster(f.poster),
    year: f.year,
    rating: f.imdb_rating
  }))
})

// Comments from API
const comments = computed<Comment[]>(() => {
  if (!film.value?.comments) return []
  return film.value.comments.slice(0, 10).map((c: any, index: number) => ({
    id: c.id,
    author: c.author_name,
    date: formatRelativeDate(c.comment_date),
    text: c.content,
    likes: 0,
    dislikes: 0,
    color: getRandomColor(index)
  }))
})

const totalComments = computed(() => film.value?.comments?.length || 0)

function getRandomColor(index: number): string {
  const colors = ['blue', 'green', 'pink', 'purple', 'orange']
  return colors[index % colors.length]
}

// SEO
useSeoMeta({
  title: () => film.value ? `${film.value.title} izle - FilmİzleJet` : 'Film izle - FilmİzleJet',
  description: () => film.value?.page_description || film.value?.ozet?.slice(0, 160) || ''
})

// Film izlenmesini kaydet (client-side)
onMounted(() => {
  if (slug.value && !error.value) {
    // İzlenmeyi arka planda kaydet
    $fetch(`/api/films/${slug.value}/view`, { method: 'POST' }).catch(() => {
      // Hata olursa sessizce geç
    })
  }
})

// 404 kontrolü
if (error.value) {
  throw createError({
    statusCode: 404,
    message: 'Film bulunamadı'
  })
}
</script>

<template>
  <main class="main-content content-detail">
    <!-- Loading State -->
    <div v-if="pending" class="loading-state">
      <p>Film yükleniyor...</p>
    </div>

    <template v-else-if="film">
      <!-- Film Bilgi Barı -->
      <DetailFilmInfoBar :info="filmInfo" @open-trailer="trailerModalOpen = true" />

      <!-- Film Detay Bölümü -->
      <DetailFilmDetail :detail="filmDetail" @open-trailer="trailerModalOpen = true" />

      <!-- Video Player Alanı -->
      <DetailVideoSection :sources="film.sources" @open-error-modal="errorModalOpen = true" />

      <!-- Benzer Filmler -->
      <DetailSimilarFilms v-if="similarFilms.length > 0" :films="similarFilms" />

      <!-- Yorum Bölümü -->
      <CommentCommentSection
        :comments="comments"
        :total-count="totalComments"
        @open-spoiler-modal="spoilerModalOpen = true"
      />
    </template>
  </main>

  <!-- Spoiler Modal -->
  <ModalSpoilerModal :open="spoilerModalOpen" @close="spoilerModalOpen = false" />

  <!-- Hata Bildir Modal -->
  <ModalErrorModal :open="errorModalOpen" @close="errorModalOpen = false" />
</template>

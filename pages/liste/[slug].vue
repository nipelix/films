<script setup lang="ts">
const route = useRoute()
const slug = route.params.slug

const trailerModalOpen = ref(false)
const trailerVideoId = ref('')
const trailerTitle = ref('')
const trailerThumb = ref('')
const trailerLink = ref('')

const openTrailerModal = (videoId: string, title: string, thumb: string, link: string) => {
  trailerVideoId.value = videoId
  trailerTitle.value = title
  trailerThumb.value = thumb
  trailerLink.value = link
  trailerModalOpen.value = true
}

const closeTrailerModal = () => {
  trailerModalOpen.value = false
  trailerVideoId.value = ''
}

useSeoMeta({
  title: 'Bilim ve Araştırmacıları Konu Alan Filmler - FilmizleJet',
  description: 'Bilim insanları ve araştırmacıların hikayelerini konu alan filmler'
})
</script>

<template>
  <main class="subpage-container">
    <!-- İki Sütunlu Alan -->
    <div class="content-wrapper">
      <!-- Sol Taraf -->
      <div class="content-left">
        <!-- Liste Başlık -->
        <div class="section-header-line">
          <h2 class="section-title">Bilim ve Araştırmacıları Konu Alan Filmler</h2>
          <span class="list-detail-date">2 Yıl Önce</span>
        </div>

        <!-- Liste Bilgi Kutusu -->
        <div class="list-detail-info">
          <div class="list-detail-poster">
            <img src="https://img.fullhdfilmizlesene.tv/poster/liste-lg/en-iyi-yaris-filmleri/cover.webp" alt="Bilim ve Araştırmacıları Konu Alan Filmler">
          </div>
          <div class="list-detail-desc">
            <p>Bilim insanları ve araştırmacıların hikayelerini konu alan filmler. Keşifler, buluşlar ve bilimsel tutkuları yansıtan yapımlar.</p>
          </div>
        </div>

        <!-- Film 1 -->
        <div class="list-film-item">
          <div class="list-film-header">
            <h2 class="list-film-title">Rye Lane</h2>
            <span class="list-film-subtitle">Rye Lane</span>
          </div>

          <div class="list-film-content">
            <NuxtLink to="/film/rye-lane" class="list-film-poster">
              <img src="https://img.fullhdfilmizlesene.tv/cover/liste/turkce-dublaj-performanslariyla-akillarda-kalan-2025-filmleri/tt9674022.jpg" alt="Rye Lane">
              <span class="film-badge-sub dublaj">Dublaj - Altyazı</span>
              <div class="film-quality-badges">
                <span class="quality-badge q4k">4K</span>
                <span class="quality-badge hd">2 Yıl</span>
              </div>
              <span class="list-film-year">2023</span>
              <span class="list-film-rating">7.2</span>
              <div class="film-play"><i class="fas fa-play"></i></div>
            </NuxtLink>

            <div class="list-film-desc">
              <p>"Rye Lane" filmi, genç yetişkinlerin ilişkileri ve modern şehir hayatının dinamikleri üzerine odaklanan bir romantik komedi filmidir.</p>
              <p>Film, Louis Pasteur'ün (Paul Muni) genç yaşlardan itibaren bilime olan ilgisini ve kimya alanındaki başarılarını anlatarak başlar. Pasteur, mikroorganizmaların hastalıklara neden olduğunu keşfeder ve pastörizasyon adı verilen sütün sterilizasyon yöntemini geliştirir.</p>
              <p>Ayrıca, Pasteur, kuduz aşısının geliştirilmesinde de önemli bir rol oynar ve kuduzun tedavisi konusundaki çalışmaları insan sağlığına büyük katkı sağlar.</p>
              <p>Film, Pasteur'ün bilimsel keşiflerinin yanı sıra kişisel yaşamına da odaklanır. Aynı zamanda Pasteur'ün çevresindeki insanlarla olan ilişkilerini ve bilimin toplum üzerindeki etkisini de ele alır.</p>
            </div>
          </div>
        </div>

        <!-- Film 2 -->
        <div class="list-film-item">
          <div class="list-film-header">
            <h2 class="list-film-title">Akıl Oyunları</h2>
            <span class="list-film-subtitle">A Beautiful Mind</span>
          </div>

          <div class="list-film-content">
            <NuxtLink to="/film/a-beautiful-mind" class="list-film-poster">
              <img src="https://img.fullhdfilmizlesene.tv/cover/liste/turkce-dublaj-performanslariyla-akillarda-kalan-2025-filmleri/tt9674022.jpg" alt="A Beautiful Mind">
              <span class="film-badge-sub altyazi">Türkçe Altyazı</span>
              <div class="film-quality-badges">
                <span class="quality-badge q1080p">1080p</span>
                <span class="quality-badge hd">24 Yıl</span>
              </div>
              <span class="list-film-year">2001</span>
              <span class="list-film-rating">8.2</span>
              <div class="film-play"><i class="fas fa-play"></i></div>
            </NuxtLink>

            <div class="list-film-desc">
              <p>"Akıl Oyunları" (A Beautiful Mind), 2001 yapımı biyografik drama filmidir. Film, Nobel Ödüllü matematikçi John Nash'in hayatını konu alır.</p>
              <p>John Nash, Princeton Üniversitesi'nde parlak bir matematikçi olarak kariyerine başlar ve oyun teorisi üzerine çığır açan çalışmalar yapar. Ancak şizofreni teşhisi konulmasıyla hayatı dramatik bir şekilde değişir.</p>
              <p>Film, Nash'in hastalığıyla mücadelesini, eşi Alicia'nın desteğini ve sonunda Nobel Ekonomi Ödülü'nü kazanmasını etkileyici bir şekilde anlatır.</p>
            </div>
          </div>
        </div>

      </div>

      <!-- Sağ Taraf - Sidebar -->
      <div class="content-right">
        <LayoutAppSidebar />
      </div>
    </div>
  </main>

  <!-- Fragman Modal -->
  <div class="trailer-modal" :class="{ active: trailerModalOpen }">
    <div class="trailer-modal-content">
      <div class="trailer-modal-header">
        <NuxtLink :to="trailerLink" class="trailer-badge">Bu Sezon Başladı: Şimdi İzle!</NuxtLink>
        <button class="trailer-close" @click="closeTrailerModal">
          <i class="fas fa-times"></i>
          Kapat
        </button>
      </div>
      <div class="trailer-video-container">
        <iframe v-if="trailerModalOpen" :src="`https://www.youtube.com/embed/${trailerVideoId}?autoplay=1`" width="100%" height="480" frameborder="0" title="fragman izle" allowfullscreen></iframe>
      </div>
      <div class="trailer-info">
        <div class="trailer-info-icon">
          <img :src="trailerThumb" alt="">
        </div>
        <span class="trailer-info-text">{{ trailerTitle }}</span>
      </div>
    </div>
  </div>
</template>

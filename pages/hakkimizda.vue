<script setup lang="ts">
useSeoMeta({
  title: 'Hakkımızda - FilmİzleJet',
  description: 'FilmİzleJet hakkında bilgi'
})
</script>

<template>
  <main class="subpage-container">
    <!-- İki Sütunlu Alan -->
    <div class="content-wrapper">
      <!-- Sol Taraf -->
      <div class="content-left">
        <!-- Başlık -->
        <div class="section-header-line">
          <h2 class="section-title">Hakkımızda</h2>
        </div>

        <!-- İçerik -->
        <div class="legal-content">
          <p><strong>FilmİzleJet</strong>, film severler için oluşturulmuş bir platformdur. Amacımız, kullanıcılarımıza en kaliteli görüntü ve ses deneyimini sunmaktır.</p>

          <h3 class="legal-subtitle">Misyonumuz</h3>
          <p>Film tutkunlarına en güncel içerikleri, en yüksek kalitede sunmak ve kesintisiz bir izleme deneyimi sağlamak.</p>

          <h3 class="legal-subtitle">Vizyonumuz</h3>
          <p>Türkiye'nin en sevilen ve en çok tercih edilen online film platformu olmak.</p>

          <h3 class="legal-subtitle">Değerlerimiz</h3>
          <ul>
            <li>Kullanıcı memnuniyeti her zaman önceliğimizdir</li>
            <li>Kaliteli içerik sunmak için sürekli çalışıyoruz</li>
            <li>Geri bildirimlerinizi dikkate alıyoruz</li>
            <li>Teknolojik gelişmeleri yakından takip ediyoruz</li>
          </ul>

          <div class="legal-divider"></div>

          <p>Sorularınız veya önerileriniz için <NuxtLink to="/iletisim">iletişim</NuxtLink> sayfamızdan bize ulaşabilirsiniz.</p>
        </div>
      </div>

      <!-- Sağ Taraf - Sidebar -->
      <div class="content-right">
        <LayoutAppSidebar />
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'Sıkça Sorulan Sorular - FilmİzleJet',
  description: 'FilmİzleJet hakkında sıkça sorulan sorular ve cevapları'
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
          <h2 class="section-title">Sıkça Sorulan Sorular</h2>
        </div>

        <!-- İçerik -->
        <div class="legal-content">
          <div class="faq-item">
            <h3 class="legal-subtitle">Site ücretsiz mi?</h3>
            <p>Evet, FilmİzleJet tamamen ücretsiz bir platformdur. Herhangi bir ücret ödemeden tüm içeriklere erişebilirsiniz.</p>
          </div>

          <div class="faq-item">
            <h3 class="legal-subtitle">Üyelik gerekli mi?</h3>
            <p>Hayır, üyelik zorunlu değildir. Ancak yorum yapmak ve favori listenizi oluşturmak için üyelik gerekebilir.</p>
          </div>

          <div class="faq-item">
            <h3 class="legal-subtitle">Video yüklenmiyor, ne yapmalıyım?</h3>
            <p>Öncelikle farklı bir kaynak deneyebilirsiniz. Sorun devam ederse tarayıcınızın önbelleğini temizleyin veya farklı bir tarayıcı kullanın. Hala sorun yaşıyorsanız "Hata Bildir" butonunu kullanarak bize iletebilirsiniz.</p>
          </div>

          <div class="faq-item">
            <h3 class="legal-subtitle">Türkçe dublaj nasıl açılır?</h3>
            <p>Video oynatıcının altındaki dil seçeneğinden "Türkçe Dublaj" seçeneğini seçebilirsiniz. Bazı içeriklerde dublaj seçeneği bulunmayabilir.</p>
          </div>

          <div class="faq-item">
            <h3 class="legal-subtitle">Film isteği nasıl yapılır?</h3>
            <p><NuxtLink to="/iletisim">İletişim</NuxtLink> sayfamızdan bize ulaşarak film talebinde bulunabilirsiniz.</p>
          </div>

          <div class="faq-item">
            <h3 class="legal-subtitle">Mobil cihazlarda izleyebilir miyim?</h3>
            <p>Evet, sitemiz mobil uyumludur. Tüm akıllı telefon ve tabletlerden sorunsuz izleme yapabilirsiniz.</p>
          </div>

          <div class="faq-item">
            <h3 class="legal-subtitle">Altyazı dili nasıl değiştirilir?</h3>
            <p>Video oynatıcının altındaki dil seçeneğinden "Türkçe Altyazı" veya "Orijinal" seçeneklerini seçebilirsiniz.</p>
          </div>

          <div class="legal-divider"></div>

          <p>Diğer sorularınız için <NuxtLink to="/iletisim">iletişim</NuxtLink> sayfamızdan bize ulaşabilirsiniz.</p>
        </div>
      </div>

      <!-- Sağ Taraf - Sidebar -->
      <div class="content-right">
        <LayoutAppSidebar />
      </div>
    </div>
  </main>
</template>

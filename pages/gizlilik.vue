<script setup lang="ts">
useSeoMeta({
  title: 'Gizlilik Politikası - FilmİzleJet',
  description: 'FilmİzleJet gizlilik politikası'
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
          <h2 class="section-title">Gizlilik Politikası</h2>
        </div>

        <!-- İçerik -->
        <div class="legal-content">
          <p><strong>FilmİzleJet</strong> olarak kullanıcılarımızın gizliliğine büyük önem veriyoruz. Bu gizlilik politikası, kişisel verilerinizin nasıl toplandığını, kullanıldığını ve korunduğunu açıklamaktadır.</p>

          <h3 class="legal-subtitle">Toplanan Bilgiler</h3>
          <p>Sitemizi ziyaret ettiğinizde aşağıdaki bilgiler toplanabilir:</p>
          <ul>
            <li>IP adresi</li>
            <li>Tarayıcı türü ve versiyonu</li>
            <li>Ziyaret edilen sayfalar</li>
            <li>Ziyaret tarihi ve saati</li>
          </ul>

          <h3 class="legal-subtitle">Çerezler (Cookies)</h3>
          <p>Sitemiz, kullanıcı deneyimini iyileştirmek amacıyla çerezler kullanmaktadır. Çerezler, tarayıcınız tarafından cihazınıza kaydedilen küçük metin dosyalarıdır.</p>

          <h3 class="legal-subtitle">Bilgilerin Kullanımı</h3>
          <p>Toplanan bilgiler şu amaçlarla kullanılabilir:</p>
          <ul>
            <li>Site performansını analiz etmek</li>
            <li>Kullanıcı deneyimini iyileştirmek</li>
            <li>Teknik sorunları tespit etmek</li>
          </ul>

          <h3 class="legal-subtitle">Bilgilerin Paylaşımı</h3>
          <p>Kişisel bilgileriniz, yasal zorunluluklar dışında üçüncü taraflarla paylaşılmaz.</p>

          <div class="legal-divider"></div>

          <p>Bu politika hakkında sorularınız için <NuxtLink to="/iletisim">iletişim</NuxtLink> sayfamızdan bize ulaşabilirsiniz.</p>
        </div>
      </div>

      <!-- Sağ Taraf - Sidebar -->
      <div class="content-right">
        <LayoutAppSidebar />
      </div>
    </div>
  </main>
</template>

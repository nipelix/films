<script setup lang="ts">
useSeoMeta({
  title: 'Kullanım Şartları - FilmİzleJet',
  description: 'FilmİzleJet kullanım şartları ve koşulları'
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
          <h2 class="section-title">Kullanım Şartları</h2>
        </div>

        <!-- İçerik -->
        <div class="legal-content">
          <p><strong>FilmİzleJet</strong>'i kullanarak aşağıdaki şartları kabul etmiş sayılırsınız.</p>

          <h3 class="legal-subtitle">Genel Koşullar</h3>
          <ul>
            <li>Site içeriği yalnızca kişisel kullanım içindir.</li>
            <li>İçeriklerin izinsiz kopyalanması, dağıtılması veya yeniden yayınlanması yasaktır.</li>
            <li>Site üzerinden yapılan tüm işlemler kayıt altına alınmaktadır.</li>
          </ul>

          <h3 class="legal-subtitle">Kullanıcı Sorumlulukları</h3>
          <ul>
            <li>Yorum yaparken hakaret içeren ifadeler kullanmamak</li>
            <li>Spoiler içeren yorumları spoiler etiketi içinde yazmak</li>
            <li>Diğer kullanıcılara saygılı davranmak</li>
            <li>Yasadışı içerik paylaşmamak</li>
          </ul>

          <h3 class="legal-subtitle">İçerik Politikası</h3>
          <p>Site üzerinde yayınlanan içerikler çeşitli kaynaklardan temin edilmektedir. İçerik sahipleri, telif hakkı ihlali durumunda <NuxtLink to="/iletisim">iletişim</NuxtLink> sayfası üzerinden bize başvurabilir.</p>

          <h3 class="legal-subtitle">Sorumluluk Reddi</h3>
          <p>FilmİzleJet, site içeriğinin doğruluğu, güncelliği veya eksiksizliği konusunda herhangi bir garanti vermez. Site kullanımından doğabilecek zararlardan sorumlu tutulamaz.</p>

          <div class="legal-divider"></div>

          <p>Bu şartlar önceden haber verilmeksizin değiştirilebilir. Güncel şartlar için bu sayfayı düzenli olarak kontrol etmenizi öneririz.</p>
        </div>
      </div>

      <!-- Sağ Taraf - Sidebar -->
      <div class="content-right">
        <LayoutAppSidebar />
      </div>
    </div>
  </main>
</template>

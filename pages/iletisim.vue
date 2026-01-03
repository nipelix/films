<script setup lang="ts">
useSeoMeta({
  title: 'İletişim - FilmİzleJet',
  description: 'FilmİzleJet iletişim sayfası'
})
</script>

<template>
  <main class="subpage-container">
    <!-- İki Sütunlu Alan -->
    <div class="content-wrapper">
      <!-- Sol Taraf -->
      <div class="content-left">
        <!-- Hukuksal Başlık -->
        <div class="section-header-line">
          <h2 class="section-title">HUKUKSAL / DMCA</h2>
        </div>

        <!-- Hukuksal İçerik -->
        <div class="legal-content">
          <p><strong>SineMerkez.Com</strong>, 5651 Sayılı Kanun'un 5. maddesi kapsamında <strong>"Yer Sağlayıcı"</strong> statüsünde hizmet vermektedir. İlgili mevzuat uyarınca, site yönetiminin kullanıcılar tarafından yüklenen içerikleri proaktif olarak denetleme veya hukuka aykırı faaliyetleri araştırma yükümlülüğü bulunmamaktadır.</p>

          <p>Bu nedenle platformumuz, uluslararası telif hakları standartlarına uygun olarak <strong>"Uyar ve Kaldır"</strong> (Notice and Takedown) prensibini benimsemiştir.</p>

          <div class="legal-alert">
            <i class="fas fa-exclamation-triangle"></i>
            <span>Telif hakkı ihlali bildirimleri için: <a href="mailto:720tube@gmail.com">720tube@gmail.com</a></span>
          </div>

          <p>Tarafımıza iletilen şikayet ve talepler Hukuk Birimimiz tarafından incelenecek, ihlal tespiti halinde ilgili içerik <strong>3 iş günü</strong> içerisinde sistemden kalıcı olarak silinecektir.</p>

          <div class="legal-box">
            <h4>İlgili Yasa (Madde 5):</h4>
            <p>(1) Yer sağlayıcı, yer sağladığı içeriği kontrol etmek veya hukuka aykırı bir faaliyetin söz konusu olup olmadığını araştırmakla yükümlü değildir.</p>
            <p>(2) Yer sağlayıcı, yer sağladığı hukuka aykırı içeriği, haberdar edilmesi halinde ve teknik olanaklar ölçüsünde yayından kaldırmakla yükümlüdür.</p>
          </div>

          <div class="legal-divider"></div>

          <h3 class="legal-subtitle">ENGLİSH TRANSLATİON / DMCA NOTİCE</h3>

          <p><strong>SineMerkez.Com</strong> operates as a <strong>"Hosting Provider"</strong> under Article 5 of Law No. 5651. Under this law, the administration is not obligated to monitor content proactively. Therefore, we adopt the <strong>"Notice and Take Down"</strong> policy.</p>

          <p>If you believe your copyrighted work has been infringed, please contact us via <a href="mailto:720tube@gmail.com">720tube@gmail.com</a>. Valid requests will result in the prompt removal of the content.</p>
        </div>

        <!-- İletişim Formu Başlık -->
        <div class="section-header-line">
          <h2 class="section-title">İletişim Formu</h2>
        </div>

        <!-- İletişim Formu -->
        <div class="comment-form-box">
          <div class="comment-form-header">
            <div class="comment-form-inputs">
              <div class="input-with-icon">
                <i class="fas fa-user"></i>
                <input type="text" class="form-input-inline" placeholder="Ad Soyad">
              </div>
              <div class="input-with-icon">
                <i class="fas fa-envelope"></i>
                <input type="email" class="form-input-inline" placeholder="E-Mail">
              </div>
            </div>
          </div>
          <div class="comment-form-body">
            <textarea class="form-textarea-premium" placeholder="Mesajınızı yazın..."></textarea>
          </div>
          <div class="comment-form-footer">
            <div class="form-tools"></div>
            <button type="submit" class="submit-btn-premium">
              <span>Mesaj Gönder</span>
              <i class="fas fa-paper-plane"></i>
            </button>
          </div>
        </div>
      </div>

      <!-- Sağ Taraf - Sidebar -->
      <div class="content-right">
        <LayoutAppSidebar />
      </div>
    </div>
  </main>
</template>

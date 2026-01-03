<script setup lang="ts">
defineProps<{
  open: boolean
}>()

const emit = defineEmits<{
  close: []
  submit: [data: { email: string; source: string; message: string }]
}>()

const formData = ref({
  email: '',
  source: '',
  message: ''
})

const handleSubmit = () => {
  emit('submit', { ...formData.value })
  formData.value = { email: '', source: '', message: '' }
}
</script>

<template>
  <div class="modal-overlay" :class="{ active: open }">
    <div class="modal-box">
      <div class="modal-header">
        <div class="modal-title">
          <i class="fas fa-bug"></i>
          <span>Hata Bildir</span>
        </div>
        <button class="modal-close" @click="emit('close')">
          <i class="fas fa-times"></i>
        </button>
      </div>
      <div class="modal-body">
        <div class="modal-row">
          <div class="modal-field">
            <label class="modal-label">E-Mail</label>
            <input v-model="formData.email" type="email" class="modal-input" placeholder="E-mail adresinizi girin">
          </div>
          <div class="modal-field">
            <label class="modal-label">Kaynak</label>
            <select v-model="formData.source" class="modal-select">
              <option value="">Seçiniz</option>
              <option value="kaynak1">Kaynak 1</option>
              <option value="kaynak2">Kaynak 2</option>
              <option value="kaynak3">Kaynak 3</option>
            </select>
          </div>
        </div>
        <div class="modal-field">
          <label class="modal-label">Mesajınız</label>
          <textarea v-model="formData.message" class="modal-textarea" placeholder="Hata ile ilgili detay yazın..."></textarea>
        </div>
      </div>
      <div class="modal-footer modal-footer-full">
        <button class="modal-btn-submit modal-btn-full" @click="handleSubmit">Gönder</button>
      </div>
      <div class="modal-info">
        <h4>Belirtilmesi Tavsiye Edilenler</h4>
        <p>Kullandığınız cihazın ne olduğu ve varsa playerdeki hata mesajı.</p>
      </div>
    </div>
  </div>
</template>

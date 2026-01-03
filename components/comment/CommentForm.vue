<script setup lang="ts">
const emit = defineEmits<{
  openSpoilerModal: []
  submit: [data: { nickname: string; email: string; text: string }]
}>()

const formData = ref({
  nickname: '',
  email: '',
  text: ''
})

const handleSubmit = () => {
  emit('submit', { ...formData.value })
  formData.value = { nickname: '', email: '', text: '' }
}
</script>

<template>
  <div class="comment-form-box">
    <div class="comment-form-main">
      <div class="comment-form-left">
        <div class="input-with-icon">
          <i class="fas fa-user"></i>
          <input v-model="formData.nickname" type="text" class="form-input-inline" placeholder="Rumuz">
        </div>
        <div class="input-with-icon">
          <i class="fas fa-envelope"></i>
          <input v-model="formData.email" type="email" class="form-input-inline" placeholder="E-Mail">
        </div>
      </div>
      <div class="comment-form-right">
        <textarea v-model="formData.text" class="form-textarea-premium" placeholder="Yorumunuzu yazın..."></textarea>
      </div>
    </div>
    <div class="comment-form-footer">
      <div class="form-tools">
        <button type="button" class="tool-btn" title="Spoiler Ekle" @click="emit('openSpoilerModal')">
          <i class="fas fa-eye-slash"></i>
          <span>Spoiler Ekle</span>
        </button>
        <div class="tool-hint">
          <span>Filmin içeriği ile ilgili detay vereceğiniz zaman spoiler içine alınız.</span>
          <span class="tool-hint-code">[spoiler]filmin sonunda başrol ölmüyor[/spoiler]</span>
        </div>
      </div>
      <button type="submit" class="submit-btn-premium" @click="handleSubmit">
        <span>Yorum Gönder</span>
        <i class="fas fa-paper-plane"></i>
      </button>
    </div>
  </div>
</template>

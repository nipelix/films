<script setup lang="ts">
defineProps<{
  open: boolean
}>()

const emit = defineEmits<{
  close: []
  submit: [content: string]
}>()

const spoilerContent = ref('')

const handleSubmit = () => {
  emit('submit', spoilerContent.value)
  spoilerContent.value = ''
}
</script>

<template>
  <div class="modal-overlay" :class="{ active: open }">
    <div class="modal-box">
      <div class="modal-header">
        <div class="modal-title">
          <i class="fas fa-eye-slash"></i>
          <span>Spoiler Ekle</span>
        </div>
        <button class="modal-close" @click="emit('close')">
          <i class="fas fa-times"></i>
        </button>
      </div>
      <div class="modal-body">
        <p class="modal-desc">Spoiler barındıran yorumunuzu aşağıdaki kutuya yazabilirsiniz. Bu metin gizli olarak gösterilecektir.</p>
        <textarea v-model="spoilerContent" class="modal-textarea" placeholder="Spoiler içeriğinizi buraya yazın..."></textarea>
      </div>
      <div class="modal-footer">
        <button class="modal-btn-cancel" @click="emit('close')">İptal</button>
        <button class="modal-btn-submit" @click="handleSubmit">Ekle</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Comment } from './CommentItem.vue'

defineProps<{
  title?: string
  comments: Comment[]
  totalCount?: number
}>()

const emit = defineEmits<{
  openSpoilerModal: []
  submitComment: [data: { nickname: string; email: string; text: string }]
  loadMore: []
}>()
</script>

<template>
  <div class="comment-section">
    <CommonSectionHeader :title="title || 'Filme Yorum Yaz'" show-line />

    <!-- Yorum Formu -->
    <CommentCommentForm
      @open-spoiler-modal="emit('openSpoilerModal')"
      @submit="emit('submitComment', $event)"
    />

    <!-- Yorumlar Listesi -->
    <CommonSectionHeader title="Yorumlar" :count="totalCount" show-line />

    <div class="comments-list">
      <CommentCommentItem
        v-for="comment in comments"
        :key="comment.id"
        :comment="comment"
      />
    </div>

    <!-- Daha Fazla Yükle -->
    <div class="comments-load-more">
      <a href="#" @click.prevent="emit('loadMore')">Daha fazla göster <i class="fas fa-arrow-down"></i></a>
    </div>
  </div>
</template>

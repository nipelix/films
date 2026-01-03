<script setup lang="ts">
export interface Comment {
  id: string | number
  author: string
  date: string
  text: string
  likes: number
  dislikes: number
  color: string
  isAdmin?: boolean
  isSpoiler?: boolean
  replies?: Comment[]
}

defineProps<{
  comment: Comment
}>()

const spoilerRevealed = ref(false)

const toggleSpoiler = () => {
  spoilerRevealed.value = !spoilerRevealed.value
}
</script>

<template>
  <div class="comment-item">
    <div :class="['comment-avatar', `color-${comment.color}`]">
      <template v-if="comment.isAdmin">
        <i class="fas fa-shield-alt"></i>
      </template>
      <template v-else>{{ comment.author.charAt(0).toUpperCase() }}</template>
    </div>
    <div class="comment-content">
      <div class="comment-header">
        <span class="comment-author">
          {{ comment.author }}
          <i v-if="comment.isAdmin" class="fas fa-check-circle verified"></i>
        </span>
        <span class="comment-date">{{ comment.date }}</span>
      </div>

      <!-- Spoiler Content -->
      <div v-if="comment.isSpoiler" class="comment-spoiler" :class="{ revealed: spoilerRevealed }" @click="toggleSpoiler">
        <div class="spoiler-overlay">
          <i class="fas fa-eye-slash"></i>
          <span>Spoiler İçerik - Görmek için tıklayın</span>
        </div>
        <div class="spoiler-content">
          <p class="comment-text">{{ comment.text }}</p>
          <div class="comment-actions">
            <button class="comment-action"><i class="fas fa-thumbs-up"></i> <span>{{ comment.likes }}</span></button>
            <button class="comment-action"><i class="fas fa-thumbs-down"></i> <span>{{ comment.dislikes }}</span></button>
            <button class="comment-action"><i class="fas fa-reply"></i> Yanıtla</button>
          </div>
        </div>
      </div>

      <!-- Normal Content -->
      <template v-else>
        <p class="comment-text">{{ comment.text }}</p>
        <div class="comment-actions">
          <button class="comment-action"><i class="fas fa-thumbs-up"></i> <span>{{ comment.likes }}</span></button>
          <button class="comment-action"><i class="fas fa-thumbs-down"></i> <span>{{ comment.dislikes }}</span></button>
          <button class="comment-action"><i class="fas fa-reply"></i> Yanıtla</button>
        </div>
      </template>

      <!-- Replies -->
      <template v-if="comment.replies?.length">
        <div v-for="reply in comment.replies" :key="reply.id" class="comment-reply">
          <div :class="['comment-avatar', `color-${reply.color}`]">
            <template v-if="reply.isAdmin">
              <i class="fas fa-shield-alt"></i>
            </template>
            <template v-else>{{ reply.author.charAt(0).toUpperCase() }}</template>
          </div>
          <div class="comment-content">
            <div class="comment-header">
              <span class="comment-author">
                {{ reply.author }}
                <i v-if="reply.isAdmin" class="fas fa-check-circle verified"></i>
              </span>
              <span class="comment-date">{{ reply.date }}</span>
            </div>
            <p class="comment-text">{{ reply.text }}</p>
            <div class="comment-actions">
              <button class="comment-action"><i class="fas fa-thumbs-up"></i> <span>{{ reply.likes }}</span></button>
              <button class="comment-action"><i class="fas fa-thumbs-down"></i> <span>{{ reply.dislikes }}</span></button>
              <button class="comment-action"><i class="fas fa-reply"></i> Yanıtla</button>
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

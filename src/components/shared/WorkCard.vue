<script setup>
// 作品卡 — MagicBento 动效将在步骤5挂载
import { ref } from 'vue'
import CardBase from './CardBase.vue'

defineProps({
  title: { type: String, required: true },
  author: { type: String, default: '' },
  image: { type: String, default: '' },
})

const cardRef = ref(null)
// useMagicBento(cardRef, { colorScheme: 'accent' }) — 步骤5中启用
</script>

<template>
  <CardBase ref="cardRef" :image-src="image" :image-alt="title">
    <h3 class="text-base font-medium text-ink truncate">{{ title }}</h3>
    <p v-if="author" class="text-xs text-muted mt-1">{{ author }}</p>
  </CardBase>
</template>

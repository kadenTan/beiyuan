<script setup>
import CardBase from './CardBase.vue'

defineProps({
  title: { type: String, required: true },
  category: { type: String, default: '' },
  date: { type: String, default: '' },
  image: { type: String, default: '' },
})
</script>

<template>
  <CardBase :image-src="image" :image-alt="title">
    <span v-if="category" class="text-xs text-accent font-medium">{{ category }}</span>
    <h3 class="text-base font-medium text-ink mt-1 line-clamp-2">{{ title }}</h3>
    <p v-if="date" class="text-xs text-muted mt-2">{{ date }}</p>
  </CardBase>
</template>

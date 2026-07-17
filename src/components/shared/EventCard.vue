<script setup>
import CardBase from './CardBase.vue'

defineProps({
  title: { type: String, required: true },
  status: { type: String, default: '报名中' },
  date: { type: String, default: '' },
  image: { type: String, default: '' },
})
</script>

<template>
  <CardBase :image-src="image" :image-alt="title">
    <span class="inline-block px-2 py-0.5 text-xs bg-navy text-white rounded-sm mb-2">{{ status }}</span>
    <h3 class="text-base font-medium text-ink truncate">{{ title }}</h3>
    <p v-if="date" class="text-xs text-muted mt-1">{{ date }}</p>
  </CardBase>
</template>

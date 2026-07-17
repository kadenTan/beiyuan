<script setup>
import CardBase from './CardBase.vue'

defineProps({
  title: { type: String, required: true },
  instructor: { type: String, default: '' },
  price: { type: String, default: '' },
  image: { type: String, default: '' },
})
</script>

<template>
  <CardBase :image-src="image" :image-alt="title">
    <h3 class="text-base font-medium text-ink truncate">{{ title }}</h3>
    <div class="flex items-center justify-between mt-2">
      <span v-if="instructor" class="text-xs text-muted">{{ instructor }}</span>
      <span v-if="price" class="text-sm text-accent font-medium">{{ price }}</span>
    </div>
  </CardBase>
</template>

<script setup>
// 通用卡片壳 — 圆角8px / paper底 / line描边 / hover上浮阴影
defineProps({
  imageSrc: { type: String, default: '' },
  imageAlt: { type: String, default: '' },
})
</script>

<template>
  <div class="bg-paper border border-line rounded-md overflow-hidden transition-all duration-[0.35s] ease-out hover:-translate-y-1 hover:shadow-lg group cursor-pointer">
    <div v-if="imageSrc" class="relative overflow-hidden aspect-[4/3]">
      <img :src="imageSrc" :alt="imageAlt" class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
    </div>
    <div class="p-4">
      <slot />
    </div>
  </div>
</template>

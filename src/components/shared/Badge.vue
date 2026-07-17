<script setup>
// 徽标 — 保留的纹样元素，用于卡片角标、区块标记等
defineProps({
  src: { type: String, default: '/assets/corner-badge.svg' },
  size: { type: String, default: 'md' }, // sm | md | lg
  alt: { type: String, default: '徽标' },
})

const sizes = { sm: 'w-6 h-6', md: 'w-10 h-10', lg: 'w-14 h-14' }
</script>

<template>
  <img :src="src" :alt="alt" :class="sizes[size]" class="object-contain" />
</template>

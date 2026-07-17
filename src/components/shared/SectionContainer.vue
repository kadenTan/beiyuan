<script setup>
defineProps({ bg: { type: String, default: 'bg-paper' } })
</script>

<template>
  <section class="figma-section" :class="bg">
    <slot />
  </section>
</template>

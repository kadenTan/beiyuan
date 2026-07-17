<script setup>
defineProps({
  to: { type: String, default: '' },
  size: { type: String, default: 'md' },
})
</script>

<template>
  <component
    :is="to ? 'router-link' : 'button'"
    :to="to || undefined"
    class="inline-flex items-center gap-2 rounded-[40px] border px-6 py-2.5 text-sm font-medium transition-all duration-200 bg-accent-dark border-accent text-line hover:bg-accent hover:text-white"
  >
    <slot />
  </component>
</template>

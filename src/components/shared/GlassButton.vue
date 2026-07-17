<script setup>
import { computed } from 'vue'

const props = defineProps({
  to: { type: String, default: '' },
  variant: { type: String, default: 'light' }, // light | dark
  size: { type: String, default: 'md' },       // sm | md | lg
})

const classes = computed(() => {
  const base = 'inline-flex items-center gap-2 rounded-full border backdrop-blur-[6px] transition-all duration-200 font-medium'

  const variants = {
    light: 'border-white text-white bg-white/10 hover:bg-white/20',
    dark: 'border-ink text-ink bg-ink/5 hover:bg-ink/10',
  }

  const sizes = {
    sm: 'px-4 py-1.5 text-xs',
    md: 'px-5 py-2 text-sm',
    lg: 'px-6 py-2.5 text-base',
  }

  return [base, variants[props.variant], sizes[props.size]]
})
</script>

<template>
  <component :is="to ? 'router-link' : 'button'" :to="to || undefined" :class="classes">
    <slot />
  </component>
</template>

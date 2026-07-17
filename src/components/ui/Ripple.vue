<script setup>
import RippleCircle from './RippleCircle.vue'

const props = defineProps({
  baseCircleSize: { type: Number, default: 210 },
  baseCircleOpacity: { type: Number, default: 0.24 },
  spaceBetweenCircle: { type: Number, default: 70 },
  circleOpacityDowngradeRatio: { type: Number, default: 0.03 },
  waveSpeed: { type: Number, default: 80 },
  numberOfCircles: { type: Number, default: 7 },
})
</script>

<template>
  <div class="absolute inset-0 pointer-events-none overflow-hidden">
    <RippleCircle
      v-for="index in props.numberOfCircles"
      :key="index"
      :opacity="props.baseCircleOpacity - (index - 1) * props.circleOpacityDowngradeRatio"
      :size="props.baseCircleSize + (index - 1) * props.spaceBetweenCircle"
      :animation-delay="(index - 1) * props.waveSpeed"
      :border-style="index === props.numberOfCircles ? 'dashed' : 'solid'"
    />
  </div>
</template>

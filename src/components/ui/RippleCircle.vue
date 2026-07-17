<script setup>
const props = defineProps({
  size: { type: Number, default: 210 },
  opacity: { type: Number, default: 0.3 },
  animationDelay: { type: Number, default: 0 },
  borderStyle: { type: String, default: 'solid' },
})
</script>

<template>
  <div
    class="ripple-circle absolute rounded-full"
    :style="{
      width: props.size + 'px',
      height: props.size + 'px',
      opacity: props.opacity,
      animationDelay: props.animationDelay + 'ms',
      borderStyle: props.borderStyle,
    }"
  />
</template>

<style scoped>
.ripple-circle {
  animation: ripple-pulse 2.5s ease-in-out infinite;
  border-width: 1px;
  border-color: rgba(181, 237, 255, 0.5);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(0.3);
  pointer-events: none;
}

@keyframes ripple-pulse {
  0% {
    transform: translate(-50%, -50%) scale(0.3);
    opacity: 0;
  }
  30% {
    opacity: 1;
  }
  100% {
    transform: translate(-50%, -50%) scale(1.6);
    opacity: 0;
  }
}
</style>

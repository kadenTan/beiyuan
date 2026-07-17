<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  modelValue: { type: Boolean, default: false },
  count: { type: Number, default: 0 },
})

const emit = defineEmits(['update:modelValue'])

const liked = computed({
  get: () => props.modelValue,
  set: (v) => emit('update:modelValue', v),
})

const displayCount = computed(() => liked.value ? props.count + 1 : props.count)

function toggle() {
  liked.value = !liked.value
}
</script>

<template>
  <button
    class="like-button"
    :class="{ liked }"
    @click.stop="toggle"
    type="button"
  >
    <span class="like-label">
      <svg class="like-icon" fill-rule="nonzero" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
      </svg>
      <span class="like-text">赞</span>
    </span>
    <span class="like-count">{{ displayCount }}</span>
  </button>
</template>

<style scoped>
.like-button {
  position: relative;
  cursor: pointer;
  display: flex;
  align-items: center;
  height: 28px;
  border-radius: 8px;
  border: none;
  background: rgba(255,255,255,0.12);
  overflow: hidden;
  backdrop-filter: blur(4px);
  transition: background 0.3s;
  padding: 0;
}

.like-button:hover {
  background: rgba(255,255,255,0.2);
}

.like-label {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 0 8px;
}

.like-icon {
  fill: rgba(255,255,255,0.6);
  height: 14px;
  width: 14px;
  transition: all 0.3s ease;
}

.like-text {
  color: rgba(255,255,255,0.8);
  font-size: 11px;
  font-weight: 500;
}

.like-count {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 8px;
  min-width: 28px;
  height: 100%;
  color: rgba(255,255,255,0.5);
  font-size: 11px;
  border-left: 1px solid rgba(255,255,255,0.15);
  transition: color 0.3s;
}

.like-button.liked .like-icon {
  fill: #fc4e4e;
  animation: heart-pop 0.3s ease-out;
}

.like-button.liked .like-count {
  color: rgba(255,255,255,0.9);
}

@keyframes heart-pop {
  0% { transform: scale(1); }
  50% { transform: scale(1.3); }
  100% { transform: scale(1); }
}
</style>

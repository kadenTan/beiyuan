<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import LikeButton from '@/components/shared/LikeButton.vue'

const props = defineProps({
  work: { type: Array, required: true },
})
const emit = defineEmits(['close'])

const liked = ref(false)

function onKeydown(e) {
  if (e.key === 'Escape') emit('close')
}

onMounted(() => document.addEventListener('keydown', onKeydown))
onUnmounted(() => document.removeEventListener('keydown', onKeydown))
</script>

<template>
  <Transition name="modal">
    <div class="fixed inset-0 z-[100] flex items-center justify-center" @click.self="emit('close')">
      <!-- 暗色遮罩 -->
      <div class="absolute inset-0 bg-black/90 backdrop-blur-md" />

      <!-- 关闭按钮 -->
      <button
        class="absolute top-6 right-6 z-20 p-2 text-white/60 hover:text-white transition-colors"
        @click="emit('close')"
        aria-label="关闭"
      >
        <svg class="size-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6 6l12 12M18 6L6 18" />
        </svg>
      </button>

      <!-- 内容区 -->
      <div class="relative z-10 flex flex-col md:flex-row gap-8 max-w-[1200px] w-full max-h-[90vh] px-8 max-sm:px-4">
        <!-- 左侧：大图 -->
        <div class="flex-1 flex items-center justify-center min-w-0">
          <img
            :src="work[3]"
            :alt="work[0]"
            class="max-w-full max-h-[75vh] object-contain rounded-[8px] shadow-2xl"
          />
        </div>

        <!-- 右侧：信息面板 -->
        <div class="w-[300px] max-sm:w-full shrink-0 flex flex-col gap-6 max-sm:pb-8">
          <div>
            <h2 class="font-semibold text-[24px] text-white leading-[1.3]">{{ work[0] }}</h2>
            <p class="text-[14px] text-white/50 mt-2">AI 生成 · 贝元创作者</p>
          </div>

          <!-- 元信息 -->
          <div class="flex flex-col gap-4">
            <div class="flex items-center gap-3">
              <span class="text-[13px] text-white/40 w-16 shrink-0">分类</span>
              <span class="inline-flex items-center px-[10px] py-[4px] rounded-[4px] bg-white/10 text-[13px] text-white/80">{{ work[1] }}</span>
            </div>
            <div class="flex items-center gap-3">
              <span class="text-[13px] text-white/40 w-16 shrink-0">标签</span>
              <span class="inline-flex items-center px-[10px] py-[4px] rounded-[4px] bg-white/10 text-[13px] text-white/80">{{ work[2] || '民族影像' }}</span>
            </div>
            <div class="flex items-center gap-3">
              <span class="text-[13px] text-white/40 w-16 shrink-0">点赞</span>
              <LikeButton v-model="liked" :count="work[6] || 0" />
            </div>
          </div>

          <!-- 分隔线 -->
          <div class="h-px bg-white/10" />

          <!-- 描述 -->
          <p class="text-[14px] text-white/60 leading-[1.7]">
            由 AI 生成工具创作，融合{{ work[2] || '民族元素' }}风格影像。通过平台存证后可下载高清版本及链上证书。
          </p>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}
.modal-enter-active > div:last-child,
.modal-leave-active > div:last-child {
  transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.35s ease;
}
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
.modal-enter-from > div:last-child {
  transform: scale(0.92);
  opacity: 0;
}
.modal-leave-to > div:last-child {
  transform: scale(0.95);
  opacity: 0;
}
</style>

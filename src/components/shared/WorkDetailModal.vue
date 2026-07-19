<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import LikeButton from '@/components/shared/LikeButton.vue'

const router = useRouter()
const props = defineProps({
  work: { type: Array, required: true },
})
const emit = defineEmits(['close'])

const liked = ref(false)
const isCertified = props.work[7] && typeof props.work[7] === 'object'
const cert = isCertified ? props.work[7] : null

function goCertify() {
  emit('close')
  router.push('/evidence')
}

function onKeydown(e) {
  if (e.key === 'Escape') emit('close')
}

onMounted(() => document.addEventListener('keydown', onKeydown))
onUnmounted(() => document.removeEventListener('keydown', onKeydown))
</script>

<template>
  <Transition name="modal">
    <div class="fixed inset-0 z-[100] flex items-center justify-center" @click.self="emit('close')">
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
        <div class="w-[320px] max-sm:w-full shrink-0 flex flex-col gap-6 max-sm:pb-8 overflow-y-auto">
          <!-- 标题 + 存证标签 -->
          <div>
            <div class="flex items-center gap-3 mb-2">
              <h2 class="font-semibold text-[24px] text-white leading-[1.3]">{{ work[0] }}</h2>
              <span v-if="isCertified"
                class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-gold/20 border border-gold/30 text-[11px] text-gold whitespace-nowrap">
                <svg class="size-3" fill="currentColor" viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
                已存证
              </span>
              <span v-else
                class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/10 border border-white/20 text-[11px] text-white/60 whitespace-nowrap">
                未存证
              </span>
            </div>
            <p class="text-[14px] text-white/50">AI 生成 · 贝元创作者</p>
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
            <div class="flex items-center gap-3">
              <span class="text-[13px] text-white/40 w-16 shrink-0">分辨率</span>
              <span class="text-[13px] text-white/70">{{ work[4] }} × {{ work[5] }}</span>
            </div>
          </div>

          <div class="h-px bg-white/10" />

          <!-- 存证信息 / 引导存证 -->
          <template v-if="isCertified">
            <div class="flex flex-col gap-3">
              <div class="flex items-center gap-2">
                <svg class="size-5 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
                <span class="font-semibold text-[15px] text-white">版权存证证书</span>
              </div>
              <!-- 证书卡片 -->
              <div class="bg-white/5 border border-white/10 rounded-lg p-4 flex flex-col gap-3">
                <div class="flex items-center justify-between">
                  <span class="text-[12px] text-white/40">证书编号</span>
                  <span class="text-[13px] text-white/80 font-mono">{{ cert.certId }}</span>
                </div>
                <div class="flex items-center justify-between">
                  <span class="text-[12px] text-white/40">存证时间</span>
                  <span class="text-[13px] text-white/80">{{ cert.certTime }}</span>
                </div>
                <div class="flex items-center justify-between">
                  <span class="text-[12px] text-white/40">区块链</span>
                  <span class="text-[13px] text-white/80">{{ cert.chainName }}</span>
                </div>
                <div class="flex items-center justify-between">
                  <span class="text-[12px] text-white/40">签发机构</span>
                  <span class="text-[13px] text-white/80">{{ cert.issuer }}</span>
                </div>
                <button class="w-full h-10 rounded-lg bg-white/10 border border-white/15 text-[13px] text-white/80 hover:bg-white/15 transition-colors">
                  下载存证证书
                </button>
              </div>
              <p class="text-[12px] text-white/30 text-center">该作品已完成区块链存证，版权归属可查询可核验。</p>
            </div>
          </template>
          <template v-else>
            <div class="flex flex-col gap-4">
              <div class="flex flex-col gap-2">
                <div class="flex items-center gap-2">
                  <svg class="size-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
                  <span class="font-semibold text-[15px] text-white">保护你的创作权益</span>
                </div>
                <p class="text-[13px] text-white/50 leading-[1.7]">为你的AIGC作品建立可查询、可核验、可追溯的链上存证记录。存证后即可获得数字版权证书。</p>
              </div>
              <button @click="goCertify"
                class="w-full h-12 rounded-xl text-[15px] font-semibold text-white hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                style="background: linear-gradient(153.4deg, #214fd6 0%, #5383eb 100%)">
                <svg class="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
                立即为作品存证
              </button>
            </div>
          </template>

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

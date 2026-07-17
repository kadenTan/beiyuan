<script setup>
import FigmaHeading from '@/components/shared/FigmaHeading.vue'
import siteContent from '@/data/site-content.js'
import { computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const schools = siteContent.schools || []

// 根据配置数量计算需要复制的次数，保证轨道至少 16 个 logo 撑满视口
const repeatCount = computed(() => schools.length > 0
  ? Math.max(2, Math.ceil(16 / schools.length))
  : 2
)
const scrollList = computed(() => {
  const list = []
  for (let r = 0; r < repeatCount.value; r++) {
    list.push(...schools)
  }
  return list
})

// 动画时长：每个原始 logo 约 6 秒，12 个约 72 秒一圈
const durationSec = computed(() => schools.length * 6)

function goToAlliance() {
  router.push({ name: 'alliance' })
}
</script>

<template>
  <section class="flex flex-col items-center py-[100px] bg-white">
    <div class="flex flex-col gap-[64px] items-center max-w-full w-full">
      <FigmaHeading title="商务合作" subtitle="PARTNERS" tone="blue" />

      <!-- 无限滚动 logo 横幅 -->
      <div class="relative w-full overflow-hidden group partner-scroll">
        <!-- 左侧渐变遮罩 -->
        <div class="absolute left-0 top-0 bottom-0 w-[120px] z-10 pointer-events-none"
          style="background: linear-gradient(to right, white, transparent)" />
        <!-- 右侧渐变遮罩 -->
        <div class="absolute right-0 top-0 bottom-0 w-[120px] z-10 pointer-events-none"
          style="background: linear-gradient(to left, white, transparent)" />

        <!-- 滚动轨道 -->
        <div
          class="flex items-center gap-x-[48px] animate-scroll-partners"
          :style="{
            width: 'max-content',
            '--scroll-duration': durationSec + 's',
            '--scroll-distance': '-' + (100 / repeatCount) + '%',
          }"
        >
          <a
            v-for="(s, i) in scrollList"
            :key="i"
            :title="s[2]"
            class="flex shrink-0 items-center opacity-50 hover:opacity-100 transition-opacity cursor-pointer"
            @click.prevent="goToAlliance"
          >
            <img
              :src="s[4] || '/assets/figma/imgLogo1.png'"
              :alt="s[2]"
              class="h-[48px] w-auto object-contain"
            />
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
@keyframes scroll-partners {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(var(--scroll-distance, -50%));
  }
}

.animate-scroll-partners {
  animation: scroll-partners var(--scroll-duration, 72s) linear infinite;
}

.partner-scroll:hover .animate-scroll-partners {
  animation-play-state: paused;
}

@media (prefers-reduced-motion: reduce) {
  .animate-scroll-partners {
    animation: none;
  }
}
</style>

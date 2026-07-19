<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import FilterTabs from '@/components/shared/FilterTabs.vue'
import EventSignupModal from '@/components/shared/EventSignupModal.vue'
import siteContent from '@/data/site-content.js'

const showSignup = ref(false)
const signupEvent = ref('')
import { GRADIENT_03, GRADIENT_GOLD } from '@/config/gradients.js'

const router = useRouter()

const events = siteContent.events || []
const filters = siteContent.eventFilters || { status: [], format: [] }
const activeStatus = ref('全部')
const activeFormat = ref('全部')

const filtered = computed(() => events.filter(e => {
  if (activeStatus.value !== '全部' && e[0] !== activeStatus.value) return false
  if (activeFormat.value !== '全部' && e[1] !== activeFormat.value) return false
  return true
}))

// 每个赛事卡片的渐变蒙版 — 严格对齐 Figma 201:7506 4 个卡片
const maskGradients = {
  '报名中': 'linear-gradient(-88.99deg, rgba(98,141,173,0) 1.53%, rgba(98,141,173,0.84) 97.82%)',
  '进行中': 'linear-gradient(-88.99deg, rgba(234,198,115,0) 1.53%, rgba(234,198,115,0.85) 97.82%)',
  '进行汇总': 'linear-gradient(-88.99deg, rgba(234,198,115,0) 1.53%, rgba(234,198,115,0.85) 97.82%)',
  '预告': 'linear-gradient(-88.99deg, rgba(111,18,1,0) 1.53%, rgb(111,18,1) 97.82%)',
  '已结束': 'linear-gradient(-88.88deg, rgba(48,148,200,0) 1.53%, rgb(48,148,200) 97.82%)',
}

// 卡片图片 — 按顺序对应 Figma 4 个 article
const cardImages = [
  '/assets/figma/imgArticle0.png',
  '/assets/figma/imgArticle1.png',
  '/assets/figma/imgArticle2.png',
  '/assets/figma/imgArticle3.png',
]

// 获取状态对应的渐变
function getMask(status) {
  return maskGradients[status] || maskGradients['报名中']
}

// 判断是否为已结束状态
function isEnded(status) {
  return status === '已结束'
}
</script>

<template>
  <div>
    <!-- ===== Page Hero ===== -->
    <section class="relative h-[480px] max-sm:h-[340px] w-full overflow-hidden bg-navy">
      <div class="absolute inset-0 blur-[2px]">
        <img src="/assets/figma/imgBanner.png" alt="" class="absolute inset-0 size-full object-cover" />
      </div>
      <div
        class="absolute inset-0"
        style="background: linear-gradient(180.36deg, rgba(24,42,165,0.12) 1.27%, rgba(28,73,202,0.28) 31.38%, rgba(18,42,126,0.518) 59.56%, rgb(9,16,63) 92.81%)"
      />
      <div class="absolute left-1/2 -translate-x-1/2 top-[182px] max-sm:top-[140px] flex flex-col gap-[16px] items-center px-6 w-full">
        <p
          class="font-semibold text-[56px] max-sm:text-[36px] leading-[53px] text-center whitespace-nowrap drop-shadow-[0_2px_12px_rgba(0,0,0,0.4)]"
          :style="{ background: GRADIENT_GOLD, '-webkit-background-clip': 'text', '-webkit-text-fill-color': 'transparent' }"
        >赛事中心</p>
        <p class="font-light text-[16px] max-sm:text-[14px] text-gold-light uppercase tracking-[2.88px]">Events</p>
        <p class="text-[16px] max-sm:text-[14px] leading-[27px] text-white/80 text-center max-w-[448px]">汇聚民族影像创作赛事、院校活动与产业命题。</p>
      </div>
    </section>

    <!-- ===== 内容区 ===== -->
    <section class="w-full pb-[80px] max-sm:pb-[60px]">
      <div class="flex flex-col gap-[28px]">
        <!-- 筛选标签 -->
        <div class="flex flex-col gap-[12px] px-[128px] max-lg:px-8 max-sm:px-4 pt-[80px] max-sm:pt-[60px]">
          <FilterTabs v-model="activeStatus" :items="filters.status" />
          <FilterTabs v-model="activeFormat" :items="filters.format" />
        </div>

        <!-- 赛事卡片列表：桌面2列 / 移动端1列 -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 px-[128px] max-lg:px-8 max-sm:px-4">
          <article
            v-for="(item, idx) in filtered"
            :key="idx"
            class="relative flex flex-col justify-end h-[420px] md:h-[460px] max-sm:h-[340px] w-full overflow-hidden rounded-[4px] cursor-pointer group transition-shadow duration-300 shadow-[0_0_20px_rgba(240,194,79,0.15)] hover:shadow-[0_0_40px_rgba(240,194,79,0.30)]"
            @click="router.push({ name: 'event-detail', params: { id: idx } })"
          >
            <!-- 背景图片 -->
            <div class="absolute inset-0 overflow-hidden pointer-events-none rounded-[4px]">
              <img
                :src="cardImages[idx % 4]"
                alt=""
                class="absolute inset-0 size-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>

            <!-- 渐变蒙版 -->
            <div
              class="absolute inset-0 backdrop-blur-[4.25px] rounded-[4px]"
              :style="{ backgroundImage: getMask(item[0]) }"
            />

            <!-- 内容区 -->
            <div class="relative z-10 flex flex-col gap-[10px] max-sm:gap-[8px] px-6 lg:px-8 py-8 lg:py-12 max-sm:py-10 w-full">
              <!-- 状态标签 -->
              <div class="bg-bg-card inline-flex items-start px-[12px] py-[4px] rounded-[4px] w-fit">
                <span
                  class="font-semibold text-[13px] leading-[20.8px] whitespace-nowrap"
                  :class="isEnded(item[0]) ? 'text-accent' : 'text-blue'"
                >{{ item[0] }}</span>
              </div>

              <!-- 标题 + 描述 -->
              <div class="flex flex-col gap-[8px]">
                <p
                  class="font-semibold text-[36px] md:text-[40px] lg:text-[48px] max-sm:text-[36px] leading-[1.1]"
                  :style="{ background: GRADIENT_GOLD, '-webkit-background-clip': 'text', '-webkit-text-fill-color': 'transparent' }"
                >{{ item[2] }}</p>
                <p class="text-[14px] md:text-[15px] leading-[22px] text-white line-clamp-2">{{ item[3] }}</p>
              </div>

              <!-- 举办形式 + 时间 -->
              <div class="flex gap-[16px] lg:gap-[24px] max-sm:gap-[12px]">
                <div class="flex flex-col">
                  <p class="text-[12px] lg:text-[13px] leading-[20.8px] text-white/80">举办形式</p>
                  <p class="font-semibold text-[14px] lg:text-[16px] leading-[25.6px] text-white whitespace-nowrap">{{ item[1] }}</p>
                </div>
                <div class="flex flex-col">
                  <p class="text-[12px] lg:text-[13px] leading-[20.8px] text-white/80">时间</p>
                  <p class="font-semibold text-[14px] lg:text-[16px] leading-[25.6px] text-white whitespace-nowrap">{{ item[4] }}</p>
                </div>
              </div>

              <!-- 操作按钮 -->
              <div class="flex gap-[12px] items-center max-sm:flex-col">
                <button
                  @click.stop="signupEvent = item[2]; showSignup = true"
                  class="inline-flex items-center justify-center px-[25px] py-[9px] rounded-[12px] border border-blue-pale text-[16px] font-semibold text-white text-center whitespace-nowrap hover:opacity-90 transition-opacity cursor-pointer"
                  :style="{ background: GRADIENT_03 }"
                >
                  立即报名
                </button>
                <button
                  class="inline-flex items-center justify-center px-[25px] py-[9px] rounded-[12px] border border-white text-[16px] font-medium text-white text-center whitespace-nowrap hover:bg-white/20 transition-colors"
                  style="background: rgba(255,255,255,0.1)"
                >
                  查看详情
                </button>
              </div>
            </div>
          </article>
        </div>

        <!-- 无结果 -->
        <p v-if="!filtered.length" class="text-muted py-12 text-center">暂无符合条件的赛事</p>
      </div>
    </section>

    <EventSignupModal v-if="showSignup" :event-name="signupEvent" @close="showSignup = false" />
  </div>
</template>

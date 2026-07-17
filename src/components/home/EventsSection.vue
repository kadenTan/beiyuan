<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import FigmaHeading from '@/components/shared/FigmaHeading.vue'
import EventSignupModal from '@/components/shared/EventSignupModal.vue'
import TextReveal from '@/components/ui/text-reveal/TextReveal.vue'
import siteContent from '@/data/site-content.js'

const showSignup = ref(false)
const signupEvent = ref('')
const events = (siteContent.events || []).slice(0, 3)
const imgs = siteContent.home?.eventImages || []

// sm 以下放弃 TextReveal，避免 SplitText 换行导致的消失问题
const isMobile = ref(false)
let mq

onMounted(() => {
  mq = window.matchMedia('(max-width: 639px)')
  isMobile.value = mq.matches
  mq.addEventListener('change', e => isMobile.value = e.matches)
})
onUnmounted(() => mq?.removeEventListener?.('change', () => {}))

// 渐变蒙版配色
const grads = [
  'linear-gradient(-88.991deg, rgba(98,141,173,0) 1.53%, rgba(98,141,173,0.84) 97.82%)',
  'linear-gradient(-88.99deg, rgba(234,198,115,0) 1.53%, rgba(234,198,115,0.85) 97.82%)',
  'linear-gradient(-88.99deg, rgba(111,18,1,0) 1.53%, rgb(111,18,1) 97.82%)',
]
</script>

<template>
  <section
    class="relative flex flex-col items-start py-[168px] max-sm:py-[80px] w-full"
    style="background: linear-gradient(to bottom, #182aa5, #09103f)"
  >
    <!-- 装饰徽标：跨 hero 和赛事交界，不占高度 -->
    <div class="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-none" aria-hidden="true">
      <img src="/assets/科技民族装饰.png" alt="" class="w-[138px] h-auto" style="filter: drop-shadow(0 6px 16px rgba(0,0,0,0.28))" />
    </div>

    <!-- 内容 -->
    <div class="flex flex-col gap-[64px] items-center w-full relative z-[1]">
      <FigmaHeading title="赛事活动" subtitle="Latest Events" tone="gold" />

      <!-- 赛事卡片：撑满宽度 -->
      <div class="flex flex-col items-center w-full max-md:px-6 max-sm:px-0">
        <article
          v-for="(item, idx) in events"
          :key="idx"
          class="relative flex flex-col justify-end w-full h-[512px] max-sm:h-[380px] overflow-hidden border-[0.711px] border-[#f0c24f] cursor-pointer group transition-shadow duration-300 hover:shadow-[0_0_40px_rgba(240,194,79,0.25)]"
          :class="idx === 0 ? 'rounded-t-[4px]' : idx === events.length - 1 ? 'rounded-b-[4px]' : ''"
          @click="router.push(`/events/${idx}`)"
        >
          <!-- 背景图 -->
          <div class="absolute inset-0 overflow-hidden pointer-events-none"
            :class="idx === 0 ? 'rounded-t-[4px]' : idx === events.length - 1 ? 'rounded-b-[4px]' : ''">
            <img :src="imgs[idx] || '/assets/figma/imgArticle0.png'" alt=""
              class="absolute inset-0 size-full object-cover transition-transform duration-500 group-hover:scale-105 max-sm:object-cover max-sm:size-full max-sm:top-0 max-sm:h-full" />
          </div>

          <!-- 渐变蒙版 -->
          <div class="absolute inset-0 backdrop-blur-[4.25px] pointer-events-none"
            :style="{ backgroundImage: grads[idx] }" />

          <!-- 内容 -->
          <div class="relative z-10 flex flex-col gap-[12px] max-sm:gap-[8px] px-[103px] max-lg:px-12 max-md:px-6 max-sm:px-5 py-[115px] max-sm:py-8 w-full">
            <!-- 状态标签 -->
            <div class="flex h-[29px] items-start px-[12px] py-[4px] rounded-[4px] bg-navy w-fit">
              <span class="font-semibold text-[13px] text-white whitespace-nowrap">{{ item[0] }}</span>
            </div>

            <!-- 标题 + 描述 -->
            <div class="flex flex-col gap-[12px]">
              <!-- sm+：文字揭示动效 -->
              <template v-if="!isMobile">
                <TextReveal :stagger="0.08" :duration="0.5" :scroll-trigger="true">
                  <p class="font-semibold text-[88px] max-lg:text-[56px] max-md:text-[40px] leading-[1.1]"
                    style="background: linear-gradient(to bottom, #faedc5, #dbbd78); -webkit-background-clip: text; -webkit-text-fill-color: transparent; filter: drop-shadow(0px 4px 4px rgba(0,0,0,0.25));">
                    {{ item[2] }}</p>
                </TextReveal>
                <TextReveal :stagger="0.05" :duration="0.4" :scroll-trigger="true">
                  <p class="text-[20px] max-sm:text-[14px] leading-[28px] text-white">{{ item[3] }}</p>
                </TextReveal>
              </template>
              <!-- sm：直接渲染，不做揭示动效 -->
              <template v-else>
                <p class="font-semibold text-[40px] leading-[1.15]"
                  style="background: linear-gradient(to bottom, #faedc5, #dbbd78); -webkit-background-clip: text; -webkit-text-fill-color: transparent; filter: drop-shadow(0px 4px 4px rgba(0,0,0,0.25));">
                  {{ item[2] }}</p>
                <p class="text-[14px] leading-[22px] text-white">{{ item[3] }}</p>
              </template>
            </div>

            <!-- 元信息 -->
            <div class="flex gap-[24px] max-sm:flex-col max-sm:gap-[8px]">
              <div>
                <p class="text-[13px] text-white">举办形式</p>
                <p class="font-semibold text-[16px] text-white whitespace-nowrap">{{ item[1] }}</p>
              </div>
              <div>
                <p class="text-[13px] text-white">时间</p>
                <p class="font-semibold text-[16px] text-white whitespace-nowrap">{{ item[4] }}</p>
              </div>
            </div>

            <!-- 报名按钮 -->
            <button @click.stop="signupEvent = item[2]; showSignup = true"
              class="inline-flex items-center gap-[4px] h-[32px] px-[12px] rounded-[4px] border border-white/40 text-[12px] text-white hover:bg-white/10 transition-colors w-fit cursor-pointer">
              立即报名
            </button>
          </div>
        </article>
      </div>

      <!-- 查看更多 -->
      <div class="pt-[24px]">
        <a href="/#/events"
          class="inline-flex items-center justify-center min-h-[40px] px-[16.6px] py-[0.6px] rounded-[31px] border-[0.6px] border-gold-light text-[16px] text-gold-light hover:bg-white/10 transition-colors">
          查看更多
        </a>
      </div>
    </div>

    <EventSignupModal v-if="showSignup" :event-name="signupEvent" @close="showSignup = false" />
  </section>
</template>

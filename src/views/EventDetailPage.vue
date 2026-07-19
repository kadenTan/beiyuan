<script setup>
import { ref } from 'vue'
import EventSignupModal from '@/components/shared/EventSignupModal.vue'
import siteContent from '@/data/site-content.js'

const d = siteContent.eventDetail || {}
const showSignup = ref(false)
const eventName = ref('千校民族影像作品季')
const eventCategories = ref(['赛项一', '赛项二', '赛项三'])
</script>

<template>
  <div>
    <!-- Hero — 100vh 满屏 Banner -->
    <section class="relative h-screen w-full overflow-hidden">
      <!-- 背景图 -->
      <div class="absolute inset-0">
        <img :src="d.heroImage || '/assets/figma/imgArticle1.png'" alt="" class="absolute inset-0 size-full object-cover" />
      </div>
      <!-- 渐变蒙版 -->
      <div class="absolute inset-0" style="background: linear-gradient(0deg, rgba(9,16,63,0.85) 0%, rgba(9,16,63,0.3) 40%, rgba(9,16,63,0.15) 100%)" />
      <!-- 内容 -->
      <div class="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
        <div class="flex flex-col gap-6 max-w-[900px]">
          <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 w-fit mx-auto">
            <span class="size-2 rounded-full bg-gold" />
            <span class="text-[13px] text-gold-light uppercase tracking-wider">Competition Detail</span>
          </div>
          <h1 class="font-bold text-[clamp(40px,6vw,80px)] leading-[1.1] text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.5)]">非遗影像青年创作营</h1>
          <p class="text-[18px] max-sm:text-[16px] leading-[1.8] text-white/80 max-w-[700px] mx-auto">围绕非遗技艺、民歌、服饰、节庆等主题完成短片创作与成果路演。</p>
          <div class="flex gap-4 justify-center flex-wrap">
            <button @click="showSignup = true" class="inline-flex items-center gap-2 h-14 px-8 rounded-xl text-[16px] font-semibold text-white hover:opacity-90 transition-opacity" style="background: linear-gradient(153.4deg, #214fd6 0%, #5383eb 100%); filter: drop-shadow(0 12px 24px rgba(33,79,214,0.4))">
              立即报名
              <img src="/assets/figma/imgArrowRightUpLong.svg" alt="" class="size-5" />
            </button>
            <button class="h-14 px-8 rounded-xl text-[16px] font-medium text-white border border-white/30 hover:bg-white/10 transition-colors">了解更多</button>
          </div>
        </div>
      </div>
      <!-- 底部滚动提示 -->
      <div class="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50 text-[12px]">
        <span>向下滚动</span>
        <svg class="size-4 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"/></svg>
      </div>
    </section>

    <!-- 内容区 — 白色底色，黑体粗标题 -->
    <section class="bg-white px-[128px] max-lg:px-8 max-sm:px-4 py-[100px] max-sm:py-[60px]">
      <div class="max-w-[860px] mx-auto flex flex-col gap-[80px] max-sm:gap-[60px]">

        <!-- ====== 赛事介绍 ====== -->
        <div>
          <h2 class="text-[32px] max-sm:text-[26px] font-bold text-ink mb-6">{{ d.sections?.intro?.title || '赛事介绍' }}</h2>
          <p class="text-[17px] leading-[1.8] text-ink/70 mb-6">{{ d.sections?.intro?.desc }}</p>
          <div class="flex items-center gap-3 text-[15px] text-ink/50">
            <span class="font-semibold text-ink/80">主办单位</span>
            <span class="w-px h-4 bg-border-light" />
            <span>{{ d.sections?.intro?.organizer }}</span>
          </div>
        </div>

        <!-- ====== 赛程安排 ====== -->
        <div>
          <h2 class="text-[32px] max-sm:text-[26px] font-bold text-ink mb-6">赛程安排</h2>
          <p class="text-[17px] leading-[1.8] text-ink/60 mb-10">{{ d.sections?.flow?.subtitle }}</p>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div v-for="s in d.sections?.flow?.steps" :key="s.num" class="relative bg-bg-card rounded-xl p-6 pt-10 text-center">
              <span class="absolute -top-4 left-1/2 -translate-x-1/2 inline-flex items-center justify-center w-8 h-8 rounded-full bg-white border-2 border-navy text-[14px] font-bold text-navy">{{ s.num }}</span>
              <h4 class="font-bold text-[18px] text-ink mt-4 mb-2">{{ s.title }}</h4>
              <p class="text-[14px] text-ink/50">{{ s.desc }}</p>
            </div>
          </div>
        </div>

        <!-- ====== 赛项介绍 ====== -->
        <div>
          <h2 class="text-[32px] max-sm:text-[26px] font-bold text-ink mb-6">{{ d.sections?.categories?.title || '赛项介绍' }}</h2>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div v-for="(c, i) in d.sections?.categories?.items" :key="i" class="bg-bg-card border border-border-light rounded-xl p-8 hover:shadow-md transition-shadow">
              <h4 class="font-bold text-[20px] text-ink mb-4">{{ c.name }}</h4>
              <p class="text-[15px] text-ink/55 leading-relaxed">{{ c.desc }}</p>
            </div>
          </div>
        </div>

      </div>
    </section>

    <!-- 赛事报名弹窗 -->
    <EventSignupModal v-if="showSignup" :event-name="eventName" :categories="eventCategories" @close="showSignup = false" />
  </div>
</template>

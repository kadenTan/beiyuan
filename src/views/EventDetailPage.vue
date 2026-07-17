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
    <!-- Hero -->
    <section class="relative h-[480px] max-sm:h-[340px] w-full overflow-hidden bg-navy">
      <div class="absolute inset-0 overflow-hidden">
        <img :src="d.heroImage || '/assets/figma/imgArticle1.png'" alt="" class="absolute left-0 w-full h-[500%] top-[-99%] object-cover" />
      </div>
      <div class="absolute inset-0 backdrop-blur-[4.25px]" style="background: linear-gradient(-88.99deg, rgba(24,136,255,0) 1.53%, rgb(24,136,255) 97.82%)" />
      <div class="absolute left-[255px] max-lg:left-8 max-sm:left-4 top-[86px] max-sm:top-[60px] flex flex-col gap-[20px] max-w-[754px] max-sm:max-w-full">
        <div class="flex flex-col gap-[8px]">
          <p class="font-semibold text-[64px] max-sm:text-[36px] text-white whitespace-nowrap">非遗影像青年创作营</p>
          <p class="text-[20px] max-sm:text-[16px] leading-[28px] text-white max-w-[754px]">围绕非遗技艺、民歌、服饰、节庆等主题完成短片创作与成果路演。</p>
        </div>
        <button @click="showSignup = true" class="flex items-center gap-[8px] h-[56px] px-[25px] rounded-[12px] border border-white text-[16px] font-semibold text-white bg-white/10 hover:bg-white/20 transition-colors w-fit cursor-pointer">
          立即报名
          <img src="/assets/figma/imgArrowRightUpLong.svg" alt="" class="size-[20px]" />
        </button>
      </div>
    </section>

    <!-- 内容区 -->
    <section class="bg-white px-[128px] max-lg:px-8 max-sm:px-4 py-[80px] max-sm:py-[60px]">
      <div class="max-w-[960px] mx-auto flex flex-col gap-[40px]">
        <!-- 赛事介绍 -->
        <div>
          <h2 class="text-[24px] font-semibold text-ink mb-[16px]">{{ d.sections?.intro?.title || '赛事介绍' }}</h2>
          <p class="text-muted leading-relaxed mb-[8px]">{{ d.sections?.intro?.desc }}</p>
          <p class="text-[14px] text-muted">主办单位：{{ d.sections?.intro?.organizer }}</p>
        </div>

        <!-- 最新动态 -->
        <div>
          <h3 class="text-[18px] font-medium text-ink mb-[16px]">最新动态</h3>
          <div class="space-y-2">
            <div v-for="(u, i) in d.sections?.intro?.updates" :key="i" class="flex gap-3 text-[14px] text-muted py-3 border-b border-[#ddd]">
              <span class="text-[13px] whitespace-nowrap shrink-0">{{ u.date }}</span><span>{{ u.text }}</span>
            </div>
          </div>
        </div>

        <!-- 赛项选择 -->
        <div>
          <h3 class="text-[18px] font-medium text-ink mb-[16px]">{{ d.sections?.categories?.title || '赛项选择' }}</h3>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-[16px]">
            <div v-for="(c, i) in d.sections?.categories?.items" :key="i" class="bg-paper border border-line rounded-[8px] p-[20px]">
              <h4 class="font-medium text-ink mb-[8px]">{{ c.name }}</h4><p class="text-[14px] text-muted">{{ c.desc }}</p>
            </div>
          </div>
        </div>

        <!-- 比赛流程 -->
        <div>
          <h3 class="text-[18px] font-medium text-ink mb-[8px]">{{ d.sections?.flow?.title || '比赛流程' }}</h3>
          <p class="text-[14px] text-muted mb-[24px]">{{ d.sections?.flow?.subtitle }}</p>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-[16px]">
            <div v-for="s in d.sections?.flow?.steps" :key="s.num" class="text-center p-[24px] bg-bg-card rounded-[8px]">
              <span class="text-[32px] text-accent font-bold">{{ s.num }}</span>
              <h4 class="font-medium text-ink mt-[8px]">{{ s.title }}</h4><p class="text-[13px] text-muted mt-[4px] max-sm:hidden">{{ s.desc }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 赛事报名弹窗 -->
    <EventSignupModal v-if="showSignup" :event-name="eventName" :categories="eventCategories" @close="showSignup = false" />
  </div>
</template>

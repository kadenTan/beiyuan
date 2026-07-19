<script setup>
import { ref, computed } from 'vue'
import PageHero from '@/components/shared/PageHero.vue'
import siteContent from '@/data/site-content.js'
import { GRADIENT_03 } from '@/config/gradients.js'

const experts = siteContent.experts || []
const activeTab = ref('experts')

// 赛事/奖项筛选
const eventTabs = ['全部', '民族影像 AIGC 创作大赛', '非遗影像青年创作营', 'AI 数字人讲述人大赛', '千校民族影像作品季', '数字文旅 IP 创新挑战']
const awardTabs = ['全部', '金奖', '银奖', '优秀创作奖', '最佳数字人', '创意奖', '入围奖', '优秀考生']
const activeEvent = ref('全部')
const activeAward = ref('全部')

const talents = computed(() => {
  const names = ['王兴宇', '白鹿', '和弘', '陈雨萱', '刘浩然', '马茗悦', '何其然', '王语嫣', '张佳怡']
  const awards = ['金奖', '银奖', '优秀创作奖', '最佳数字人', '创意奖', '入围奖', '优秀考生', '金奖', '银奖']
  return names.map((n, i) => ({
    name: n,
    event: eventTabs[1 + (i % 5)],
    award: awards[i],
    img: `assets/figma/imgWan${i % 2 === 0 ? '1' : '2'}.png`,
    certId: `BY-TALENT-2026-00${i + 1}`,
    year: '2026',
    hot: i < 3,
    desc: '将民族服饰、节庆场景与 AIGC 视觉叙事结合，作品入选平台虚拟展厅。',
  })).filter(t => {
    if (activeEvent.value !== '全部' && t.event !== activeEvent.value) return false
    if (activeAward.value !== '全部' && t.award !== activeAward.value) return false
    return true
  })
})
</script>

<template>
  <div>
    <PageHero title="人才中心" eng="Talent Hub" subtitle="汇聚民族影像创作人才与专业评审专家，搭建展示与交流的一体化平台。" />

    <!-- Tab 切换 -->
    <section class="flex justify-center pt-[100px] pb-[40px] max-sm:pt-[60px] max-sm:pb-[30px] bg-white">
      <div class="flex gap-[60px] max-sm:gap-[40px]">
        <button @click="activeTab = 'experts'"
          class="text-[40px] max-sm:text-[28px] font-bold leading-tight transition-colors px-2"
          :style="activeTab === 'experts' ? { background: GRADIENT_03, '-webkit-background-clip': 'text', '-webkit-text-fill-color': 'transparent' } : { color: 'rgba(26,20,16,0.15)' }">
          专家评委
        </button>
        <button @click="activeTab = 'talent'"
          class="text-[40px] max-sm:text-[28px] font-bold leading-tight transition-colors px-2"
          :style="activeTab === 'talent' ? { background: GRADIENT_03, '-webkit-background-clip': 'text', '-webkit-text-fill-color': 'transparent' } : { color: 'rgba(26,20,16,0.15)' }">
          人才中心
        </button>
      </div>
    </section>

    <!-- 专家评委 -->
    <section v-if="activeTab === 'experts'" class="bg-white px-[128px] max-lg:px-8 max-sm:px-4 pb-[100px] max-sm:pb-[60px]">
      <div class="max-w-[1336px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <article v-for="(expert, i) in experts" :key="i"
          class="group relative bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer">
          <!-- 头像 -->
          <div class="relative h-[300px] max-sm:h-[240px] flex items-center justify-center overflow-hidden"
            style="background: linear-gradient(135deg, #e8eaed 0%, #f5f5f7 30%, #e0e2e6 60%, #f0f1f3 100%)">
            <img :src="expert.avatar || '/assets/avater.png'" :alt="expert.name"
              class="max-w-[85%] max-h-[85%] object-contain grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105" />
          </div>
          <!-- 信息区 — 固定高度避免hover跳动 -->
          <div class="relative p-5 bg-white" style="min-height: 120px">
            <!-- 默认名字+title -->
            <div class="transition-opacity duration-300" :class="'group-hover:opacity-0'">
              <h3 class="font-bold text-[18px] text-ink">{{ expert.name }}</h3>
              <p class="text-[13px] text-blue mt-0.5">{{ expert.title }}</p>
            </div>
            <!-- hover简介 — 绝对定位叠加 -->
            <div class="absolute inset-0 p-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-start">
              <p class="text-[14px] text-ink/60 leading-[1.7] line-clamp-4">{{ expert.bio }}</p>
            </div>
          </div>
        </article>
      </div>
    </section>

    <!-- 人才中心 -->
    <section v-if="activeTab === 'talent'" class="bg-white px-[128px] max-lg:px-8 max-sm:px-4 pb-[100px] max-sm:pb-[60px]">
      <div class="max-w-[1336px] mx-auto flex flex-col gap-[28px]">
        <!-- 筛选 -->
        <div class="flex flex-col gap-[12px]">
          <div class="flex gap-[16px] flex-wrap">
            <button v-for="t in eventTabs" :key="t" @click="activeEvent = t"
              class="h-[34px] px-[20px] py-[6px] rounded-full text-[12px] font-medium whitespace-nowrap transition-colors"
              :class="activeEvent === t ? 'text-white' : 'border border-border-light text-ink/65 hover:border-ink'"
              :style="activeEvent === t ? { background: GRADIENT_03 } : {}">{{ t }}</button>
          </div>
          <div class="flex gap-[16px] flex-wrap">
            <button v-for="t in awardTabs" :key="t" @click="activeAward = t"
              class="h-[34px] px-[20px] py-[6px] rounded-full text-[12px] font-medium whitespace-nowrap transition-colors"
              :class="activeAward === t ? 'text-white' : 'border border-border-light text-ink/65 hover:border-ink'"
              :style="activeAward === t ? { background: GRADIENT_03 } : {}">{{ t }}</button>
          </div>
          <!-- 热门置顶 -->
          <div class="flex gap-[12px] items-center flex-wrap">
            <span class="text-[16px]" style="color: rgba(26,20,16,0.35)">热门置顶</span>
            <span v-for="t in talents.filter(t => t.hot).slice(0, 3)" :key="t.name"
              class="bg-white border border-[#b3321f] rounded-[19px] px-[13px] py-[3px] text-[12px] font-semibold text-[#b3321f] whitespace-nowrap">{{ t.name }}</span>
          </div>
        </div>

        <!-- 卡片 3列 -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          <article v-for="(t, i) in talents" :key="i"
            class="relative border border-border-light rounded-[8px] overflow-hidden group cursor-pointer hover:shadow-lg transition-shadow bg-white">
            <!-- 照片 360px -->
            <div class="relative h-[360px] max-sm:h-[280px] overflow-hidden">
              <img :src="t.img" :alt="t.name" class="size-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <!-- 热门标签 -->
              <div v-if="t.hot" class="absolute top-[11px] left-[14px] z-10">
                <svg class="absolute inset-0 size-full" viewBox="0 0 56 30" fill="#b3321f"><path d="M0 0h56l-8 15 8 15H0V0z"/></svg>
                <span class="relative text-[14px] font-semibold text-white px-3 py-1">热门</span>
              </div>
            </div>
            <!-- 内容 -->
            <div class="p-4 flex flex-col gap-4" style="background: linear-gradient(-3deg, rgba(181,237,255,0) 46.7%, rgba(83,131,235,0.23) 87.97%)">
              <span class="inline-flex items-center px-[9px] py-[4px] rounded-full bg-bg-card text-[12px] text-blue w-fit">{{ t.event }}</span>
              <div class="flex flex-col gap-[4px]">
                <h3 class="font-semibold text-[20px] text-ink leading-[28px]">{{ t.name }}</h3>
                <p class="text-[14px] leading-[20px]" style="color: rgba(26,20,16,0.65)">{{ t.desc }}</p>
              </div>
              <div class="flex items-center justify-between pt-2">
                <span class="font-semibold text-[14px] text-navy">{{ t.award }}</span>
                <span class="text-[12px]" style="color: rgba(26,20,16,0.65)">{{ t.year }}</span>
              </div>
            </div>
            <!-- 奖项证书悬浮层 — 跨图片和内容交界 -->
            <div class="absolute right-0 top-[216px] w-[242px] max-sm:w-[180px] max-sm:top-[180px] z-10 pointer-events-none"
              style="background: rgba(255,255,255,0.48); backdrop-filter: blur(4px); border: 3px solid #faedc5; border-radius: 8px; box-shadow: 0 14px 36px rgba(58,35,28,0.08)">
              <div class="relative p-5 max-sm:p-3 flex flex-col gap-[10px]">
                <div class="absolute -left-[160px] -top-[70px] size-[365px] opacity-10 pointer-events-none">
                  <svg class="size-full" viewBox="0 0 365 365" fill="none"><circle cx="182.5" cy="182.5" r="182" fill="#faedc5" /></svg>
                </div>
                <p class="relative text-[12px] font-semibold text-navy uppercase">Certificate</p>
                <p class="relative text-[24px] max-sm:text-[18px] font-semibold text-ink leading-tight">{{ t.award }}</p>
                <p class="relative text-[14px] max-sm:text-[12px]" style="color: rgba(26,20,16,0.65)">{{ t.name }}</p>
                <p class="relative text-[14px] max-sm:text-[12px]" style="color: rgba(26,20,16,0.65)">{{ t.certId }}</p>
              </div>
            </div>
          </article>
        </div>
        <p v-if="!talents.length" class="text-muted py-12 text-center">暂无匹配的人才</p>
      </div>
    </section>
  </div>
</template>

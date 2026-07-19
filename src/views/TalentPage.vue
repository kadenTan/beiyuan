<script setup>
import { ref, computed } from 'vue'
import PageHero from '@/components/shared/PageHero.vue'
import siteContent from '@/data/site-content.js'

const experts = siteContent.experts || []
const activeTab = ref('experts') // 'experts' | 'talent'

// 赛事分类
const eventTabs = ref([
  '全部', '民族影像 AIGC 创作大赛', '非遗影像青年创作营',
  'AI 数字人讲述人大赛', '千校民族影像作品季', '数字文旅 IP 创新挑战'
])
const activeEvent = ref('全部')
const awardTabs = ref([
  '全部', '金奖', '银奖', '优秀创作奖', '最佳数字人', '创意奖', '入围奖', '优秀考生'
])
const activeAward = ref('全部')

// 人才数据
const talents = computed(() => {
  const names = ['周星辰', '林晓月', '赵天乐', '陈雨萱', '刘浩然', '马茗悦', '何其然', '王语嫣', '张佳怡']
  const awards = ['金奖', '银奖', '优秀创作奖', '最佳数字人', '创意奖', '入围奖', '优秀考生', '金奖', '银奖']
  return names.map((n, i) => ({
    name: n,
    event: eventTabs.value[1 + (i % 5)],
    award: awards[i],
    img: `assets/figma/imgWan${i % 2 === 0 ? '1' : '2'}.png`,
    certId: `BY-TALENT-2026-00${i + 1}`,
    year: '2026',
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

    <!-- ===== Tab 切换：专家评委 / 人才中心 ===== -->
    <section class="flex justify-center pt-[100px] pb-[40px] max-sm:pt-[60px] max-sm:pb-[30px] bg-white">
      <div class="flex gap-[60px] max-sm:gap-[40px]">
        <button @click="activeTab = 'experts'"
          class="text-[40px] max-sm:text-[28px] font-bold leading-tight transition-colors"
          :class="activeTab === 'experts' ? 'text-navy' : 'text-ink/15 hover:text-ink/30'">
          专家评委
        </button>
        <button @click="activeTab = 'talent'"
          class="text-[40px] max-sm:text-[28px] font-bold leading-tight transition-colors"
          :class="activeTab === 'talent' ? 'text-navy' : 'text-ink/15 hover:text-ink/30'">
          人才中心
        </button>
      </div>
    </section>

    <!-- ===== 专家评委 ===== -->
    <section v-if="activeTab === 'experts'" class="bg-white px-[128px] max-lg:px-8 max-sm:px-4 pb-[100px] max-sm:pb-[60px]">
      <div class="max-w-[1336px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <article v-for="(expert, i) in experts" :key="i"
          class="group relative bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer">
          <!-- 半身头像 -->
          <div class="relative h-[320px] max-sm:h-[260px] bg-gradient-to-b from-bg-card to-white flex items-end justify-center overflow-hidden">
            <img :src="expert.avatar" :alt="expert.name"
              class="w-[200px] max-sm:w-[160px] h-auto object-contain grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105" />
            <!-- 渐变底部 -->
            <div class="absolute inset-x-0 bottom-0 h-[60%] pointer-events-none"
              style="background: linear-gradient(to top, rgba(255,255,255,0.95), transparent)" />
          </div>

          <!-- 信息区 — hover后变为简介 -->
          <div class="relative p-5 pt-3 bg-white min-h-[120px]">
            <!-- 默认：名字 + title -->
            <div class="group-hover:opacity-0 group-hover:absolute transition-opacity duration-300">
              <h3 class="font-bold text-[18px] text-ink">{{ expert.name }}</h3>
              <p class="text-[13px] text-blue mt-0.5">{{ expert.title }}</p>
            </div>
            <!-- Hover：简介 -->
            <div class="absolute inset-0 p-5 pt-3 opacity-0 group-hover:opacity-100 group-hover:relative transition-opacity duration-300">
              <p class="text-[14px] text-ink/60 leading-[1.7] line-clamp-4">{{ expert.bio }}</p>
            </div>
          </div>
        </article>
      </div>
    </section>

    <!-- ===== 人才中心 ===== -->
    <section v-if="activeTab === 'talent'" class="bg-white px-[128px] max-lg:px-8 max-sm:px-4 pb-[100px] max-sm:pb-[60px]">
      <div class="max-w-[1336px] mx-auto flex flex-col gap-[28px]">
        <!-- 双层筛选 -->
        <div class="flex flex-col gap-[12px]">
          <div class="flex gap-[14px] flex-wrap">
            <button v-for="t in eventTabs" :key="t" @click="activeEvent = t"
              class="h-8 px-5 rounded-full text-[13px] font-medium whitespace-nowrap transition-colors border"
              :class="activeEvent === t ? 'text-white border-transparent' : 'bg-transparent text-ink/55 border-border-light hover:border-ink'"
              :style="activeEvent === t ? { background: 'linear-gradient(-69deg, #b5edff 3%, #214fd6 53%, #5383eb 93%)' } : {}">{{ t }}</button>
          </div>
          <div class="flex gap-[14px] flex-wrap">
            <button v-for="t in awardTabs" :key="t" @click="activeAward = t"
              class="h-8 px-5 rounded-full text-[13px] font-medium whitespace-nowrap transition-colors border"
              :class="activeAward === t ? 'text-white border-transparent' : 'bg-transparent text-ink/55 border-border-light hover:border-ink'"
              :style="activeAward === t ? { background: 'linear-gradient(-69deg, #b5edff 3%, #214fd6 53%, #5383eb 93%)' } : {}">{{ t }}</button>
          </div>
        </div>

        <!-- 人才卡片 3 列 -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <article v-for="(t, i) in talents" :key="i"
            class="relative bg-white border border-border-light rounded-lg overflow-hidden group cursor-pointer hover:shadow-lg transition-shadow">
            <!-- 照片 -->
            <div class="aspect-[526/360] overflow-hidden">
              <img :src="t.img" :alt="t.name" class="size-full object-cover transition-transform duration-500 group-hover:scale-105" />
            </div>
            <!-- 信息 -->
            <div class="relative p-4 flex flex-col gap-2" style="background: linear-gradient(to bottom, rgba(181,237,255,0) 0%, rgba(83,131,235,0.12) 100%)">
              <span class="inline-flex items-center px-2 py-0.5 rounded bg-navy/10 text-[11px] font-medium text-navy w-fit">{{ t.event }}</span>
              <p class="font-semibold text-[18px] text-ink">{{ t.name }}</p>
              <p class="text-[13px] text-ink/45 line-clamp-2">民族影像 AIGC 创作者，擅长民族文化元素的数字表达与视觉呈现。</p>

              <!-- 奖项证书悬浮层 -->
              <div class="absolute right-[5%] top-[60%] -translate-y-1/2 w-[46%] pointer-events-none z-10">
                <div class="absolute -left-[60%] -top-[30%] w-[140%] aspect-square rounded-full opacity-8"
                  style="background: radial-gradient(circle, rgba(250,237,197,0.25) 0%, transparent 70%)" />
                <div class="relative backdrop-blur-[4px] bg-white/50 border-[3px] border-[#faedc5] rounded-lg p-2 text-right shadow-[0_14px_36px_rgba(58,35,28,0.08)]">
                  <p class="text-[10px] text-gold/50 uppercase tracking-[0.15em] leading-tight">Certificate</p>
                  <p class="text-[16px] font-bold text-gold leading-tight">{{ t.award }}</p>
                  <p class="text-[11px] text-ink/30 mt-0.5">{{ t.name }}</p>
                  <p class="text-[10px] text-ink/15">{{ t.certId }}</p>
                </div>
              </div>
            </div>
          </article>
        </div>
        <p v-if="!talents.length" class="text-muted py-12 text-center">暂无匹配的人才</p>
      </div>
    </section>
  </div>
</template>

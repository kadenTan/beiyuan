<script setup>
import { ref, computed } from 'vue'
import PageHero from '@/components/shared/PageHero.vue'
import siteContent from '@/data/site-content.js'

// 赛事分类
const eventTabs = ref([
  '全部', '民族影像 AIGC 创作大赛', '非遗影像青年创作营',
  'Aisha uzi 任儿女讲述人大赛', '千校民族影像作品季', '数字文旅 IP 创新挑战'
])
const activeEvent = ref('全部')

// 奖项分类
const awardTabs = ref([
  '全部', '金奖', '优秀创作奖', '银奖', '最佳数字人', '优秀考生', '创意奖', '入围奖'
])
const activeAward = ref('全部')

// 搜索
const searchQuery = ref('')
const recentSearches = ref(['王兴宇', '白鹿', '和弘'])

// 模拟人才数据（用作品数据模拟 + 奖项标签）
const talents = computed(() => {
  const base = (siteContent.works || []).slice(0, 9)
  const awards = ['金奖', '银奖', '优秀创作奖', '最佳数字人', '创意奖', '入围奖', '优秀考生', '金奖', '银奖']
  return base.map((w, i) => ({
    ...w,
    name: ['王兴宇', '白鹿', '和弘', '阿圆', '张艺', '李楠', '陈锐', '王兴宇', '白鹿'][i] || '创作者',
    award: awards[i],
    year: 2026,
    certId: `BY-TALENT-2026-00${i + 1}`,
    desc: '将民族服饰、节庆场景与 AIGC 视觉叙事结合，作品入选平台虚拟展厅。',
  }))
})
</script>

<template>
  <div class="bg-white">
    <PageHero
      title="人才库"
      eng="Talent Pool"
      subtitle="展示赛事获奖得主、优秀考生与平台重点创作者。"
    />

    <!-- ====== 人才展示 ====== -->
    <section class="px-[128px] max-lg:px-8 max-sm:px-4 py-[64px]">
      <div class="max-w-[1664px] mx-auto">

        <!-- 赛事分类 tabs -->
        <div class="flex flex-wrap gap-4 mb-3">
          <button
            v-for="t in eventTabs" :key="t"
            @click="activeEvent = t"
            class="h-[34px] px-5 rounded-full text-[14px] whitespace-nowrap transition-colors border"
            :class="activeEvent === t
              ? 'bg-navy text-white border-navy font-semibold'
              : 'bg-transparent text-muted border-[#ddd] hover:border-ink'"
          >{{ t }}</button>
        </div>

        <!-- 奖项分类 tabs -->
        <div class="flex flex-wrap gap-4 mb-4">
          <button
            v-for="t in awardTabs" :key="t"
            @click="activeAward = t"
            class="h-[34px] px-5 rounded-full text-[14px] whitespace-nowrap transition-colors border"
            :class="activeAward === t
              ? 'bg-navy text-white border-navy font-semibold'
              : 'bg-transparent text-muted border-[#ddd] hover:border-ink'"
          >{{ t }}</button>
        </div>

        <!-- 搜索 -->
        <div class="flex gap-3 mb-4 max-w-[520px]">
          <input
            v-model="searchQuery"
            placeholder="搜索人才、赛事、奖项"
            class="flex-1 min-w-0 h-10 rounded-lg border border-[#ddd] px-[13px] text-[16px] outline-none placeholder:text-muted/35 focus:border-blue transition-colors"
          />
          <button class="h-10 px-4 rounded-lg bg-blue text-white text-[14px] font-semibold shrink-0 hover:opacity-90">搜索</button>
        </div>

        <!-- 近期搜索 -->
        <div class="flex items-center gap-3 mb-8 text-[14px]">
          <span class="text-muted">近期搜索</span>
          <button
            v-for="s in recentSearches" :key="s"
            @click="searchQuery = s"
            class="h-[26px] px-3 rounded-full text-[13px] text-muted bg-bg-card border border-border-light hover:border-blue hover:text-blue transition-colors"
          >{{ s }}</button>
        </div>

        <!-- 人才卡片网格：3 列 -->
        <div class="grid grid-cols-3 max-lg:grid-cols-2 max-sm:grid-cols-1 gap-10">
          <article
            v-for="(t, i) in talents" :key="i"
            class="relative bg-white border border-[#ddd] rounded-lg overflow-visible group cursor-pointer hover:shadow-lg transition-shadow"
          >
            <!-- 照片 -->
            <div class="aspect-[526/360] overflow-hidden rounded-t-lg">
              <img :src="t[3]" :alt="t.name" class="size-full object-cover transition-transform duration-500 group-hover:scale-105" />
            </div>

            <!-- 奖项证书悬浮层 — 横跨图片底部 + 内容顶部 -->
            <div
              class="absolute right-[5%] top-[58%] -translate-y-1/2 w-[46%] z-10 rounded-lg border-[3px] border-gold-pale overflow-hidden"
              style="background: rgba(255,255,255,0.48); box-shadow: 0px 14px 36px 0px rgba(58,35,28,0.08); backdrop-filter: blur(4px);"
            >
              <!-- 大圆光晕背景 -->
              <div class="absolute -left-[66%] -top-[39%] size-[152%] pointer-events-none opacity-20"
                style="background: radial-gradient(circle, rgba(250,237,197,0.6) 0%, transparent 70%)" />
              <!-- 证书文字 -->
              <div class="relative flex flex-col gap-2.5 px-5 py-7 text-left">
                <p class="text-[12px] font-semibold text-navy uppercase tracking-[0.1em] leading-[19px]">CertiFicate</p>
                <p class="text-[24px] font-semibold text-ink leading-tight">{{ t.award }}</p>
                <p class="text-[14px] text-ink/65">{{ t.name }}</p>
                <p class="text-[14px] text-ink/65 whitespace-nowrap">{{ t.certId }}</p>
              </div>
            </div>

            <!-- 底部信息 -->
            <div class="relative p-4 pt-8 flex flex-col gap-3 rounded-b-lg" style="background: linear-gradient(to bottom, rgba(181,237,255,0) 0%, rgba(83,131,235,0.12) 100%)">
              <!-- 赛事标签 -->
              <span class="inline-flex items-center w-fit px-2.5 py-1 rounded text-[12px] font-semibold bg-bg-card text-blue-mid">{{ activeEvent === '全部' ? '民族影像 AIGC 创作大赛' : activeEvent }}</span>

              <!-- 姓名 + 描述 -->
              <div>
                <h3 class="font-semibold text-[20px] text-ink">{{ t.name }}</h3>
                <p class="text-[14px] text-muted mt-1 line-clamp-2">{{ t.desc }}</p>
              </div>

              <!-- 底部行 -->
              <div class="flex items-center justify-between pt-2">
                <span class="text-[14px] font-semibold text-navy">{{ t.award }}</span>
                <span class="text-[13px] text-muted">{{ t.year }}</span>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  </div>
</template>

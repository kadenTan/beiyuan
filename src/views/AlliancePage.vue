<script setup>
import { ref, computed } from 'vue'
import PageHero from '@/components/shared/PageHero.vue'
import { GRADIENT_03 } from '@/config/gradients.js'
import siteContent from '@/data/site-content.js'

const schools = siteContent.schools || []
const regions = ['全部', ...new Set(schools.map(s => s[0]))]
const active = ref('全部')
const filtered = computed(() => active.value === '全部' ? schools : schools.filter(s => s[0] === active.value))

// 分类筛选（高校/研究机构/基地）
const schoolTypes = ['全部', '高校', '研究机构', '基地']
const activeType = ref('全部')
const typeFiltered = computed(() => {
  if (activeType.value === '全部') return filtered.value
  return filtered.value.filter(s => s[3] === activeType.value)
})

// Tab 切换
const activeSection = ref('alliance') // 'alliance' | 'government'

// 政府对接新闻数据（复用资讯数据模拟）
const news = ref([
  {
    title: '贝元民族影像智创平台正式上线',
    desc: '平台整合 AIGC 创作、赛事、课程、展陈、存证与文创转化，面向民族艺术创作者全面开放。',
    img: '/assets/figma/imgArticle0.png',
    id: 0,
  },
  {
    title: '甘肃省文旅厅与贝元平台签署战略合作',
    desc: '双方将在民族影像数字化保护、AIGC 内容创作与人才培养等领域展开深度合作。',
    img: '/assets/figma/imgArticle1.png',
    id: 1,
  },
  {
    title: '民族影像产业科创中心在兰州揭牌成立',
    desc: '聚焦民族影像人工智能技术与传统文化融合创新，打造西部 AIGC 产业高地。',
    img: '/assets/figma/imgArticle2.png',
    id: 2,
  },
  {
    title: '贝元平台亮相中国国际文化产业博览会',
    desc: '展示最新 AIGC 创作成果与区块链存证技术，获评"最具创新数字文化平台"。',
    img: '/assets/figma/imgArticle0.png',
    id: 3,
  },
])
</script>

<template>
  <div class="bg-white">
    <PageHero title="商务合作" eng="Alliance" subtitle="连接高校、研究机构与创作基地，共建民族影像科创资源网络。" />

    <!-- ====== Tab 切换：千校联盟 / 政府对接 ====== -->
    <section class="flex justify-center py-[80px] px-6 max-sm:py-[60px]">
      <div class="flex gap-8">
        <button
          @click="activeSection = 'alliance'"
          class="text-[56px] max-sm:text-[32px] font-semibold leading-tight transition-all"
          :style="activeSection === 'alliance' ? { background: GRADIENT_03, '-webkit-background-clip': 'text', '-webkit-text-fill-color': 'transparent' } : { color: 'rgba(26,20,16,0.2)' }"
        >千校联盟</button>
        <button
          @click="activeSection = 'government'"
          class="text-[56px] max-sm:text-[32px] font-semibold leading-tight transition-all"
          :style="activeSection === 'government' ? { background: GRADIENT_03, '-webkit-background-clip': 'text', '-webkit-text-fill-color': 'transparent' } : { color: 'rgba(26,20,16,0.2)' }"
        >政府对接</button>
      </div>
    </section>

    <!-- ====== 千校联盟内容 ====== -->
    <section v-if="activeSection === 'alliance'" class="px-[128px] max-lg:px-8 max-sm:px-4 pb-[80px]">
      <div class="flex flex-col gap-8 max-w-[1664px] mx-auto">
        <!-- 地区筛选 -->
        <div class="flex flex-wrap gap-4">
          <button
            v-for="r in regions" :key="r"
            @click="active = r"
            class="h-8 px-5 rounded-full text-[14px] whitespace-nowrap transition-all border"
            :style="active === r
              ? { background: GRADIENT_03, color: '#fff', borderColor: 'transparent', fontWeight: 600 }
              : { background: 'transparent', color: 'var(--color-muted, #6e6258)', borderColor: '#ddd' }"
          >{{ r }}</button>
        </div>

        <!-- 类型筛选 -->
        <div class="flex flex-wrap gap-4">
          <button
            v-for="t in schoolTypes" :key="t"
            @click="activeType = t"
            class="h-8 px-5 rounded-full text-[14px] whitespace-nowrap transition-all border"
            :style="activeType === t
              ? { background: GRADIENT_03, color: '#fff', borderColor: 'transparent', fontWeight: 600 }
              : { background: 'transparent', color: 'var(--color-muted, #6e6258)', borderColor: '#ddd' }"
          >{{ t }}</button>
        </div>

        <!-- 卡片网格：4 列 -->
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <article
            v-for="(s, i) in typeFiltered"
            :key="i"
            class="flex flex-col items-center justify-center gap-5 h-[140px] bg-white rounded-md hover:bg-bg-card transition-colors cursor-pointer"
          >
            <img :src="s[4] || '/assets/logo.png'" :alt="s[2]" class="h-12 w-auto max-w-[193px] object-contain" />
            <p class="text-[16px] text-ink/70 text-center leading-[1.3] max-w-[176px]">{{ s[2] }}</p>
          </article>
        </div>

        <div v-if="typeFiltered.length === 0" class="py-20 text-center">
          <p class="text-[16px] text-ink/45">该区域暂无合作院校</p>
        </div>
      </div>
    </section>

    <!-- ====== 政府对接内容 ====== -->
    <section v-if="activeSection === 'government'" class="px-[128px] max-lg:px-8 max-sm:px-4 pb-[80px]">
      <div class="grid grid-cols-2 max-sm:grid-cols-1 gap-6 max-w-[1664px] mx-auto">
        <article
          v-for="n in news" :key="n.id"
          @click="$router.push(`/news/${n.id}`)"
          class="group cursor-pointer"
        >
          <div class="overflow-hidden rounded-lg mb-6">
            <img :src="n.img" :alt="n.title" class="w-full aspect-[772/288] object-cover transition-transform duration-500 group-hover:scale-105" />
          </div>
          <div>
            <h3 class="font-semibold text-[24px] max-sm:text-[18px] text-ink leading-[1.3] mb-2">{{ n.title }}</h3>
            <p class="text-[16px] max-sm:text-[14px] text-muted leading-[1.5] mb-3">{{ n.desc }}</p>
            <span class="text-[16px] text-blue font-medium">查看详情</span>
          </div>
        </article>
      </div>
    </section>
  </div>
</template>

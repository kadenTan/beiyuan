<script setup>
import { ref, computed } from 'vue'
import siteContent from '@/data/site-content.js'
import { GRADIENT_03 } from '@/config/gradients.js'

const courses = siteContent.courses || []
const seriesCourses = siteContent.seriesCourses || []

// 筛选状态
const priceFilter = ref('全部')
const priceOptions = ['全部', '收费', '免费']
const categoryFilter = ref('全部课程')
const categoryOptions = ['全部课程', 'AIGC 入门', '影像实战', '数字人', '版权存证', '文创开发', '展厅运营']
const searchQuery = ref('')

const filtered = computed(() => {
  let result = courses
  if (priceFilter.value === '收费') result = result.filter(c => c.price === '收费')
  if (priceFilter.value === '免费') result = result.filter(c => c.price === '免费')
  if (categoryFilter.value !== '全部课程') result = result.filter(c => c.category === categoryFilter.value)
  if (searchQuery.value.trim()) {
    const q = searchQuery.value.trim().toLowerCase()
    result = result.filter(c =>
      c.title.toLowerCase().includes(q) ||
      c.teacher.toLowerCase().includes(q) ||
      (c.desc && c.desc.toLowerCase().includes(q))
    )
  }
  return result
})

// 展开的系列课程
const expandedSeries = ref(null)
</script>

<template>
  <div>
    <!-- ===== Hero ===== -->
    <section class="relative h-[480px] max-sm:h-[340px] w-full overflow-hidden bg-navy">
      <div class="absolute inset-0 blur-[2px]">
        <img src="/assets/figma/imgBanner.png" alt="" class="absolute inset-0 size-full object-cover" />
      </div>
      <div class="absolute inset-0" style="background: linear-gradient(180.36deg, rgba(24,42,165,0.12) 1.27%, rgba(28,73,202,0.28) 31.38%, rgba(18,42,126,0.518) 59.56%, rgb(9,16,63) 92.81%)" />
      <div class="absolute left-1/2 -translate-x-1/2 top-[182px] max-sm:top-[140px] flex flex-col gap-[16px] items-center px-6 w-full">
        <p class="font-semibold text-[56px] max-sm:text-[36px] leading-[53px] text-center whitespace-nowrap drop-shadow-[0_2px_12px_rgba(0,0,0,0.4)]"
          style="background: linear-gradient(to bottom, #faedc5, #dbbd78); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">课程学习</p>
        <p class="font-light text-[16px] max-sm:text-[14px] text-gold-light uppercase tracking-[2.88px]">Courses</p>
        <p class="text-[16px] max-sm:text-[14px] leading-[27px] text-white/80 text-center max-w-[448px]">
          以知识付费课程、免费试听和赛事备赛路径，帮助创作者把民族影像创意转化为可提交、可展示、可存证的 AIGC 作品。
        </p>
      </div>
    </section>

    <!-- ===== 内容区 ===== -->
    <section class="bg-white px-[128px] max-lg:px-8 max-sm:px-4 py-[64px] max-sm:py-[40px] w-full">
      <div class="flex flex-col gap-[28px] max-w-[1336px] mx-auto">

        <!-- 筛选区 -->
        <div class="flex flex-col gap-[12px]">
          <!-- 价格 -->
          <div class="flex gap-[16px] items-center flex-wrap">
            <span v-for="p in priceOptions" :key="p" @click="priceFilter = p"
              class="inline-flex items-start px-[20px] py-[6px] rounded-full text-[12px] font-medium cursor-pointer transition-colors"
              :class="priceFilter === p ? 'text-white' : 'border border-border-light text-ink/65 hover:border-ink'"
              :style="priceFilter === p ? { background: GRADIENT_03 } : {}">{{ p }}</span>
          </div>
          <!-- 分类 -->
          <div class="flex gap-[16px] items-center flex-wrap">
            <span v-for="cat in categoryOptions" :key="cat" @click="categoryFilter = cat"
              class="inline-flex items-start px-[20px] py-[6px] rounded-full text-[12px] font-medium cursor-pointer transition-colors"
              :class="categoryFilter === cat ? 'text-white' : 'border border-border-light text-ink/65 hover:border-ink'"
              :style="categoryFilter === cat ? { background: GRADIENT_03 } : {}">{{ cat }}</span>
          </div>
          <!-- 搜索 -->
          <div class="flex gap-[10px] max-w-[520px]">
            <div class="flex-1 min-w-0 border border-border-light rounded-[8px] bg-white overflow-hidden">
              <input v-model="searchQuery" type="text" placeholder="搜索课程、讲师、学习目标"
                class="w-full px-[13px] py-[9px] text-[16px] outline-none text-ink placeholder:text-ink/35" />
            </div>
            <button class="bg-blue rounded-[8px] px-[16px] py-[8px] text-[16px] font-semibold text-white text-center whitespace-nowrap hover:bg-blue-mid transition-colors">搜索</button>
          </div>
        </div>

        <!-- ===== Ai系列课程 ===== -->
        <div v-for="(s, si) in seriesCourses" :key="si"
          class="relative bg-white border border-blue-pale rounded-lg overflow-hidden px-5 py-7 flex flex-col gap-4 shadow-[0_14px_36px_rgba(58,35,28,0.08)]">
          <!-- 背景装饰椭圆 -->
          <div class="absolute -left-[159px] -top-[285px] size-[882px] pointer-events-none opacity-10">
            <svg class="size-full" viewBox="0 0 882 882" fill="none"><circle cx="441" cy="441" r="440" fill="url(#series-ellipse)" /><defs><radialGradient id="series-ellipse" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="#b5edff" /><stop offset="100%" stop-color="#b5edff" stop-opacity="0" /></radialGradient></defs></svg>
          </div>
          <!-- 头部：名称 + 团队标签 -->
          <div class="relative flex items-center justify-between gap-4 flex-wrap">
            <h3 class="text-[24px] font-semibold text-ink">{{ s.name }}</h3>
            <span class="bg-bg-card rounded-[36px] px-3 py-3 text-[14px] font-medium text-blue">{{ s.team }}</span>
          </div>
          <!-- 课程介绍 -->
          <p class="relative text-[14px] text-ink leading-[1.7]">课程介绍：{{ s.desc }}</p>
          <!-- 课程列表（可折叠） -->
          <div class="relative flex flex-col gap-2">
            <button @click="expandedSeries = expandedSeries === si ? null : si"
              class="text-[14px] text-blue font-semibold self-start hover:underline">
              {{ expandedSeries === si ? '收起课程列表' : '展开课程列表' }}（{{ s.courses.length }} 门课）
            </button>
            <div v-if="expandedSeries === si" class="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div v-for="(c, ci) in s.courses" :key="ci"
                class="flex items-start gap-3 p-3 rounded-lg bg-bg-card">
                <span class="inline-flex items-center justify-center w-6 h-6 rounded-full bg-blue text-white text-[12px] font-bold shrink-0">{{ ci + 1 }}</span>
                <div>
                  <p class="font-semibold text-[14px] text-ink">{{ c.title }}</p>
                  <p class="text-[12px] text-ink/45">{{ c.desc }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- ===== 系统课程卡片网格 ===== -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-[28px] gap-y-[28px]">
          <article v-for="(course, i) in filtered" :key="i"
            class="border border-border-light rounded-[8px] overflow-hidden bg-white hover:shadow-lg transition-shadow flex flex-col max-w-[480px] min-w-0 justify-self-stretch w-full">
            <!-- 图片 -->
            <div class="relative h-[248px] overflow-hidden shrink-0">
              <img :src="course.img" :alt="course.title"
                class="absolute inset-0 size-full object-cover hover:scale-105 transition-transform duration-300" />
            </div>
            <!-- 内容 -->
            <div class="flex flex-col gap-[8px] p-[16px] pt-4 pb-2 flex-1"
              style="background: linear-gradient(-4deg, rgba(181,237,255,0) 46.7%, rgba(83,131,235,0.23) 87.97%)">
              <!-- 标签行 -->
              <div class="flex items-center justify-between">
                <span class="bg-bg-card rounded-full px-[9px] py-[4px] text-[12px] text-blue whitespace-nowrap">{{ course.category }} · {{ course.price }}</span>
                <div class="flex items-center gap-[4px]">
                  <svg class="size-[16px] shrink-0" viewBox="0 0 24 24" fill="none" stroke="rgba(26,20,16,0.65)" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                  <span class="text-[12px] leading-[20px] whitespace-nowrap" style="color: rgba(26,20,16,0.65)">{{ course.likes }}</span>
                </div>
              </div>
              <!-- 标题 + 描述 -->
              <div class="flex flex-col gap-[4px]">
                <h3 class="font-semibold text-[20px] text-ink leading-[28px] whitespace-nowrap truncate">{{ course.title }}</h3>
                <div class="flex flex-col gap-[4px] text-[14px] leading-[20px]" style="color: rgba(26,20,16,0.65)">
                  <p class="line-clamp-2">{{ course.desc }}</p>
                  <p>导师：{{ course.teacher }}</p>
                </div>
              </div>
              <!-- 按钮 -->
              <div class="h-[40px] min-h-[40px] rounded-[31px] flex items-center">
                <span class="text-[14px] font-semibold text-blue text-center cursor-pointer hover:underline">查看课程</span>
              </div>
            </div>
          </article>
        </div>

        <!-- 无结果 -->
        <div v-if="filtered.length === 0" class="py-[60px] text-center">
          <p class="text-[16px]" style="color: rgba(26,20,16,0.45)">暂无匹配的课程</p>
        </div>

      </div>
    </section>
  </div>
</template>

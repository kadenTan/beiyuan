<script setup>
import { ref, computed } from 'vue'
import siteContent from '@/data/site-content.js'
import { GRADIENT_03 } from '@/config/gradients.js'

const courses = siteContent.courses || []
const seriesCourses = siteContent.seriesCourses || []

// --- 筛选状态 ---
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

const totalCourses = courses.length
const freeCourses = courses.filter(c => c.price === '免费').length

// 系列课程当前展开的
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
          style="background: linear-gradient(to bottom, #faedc5, #dbbd78); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">课程中心</p>
        <p class="font-light text-[16px] max-sm:text-[14px] text-gold-light uppercase tracking-[2.88px]">Courses</p>
        <p class="text-[16px] max-sm:text-[14px] leading-[27px] text-white/80 text-center max-w-[448px]">
          系统课程与系列课程，帮助创作者把民族影像创意转化为可提交、可展示、可存证的 AIGC 作品。
        </p>
      </div>
    </section>

    <!-- ===== 左右并列：系统课程 + 系列课程 ===== -->
    <section class="px-[128px] max-lg:px-8 max-sm:px-4 py-[80px] max-sm:py-[60px] w-full">
      <div class="flex gap-[28px] items-start max-lg:flex-col">
        <!-- ===== 左侧：系统课程 ===== -->
        <div class="flex-1 min-w-0 flex flex-col gap-[28px]">
          <!-- 标题区 -->
          <div class="flex flex-col gap-[8px]">
            <div class="flex items-center gap-3">
              <img src="/assets/标题装饰（右边）.svg" alt="" class="h-[28px] w-auto opacity-60" />
              <span class="font-semibold text-[12px] text-navy-mid uppercase">System Courses</span>
            </div>
            <p class="font-semibold text-[clamp(32px,4vw,56px)] leading-[1.15] whitespace-nowrap"
              :style="{ background: GRADIENT_03, '-webkit-background-clip': 'text', '-webkit-text-fill-color': 'transparent' }">系统课程</p>
            <p class="text-[15px]" style="color: rgba(26,20,16,0.65)">{{ totalCourses }} 门课程 · {{ freeCourses }} 门免费试听，可按分类和价格筛选。</p>
          </div>

          <!-- 筛选区 -->
          <div class="flex flex-col gap-[12px]">
            <div class="flex gap-[16px] items-center flex-wrap">
              <span v-for="p in priceOptions" :key="p" @click="priceFilter = p"
                class="inline-flex items-start px-[21px] py-[7px] rounded-full text-[12px] font-semibold cursor-pointer transition-colors"
                :class="priceFilter === p ? 'text-white' : 'border border-border-light text-ink/65 hover:border-ink'"
                :style="priceFilter === p ? { background: GRADIENT_03 } : {}">{{ p }}</span>
            </div>
            <div class="flex gap-[16px] items-center flex-wrap">
              <span v-for="cat in categoryOptions" :key="cat" @click="categoryFilter = cat"
                class="inline-flex items-start px-[21px] py-[7px] rounded-full text-[12px] font-semibold cursor-pointer transition-colors"
                :class="categoryFilter === cat ? 'text-white' : 'border border-border-light text-ink/65 hover:border-ink'"
                :style="categoryFilter === cat ? { background: GRADIENT_03 } : {}">{{ cat }}</span>
            </div>
            <div class="flex gap-[10px] max-w-[520px]">
              <div class="flex-1 min-w-0 border border-border-light rounded-[8px] bg-white overflow-hidden">
                <input v-model="searchQuery" type="text" placeholder="搜索课程、讲师、学习目标"
                  class="w-full px-[13px] py-[9px] text-[16px] outline-none text-ink placeholder:text-ink/35" />
              </div>
              <button class="bg-blue rounded-[8px] px-[16px] py-[8px] text-[16px] font-semibold text-white text-center whitespace-nowrap hover:bg-blue-mid transition-colors">搜索</button>
            </div>
          </div>

          <!-- 课程卡片网格 — 根据容器宽度自适应 -->
          <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-[28px]">
            <article v-for="(course, i) in filtered" :key="i"
              class="border border-border-light rounded-[8px] overflow-hidden bg-white hover:shadow-lg transition-shadow flex flex-col cursor-pointer">
              <div class="relative h-[220px] overflow-hidden shrink-0">
                <img :src="course.img" :alt="course.title" class="absolute inset-0 size-full object-cover hover:scale-105 transition-transform duration-300" />
                <div class="absolute left-[20px] bottom-[20px] font-heading font-bold text-[28px] leading-[36px] whitespace-nowrap"
                  :style="course.price === '收费'
                    ? { background: 'linear-gradient(to bottom, #f8b16b, #b3321f)', '-webkit-background-clip': 'text', '-webkit-text-fill-color': 'transparent', textShadow: '0 2px 2px rgba(0,0,0,0.55)' }
                    : { background: GRADIENT_03, '-webkit-background-clip': 'text', '-webkit-text-fill-color': 'transparent' }">{{ course.title }}</div>
              </div>
              <div class="flex flex-col gap-[8px] p-[16px] flex-1" style="background: linear-gradient(-4.65deg, rgba(181,237,255,0) 46.7%, rgba(83,131,235,0.23) 87.97%)">
                <span class="inline-block w-fit bg-bg-card rounded-full px-[9px] py-[4px] text-[12px] text-blue whitespace-nowrap">{{ course.category }} · {{ course.price }}</span>
                <h3 class="text-[18px] font-semibold text-ink leading-[26px] whitespace-nowrap truncate">{{ course.title }}</h3>
                <p class="text-[14px] leading-[20px] line-clamp-2" style="color: rgba(26,20,16,0.65)">{{ course.desc }}</p>
                <div class="flex items-center justify-between pt-[8px]">
                  <div class="flex items-center gap-[4px]">
                    <svg class="size-[16px] shrink-0" viewBox="0 0 24 24" fill="none" stroke="rgba(26,20,16,0.65)" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                    <span class="text-[12px] leading-[20px] whitespace-nowrap" style="color: rgba(26,20,16,0.65)">{{ course.teacher }}</span>
                  </div>
                  <div class="flex items-center gap-[4px]">
                    <svg class="size-[16px] shrink-0" viewBox="0 0 24 24" fill="none" stroke="rgba(26,20,16,0.65)" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></svg>
                    <span class="text-[12px] leading-[20px] whitespace-nowrap" style="color: rgba(26,20,16,0.65)">{{ course.likes }}</span>
                  </div>
                </div>
                <button class="w-full h-[40px] min-h-[40px] rounded-[31px] border border-blue text-[14px] font-semibold text-ink hover:bg-blue hover:text-white transition-colors">查看课程</button>
              </div>
            </article>
          </div>
          <div v-if="filtered.length === 0" class="py-[60px] text-center">
            <p class="text-[16px]" style="color: rgba(26,20,16,0.45)">暂无匹配的课程</p>
          </div>
        </div>

        <!-- ===== 右侧：系列课程 ===== -->
        <aside class="shrink-0 w-[340px] max-lg:w-full flex flex-col gap-[20px] sticky top-[88px]">
          <!-- 标题 -->
          <div class="flex flex-col gap-[6px]">
            <div class="flex items-center gap-3">
              <img src="/assets/标题装饰（右边）.svg" alt="" class="h-[24px] w-auto opacity-60" />
              <span class="font-semibold text-[11px] text-navy-mid uppercase">Series Courses</span>
            </div>
            <p class="font-semibold text-[28px] leading-[1.2] whitespace-nowrap"
              :style="{ background: GRADIENT_03, '-webkit-background-clip': 'text', '-webkit-text-fill-color': 'transparent' }">系列课程</p>
            <p class="text-[13px]" style="color: rgba(26,20,16,0.55)">与院校及导师合作的系统课程包</p>
          </div>

          <!-- 系列课程紧凑卡片 -->
          <div class="flex flex-col gap-3 max-lg:grid max-lg:grid-cols-2 max-sm:grid-cols-1">
            <div v-for="(s, si) in seriesCourses" :key="si"
              class="bg-white border border-border-light rounded-lg overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
              @click="expandedSeries = expandedSeries === si ? null : si">
              <!-- 封面 -->
              <div class="relative h-[140px] overflow-hidden">
                <img :src="s.img" :alt="s.name" class="absolute inset-0 size-full object-cover" />
                <div class="absolute inset-0 bg-gradient-to-t from-navy/50 to-transparent" />
                <h3 class="absolute bottom-3 left-4 font-bold text-[18px] text-white drop-shadow-[0_1px_4px_rgba(0,0,0,0.5)] leading-tight">{{ s.name }}</h3>
              </div>
              <!-- 团队 -->
              <div class="p-3 flex flex-col gap-2">
                <div class="flex items-center gap-1.5">
                  <span class="text-[11px] font-semibold text-navy bg-bg-card rounded-full px-2 py-0.5">课程团队</span>
                  <span class="text-[12px] text-ink/55 truncate">{{ s.team }}</span>
                </div>
                <!-- 展开的子课程列表 -->
                <div v-if="expandedSeries === si" class="flex flex-col gap-1.5 mt-1">
                  <div v-for="(c, ci) in s.courses" :key="ci"
                    class="flex items-start gap-2 p-2 rounded-md bg-bg-card">
                    <span class="inline-flex items-center justify-center w-5 h-5 rounded-full bg-blue text-white text-[11px] font-bold shrink-0">{{ ci + 1 }}</span>
                    <div>
                      <p class="font-semibold text-[13px] text-ink leading-tight">{{ c.title }}</p>
                      <p class="text-[11px] text-ink/40">{{ c.desc }}</p>
                    </div>
                  </div>
                  <button class="w-full h-[36px] rounded-lg text-[13px] font-semibold text-white hover:opacity-90 transition-opacity mt-1" :style="{ background: GRADIENT_03 }">查看系列详情</button>
                </div>
                <!-- 收起状态简介 -->
                <p v-else class="text-[12px] text-ink/40 line-clamp-2">{{ s.desc }}</p>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </section>
  </div>
</template>

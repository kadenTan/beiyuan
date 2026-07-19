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

const selectedCourse = ref(courses[0] || null)
const totalCourses = courses.length
const freeCourses = courses.filter(c => c.price === '免费').length
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

    <!-- ===== 系统课程 ===== -->
    <section class="px-[128px] max-lg:px-8 max-sm:px-4 py-[80px] max-sm:py-[60px] w-full">
      <div class="flex flex-col gap-[28px]">
        <!-- 标题区 -->
        <div class="max-w-[760px] flex flex-col gap-[8px]">
          <div class="flex items-center gap-3">
            <img src="/assets/标题装饰（右边）.svg" alt="" class="h-[28px] w-auto opacity-60" />
            <span class="font-semibold text-[12px] text-navy-mid uppercase">System Courses</span>
          </div>
          <p class="font-semibold text-[clamp(32px,4vw,64px)] leading-[1.15] whitespace-nowrap"
            :style="{ background: GRADIENT_03, '-webkit-background-clip': 'text', '-webkit-text-fill-color': 'transparent' }">系统课程</p>
          <p class="text-[16px]" style="color: rgba(26,20,16,0.65)">{{ totalCourses }} 门课程 · {{ freeCourses }} 门免费试听，可按分类和价格筛选。</p>
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

        <!-- 双栏：课程网格 + 侧边栏 -->
        <div class="flex gap-[28px] items-start">
          <div class="flex-1 min-w-0">
            <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-[28px]">
              <article v-for="(course, i) in filtered" :key="i" @click="selectedCourse = course"
                class="border border-border-light rounded-[8px] overflow-hidden bg-white hover:shadow-lg transition-shadow flex flex-col cursor-pointer"
                :class="{ 'ring-2 ring-blue': selectedCourse === course }">
                <div class="relative h-[248px] overflow-hidden shrink-0">
                  <img :src="course.img" :alt="course.title" class="absolute inset-0 size-full object-cover hover:scale-105 transition-transform duration-300" />
                  <div class="absolute left-[24px] bottom-[28px] font-heading font-bold text-[32px] leading-[40px] whitespace-nowrap"
                    :style="course.price === '收费'
                      ? { background: 'linear-gradient(to bottom, #f8b16b, #b3321f)', '-webkit-background-clip': 'text', '-webkit-text-fill-color': 'transparent', textShadow: '0 2px 2px rgba(0,0,0,0.55)' }
                      : { background: GRADIENT_03, '-webkit-background-clip': 'text', '-webkit-text-fill-color': 'transparent' }">{{ course.title }}</div>
                </div>
                <div class="flex flex-col gap-[8px] p-[16px] flex-1" style="background: linear-gradient(-4.65deg, rgba(181,237,255,0) 46.7%, rgba(83,131,235,0.23) 87.97%)">
                  <span class="inline-block w-fit bg-bg-card rounded-full px-[9px] py-[4px] text-[12px] text-blue whitespace-nowrap">{{ course.category }} · {{ course.price }}</span>
                  <h3 class="text-[20px] font-semibold text-ink leading-[28px] whitespace-nowrap truncate">{{ course.title }}</h3>
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
          <!-- 侧边栏 -->
          <aside v-if="selectedCourse" class="shrink-0 w-[340px] hidden xl:block sticky top-[88px]">
            <div class="relative bg-white border-[3px] border-blue-pale rounded-[8px] overflow-clip flex flex-col gap-[10px] px-[20px] py-[28px] shadow-[0_14px_36px_0_rgba(58,35,28,0.08)]">
              <div class="absolute left-[-160.5px] top-[-70.7px] size-[435px] pointer-events-none">
                <svg class="size-full" viewBox="0 0 435 435" fill="none"><circle cx="217.5" cy="217.5" r="217" fill="url(#e-grad)" opacity="0.18" /><defs><radialGradient id="e-grad" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="#b5edff" /><stop offset="100%" stop-color="#b5edff" stop-opacity="0" /></radialGradient></defs></svg>
              </div>
              <p class="font-semibold text-[12px] text-navy uppercase leading-[19.2px]">Course Detail</p>
              <p class="font-semibold text-[24px] text-ink leading-normal">{{ selectedCourse.title }}</p>
              <p class="text-[14px] leading-normal" style="color: rgba(26,20,16,0.65)">{{ selectedCourse.desc }}</p>
              <div class="flex flex-col gap-[16px] w-full">
                <div class="bg-bg-card rounded-[8px] p-[12px] flex items-center justify-between w-full">
                  <p class="font-semibold text-[24px] leading-[38.4px] whitespace-nowrap" :style="{ background: GRADIENT_03, '-webkit-background-clip': 'text', '-webkit-text-fill-color': 'transparent' }">{{ selectedCourse.price }}</p>
                  <p class="font-semibold text-[13px] text-blue leading-[20.8px] whitespace-nowrap">{{ selectedCourse.price === '免费' ? '可完整试听' : '限时优惠' }}</p>
                </div>
                <div class="flex flex-col w-full"><p class="font-semibold text-[16px] text-ink leading-normal">适合人群</p><div class="flex flex-col pb-[16px] pt-[6px]"><p class="text-[16px] leading-normal" style="color: rgba(26,20,16,0.65)">{{ selectedCourse.audience }}</p></div></div>
                <div class="flex flex-col w-full"><p class="font-semibold text-[16px] text-ink leading-normal">学习目标</p><p v-for="(goal, gi) in selectedCourse.goals" :key="'g'+gi" class="text-[16px] leading-normal whitespace-nowrap" style="color: rgba(26,20,16,0.65)">{{ goal }}</p></div>
                <div class="flex flex-col w-full"><p class="font-semibold text-[16px] text-ink leading-normal">课程目录</p><p v-for="(item, oi) in selectedCourse.outline" :key="'o'+oi" class="text-[16px] leading-normal whitespace-nowrap" style="color: rgba(26,20,16,0.65)">{{ item }}</p></div>
                <div class="flex gap-[12px] w-full">
                  <button class="flex-1 min-h-[42px] min-w-0 px-[25px] py-[9px] rounded-[12px] border border-blue-pale text-[16px] font-semibold text-white text-center whitespace-nowrap hover:opacity-90 transition-opacity" :style="{ background: GRADIENT_03 }">立即购买</button>
                  <button class="flex-1 h-[42px] min-w-0 px-[17px] py-px rounded-[8px] bg-white border border-blue text-[16px] font-semibold text-ink text-center whitespace-nowrap hover:bg-blue hover:text-white transition-colors">免费试听</button>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>

    <!-- ===== 系列课程 ===== -->
    <section class="px-[128px] max-lg:px-8 max-sm:px-4 py-[80px] max-sm:py-[60px] w-full" style="background: #f2f9ff">
      <div class="flex flex-col gap-[40px]">
        <!-- 标题区 -->
        <div class="max-w-[760px] flex flex-col gap-[8px]">
          <div class="flex items-center gap-3">
            <img src="/assets/标题装饰（右边）.svg" alt="" class="h-[28px] w-auto opacity-60" />
            <span class="font-semibold text-[12px] text-navy-mid uppercase">Series Courses</span>
          </div>
          <p class="font-semibold text-[clamp(32px,4vw,64px)] leading-[1.15] whitespace-nowrap"
            :style="{ background: GRADIENT_03, '-webkit-background-clip': 'text', '-webkit-text-fill-color': 'transparent' }">系列课程</p>
          <p class="text-[16px]" style="color: rgba(26,20,16,0.65)">与院校、研究机构及行业导师合作开发的系统性课程包，适合深度学习与团队研修。</p>
        </div>

        <!-- 系列课程卡片列表 -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <article v-for="(s, si) in seriesCourses" :key="si"
            class="bg-white rounded-xl border border-border-light overflow-hidden hover:shadow-lg transition-shadow flex flex-col">
            <!-- 头部：课程封面 + 名称 -->
            <div class="relative h-[240px] overflow-hidden">
              <img :src="s.img" :alt="s.name" class="absolute inset-0 size-full object-cover" />
              <div class="absolute inset-0 bg-gradient-to-t from-navy/60 to-transparent" />
              <div class="absolute bottom-0 left-0 p-6">
                <h2 class="font-bold text-[32px] max-sm:text-[26px] text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]">{{ s.name }}</h2>
              </div>
            </div>
            <!-- 团队 + 介绍 -->
            <div class="p-6 flex flex-col gap-4">
              <div class="flex items-center gap-2">
                <span class="inline-flex items-center px-3 py-1 rounded-full bg-bg-card text-[12px] font-semibold text-navy">课程团队</span>
                <span class="text-[14px] text-ink/70">{{ s.team }}</span>
              </div>
              <p class="text-[15px] leading-relaxed text-ink/60">{{ s.desc }}</p>
              <!-- 课程列表 -->
              <div class="flex flex-col gap-2">
                <p class="font-semibold text-[16px] text-ink">课程列表</p>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
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
              <!-- 按钮 -->
              <button class="w-full h-[44px] rounded-[12px] text-[15px] font-semibold text-white hover:opacity-90 transition-opacity" :style="{ background: GRADIENT_03 }">查看系列详情</button>
            </div>
          </article>
        </div>
      </div>
    </section>
  </div>
</template>

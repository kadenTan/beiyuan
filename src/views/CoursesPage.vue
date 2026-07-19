<script setup>
import { ref, computed } from 'vue'
import siteContent from '@/data/site-content.js'
import { GRADIENT_03 } from '@/config/gradients.js'

const courses = siteContent.courses || []

// 筛选
const priceFilter = ref('全部')
const categoryFilter = ref('全部课程')
const searchQuery = ref('')
const priceOptions = ['全部', '收费', '免费']
const categoryOptions = ['全部课程', 'AIGC 入门', '影像实战', '数字人', '版权存证', '文创开发', '展厅运营']

const filtered = computed(() => {
  let result = courses
  if (priceFilter.value === '收费') result = result.filter(c => c.price === '收费')
  if (priceFilter.value === '免费') result = result.filter(c => c.price === '免费')
  if (categoryFilter.value !== '全部课程') result = result.filter(c => c.category === categoryFilter.value)
  if (searchQuery.value.trim()) {
    const q = searchQuery.value.trim().toLowerCase()
    result = result.filter(c => c.title.toLowerCase().includes(q) || c.teacher.toLowerCase().includes(q) || (c.desc && c.desc.toLowerCase().includes(q)))
  }
  return result
})
</script>

<template>
  <div>
    <!-- Hero -->
    <section class="relative h-[480px] max-sm:h-[340px] w-full overflow-hidden bg-navy">
      <div class="absolute inset-0 blur-[2px]"><img src="/assets/figma/imgBanner.png" alt="" class="absolute inset-0 size-full object-cover" /></div>
      <div class="absolute inset-0" style="background: linear-gradient(180.36deg, rgba(24,42,165,0.12) 1.27%, rgba(28,73,202,0.28) 31.38%, rgba(18,42,126,0.518) 59.56%, rgb(9,16,63) 92.81%)" />
      <div class="absolute left-1/2 -translate-x-1/2 top-[182px] max-sm:top-[140px] flex flex-col gap-[16px] items-center px-6 w-full">
        <p class="font-semibold text-[56px] max-sm:text-[36px] leading-[53px] text-center whitespace-nowrap drop-shadow-[0_2px_12px_rgba(0,0,0,0.4)]" style="background: linear-gradient(to bottom, #faedc5, #dbbd78); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">课程学习</p>
        <p class="font-light text-[16px] max-sm:text-[14px] text-gold-light uppercase tracking-[2.88px]">Courses</p>
        <p class="text-[16px] max-sm:text-[14px] leading-[27px] text-white/80 text-center max-w-[448px]">以知识付费课程、免费试听和赛事备赛路径，帮助创作者把民族影像创意转化为可提交、可展示、可存证的 AIGC 作品。</p>
      </div>
    </section>

    <!-- 内容 -->
    <section class="bg-white px-[128px] max-lg:px-8 max-sm:px-4 py-[64px] max-sm:py-[40px] w-full">
      <div class="flex flex-col gap-[28px] max-w-[1336px] mx-auto">

        <!-- 筛选 -->
        <div class="flex flex-col gap-[12px]">
          <div class="flex gap-[16px] flex-wrap">
            <span v-for="p in priceOptions" :key="p" @click="priceFilter = p" class="inline-flex items-start px-[20px] py-[6px] rounded-full text-[12px] font-medium cursor-pointer transition-colors" :class="priceFilter === p ? 'text-white' : 'border border-border-light text-ink/65 hover:border-ink'" :style="priceFilter === p ? { background: 'linear-gradient(-75deg, #b5edff 3%, #214fd6 53%, #5383eb 93%)' } : {}">{{ p }}</span>
          </div>
          <div class="flex gap-[16px] flex-wrap">
            <span v-for="cat in categoryOptions" :key="cat" @click="categoryFilter = cat" class="inline-flex items-start px-[20px] py-[6px] rounded-full text-[12px] font-medium cursor-pointer transition-colors" :class="categoryFilter === cat ? 'text-white' : 'border border-border-light text-ink/65 hover:border-ink'" :style="categoryFilter === cat ? { background: 'linear-gradient(-69deg, #b5edff 3%, #214fd6 53%, #5383eb 93%)' } : {}">{{ cat }}</span>
          </div>
          <div class="flex gap-[10px] max-w-[520px]">
            <div class="flex-1 min-w-0 border border-border-light rounded-[8px] bg-white overflow-hidden"><input v-model="searchQuery" type="text" placeholder="搜索课程、讲师、学习目标" class="w-full px-[13px] py-[9px] text-[16px] outline-none text-ink placeholder:text-ink/35" /></div>
            <button class="bg-blue rounded-[8px] px-[16px] py-[8px] text-[16px] font-semibold text-white hover:bg-blue-mid transition-colors shrink-0">搜索</button>
          </div>
        </div>

        <!-- ===== Ai系列课程 ===== -->
        <div class="flex flex-col gap-[28px]">
          <div class="flex flex-col pt-[12px]">
            <p class="font-semibold text-[32px] leading-[1.15]" :style="{ background: GRADIENT_03, '-webkit-background-clip': 'text', '-webkit-text-fill-color': 'transparent' }">Ai系列课程</p>
          </div>
          <!-- 系列课程信息卡 -->
          <template v-for="(s, si) in seriesCourses" :key="si">
            <div class="relative bg-white border border-blue-pale rounded-lg overflow-hidden px-5 py-7 flex flex-col gap-3">
              <div class="absolute -left-[159px] -top-[285px] size-[882px] pointer-events-none opacity-10">
                <svg class="size-full" viewBox="0 0 882 882" fill="none"><circle cx="441" cy="441" r="440" fill="#b5edff" /><radialGradient id="se"><stop offset="0%" stop-color="#b5edff" /><stop offset="100%" stop-color="#b5edff" stop-opacity="0" /></radialGradient></svg>
              </div>
              <div class="relative flex items-center justify-between gap-4 flex-wrap">
                <p class="text-[24px] font-semibold text-ink">{{ s.name }}</p>
                <span class="bg-bg-card rounded-[36px] px-3 py-3 text-[14px] font-medium text-blue">{{ s.team }}</span>
              </div>
              <p class="relative text-[14px] text-ink/70 leading-[1.7]">{{ s.desc }}</p>
            </div>
            <!-- 该系列的课程卡片 -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-[28px] gap-y-[28px]">
              <article v-for="(c, i) in filtered.slice(0, 4)" :key="'s'+si+'-'+i" class="border border-border-light rounded-[8px] overflow-hidden bg-white hover:shadow-lg transition-shadow flex flex-col max-w-[480px] min-w-0 justify-self-stretch w-full">
                <div class="relative h-[248px] overflow-hidden shrink-0">
                  <img :src="c.img" :alt="c.title" class="absolute inset-0 size-full object-cover hover:scale-105 transition-transform duration-300" />
                  <p class="absolute left-1/2 -translate-x-1/2 top-[114px] font-bold text-[32px] leading-[40px] whitespace-nowrap" :style="{ background: GRADIENT_03, '-webkit-background-clip': 'text', '-webkit-text-fill-color': 'transparent' }">{{ c.title }}</p>
                </div>
                <div class="flex flex-col gap-[8px] p-[16px] pt-4 pb-2 flex-1" style="background: linear-gradient(-4deg, rgba(181,237,255,0) 46.7%, rgba(83,131,235,0.23) 87.97%)">
                  <div class="flex items-center justify-between">
                    <span class="bg-bg-card rounded-full px-[9px] py-[4px] text-[12px] text-blue whitespace-nowrap">{{ c.category }} · {{ c.price }}</span>
                    <div class="flex items-center gap-[4px]">
                      <svg class="size-[16px]" viewBox="0 0 24 24" fill="none" stroke="rgba(26,20,16,0.65)" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                      <span class="text-[12px]" style="color: rgba(26,20,16,0.65)">{{ c.likes }}</span>
                    </div>
                  </div>
                  <div class="flex flex-col gap-[4px]">
                    <h3 class="font-semibold text-[20px] text-ink leading-[28px] whitespace-nowrap truncate">{{ c.title }}</h3>
                    <div class="flex flex-col gap-[4px] text-[14px] leading-[20px]" style="color: rgba(26,20,16,0.65)">
                      <p class="line-clamp-2">{{ c.desc }}</p>
                      <p>导师：{{ c.teacher }}</p>
                    </div>
                  </div>
                  <div class="h-[40px] min-h-[40px] rounded-[31px] flex items-center">
                    <span class="text-[14px] font-semibold text-blue cursor-pointer hover:underline">查看课程</span>
                  </div>
                </div>
              </article>
            </div>
          </template>
        </div>

        <!-- ===== 系统课程 ===== -->
        <div class="flex flex-col gap-[28px]">
          <!-- 标题 -->
          <div class="flex items-center gap-[24px] pt-[12px]">
            <p class="font-semibold text-[32px] text-ink leading-[1.15]">系统课程</p>
            <img src="/assets/标题装饰（右边）.svg" alt="" class="h-[24px] w-auto opacity-60" />
          </div>
          <!-- 课程卡片 -->
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-[28px] gap-y-[28px]">
            <article v-for="(c, i) in filtered" :key="'x'+i" class="border border-border-light rounded-[8px] overflow-hidden bg-white hover:shadow-lg transition-shadow flex flex-col max-w-[480px] min-w-0 justify-self-stretch w-full">
              <div class="relative h-[248px] overflow-hidden shrink-0">
                <img :src="c.img" :alt="c.title" class="absolute inset-0 size-full object-cover hover:scale-105 transition-transform duration-300" />
                <p class="absolute left-1/2 -translate-x-1/2 top-[114px] font-bold text-[32px] leading-[40px] whitespace-nowrap" :style="{ background: GRADIENT_03, '-webkit-background-clip': 'text', '-webkit-text-fill-color': 'transparent' }">{{ c.title }}</p>
              </div>
              <div class="flex flex-col gap-[8px] p-[16px] pt-4 pb-2 flex-1" style="background: linear-gradient(-4deg, rgba(181,237,255,0) 46.7%, rgba(83,131,235,0.23) 87.97%)">
                <div class="flex items-center justify-between">
                  <span class="bg-bg-card rounded-full px-[9px] py-[4px] text-[12px] text-blue whitespace-nowrap">{{ c.category }} · {{ c.price }}</span>
                  <div class="flex items-center gap-[4px]">
                    <svg class="size-[16px]" viewBox="0 0 24 24" fill="none" stroke="rgba(26,20,16,0.65)" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                    <span class="text-[12px]" style="color: rgba(26,20,16,0.65)">{{ c.likes }}</span>
                  </div>
                </div>
                <div class="flex flex-col gap-[4px]">
                  <h3 class="font-semibold text-[20px] text-ink leading-[28px] whitespace-nowrap truncate">{{ c.title }}</h3>
                  <div class="flex flex-col gap-[4px] text-[14px] leading-[20px]" style="color: rgba(26,20,16,0.65)">
                    <p class="line-clamp-2">{{ c.desc }}</p>
                    <p>导师：{{ c.teacher }}</p>
                  </div>
                </div>
                <div class="h-[40px] min-h-[40px] rounded-[31px] flex items-center">
                  <span class="text-[14px] font-semibold text-blue cursor-pointer hover:underline">查看课程</span>
                </div>
              </div>
            </article>
          </div>
          <div v-if="!filtered.length" class="py-[60px] text-center"><p class="text-[16px]" style="color: rgba(26,20,16,0.45)">暂无匹配的课程</p></div>
        </div>

      </div>
    </section>
  </div>
</template>

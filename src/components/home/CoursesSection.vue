<script setup>
import FigmaHeading from '@/components/shared/FigmaHeading.vue'
import siteContent from '@/data/site-content.js'

const courses = (siteContent.courses || []).slice(0, 6)
const activeTab = '全部'
const tabs = ['全部', 'AIGC 入门', '影像实战', '数字人', '版权存证', '文创开发', '展厅运营']
</script>

<template>
  <section class="flex flex-col items-center py-[168px] bg-white relative overflow-hidden">
    <!-- 背景装饰：Figma 定位 left-[-226px] top-[-196px] size-[1325px] -->
    <div class="absolute left-[-226px] top-[-196px] size-[1325px] pointer-events-none max-sm:hidden">
      <img src="/assets/背景装饰.svg" alt="" class="block max-w-none size-full" />
    </div>

    <div class="flex flex-col gap-[24px] items-center max-w-[1366px] w-full px-6 relative z-10">
      <div class="w-full">
        <FigmaHeading title="课程中心" subtitle="Popular Courses" tone="blue" />
      </div>

      <!-- 分类 Tabs -->
      <div class="flex items-center justify-between w-full">
        <div class="flex gap-[16px] items-center flex-wrap">
          <button
            v-for="tab in tabs"
            :key="tab"
            class="shrink-0 px-[20px] py-[8px] rounded-full text-[14px] whitespace-nowrap transition-all cursor-pointer"
            :class="activeTab === tab ? 'text-white font-medium border-0' : 'font-semibold border border-[#ddd] bg-transparent hover:border-ink'"
            :style="activeTab === tab
              ? { background: 'linear-gradient(-58deg, #b5edff 0%, #214fd6 50%, #5383eb 100%)' }
              : { color: 'rgba(26,20,16,0.65)' }"
          >{{ tab }}</button>
        </div>
        <a href="/#/courses" class="shrink-0 inline-flex items-center justify-center min-h-[40px] px-[16px] rounded-[31px] text-[16px] text-blue" style="background: #f2f9ff">全部课程</a>
      </div>

      <!-- 课程卡片网格 -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-[28px] gap-y-[28px] w-full">
        <article v-for="(c, i) in courses" :key="i" class="border border-[#ddd] rounded-[8px] overflow-hidden bg-white hover:shadow-lg transition-shadow cursor-pointer group">
          <div class="h-[248px] relative overflow-hidden">
            <img :src="c.img" :alt="c.title" class="absolute inset-0 size-full object-cover transition-transform duration-300 group-hover:scale-105" />
          </div>
          <div class="flex flex-col gap-[8px] p-[16px]" style="background: linear-gradient(to bottom, rgba(181,237,255,0) 46.7%, rgba(83,131,235,0.23) 87.97%)">
            <span class="inline-block w-fit px-[9px] py-[4px] rounded-full text-[12px] text-blue" style="background: #f2f9ff">{{ c.category }} · {{ c.price }}</span>
            <div class="flex flex-col gap-[4px]">
              <h3 class="font-semibold text-[20px] leading-[28px] text-ink">{{ c.title }}</h3>
              <p class="text-[14px] leading-[20px] w-[348px] max-w-full" style="color: rgba(26,20,16,0.65)">{{ c.desc }}</p>
            </div>
            <div class="flex items-center justify-between pt-[8px]">
              <span class="flex items-center gap-[4px] text-[12px]" style="color: rgba(26,20,16,0.65)"><img src="/assets/figma/imgIdCardLine.svg" alt="" class="size-[16px]" />{{ c.teacher }}</span>
              <span class="flex items-center gap-[4px] text-[12px]" style="color: rgba(26,20,16,0.65)"><img src="/assets/figma/imgUserHeartLine.svg" alt="" class="size-[16px]" />{{ c.likes }}</span>
            </div>
            <button class="w-full h-[40px] min-h-[40px] rounded-[31px] border border-blue text-[14px] font-semibold text-ink hover:bg-blue hover:text-white transition-colors">查看课程</button>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

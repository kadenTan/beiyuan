<script setup>
import FigmaHeading from '@/components/shared/FigmaHeading.vue'
import siteContent from '@/data/site-content.js'
import { GRADIENT_03 } from '@/config/gradients.js'

const courses = (siteContent.courses || []).slice(0, 6)
const activeTab = '全部'
const tabs = ['全部', 'AIGC 入门', '影像实战', '数字人', '版权存证', '文创开发', '展厅运营']
</script>

<template>
  <section class="flex flex-col items-center py-[168px] bg-white relative overflow-hidden">
    <!-- 背景装饰 -->
    <div class="absolute left-[-226px] top-[-196px] size-[1325px] pointer-events-none max-sm:hidden">
      <img src="/assets/背景装饰.svg" alt="" class="block max-w-none size-full" />
    </div>

    <div class="flex flex-col gap-[24px] items-center max-w-[1336px] w-full px-[128px] max-lg:px-8 max-sm:px-4 relative z-10">
      <div class="w-full">
        <FigmaHeading title="课程中心" subtitle="Popular Courses" tone="blue" />
      </div>

      <!-- 分类 Tabs -->
      <div class="flex items-center justify-between w-full">
        <div class="flex gap-[16px] items-center flex-wrap">
          <button
            v-for="tab in tabs"
            :key="tab"
            class="shrink-0 px-[20px] py-[6px] rounded-full text-[12px] font-medium whitespace-nowrap transition-all cursor-pointer"
            :class="activeTab === tab ? 'text-white border-0' : 'border border-border-light text-ink/65 hover:border-ink'"
            :style="activeTab === tab
              ? { background: 'linear-gradient(-69deg, #b5edff 3%, #214fd6 53%, #5383eb 93%)' }
              : {}"
          >{{ tab }}</button>
        </div>
        <a href="/#/courses" class="shrink-0 inline-flex items-center justify-center h-10 px-4 rounded-[31px] text-[14px] font-semibold text-blue hover:underline">全部课程</a>
      </div>

      <!-- 课程卡片网格 — 与二级页对齐 -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-[28px] gap-y-[28px] w-full">
        <article v-for="(c, i) in courses" :key="i"
          class="border border-border-light rounded-[8px] overflow-hidden bg-white hover:shadow-lg transition-shadow flex flex-col max-w-[480px] min-w-0 justify-self-stretch w-full">
          <!-- 图片 — 标题叠加 -->
          <div class="relative h-[248px] overflow-hidden shrink-0">
            <img :src="c.img" :alt="c.title" class="absolute inset-0 size-full object-cover hover:scale-105 transition-transform duration-300" />
            <p class="absolute left-1/2 -translate-x-1/2 top-[114px] font-bold text-[32px] leading-[40px] whitespace-nowrap"
              :style="{ background: GRADIENT_03, '-webkit-background-clip': 'text', '-webkit-text-fill-color': 'transparent' }">{{ c.title }}</p>
          </div>
          <!-- 内容 -->
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
    </div>
  </section>
</template>

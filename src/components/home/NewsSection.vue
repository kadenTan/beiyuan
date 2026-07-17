<script setup>
import { useRouter } from 'vue-router'
import siteContent from '@/data/site-content.js'

const router = useRouter()
// 使用 siteContent.news 作为统一数据源，与列表页/详情页保持一致
const newsList = siteContent.news || []
const lead = newsList[0] || []
const items = newsList.slice(1, 6)

function goTo(idx) {
  router.push({ name: 'news-detail', params: { id: idx } })
}
function goToList() {
  router.push({ name: 'news' })
}
</script>

<template>
  <section class="relative flex max-lg:flex-col gap-[16px] max-lg:gap-0 items-stretch overflow-hidden"
    style="background: linear-gradient(to bottom, #182aa5, #09103f)">
    <!-- 装饰图层：在内容之下 -->
    <div class="absolute right-0 top-1/2 -translate-y-1/2 w-[495px] h-[465px] mix-blend-luminosity opacity-30 pointer-events-none z-0">
      <img src="/assets/figma/img31.png" alt="" class="absolute inset-0 object-cover size-full mix-blend-luminosity" />
    </div>

    <!-- 左侧：标题面板（暗红底） -->
    <div class="relative flex flex-col gap-[20px] items-center justify-center self-stretch shrink-0 lg:w-[480px] xl:w-[600px] 2xl:w-[720px] max-lg:w-full max-lg:py-[80px] max-lg:min-h-[280px] overflow-hidden z-10"
      style="background: #7c1f12">
      <!-- 装饰底图 -->
      <div class="absolute inset-0 overflow-hidden pointer-events-none">
        <img src="/assets/figma/imgImage4.png" alt="" class="absolute right-0 top-[-320px] size-[964px] object-cover blur-[1px] opacity-40" />
      </div>

      <!-- 标题 -->
      <div class="relative z-10 flex flex-col gap-[8px] items-center pb-[12px]">
        <div class="flex gap-[24px] items-center">
          <img src="/assets/标题装饰（左边）.svg" alt="" class="h-[40px] max-lg:h-[28px] w-[172px] max-lg:w-[100px]" />
          <p class="font-semibold text-[clamp(24px,4vw,48px)] leading-[1.2] text-center whitespace-nowrap"
            style="background: linear-gradient(to bottom, #faedc5, #dbbd78); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">
            资讯中心
          </p>
          <img src="/assets/标题装饰（右边）.svg" alt="" class="h-[40px] max-lg:h-[28px] w-[172px] max-lg:w-[100px]" />
        </div>
        <p class="font-light text-[clamp(14px,1.5vw,18px)] text-white uppercase">NEWS</p>
      </div>
    </div>

    <!-- 右侧：新闻卡片 -->
    <div class="flex flex-1 flex-col items-start min-w-0 px-[56px] py-[108px] max-lg:px-6 max-lg:py-[40px] self-stretch z-10">
      <div class="flex gap-[24px] items-stretch w-full max-lg:flex-col">
        <!-- 头条卡片 -->
        <div class="flex-1 self-stretch min-w-0">
          <article class="bg-white border border-[#b5edff] rounded-[8px] overflow-hidden h-full flex flex-col cursor-pointer hover:shadow-md transition-shadow" @click="goTo(0)">
            <!-- 图片区：纯图，无文字叠加 -->
            <div class="h-[186px] relative shrink-0 overflow-hidden">
              <img :src="lead[3] || '/assets/figma/imgImageAigc.png'" :alt="lead[1]" class="absolute inset-0 size-full object-cover" />
            </div>
            <!-- 内容 -->
            <div class="px-[20px] py-[16px] flex-1">
              <p class="text-[12px] text-accent leading-[20px]">{{ lead[4] || '2024.06.09' }}</p>
              <p class="font-semibold text-[16px] text-ink mt-[4px] leading-[33.6px]">{{ lead[1] }}</p>
              <p class="text-[16px] text-muted mt-[4px] leading-[25.6px]">{{ lead[2] }}</p>
            </div>
            <!-- 指示器 -->
            <div class="flex gap-[2px] items-center justify-center pb-[16px]">
              <span class="size-[16px] rounded-full bg-accent" />
              <span class="size-[16px] rounded-full bg-[#ddd]" />
              <span class="size-[16px] rounded-full bg-[#ddd]" />
              <span class="size-[16px] rounded-full bg-[#ddd]" />
            </div>
          </article>
        </div>

        <!-- 资讯列表 -->
        <div class="flex-1 self-stretch min-w-0">
          <div class="bg-white rounded-[8px] p-[22px] h-full flex flex-col gap-[8px]">
            <p class="font-medium text-[20px] text-navy leading-[25.6px]">资讯中心</p>
            <div v-for="(item, idx) in items" :key="idx" class="flex items-start pt-[4px] cursor-pointer hover:bg-gray-50 rounded-[4px] transition-colors" @click="goTo(idx + 1)">
              <p class="font-['Otomanopee_One',monospace] text-[16px] text-navy leading-[25.6px] w-[28px] shrink-0 whitespace-nowrap">0{{ idx + 1 }}</p>
              <div class="flex-1 min-w-0 px-[16px]">
                <p class="text-[14px] text-ink leading-normal">{{ item[1] }}</p>
                <p class="text-[12px] mt-[2px]" style="color: rgba(26,20,16,0.65)">{{ item[4] }}</p>
              </div>
            </div>
            <button class="mt-auto min-h-[40px] rounded-[31px] flex items-center justify-center text-[12px] text-muted hover:text-ink transition-colors cursor-pointer" @click="goToList">全部新闻</button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

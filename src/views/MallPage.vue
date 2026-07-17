<script setup>
import { ref, computed } from 'vue'
import FilterTabs from '@/components/shared/FilterTabs.vue'
import siteContent from '@/data/site-content.js'

const products = siteContent.products || []
const categories = ['全部', ...new Set(products.map(p => p[0]))]
const activeCat = ref('全部')
const filtered = computed(() => activeCat.value === '全部' ? products : products.filter(p => p[0] === activeCat.value))
</script>

<template>
  <div>
    <!-- Page Hero -->
    <section class="relative h-[480px] max-sm:h-[340px] w-full overflow-hidden bg-navy">
      <div class="absolute inset-0 blur-[2px]"><img src="/assets/figma/imgBanner.png" alt="" class="absolute inset-0 size-full object-cover" /></div>
      <div class="absolute inset-0" style="background: linear-gradient(180.36deg, rgba(24,42,165,0.12) 1.27%, rgba(28,73,202,0.28) 31.38%, rgba(18,42,126,0.518) 59.56%, rgb(9,16,63) 92.81%)" />
      <div class="absolute left-1/2 -translate-x-1/2 top-[182px] max-sm:top-[140px] flex flex-col gap-[16px] items-center px-6 w-full">
        <p class="font-semibold text-[56px] max-sm:text-[36px] leading-[53px] text-center whitespace-nowrap drop-shadow-[0_2px_12px_rgba(0,0,0,0.4)]"
          style="background: linear-gradient(to bottom, #faedc5, #dbbd78); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">文创商城</p>
        <p class="font-light text-[16px] max-sm:text-[14px] text-gold-light uppercase tracking-[2.88px]">MALL</p>
        <p class="text-[16px] max-sm:text-[14px] leading-[27px] text-white/80 text-center max-w-[448px]">把优秀民族影像作品延展为可展示、可咨询、可交易的文创商品。</p>
      </div>
    </section>

    <!-- 内容区 -->
    <section class="bg-white px-[128px] max-lg:px-8 max-sm:px-4 py-[48px] max-sm:py-[40px]">
      <div class="flex flex-col gap-[28px] max-w-[1366px] mx-auto">
        <FilterTabs v-model="activeCat" :items="categories" />

        <!-- 商品网格：4 列 → 3 → 2 -->
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-[28px] gap-y-[28px]">
          <article v-for="(p, i) in filtered" :key="i" class="border border-[#ddd] rounded-[8px] overflow-hidden bg-white hover:shadow-lg transition-shadow">
            <!-- 图片 -->
            <div class="h-[248px] relative overflow-hidden">
              <img :src="p[4]" :alt="p[1]" class="absolute inset-0 size-full object-cover hover:scale-105 transition-transform duration-300" />
            </div>
            <!-- 内容 -->
            <div class="flex flex-col gap-[8px] p-[16px]" style="background: linear-gradient(-5.3deg, rgba(181,237,255,0) 46.7%, rgba(83,131,235,0.23) 87.97%)">
              <!-- 分类标签 -->
              <span class="inline-block w-fit px-[9px] py-[4px] rounded-full text-[12px] text-blue" style="background: #f2f9ff">{{ p[0] }}</span>
              <!-- 标题 -->
              <div class="flex flex-col gap-[4px]">
                <h3 class="font-semibold text-[20px] leading-[28px] text-ink">{{ p[1] }}</h3>
                <p class="text-[16px] leading-[25.6px]" style="color: rgba(26,20,16,0.65)">{{ p[2] }}</p>
                <!-- 价格 -->
                <p class="font-semibold text-[32px] max-sm:text-[24px] leading-[32px] text-accent pt-[16px]">{{ p[3] }}</p>
              </div>
              <!-- 按钮 -->
              <div class="flex gap-[12px]">
                <button class="flex-1 h-[40px] min-h-[40px] rounded-[31px] border border-[#ddd] text-[14px] font-semibold text-ink hover:bg-bg transition-colors">加入购物车</button>
                <button class="flex-1 h-[40px] min-h-[40px] rounded-[31px] text-[14px] font-semibold text-white hover:opacity-90 transition-opacity" style="background: linear-gradient(-58.98deg, #b5edff 3.13%, #214fd6 53.01%, #5383eb 92.57%)">在线购买</button>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  </div>
</template>

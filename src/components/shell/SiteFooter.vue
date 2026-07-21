<script setup>
import { useSiteStore } from '@/stores/site'
import { useRoute } from 'vue-router'
import { computed } from 'vue'

const site = useSiteStore()
const route = useRoute()
const showOnPage = computed(() => route.path !== '/auth')
</script>

<template>
  <footer v-if="showOnPage" class="flex flex-col gap-[32px] items-center pb-[24px] pt-[58px] w-full" style="background: #111425">
    <!-- 顶部装饰 -->
    <div class="flex gap-[20px] items-center">
      <img src="/assets/标题装饰（左边）.svg" alt="" class="h-[40px] max-sm:h-[24px] w-[172px] max-sm:w-[100px]" />
      <img src="/assets/标题装饰（右边）.svg" alt="" class="h-[40px] max-sm:h-[24px] w-[172px] max-sm:w-[100px]" />
    </div>

    <!-- 内容区 -->
    <div class="flex flex-col md:flex-row md:flex-wrap md:justify-between gap-8 max-w-[1366px] w-full pb-[38px] pt-[30px] px-6">
      <!-- Logo + 板块导航 -->
      <div class="flex flex-col md:flex-row gap-8 items-center md:items-start">
        <!-- Logo -->
        <div class="flex flex-col gap-[12px] items-center shrink-0">
          <div class="size-[88px] bg-[#111425]">
            <img src="/assets/logo（m）.png" :alt="site.siteInfo.name" class="size-full object-contain" />
          </div>
        </div>

        <!-- 板块导航 -->
        <div class="flex flex-col gap-[8px] items-center md:items-start">
          <p class="font-medium text-[14px] text-white/85">板块导航</p>
          <div class="flex gap-[32px] text-[14px] text-white/85 font-light leading-[24px]">
            <div class="flex flex-col gap-[12px] whitespace-nowrap">
              <a href="/#/exhibition" class="text-white/85 hover:text-white no-underline">数字展厅</a>
              <a href="/#/events" class="text-white/85 hover:text-white no-underline">赛事中心</a>
              <a href="/#/courses" class="text-white/85 hover:text-white no-underline">课程中心</a>
            </div>
            <div class="flex flex-col gap-[12px] whitespace-nowrap">
              <a href="/#/mall" class="text-white/85 hover:text-white no-underline">文创商城</a>
              <a href="/#/evidence" class="text-white/85 hover:text-white no-underline">数字版权中心</a>
              <a href="/#/news" class="text-white/85 hover:text-white no-underline">资讯中心</a>
            </div>
            <div>
              <a href="/#/about" class="text-white/85 hover:text-white no-underline">关于我们</a>
            </div>
          </div>
        </div>
      </div>

      <!-- 联系方式 -->
      <div class="flex flex-col gap-[12px] text-[14px] text-white/85 items-center md:items-start">
        <p class="font-semibold">联系方式</p>
        <div class="flex flex-col gap-[12px] font-light whitespace-nowrap text-center md:text-left">
          <p>联系电话：17810277492</p>
          <p>联系地址：北京市西城区长安兴融中心南楼810室</p>
          <p>联系邮箱：46482926@qq.com</p>
        </div>
      </div>

      <!-- 二维码 -->
      <div class="flex flex-col gap-[12px] items-center md:items-start">
        <p class="font-semibold text-[14px] text-white/85">客服二维码</p>
        <div class="rounded-[4px] overflow-hidden bg-white p-[4px] w-[128px]">
          <img src="/assets/cQR.png" alt="客服二维码" class="w-full aspect-square object-cover rounded-[4px]" />
        </div>
      </div>
    </div>

    <!-- ICP -->
    <p class="font-light text-[14px] text-white text-center px-6">
      京ICP备2026043626号-1
    </p>
  </footer>
</template>

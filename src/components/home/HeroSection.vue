<script setup>
import { useRouter } from 'vue-router'
import Ripple from '@/components/ui/Ripple.vue'
import ShimmerButton from '@/components/ui/shimmer-button/ShimmerButton.vue'

const router = useRouter()
const desc = '贝元民族影像产业科创平台面向民族艺术创作者、文化企业、高校与科研机构，提供 AIGC 创作、主题赛事、作品展陈、区块链存证与文创转化的一体化服务'
</script>

<template>
  <section class="relative w-full h-screen shrink-0" style="background: #b3321f">
    <!-- 背景 Banner（模糊） -->
    <div class="absolute blur-[2px] h-full left-0 top-0 w-full overflow-hidden">
      <img src="/assets/figma/imgBanner.png" alt="" class="absolute inset-0 max-w-none object-cover pointer-events-none size-full" />
    </div>
    <!-- 渐变蒙版 -->
    <div class="absolute inset-0 w-full overflow-hidden"
      style="background-image: linear-gradient(180.678deg, rgba(24,42,165,0.12) 1.27%, rgba(28,73,202,0.28) 31.38%, rgba(18,42,126,0.518) 59.56%, rgb(9,16,63) 92.81%)" />

    <!-- Inspira UI: Ripple 动效 — 标题下方 -->
    <div class="absolute inset-0 z-[5] flex items-center justify-center pointer-events-none">
      <Ripple
        :base-circle-size="240"
        :base-circle-opacity="0.15"
        :space-between-circle="80"
        :number-of-circles="5"
        :wave-speed="120"
        :circle-opacity-downgrade-ratio="0.04"
      />
    </div>

    <!-- 科技祥云 -->
    <div class="absolute left-[-120px] top-[18%] w-[420px] max-sm:w-[260px] z-[4] pointer-events-none">
      <img src="/assets/figma/imgTechCloud.png" alt="" class="w-full h-auto object-contain opacity-80" />
    </div>

    <!-- 标题内容 -->
    <div class="-translate-x-1/2 absolute flex flex-col gap-[16px] max-md:gap-[12px] items-center left-1/2 top-1/2 -translate-y-1/2 max-md:top-[50%] z-10 px-6 w-full">
      <!-- 标题 -->
      <div class="relative shrink-0 w-full" style="filter: drop-shadow(0px 9px 12px rgba(0,0,0,0.72));">
        <div class="flex flex-col items-center pt-[12px]">
          <div class="font-['Alimama_ShuHeiTi',serif] font-bold text-[clamp(48px,8vw,128px)] leading-[1.05] text-center w-full max-w-[960px] mx-auto"
            style="background: linear-gradient(to bottom, white, #dbbd78); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">
            <p class="mb-0 whitespace-nowrap">贝元民族影像</p>
            <p class="whitespace-nowrap">智创平台</p>
          </div>
        </div>
      </div>
      <!-- 描述 -->
      <div class="relative shrink-0 w-full">
        <div class="flex flex-col items-center pt-[16px] max-md:pt-[8px]">
          <p class="text-[clamp(14px,1.25vw,20px)] leading-[1.5] text-white text-center max-w-[720px] px-4" style="text-shadow: 0px 2px 2px rgba(0,0,0,0.32)">
            {{ desc }}
          </p>
        </div>
      </div>
      <!-- CTA 按钮 -->
      <div class="relative shrink-0 w-full">
        <div class="flex flex-col items-center justify-center pb-[24px] pt-[16px] max-md:pt-[8px]">
          <div class="flex gap-[16px] max-md:flex-col max-md:gap-[8px] items-center justify-center w-full">
            <ShimmerButton
              shimmer-color="rgba(255,255,255,0.7)"
              shimmer-size="0.1em"
              shimmer-duration="3s"
              border-radius="12px"
              background="linear-gradient(-58.42deg, rgb(33,79,214) 8.68%, rgb(83,131,235) 69.12%, rgb(181,237,255) 120.93%)"
              class="!h-[56px] !px-[24px] !py-0 !gap-[8px] !text-[16px] !border !border-[#b5edff] max-md:!w-full"
              @click="router.push('/events')"
            >
              <span class="flex items-center gap-[8px]">
                查看赛事中心
                <img src="/assets/figma/imgArrowRightUpLong.svg" alt="" class="size-[20px]" />
              </span>
            </ShimmerButton>
            <a href="/#/courses"
              class="flex items-center justify-center h-[56px] min-h-[40px] px-[25px] py-px rounded-[12px] border border-white text-[16px] text-white max-md:w-full"
              style="background: rgba(255,255,255,0.1)">
              进入课程学习
            </a>
            <a href="/#/evidence"
              class="flex items-center justify-center h-[56px] min-h-[40px] px-[25px] py-px rounded-[12px] border border-white text-[16px] text-white max-md:w-full"
              style="background: rgba(255,255,255,0.1)">
              进入数字版权中心
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

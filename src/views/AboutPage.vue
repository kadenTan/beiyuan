<script setup>
import siteContent from '@/data/site-content.js'
import { GRADIENT_03, GRADIENT_GOLD, GRADIENT_04 } from '@/config/gradients.js'

const s = siteContent.site

const serviceDirections = [
  { num: '01', title: '创作赋能', desc: '降低民族影像创作门槛，让更多创作者参与表达。' },
  { num: '02', title: '赛事孵化', desc: '通过主题赛事和院校活动发现优秀作品与团队。' },
  { num: '03', title: '确权转化', desc: '结合存证证书、展厅传播和文创商品形成后续价值。' },
]

const partners = [
  { name: '中国民族影视发展促进会', role: '平台支持单位', img: '/assets/logo 1.png' },
  { name: '人工智能影像产业委员会', role: '平台指导单位', img: null },
  { name: '文昌链', role: '技术支持单位', img: '/assets/wencang_logo.png' },
]
</script>

<template>
  <div>
    <!-- ===== Hero ===== -->
    <section class="relative h-[480px] max-sm:h-[340px] w-full overflow-hidden bg-navy">
      <div class="absolute inset-0 blur-[2px]">
        <img src="/assets/figma/imgBanner.png" alt="" class="absolute inset-0 size-full object-cover" />
      </div>
      <div
        class="absolute inset-0"
        style="background: linear-gradient(180.36deg, rgba(24,42,165,0.12) 1.27%, rgba(28,73,202,0.28) 31.38%, rgba(18,42,126,0.518) 59.56%, rgb(9,16,63) 92.81%)"
      />
      <div class="absolute left-1/2 -translate-x-1/2 top-[182px] max-sm:top-[140px] flex flex-col gap-[16px] items-center px-6 w-full">
        <p
          class="font-semibold text-[56px] max-sm:text-[36px] leading-[53px] text-center whitespace-nowrap drop-shadow-[0_2px_12px_rgba(0,0,0,0.4)]"
          :style="{ background: GRADIENT_GOLD, '-webkit-background-clip': 'text', '-webkit-text-fill-color': 'transparent' }"
        >关于我们</p>
        <p class="font-light text-[16px] max-sm:text-[14px] text-gold-light uppercase tracking-[2.88px]">About</p>
        <p class="text-[16px] max-sm:text-[14px] leading-[27px] text-white/80 text-center max-w-[448px]">用科技守护文脉，用创意讲述民族故事。</p>
      </div>
    </section>

    <!-- ===== 1. 平台介绍（渐变-04 深色背景） ===== -->
    <section
      class="w-full overflow-clip"
      :style="{ background: GRADIENT_04 }"
    >
      <div class="flex flex-col items-center gap-[32px] px-[128px] max-lg:px-8 max-sm:px-4 py-[80px] max-sm:py-[40px]">
        <!-- 装饰 + 标题 -->
        <div class="flex gap-[24px] items-center">
          <img src="/assets/标题装饰（左边）.svg" alt="" class="h-[40px] w-[172px] max-sm:w-[120px] shrink-0 -scale-x-100" />
          <p
            class="font-semibold text-[64px] max-sm:text-[32px] leading-[1.15] text-center whitespace-nowrap"
            :style="{ background: GRADIENT_GOLD, '-webkit-background-clip': 'text', '-webkit-text-fill-color': 'transparent' }"
          >贝元民族影像智创平台</p>
          <img src="/assets/标题装饰（右边）.svg" alt="" class="h-[40px] w-[172px] max-sm:w-[120px] shrink-0" />
        </div>

        <!-- Logo -->
        <img src="/assets/logo（m）.png" alt="" class="h-[128px] w-[125px] object-contain" />

        <!-- 描述 -->
        <p class="text-[16px] leading-[27px] text-white text-center max-w-[980px]">
          {{ s.intro }}
        </p>
      </div>
    </section>

    <!-- ===== 2. 平台愿景 ===== -->
    <section class="bg-bg-card w-full">
      <div class="flex flex-col items-center gap-[12px] px-[128px] max-lg:px-8 max-sm:px-4 py-[80px] max-sm:py-[40px]">
        <p
          class="font-semibold text-[40px] max-sm:text-[28px] leading-[40px] text-center whitespace-nowrap"
          :style="{ background: GRADIENT_03, '-webkit-background-clip': 'text', '-webkit-text-fill-color': 'transparent' }"
        >平台愿景</p>
        <p class="text-[16px] leading-[24px] text-ink text-center max-w-[800px]">{{ s.vision }}</p>
      </div>
    </section>

    <!-- ===== 3. 服务方向 ===== -->
    <section class="bg-white w-full">
      <div class="flex flex-col items-center gap-[32px] px-[128px] max-lg:px-8 max-sm:px-4 py-[80px] max-sm:py-[40px]">
        <!-- 标题 -->
        <div class="flex flex-col gap-[20px] items-center">
          <p
            class="font-semibold text-[40px] max-sm:text-[28px] leading-[40px] text-center whitespace-nowrap"
            :style="{ background: GRADIENT_03, '-webkit-background-clip': 'text', '-webkit-text-fill-color': 'transparent' }"
          >服务方向</p>
          <p class="text-[16px] leading-[24px] text-ink text-center whitespace-nowrap">AIGC 创作、赛事活动、作品展陈、版权存证、文创转化。</p>
        </div>

        <!-- 3 张卡片 -->
        <div class="flex gap-[48px] max-sm:flex-col max-sm:gap-[16px]">
          <div
            v-for="svc in serviceDirections"
            :key="svc.num"
            class="bg-bg-card rounded-[8px] p-[24px] flex flex-col gap-[12px] w-[174px] max-sm:w-full"
          >
            <div
              class="inline-flex items-center justify-center p-[8px] rounded-[6px] w-fit"
              :style="{ background: GRADIENT_03 }"
            >
              <span class="font-heading font-bold text-[32px] text-white leading-[32px] uppercase">{{ svc.num }}</span>
            </div>
            <p class="font-semibold text-[24px] text-ink leading-normal whitespace-nowrap">{{ svc.title }}</p>
            <p class="text-[14px] leading-normal" style="color: rgba(26,20,16,0.65)">{{ svc.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ===== 4. 合作及指导机构 ===== -->
    <section class="w-full" style="background: #f8f8f8">
      <div class="flex flex-col items-center gap-[32px] px-[128px] max-lg:px-8 max-sm:px-4 py-[80px] max-sm:py-[40px]">
        <!-- 标题 -->
        <div class="flex flex-col gap-[20px] items-center">
          <p
            class="font-semibold text-[40px] max-sm:text-[28px] leading-[40px] text-center whitespace-nowrap"
            :style="{ background: GRADIENT_03, '-webkit-background-clip': 'text', '-webkit-text-fill-color': 'transparent' }"
          >合作及指导机构</p>
          <p class="text-[16px] leading-[24px] text-ink text-center whitespace-nowrap">AIGC 创作、赛事活动、作品展陈、版权存证、文创转化。</p>
        </div>

        <!-- 3 张机构卡片 -->
        <div class="flex gap-[32px] max-sm:flex-col max-sm:gap-[16px]">
          <div
            v-for="(p, i) in partners"
            :key="i"
            class="bg-white border border-border-light rounded-[8px] p-[25px] flex flex-col gap-[12px] items-center w-[226px] max-sm:w-full"
          >
            <p class="font-semibold text-[16px] text-ink leading-normal text-center whitespace-nowrap">{{ p.name }}</p>
            <p class="text-[13px] text-muted leading-[20.8px] whitespace-nowrap">{{ p.role }}</p>
            <div v-if="p.img" class="h-[128px] shrink-0 flex items-center justify-center">
              <img :src="p.img" alt="" class="max-h-full max-w-full object-contain" />
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

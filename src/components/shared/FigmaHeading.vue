<script setup>
import TextReveal from '@/components/ui/text-reveal/TextReveal.vue'

/**
 * Figma 标题装饰组件
 *
 * 渐变来源：
 *   渐变-gold → linear-gradient(to bottom, #faedc5, #dbbd78) — 赛事/深色区块
 *   渐变-03  → linear-gradient(-39.209deg, #b5edff 50.13%, #214fd6 40.65%, #5383eb 112.65%) — 课程/白底区块
 *
 * tone:
 *   'gold'  → 事件区域/深色背景，左装饰翻转，标题金渐变，副标题浅金
 *   'blue'  → 课程/作品/白底页面，标题蓝渐变（渐变-03），副标题 muted
 *   'white' → 新闻/Footer，纯白文字
 */
defineProps({
  title: { type: String, required: true },
  subtitle: { type: String, default: '' },
  tone: { type: String, default: 'blue' },
})
</script>

<template>
  <div class="flex flex-col gap-[8px] items-center pb-[12px]">
    <!-- 装饰 + 标题行 -->
    <div class="flex gap-[24px] items-center">
      <!-- 左装饰 -->
      <div class="flex items-center justify-center shrink-0">
        <img src="/assets/标题装饰（左边）.svg" alt="" class="h-[40px] max-sm:h-[24px] w-[172px] max-sm:w-[80px]" />
      </div>

      <!-- 标题文字：gold tone -->
      <p
        v-if="tone === 'gold'"
        class="font-semibold text-[clamp(28px,5vw,52px)] leading-[1.15] text-center max-sm:whitespace-normal"
        style="background: linear-gradient(to bottom, #faedc5, #dbbd78); -webkit-background-clip: text; -webkit-text-fill-color: transparent;"
      >{{ title }}</p>
      <p
        v-else-if="tone === 'blue'"
        class="font-semibold text-[clamp(28px,5vw,52px)] leading-[1.15] text-center max-sm:whitespace-normal"
        style="background: linear-gradient(-39deg, #b5edff 0%, #214fd6 50%, #5383eb 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent;"
      >{{ title }}</p>
      <p
        v-else
        class="font-semibold text-[clamp(32px,5vw,52px)] leading-[1.15] text-center text-white"
      >{{ title }}</p>

      <!-- 右装饰 -->
      <img src="/assets/标题装饰（右边）.svg" alt="" class="h-[40px] max-sm:h-[24px] w-[172px] max-sm:w-[80px] shrink-0" />
    </div>

    <!-- 副标题：文字揭示 -->
    <TextReveal v-if="subtitle" :stagger="0.04" :duration="0.3" :scroll-trigger="true">
      <p
        class="font-light text-[clamp(14px,1.5vw,18px)] text-center uppercase whitespace-nowrap"
        :class="tone === 'gold' ? 'text-gold-light' : tone === 'white' ? 'text-white/80' : 'text-muted'"
      >{{ subtitle }}</p>
    </TextReveal>
  </div>
</template>

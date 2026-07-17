<script setup>
defineProps({
  title: { type: String, required: true },
  subtitle: { type: String, default: '' },
  eng: { type: String, default: '' },
})
</script>

<template>
  <section class="relative h-[480px] max-sm:h-[340px] overflow-hidden" style="background: #b3321f">
    <!-- 背景图 -->
    <div class="absolute inset-0 z-0">
      <div class="absolute inset-0 bg-cover bg-center blur-[2px]" style="background-image: url('/assets/figma/imgBanner.png')" />
      <div class="absolute inset-0"
        style="background: linear-gradient(180.36deg, rgba(24,42,165,0.12) 1.27%, rgba(28,73,202,0.28) 31.38%, rgba(18,42,126,0.518) 59.56%, rgb(9,16,63) 92.81%)" />
    </div>

    <!-- 内容 -->
    <div class="relative z-10 flex flex-col items-center justify-center h-full px-6 text-center">
      <h1 class="font-semibold text-[clamp(32px,5vw,52px)] leading-[1.2]"
        style="background: linear-gradient(to bottom, white, #dbbd78); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">{{ title }}</h1>
      <p v-if="eng" class="font-light text-[clamp(14px,1.5vw,18px)] text-gold-light uppercase mt-[8px]">{{ eng }}</p>
      <p v-if="subtitle" class="text-[clamp(14px,1.25vw,18px)] text-white/80 mt-[12px] max-w-[600px]">{{ subtitle }}</p>
    </div>
  </section>
</template>

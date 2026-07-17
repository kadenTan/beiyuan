<script setup>
import { ref } from 'vue'
import FigmaHeading from '@/components/shared/FigmaHeading.vue'
import WorkDetailModal from '@/components/shared/WorkDetailModal.vue'
import LikeButton from '@/components/shared/LikeButton.vue'
import siteContent from '@/data/site-content.js'

const works = (siteContent.works || []).slice(0, 10)
const imgs = siteContent.home?.workImages || []
const modalWork = ref(null)
const likedMap = ref({})

function toggleLike(i) {
  likedMap.value[i] = !likedMap.value[i]
}

function openModal(w) {
  modalWork.value = w
}
function closeModal() {
  modalWork.value = null
}
</script>

<template>
  <section class="flex flex-col items-center py-[168px] w-full"
    style="background: linear-gradient(to bottom, #182aa5, #09103f)">
    <div class="flex flex-col gap-[12px] items-center px-[128px] max-md:px-6 w-full relative z-10">
      <FigmaHeading title="数字展厅" subtitle="Selected Works" tone="gold" />
      <div class="pt-[26px] w-full">
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-[4px] w-full">
          <div
            v-for="(w, i) in works"
            :key="i"
            class="relative bg-paper border border-line rounded-[8px] overflow-hidden cursor-pointer group h-[346px] max-sm:h-[200px]"
            @click="openModal(w)"
          >
            <!-- 图片 -->
            <img
              :src="w[3] || imgs[i % imgs.length]"
              :alt="w[0]"
              class="size-full object-cover transition-transform duration-500 group-hover:scale-105"
            />

            <!-- Hover 渐变蒙版 + 信息 -->
            <div class="absolute inset-x-0 bottom-0 h-[50%] pointer-events-none"
              style="background: linear-gradient(to top, rgba(0,0,0,0.75), transparent)" />
            <div class="absolute inset-x-0 bottom-0 p-4 flex flex-col gap-2 opacity-0 max-sm:opacity-100 group-hover:opacity-100 transition-opacity duration-300">
              <p class="font-semibold text-[15px] text-white leading-[1.3] line-clamp-2">{{ w[0] }}</p>
              <div class="flex items-center justify-between">
                <span class="text-[12px] text-white/60">贝元创作者</span>
                <LikeButton :model-value="!!likedMap[i]" :count="w[6] || 0" @update:model-value="toggleLike(i)" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="flex items-center justify-center pt-[24px] w-full">
        <a href="/#/exhibition" class="inline-flex items-center justify-center min-h-[40px] px-[16.6px] py-[0.6px] rounded-[31px] border-[0.6px] border-[#b5edff] text-[16px] text-white hover:bg-white/10 transition-colors">查看更多</a>
      </div>
    </div>

    <!-- 全屏弹窗 -->
    <WorkDetailModal v-if="modalWork" :work="modalWork" @close="closeModal" />
  </section>
</template>

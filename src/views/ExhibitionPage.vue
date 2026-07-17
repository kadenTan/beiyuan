<script setup>
import { ref, computed } from 'vue'
import FilterTabs from '@/components/shared/FilterTabs.vue'
import WorkDetailModal from '@/components/shared/WorkDetailModal.vue'
import LikeButton from '@/components/shared/LikeButton.vue'
import siteContent from '@/data/site-content.js'

const works = siteContent.works || []
const categories = ['全部', ...new Set(works.map(w => w[1]))]
const activeCat = ref('全部')
const searchQuery = ref('')
const modalWork = ref(null)
const likedMap = ref({})

function openModal(w) { modalWork.value = w }
function closeModal() { modalWork.value = null }
function toggleLike(i) { likedMap.value[i] = !likedMap.value[i] }

const filtered = computed(() => {
  let result = activeCat.value === '全部' ? works : works.filter(w => w[1] === activeCat.value)
  if (searchQuery.value.trim()) {
    const q = searchQuery.value.trim().toLowerCase()
    result = result.filter(w => w[0].toLowerCase().includes(q) || (w[2] && w[2].toLowerCase().includes(q)))
  }
  return result
})

// 瀑布流：响应式列数
const colCount = ref(5)

if (typeof window !== 'undefined') {
  const mq = window.matchMedia('(max-width: 639px)')
  colCount.value = mq.matches ? 2 : 5
  mq.addEventListener('change', e => { colCount.value = e.matches ? 2 : 5 })
}

const cols = computed(() => {
  const n = colCount.value
  const c = Array.from({ length: n }, () => [])
  filtered.value.forEach((w, i) => c[i % n].push(w))
  return c
})

function cardHeight(w) {
  // 根据原图宽高比计算：更高/更方的图 = 更高卡片
  if (!w[4] || !w[5]) return '320px'
  const ratio = w[5] / w[4] // h/w
  const h = Math.max(240, Math.min(ratio * 600 + 180, 600))
  return Math.round(h) + 'px'
}
</script>

<template>
  <div>
    <!-- Hero -->
    <section class="relative h-[480px] max-sm:h-[340px] w-full overflow-hidden bg-navy">
      <div class="absolute inset-0 blur-[2px]"><img src="/assets/figma/imgBanner.png" alt="" class="absolute inset-0 size-full object-cover" /></div>
      <div class="absolute inset-0" style="background: linear-gradient(180.36deg, rgba(24,42,165,0.12) 1.27%, rgba(28,73,202,0.28) 31.38%, rgba(18,42,126,0.518) 59.56%, rgb(9,16,63) 92.81%)" />
      <div class="absolute left-1/2 -translate-x-1/2 top-[182px] max-sm:top-[140px] flex flex-col gap-[16px] items-center px-6 w-full">
        <p class="font-semibold text-[56px] max-sm:text-[36px] leading-[53px] text-center whitespace-nowrap drop-shadow-[0_2px_12px_rgba(0,0,0,0.4)]"
          style="background: linear-gradient(to bottom, #faedc5, #dbbd78); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">数字展厅</p>
        <p class="font-light text-[16px] max-sm:text-[14px] text-gold-light uppercase tracking-[2.88px]">Digital Gallery</p>
        <p class="text-[16px] max-sm:text-[14px] leading-[27px] text-white/80 text-center max-w-[448px]">展示用户上传的 AIGC 作品，让创作成果被浏览、点赞、评论和持续传播。</p>
      </div>
    </section>

    <!-- 内容 -->
    <section class="bg-white px-[128px] max-lg:px-8 max-sm:px-4 py-[80px] max-sm:py-[60px]">
      <div class="flex flex-col gap-[28px] max-w-[1664px] mx-auto">
        <div class="flex flex-col gap-[12px]">
          <FilterTabs v-model="activeCat" :items="categories" />
          <div class="flex gap-[10px] max-w-[520px]">
            <input v-model="searchQuery" placeholder="搜索作品名、标签"
              class="flex-1 min-w-0 border border-[#ddd] rounded-[8px] px-[13px] py-[9px] text-[16px] outline-none placeholder:text-muted/35" />
            <button class="bg-blue rounded-[8px] px-[16px] py-[8px] text-[16px] font-semibold text-white shrink-0">搜索</button>
          </div>
        </div>

        <!-- 瀑布流：5列，每张卡高度按原图比例不同 -->
        <div class="flex gap-[4px]">
          <div v-for="(col, ci) in cols" :key="ci" class="flex-1 flex flex-col gap-[4px]">
            <div v-for="(w, i) in col" :key="i"
              class="relative bg-paper border border-line rounded-[8px] overflow-hidden cursor-pointer group"
              :style="{ height: cardHeight(w) }"
              @click="openModal(w)">
              <img :src="w[3]" :alt="w[0]" class="absolute inset-0 size-full object-cover transition-transform duration-500 group-hover:scale-105" />

              <!-- Hover 渐变蒙版 + 信息 -->
              <div class="absolute inset-x-0 bottom-0 h-[50%] pointer-events-none"
                style="background: linear-gradient(to top, rgba(0,0,0,0.75), transparent)" />
              <div class="absolute inset-x-0 bottom-0 p-4 flex flex-col gap-2 opacity-0 max-sm:opacity-100 group-hover:opacity-100 transition-opacity duration-300">
                <p class="font-semibold text-[15px] text-white leading-[1.3] line-clamp-2">{{ w[0] }}</p>
                <div class="flex items-center justify-between">
                  <span class="text-[12px] text-white/60">贝元创作者</span>
                  <LikeButton :model-value="!!likedMap[works.indexOf(w)]" :count="w[6] || 0" @update:model-value="toggleLike(works.indexOf(w))" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <p v-if="!filtered.length" class="text-muted py-12 text-center">暂无作品</p>
      </div>
    </section>

    <WorkDetailModal v-if="modalWork" :work="modalWork" @close="closeModal" />
  </div>
</template>

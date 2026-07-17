<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import siteContent from '@/data/site-content.js'
import { GRADIENT_03, GRADIENT_GOLD } from '@/config/gradients.js'

const router = useRouter()
const news = siteContent.news || []

// 分类
const cats = ['全部', ...new Set(news.map(n => n[0]))]
const activeCat = ref('全部')

// 搜索
const searchQuery = ref('')

const filtered = computed(() => {
  let result = news
  if (activeCat.value !== '全部') result = result.filter(n => n[0] === activeCat.value)
  if (searchQuery.value.trim()) {
    const q = searchQuery.value.trim().toLowerCase()
    result = result.filter(n =>
      n[1].toLowerCase().includes(q) ||
      n[2].toLowerCase().includes(q)
    )
  }
  return result
})
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
        >资讯中心</p>
        <p class="font-light text-[16px] max-sm:text-[14px] text-gold-light uppercase tracking-[2.88px]">News</p>
        <p class="text-[16px] max-sm:text-[14px] leading-[27px] text-white/80 text-center max-w-[448px]">
          平台公告、赛事动态、课程更新与院校合作的第一手资讯。
        </p>
      </div>
    </section>

    <!-- ===== 内容区 ===== -->
    <section class="px-[128px] max-lg:px-8 max-sm:px-4 w-full overflow-clip">
      <div class="bg-white rounded-[8px] w-full">
        <div class="flex flex-col gap-[28px] px-[128px] max-lg:px-8 max-sm:px-4 py-[80px] max-sm:py-[40px]">

        <!-- 筛选 + 搜索 -->
        <div class="flex flex-col gap-[12px]">
          <!-- 分类 tabs -->
          <div class="flex gap-[16px] items-center flex-wrap">
            <span
              v-for="c in cats"
              :key="c"
              @click="activeCat = c"
              class="inline-flex items-start px-[21px] py-[7px] rounded-full text-[12px] font-semibold cursor-pointer transition-colors"
              :class="activeCat === c
                ? 'text-white'
                : 'border border-border-light text-ink/65 hover:border-ink'"
              :style="activeCat === c ? { background: GRADIENT_03 } : {}"
            >{{ c }}</span>
          </div>

          <!-- 搜索栏 -->
          <div class="flex gap-[10px] max-w-[520px]">
            <div class="flex-1 min-w-0 border border-border-light rounded-[8px] bg-white overflow-hidden">
              <input
                v-model="searchQuery"
                type="text"
                placeholder="搜索新闻标题、摘要、分类"
                class="w-full px-[13px] py-[9px] text-[16px] outline-none text-ink placeholder:text-ink/35"
              />
            </div>
            <button
              class="bg-blue rounded-[8px] px-[16px] py-[8px] text-[16px] font-semibold text-white text-center whitespace-nowrap hover:bg-blue-mid transition-colors"
            >
              搜索
            </button>
          </div>
        </div>

        <!-- 新闻列表：横向卡片 -->
        <div class="flex flex-col gap-[28px]">
          <article
            v-for="(n, i) in filtered"
            :key="i"
            class="bg-bg-card rounded-[12px] overflow-clip cursor-pointer hover:shadow-md transition-shadow"
            @click="router.push({ name: 'news-detail', params: { id: news.indexOf(n) } })"
          >
            <div class="flex gap-[32px] items-start px-[24px] py-[28px] max-sm:flex-col">
              <!-- 图片 -->
              <div class="h-[168px] rounded-[4px] shrink-0 w-[240px] max-sm:w-full overflow-hidden">
                <img
                  :src="n[3]"
                  :alt="n[1]"
                  class="size-full object-cover rounded-[4px] hover:scale-105 transition-transform duration-300"
                />
              </div>

              <!-- 内容 -->
              <div class="flex flex-col gap-[12px] flex-1 min-w-0 self-stretch">
                <!-- 分类标签 + 日期 -->
                <div class="flex gap-[10px] items-center">
                  <span class="inline-flex items-center bg-blue rounded-[4px] px-[9px] h-[24px] text-[12px] font-semibold text-white whitespace-nowrap">
                    {{ n[0] }}
                  </span>
                  <span class="text-[13px] leading-[20.8px] whitespace-nowrap" style="color: rgba(26,20,16,0.65)">
                    {{ n[4] }}
                  </span>
                </div>

                <!-- 标题 + 摘要 -->
                <div class="flex flex-col gap-[4px]">
                  <h3 class="text-[24px] font-semibold text-ink leading-[31.2px]">{{ n[1] }}</h3>
                  <p class="text-[16px] leading-[24px]" style="color: rgba(26,20,16,0.65)">{{ n[2] }}</p>
                </div>

                <!-- 查看详情 -->
                <p class="text-[14px] font-semibold text-blue leading-[24px] mt-auto">查看详情</p>
              </div>
            </div>
          </article>
        </div>

        <!-- 无结果 -->
        <div v-if="filtered.length === 0" class="py-[60px] text-center">
          <p class="text-[16px]" style="color: rgba(26,20,16,0.45)">暂无匹配的资讯</p>
        </div>
      </div>
      </div>
    </section>
  </div>
</template>

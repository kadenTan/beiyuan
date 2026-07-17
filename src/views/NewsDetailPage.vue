<script setup>
import { ref, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { fetchNewsDetail } from '@/api/news.js'

const route = useRoute()
const router = useRouter()

const detailData = ref(null)
const allNews = ref([])
const currentIdx = ref(0)
const loading = ref(true)

async function load() {
  const idx = parseInt(route.params.id) || 0
  loading.value = true
  const result = await fetchNewsDetail(idx)
  detailData.value = result.detail
  allNews.value = result.allNews
  currentIdx.value = result.idx
  loading.value = false
}

watch(() => route.params.id, load, { immediate: true })

// 如果 newsDetail 不存在对应条目，从 news 数组 fallback
const d = computed(() => {
  if (detailData.value) return detailData.value
  const n = allNews.value[currentIdx.value]
  return n ? {
    title: n[1],
    subtitle: n[2],
    category: n[0],
    date: n[4],
    source: '贝元民族影像智创平台',
    author: '平台运营中心',
    readCount: '',
    coverImage: n[3],
    sections: [{ type: 'p', text: n[2] }],
  } : { title: '', subtitle: '', sections: [] }
})

// 分离导语与正文段落
const introText = computed(() => {
  const firstP = d.value.sections?.find(s => s.type === 'p')
  return firstP?.text || d.value.subtitle
})

const bodySections = computed(() => {
  if (!d.value.sections) return []
  let foundIntro = false
  return d.value.sections.filter(s => {
    if (!foundIntro && s.type === 'p') { foundIntro = true; return false }
    return true
  })
})
const prevArticle = computed(() => currentIdx.value > 0 ? allNews.value[currentIdx.value - 1] : null)
const nextArticle = computed(() => currentIdx.value < allNews.value.length - 1 ? allNews.value[currentIdx.value + 1] : null)

// 相关新闻：取同分类的其他新闻，最多 2 条
const relatedNews = computed(() => {
  const cat = d.value.category
  return allNews.value.filter((n, i) => i !== currentIdx.value && n[0] === cat).slice(0, 2)
})

function goTo(id) {
  router.push({ name: 'news-detail', params: { id } })
}
</script>

<template>
  <div>
    <!-- ===== 面包屑 + 正文 ===== -->
    <section class="px-[128px] max-lg:px-8 max-sm:px-4 w-full overflow-clip">
      <div class="bg-white rounded-[8px] w-full">
        <div class="flex flex-col gap-[28px] px-[128px] max-lg:px-8 max-sm:px-4 py-[80px] max-sm:py-[40px]">

          <!-- 面包屑 -->
          <div class="flex gap-[4px] items-center text-[14px] leading-[18px] whitespace-nowrap">
            <span class="cursor-pointer hover:text-ink transition-colors" style="color: rgba(26,20,16,0.65)" @click="router.push({ name: 'home' })">首页</span>
            <span style="color: rgba(26,20,16,0.65)">/</span>
            <span class="cursor-pointer hover:text-ink transition-colors" style="color: rgba(26,20,16,0.65)" @click="router.push({ name: 'news' })">资讯中心</span>
            <span style="color: rgba(26,20,16,0.65)">/</span>
            <span class="text-ink">资讯详情</span>
          </div>

          <!-- ===== 文章头部 ===== -->
          <div class="flex flex-col gap-[28px]">
            <!-- 标题 + 副标题 -->
            <div class="flex flex-col gap-[12px]">
            <h1 class="font-semibold text-[58px] max-sm:text-[36px] text-ink leading-[65px] max-sm:leading-[44px]">
              {{ d.title }}
            </h1>
              <p class="text-[16px] leading-[26px] tracking-[2px]" style="color: #4d4d4d">
                {{ d.subtitle }}
              </p>
            </div>

            <!-- 元信息标签 -->
            <div class="flex gap-[8px] items-center flex-wrap">
              <span class="inline-flex items-start px-[9px] py-[4px] bg-bg-card rounded-[6px] text-[14px] leading-normal whitespace-nowrap" style="color: rgba(26,20,16,0.65)">
                发布时间：{{ d.date }}
              </span>
              <span class="inline-flex items-start px-[9px] py-[4px] bg-bg-card rounded-[6px] text-[13px] text-muted leading-[20.8px] whitespace-nowrap" v-if="d.source">
                来源：{{ d.source }}
              </span>
              <span class="inline-flex items-start px-[9px] py-[4px] bg-bg-card rounded-[6px] text-[13px] text-muted leading-[20.8px] whitespace-nowrap" v-if="d.author">
                作者：{{ d.author }}
              </span>
              <span class="inline-flex items-start px-[9px] py-[4px] bg-bg-card rounded-[6px] text-[13px] text-muted leading-[20.8px] whitespace-nowrap" v-if="d.readCount">
                阅读量：{{ d.readCount }}
              </span>
            </div>

            <!-- 导语（后台 sections 第一条 p，20px Semibold） -->
            <p v-if="introText" class="font-semibold text-[20px] text-ink leading-[36px]">{{ introText }}</p>

            <!-- ===== 正文章节（后台可配置，跳过导语后的 p + h2） ===== -->
            <template v-for="(s, i) in bodySections" :key="i">
              <h2
                v-if="s.type === 'h2'"
                class="font-semibold text-[26px] text-ink leading-[35px] mt-[12px]"
              >{{ s.text }}</h2>
              <p
                v-else
                class="text-[16px] leading-[31.2px] text-muted"
              >{{ s.text }}</p>
            </template>
          </div>

          <!-- ===== 附件资料 ===== -->
          <div v-if="d.attachment" class="flex flex-col items-center pt-[30px]">
            <div class="bg-bg-card rounded-[8px] h-[76px] flex gap-[12px] items-center p-[24px] w-full">
              <span class="font-semibold text-[16px] leading-[24px] whitespace-nowrap" style="color: rgba(26,20,16,0.65)">
                {{ d.attachment.label }}
              </span>
              <button class="bg-white border border-blue rounded-[8px] h-[42px] min-h-[42px] px-[17px] py-px text-[16px] font-semibold text-ink whitespace-nowrap hover:bg-blue hover:text-white transition-colors">
                {{ d.attachment.btnText }}
              </button>
            </div>
          </div>

          <!-- ===== 上一篇 / 下一篇 ===== -->
          <div class="flex gap-[24px] max-sm:flex-col">
            <div class="flex-1 min-w-0 bg-white border border-border-light rounded-[8px] p-[25px]">
              <p v-if="!prevArticle" class="text-[14px] leading-normal" style="color: rgba(26,20,16,0.35)">已经是第一篇</p>
              <p v-else class="text-[14px] leading-normal cursor-pointer hover:text-blue transition-colors" @click="goTo(idx - 1)">
                <span class="text-ink">上一篇：</span>
                <span class="font-semibold text-ink">{{ prevArticle[1] }}</span>
              </p>
            </div>
            <div class="flex-1 min-w-0 bg-white border border-border-light rounded-[8px] p-[25px]">
              <p v-if="!nextArticle" class="text-[14px] leading-normal" style="color: rgba(26,20,16,0.35)">已经是最后一篇</p>
              <p v-else class="text-[14px] leading-normal cursor-pointer hover:text-blue transition-colors" @click="goTo(idx + 1)">
                <span class="text-ink">下一篇：</span>
                <span class="font-semibold text-ink">{{ nextArticle[1] }}</span>
              </p>
            </div>
          </div>

          <!-- ===== 相关新闻 ===== -->
          <div v-if="relatedNews.length" class="flex flex-col gap-[28px]">
            <p class="font-semibold text-[32px] text-ink leading-normal whitespace-nowrap">相关新闻</p>
            <div class="flex gap-[14px] max-sm:flex-col">
              <div
                v-for="(rn, ri) in relatedNews"
                :key="ri"
                class="flex-1 min-w-0 bg-bg-card rounded-[4px] overflow-clip px-[24px] py-[28px] flex flex-col gap-[32px] cursor-pointer hover:shadow-md transition-shadow"
                @click="goTo(allNews.indexOf(rn))"
              >
                <div class="flex flex-col gap-[4px]">
                  <p class="font-semibold text-[24px] text-ink leading-[31.2px]">{{ rn[1] }}</p>
                  <p class="text-[16px] leading-[24px]" style="color: rgba(26,20,16,0.65)">{{ rn[2] }}</p>
                </div>
                <p class="font-semibold text-[14px] text-blue leading-[24px]">查看详情</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  </div>
</template>

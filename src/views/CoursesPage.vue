<script setup>
import { ref, computed } from 'vue'
import FilterTabs from '@/components/shared/FilterTabs.vue'
import siteContent from '@/data/site-content.js'
import { GRADIENT_03 } from '@/config/gradients.js'

const courses = siteContent.courses || []

// --- 筛选状态 ---
// 第一行：价格筛选
const priceFilter = ref('全部')
const priceOptions = ['全部', '收费', '免费']

// 第二行：分类筛选
const categoryFilter = ref('全部课程')
const categoryOptions = ['全部课程', 'AIGC 入门', '影像实战', '数字人', '版权存证', '文创开发', '展厅运营']

// 搜索
const searchQuery = ref('')

// 组合筛选
const filtered = computed(() => {
  let result = courses
  if (priceFilter.value === '收费') result = result.filter(c => c.price === '收费')
  if (priceFilter.value === '免费') result = result.filter(c => c.price === '免费')
  if (categoryFilter.value !== '全部课程') result = result.filter(c => c.category === categoryFilter.value)
  if (searchQuery.value.trim()) {
    const q = searchQuery.value.trim().toLowerCase()
    result = result.filter(c =>
      c.title.toLowerCase().includes(q) ||
      c.teacher.toLowerCase().includes(q) ||
      (c.desc && c.desc.toLowerCase().includes(q))
    )
  }
  return result
})

// 选中的课程（侧边栏展示）
const selectedCourse = ref(courses[0] || null)

// 统计数字
const totalCourses = courses.length
const freeCourses = courses.filter(c => c.price === '免费').length

// 学习路径数据（Figma 固定内容）
const pathways = [
  {
    title: '新手入门',
    desc: '适合第一次接触 AIGC 创作的用户',
    tag: '导论课 → 版权存证基础',
  },
  {
    title: '赛事备赛',
    desc: '适合准备报名参赛和提交作品的用户',
    tag: '短片项目课 → 存证基础',
  },
  {
    title: '数字人制作',
    desc: '适合做讲述人、口播和虚拟形象',
    tag: '数字人课程 → 展厅运营',
  },
  {
    title: '文创转化',
    desc: '适合作品商品化和 IP 包装',
    tag: '文创 IP 课 → 展厅运营',
  },
]
</script>

<template>
  <div>
    <!-- ===== 1. Hero ===== -->
    <section class="relative h-[480px] max-sm:h-[340px] w-full overflow-hidden bg-navy">
      <div class="absolute inset-0 blur-[2px]">
        <img src="/assets/figma/imgBanner.png" alt="" class="absolute inset-0 size-full object-cover" />
      </div>
      <div
        class="absolute inset-0"
        style="background: linear-gradient(180.36deg, rgba(24,42,165,0.12) 1.27%, rgba(28,73,202,0.28) 31.38%, rgba(18,42,126,0.518) 59.56%, rgb(9,16,63) 92.81%)"
      />
      <div class="absolute left-1/2 -translate-x-1/2 top-[182px] max-sm:top-[140px] flex flex-col gap-[16px] items-center px-6 w-full">
        <!-- 标题 -->
        <p
          class="font-semibold text-[56px] max-sm:text-[36px] leading-[53px] text-center whitespace-nowrap drop-shadow-[0_2px_12px_rgba(0,0,0,0.4)]"
          style="background: linear-gradient(to bottom, #faedc5, #dbbd78); -webkit-background-clip: text; -webkit-text-fill-color: transparent;"
        >课程中心</p>
        <!-- 英文副标题 -->
        <p class="font-light text-[16px] max-sm:text-[14px] text-gold-light uppercase tracking-[2.88px]">Courses</p>
        <!-- 描述 -->
        <p class="text-[16px] max-sm:text-[14px] leading-[27px] text-white/80 text-center max-w-[448px]">
          以知识付费课程、免费试听和赛事备赛路径，帮助创作者把民族影像创意转化为可提交、可展示、可存证的 AIGC 作品。
        </p>
      </div>
    </section>

    <!-- ===== 2. 学习介绍 ===== -->
    <section
      class="flex flex-col lg:flex-row gap-[28px] px-[128px] max-lg:px-8 max-sm:px-4 py-[80px] max-sm:py-[60px] w-full items-center"
      style="background: #f2f9ff"
    >
      <!-- 左侧文字 -->
      <div class="rounded-[8px] lg:w-[754px] flex flex-col gap-[8px]">
        <!-- 装饰 + 标签 -->
        <div class="flex items-center gap-3">
          <img src="/assets/标题装饰（右边）.svg" alt="" class="h-[28px] w-auto opacity-60" />
          <span class="font-semibold text-[12px] text-navy-mid uppercase">Learning Path</span>
        </div>
        <!-- 大标题 -->
        <p
          class="font-semibold text-[clamp(32px,4vw,64px)] leading-[1.15]"
          :style="{ background: GRADIENT_03, '-webkit-background-clip': 'text', '-webkit-text-fill-color': 'transparent' }"
        >
          从入门学习到赛事投稿的<br />完整训练
        </p>
        <!-- 描述 -->
        <p class="text-[16px] leading-[1.6]" style="color: rgba(26,20,16,0.65)">
          课程页按"学习路径 + 课程商品 + 购买权益"组织，用户可以先试听，再购买系统课，并在个人中心继续学习。
        </p>
      </div>

      <!-- 右侧统计卡片 -->
      <div class="flex-1 flex gap-[24px] max-sm:flex-col max-sm:gap-[12px]">
        <div class="flex-1 bg-bg-card rounded-[8px] p-[24px] flex flex-col items-center justify-center gap-[8px] h-[164px]">
          <span class="font-heading font-bold text-[72px] max-sm:text-[48px] text-ink text-center">{{ totalCourses }}</span>
          <span class="text-[16px]" style="color: rgba(26,20,16,0.65)">系统课程</span>
        </div>
        <div class="flex-1 bg-bg-card rounded-[8px] p-[24px] flex flex-col items-center justify-center gap-[8px] h-[164px]">
          <span class="font-heading font-bold text-[72px] max-sm:text-[48px] text-ink text-center">{{ freeCourses }}</span>
          <span class="text-[16px]" style="color: rgba(26,20,16,0.65)">免费入门课</span>
        </div>
        <div class="flex-1 bg-bg-card rounded-[8px] p-[24px] flex flex-col items-center justify-center gap-[8px] h-[164px]">
          <p class="font-heading font-bold text-ink text-center leading-[0]">
            <span class="text-[72px] max-sm:text-[48px] leading-[normal]">24</span>
            <span class="text-[32px] max-sm:text-[24px] leading-[normal]">h</span>
          </p>
          <span class="text-[16px]" style="color: rgba(26,20,16,0.65)">累计内容</span>
        </div>
      </div>
    </section>

    <!-- ===== 3. 学习路径（新增） ===== -->
    <section class="px-[128px] max-lg:px-8 max-sm:px-4 py-[80px] max-sm:py-[60px] w-full">
      <div class="flex flex-col gap-[28px]">
        <!-- 标题区 -->
        <div class="max-w-[760px] flex flex-col gap-[8px]">
          <!-- 装饰标签 -->
          <div class="flex items-center gap-3">
            <img src="/assets/标题装饰（右边）.svg" alt="" class="h-[28px] w-auto opacity-60" />
            <span class="font-semibold text-[12px] text-navy-mid uppercase">Study Roadmap</span>
          </div>
          <!-- 大标题 -->
          <p
            class="font-semibold text-[clamp(32px,4vw,64px)] leading-[1.15] whitespace-nowrap"
            :style="{ background: GRADIENT_03, '-webkit-background-clip': 'text', '-webkit-text-fill-color': 'transparent' }"
          >推荐学习路径</p>
          <p class="text-[16px]" style="color: rgba(26,20,16,0.65)">
            用户可以根据目标选择路径，不需要从零判断该买哪门课。
          </p>
        </div>

        <!-- 路径卡片 -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[14px]">
          <div
            v-for="(path, i) in pathways"
            :key="i"
            class="bg-white border border-border-light rounded-[8px] p-[25px] flex flex-col gap-[12px] hover:shadow-md transition-shadow"
          >
            <div class="flex flex-col gap-[0px]">
              <p class="font-semibold text-[24px] text-ink whitespace-nowrap">{{ path.title }}</p>
              <p class="text-[16px] whitespace-nowrap" style="color: rgba(26,20,16,0.65)">{{ path.desc }}</p>
            </div>
            <div class="bg-bg-card rounded-full inline-flex items-start px-[9px] py-[5px] w-fit">
              <p class="font-semibold text-[12px] text-blue whitespace-nowrap">{{ path.tag }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ===== 4. 课程列表 ===== -->
    <section class="px-[128px] max-lg:px-8 max-sm:px-4 py-[64px] max-sm:py-[40px] w-full">
      <div class="flex flex-col gap-[28px]">
        <!-- 标题区 -->
        <div class="max-w-[760px] flex flex-col gap-[8px]">
          <div class="flex items-center gap-3">
            <img src="/assets/标题装饰（右边）.svg" alt="" class="h-[28px] w-auto opacity-60" />
            <span class="font-semibold text-[12px] text-navy-mid uppercase">Study list</span>
          </div>
          <p
            class="font-semibold text-[clamp(32px,4vw,64px)] leading-[1.15] whitespace-nowrap"
            :style="{ background: GRADIENT_03, '-webkit-background-clip': 'text', '-webkit-text-fill-color': 'transparent' }"
          >课程列表</p>
        </div>

        <!-- 筛选区 -->
        <div class="flex flex-col gap-[12px]">
          <!-- 第一行：价格筛选 -->
          <div class="flex gap-[16px] items-center flex-wrap">
            <span
              v-for="p in priceOptions"
              :key="p"
              @click="priceFilter = p"
              class="inline-flex items-start px-[21px] py-[7px] rounded-full text-[12px] font-semibold cursor-pointer transition-colors"
              :class="priceFilter === p
                ? 'text-white'
                : 'border border-border-light text-ink/65 hover:border-ink'"
              :style="priceFilter === p
                ? { background: GRADIENT_03 }
                : {}"
            >{{ p }}</span>
          </div>

          <!-- 第二行：分类筛选 -->
          <div class="flex gap-[16px] items-center flex-wrap">
            <span
              v-for="cat in categoryOptions"
              :key="cat"
              @click="categoryFilter = cat"
              class="inline-flex items-start px-[21px] py-[7px] rounded-full text-[12px] font-semibold cursor-pointer transition-colors"
              :class="categoryFilter === cat
                ? 'text-white'
                : 'border border-border-light text-ink/65 hover:border-ink'"
              :style="categoryFilter === cat
                ? { background: GRADIENT_03 }
                : {}"
            >{{ cat }}</span>
          </div>

          <!-- 搜索栏 -->
          <div class="flex gap-[10px] max-w-[520px]">
            <div class="flex-1 min-w-0 border border-border-light rounded-[8px] bg-white overflow-hidden">
              <input
                v-model="searchQuery"
                type="text"
                placeholder="搜索课程、讲师、学习目标"
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

        <!-- ===== 双栏布局：课程网格 + 侧边栏 ===== -->
        <div class="flex gap-[28px] items-start">
          <!-- 左侧：课程卡片网格 -->
          <div class="flex-1 min-w-0">
            <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-[28px]">
              <article
                v-for="(course, i) in filtered"
                :key="i"
                @click="selectedCourse = course"
                class="border border-border-light rounded-[8px] overflow-hidden bg-white hover:shadow-lg transition-shadow flex flex-col cursor-pointer"
                :class="{ 'ring-2 ring-blue': selectedCourse === course }"
              >
                <!-- 图片区 -->
                <div class="relative h-[248px] overflow-hidden shrink-0">
                  <img
                    :src="course.img"
                    :alt="course.title"
                    class="absolute inset-0 size-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                  <!-- 图片上的渐变标题 -->
                  <div
                    class="absolute left-[24px] bottom-[28px] font-heading font-bold text-[32px] leading-[40px] whitespace-nowrap"
                    :style="course.price === '收费'
                      ? { background: 'linear-gradient(to bottom, #f8b16b, #b3321f)', '-webkit-background-clip': 'text', '-webkit-text-fill-color': 'transparent', textShadow: '0 2px 2px rgba(0,0,0,0.55)' }
                      : { background: GRADIENT_03, '-webkit-background-clip': 'text', '-webkit-text-fill-color': 'transparent' }"
                  >{{ course.title }}</div>
                </div>

                <!-- 卡片内容区 -->
                <div
                  class="flex flex-col gap-[8px] p-[16px] flex-1"
                  style="background: linear-gradient(-4.65deg, rgba(181,237,255,0) 46.7%, rgba(83,131,235,0.23) 87.97%)"
                >
                  <!-- 分类标签 -->
                  <span class="inline-block w-fit bg-bg-card rounded-full px-[9px] py-[4px] text-[12px] text-blue whitespace-nowrap">
                    {{ course.category }} · {{ course.price }}
                  </span>

                  <!-- 课程标题 -->
                  <h3 class="text-[20px] font-semibold text-ink leading-[28px] whitespace-nowrap truncate">{{ course.title }}</h3>

                  <!-- 课程描述 -->
                  <p class="text-[14px] leading-[20px] line-clamp-2" style="color: rgba(26,20,16,0.65)">{{ course.desc }}</p>

                  <!-- 讲师 & 点赞 -->
                  <div class="flex items-center justify-between pt-[8px]">
                    <div class="flex items-center gap-[4px]">
                      <svg class="size-[16px] shrink-0" viewBox="0 0 24 24" fill="none" stroke="rgba(26,20,16,0.65)" stroke-width="2">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
                      </svg>
                      <span class="text-[12px] leading-[20px] whitespace-nowrap" style="color: rgba(26,20,16,0.65)">{{ course.teacher }}</span>
                    </div>
                    <div class="flex items-center gap-[4px]">
                      <svg class="size-[16px] shrink-0" viewBox="0 0 24 24" fill="none" stroke="rgba(26,20,16,0.65)" stroke-width="2">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                      </svg>
                      <span class="text-[12px] leading-[20px] whitespace-nowrap" style="color: rgba(26,20,16,0.65)">{{ course.likes }}</span>
                    </div>
                  </div>

                  <!-- 查看课程按钮 -->
                  <button
                    class="w-full h-[40px] min-h-[40px] rounded-[31px] border border-blue text-[14px] font-semibold text-ink hover:bg-blue hover:text-white transition-colors"
                  >
                    查看课程
                  </button>
                </div>
              </article>
            </div>

            <!-- 没有结果时的提示 -->
            <div v-if="filtered.length === 0" class="py-[60px] text-center">
              <p class="text-[16px]" style="color: rgba(26,20,16,0.45)">暂无匹配的课程</p>
            </div>
          </div>

          <!-- 右侧：课程详情侧边栏（sticky 吸顶，严格对齐 Figma 201:1927） -->
          <aside
            v-if="selectedCourse"
            class="shrink-0 w-[340px] hidden xl:block sticky top-[88px]"
          >
            <div
              class="relative bg-white border-[3px] border-blue-pale rounded-[8px] overflow-clip flex flex-col gap-[10px] px-[20px] py-[28px] shadow-[0_14px_36px_0_rgba(58,35,28,0.08)]"
            >
              <!-- 背景装饰椭圆 -->
              <div class="absolute left-[-160.5px] top-[-70.7px] size-[435px] pointer-events-none">
                <svg class="size-full" viewBox="0 0 435 435" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="217.5" cy="217.5" r="217" fill="url(#ellipse-grad)" opacity="0.18" />
                  <defs>
                    <radialGradient id="ellipse-grad" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stop-color="#b5edff" />
                      <stop offset="100%" stop-color="#b5edff" stop-opacity="0" />
                    </radialGradient>
                  </defs>
                </svg>
              </div>

              <!-- Course Detail 标签 -->
              <p class="font-semibold text-[12px] text-navy uppercase leading-[19.2px]">Course Detail</p>

              <!-- 课程标题 -->
              <p class="font-semibold text-[24px] text-ink leading-normal">{{ selectedCourse.title }}</p>

              <!-- 课程描述 -->
              <p class="text-[14px] leading-normal" style="color: rgba(26,20,16,0.65)">{{ selectedCourse.desc }}</p>

              <!-- 详情内容 -->
              <div class="flex flex-col gap-[16px] w-full">
                <!-- 价格卡片 -->
                <div class="bg-bg-card rounded-[8px] p-[12px] flex items-center justify-between w-full">
                  <p
                    class="font-semibold text-[24px] leading-[38.4px] whitespace-nowrap"
                    :style="{ background: GRADIENT_03, '-webkit-background-clip': 'text', '-webkit-text-fill-color': 'transparent' }"
                  >{{ selectedCourse.price }}</p>
                  <p class="font-semibold text-[13px] text-blue leading-[20.8px] whitespace-nowrap">
                    {{ selectedCourse.price === '免费' ? '可完整试听' : '限时优惠' }}
                  </p>
                </div>

                <!-- 适合人群 -->
                <div class="flex flex-col w-full">
                  <p class="font-semibold text-[16px] text-ink leading-normal">适合人群</p>
                  <div class="flex flex-col pb-[16px] pt-[6px]">
                    <p class="text-[16px] leading-normal" style="color: rgba(26,20,16,0.65)">{{ selectedCourse.audience }}</p>
                  </div>
                </div>

                <!-- 学习目标 -->
                <div class="flex flex-col w-full">
                  <p class="font-semibold text-[16px] text-ink leading-normal">学习目标</p>
                  <p
                    v-for="(goal, gi) in selectedCourse.goals"
                    :key="'g' + gi"
                    class="text-[16px] leading-normal whitespace-nowrap"
                    style="color: rgba(26,20,16,0.65)"
                  >{{ goal }}</p>
                </div>

                <!-- 课程目录 -->
                <div class="flex flex-col w-full">
                  <p class="font-semibold text-[16px] text-ink leading-normal">课程目录</p>
                  <p
                    v-for="(item, oi) in selectedCourse.outline"
                    :key="'o' + oi"
                    class="text-[16px] leading-normal whitespace-nowrap"
                    style="color: rgba(26,20,16,0.65)"
                  >{{ item }}</p>
                </div>

                <!-- 操作按钮 -->
                <div class="flex gap-[12px] w-full">
                  <button
                    class="flex-1 min-h-[42px] min-w-0 px-[25px] py-[9px] rounded-[12px] border border-blue-pale text-[16px] font-semibold text-white text-center whitespace-nowrap hover:opacity-90 transition-opacity"
                    :style="{ background: GRADIENT_03 }"
                  >
                    立即购买
                  </button>
                  <button
                    class="flex-1 h-[42px] min-w-0 px-[17px] py-px rounded-[8px] bg-white border border-blue text-[16px] font-semibold text-ink text-center whitespace-nowrap hover:bg-blue hover:text-white transition-colors"
                  >
                    免费试听
                  </button>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  </div>
</template>

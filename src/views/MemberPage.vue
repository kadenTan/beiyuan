<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import siteContent from '@/data/site-content.js'

const router = useRouter()
const user = ref(null)
const activeTab = ref('works')

const member = ref({
  name: '阿圆',
  role: '民族影像创作者',
  avatar: '/assets/avater.png',
  signature: '用 AIGC 记录民族风物，也用影像讲述新的故事。',
  createdAt: '2026-03-18',
  location: '云南 · 大理',
  stats: [
    ['已上传作品', '18'],
    ['获赞互动', '2.4k'],
    ['存证证书', '8'],
    ['学习课程', '5'],
  ],
})

// 编辑弹窗
const showEditModal = ref(false)
const editForm = ref({ name: '', signature: '', role: '', province: '', city: '' })
const provinces = ['北京', '上海', '广东', '浙江', '江苏', '四川', '湖北', '湖南', '福建', '山东', '河南', '河北', '辽宁', '陕西', '重庆', '云南', '贵州', '广西', '山西', '吉林', '黑龙江', '安徽', '江西', '海南', '甘肃', '青海', '宁夏', '西藏', '新疆', '内蒙古', '天津', '香港', '澳门', '台湾']
const cities = ref([])

const provinceCityMap = {
  '云南': ['昆明', '大理', '丽江', '曲靖', '玉溪', '保山', '昭通', '普洱', '临沧', '楚雄', '红河'],
  '广东': ['广州', '深圳', '珠海', '东莞', '佛山', '中山', '惠州', '汕头', '湛江', '江门'],
  '四川': ['成都', '绵阳', '德阳', '宜宾', '南充', '泸州', '乐山', '达州'],
  '浙江': ['杭州', '宁波', '温州', '嘉兴', '湖州', '绍兴', '金华', '台州'],
  '北京': ['东城', '西城', '朝阳', '海淀', '丰台', '石景山', '通州', '昌平', '大兴'],
  '上海': ['黄浦', '徐汇', '长宁', '静安', '普陀', '浦东', '闵行', '宝山', '嘉定'],
}

function openEditModal() {
  editForm.value = {
    name: member.value.name,
    signature: member.value.signature,
    role: member.value.role,
    province: member.value.location.split(' · ')[0] || '',
    city: member.value.location.split(' · ')[1] || '',
  }
  if (editForm.value.province && provinceCityMap[editForm.value.province]) {
    cities.value = provinceCityMap[editForm.value.province]
  } else {
    cities.value = provinceCityMap[editForm.value.province] || []
  }
  showEditModal.value = true
}

function onProvinceChange() {
  cities.value = provinceCityMap[editForm.value.province] || [editForm.value.province]
  editForm.value.city = ''
}

function saveProfile() {
  member.value.name = editForm.value.name || member.value.name
  member.value.signature = editForm.value.signature || member.value.signature
  member.value.role = editForm.value.role || member.value.role
  const locParts = [editForm.value.province, editForm.value.city].filter(Boolean)
  member.value.location = locParts.length > 0 ? locParts.join(' · ') : '未知'
  showEditModal.value = false
}

const tabs = [
  ['我的作品', 'works'],
  ['我的赛事', 'events'],
  ['我的课程', 'courses'],
  ['我的存证', 'evidence'],
  ['我的收藏', 'favorites'],
  ['我的订单', 'orders'],
  ['收货地址', 'address'],
  ['账号设置', 'settings'],
]

const works = (siteContent.works || []).slice(0, 6)
const courses = (siteContent.courses || []).slice(0, 4)

// 我的赛事数据（带赛道和进程节点）
const memberEvents = ref([
  {
    name: '民族影像 AIGC 创作大赛',
    track: 'AIGC视觉创作赛道',
    desc: '聚焦民族文化的数字化表达与AI智能创作，参赛者通过AIGC工具生成具有民族文化特色的影像作品。',
    status: '进行中',
    node: { label: '提交资料', action: 'upload' },
    color: '#b3321f',
  },
  {
    name: '民族影像 AIGC 创作大赛',
    track: 'AIGC 视觉叙事赛道',
    desc: '将民族服饰、节庆场景与 AIGC 视觉叙事结合，通过数字影像讲述民族故事。',
    status: '已完成',
    node: { label: '下载证书', action: 'download' },
    color: '#214fd6',
  },
  {
    name: '非遗影像青年创作营',
    track: '非遗影像记录赛道',
    desc: '以青年视角记录非遗技艺与传承人故事，创作具有当代传播力的非遗影像作品。',
    status: '评审中',
    node: { label: '查看结果', action: 'view' },
    color: '#5383eb',
  },
])

// 我的存证数据
const myEvidence = ref([
  { id: 'BY-AIGC-2026-0615-001', name: '雪域长歌 AIGC 影像', time: '2026-06-15 14:26', thumb: '/assets/figma/imgArticle0.png' },
  { id: 'BY-AIGC-2026-0520-008', name: '苗绣数字人非遗讲述', time: '2026-05-20 09:12', thumb: '/assets/figma/imgArticle1.png' },
  { id: 'BY-AIGC-2026-0408-003', name: '丝路乐舞 AI 生成影像', time: '2026-04-08 16:45', thumb: '/assets/figma/imgArticle2.png' },
])

onMounted(() => {
  const saved = localStorage.getItem('beiyuan_user')
  if (saved) {
    try { user.value = JSON.parse(saved) } catch {}
  }
  if (!user.value) router.push({ name: 'auth' })
})

function doLogout() {
  localStorage.removeItem('beiyuan_user')
  router.push({ name: 'home' })
}
</script>

<template>
  <div class="min-h-screen bg-bg-card pt-[88px] max-md:pt-[64px]">
    <!-- ====== Hero 个人资料 ====== -->
    <section class="pt-[76px] pb-7 max-sm:pt-14 max-sm:pb-6 px-[128px] max-lg:px-8 max-sm:px-4"
      style="background: linear-gradient(135deg, #09103f 0%, #182aa5 50%, #214fd6 100%)">
      <div class="max-w-[1366px] mx-auto bg-white rounded-md p-[34px] max-sm:p-5 flex max-sm:flex-col gap-6 items-start">
        <!-- 头像 -->
        <div class="size-[150px] max-sm:size-[100px] max-sm:mx-auto rounded-full bg-bg-card overflow-hidden shrink-0 flex items-center justify-center">
          <img :src="member.avatar" :alt="member.name" class="w-[101px] h-[104px] max-sm:w-[67px] max-sm:h-[69px] object-cover" />
        </div>
        <!-- 信息 -->
        <div class="flex-1 flex flex-col gap-1 min-w-0 pt-[13px] max-sm:pt-0 max-sm:items-center max-sm:text-center">
          <p class="font-semibold text-[12px] text-blue uppercase tracking-[0.6px] leading-[18px]">User Center</p>
          <div class="flex items-center justify-between gap-4 flex-wrap pt-1">
            <div class="flex items-center gap-3">
              <h1 class="font-semibold text-[28px] max-sm:text-[22px] text-ink">{{ member.name }}</h1>
              <button @click="openEditModal" class="size-6 text-ink/35 hover:text-blue transition-colors">
                <svg class="size-full" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
              </button>
            </div>
            <div class="flex gap-3 flex-wrap">
              <button class="h-9 px-4 rounded-full bg-blue-mid text-white text-[13px] font-semibold hover:opacity-90 transition-opacity">上传作品</button>
              <a href="/#/events" class="inline-flex items-center h-9 px-4 rounded-full border border-ink text-[13px] font-semibold text-ink no-underline hover:bg-ink hover:text-white transition-colors">生成作品</a>
            </div>
          </div>
          <p class="text-[18px] max-sm:text-[15px] text-muted pt-1 leading-[27px]">{{ member.signature }}</p>
          <div class="flex gap-3 mt-2 text-[14px] pt-2">
            <span class="text-blue">{{ member.role }}</span>
            <span class="text-muted">{{ member.location }}</span>
            <span class="text-muted">创建时间：{{ member.createdAt }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- ====== 数据统计 ====== -->
    <section class="px-[128px] max-lg:px-8 max-sm:px-4 pt-7 max-sm:pt-5">
      <div class="max-w-[1366px] mx-auto grid grid-cols-4 max-md:grid-cols-2 gap-5">
        <article v-for="[label, value] in member.stats" :key="label" class="bg-white rounded-md p-[22px] text-center">
          <strong class="block font-semibold text-[28px] text-ink">{{ value }}</strong>
          <span class="block mt-2 text-[13px] text-muted">{{ label }}</span>
        </article>
      </div>
    </section>

    <!-- ====== 内容控制台（侧栏 + 内容区） ====== -->
    <section class="px-[128px] max-lg:px-8 max-sm:px-4 py-7 max-sm:py-5">
      <div class="max-w-[1366px] mx-auto grid grid-cols-[230px_1fr] max-md:grid-cols-1 gap-5 items-start">
        <!-- 侧栏 -->
        <aside class="sticky top-[86px] bg-white rounded-md p-4 flex flex-col gap-2 max-md:static max-md:grid max-md:grid-cols-4">
          <button
            v-for="[label, key] in tabs"
            :key="key"
            @click="activeTab = key"
            class="min-h-[42px] border-0 bg-transparent text-[14px] font-extrabold text-left px-4 rounded-sm transition-colors"
            :class="activeTab === key ? 'text-white' : 'text-muted'"
            :style="activeTab === key ? { background: '#09103f' } : {}"
          >{{ label }}</button>
        </aside>

        <!-- 内容面板 -->
        <div class="bg-white rounded-md p-7 max-sm:p-5 min-w-0">
          <!-- 我的作品 -->
          <div v-if="activeTab === 'works'">
            <div class="flex items-center justify-between gap-4 mb-5">
              <h2 class="font-semibold text-[20px] text-ink">我的作品</h2>
              <button class="h-9 px-4 rounded-full bg-blue-mid text-white text-[13px] font-semibold hover:opacity-90 transition-opacity">上传作品</button>
            </div>
            <div class="grid grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1 gap-5">
              <article v-for="w in works" :key="w[0]" class="overflow-hidden bg-paper rounded-md group cursor-pointer hover:shadow-md transition-shadow">
                <img :src="w[3]" :alt="w[0]" class="aspect-[4/3] object-cover w-full" />
                <div class="p-4">
                  <strong class="text-[14px] text-ink">{{ w[0] }}</strong>
                  <span class="block mt-2 text-[13px] text-muted">{{ w[1] }} · {{ w[2] }}</span>
                  <em class="block mt-2 text-[13px] text-muted not-italic">热度 {{ w[6] || 0 }} · 点赞 {{ w[6] || 0 }}</em>
                </div>
              </article>
            </div>
          </div>

          <!-- 我的赛事 -->
          <div v-if="activeTab === 'events'">
            <div class="flex items-center justify-between gap-4 mb-5">
              <h2 class="font-semibold text-[20px] text-ink">我的赛事</h2>
            </div>
            <div class="flex flex-col gap-5">
              <article v-for="e in memberEvents" :key="e.name" class="bg-white border border-border-light rounded-lg overflow-hidden">
                <!-- 头部：赛事名 + 状态 -->
                <div class="flex items-center justify-between gap-4 px-5 py-4 border-b border-border-light" :style="{ background: e.color + '08' }">
                  <div class="flex items-center gap-3 min-w-0">
                    <div class="size-2 rounded-full shrink-0" :style="{ background: e.color }" />
                    <h3 class="font-semibold text-[17px] text-ink truncate">{{ e.name }}</h3>
                  </div>
                  <span class="shrink-0 text-[13px] font-semibold" :style="{ color: e.color }">{{ e.status }}</span>
                </div>
                <!-- 内容区 -->
                <div class="p-5 flex flex-col gap-4">
                  <!-- 赛道名 -->
                  <div class="flex items-start gap-3">
                    <span class="shrink-0 inline-flex items-center h-7 px-2.5 rounded text-[12px] font-semibold bg-bg-card text-blue-mid">赛道</span>
                    <div class="min-w-0">
                      <p class="font-semibold text-[15px] text-ink">{{ e.track }}</p>
                      <p class="text-[13px] text-muted mt-1 leading-[1.5]">{{ e.desc }}</p>
                    </div>
                  </div>
                  <!-- 进程节点 -->
                  <div class="flex items-center justify-between gap-4 pt-3 border-t border-border-light">
                    <div class="flex items-center gap-2">
                      <div class="size-2.5 rounded-full" :style="{ background: e.node.action === 'download' ? '#22c55e' : e.color }" />
                      <span class="text-[14px] text-ink font-medium">{{ e.node.label }}</span>
                    </div>
                    <button
                      class="inline-flex items-center h-8 px-4 rounded-full text-[13px] font-semibold transition-colors"
                      :class="e.node.action === 'download'
                        ? 'bg-green-50 text-green-600 border border-green-200 hover:bg-green-100'
                        : e.node.action === 'view'
                          ? 'bg-blue-50 text-blue-mid border border-blue-pale hover:bg-blue-100'
                          : 'text-white hover:opacity-90'"
                      :style="e.node.action === 'upload' ? { background: e.color } : {}"
                    >
                      {{ e.node.label }}
                      <svg v-if="e.node.action === 'download'" class="size-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
                    </button>
                  </div>
                </div>
              </article>
            </div>
          </div>

          <!-- 我的课程 -->
          <div v-if="activeTab === 'courses'">
            <div class="flex items-center justify-between gap-4 mb-5">
              <h2 class="font-semibold text-[20px] text-ink">我的课程</h2>
            </div>
            <div class="flex flex-col gap-4">
              <article v-for="c in courses" :key="c.title" class="bg-paper rounded-md p-4">
                <span class="inline-flex items-center px-2 py-0.5 rounded text-[12px] font-semibold text-blue-mid bg-bg-card">{{ c.category }}</span>
                <strong class="block mt-2 text-[15px] text-ink">{{ c.title }}</strong>
                <p class="text-[13px] text-muted mt-1">{{ c.price }} · 学习进度 62%</p>
                <em class="block mt-2 text-[13px] text-muted not-italic">{{ c.desc }}</em>
              </article>
            </div>
          </div>

          <!-- 我的存证 -->
          <div v-if="activeTab === 'evidence'">
            <div class="flex items-center justify-between gap-4 mb-5">
              <h2 class="font-semibold text-[20px] text-ink">我的存证</h2>
            </div>

            <!-- 有存证 -->
            <div v-if="myEvidence.length > 0" class="flex flex-col gap-4">
              <article v-for="e in myEvidence" :key="e.id" class="bg-white border border-border-light rounded-lg p-4 flex max-sm:flex-col gap-4 items-center max-sm:items-start">
                <!-- 缩略图 -->
                <img :src="e.thumb" :alt="e.name" class="size-[80px] max-sm:size-[60px] rounded-md object-cover shrink-0" />
                <!-- 信息 -->
                <div class="flex-1 min-w-0 flex flex-col gap-1.5">
                  <h3 class="font-semibold text-[16px] text-ink truncate">{{ e.name }}</h3>
                  <p class="text-[13px] text-muted">链上编号：<span class="text-blue-mid font-mono text-[12px]">{{ e.id }}</span></p>
                  <p class="text-[13px] text-muted">存证时间：{{ e.time }}</p>
                </div>
                <!-- 下载 -->
                <button class="inline-flex items-center gap-1.5 h-9 px-4 rounded-full bg-blue-mid text-white text-[13px] font-semibold hover:opacity-90 transition-opacity shrink-0">
                  <svg class="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
                  下载证书
                </button>
              </article>
            </div>

            <!-- 暂无存证 -->
            <div v-else class="flex flex-col items-center justify-center py-16 bg-white border border-border-light rounded-lg">
              <svg class="size-16 text-ink/15 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
              <p class="text-[16px] text-ink/30 font-medium">暂无存证</p>
              <p class="text-[13px] text-muted mt-1">对作品发起存证后，证书将在此处展示</p>
              <a href="/#/evidence" class="mt-4 inline-flex items-center h-9 px-5 rounded-full text-[13px] font-semibold text-white hover:opacity-90 transition-opacity no-underline" :style="{ background: 'linear-gradient(-39deg, #b5edff, #214fd6, #5383eb)' }">前往数字版权中心</a>
            </div>
          </div>

          <!-- 我的收藏 -->
          <div v-if="activeTab === 'favorites'">
            <div class="flex items-center justify-between gap-4 mb-5">
              <h2 class="font-semibold text-[20px] text-ink">我的收藏</h2>
            </div>
            <p class="text-muted text-[14px]">收藏的课程、展品及赛事将在此展示。</p>
          </div>

          <!-- 我的订单 -->
          <div v-if="activeTab === 'orders'">
            <div class="flex items-center justify-between gap-4 mb-5">
              <h2 class="font-semibold text-[20px] text-ink">我的订单</h2>
            </div>
            <p class="text-muted text-[14px]">商城订单、支付记录与售后状态将在此展示。</p>
          </div>

          <!-- 收货地址 -->
          <div v-if="activeTab === 'address'">
            <div class="flex items-center justify-between gap-4 mb-5">
              <h2 class="font-semibold text-[20px] text-ink">收货地址</h2>
            </div>
            <p class="text-muted text-[14px]">管理收货地址。</p>
          </div>

          <!-- 账号设置 -->
          <div v-if="activeTab === 'settings'">
            <div class="flex items-center justify-between gap-4 mb-5">
              <h2 class="font-semibold text-[20px] text-ink">账号设置</h2>
            </div>
            <p class="text-muted text-[14px] mb-5">资料修改、实名认证、密码与消息通知。</p>

            <!-- 修改密码 -->
            <div class="bg-white border border-border-light rounded-lg p-5 mb-4">
              <h3 class="font-semibold text-[16px] text-ink mb-3">修改密码</h3>
              <div class="flex flex-col gap-3 max-w-[400px]">
                <div>
                  <label class="block text-[13px] text-muted mb-1">当前密码</label>
                  <input type="password" placeholder="请输入当前密码" class="w-full h-10 rounded-lg border border-border-light px-3 text-[14px] outline-none focus:border-blue transition-colors" />
                </div>
                <div>
                  <label class="block text-[13px] text-muted mb-1">新密码</label>
                  <input type="password" placeholder="请输入新密码" class="w-full h-10 rounded-lg border border-border-light px-3 text-[14px] outline-none focus:border-blue transition-colors" />
                </div>
                <div>
                  <label class="block text-[13px] text-muted mb-1">确认新密码</label>
                  <input type="password" placeholder="请再次输入新密码" class="w-full h-10 rounded-lg border border-border-light px-3 text-[14px] outline-none focus:border-blue transition-colors" />
                </div>
                <button class="h-10 px-6 rounded-lg text-[14px] font-semibold text-white hover:opacity-90 transition-opacity w-fit" :style="{ background: 'linear-gradient(-39deg, #b5edff, #214fd6, #5383eb)' }">确认修改</button>
              </div>
            </div>

            <button @click="doLogout" class="h-9 px-6 rounded-full border border-accent/30 text-[13px] font-semibold text-accent hover:bg-accent/5 transition-colors">退出登录</button>
          </div>
        </div>
      </div>
    </section>

    <!-- ====== 编辑资料弹窗 ====== -->
    <Transition name="modal">
      <div v-if="showEditModal" class="fixed inset-0 z-[100] flex items-center justify-center px-4" @click.self="showEditModal = false">
        <div class="absolute inset-0 bg-black/40 backdrop-blur-sm" />
        <div class="relative bg-white rounded-xl max-w-[480px] w-full p-8 max-sm:p-6 shadow-2xl">
          <h2 class="font-semibold text-[22px] text-ink mb-6">编辑资料</h2>
          <div class="flex flex-col gap-4">
            <!-- 昵称 -->
            <div class="flex flex-col gap-1.5">
              <label class="font-semibold text-[14px] text-ink">昵称</label>
              <input v-model="editForm.name" type="text" placeholder="请输入昵称"
                class="w-full h-12 rounded-lg border border-[#ddd] px-[15px] text-[14px] outline-none focus:border-blue transition-colors" />
            </div>
            <!-- 简介 -->
            <div class="flex flex-col gap-1.5">
              <label class="font-semibold text-[14px] text-ink">简介</label>
              <textarea v-model="editForm.signature" rows="3" placeholder="请输入简介"
                class="w-full rounded-lg border border-[#ddd] px-[15px] py-3 text-[14px] outline-none focus:border-blue transition-colors resize-none" />
            </div>
            <!-- 分类 -->
            <div class="flex flex-col gap-1.5">
              <label class="font-semibold text-[14px] text-ink">分类</label>
              <input v-model="editForm.role" type="text" placeholder="请输入分类（如：民族影像创作者）"
                class="w-full h-12 rounded-lg border border-[#ddd] px-[15px] text-[14px] outline-none focus:border-blue transition-colors" />
            </div>
            <!-- 地区 -->
            <div class="flex flex-col gap-1.5">
              <label class="font-semibold text-[14px] text-ink">地区</label>
              <div class="flex gap-3">
                <select v-model="editForm.province" @change="onProvinceChange"
                  class="flex-1 h-12 rounded-lg border border-[#ddd] px-[15px] text-[14px] outline-none focus:border-blue transition-colors bg-white">
                  <option value="">选择省份</option>
                  <option v-for="p in provinces" :key="p" :value="p">{{ p }}</option>
                </select>
                <select v-model="editForm.city"
                  class="flex-1 h-12 rounded-lg border border-[#ddd] px-[15px] text-[14px] outline-none focus:border-blue transition-colors bg-white">
                  <option value="">选择城市</option>
                  <option v-for="c in cities" :key="c" :value="c">{{ c }}</option>
                </select>
              </div>
            </div>
          </div>
          <div class="flex gap-3 mt-6">
            <button @click="showEditModal = false" class="flex-1 h-12 rounded-[10px] border border-[#ddd] text-[15px] font-semibold text-ink/65 hover:bg-bg-card transition-colors">取消</button>
            <button @click="saveProfile" class="flex-1 h-12 rounded-[10px] text-[15px] font-semibold text-white hover:opacity-90 transition-opacity"
              style="background: linear-gradient(-13.3deg, #214fd6 15.6%, #5383eb 65.9%, #b5edff 109.1%)">保存</button>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.2s ease;
}
.modal-enter-active > div:last-child,
.modal-leave-active > div:last-child {
  transition: transform 0.2s ease, opacity 0.2s ease;
}
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
.modal-enter-from > div:last-child {
  transform: scale(0.95) translateY(8px);
  opacity: 0;
}
.modal-leave-to > div:last-child {
  transform: scale(0.95) translateY(8px);
  opacity: 0;
}
</style>

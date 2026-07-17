<script setup>
import { useRouter } from 'vue-router'
import { GRADIENT_03, GRADIENT_GOLD } from '@/config/gradients.js'

const router = useRouter()

function goCertify() {
  const user = localStorage.getItem('beiyuan_user')
  if (user) {
    router.push({ name: 'member' })
  } else {
    router.push({ name: 'auth' })
  }
}

function scrollToContent() {
  const hero = document.querySelector('.evidence-hero')
  if (hero) {
    hero.scrollIntoView({ behavior: 'smooth', block: 'start' })
    setTimeout(() => {
      window.scrollBy({ top: hero.offsetHeight, behavior: 'smooth' })
    }, 100)
  }
}

const basics = [
  { num: '01', title: '何为存证', desc: '区块链存证是将内容的关键信息、文件哈希、提交时间、提交人信息和业务编号形成可信记录，并通过区块链等技术保证记录不被单方面更改。' },
  { num: '02', title: '什么可以存证', desc: '文字、图片、视频、音频、设计稿、文档、合同、证书、赛事作品、课程作品、AIGC 作品、授权材料、创作说明等。' },
  { num: '03', title: '有哪些存证', desc: '平台可提供文昌链存证、作品链上凭证、资料文件存证、赛事作品存证、创作过程材料存证，并可结合知识产权版权登记服务。' },
  { num: '04', title: '存证有什么用', desc: '存证可以证明某份内容在某个时间点已经存在，并与提交人、文件内容和平台记录对应。后续用于参赛评审、版权声明、授权合作、交易流转和维权举证。' },
]

const protectGroups = [
  { title: '内容作品', tags: ['文字作品', '图片作品', '视频作品', '音频作品', '数字人作品', 'AIGC 作品', '文创设计稿'] },
  { title: '文件资料', tags: ['PDF 文档', '合同协议', '证书文件', '授权声明', '版权声明', '证明材料'] },
  { title: '业务记录', tags: ['创作说明', '赛事报名材料', '评审记录', '获奖证明', '交易记录', '展示记录', '流转记录'] },
]

const services = [
  { title: '文昌链存证', desc: '面向文字、图片、视频、音频、设计稿和数字作品的链上可信记录服务，支持文件摘要、时间戳、文件哈希和业务编号。', logo: '/assets/wencang_logo.png' },
  { title: '知识产权版权登记', desc: '针对具备登记条件的作品，协助整理作品材料、权属信息和登记所需文件，让链上存证进一步衔接版权保护。' },
  { title: '赛事与活动存证', desc: '为参赛作品、报名材料、评审过程、获奖结果建立留痕记录，提升赛事公信力，也保护参赛者的作品权益。' },
  { title: '授权与资料流转凭证', desc: '为作品展示、授权合作、文创开发、资料交付和交易流转提供可追溯依据。', showLogo: false },
]

const beforeSteps = [
  { num: '01', title: '证明创作时间', desc: '明确内容形成和提交的时间节点，避免后续出现"谁先创作、谁先发布"的争议。' },
  { num: '02', title: '证明作品内容', desc: '通过文件哈希锁定内容特征，文件一旦发生变化，核验结果也会随之变化。' },
  { num: '03', title: '证明权属关系', desc: '将内容、作者或提交人、平台记录和业务场景建立对应关系。' },
  { num: '04', title: '链上存证', desc: '将关键摘要写入区块链，链下保存原始文件，链上保存可核验凭据。' },
  { num: '05', title: '支撑后续使用', desc: '用于赛事评审、版权声明、授权合作、交易流转和维权举证。' },
]

const flowSteps = [
  { num: '01', title: '提交内容', desc: '上传文字、图片、视频、音频、设计稿或文件资料，补充名称、提交人和说明信息。' },
  { num: '02', title: '生成指纹', desc: '系统提取文件哈希、时间信息和业务编号，形成核验基础。' },
  { num: '03', title: '发起存证', desc: '选择文昌链存证、资料文件存证、赛事存证或版权登记辅助服务。' },
  { num: '04', title: '出具凭证', desc: '形成可查询的存证编号、证书页面和链上核验信息。' },
  { num: '05', title: '场景使用', desc: '用于作品展示、赛事评审、授权合作、交易流转和维权举证。' },
]
</script>

<template>
  <div>
    <!-- ===== Hero ===== -->
    <section class="relative min-h-[902px] max-sm:min-h-[820px] w-full overflow-hidden bg-navy evidence-hero">
      <div class="absolute inset-0 blur-[2px]">
        <img src="/assets/figma/imgBanner.png" alt="" class="absolute inset-0 size-full object-cover" />
      </div>
      <div class="absolute inset-0"
        style="background: linear-gradient(180.36deg, rgba(24,42,165,0.12) 1.27%, rgba(28,73,202,0.28) 31.38%, rgba(18,42,126,0.518) 59.56%, rgb(9,16,63) 92.81%)" />

      <!-- Hero 底部双栏 -->
      <div class="absolute bottom-10 max-sm:bottom-6 left-1/2 -translate-x-1/2 w-full max-w-[1240px] px-6 flex max-lg:flex-col gap-8 items-end max-lg:items-center">
        <!-- 左栏 -->
        <div class="flex-1 flex flex-col gap-[15px] max-lg:items-center max-lg:text-center">
          <!-- 标签 -->
          <div class="inline-flex items-center gap-2 h-[38px] px-6 rounded-xl border border-white"
            style="background: linear-gradient(-48deg, #b5edff 3%, #214fd6 53%, #5383eb 93%)">
            <span class="size-2 rounded-full bg-white" />
            <span class="font-semibold text-[13px] text-white tracking-[1px]">作品与数字内容可信保护服务</span>
          </div>
          <!-- 大标题 -->
          <h1 class="font-extrabold text-[clamp(36px,5vw,80px)] leading-[1.1] max-w-[706px]"
            :style="{ background: 'linear-gradient(to bottom, #fff, #dbbd78)', '-webkit-background-clip': 'text', '-webkit-text-fill-color': 'transparent', textShadow: '0 9px 12px rgba(0,0,0,0.72)', filter: 'drop-shadow(0 9px 12px rgba(0,0,0,0.72))' }">让每一份原创内容，都拥有可核验的数字凭证</h1>
          <!-- 描述 -->
          <p class="text-[18px] max-sm:text-[15px] leading-[26px] text-white/80 max-w-[670px]">文字、图片、视频、音频、设计稿、证书、合同和数字作品，一旦发布、参赛、展示或授权使用，就可能产生来源、时间和权属争议。贝圆存证中心通过区块链存证、文昌链对接及版权登记服务，为内容建立可查询、可核验、可追溯的数字证明。</p>
          <!-- 按钮组 -->
          <div class="flex gap-4 max-sm:flex-col max-sm:w-full">
            <button @click="goCertify" class="inline-flex items-center justify-center gap-2 h-14 px-6 rounded-xl text-[16px] font-semibold text-white hover:opacity-90 transition-opacity max-sm:w-full border border-[#b5edff]"
              style="background: linear-gradient(-54deg, #214fd6 9%, #5383eb 69%, #b5edff 121%)">立即存为作品存证<svg class="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 17L17 7M7 7h10v10"/></svg></button>
            <button @click="scrollToContent" class="h-14 px-6 rounded-xl border border-white text-[16px] text-white hover:bg-white/[0.15] transition-colors max-sm:w-full"
              style="background: rgba(255,255,255,0.1)">了解存证能保护什么</button>
          </div>
          <!-- 3 个优势卡片 -->
          <div class="grid grid-cols-3 max-sm:grid-cols-1 gap-[14px] max-w-[690px] w-full py-5">
            <div class="bg-white/8 border border-white/10 rounded-lg p-[19px] flex flex-col gap-1">
              <p class="font-semibold text-[24px] leading-normal"
                :style="{ background: 'linear-gradient(to bottom, #faedc5, #dbbd78)', '-webkit-background-clip': 'text', '-webkit-text-fill-color': 'transparent' }">创作时间</p>
              <p class="text-[13px] text-white/75">记录内容形成节点</p>
            </div>
            <div class="bg-white/8 border border-white/10 rounded-lg p-[19px] flex flex-col gap-1">
              <p class="font-semibold text-[24px] leading-normal"
                :style="{ background: 'linear-gradient(to bottom, #faedc5, #dbbd78)', '-webkit-background-clip': 'text', '-webkit-text-fill-color': 'transparent' }">文件指纹</p>
              <p class="text-[13px] text-white/75">锁定文件内容特征</p>
            </div>
            <div class="bg-white/8 border border-white/10 rounded-lg p-[19px] flex flex-col gap-1">
              <p class="font-semibold text-[24px] leading-normal"
                :style="{ background: 'linear-gradient(to bottom, #faedc5, #dbbd78)', '-webkit-background-clip': 'text', '-webkit-text-fill-color': 'transparent' }">公开核验</p>
              <p class="text-[13px] text-white/75">支持编号与哈希查询</p>
            </div>
          </div>
        </div>
        <!-- 右栏：存证示例 -->
        <div class="shrink-0 w-[470px] max-lg:w-[340px] max-sm:w-[260px] rounded-2xl overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,0.34)]"
          style="background: linear-gradient(126deg, #0b154e 0%, #214fd6 58%, #b3321f 120%)">
          <img src="/assets/存证示例.jpg" alt="存证示例" class="w-full object-cover p-[34px] rounded-2xl" />
        </div>
      </div>
    </section>

    <!-- ===== 主内容（交替背景） ===== -->

    <!-- Section 1: 存证服务 -->
    <section class="px-[128px] max-lg:px-8 max-sm:px-4 py-[80px] max-sm:py-10 bg-bg-card">
      <div class="max-w-[1240px] mx-auto flex flex-col gap-10">
        <div>
          <div class="flex items-center gap-3 mb-4"><img src="/assets/标题装饰（右边）.svg" alt="" class="h-10 w-auto opacity-60" /><span class="font-semibold text-[12px] text-navy-mid uppercase">Evidence Basics</span></div>
          <h2 class="font-semibold text-[clamp(28px,4vw,64px)] leading-[1.15] mb-4" :style="{ background: GRADIENT_03, '-webkit-background-clip': 'text', '-webkit-text-fill-color': 'transparent' }">区块链存证，让作品来源、内容和时间都有据可查</h2>
          <p class="text-[16px] max-sm:text-[14px] text-muted leading-[1.6] max-w-[790px]">存证不是简单"备份一份文件"，而是为内容建立可信记录。无论是创作作品、业务材料还是授权文件，都可以通过接口发起存证，形成不可随意更改的链上记录，并可提供公开查询入口。</p>
        </div>
        <div class="grid grid-cols-2 max-sm:grid-cols-1 gap-4">
          <article v-for="b in basics" :key="b.num" class="bg-white rounded-lg p-[29px] border border-border-light hover:shadow-md transition-shadow">
            <span class="inline-flex items-center justify-center size-[46px] rounded-lg bg-bg-card text-[18px] font-bold text-blue-mid mb-4">{{ b.num }}</span>
            <h3 class="font-semibold text-[22px] text-ink mb-3">{{ b.title }}</h3>
            <p class="text-[14px] text-muted leading-[1.6]">{{ b.desc }}</p>
          </article>
        </div>
      </div>
    </section>

    <!-- Section 2: 什么可以存证 -->
    <section class="px-[128px] max-lg:px-8 max-sm:px-4 py-[80px] max-sm:py-10 bg-white">
      <div class="max-w-[1240px] mx-auto flex flex-col gap-10">
        <div>
          <div class="flex items-center gap-3 mb-4"><img src="/assets/标题装饰（右边）.svg" alt="" class="h-10 w-auto opacity-60" /><span class="font-semibold text-[12px] text-navy-mid uppercase">What Can Be Protected</span></div>
          <h2 class="font-semibold text-[clamp(28px,4vw,64px)] leading-[1.15] mb-4" :style="{ background: GRADIENT_03, '-webkit-background-clip': 'text', '-webkit-text-fill-color': 'transparent' }">文字、图片、视频、文件资料，都可以建立链上凭证</h2>
          <p class="text-[16px] max-sm:text-[14px] text-muted leading-[1.6] max-w-[790px]">只要需要证明来源、时间、内容、权属或业务使用场景，都可以提前留痕，形成后续可核验的数字证据。</p>
        </div>
        <div class="grid grid-cols-3 max-md:grid-cols-1 gap-4">
          <article v-for="g in protectGroups" :key="g.title" class="bg-bg-card border border-border-light rounded-lg p-[31px] hover:shadow-md transition-shadow">
            <h3 class="font-semibold text-[24px] text-ink mb-6">{{ g.title }}</h3>
            <div class="flex flex-wrap gap-2.5">
              <span v-for="t in g.tags" :key="t" class="inline-flex items-center h-9 px-3 rounded text-[13px] text-blue-mid bg-blue-pale/30 font-medium whitespace-nowrap">{{ t }}</span>
            </div>
          </article>
        </div>
      </div>
    </section>

    <!-- Section 3: 保护方案 -->
    <section class="px-[128px] max-lg:px-8 max-sm:px-4 py-[80px] max-sm:py-10 bg-bg-card">
      <div class="max-w-[1240px] mx-auto flex flex-col gap-14">
        <div>
          <div class="flex items-center gap-3 mb-4"><img src="/assets/标题装饰（右边）.svg" alt="" class="h-10 w-auto opacity-60" /><span class="font-semibold text-[12px] text-navy-mid uppercase">Protection Services</span></div>
          <h2 class="font-semibold text-[clamp(28px,4vw,64px)] leading-[1.15]" :style="{ background: GRADIENT_03, '-webkit-background-clip': 'text', '-webkit-text-fill-color': 'transparent' }">我们提供的不只是"上链"，而是一套作品可信保护方案</h2>
        </div>
        <div class="grid grid-cols-4 max-lg:grid-cols-2 max-sm:grid-cols-1 gap-4">
          <article v-for="s in services" :key="s.title" class="bg-white border border-border-light rounded-lg p-6 hover:shadow-md transition-shadow flex flex-col gap-4">
            <h3 class="font-semibold text-[20px] text-ink">{{ s.title }}</h3>
            <p class="text-[14px] text-muted leading-[1.6] flex-1">{{ s.desc }}</p>
            <img v-if="s.logo" :src="s.logo" alt="" class="h-12 w-auto object-contain mt-auto" />
          </article>
        </div>
      </div>
    </section>

    <!-- Section 4: 作品公开之前 -->
    <section class="px-[128px] max-lg:px-8 max-sm:px-4 py-[80px] max-sm:py-10 bg-white">
      <div class="max-w-[1240px] mx-auto flex max-lg:flex-col gap-4">
        <div class="w-[480px] max-lg:w-full bg-bg-card rounded-lg p-[32px] flex flex-col gap-4 shrink-0">
          <h3 class="font-semibold text-[24px] text-ink leading-[1.3]">作品公开之前，先把证据留住</h3>
          <p class="text-[14px] text-muted leading-[1.6]">内容可以被传播，来源更要能证明。存证的意义，是让文字、图片、视频、设计稿和数字作品在被发布、参赛、授权和交易之前，先拥有一份可信的身份凭证。</p>
          <img src="/assets/figma/imgTechCloud.png" alt="" class="w-full h-auto object-contain mt-auto opacity-60" />
        </div>
        <div class="flex-1 flex flex-col gap-4">
          <article v-for="s in beforeSteps" :key="s.num" class="bg-white border border-border-light rounded-lg p-4 flex items-start gap-4 hover:shadow-md transition-shadow">
            <span class="inline-flex items-center justify-center size-[50px] rounded-lg bg-bg-card text-[18px] font-bold text-blue-mid shrink-0">{{ s.num }}</span>
            <div><h3 class="font-semibold text-[18px] text-ink mb-1">{{ s.title }}</h3><p class="text-[13px] text-muted leading-[1.5]">{{ s.desc }}</p></div>
          </article>
        </div>
      </div>
    </section>

    <!-- Section 5: 服务流程 -->
    <section class="px-[128px] max-lg:px-8 max-sm:px-4 py-[80px] max-sm:py-10 bg-bg-card">
      <div class="max-w-[1240px] mx-auto flex flex-col gap-14">
        <div>
          <div class="flex items-center gap-3 mb-4"><img src="/assets/标题装饰（右边）.svg" alt="" class="h-10 w-auto opacity-60" /><span class="font-semibold text-[12px] text-navy-mid uppercase">Service Flow</span></div>
          <h2 class="font-semibold text-[clamp(28px,4vw,64px)] leading-[1.15] mb-4" :style="{ background: GRADIENT_03, '-webkit-background-clip': 'text', '-webkit-text-fill-color': 'transparent' }">从提交到核验，每一步都清晰可查</h2>
          <p class="text-[16px] max-sm:text-[14px] text-muted leading-[1.6] max-w-[790px]">围绕内容提交、文件指纹、链上记录、凭证生成和后续使用，形成完整的存证闭环。</p>
        </div>
        <div class="grid grid-cols-5 max-lg:grid-cols-3 max-sm:grid-cols-1 gap-4">
          <article v-for="f in flowSteps" :key="f.num" class="bg-white border border-border-light rounded-lg p-6 hover:shadow-md transition-shadow flex flex-col gap-3">
            <span class="inline-flex items-center justify-center size-[42px] rounded bg-bg-card text-[16px] font-bold text-blue-mid">{{ f.num }}</span>
            <h3 class="font-semibold text-[18px] text-ink">{{ f.title }}</h3>
            <p class="text-[14px] text-muted leading-[1.6] flex-1">{{ f.desc }}</p>
          </article>
        </div>
      </div>
    </section>

    <!-- Section 6: CTA -->
    <section class="px-[128px] max-lg:px-8 max-sm:px-4 py-[90px] max-sm:py-12 bg-white">
      <div class="max-w-[1240px] mx-auto flex max-lg:flex-col items-center max-lg:items-start justify-between gap-8">
        <div class="max-w-[780px]">
          <h2 class="font-semibold text-[clamp(28px,4vw,64px)] leading-[1.15] text-ink mb-4">让作品先有凭证，再进入展示、参赛和授权。</h2>
          <p class="text-[16px] max-sm:text-[14px] text-muted leading-[1.6]">对原创内容来说，真正的风险不是没人看见，而是被看见之后无法证明来源。现在开始为文字、图片、视频和数字作品建立链上存证，让每一次发布、参赛和授权都有据可查。</p>
        </div>
        <button @click="goCertify" class="inline-flex items-center gap-2 h-14 px-6 rounded-xl text-[16px] font-semibold text-white hover:opacity-90 transition-opacity shrink-0 max-sm:w-full max-sm:justify-center"
          :style="{ background: GRADIENT_03 }">开始存证<svg class="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 17L17 7M7 7h10v10"/></svg></button>
      </div>
    </section>
  </div>
</template>

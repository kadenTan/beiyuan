<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { register } from '@/api/auth.js'

const router = useRouter()
const registerForm = reactive({ phone: '', password: '', confirmPassword: '' })
const registerErrors = reactive({ phone: '', password: '', confirmPassword: '', api: '' })
const registerAgreed = ref(false)
const registerSuccess = ref(false)
const panExpanded = ref(true)

function validate() {
  registerErrors.phone = !registerForm.phone ? '请输入手机号' : ''
  registerErrors.password = !registerForm.password ? '请输入至少6位密码' : ''
  registerErrors.confirmPassword = registerForm.password !== registerForm.confirmPassword ? '两次密码不一致' : ''
  return !registerErrors.phone && !registerErrors.password && !registerErrors.confirmPassword
}

async function handleRegister() {
  if (!registerAgreed.value) { registerErrors.api = '请阅读并同意相关协议'; return }
  if (!validate()) return
  registerErrors.api = ''
  const res = await register({ phone: registerForm.phone, password: registerForm.password, confirmPassword: registerForm.confirmPassword })
  if (res.success) {
    registerSuccess.value = true
    localStorage.setItem('beiyuan_user', JSON.stringify({ name: '阿圆', phone: registerForm.phone }))
    setTimeout(() => router.push({ name: 'home' }), 1500)
  } else {
    registerErrors.api = res.message
  }
}
</script>

<template>
  <div class="min-h-screen bg-bg-card flex flex-col">
    <!-- Header -->
    <header class="bg-white flex items-center px-[54px] max-lg:px-6 max-sm:px-4 h-[88px] max-sm:h-[64px] w-full border-b border-white">
      <button @click="router.push({ name: 'home' })" class="flex items-center gap-2 h-10 px-[18px] rounded-[40px] text-[14px] text-ink hover:bg-bg-card transition-colors">
        <svg class="size-[15px]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 12H5m0 0l7 7m-7-7l7-7"/></svg>
        返回
      </button>
      <router-link to="/" class="flex items-center shrink-0">
        <img src="/assets/logo.png" alt="" class="h-9 w-auto rounded-md" />
      </router-link>
    </header>

    <!-- 主内容 -->
    <div class="flex-1 flex flex-col items-center justify-center px-6 pb-20 pt-12">
      <div class="bg-white rounded-xl max-w-[510px] w-full px-8 py-9 max-sm:px-5 max-sm:py-6">
        <p class="font-semibold text-[32px] text-blue text-center mb-8">注册</p>

        <form @submit.prevent="handleRegister" class="flex flex-col gap-4">
          <!-- 手机号 -->
          <div class="flex flex-col gap-1.5">
            <label class="font-semibold text-[14px] text-ink">
              手机号 <span class="text-accent">*</span>
            </label>
            <input v-model="registerForm.phone" type="text" placeholder="请输入账户名"
              class="w-full h-12 rounded-md border px-3 py-2 text-[14px] outline-none transition-colors"
              :class="registerErrors.phone ? 'border-accent' : 'border-[#ddd] focus:border-blue'" />
            <p v-if="registerErrors.phone" class="text-[12px] text-accent">{{ registerErrors.phone }}</p>
          </div>

          <!-- 密码 -->
          <div class="flex flex-col gap-1.5">
            <label class="font-semibold text-[14px] text-ink">
              密码 <span class="text-accent">*</span>
            </label>
            <input v-model="registerForm.password" type="password" placeholder="请输入密码（至少6位）"
              class="w-full h-12 rounded-md border px-3 py-2 text-[14px] outline-none transition-colors"
              :class="registerErrors.password ? 'border-accent' : 'border-[#ddd] focus:border-blue'" />
            <p v-if="registerErrors.password" class="text-[12px] text-accent">{{ registerErrors.password }}</p>
          </div>

          <!-- 确认密码 -->
          <div class="flex flex-col gap-1.5">
            <label class="font-semibold text-[14px] text-ink">
              确认密码 <span class="text-accent">*</span>
            </label>
            <input v-model="registerForm.confirmPassword" type="password" placeholder="请再次输入密码"
              class="w-full h-12 rounded-md border px-3 py-2 text-[14px] outline-none transition-colors"
              :class="registerErrors.confirmPassword ? 'border-accent' : 'border-[#ddd] focus:border-blue'" />
            <p v-if="registerErrors.confirmPassword" class="text-[12px] text-accent">{{ registerErrors.confirmPassword }}</p>
          </div>

          <!-- 网盘绑定卡片（含权益展开/收起） -->
          <div class="rounded-lg border border-blue-pale bg-gradient-to-br from-white to-bg-card overflow-hidden">
            <!-- 头部：标题 + 二维码 + 展开按钮 -->
            <div class="p-4 flex flex-col gap-3">
              <div class="flex items-center justify-between">
                <p class="font-semibold text-[14px] text-navy">绑定网盘（推荐）</p>
                <span class="text-[11px] text-muted bg-bg-card rounded-full px-2 py-0.5">可跳过</span>
              </div>
              <div class="flex items-center gap-4">
                <div class="size-[96px] rounded-lg overflow-hidden border border-border-light shrink-0">
                  <img src="/assets/cQR.png" alt="网盘扫码" class="size-full object-cover" />
                </div>
                <p class="text-[12px] text-muted leading-[1.6]">扫码绑定即可获得 100G 云端存储容量，解锁文件管理服务</p>
              </div>
            </div>

            <!-- 分割线 + 展开/收起按钮 -->
            <button @click="panExpanded = !panExpanded"
              class="w-full flex items-center justify-center gap-1.5 py-2 text-[12px] text-blue hover:bg-bg-card transition-colors border-t border-blue-pale/40">
              <span>{{ panExpanded ? '收起权益说明' : '展开权益说明' }}</span>
              <svg class="size-3 transition-transform" :class="{ 'rotate-180': panExpanded }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
              </svg>
            </button>

            <!-- 权益详情（可折叠） -->
            <div v-if="panExpanded" class="px-4 pb-4 flex flex-col gap-4 border-t border-blue-pale/40 pt-4">
              <div class="flex gap-3">
                <div class="w-7 h-7 rounded-full bg-blue/10 flex items-center justify-center shrink-0 mt-0.5">
                  <svg class="size-3.5 text-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 7v10c0 2 1 3 3 3h10c2 0 3-1 3-3V7M4 7c0-2 1-3 3-3h10c2 0 3 1 3 3M4 7h16M9 11h6"/></svg>
                </div>
                <div>
                  <p class="font-semibold text-[13px] text-ink">绑定即赠送 100G 永久云端储存容量</p>
                  <p class="text-[12px] text-muted mt-0.5 leading-[1.5]">平台内考生学习资料、电子证书、报名订单、考试档案均可云端存放，不占用本地电脑硬盘。</p>
                </div>
              </div>
              <div class="flex gap-3">
                <div class="w-7 h-7 rounded-full bg-blue/10 flex items-center justify-center shrink-0 mt-0.5">
                  <svg class="size-3.5 text-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                </div>
                <div>
                  <p class="font-semibold text-[13px] text-ink">全量云端自动备份，杜绝数据丢失</p>
                  <p class="text-[12px] text-muted mt-0.5 leading-[1.5]">系统定时同步全部业务文件，电脑损坏、文件误删都不用担心档案遗失。</p>
                </div>
              </div>
              <div class="flex gap-3">
                <div class="w-7 h-7 rounded-full bg-blue/10 flex items-center justify-center shrink-0 mt-0.5">
                  <svg class="size-3.5 text-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
                </div>
                <div>
                  <p class="font-semibold text-[13px] text-ink">解锁批量高效办公核心功能</p>
                  <p class="text-[12px] text-muted mt-0.5 leading-[1.5]">批量导出考生信息、打包证书、多设备文件同步，几十万条数据一键整理。</p>
                </div>
              </div>
              <div class="flex gap-3">
                <div class="w-7 h-7 rounded-full bg-blue/10 flex items-center justify-center shrink-0 mt-0.5">
                  <svg class="size-3.5 text-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
                </div>
                <div>
                  <p class="font-semibold text-[13px] text-ink">独立加密私有云，合规保护考生隐私</p>
                  <p class="text-[12px] text-muted mt-0.5 leading-[1.5]">专属独立云存储空间，文件加密隔离，仅登录本人账号才可查看下载。</p>
                </div>
              </div>
              <div class="p-3 rounded-lg bg-bg-card">
                <p class="font-semibold text-[13px] text-navy mb-1">操作指引</p>
                <p class="text-[12px] text-muted leading-[1.6]">请使用网盘客户端扫描上方二维码完成绑定，绑定成功立即生效 100G 存储权益，解锁平台全部文件管理服务。</p>
              </div>
            </div>
          </div>

          <p v-if="registerErrors.api" class="text-[13px] text-accent">{{ registerErrors.api }}</p>

          <!-- 协议 -->
          <div class="flex flex-col gap-2">
            <label class="flex items-center gap-1.5 cursor-pointer">
              <input v-model="registerAgreed" type="checkbox" class="size-4 rounded accent-blue shrink-0" />
              <span class="text-[14px] text-ink/65">我已阅读并同意注册表示同意</span>
            </label>
            <p class="text-[14px] text-blue leading-[22px]">
              <span class="cursor-pointer hover:underline">《用户协议》</span>
              <span class="cursor-pointer hover:underline ml-1">《平台隐私政策》</span>
              <span class="cursor-pointer hover:underline ml-1">《产品服务协议》</span>
            </p>
          </div>

          <!-- 按钮 -->
          <button type="submit" class="w-full h-12 rounded-[10px] text-[16px] font-semibold text-white hover:opacity-90 transition-all mt-1"
            :class="registerSuccess ? '!bg-green-500' : ''"
            :style="registerSuccess ? {} : { background: 'linear-gradient(-13deg, #214fd6 15%, #5383eb 66%, #b5edff 109%)' }">
            {{ registerSuccess ? '注册成功，正在跳转...' : '完成注册' }}
          </button>

          <p class="text-center text-[13px] text-muted">
            已有账号？
            <router-link to="/auth" class="text-blue hover:underline">去登录</router-link>
          </p>
        </form>
      </div>
    </div>
  </div>
</template>

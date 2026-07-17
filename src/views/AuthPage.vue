<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { login } from '@/api/auth.js'

const router = useRouter()
const loginForm = reactive({ phone: '', password: '' })
const loginErrors = reactive({ phone: '', password: '', api: '' })

function validateLogin() {
  loginErrors.phone = !loginForm.phone ? '请输入手机号' : ''
  loginErrors.password = !loginForm.password ? '请输入密码' : ''
  return !loginErrors.phone && !loginErrors.password
}

async function handleLogin() {
  if (!validateLogin()) return
  loginErrors.api = ''
  const res = await login(loginForm.phone, loginForm.password)
  if (res.success) {
    localStorage.setItem('beiyuan_user', JSON.stringify({ name: '阿圆', phone: loginForm.phone }))
    router.push({ name: 'home' })
  } else {
    loginErrors.api = res.message
  }
}

function handlePanLogin() {
  localStorage.setItem('beiyuan_user', JSON.stringify({ name: '网盘用户', pan: true }))
  router.push({ name: 'home' })
}
</script>

<template>
  <div class="min-h-screen bg-bg-card flex flex-col">
    <!-- Header -->
    <header class="bg-white flex items-center px-[54px] max-lg:px-6 max-sm:px-4 h-[88px] max-sm:h-[64px] w-full border-b border-white">
      <button @click="router.back()" class="flex items-center gap-2 h-10 px-[18px] rounded-[40px] text-[14px] text-ink hover:bg-bg-card transition-colors">
        <svg class="size-[15px]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 12H5m0 0l7 7m-7-7l7-7"/></svg>
        返回
      </button>
      <router-link to="/" class="flex items-center shrink-0">
        <img src="/assets/logo.png" alt="" class="h-9 w-auto rounded-md" />
      </router-link>
    </header>

    <!-- 主内容：左右两栏布局 -->
    <div class="flex-1 flex items-center justify-center px-6 pb-20 pt-12">
      <div class="bg-white rounded-xl max-w-[780px] w-full flex max-sm:flex-col pb-10 pt-9 px-8 max-sm:px-5 max-sm:py-6 gap-8">

        <!-- 左：网盘扫码登录 -->
        <div class="flex-1 flex flex-col items-center pt-6 gap-4">
          <div class="w-full pb-px">
            <div class="h-10 flex items-center justify-center">
              <span class="font-semibold text-[14px] text-blue">网盘扫码登录</span>
            </div>
          </div>
          <div class="flex flex-col items-center gap-4 pt-5">
            <img src="/assets/cQR.png" alt="网盘扫码" class="size-[240px] max-sm:size-[200px] object-cover rounded" />
          </div>
          <p class="text-[13px] text-muted">请使用网盘客户端扫描二维码</p>
          <button @click="handlePanLogin" class="text-[13px] text-blue hover:underline">模拟扫码登录</button>
        </div>

        <!-- 右：手机号登录 -->
        <div class="w-[406px] max-sm:w-full shrink-0 flex flex-col pt-6">
          <div class="w-full pb-px">
            <div class="h-10 flex items-center">
              <span class="font-semibold text-[14px] text-blue">手机号登录</span>
            </div>
          </div>

          <form @submit.prevent="handleLogin" class="flex flex-col gap-5 pt-5">
            <div class="flex flex-col gap-1.5">
              <label class="font-semibold text-[14px] text-ink">账号</label>
              <input v-model="loginForm.phone" type="text" placeholder="请输入手机号"
                class="w-full h-12 min-h-[48px] rounded-lg border border-[#ddd] px-[15px] text-[14px] outline-none focus:border-blue transition-colors"
                :class="loginErrors.phone ? '!border-accent' : ''" />
              <p v-if="loginErrors.phone" class="text-[12px] text-accent">{{ loginErrors.phone }}</p>
            </div>
            <div class="flex flex-col gap-1.5">
              <label class="font-semibold text-[14px] text-ink">密码</label>
              <input v-model="loginForm.password" type="password" placeholder="请输入密码"
                class="w-full h-12 min-h-[48px] rounded-lg border border-[#ddd] px-[15px] text-[14px] outline-none focus:border-blue transition-colors"
                :class="loginErrors.password ? '!border-accent' : ''" />
              <p v-if="loginErrors.password" class="text-[12px] text-accent">{{ loginErrors.password }}</p>
            </div>
            <p v-if="loginErrors.api" class="text-[13px] text-accent">{{ loginErrors.api }}</p>
            <p class="text-[12px] text-ink/25">演示账号：13666202845 / admin123</p>

            <button type="submit" class="w-full min-h-[48px] rounded-[10px] text-[16px] font-semibold text-white hover:opacity-90 transition-opacity"
              style="background: linear-gradient(-13.3deg, #214fd6 15.6%, #5383eb 65.9%, #b5edff 109.1%)">登录</button>

            <div class="flex items-center justify-between text-[12px] font-semibold">
              <router-link to="/forgot" class="text-blue cursor-pointer hover:underline">忘记密码</router-link>
              <router-link to="/register" class="text-ink/35 hover:text-blue transition-colors">立即注册</router-link>
            </div>
          </form>
        </div>

      </div>
    </div>
  </div>
</template>

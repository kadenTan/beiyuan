<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { sendSmsCode } from '@/api/auth.js'

const router = useRouter()
const step = ref(1) // 1:输入手机号发验证码, 2:填验证码+新密码, 3:成功
const form = reactive({ phone: '', code: '', password: '', confirmPassword: '' })
const errors = reactive({ phone: '', code: '', password: '', confirmPassword: '', api: '' })
const sending = ref(false)
const countdown = ref(0)

async function doSendCode() {
  errors.phone = !form.phone ? '请输入手机号' : ''
  if (errors.phone) return

  errors.api = ''
  const res = await sendSmsCode(form.phone)
  if (res.success) {
    sending.value = true
    countdown.value = 60
    const timer = setInterval(() => {
      countdown.value--
      if (countdown.value <= 0) { clearInterval(timer); sending.value = false }
    }, 1000)
  } else {
    errors.api = res.message || '发送失败，请稍后重试'
  }
}

function toStep2() {
  errors.phone = !form.phone ? '请输入手机号' : ''
  if (errors.phone) return
  step.value = 2
  doSendCode()
}

function validateStep2() {
  errors.code = !form.code ? '请输入验证码' : ''
  errors.password = !form.password ? '请输入新密码' : ''
  errors.confirmPassword = form.password !== form.confirmPassword ? '两次密码不一致' : ''
  return !errors.code && !errors.password && !errors.confirmPassword
}

function handleReset() {
  if (!validateStep2()) return
  step.value = 3
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

    <div class="flex-1 flex items-center justify-center px-6 pb-20 pt-12">
      <div class="bg-white rounded-xl max-w-[470px] w-full px-8 py-9 max-sm:px-5 max-sm:py-6">

        <!-- Step 1: 手机号 + 发送验证码 -->
        <template v-if="step === 1">
          <p class="font-semibold text-[32px] text-blue text-center mb-8">忘记密码</p>
          <form @submit.prevent="toStep2" class="flex flex-col gap-5">
            <div class="flex flex-col gap-1.5">
              <label class="font-semibold text-[14px] text-ink">手机号</label>
              <div class="flex gap-3">
                <input v-model="form.phone" type="text" placeholder="请输入已注册的手机号"
                  class="flex-1 h-12 min-h-[48px] rounded-lg border border-[#ddd] px-[15px] text-[14px] outline-none focus:border-blue transition-colors" />
                <button type="button" @click="doSendCode" :disabled="sending"
                  class="shrink-0 h-12 px-4 rounded-lg text-[13px] font-semibold whitespace-nowrap border border-blue text-blue hover:bg-blue/5 disabled:opacity-40 transition-colors">
                  {{ sending ? `${countdown}s 后重新发送` : '发送验证码' }}
                </button>
              </div>
              <p v-if="errors.phone" class="text-[12px] text-accent">{{ errors.phone }}</p>
            </div>
            <p v-if="errors.api" class="text-[13px] text-accent">{{ errors.api }}</p>
            <div class="flex flex-col gap-1.5">
              <label class="font-semibold text-[14px] text-ink">验证码</label>
              <input v-model="form.code" type="text" placeholder="请输入短信验证码"
                class="w-full h-12 min-h-[48px] rounded-lg border border-[#ddd] px-[15px] text-[14px] outline-none focus:border-blue transition-colors" />
              <p v-if="errors.code" class="text-[12px] text-accent">{{ errors.code }}</p>
            </div>
            <p class="text-[12px] text-ink/25">验证码已发送至 {{ form.phone || '您的手机' }}</p>
            <button type="submit" class="w-full min-h-[48px] rounded-[10px] text-[16px] font-semibold text-white hover:opacity-90 transition-opacity"
              style="background: linear-gradient(-13.3deg, #214fd6 15.6%, #5383eb 65.9%, #b5edff 109.1%)">下一步</button>
            <router-link to="/auth" class="text-center text-[13px] text-blue hover:underline">返回登录</router-link>
          </form>
        </template>

        <!-- Step 2: 验证码 + 新密码 + 确认密码 -->
        <template v-if="step === 2">
          <p class="font-semibold text-[32px] text-blue text-center mb-8">重置密码</p>
          <form @submit.prevent="handleReset" class="flex flex-col gap-5">
            <div class="flex flex-col gap-1.5">
              <label class="font-semibold text-[14px] text-ink">验证码</label>
              <div class="flex gap-3">
                <input v-model="form.code" type="text" placeholder="请输入验证码"
                  class="flex-1 h-12 min-h-[48px] rounded-lg border border-[#ddd] px-[15px] text-[14px] outline-none focus:border-blue transition-colors" />
                <button type="button" @click="doSendCode" :disabled="sending"
                  class="shrink-0 h-12 px-4 rounded-lg text-[13px] font-semibold whitespace-nowrap border border-blue text-blue hover:bg-blue/5 disabled:opacity-40 transition-colors">
                  {{ sending ? `${countdown}s` : '重新发送' }}
                </button>
              </div>
              <p v-if="errors.code" class="text-[12px] text-accent">{{ errors.code }}</p>
            </div>
            <div class="flex flex-col gap-1.5">
              <label class="font-semibold text-[14px] text-ink">新密码</label>
              <input v-model="form.password" type="password" placeholder="请输入新密码（至少6位）"
                class="w-full h-12 min-h-[48px] rounded-lg border border-[#ddd] px-[15px] text-[14px] outline-none focus:border-blue transition-colors" />
              <p v-if="errors.password" class="text-[12px] text-accent">{{ errors.password }}</p>
            </div>
            <div class="flex flex-col gap-1.5">
              <label class="font-semibold text-[14px] text-ink">确认新密码</label>
              <input v-model="form.confirmPassword" type="password" placeholder="请再次输入新密码"
                class="w-full h-12 min-h-[48px] rounded-lg border border-[#ddd] px-[15px] text-[14px] outline-none focus:border-blue transition-colors" />
              <p v-if="errors.confirmPassword" class="text-[12px] text-accent">{{ errors.confirmPassword }}</p>
            </div>
            <p v-if="errors.api" class="text-[13px] text-accent">{{ errors.api }}</p>
            <button type="submit" class="w-full min-h-[48px] rounded-[10px] text-[16px] font-semibold text-white hover:opacity-90 transition-opacity"
              style="background: linear-gradient(-13.3deg, #214fd6 15.6%, #5383eb 65.9%, #b5edff 109.1%)">重置密码</button>
            <router-link to="/auth" class="text-center text-[13px] text-blue hover:underline">返回登录</router-link>
          </form>
        </template>

        <!-- Step 3: 成功 -->
        <div v-if="step === 3" class="flex flex-col items-center gap-5 py-10">
          <svg class="size-20 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          <p class="font-semibold text-[20px] text-ink">密码重置成功</p>
          <p class="text-[14px] text-muted">请使用新密码重新登录</p>
          <router-link to="/auth" class="inline-flex items-center justify-center w-full min-h-[48px] rounded-[10px] text-[16px] font-semibold text-white hover:opacity-90 transition-opacity no-underline"
            style="background: linear-gradient(-13.3deg, #214fd6 15.6%, #5383eb 65.9%, #b5edff 109.1%)">返回登录</router-link>
        </div>

      </div>
    </div>
  </div>
</template>

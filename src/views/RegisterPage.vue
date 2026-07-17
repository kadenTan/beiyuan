<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { register } from '@/api/auth.js'

const router = useRouter()
const registerForm = reactive({ phone: '', password: '', confirmPassword: '' })
const registerErrors = reactive({ phone: '', password: '', confirmPassword: '', api: '' })
const registerAgreed = ref(false)
const registerSuccess = ref(false)

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
      <button @click="router.push({ name: 'auth' })" class="flex items-center gap-2 h-10 px-[18px] rounded-[40px] text-[14px] text-ink hover:bg-bg-card transition-colors">
        <svg class="size-[15px]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 12H5m0 0l7 7m-7-7l7-7"/></svg>
        返回
      </button>
      <router-link to="/" class="flex items-center shrink-0">
        <img src="/assets/logo.png" alt="" class="h-9 w-auto rounded-md" />
      </router-link>
    </header>

    <!-- 主内容 -->
    <div class="flex-1 flex items-center justify-center px-6 pb-20 pt-12">
      <div class="bg-white rounded-xl max-w-[470px] w-full px-8 py-9 max-sm:px-5 max-sm:py-6">
        <p class="font-semibold text-[32px] text-blue text-center mb-8">注册</p>

        <form @submit.prevent="handleRegister" class="flex flex-col gap-4">
          <!-- 手机号 -->
          <div class="flex flex-col gap-1.5">
            <label class="font-semibold text-[14px] text-ink">手机号</label>
            <input v-model="registerForm.phone" type="text" placeholder="请输入账户名"
              class="w-full h-12 rounded-md border px-3 py-2 text-[14px] outline-none transition-colors"
              :class="registerErrors.phone ? 'border-accent' : 'border-[#ddd] focus:border-blue'" />
            <p v-if="registerErrors.phone" class="text-[12px] text-accent">{{ registerErrors.phone }}</p>
          </div>

          <!-- 密码 -->
          <div class="flex flex-col gap-1.5">
            <label class="font-semibold text-[14px] text-ink">密码</label>
            <input v-model="registerForm.password" type="password" placeholder="请输入密码（至少6位）"
              class="w-full h-12 rounded-md border px-3 py-2 text-[14px] outline-none transition-colors"
              :class="registerErrors.password ? 'border-accent' : 'border-[#ddd] focus:border-blue'" />
            <p v-if="registerErrors.password" class="text-[12px] text-accent">{{ registerErrors.password }}</p>
          </div>

          <!-- 确认密码 -->
          <div class="flex flex-col gap-1.5">
            <label class="font-semibold text-[14px] text-ink">确认密码</label>
            <input v-model="registerForm.confirmPassword" type="password" placeholder="请再次输入密码"
              class="w-full h-12 rounded-md border px-3 py-2 text-[14px] outline-none transition-colors"
              :class="registerErrors.confirmPassword ? 'border-accent' : 'border-[#ddd] focus:border-blue'" />
            <p v-if="registerErrors.confirmPassword" class="text-[12px] text-accent">{{ registerErrors.confirmPassword }}</p>
          </div>

          <!-- 绑定网盘 -->
          <div class="flex flex-col gap-3">
            <p class="font-semibold text-[14px] text-ink">绑定网盘</p>
            <div class="size-[128px] rounded overflow-hidden border border-[#ddd]">
              <img src="/assets/cQR.png" alt="网盘扫码" class="size-full object-cover" />
            </div>
            <p class="text-[12px] text-muted">请使用网盘客户端扫描二维码完成绑定</p>
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

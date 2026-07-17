<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const menuOpen = ref(false)
const userDropdown = ref(false)

// 登录态
const user = ref(null)

onMounted(() => {
  const saved = localStorage.getItem('beiyuan_user')
  if (saved) {
    try { user.value = JSON.parse(saved) } catch {}
  }
  document.addEventListener('click', onClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', onClickOutside)
})

function onClickOutside(e) {
  if (userDropdown.value && !e.target.closest('.user-dropdown-area')) {
    userDropdown.value = false
  }
}

function doLogin(name = '微信用户') {
  user.value = { name, wechat: true }
  localStorage.setItem('beiyuan_user', JSON.stringify(user.value))
}

function doLogout() {
  user.value = null
  userDropdown.value = false
  localStorage.removeItem('beiyuan_user')
  router.push({ name: 'home' })
}

function goAuth() {
  closeMenu()
  router.push({ name: 'auth' })
}

defineExpose({ doLogin })

const navItems = [
  ['首页', '/'],
  ['赛事活动', '/events'],
  ['课程中心', '/courses'],
  ['文创商城', '/mall'],
  ['存证中心', '/evidence'],
  ['数字展厅', '/exhibition'],
  ['商务合作', '/alliance'],
  ['资讯中心', '/news'],
  ['人才库', '/talent'],
  ['关于我们', '/about'],
]

function isActive(href) {
  if (href === '/') return route.path === '/'
  return route.path.startsWith(href)
}

function closeMenu(href) {
  if (typeof href === 'string') {
    router.push(href)
  }
  menuOpen.value = false
}
</script>

<template>
  <header
    class="fixed top-0 left-0 z-50 flex items-center h-[88px] max-md:h-[64px] px-[54px] max-lg:px-6 max-md:px-4 w-full border-b border-white/10"
    style="background: linear-gradient(180deg, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.7) 100%); backdrop-filter: blur(40px) saturate(1.8) brightness(1.05); -webkit-backdrop-filter: blur(40px) saturate(1.8) brightness(1.05); box-shadow: 0 1px 0 0 rgba(255,255,255,0.5) inset, 0 12px 40px 0 rgba(0,0,0,0.1);"
  >
    <!-- Logo -->
    <router-link to="/" class="flex items-center shrink-0" @click="closeMenu">
      <img src="/assets/logo.png" alt="贝元民族影像智创平台" class="h-9 w-auto rounded-md" />
    </router-link>

    <!-- Desktop Nav — 仅在 lg+ 显示 -->
    <nav class="hidden lg:flex flex-1 gap-[28px] items-center justify-center min-w-0 px-[40px]" aria-label="主导航">
      <a
        v-for="[label, href] in navItems"
        :key="href"
        :href="'/#/' + href.replace(/^\//, '')"
        class="shrink-0 border-b-2 border-solid py-[21px] text-[14px] whitespace-nowrap no-underline cursor-pointer"
        :class="isActive(href) ? 'font-semibold text-navy border-blue' : 'font-light text-ink border-transparent'"
        @click="closeMenu"
      >{{ label }}</a>
    </nav>

    <!-- Desktop 用户区 — 仅在 lg+ 显示 -->
    <div class="hidden lg:flex items-center shrink-0">
      <!-- 未登录 -->
      <a v-if="!user" href="/#/auth" class="no-underline cursor-pointer flex items-center justify-center h-[40px] px-[16.6px] py-[0.6px] rounded-[31px] border-[0.6px] border-ink text-[14px] text-ink whitespace-nowrap">登录/注册</a>

      <!-- 已登录：微信名 + dropdown -->
      <div v-else class="relative user-dropdown-area inline-flex">
        <div class="inline-flex items-center h-[40px] rounded-[31px] border-[0.6px] border-ink whitespace-nowrap hover:bg-bg-card transition-colors">
          <a href="/#/member" class="flex items-center gap-2 h-full pl-4 pr-1 text-[14px] text-ink no-underline cursor-pointer">
            <img src="/assets/logo.png" alt="" class="size-5 rounded-full" />
            <span>{{ user.name }}</span>
          </a>
          <button
            @click="userDropdown = !userDropdown"
            class="flex items-center justify-center size-[40px] rounded-full transition-colors"
          >
            <svg class="size-3 transition-transform" :class="{ 'rotate-180': userDropdown }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
            </svg>
          </button>
        </div>
        <Transition name="drop">
          <div v-if="userDropdown" class="absolute right-0 top-[48px] w-36 bg-white rounded-lg shadow-xl border border-border-light py-1 z-50">
            <a href="/#/member" class="block w-full text-left px-4 py-2.5 text-[14px] text-ink hover:bg-bg-card transition-colors no-underline cursor-pointer" @click="userDropdown=false">个人中心</a>
            <button @click="doLogout" class="w-full text-left px-4 py-2.5 text-[14px] text-ink hover:bg-bg-card transition-colors">退出登录</button>
          </div>
        </Transition>
      </div>
    </div>

    <!-- Mobile Hamburger — lg 以下显示 -->
    <button
      class="lg:hidden ml-auto p-2 text-ink"
      @click="menuOpen = !menuOpen"
      aria-label="菜单"
    >
      <svg class="size-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path v-if="!menuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 6l12 12M18 6L6 18" />
      </svg>
    </button>
  </header>

  <!-- Mobile Menu Overlay -->
  <Transition name="menu">
    <div
      v-if="menuOpen"
      class="fixed inset-0 z-40 lg:hidden"
      @click="closeMenu"
    >
      <div class="absolute inset-0 bg-black/40 backdrop-blur-sm" @click="closeMenu()" />
      <nav
        class="absolute top-0 right-0 w-[280px] max-sm:w-full h-full flex flex-col"
        style="background: linear-gradient(180deg, #09103f 0%, #182aa5 100%)"
        @click.stop
      >
        <!-- 菜单头部 -->
        <div class="flex items-center justify-between px-6 py-5 border-b border-white/10">
          <span class="font-semibold text-[18px] text-white">导航菜单</span>
          <button @click="closeMenu" class="p-1 text-white/60 hover:text-white transition-colors" aria-label="关闭菜单">
            <svg class="size-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>

        <!-- 导航链接 -->
        <div class="flex-1 overflow-y-auto py-4">
          <a
            v-for="[label, href] in navItems"
            :key="href"
            class="flex items-center px-6 py-[14px] text-[15px] border-l-[3px] border-transparent no-underline cursor-pointer transition-all duration-200 hover:border-gold/60 hover:bg-white/5"
            :class="isActive(href)
              ? 'font-semibold text-gold-pale border-gold bg-white/8'
              : 'font-light text-white/80'"
            @click.prevent="closeMenu(href)"
          >
            <span
              v-if="isActive(href)"
              class="inline-block w-[6px] h-[6px] rounded-full mr-[10px] shrink-0"
              style="background: linear-gradient(135deg, #faedc5, #dbbd78)"
            />
            <span v-else class="inline-block w-4 mr-[10px] shrink-0" />
            {{ label }}
          </a>
        </div>

        <!-- 底部 -->
        <div class="px-6 py-5 border-t border-white/10">
          <template v-if="!user">
            <a
              href="/#/auth"
              class="flex items-center justify-center h-[44px] rounded-[8px] text-[15px] font-semibold text-white no-underline cursor-pointer transition-colors"
              style="background: linear-gradient(135deg, #214fd6, #5383eb)"
              @click.prevent="closeMenu('/auth')"
            >登录 / 注册</a>
          </template>
          <div v-else class="flex flex-col gap-3">
            <div class="flex items-center justify-between px-1">
              <div class="flex items-center gap-3">
                <img src="/assets/logo.png" alt="" class="size-8 rounded-full" />
                <div>
                  <p class="text-[15px] font-medium text-white">{{ user.name }}</p>
                  <p class="text-[12px] text-white/50">微信登录</p>
                </div>
              </div>
              <a
                href="/#/member"
                class="text-[14px] font-medium text-gold hover:text-gold-pale no-underline cursor-pointer transition-colors"
                @click.prevent="closeMenu('/member')"
              >个人中心</a>
            </div>
            <button @click="closeMenu(); doLogout()" class="flex items-center justify-center h-[44px] rounded-[8px] text-[15px] font-medium text-white/70 border border-white/20 hover:bg-white/10 transition-colors">退出登录</button>
          </div>
        </div>
      </nav>
    </div>
  </Transition>
</template>

<style scoped>
/* 不支持的浏览器兜底 */
@supports not (backdrop-filter: blur(1px)) {
  header[style*="backdrop-filter"] {
    background: rgba(255, 255, 255, 0.94) !important;
    backdrop-filter: none !important;
    -webkit-backdrop-filter: none !important;
  }
}

.menu-enter-active,
.menu-leave-active {
  transition: opacity 0.25s ease;
}
.menu-enter-active nav,
.menu-leave-active nav {
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}
.menu-enter-from,
.menu-leave-to {
  opacity: 0;
}
.menu-enter-from nav {
  transform: translateX(100%);
}
.menu-leave-to nav {
  transform: translateX(100%);
}

.drop-enter-active,
.drop-leave-active {
  transition: opacity 0.15s ease, transform 0.15s ease;
}
.drop-enter-from,
.drop-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}
</style>

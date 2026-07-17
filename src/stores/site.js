import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useSiteStore = defineStore('site', () => {
  const nav = ref([
    ['首页', '/'],
    ['赛事中心', '/events'],
    ['课程学习', '/courses'],
    ['千校联盟', '/alliance'],
    ['虚拟展厅', '/exhibition'],
    ['文创商城', '/mall'],
    ['存证中心', '/evidence'],
    ['资讯中心', '/news'],
    ['关于我们', '/about'],
  ])

  const siteInfo = ref({
    name: '贝圆民族影像产业科创平台',
    support: '甘肃省文化和旅游厅',
    guide: '贝圆影像产业集团有限公司',
    phone: '400-6620-2845',
    address: '甘肃省兰州市城关区民族影像产业科创中心',
    email: 'service@beiyuan-aigc.com',
    icp: '陇ICP备2026008888号-1',
  })

  const isMenuOpen = ref(false)

  function toggleMenu() {
    isMenuOpen.value = !isMenuOpen.value
  }

  function closeMenu() {
    isMenuOpen.value = false
  }

  return { nav, siteInfo, isMenuOpen, toggleMenu, closeMenu }
})

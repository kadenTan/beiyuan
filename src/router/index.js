import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/HomePage.vue'),
  },
  {
    path: '/events',
    name: 'events',
    component: () => import('@/views/EventsPage.vue'),
  },
  {
    path: '/events/:id',
    name: 'event-detail',
    component: () => import('@/views/EventDetailPage.vue'),
  },
  {
    path: '/courses',
    name: 'courses',
    component: () => import('@/views/CoursesPage.vue'),
  },
  {
    path: '/alliance',
    name: 'alliance',
    component: () => import('@/views/AlliancePage.vue'),
  },
  {
    path: '/exhibition',
    name: 'exhibition',
    component: () => import('@/views/ExhibitionPage.vue'),
  },
  {
    path: '/mall',
    name: 'mall',
    component: () => import('@/views/MallPage.vue'),
  },
  {
    path: '/evidence',
    name: 'evidence',
    component: () => import('@/views/EvidencePage.vue'),
  },
  {
    path: '/news',
    name: 'news',
    component: () => import('@/views/NewsPage.vue'),
  },
  {
    path: '/news/:id',
    name: 'news-detail',
    component: () => import('@/views/NewsDetailPage.vue'),
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('@/views/AboutPage.vue'),
  },
  {
    path: '/member',
    name: 'member',
    component: () => import('@/views/MemberPage.vue'),
  },
  {
    path: '/talent',
    name: 'talent',
    component: () => import('@/views/TalentPage.vue'),
  },
  {
    path: '/auth',
    name: 'auth',
    component: () => import('@/views/AuthPage.vue'),
    meta: { layout: 'auth' },
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('@/views/RegisterPage.vue'),
    meta: { layout: 'auth' },
  },
  {
    path: '/forgot',
    name: 'forgot',
    component: () => import('@/views/ForgotPage.vue'),
    meta: { layout: 'auth' },
  },
  {
    // 404
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/views/HomePage.vue'),
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  },
})

export default router

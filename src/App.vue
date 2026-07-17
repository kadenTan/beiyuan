<script setup>
import { useRoute } from 'vue-router'
import { computed } from 'vue'
import DefaultLayout from '@/components/shell/DefaultLayout.vue'
import AuthLayout from '@/components/shell/AuthLayout.vue'

const route = useRoute()
const layout = computed(() => route.meta.layout || 'default')
</script>

<template>
  <DefaultLayout v-if="layout === 'default'">
    <router-view />
  </DefaultLayout>
  <AuthLayout v-else-if="layout === 'auth'">
    <router-view />
  </AuthLayout>
  <router-view v-else />
</template>

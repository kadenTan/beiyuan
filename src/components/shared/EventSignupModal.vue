<script setup>
import { ref } from 'vue'

const props = defineProps({
  eventName: { type: String, default: '' },
  categories: { type: Array, default: () => ['赛项一', '赛项二', '赛项三'] },
})

const emit = defineEmits(['close', 'submit'])
const selectedCategory = ref('')
const form = ref({
  name: '', phone: '', gender: '', idCard: '',
  province: '', city: '', district: '', address: '',
})

function handleSubmit() {
  emit('submit', { ...form.value, category: selectedCategory.value, event: props.eventName })
}
</script>

<template>
  <div class="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4" @click.self="emit('close')">
    <div class="bg-white rounded-[12px] overflow-auto max-h-[90vh] w-full max-w-[720px] relative flex flex-col gap-[24px] p-[38px] max-sm:p-[24px]">

      <!-- 关闭按钮 -->
      <button class="absolute right-[14px] top-[14px] size-[38px] rounded-[6px] bg-white flex items-center justify-center hover:bg-bg transition-colors" @click="emit('close')">
        <svg class="size-[24px]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 6l12 12M18 6L6 18" /></svg>
      </button>

      <!-- 标题 -->
      <div class="pt-[12px]">
        <h2 class="font-semibold text-[52px] max-sm:text-[36px] leading-[58px] text-ink">赛事报名</h2>
      </div>

      <!-- 赛事名 -->
      <p class="font-semibold text-[20px] text-navy whitespace-nowrap">
        报名赛事：{{ eventName }}
      </p>

      <!-- 赛项选择（下拉） -->
      <div class="flex flex-col gap-[12px]">
        <p class="font-semibold text-[14px] text-ink">选择赛项</p>
        <select v-model="selectedCategory"
          class="w-full h-12 rounded-lg border border-[#ddd] px-[15px] text-[14px] outline-none bg-white focus:border-blue transition-colors appearance-none"
          style="background-image: url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 fill=%22none%22 stroke=%22currentColor%22 viewBox=%220 0 24 24%22%3E%3Cpath stroke-linecap=%22round%22 stroke-linejoin=%22round%22 stroke-width=%222%22 d=%22M19 9l-7 7-7-7%22/%3E%3C/svg%3E'); background-repeat: no-repeat; background-position: right 15px center; background-size: 16px;">
          <option value="">请选择赛项</option>
          <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
        </select>
      </div>

      <!-- 表单 -->
      <div class="pt-[18px]">
        <div class="grid grid-cols-2 max-sm:grid-cols-1 gap-[24px]">
          <label class="flex flex-col gap-[10px]">
            <span class="font-semibold text-[14px] text-ink">姓名</span>
            <input v-model="form.name" placeholder="请输入姓名" class="border border-[#ddd] rounded-[6px] px-[12px] py-[8px] text-[14px] outline-none focus:border-blue transition-colors" />
          </label>
          <label class="flex flex-col gap-[10px]">
            <span class="font-semibold text-[14px] text-ink">账号/电话</span>
            <input v-model="form.phone" placeholder="请输入手机号" class="border border-[#ddd] rounded-[6px] px-[12px] py-[8px] text-[14px] outline-none focus:border-blue transition-colors" />
          </label>
          <label class="flex flex-col gap-[10px]">
            <span class="font-semibold text-[14px] text-ink">性别</span>
            <select v-model="form.gender" class="border border-[#ddd] rounded-[6px] px-[12px] py-[8px] text-[14px] outline-none bg-white focus:border-blue transition-colors">
              <option value="">请选择</option><option value="男">男</option><option value="女">女</option>
            </select>
          </label>
          <label class="flex flex-col gap-[10px]">
            <span class="font-semibold text-[14px] text-ink">身份证</span>
            <input v-model="form.idCard" placeholder="请输入身份证号" class="border border-[#ddd] rounded-[6px] px-[12px] py-[8px] text-[14px] outline-none focus:border-blue transition-colors" />
          </label>
          <label class="flex flex-col gap-[10px]">
            <span class="font-semibold text-[14px] text-ink">省</span>
            <select v-model="form.province" class="border border-[#ddd] rounded-[6px] px-[12px] py-[8px] text-[14px] outline-none bg-white focus:border-blue transition-colors">
              <option value="">请选择报名城市</option>
            </select>
          </label>
          <label class="flex flex-col gap-[10px]">
            <span class="font-semibold text-[14px] text-ink">市</span>
            <select v-model="form.city" class="border border-[#ddd] rounded-[6px] px-[12px] py-[8px] text-[14px] outline-none bg-white focus:border-blue transition-colors">
              <option value="">请选择报名城市</option>
            </select>
          </label>
          <label class="flex flex-col gap-[10px]">
            <span class="font-semibold text-[14px] text-ink">区县</span>
            <select v-model="form.district" class="border border-[#ddd] rounded-[6px] px-[12px] py-[8px] text-[14px] outline-none bg-white focus:border-blue transition-colors">
              <option value="">请选择报名城市</option>
            </select>
          </label>
          <label class="flex flex-col gap-[10px]">
            <span class="font-semibold text-[14px] text-ink">联系地址</span>
            <input v-model="form.address" placeholder="请输入详细联系地址" class="border border-[#ddd] rounded-[6px] px-[12px] py-[8px] text-[14px] outline-none focus:border-blue transition-colors" />
          </label>
        </div>
      </div>

      <!-- 提交按钮 -->
      <button @click="handleSubmit"
        class="w-full rounded-[8px] py-[8px] bg-blue text-[16px] font-semibold text-white text-center hover:opacity-90 transition-opacity cursor-pointer">
        立即报名
      </button>
    </div>
  </div>
</template>

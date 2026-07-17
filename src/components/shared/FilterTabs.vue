<script setup>
defineProps({
  modelValue: { type: String, default: '' },
  items: { type: Array, default: () => [] },
})

const emit = defineEmits(['update:modelValue'])
</script>

<template>
  <div class="flex gap-[16px] items-center flex-wrap">
    <button
      v-for="item in items"
      :key="item"
      type="button"
      class="shrink-0 rounded-full text-[12px] whitespace-nowrap transition-colors cursor-pointer"
      :class="modelValue === item
        ? 'text-white font-medium px-[20px] py-[6px] border-0'
        : 'font-semibold border border-[#ddd] px-[21px] py-[7px] text-muted/65 hover:border-ink'"
      :style="modelValue === item
        ? { background: 'linear-gradient(-74.59deg, #b5edff 3.13%, #214fd6 53.01%, #5383eb 92.57%)' }
        : {}"
      @click="emit('update:modelValue', item)"
    >
      {{ item }}
    </button>
  </div>
</template>

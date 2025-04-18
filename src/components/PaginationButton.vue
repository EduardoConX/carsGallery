<script lang="ts" setup>
defineProps<{
  isDisabled: boolean
  text: string
}>()
</script>

<template>
  <button :class="[
    'px-4 py-2 rounded-lg transition-colors',
    isDisabled
      ? 'bg-gray-700 text-gray-300 hover:bg-gray-600 cursor-not-allowed'
      : 'bg-emerald-600 hover:bg-emerald-700 text-white cursor-pointer'
  ]" :disabled="isDisabled">{{ text }}</button>
</template>

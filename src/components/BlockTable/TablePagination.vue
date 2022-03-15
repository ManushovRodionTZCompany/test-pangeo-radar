<script setup lang="ts">
  import { computed } from 'vue'

  type TProps = {
    page: number
    limit: number
    count: number
  }

  const props = defineProps<TProps>()
  const emit = defineEmits(['update:page'])

  const maxPage = computed(() => Math.ceil(props.count / props.limit) - 1)
  const disabledStart = computed(() => props.page === 0)
  const disabledEnd = computed(() => maxPage.value <= props.page)

  const handleStart = () => {
    const page = props.page - 1
    emit('update:page', page < 0 ? 0 : page)
  }

  const handleEnd = () => {
    const page = props.page + 1
    emit('update:page', page > maxPage.value ? maxPage.value - 1 : page)
  }
</script>

<template>
  <div class="table-pagination">
    <BButton :disabled="disabledStart" @click="handleStart">
      <i class="bi bi-caret-left" />
    </BButton>
    <BButton :disabled="disabledEnd" @click="handleEnd">
      <i class="bi bi-caret-right" />
    </BButton>
  </div>
</template>

<style lang="scss" scoped>
  .table-pagination {
    display: flex;
    justify-content: space-between;
  }
</style>

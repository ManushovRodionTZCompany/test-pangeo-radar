<script setup lang="ts">
  import { reactive } from 'vue'
  import type { TState } from '@/types/state'
  import type { TResult } from './components/FormGenerate/Domain/types'

  import FormGenerate from './components/FormGenerate/FormGenerate.vue'
  import BlockTable from './components/BlockTable/BlockTable.vue'
  import BlockChart from './components/BlockChart/BlockChart.vue'

  const state = reactive<TState>({
    pagination: { limit: 0 },
    items: [],
  })

  const handleResultGenerate = (result: TResult) => {
    state.items = result.items
    state.pagination.limit = result.pagination.limit
  }
</script>

<template>
  <div class="mt-5 mb-5">
    <BContainer>
      <FormGenerate class="mb-5" @result="handleResultGenerate" />

      <BRow v-if="state.items.length">
        <BCol md="8">
          <BlockTable :pagination="state.pagination" :items="state.items" />
        </BCol>
        <BCol md="4">
          <BlockChart :items="state.items" />
        </BCol>
      </BRow>
    </BContainer>
  </div>
</template>

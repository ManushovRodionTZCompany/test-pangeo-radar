<script setup lang="ts">
  import { computed, reactive, ref, watch } from 'vue'
  import { sortByOptions } from '@/utilites/sort'

  import type { TPagination, TItem, TSort, TSortKey } from './Domain/types'
  import { headCols } from './Domain/consts'

  import TableTheadCol from './TableTheadCol.vue'
  import TablePagination from './TablePagination.vue'

  type TProps = {
    pagination: TPagination
    items: TItem[]
  }

  const props = defineProps<TProps>()

  const sortOptions = reactive<TSort>({ key: 'id', direction: 'asc' })
  const paginationPage = ref(0)

  watch(
    () => props.items,
    () => (paginationPage.value = 0)
  )

  const bodyRows = computed(() => {
    const resultSort = sortByOptions<TItem>(props.items, sortOptions)

    const start = paginationPage.value * props.pagination.limit
    const end = start + props.pagination.limit

    console.log(start, end)
    return resultSort.slice(start, end)
  })

  const getSortAsc = (key: TSortKey) => {
    return key === sortOptions.key && sortOptions.direction === 'asc'
  }

  const getSortDesc = (key: TSortKey) => {
    return key === sortOptions.key && sortOptions.direction === 'desc'
  }

  const handleUpdateSort = (key: TSortKey) => {
    if (sortOptions.key === key) {
      sortOptions.direction = sortOptions.direction === 'desc' ? 'asc' : 'desc'
    } else {
      sortOptions.key = key
      sortOptions.direction = 'asc'
    }
  }

  const handleUpdatePage = (page: number) => {
    paginationPage.value = page
  }

  // @TODO пока в bootstrap-vue не полность реализован table - как будет готов, надо будет воспользоваться <BTable ...props> и повыризать лишнее...
</script>

<template>
  <div>
    <BTableSimple>
      <BThead>
        <BTr>
          <TableTheadCol
            v-for="headCol in headCols"
            :key="headCol.key"
            :label="headCol.label"
            :sort-asc="getSortAsc(headCol.key)"
            :sort-desc="getSortDesc(headCol.key)"
            @click="handleUpdateSort(headCol.key)"
          />
        </BTr>
      </BThead>

      <BTbody>
        <BTr v-for="bodyRow in bodyRows" :key="bodyRow.id">
          <BTd v-for="headCol in headCols" :key="headCol.key">
            {{ bodyRow[headCol.key] }}
          </BTd>
        </BTr>
      </BTbody>
    </BTableSimple>

    <TablePagination
      :page="paginationPage"
      :limit="props.pagination.limit"
      :count="props.items.length"
      @update:page="handleUpdatePage"
    />
  </div>
</template>

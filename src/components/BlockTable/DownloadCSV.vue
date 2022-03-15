<script setup lang="ts">
  import type { TItem } from './Domain/types'

  type TProps = {
    items: TItem[]
  }

  const props = defineProps<TProps>()

  const handleDownload = () => {
    const content = props.items.reduce(
      (res, item) => (res += Object.values(item).join() + '\n'),
      'data:text/csv;charset=utf-8,'
    )

    const encodedURI = encodeURI(content)
    const nodeLink = document.createElement('a')

    nodeLink.setAttribute('href', encodedURI)
    nodeLink.setAttribute('download', 'table.csv')

    document.body.appendChild(nodeLink)
    nodeLink.click()

    document.body.removeChild(nodeLink)
  }
</script>

<template>
  <BButton @click="handleDownload">Скачать .csv</BButton>
</template>

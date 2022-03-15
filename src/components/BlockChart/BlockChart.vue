<script setup lang="ts">
  import { computed } from 'vue'
  import useToggle from '@/hooks/useToggle'

  import type { TItem, TDataChart } from './Domain/types'

  import PieChart from './PieChart.vue'
  import BarChart from './BarChart.vue'

  type TProps = {
    items: TItem[]
  }

  const props = defineProps<TProps>()

  const dataChart = computed(() => {
    return props.items.reduce<TDataChart>(
      (res, item) => {
        const { rand } = item

        const findIndex = res.labels.findIndex((v) => v === rand)

        if (findIndex < 0) {
          res.labels.push(rand)
          res.values.push(1)
        } else {
          const value = res.values[findIndex]
          res.values[findIndex] = value + 1
        }

        return res
      },
      { labels: [], values: [] }
    )
  })

  const barChartToggle = useToggle(false)
</script>

<template>
  <div class="bock-chart">
    <div class="bock-chart__charts mb-4">
      <BarChart v-if="barChartToggle.state.value" :data-chart="dataChart" />
      <PieChart v-else :data-chart="dataChart" />
    </div>

    <div class="bock-chart__actions text-center">
      <BButton variant="danger" @click="barChartToggle.toggle()">
        <span>Переключить: </span>
        <i v-if="!barChartToggle.state.value" class="bi bi-bar-chart" />
        <i v-else class="bi bi-pie-chart" />
      </BButton>
    </div>
  </div>
</template>

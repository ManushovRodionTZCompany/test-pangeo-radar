<script setup lang="ts">
  import { computed } from 'vue'
  import { PieChart, usePieChart } from 'vue-chart-3'
  import { ChartData, ChartOptions } from 'chart.js'

  import type { TDataChart } from './Domain/types'
  import randomColor from '@/utilites/randomColor'

  type TProps = {
    dataChart: TDataChart
  }

  const props = defineProps<TProps>()

  const values = computed<ChartData<'pie'>>(() => ({
    labels: props.dataChart.labels,
    datasets: [
      {
        data: props.dataChart.values,
        backgroundColor: [...Array(props.dataChart.labels.length)].map(() =>
          randomColor()
        ),
      },
    ],
  }))

  const options = computed<ChartOptions<'pie'>>(() => ({
    plugins: {
      legend: { position: 'bottom' },
    },
  }))

  const { pieChartProps } = usePieChart({
    chartData: values,
    options,
  })
</script>

<template>
  <PieChart v-bind="pieChartProps" />
</template>

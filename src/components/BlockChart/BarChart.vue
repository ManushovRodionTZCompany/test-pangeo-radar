<script setup lang="ts">
  import { computed } from 'vue'
  import { BarChart, useBarChart } from 'vue-chart-3'
  import { ChartData, ChartOptions } from 'chart.js'

  import type { TDataChart } from './Domain/types'
  import randomColor from '@/utilites/randomColor'

  type TProps = {
    dataChart: TDataChart
  }

  const props = defineProps<TProps>()

  const values = computed<ChartData<'bar'>>(() => ({
    labels: props.dataChart.labels,
    datasets: [
      {
        data: props.dataChart.values,
        backgroundColor: [...Array(props.dataChart.labels.length)].map(() =>
          randomColor()
        ),
        label: '',
      },
    ],
  }))

  const options = computed<ChartOptions<'bar'>>(() => ({
    plugins: {
      legend: { position: 'bottom' },
    },
  }))

  const { barChartProps } = useBarChart({
    chartData: values,
    options,
  })
</script>

<template>
  <BarChart v-bind="barChartProps" />
</template>

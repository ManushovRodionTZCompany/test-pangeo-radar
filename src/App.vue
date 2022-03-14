<script setup lang="ts">
  import FormGenerate from './components/FormGenerate.vue'
  import BlockTable from './components/BlockTable.vue'
  import BlockChart from './components/BlockChart.vue'
</script>

<template>
  <div class="mt-5 mb-5">
    <BContainer>
      <FormGenerate />

      <BRow>
        <BCol md="6">
          <BlockTable />
        </BCol>
        <BCol md="6">
          <BlockChart />
        </BCol>
      </BRow>
    </BContainer>
  </div>
  =
</template>

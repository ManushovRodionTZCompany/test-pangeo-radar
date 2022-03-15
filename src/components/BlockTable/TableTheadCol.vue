<script setup lang="ts">
  type TProps = {
    label: string
    sortDesc: boolean
    sortAsc: boolean
  }

  const props = defineProps<TProps>()
  const emit = defineEmits(['click'])

  const handleClick = () => {
    emit('click')
  }
</script>

<template>
  <th class="cursor-pointer" @click="handleClick">
    <div class="table-thead__col">
      <span>{{ props.label }}</span>
      <span class="table-thead__col-icon">
        <i
          class="bi bi-caret-up-fill"
          :class="{ 'text-black': props.sortAsc }"
        />
        <i
          class="bi bi-caret-down-fill"
          :class="{ 'text-black': props.sortDesc }"
        />
      </span>
    </div>
  </th>
</template>

<style lang="scss" scoped>
  .cursor-pointer {
    cursor: pointer;
  }

  .text-black {
    color: #666;
  }

  .table-thead__col {
    display: flex;
    justify-content: space-between;
    align-items: center;

    &-icon {
      display: flex;
      flex-direction: column;

      i {
        line-height: 0;
        font-size: 11px;
        color: #ddd;
      }
    }
  }
</style>

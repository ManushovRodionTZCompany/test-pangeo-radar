<script setup lang="ts">
  import { ref, computed } from 'vue'
  import Generate from './Domain/Generate'
  import {
    DEFAULT_COUNT_LIST,
    DEFAULT_PAGINATION_LIMIT,
    DEFAULT_VALUE,
  } from './Domain/defaults'
  import type { TResult } from './Domain/types'

  const emit = defineEmits(['result'])

  const countItems = ref(DEFAULT_COUNT_LIST)
  const errorCountItems = computed(() => countItems.value <= 0)

  const paginationLimit = ref(DEFAULT_PAGINATION_LIMIT)
  const errorPaginationLimit = computed(() => paginationLimit.value <= 0)

  const value = ref(DEFAULT_VALUE)
  const errorValue = computed(() => !value.value)

  const hasError = computed(
    () =>
      errorCountItems.value || errorPaginationLimit.value || errorValue.value
  )

  const formSheme = [
    {
      id: 'count-items',
      value: countItems,
      error: errorCountItems,
      errorText: 'Кол-во записей должно быть больше 0',
      labelText: 'Кол-во записей:',
      attr: {
        type: 'number',
        min: 1,
      },
    },
    {
      id: 'pagination-limit',
      value: paginationLimit,
      error: errorPaginationLimit,
      errorText: 'Кол-во строк должно быть меньше 0',
      labelText: 'Кол-во строк:',
      attr: {
        type: 'number',
        min: 1,
      },
    },
    {
      id: 'value',
      value: value,
      error: errorValue,
      errorText: 'Значение должно быть не пусто',
      labelText: 'Фрукты:',
      attr: {
        type: 'text',
        trim: true,
      },
    },
  ]

  const generate = new Generate(countItems.value)

  const handleResult = () => {
    generate.updateCount(+countItems.value)

    if (generate.parseText(value.value)) {
      const result: TResult = {
        items: generate.getResult(),
        pagination: {
          limit: +paginationLimit.value,
        },
      }

      emit('result', result)
    }
  }

  const handleReset = () => {
    countItems.value = DEFAULT_COUNT_LIST
    paginationLimit.value = DEFAULT_PAGINATION_LIMIT
    value.value = DEFAULT_VALUE

    handleResult()
  }
</script>

<template>
  <BRow>
    <BCol md="8">
      <BRow>
        <BCol v-for="item in formSheme" :key="item.id" md="4">
          <div role="group">
            <label :for="item.id">{{ item.labelText }}</label>

            <BFormInput
              :id="item.id"
              v-model="item.value.value"
              :state="!item.error.value"
              :aria-describedby="`${item.id}-fedback`"
              v-bind="item.attr"
            />

            <BFormInvalidFeedback :id="`${item.id}-fedback`">
              {{ item.errorText }}
            </BFormInvalidFeedback>
          </div>
        </BCol>
      </BRow>
    </BCol>

    <BCol md="4">
      <BRow>
        <BCol md="6" style="text-align: right">
          <BButton
            class="mt-4"
            variant="primary"
            :disabled="hasError"
            @click="handleResult"
          >
            Применить
          </BButton>
        </BCol>

        <BCol md="6">
          <BButton
            class="mt-4"
            variant="primary"
            :disabled="hasError"
            @click="handleReset"
          >
            Сбросить
          </BButton>
        </BCol>
      </BRow>
    </BCol>
  </BRow>
</template>

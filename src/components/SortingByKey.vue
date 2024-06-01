<template>
  <div class="sorting_param">
    <button
      class="sorting_button_param"
      :class="buttonsActive(button.value)"
      v-for="button in sortingButtons"
      :key="button.value"
      @click="activateSorting(button.value)"
    >
      {{ button.text }}
    </button>
  </div>
</template>

<script setup lang="ts">
  import {computed} from 'vue';
  import type {SortingButton} from '../composables/useButtons.ts';

  const props = defineProps({
    sortingButtons: {
      type: Array as () => Array<SortingButton>,
      default: () => []
    },
    modelValue: {
      type: String,
      default: ''
    }
  });

  const emit = defineEmits(['update:modelValue']);

  const checkedValue = computed({
    get() {
      return props.modelValue;
    },
    set(value: string) {
      emit('update:modelValue', value);
    }
  });

  const buttonsActive = (value: string) => {
    return {
      sorting_button_param_active: value === checkedValue.value
    };
  };

  const activateSorting = (value: string) => {
    checkedValue.value = value;
  };
</script>

<style lang="scss">
  .sorting_param {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }

  .sorting_button_param {
    width: 100%;
    border: 1px solid rgb(128 128 128 / 58%);
    outline: none;
    padding: 15px;
    cursor: pointer;
    transition: all 0.4s ease;
    background: #fff;

    &:hover {
      background-color: rgba(69, 181, 235, 0.81);
      color: #fff;
    }
  }

  .sorting_button_param_active {
    background: rgb(69 181 235 / 81%);
    color: white;
  }
</style>

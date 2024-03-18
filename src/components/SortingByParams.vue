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

<script setup>
  import {computed} from 'vue';

  const props = defineProps({
    sortingButtons: {
      type: Array,
      default: () => []
    },
    modelValue: {
      type: String,
      default: ''
    }
  });

  const emit = defineEmits(['update:modelValue', 'on-sort']);

  const checkedValue = computed({
    get() {
      return props.modelValue;
    },
    set(value) {
      emit('update:modelValue', value);
    }
  });

  const buttonsActive = (value) => {
    return {
      sorting_button_param_active: value === checkedValue.value
    };
  };

  const activateSorting = (value) => {
    checkedValue.value = value;
    emit('on-sort');
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
    background: transparent;
    padding: 15px;
    cursor: pointer;
    transition: all 0.4s ease;
  }

  .sorting_button_param_active {
    background: rgb(69 181 235 / 81%);
    color: white;
  }
</style>

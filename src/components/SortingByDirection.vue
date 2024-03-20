<template>
  <div class="sorting_direct">
    <button
      class="sorting_button_direction"
      v-for="direct in sortingDirection"
      :key="direct.value"
      :class="buttonsActive(direct.value)"
      @click="activateSorting(direct.value)"
    >
      {{ direct.text }}
    </button>
  </div>
</template>

<script setup>
  import {computed} from 'vue';

  const props = defineProps({
    sortingDirection: {
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
  .sorting_direct {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }

  .sorting_button_direction {
    width: 100%;
    border: 1px solid rgb(128 128 128 / 58%);
    outline: none;
    padding: 5px;
    margin-top: 3px;
    cursor: pointer;
    transition: all 0.4s ease;
    background: #fff;
  }

  .sorting_button_param_active {
    background: rgb(69 181 235 / 81%);
    color: white;
  }
</style>

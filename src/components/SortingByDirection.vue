<template>
  <div class="sorting_direct">
    <button
      class="sorting_button_direction"
      v-for="direct in sortingDirection"
      :key="direct.value"
      :class="buttonsActive(direct.value)"
      @click="activateSorting(direct.value)"
      :disabled="disabled"
    >
      {{ direct.text }}
    </button>
  </div>
</template>

<script setup lang="ts">
  import {computed} from 'vue';

  const props = defineProps({
    sortingDirection: {
      type: Array,
      default: () => []
    },
    modelValue: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: 'true'
    }
  });

  const emit = defineEmits(['update:modelValue']);

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

    &:hover {
      background: rgba(69, 181, 235, 0.81);
      color: #fff;
    }

    &:disabled {
      opacity: 0.7;
      cursor: not-allowed;
      background: #fff;
      color: grey;
    }
  }

  .sorting_button_param_active {
    background: rgb(69 181 235 / 81%);
    color: white;
  }
</style>

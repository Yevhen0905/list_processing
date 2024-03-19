<template>
  <div class="shared_tabs">
    <div :class="'shared_tabs_controls'">
      <slot name="controls"></slot>
    </div>
    <div class="shared_tabs_content">
      <slot :active-tab="active"></slot>
    </div>
  </div>
</template>

<script setup>
  import {onBeforeMount, ref, provide} from 'vue';

  const emit = defineEmits(['update:active-tab']);
  const props = defineProps({
    activeTab: {
      type: String,
      default: ''
    }
  });

  const active = ref('');

  onBeforeMount(() => {
    active.value = props.activeTab.toLowerCase();
  });

  provide('isActiveTab', (name) => active.value === name.toLowerCase());
  provide('activateTab', (name) => {
    active.value = name.toLowerCase();
  });

</script>

<style lang="scss">
  .shared_tabs_controls {
    display: flex;
    justify-content: space-around;
    width: 100%;
    border: 1px solid rgb(128 128 128 / 48%);
  }
</style>

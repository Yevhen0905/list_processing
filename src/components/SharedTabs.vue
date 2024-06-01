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

<script setup lang="ts">
  import {onBeforeMount, ref, provide} from 'vue';

  const emit = defineEmits<{
    (e: 'update:active-tab', value: string): void;
  }>();

  const props = defineProps<{
    activeTab: string;
  }>();

  const active = ref<string>('');

  onBeforeMount(() => {
    active.value = props.activeTab.toLowerCase();
  });

  provide('isActiveTab', (name: string) => active.value === name.toLowerCase());
  provide('activateTab', (name: string) => {
    active.value = name.toLowerCase();
    emit('update:active-tab', active.value);
  });
</script>

<style lang="scss">
  .shared_tabs_controls {
    display: flex;
    justify-content: space-around;
    width: 100%;
    border: 2px solid rgba(128, 128, 128, 0.48);
    background: #fff;
  }
</style>

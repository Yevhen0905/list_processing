<template>
  <div
    :class="[
      'shared_tab_control',
      {shared_tab_control_active: isActiveTab(name)}
    ]"
    @click="handleClickTab"
  >
    <span class="shared_tab_control_text">
      <slot>{{ name }}</slot>
    </span>
  </div>
</template>

<script setup lang="ts">
  import {inject} from 'vue';

  const props = defineProps<{
    name: string;
  }>();

  const isActiveTab = inject<(name: string) => boolean>('isActiveTab');
  const activateTab = inject<(name: string) => void>('activateTab');

  const handleClickTab = () => {
    if (activateTab) {
      activateTab(props.name);
    }
  };
</script>

<style lang="scss">
  .shared_tab_control {
    width: 50%;
    padding: 10px 0;
    text-align: center;
    transition: all 0.1s;
    cursor: pointer;
  }

  .shared_tab_control_active {
    background-color: rgb(69 181 235 / 81%);
    color: white;
  }
</style>

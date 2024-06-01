<template>
  <div class="preview_list_tables">
    <div
      ref="listItemRefs"
      class="list_tables"
      v-for="(people, index) in listPeople"
      :key="index"
    >
      <div class="tables_info">
        <div class="tables_initials">
          <div class="tables_img">
            <img :src="`src/assets/img/${people?.image}.svg`" alt="" />
          </div>
          <div class="tables_name">{{ people?.name }}</div>
        </div>
        <div class="tables_age">{{ people?.age }} {{ isLanguage ? 'years' : 'років' }}</div>
        <div class="tables_tel">{{ people?.phone }}</div>
        <div class="tables_description">{{ people?.phrase }}</div>
      </div>
      <div v-if="people.video" class="tables_video">
        <video
          ref="listItemsVideo"
          width="100%"
          height="100%"
          controls
          muted
          loop
          preload="none"
        >
          <source
            :src="`src/assets/video/${people?.video}.mp4`"
            type="video/mp4"
          />
        </video>
      </div>
      <div v-else class="tables_video no_video_available">
        {{ isLanguage ? 'no video available' : 'відео відсутнє' }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import {ref, onMounted} from 'vue';
  import {
    initIntersectionObserver,
    initInterVideoObserver
  } from '../composables/observe.ts';
  import type {ListItem} from '../composables/useFilterAndSortList.ts';

  const props = defineProps({
    listPeople: {
      type: Array as () => ListItem[],
      default: () => []
    },
    isLanguage: {
      type: Boolean,
      required: true
    }
  });
  const listItemRefs = ref<HTMLElement[]>([]);
  const listItemsVideo = ref<HTMLVideoElement[]>([]);

  onMounted(() => initIntersectionObserver(0.3, 'visible', listItemRefs.value));
  onMounted(() => initInterVideoObserver(1, listItemsVideo.value));
</script>

<style lang="scss" scoped>
  .preview_list_tables {
    display: flex;
    flex-direction: column;
  }

  .list_tables {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0;
    width: 100%;
    height: 230px;
    border: 1px solid #80808082;
    margin: 5px 0;
    box-shadow: 7px 10px 17px rgba(0, 0, 0, 0.1);
    opacity: 0;
    transform: translate(0px, 3rem);
    transition: all 1s ease-in-out;
    background: #fff;

    @media only screen and (max-width: 840px) {
      height: 270px;
    }

    @media only screen and (max-width: 640px) {
      font-size: 16px;
    }

    @media only screen and (max-width: 560px) {
      flex-direction: column;
      height: fit-content;
    }
  }

  .visible {
    opacity: 1;
    transform: translate(0, 0);
  }

  .tables_info {
    width: 50%;
    padding: 15px;
    display: flex;
    flex-direction: column;
    gap: 5px;

    @media only screen and (max-width: 560px) {
      width: 100%;
    }
  }

  .tables_description {
    width: 85%;
  }

  .tables_video {
    width: 50%;
    height: 100%;
    box-shadow: -4px 2px 6px rgba(0, 0, 0, 0.2);
    border-left: 1px solid #8080806e;

    @media only screen and (max-width: 560px) {
      width: 100%;
      min-height: 50px;
      border-top: 1px solid #8080806e;
    }
  }

  .no_video_available {
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: none;
    text-align: center;
    font-size: 18px;

    @media only screen and (max-width: 640px) {
      font-size: 16px;
    }
  }

  .tables_video video {
    object-fit: cover;
  }
</style>

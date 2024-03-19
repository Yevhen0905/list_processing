<template>
  <div class="preview_list_tables">
    <TransitionGroup name="list">
      <div
        class="list_tables"
        :class="{without_video: !people.video}"
        v-for="(people, index) in listPeople"
        :key="index"
      >
        <div class="tables_info">
          <div class="tables_initials">
            <div class="tables_img">
              <img :src="`/list_people/src/assets/img/${people?.image}.svg`" alt="" />
            </div>
            <div class="tables_name">{{ people?.name?.en }}</div>
          </div>
          <div class="tables_age">{{ people?.age }} years</div>
          <div class="tables_tel">{{ people?.phone }}</div>
          <div class="tables_description">{{ people?.phrase?.en }}</div>
        </div>
        <div v-if="people.video" class="tables_video">
          <video width="100%" height="100%" controls muted loop preload="none">
            <source
              :src="`/list_people/src/assets/video/${people?.video}.mp4`"
              type="video/mp4"
            />
          </video>
        </div>
      </div>
    </TransitionGroup>
  </div>
</template>

<script setup>
  import {ref, onMounted} from 'vue';

  const props = defineProps({
    listPeople: {
      type: Array,
      default: () => []
    }
  });

  const initIntersectionObserver = () => {
    const options = {
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
        }
      });
    }, options);

    document.querySelectorAll('.list_tables').forEach((item) => {
      observer.observe(item);
    });
  };

  const initInterVideoObserver = () => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(async (entry) => {
        if (entry.isIntersecting) {
          await entry.target.play();
        } else {
          await entry.target.pause();
        }
      });
    }, options);

    document.querySelectorAll('video').forEach((item) => {
      observer.observe(item);
    });
  };

  onMounted(initIntersectionObserver);
  onMounted(initInterVideoObserver);
</script>

<style lang="scss" scoped>
  .preview_list_tables {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }

  .list_tables {
    padding: 0;
    width: 100%;
    min-height: 290px;
    opacity: 0;
    transform: translate(0px, 3rem);
    transition: all 1s ease-in-out;
  }

  .in-view {
    opacity: 1;
    transform: translate(0, 0);
  }

  .tables_info {
    width: 50%;
    padding: 15px;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .tables_description {
    width: 85%;
  }

  .tables_video {
    width: 50%;
    height: 100%;
    box-shadow: -4px 2px 6px rgba(0, 0, 0, 0.2);
  }

  .without_video {
    width: 49.8%;

    .tables_info {
      width: 100%;
    }
  }

  .tables_video video {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .list-move {
    transition: transform 0.4s ease;
  }

  .list-enter-active,
  .list-leave-active {
    transition: opacity 0.5s;
  }

  .list-enter,
  .list-leave-to {
    opacity: 0;
  }
</style>

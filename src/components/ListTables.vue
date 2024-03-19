<template>
  <div class="wrapper_list">
    <TransitionGroup name="list" tag="div">
      <div class="list_tables" v-for="(people, index) in listPeople" :key="index">
        <div class="tables_initials">
          <div class="tables_img">
            <img :src="`/list_people/src/assets/img/${people.image}.svg`" alt="" />
          </div>
          <div class="tables_name">
            {{ people?.name?.en }}
          </div>
        </div>
        <div class="tables_age">{{ people?.age }} years</div>
        <div class="tables_tel">{{ people?.phone }}</div>
      </div>
    </TransitionGroup>
  </div>
</template>

<script setup>
  import {ref, onMounted, computed, watch} from 'vue';

  const props = defineProps({
    listPeople: {
      type: Object,
      default: () => {}
    }
  });

  const initIntersectionObserver = () => {
    const options = {
      threshold: 0.5
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

  onMounted(initIntersectionObserver);
</script>

<style lang="scss" scoped>
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

  .list_tables {
    opacity: 0;
    transform: translate(0px, 3rem);
    transition: all 1s ease-in-out;
  }

  .in-view {
    opacity: 1;
    transform: translate(0, 0);
  }
</style>

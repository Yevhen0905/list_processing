<template>
  <div class="wrapper_list">
    <div
      ref="listItemRefs"
      class="list_tables"
      v-for="(people, index) in listPeople"
      :key="index"
    >
      <div class="tables_initials">
        <div class="tables_img">
          <img :src="`/list_people/src/assets/img/${people.image}.svg`" alt="" />
        </div>
        <div class="tables_name">
          {{ people?.name }}
        </div>
      </div>
      <div class="tables_age">{{ people?.age }} {{ isLanguage ? 'years' : 'років' }}</div>
      <div class="tables_tel">{{ people?.phone }}</div>
    </div>
  </div>
</template>

<script setup>
  import {ref, onMounted, watch} from 'vue';

  const props = defineProps({
    listPeople: {
      type: Object,
      default: () => {}
    },
    isLanguage: {
      type: Boolean,
      required: true
    }
  });

  const listItemRefs = ref([]);

  let observer;

  const initIntersectionObserver = () => {
    const options = {
      threshold: 0.3
    };

    observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, options);

    listItemRefs.value.forEach((item) => {
      observer.observe(item);
    });
  };

  watch(listItemRefs.value, (newItem, oldItem) => {
    oldItem.forEach((item) => {
      observer.unobserve(item);
    });
    newItem.forEach((item) => {
      observer.observe(item);
    });
  });

  onMounted(initIntersectionObserver);
</script>

<style lang="scss" scoped>
  .list_tables {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    border: 1px solid #80808082;
    margin: 5px 0;
    box-shadow: 7px 10px 17px rgba(0, 0, 0, 0.1);
    opacity: 0;
    transform: translate(0px, 3rem);
    transition: all 1s ease-in-out;
    background: #fff;
  }

  .visible {
    opacity: 1;
    transform: translate(0, 0);
  }
</style>

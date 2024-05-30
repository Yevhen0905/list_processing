import {ref} from 'vue';

export const sortingButtons = ref([
  {
    text: {
      en: 'ID',
      ua: 'ID'
    },
    value: 'id'
  },
  {
    text: {
      en: 'name',
      ua: 'ФІО'
    },
    value: 'name'
  },
  {
    text: {
      en: 'Age',
      ua: 'Вік'
    },
    value: 'age'
  }
]);

export const sortingDirection = ref([
  {
    text: {
      en: 'ascending order',
      ua: 'за зростанням'
    },
    value: 'asc'
  },
  {
    text: {
      en: 'descending order',
      ua: 'за спаданням'
    },
    value: 'desc'
  }
]);

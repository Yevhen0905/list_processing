import {ref} from 'vue';

interface SortingButton {
  text: {
    en: string;
    ua: string;
  };
  value: string;
}

interface SortingDirection {
  text: {
    en: string;
    ua: string;
  };
  value: 'asc' | 'desc';
}

export const sortingButtons = ref<SortingButton[]>([
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

export const sortingDirection = ref<SortingDirection[]>([
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

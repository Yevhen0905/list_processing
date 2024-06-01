import {ref} from 'vue';

export interface SortingButton {
  text: {
    en: string;
    ua: string;
  };
  value: string;
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

export const sortingDirection = ref<SortingButton[]>([
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

import type {Ref} from 'vue';
import {ref, computed} from 'vue';
import {useRoute} from 'vue-router';
import {useToggleLanguage} from './useToggleLanguage';

const {selectedLanguage} = useToggleLanguage();
export interface ListItem {
  id: number;
  age: number;
  phone: string;
  image: string;
  name: Record<string, string>;
  phrase: Record<string, string>;
  video?: string;
}

export const useFilterAndSortedList = (listPeople: Ref<ListItem[]>) => {
  const route = useRoute();

  const searchByName = ref<string>('');
  const sortingKey = ref<string>((route.query.key as string) || '');
  const sortingDirect = ref<string>((route.query.order as string) || '');

  const filterAndSortedList = computed((): ListItem[] => {
    let filteredList = listPeople.value;
    const language = selectedLanguage.value;

    if (language) {
      filteredList = filteredList.map((person: ListItem) => ({
        ...person,
        name: person.name[language],
        phrase: person.phrase[language]
      }));
    }

    if (searchByName.value) {
      filteredList = filteredList.filter((person: ListItem) =>
        (person.name as string)
          ?.toLowerCase()
          .includes(searchByName.value.toLowerCase())
      );
    }

    const key = sortingKey.value as keyof ListItem;
    const order = sortingDirect.value;

    if (order && key) {
      if (order === 'asc') {
        return filteredList.slice().sort((a, b) => (a[key] > b[key] ? 1 : -1));
      } else {
        return filteredList.slice().sort((a, b) => (a[key] < b[key] ? 1 : -1));
      }
    }

    return filteredList;
  });

  return {searchByName, sortingKey, sortingDirect, filterAndSortedList};
};

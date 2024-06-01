import type {Ref} from 'vue';
import {ref, computed, watch} from 'vue';
import {useRoute} from 'vue-router';

export interface ListItem {
  id: number;
  age: number;
  phone: string;
  image: string;
  name: Record<string, string>;
  phrase: Record<string, string>;
  video?: string;
}

export const useFilterAndSortedList = (listPeople: Ref<ListItem[]>, selectedLanguage: Ref<'en' | 'ua'>) => {
  const route = useRoute();

  const searchByName = ref<string>('');
  const sortingKey = ref<string>((route.query.key as string) || '');
  const sortingDirect = ref<string>((route.query.order as string) || '');

  const filterAndSortedList = computed((): ListItem[] => {
    let filteredList = listPeople.value.slice();
    let language = selectedLanguage.value;

    if (language) {
      filteredList = filteredList.map((person: ListItem) => ({
        ...person,
        name: person.name[language] as unknown as Record<string, string>,
        phrase: person.phrase[language] as unknown as Record<string, string>
      }));
    }

    if (searchByName.value) {
      filteredList = filteredList.filter((person: ListItem) =>
        (person.name as unknown as string)
          ?.toLowerCase()
          .includes(searchByName.value.toLowerCase())
      );
    }

    const key = sortingKey.value as keyof ListItem;
    const order = sortingDirect.value;

    if (order && key) {
      filteredList = filteredList.sort((a, b) => {
        const aValue = a[key];
        const bValue = b[key];
        if (aValue < bValue) return order === 'asc' ? -1 : 1;
        if (aValue > bValue) return order === 'asc' ? 1 : -1;
        return 0;
      });
    }

    return filteredList;
  });

  return {
    searchByName,
    sortingKey,
    sortingDirect,
    filterAndSortedList
  };
};

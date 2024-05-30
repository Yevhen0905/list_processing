// import {ref, computed} from 'vue';
// import {useRoute} from 'vue-router';

// import {useToggleLanguage} from '../composables/useToggleLanguage.ts';

// const {selectedLanguage} = useToggleLanguage();

// export const useFilterAndSortList = (listPeople) => {
//   const route = useRoute();

//   const searchByName = ref('');
//   const sortingKey = ref(route.query.key || '');
//   const sortingDirect = ref(route.query.order || '');

//   const filterAndSortedList = computed(() => {
//     let filteredList = listPeople;
//     const language = selectedLanguage.value;

//     if (language) {
//       filteredList = filteredList.map((person) => {
//         return {
//           ...person,
//           name: person.name[language],
//           phrase: person.phrase[language]
//         };
//       });
//     }

//     if (searchByName.value) {
//       filteredList = filteredList.filter((name) => {
//         return name?.name
//           .toLowerCase()
//           .includes(searchByName.value.toLowerCase());
//       });
//     }

//     const key = sortingKey.value;
//     const order = sortingDirect.value;

//     if (order) {
//       if (order === 'asc') {
//         return filteredList.slice().sort((a, b) => (a[key] > b[key] ? 1 : -1));
//       } else {
//         return filteredList.slice().sort((a, b) => (a[key] < b[key] ? 1 : -1));
//       }
//     }

//     return filteredList;
//   });

//   return {searchByName, sortingKey, sortingDirect, filterAndSortedList};
// };

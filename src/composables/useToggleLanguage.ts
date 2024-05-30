import {ref, computed} from 'vue';

export const useToggleLanguage = () => {
  const isLanguage = ref(true);
  const selectedLanguage = ref('en');

  const languageOnThePage = ref([
    {
      sortingBy: {
        en: 'Sorting by',
        ua: 'Сортування за'
      },

      searchByName: {
        en: 'Search by name',
        ua: 'Пошук за назвою'
      },
      reset: {
        en: 'reset sorting and filtering',
        ua: 'скинути сортування та фільтрацію'
      },
      tables: {
        en: 'TABLES',
        ua: 'ТАБЛИЦЯ'
      },
      preview: {
        en: 'PREVIEW',
        ua: "ПРЕВ'Ю"
      },
      emptyTables: {
        en: 'not found',
        ua: 'не знайдено'
      }
    }
  ]);

  const changeLanguageButtonSorting = (arr) => {
    let filteredArr = arr;
    const language = selectedLanguage.value;

    if (language) {
      filteredArr = filteredArr.map((item) => {
        return {
          ...item,
          text: item.text[language]
        };
      });
    }

    return filteredArr;
  };

  const changeLanguageText = (obj) => {
    const language = selectedLanguage.value;
    return obj[language];
  };

  const changeLanguage = computed(() => {
    selectedLanguage.value = selectedLanguage.value === 'en' ? 'ua' : 'en';
    isLanguage.value = !isLanguage.value;
  });

  return {
    isLanguage,
    selectedLanguage,
    languageOnThePage,
    changeLanguage,
    changeLanguageText,
    changeLanguageButtonSorting
  };
};

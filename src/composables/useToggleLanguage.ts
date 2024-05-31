import {ref, computed} from 'vue';

type LanguageObject = {
  en: string;
  ua: string;
};

type LanguageContent = {
  sortingBy: LanguageObject;
  searchByName: LanguageObject;
  reset: LanguageObject;
  tables: LanguageObject;
  preview: LanguageObject;
  emptyTables: LanguageObject;
};

export const useToggleLanguage = () => {
  const isLanguage = ref<boolean>(true);
  const selectedLanguage = ref<'en' | 'ua'>('en');

  const languageOnThePage = ref<LanguageContent[]>([
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

  const changeLanguageButtonSorting = (arr: Array<{text: LanguageObject}>) => {
    const language = selectedLanguage.value;
    return arr.map((item) => ({
      ...item,
      text: item.text[language]
    }));
  };

  const changeLanguageText = (obj: LanguageObject) => {
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

<template>
  <div class="container">
    <div class="wrapper_sorting_data">
      <div class="sorting_container">
        <h3 class="title">{{ changeLanguageText(textOnThePage[0].sortingBy) }}</h3>
        <SortingByParams
          :sorting-buttons="changeLanguageButtonSorting(sortingButtons)"
          v-model="sortingKey"
          @click="resetDirectionWhenChangeKey"
        />
        <SortingByDirection
          :sorting-direction="changeLanguageButtonSorting(sortingDirection)"
          v-model="sortingDirect"
        />
      </div>
      <div class="filter_by_name">
        <h3 class="title">{{ changeLanguageText(textOnThePage[0].searchByName) }}</h3>
        <input
          class="filter_input"
          v-model="searchByName"
          type="text"
          placeholder="enter..."
        />
      </div>
    </div>
    <div class="wrapper_btn">
      <button class="btn_reset" @click="resetSortingAndFiltering">
        {{ changeLanguageText(textOnThePage[0].reset) }}
      </button>
      <button class="btn_language" @click="changeLanguage">
        {{ isLanguage ? 'ua' : 'en' }}
      </button>
    </div>
    <div class="tab_view">
      <h2 class="title">LIST</h2>
      <SharedTabs :active-tab="activeTab">
        <template #controls class="tab_view_control">
          <SharedTabControl name="tables" @click="changeTab('tables')">
            {{ changeLanguageText(textOnThePage[0].tables) }}
          </SharedTabControl>
          <SharedTabControl name="preview" @click="changeTab('preview')">
            {{ changeLanguageText(textOnThePage[0].preview) }}
          </SharedTabControl>
        </template>

        <template #default="{activeTab}">
          <Loader class="loader" v-if="loading" />
          <div v-else-if="filterAndSortedList.length">
            <template v-if="activeTab === 'tables'"
              ><ListTables :is-language="isLanguage" :list-people="filterAndSortedList"
            /></template>
            <template v-if="activeTab === 'preview'"
              ><ListPreview :is-language="isLanguage" :list-people="filterAndSortedList"
            /></template>
          </div>
          <div v-else class="list_empty">
            {{ changeLanguageText(textOnThePage[0].emptyTables) }}
          </div>
        </template>
      </SharedTabs>
    </div>
  </div>
</template>

<script setup>
  import Loader from '../components/Loader.vue';
  import ListTables from '../components/ListTables.vue';
  import ListPreview from '../components/ListPreview.vue';
  import SharedTabs from '../components/SharedTabs.vue';
  import SharedTabControl from '../components/SharedTabControl.vue';
  import SortingByParams from '../components/SortingByParams.vue';
  import SortingByDirection from '../components/SortingByDirection.vue';

  import {useRoute, useRouter} from 'vue-router';
  import {ref, computed, onMounted, watch, onBeforeMount} from 'vue';

  const route = useRoute();
  const router = useRouter();

  const loading = ref(true);
  const searchByName = ref('');
  const listPeople = ref([]);
  const sortingKey = ref('');
  const sortingDirect = ref('');
  const selectedLanguage = ref('en');
  const isLanguage = ref(true);
  const activeTab = ref(route.query.tab || 'tables');

  const sortingButtons = ref([
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

  const sortingDirection = ref([
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

  const textOnThePage = ref([
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

  const filterAndSortedList = computed(() => {
    let filteredList = listPeople.value;
    const language = selectedLanguage.value;

    if (language) {
      filteredList = filteredList.map((person) => {
        return {
          ...person,
          name: person.name[language],
          phrase: person.phrase[language]
        };
      });
    }

    if (searchByName.value) {
      filteredList = filteredList.filter((name) => {
        return name?.name.toLowerCase().includes(searchByName.value.toLowerCase());
      });
    }

    const key = sortingKey.value;
    const order = sortingDirect.value;
    if (order) {
      if (order === 'asc') {
        return filteredList.slice().sort((a, b) => (a[key] > b[key] ? 1 : -1));
      } else {
        return filteredList.slice().sort((a, b) => (a[key] < b[key] ? 1 : -1));
      }
    }

    return filteredList;
  });

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

  const resetSortingAndFiltering = () => {
    searchByName.value = sortingKey.value = sortingDirect.value = '';
    getFetch();
  };

  const resetDirectionWhenChangeKey = () => {
    sortingDirect.value = '';
  };

  const changeLanguage = () => {
    selectedLanguage.value = selectedLanguage.value === 'en' ? 'ua' : 'en';
    isLanguage.value = !isLanguage.value;
  };

  const getFetch = async () => {
    try {
      const res = await fetch('./data.json');
      const data = await res.json();
      setTimeout(() => {
        listPeople.value = data;
        loading.value = false;
      }, 1000);
    } catch (e) {
      console.log(e);
    }
  };

  const changeTab = (tabName) => {
    activeTab.value = tabName;
  };

  watch(activeTab, (newValue) => {
    router.replace({query: {tab: newValue}});
  });

  onBeforeMount(() => {
    router.replace({query: {tab: activeTab.value}});
  });

  onMounted(getFetch);
</script>

<style lang="scss"></style>

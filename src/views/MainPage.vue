<template>
  <div class="container">
    <div class="wrapper_sorting_data">
      <div class="sorting_container">
        <h3 class="title">Sorting by</h3>
        <SortingByParams
          :sorting-buttons="sortingButtons"
          v-model="sortingKey"
          @click="resetDirectionWhenChangeKey"
        />
        <SortingByDirection
          :sorting-direction="sortingDirection"
          v-model="sortingDirect"
        />
      </div>
      <div class="filter_by_name">
        <h3 class="title">Search by name</h3>
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
        reset sorting and filtering
      </button>
      <button class="btn_language" @click="changeLanguage">
        {{ isLanguage ? 'ru' : 'en' }}
      </button>
    </div>
    <div class="tab_view">
      <h2 class="title">LIST</h2>
      <SharedTabs :active-tab="activeTab">
        <template #controls class="tab_view_control">
          <SharedTabControl name="tables" @click="changeTab('tables')"
            >TABLES</SharedTabControl
          >
          <SharedTabControl name="preview" @click="changeTab('preview')"
            >PREVIEW</SharedTabControl
          >
        </template>

        <template #default="{activeTab}">
          <Loader class="loader" v-if="loading" />
          <div v-else-if="filterAndSortedList.length">
            <template v-if="activeTab === 'tables'"
              ><ListTables :list-people="filterAndSortedList"
            /></template>
            <template v-if="activeTab === 'preview'"
              ><ListPreview :list-people="filterAndSortedList"
            /></template>
          </div>
          <div v-else class="list_empty">not found</div>
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
      text: 'ID',
      value: 'id'
    },
    {
      text: 'Name',
      value: 'name'
    },
    {
      text: 'Age',
      value: 'age'
    }
  ]);

  const sortingDirection = ref([
    {
      text: 'ascending order',
      value: 'asc'
    },
    {
      text: 'descending order',
      value: 'desc'
    }
  ]);

  

  const filterAndSortedList = computed(() => {
    let filteredList = listPeople.value;
    const language = selectedLanguage.value;

    if (selectedLanguage.value) {
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

  const resetSortingAndFiltering = () => {
    searchByName.value = sortingKey.value = sortingDirect.value = '';
    getFetch();
  };

  const resetDirectionWhenChangeKey = () => {
    sortingDirect.value = '';
  };

  const changeLanguage = () => {
    selectedLanguage.value = selectedLanguage.value === 'en' ? 'ru' : 'en';
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

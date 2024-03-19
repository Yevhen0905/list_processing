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
          @on-sort="sortData"
        />
        <button class="btn_reset" @click="resetSortingAndFiltering">
          reset sorting and filtering
        </button>
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
          <div v-else-if="filterByName.length">
            <template v-if="activeTab === 'tables'"
              ><ListTables :list-people="filterByName"
            /></template>
            <template v-if="activeTab === 'preview'"
              ><ListPreview :list-people="filterByName"
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

  const filterByName = computed(() => {
    if (searchByName.value) {
      return listPeople.value.filter((name) => {
        return name?.name?.en.toLowerCase().includes(searchByName.value.toLowerCase());
      });
    }

    return listPeople.value;
  });

  const sortedData = computed(() => {
    const key = sortingKey.value;
    const order = sortingDirect.value;

    if (order === 'asc') {
      return filterByName.value
        .slice()
        .sort((a, b) => (convertKey(a[key]) > convertKey(b[key]) ? 1 : -1));
    } else {
      return filterByName.value
        .slice()
        .sort((a, b) => (convertKey(a[key]) < convertKey(b[key]) ? 1 : -1));
    }
  });

  const sortData = () => {
    if (sortingKey.value) {
      listPeople.value = sortedData.value;
    }
  };

  const convertKey = (key) => {
    return isNaN(key) ? key.en.split(' ')?.[0] : key;
  };

  const resetSortingAndFiltering = () => {
    searchByName.value = sortingKey.value = sortingDirect.value = '';
    getFetch();
  };

  const resetDirectionWhenChangeKey = () => {
    sortingDirect.value = '';
  };

  const getFetch = async () => {
    try {
      const res = await fetch('./data.json');
      const data = await res.json();
      setTimeout(() => {
        listPeople.value = data;
        loading.value = false;
      }, 1000);
      setQueryToDownload();
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

  const setQueryToDownload = () => {
    const tab = route.query.tab || 'tables';
    activeTab.value = tab;
  };

  onBeforeMount(() => {
    router.replace({query: {tab: activeTab.value}});
  });

  onMounted(getFetch);
</script>

<style lang="scss">
  .wrapper_sorting_data {
    display: flex;
    justify-content: space-between;
  }

  .title {
    margin-bottom: 8px;
    font-size: 20px;
  }

  .sorting_container {
    width: 70%;
  }

  .filter_by_name {
    width: 25%;
  }

  .filter_input {
    border-radius: 5px;
    width: 100%;
    padding: 5px 10px;
    color: grey;
  }

  .tab_view {
    width: 100%;
  }

  .btn_reset {
    border: none;
    outline: none;
    border-radius: 5px;
    padding: 5px 10px;
    background: #ea5c58;
    color: white;
    margin-top: 10px;
    transition: all 0.5s ease;

    &:hover {
      background: #e97874;
      transform: scale(1.05);
    }
  }
</style>

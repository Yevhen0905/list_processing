<template>
  <div class="container">
    <div class="wrapper_sorting_data">
      <div class="sorting_container">
        <h3 class="title">
          {{ changeLanguageText(languageOnThePage[0].sortingBy) }}
        </h3>
        <SortingByKey
          :sorting-buttons="changeLanguageButtonSorting(sortingButtons)"
          v-model="sortingKey"
          @click="resetDirectionWhenChangeKey"
        />
        <SortingByDirection
          :sorting-direction="changeLanguageButtonSorting(sortingDirection)"
          v-model="sortingDirect"
          :disabled="!sortingKey"
        />
      </div>
      <div class="filter_by_name">
        <h3 class="title">
          {{ changeLanguageText(languageOnThePage[0].searchByName) }}
        </h3>
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
        {{ changeLanguageText(languageOnThePage[0].reset) }}
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
            {{ changeLanguageText(languageOnThePage[0].tables) }}
          </SharedTabControl>
          <SharedTabControl name="preview" @click="changeTab('preview')">
            {{ changeLanguageText(languageOnThePage[0].preview) }}
          </SharedTabControl>
        </template>

        <template #default="{activeTab}">
          <Loader class="loader" v-if="loading" />
          <div v-else-if="filterAndSortedList.length">
            <template v-if="activeTab === 'tables'"
              ><ListTables
                :is-language="isLanguage"
                :list-people="filterAndSortedList"
            /></template>
            <template v-if="activeTab === 'preview'"
              ><ListPreview
                :is-language="isLanguage"
                :list-people="filterAndSortedList"
            /></template>
          </div>
          <div v-else class="list_empty">
            {{ changeLanguageText(languageOnThePage[0].emptyTables) }}
          </div>
        </template>
      </SharedTabs>
    </div>
  </div>
</template>

<script setup lang="ts">
  import {useRoute, useRouter} from 'vue-router';
  import {ref, computed, onMounted, watchEffect} from 'vue';

  import Loader from '../components/Loader.vue';
  import ListTables from '../components/ListTables.vue';
  import ListPreview from '../components/ListPreview.vue';
  import SharedTabs from '../components/SharedTabs.vue';
  import SharedTabControl from '../components/SharedTabControl.vue';
  import SortingByKey from '../components/SortingByKey.vue';
  import SortingByDirection from '../components/SortingByDirection.vue';

  import {sortingButtons, sortingDirection} from '../composables/useButtons.ts';
  import {useToggleLanguage} from '../composables/useToggleLanguage.ts';
  import {
    ListItem,
    useFilterAndSortedList
  } from '../composables/useFilterAndSortList.ts';

  const route = useRoute();
  const router = useRouter();

  const loading = ref(true);
  const listPeople = ref<ListItem[]>([]);
  const activeTab = ref<string>((route.query.tab as string) || 'tables');

  const {
    languageOnThePage,
    isLanguage,
    changeLanguage,
    changeLanguageText,
    changeLanguageButtonSorting
  } = useToggleLanguage();

  const {searchByName, sortingKey, sortingDirect, filterAndSortedList} =
    useFilterAndSortedList(listPeople);

  const resetSortingAndFiltering = (): void => {
    searchByName.value = '';
    sortingKey.value = '';
    sortingDirect.value = '';
    getFetch();
  };

  const resetDirectionWhenChangeKey = (): void => {
    sortingDirect.value = '';
  };

  const getFetch = async (): Promise<void> => {
    try {
      const res = await fetch('./data.json');
      const data: ListItem[] = await res.json();
      setTimeout(() => {
        listPeople.value = data;
        loading.value = false;
      }, 1000);
    } catch (e) {
      console.error(e);
    }
  };

  const changeTab = (tabName: string): void => {
    activeTab.value = tabName;
  };

  const queryParams = computed(() => {
    const tab = activeTab.value;
    const key = sortingKey.value;
    const order = sortingDirect.value;

    return {
      ...route.query,
      tab: tab !== '' ? tab : undefined,
      key: key !== '' ? key : undefined,
      order: order !== '' ? order : undefined
    };
  });

  watchEffect(() => {
    router.replace({query: queryParams.value});
  });

  onMounted(getFetch);
</script>

<style lang="scss"></style>

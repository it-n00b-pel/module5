<template>
    <div class="search-page">
        <div
            class="search-page__result-list container"
        >
            <search-result-list />
        </div>
        <ya-map class="search-page__map" />
    </div>
</template>

<script setup lang="ts">

import { onMounted, onUnmounted } from 'vue';

import YaMap from '@/components/entities/YandexMap/YaMap.vue';
import SearchResultList from '@/components/layout/serarchResult/SearchResultList.vue';
import { useStore } from '@/store';
import { MUTATIONS } from '@/types/mutations';

const store = useStore();

onMounted(() => {
  // @ts-ignore
  ym(95154025, 'reachGoal', 'website__redirect');
});
onUnmounted(() => {
  // тут спорный момент/стоит ли зачищать или нет
  // смотря какая бизнес логика
  store.commit(MUTATIONS.SET_PREVIEW_HOTEL_LIST, []);
  store.commit(MUTATIONS.CLEAR_SEARCH_RESULT, []);
});

</script>

<style scoped lang="scss">

.search-page {
  position: relative;
  padding-bottom: 50px;

  .search-page__result-list {
    display: flex;
  }

  .search-page__map {
    @media only screen and (max-width: 1024px) {
      display: none;
    }
  }
}

</style>

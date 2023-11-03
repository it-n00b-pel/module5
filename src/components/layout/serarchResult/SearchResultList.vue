<template>
    <div
        v-if="hotelList.length"
        class="searchResult"
    >
        <h3 class="searchResult__title">
            {{ hotelList.length }} Result{{ hotelList.length !== 1 ? 's' : '' }} Found
        </h3>
        <ya-map />
        <div class="searchResult__list">
            <router-link
                v-for="hotel in hotelList"
                :key="hotel._id"
                :to="{ name: 'details', params: { id: hotel._id}}"
            >
                <search-result-item :hotel="hotel" />
            </router-link>
        </div>

        <h3
            v-if="previewHotelList.length>3 && previewHotelList.length!==hotelList.length"
            class="searchResult__title"
            @click="fetchAllHotel"
        >
            Other as per found results...
        </h3>
    </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { ComputedRef } from 'vue/dist/vue';

import YaMap from '@/components/entities/YandexMap/YaMap.vue';
import SearchResultItem from '@/components/layout/serarchResult/SearchResultItem.vue';
import { RoutePath, router } from '@/router/routerConfig';
import { useStore } from '@/store';
import { ACTIONS } from '@/types/actions';
import { FeaturedHotelType, FullInfoHotelType } from '@/types/mainModelType';

const store = useStore();

const fetchAllHotel = () => {
  store.dispatch(ACTIONS.FETCH_ALL_HOTELS);
};

const hotelList: ComputedRef<Array<FullInfoHotelType>> = computed(() => store.getters.searchResult);
const previewHotelList: ComputedRef<Array<FeaturedHotelType>> = computed(() => store.getters.previewHotelList);

onMounted(async () => {
  // если отрыть без предварительного поиска то редирект на основную страницу
  if (!hotelList.value.length) {
    await router.push(RoutePath.home);
  }
});

</script>

<style scoped lang="scss">

.searchResult {
  display: flex;
  flex-direction: column;
  width: 534px;

  @media only screen and (max-width: 1024px) {
    width: 100%;
    gap: 60px;
  }

  .searchResult__title {
    padding: 100px 0;
    font-size: 36px;
    font-weight: 700;

    @media only screen and (max-width: 1024px) {
      padding: 50px 0 0;
    }
  }

  .searchResult__list {
    display: flex;
    flex-direction: column;
    gap: 60px;
  }
}
</style>

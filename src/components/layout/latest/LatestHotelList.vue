<template>
    <div class="latest">
        <h3 class="latest__title">
            Latest on the<br> Property Listing
        </h3>
        <div
            v-if="hotelList.length"
            class="latest__hotel-list"
        >
            <router-link
                v-for="hotel in hotelList"
                :key="hotel._id"
                class="latest__hotel-link"
                :to="{ name: 'details', params: { id: hotel._id}}"
            >
                <latest-hotel-item
                    :last="hotel"
                />
            </router-link>
        </div>
    </div>
</template>

<script setup lang="ts">

import { computed } from 'vue';
import { ComputedRef } from 'vue/dist/vue';

import LatestHotelItem from '@/components/layout/latest/LatestHotelItem.vue';
import { useStore } from '@/store';
import { LastHotelType } from '@/types/mainModelType';

const store = useStore();

const hotelList: ComputedRef<Array<LastHotelType>> = computed(() => store.getters.latest);

</script>

<style scoped lang="scss">;

.latest {
  margin: 0 auto;
  padding: 60px 0;

  .latest__title {
    font-size: 36px;

    &:after {
      display: block;
      width: 140px;
      content: '';
      height: 6px;
      background-color: $text-color-main;
      margin-top: 30px;
      border-radius: 3px;
    }
  }

  .latest__hotel-list {
    display: flex;
    justify-content: space-between;
    gap: 10px;
    flex-wrap: wrap;
    margin: 45px 0 0;

    @media only screen and (max-width: 1336px) {
      gap: 30px;
    }
    @media only screen and (max-width: 768px) {
      justify-content: center;
    }

    .latest__hotel-link{
      @media only screen and (max-width: 768px) {
        width: 45%;
      }
      @media only screen and (max-width: 600px) {
        max-width: 400px;
        width: 100%;
      }
    }
  }
}

</style>

<template>
    <div class="featured">
        <h3 class="featured__title">
            Latest on the<br> Property Listing
        </h3>
        <div
            v-if="featureList.length"
            class="featured__feature-list"
        >
            <router-link
                v-for="feature in featureList"
                :key="feature._id"
                :to="{ name: 'details', params: { id: feature._id}}"
                class="featured__item"
            >
                <featured-hotel-item
                    :featured="feature"
                />
            </router-link>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { ComputedRef } from 'vue/dist/vue';

import FeaturedHotelItem from '@/components/layout/featured/FeaturedHotelItem.vue';
import { useStore } from '@/store';
import { FeaturedHotelType } from '@/types/mainModelType';

const store = useStore();
const featureList: ComputedRef<Array<FeaturedHotelType>> = computed(() => store.getters.featured);

</script>

<style scoped lang="scss">

.featured {
  padding: 30px 0;

  .featured__title {
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

  .featured__feature-list {
    display: flex;
    column-gap: 30px;
    row-gap: 60px;
    flex-wrap: wrap;
    margin: 45px 0 0;

    .featured__item {
      max-width: 380px;
      width: 100%;

      @media only screen and (max-width: 1336px) {
        max-width: 350px;
      }

      @media only screen and (max-width: 1024px) {
        max-width: 330px;
      }

      @media only screen and (max-width: 768px) {
        max-width: 400px;
      }
    }

    @media only screen and (max-width: 1336px) {
      justify-content: space-around;
    }
  }
}

</style>

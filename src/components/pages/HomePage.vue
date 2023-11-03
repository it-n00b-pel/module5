<template>
    <div class="home-page">
        <div class="home-page__top">
            <banner
                v-if="banners.main"
                :image="banners.main.image"
                class="home-page__main-banner"
            />

            <div class="home-page__search-form">
                <search-form />
            </div>
        </div>
        <div class="container">
            <latest-hotel />
            <banner
                v-if="banners.second"
                :image="banners.second.image"
                :title="banners.second.title"
                :description="banners.second.description"
                border="12px"
                class="home-page__second-banner"
            />
            <featured-hotel-list />
            <banner
                v-if="banners.last"
                :image="banners.last.image"
                :title="banners.last.title"
                :description="banners.last.description"
                border="12px"
                class="home-page__last-banner"
            />
        </div>
        <new-later />
        <app-footer />
    </div>
</template>

<script setup lang="ts">
import { computed, ComputedRef } from 'vue';

import Banner from '@/components/entities/Banner/Banner.vue';
import NewLater from '@/components/entities/NewsLater/NewsLater.vue';
import SearchForm from '@/components/entities/SearchForm/SearchForm.vue';
import AppFooter from '@/components/layout/AppFooter.vue';
import FeaturedHotelList from '@/components/layout/featured/FeaturedHotelList.vue';
import LatestHotel from '@/components/layout/latest/LatestHotelList.vue';
import { useStore } from '@/store';
import { BannersListType } from '@/types/mainModelType';

const store = useStore();
const banners: ComputedRef<BannersListType> = computed(() => store.getters.banners);

</script>

<style scoped lang="scss">
.home-page {
  .home-page__top {
    position: relative;

    .home-page__main-banner {
      max-width: 1366px;
      height: 577px;
      margin: 0 auto;
    }

    .home-page__search-form {
      position: absolute;
      width: 100%;
      bottom: 70px;
      padding: 0 30px;
    }
  }

  .home-page__second-banner, .home-page__last-banner {
    height: 395px;
  }

  .home-page__last-banner {
    margin: 20px 0 30px;
  }
}

</style>

<template>
    <div
        v-if="hotelInfo && Object.keys(hotelInfo).length !== 0"
        style="margin-top: 30px"
    >
        <photo-gallery />
        <div class="details__container container ">
            <about-hotel />
            <amenities />

            <yandex-map
                v-if="coordinates.length"
                :coordinates="coordinates"
                :contrrelfols="['zoomControl']"
                class="details__map"
            >
                <yandex-marker
                    :coordinates="coordinates"
                    :marker-id="hotelInfo._id"
                    :options="markerOptions"
                />
            </yandex-map>
            <reviews />
        </div>
    </div>
    <app-footer />
</template>

<script setup lang="ts">
import { computed, onMounted, Ref, ref } from 'vue';
import { ComputedRef } from 'vue/dist/vue';
import { useRoute } from 'vue-router';
import { loadYmap, YandexMap, YandexMarker } from 'vue-yandex-maps';

import location_pointer from '@/assets/img/location pointer.png';
import AboutHotel from '@/components/entities/AboutHotel/AboutHotel.vue';
import Amenities from '@/components/entities/Amenities/Amenities.vue';
import PhotoGallery from '@/components/entities/PhotoGalery/PhotoGallery.vue';
import Reviews from '@/components/entities/Reviews/Reviews.vue';
import AppFooter from '@/components/layout/AppFooter.vue';
import { settings } from '@/config/YaMap';
import { useStore } from '@/store';
import { ACTIONS } from '@/types/actions';
import { FullInfoHotelType } from '@/types/mainModelType';

const markerOptions = {
  iconLayout: 'default#image',
  iconImageHref: location_pointer,
  iconImageSize: [52, 66],
  iconShadow: true,
};

const coordinates: Ref<Array<number>> = ref([]);

const store = useStore();
const route = useRoute();
const hotelInfo: ComputedRef<FullInfoHotelType> = computed(() => store.getters.hotelInfo);

const id = computed(() => route.params.id);

onMounted(async () => {
  await store.dispatch(ACTIONS.FETCH_SOME_HOTEL, id.value);
  await loadYmap(settings);

  coordinates.value = [+hotelInfo.value.coords[0], +hotelInfo.value.coords[1]];
  // @ts-ignore
  ym(95154025, 'reachGoal', 'website__card-click ');
});

</script>

<style scoped lang="scss">

.details__container {
  display: flex;
  flex-direction: column;
  gap: 30px;
  padding-bottom: 30px;

  .details__map {
    height: 420px;
    max-width: 770px;
  }
}

</style>

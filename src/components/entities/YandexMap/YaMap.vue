<template>
    <div v-if="hotels.length">
        <yandex-map
            :settings="settings"
            :coordinates="coordinates"
            :zoom="5"
            class="ya-map"
        >
            <yandex-marker
                v-for="hotel in hotels"
                :key="hotel._id"
                :coordinates="[+hotel.coords[0], +hotel.coords[1]]"
                :marker-id="hotel._id"
                :options="markerOptions"
            >
                <template
                    #component
                >
                    <router-link :to="{ name: 'details', params: { id: hotel._id}}">
                        <div class="ya-map__balloon">
                            <div class="ya-map__balloon-carousel">
                                <yandex-balloon-carousel :images="hotel.images" />
                            </div>

                            <div class="ya-map__balloon-data">
                                <div class="ya-map__location-name">
                                    <h3 class="ya-map__hotel-name">
                                        {{ hotel.name }}
                                    </h3>
                                    <p class="ya-map__address">
                                        {{ hotel.address }}
                                    </p>
                                </div>

                                <div class="ya-map__amenities">
                                    <div
                                        v-for="amenity in
                                            nameAmenities(hotel.info[0])"
                                        :key="amenity"
                                        class="ya-map__room"
                                    >
                                        <icon-base
                                            :icon-name="amenity"
                                            width="23"
                                            height="17"
                                        />
                                        <p v-if="amenity==='bedroom' || amenity==='bathroom'">
                                            {{ hotel.info[0][amenity] }}
                                        </p>
                                        <p v-else>
                                            {{ getRandomNumber() }}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </router-link>
                </template>
            </yandex-marker>
        </yandex-map>
    </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { ComputedRef } from 'vue/dist/vue';
import { loadYmap, YandexMap, YandexMarker } from 'vue-yandex-maps';

import location_pointer from '@/assets/img/location pointer.png';
import YandexBalloonCarousel from '@/components/entities/YandexMap/YandexBalloonCarousel.vue';
import IconBase from '@/components/ui/IconBase.vue';
import { settings } from '@/config/YaMap';
import { useStore } from '@/store';
import { FullInfoHotelType } from '@/types/mainModelType';

const markerOptions = {
  iconLayout: 'default#image',
  iconImageHref: location_pointer,
  iconImageSize: [52, 66],
  iconShadow: true,
};

const store = useStore();

const hotels: ComputedRef<Array<FullInfoHotelType>> = computed(() => {
  return store.getters.searchResult;
});

// центрируем карту (среднее значение всех координат отелей)
const coordinates = computed(() => {
  // просто вы#бнулся, обычно бы прошелся простым for-ом
  const [x, y] = hotels.value.reduce((acc: Array<number>, hotel: FullInfoHotelType) => {
    acc[0] += +hotel.coords[0];
    acc[1] += +hotel.coords[1];
    return acc;
  }, [0, 0]);

  return [x / hotels.value.length, y / hotels.value.length];
});

const nameAmenities = (obj: { bedroom: number, bathroom: number }) => {
  const arr = Object.keys(obj);
  arr.push('carSvg');
  arr.push('petSvg');
  return arr;
};

const getRandomNumber = () => {
  return Math.floor(Math.random() * (10 - 1 + 1)) + 1;
};

onMounted(async () => {
  await loadYmap(settings);
});

</script>

<style lang="scss">

.ya-map {
  width: 668px;
  height: 736px;
  position: absolute;
  right: 0;
  top: 0;

  @media only screen and (max-width: 2560px) {
    width: 45%;
  }

  @media only screen and (max-width: 1440px) {
    width: 50%;
  }

  @media only screen and (max-width: 1336px) {
    width: 40%;
    height: 600px;
  }

  @media only screen and (max-width: 1024px) {
    position: relative;
    width: 100%;
    height: 400px;
  }

  // ху# знает как правильно касмомизировать стили balloon
  // потому как-то так / зато работает
  .ymaps-2-1-79-balloon__layout, .ymaps-2-1-79-balloon {
    border-radius: 10px;
  }

  .ymaps-2-1-79-balloon__content {
    padding: 0;
    margin: 0;
    height: 160px;
  }

  .ymaps-2-1-79-balloon__tail {
    display: none;
  }

  .ymaps-2-1-79-balloon__content ymaps {
    padding: 0;
    margin: 0;
    max-width: 455px !important;
    width: 100% !important;

    @media only screen and (max-width: 768px) {
      max-width: 280px !important;
      width: 100% !important;
    }
  }

  .ymaps-2-1-79-balloon__close-button {
    height: 30px;
  }

  .yandex-balloon {
    height: 160px;
    max-width: 400px;
    width: 100%;
    border-radius: 10px;
    display: flex;
  }

  .ya-map__balloon {
    display: flex;
    align-items: center;
    gap: 20px;
    @media only screen and (max-width: 1024px) {
      padding: 20px;
    }

    .ya-map__balloon-carousel {
      width: 160px;
      height: 160px;

      @media only screen and (max-width: 1024px) {
        display: none;
        padding: 20px;
      }
    }

    .ya-map__balloon-data {
      display: flex;
      flex-direction: column;
      gap: 15px;
      width: 300px;

      .ya-map__location-name {
        width: 80%;

        .ya-map__hotel-name {
          font-weight: 700;
          padding-bottom: 10px;
          font-size: $font-size-xxl;
          color: $text-color-main;
        }

        .ya-map__address {
          font-size: $font-size-sm;
          color: $text-color-secondary;
        }
      }

      .ya-map__amenities {
        display: flex;
        gap: 15px;
        align-items: center;
        color: $text-color-main;
        font-size: $font-size-sm;
        font-weight: 600;

        .ya-map__room {
          display: flex;
          align-items: center;
          gap: 5px;
        }
      }

      .yaMap__accommodationDetails {
        display: flex;
        align-items: center;
        gap: 20px;
        font-weight: 600;
        font-size: $font-size-sm;
        color: $text-color-secondary;

        .yaMap__accommodationSeparator {
          background-color: $bg-color-button;
          height: 16px;
          width: 1px;
        }
      }
    }
  }
}
</style>

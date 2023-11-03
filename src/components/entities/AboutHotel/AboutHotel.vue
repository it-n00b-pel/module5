<template>
    <div class="about__container">
        <div
            class="about"
        >
            <div class="about__head">
                <div class="about__text-container">
                    <h3 class="about__hotel-name">
                        {{ hotelInfo.name }}
                    </h3>
                    <a
                        class="about__hotel-address"
                        target="_blank"
                        :href="`https://yandex.ru/maps/?ll=${hotelInfo.coords[0]},${hotelInfo.coords[1]}`"
                    > {{ hotelInfo.address }}</a>
                </div>
                <div class="about__icons-group">
                    <span class="about__icon-item_hovered">
                        <icon-base
                            icon-name="heart"
                            width="32"
                            height="28"
                        />
                    </span>
                    <span class="about__icon-item_hovered">
                        <icon-base
                            icon-name="share"
                            width="28"
                            height="38"
                            class="about__iconItem_hovered"
                        />
                    </span>
                </div>
            </div>

            <div class="about__hotel-rooms">
                <div class="about__hotel-room">
                    <icon-base
                        icon-name="bedroom"
                        width="43"
                        height="32"
                    />
                    <p class="about__hotel-room-amount">
                        {{ hotelInfo.info[0].bedroom }} Bedrooms
                    </p>
                </div>
                <div class="about__hotel-room">
                    <icon-base
                        icon-name="bathroom"
                        width="36"
                        height="36"
                    />
                    <p class="about__hotel-room-amount">
                        {{ hotelInfo.info[0].bathroom }} Bathrooms
                    </p>
                </div>
            </div>

            <div
                v-if="hotelInfo.description.length"
                class="about__description"
            >
                <h3 class="about__description-title">
                    Apartment Description
                </h3>
                <!-- eslint-disable vue/no-v-html-->
                <p
                    class="about__description-text"
                    v-html="lineBreaks(hotelInfo.description[0])"
                />
            </div>
        </div>
        <order-card />
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { ComputedRef } from 'vue/dist/vue';

import OrderCard from '@/components/entities/OredrCard/OrderCard.vue';
import IconBase from '@/components/ui/IconBase.vue';
import { useStore } from '@/store';
import { FullInfoHotelType } from '@/types/mainModelType';

const store = useStore();

const hotelInfo: ComputedRef<FullInfoHotelType> = computed(() => store.getters.hotelInfo);

const lineBreaks = (str: string) => {
  return str.replace(/\n/g, '<br><br>');
};

</script>

<style scoped lang="scss">

.about__container {
  padding: 60px 0 0;
  display: flex;
  justify-content: space-between;
  gap: 30px;

  @media only screen and (max-width: 1024px) {
    flex-direction: column-reverse;
  }

  .about {
    max-width: 745px;
    display: flex;
    flex-direction: column;
    gap: 30px;

    .about__head {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 30px;

      .about__text-container {
        padding: 10px 0;

        .about__hotel-name {
          font-size: 28px;
          font-weight: 700;

          @media only screen and (max-width: 425px) {
            font-size: $font-size-md;
          }
        }

        .about__hotel-address {
          font-size: $font-size-lg;
          font-weight: 500;
          color: $text-color-secondary;

          @media only screen and (max-width: 425px) {
            font-size: $font-size-xs;
          }
        }

      }

      .about__icons-group {
        display: flex;
        gap: 15px;
        align-items: center;

        .about__icon-item_hovered {
          transition: .2s ease;

          &:hover {
            cursor: pointer;
            transform: scale(1.1);
          }
        }
      }
    }

    .about__hotel-rooms {
      display: flex;
      gap: 15px;

      @media only screen and (max-width: 425px) {
        justify-content: center;
      }

      .about__hotel-room {
        width: 176px;
        height: 160px;
        border-radius: 8px;
        display: flex;
        background-color: $bg-color-primary;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 10px;

        @media only screen and (max-width: 425px) {
          width: 120px;
          height: 100px;
        }

        .about__hotel-room-amount {
          font-weight: 600;
          font-size: $font-size-lg;

          @media only screen and (max-width: 425px) {
            font-size: $font-size-sm;
          }
        }

      }
    }

    .about__description {
      .about__description-title {
        font-weight: 700;
        font-size: $font-size-xxxl;
      }

      .about__description-text {
        font-weight: 400;
        font-size: $font-size-md;
        padding-top: 15px;
        color: $text-color-secondary;
        @media only screen and (max-width: 768px) {
          font-size: $font-size-xs;
        }

        @media only screen and (max-width: 768px) {
          font-size: $font-size-xxs;
        }
      }
    }
  }
}

</style>

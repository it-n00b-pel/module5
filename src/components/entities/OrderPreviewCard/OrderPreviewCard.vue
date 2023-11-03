<template>
    <div class="preview">
        <div class="preview__head">
            <img
                class="preview__img"
                :src="hotelInfo.images[0]"
                alt="hotel image"
            >
            <div class="preview__data">
                <h3 class="preview__hotel-name">
                    {{ hotelInfo.name }}
                </h3>
                <a
                    class="preview__hotel-address"
                    :href="`https://yandex.ru/maps/?ll=${hotelInfo.coords[0]},
                    ${hotelInfo.coords[1]}&z=14&pt=${hotelInfo.coords[0]},${hotelInfo.coords[1]}`"
                    target="_blank`"
                > {{ hotelInfo.address }}</a>

                <div class="preview__line" />
                <p class="preview__hotel-rooms">
                    <span>
                        {{ hotelInfo.info[0].bedroom }} Bedroom
                    </span>
                    <span>
                        {{ hotelInfo.info[0].bathroom }}
                        Bathroom
                    </span>
                </p>
            </div>
        </div>

        <div class="preview__bottom">
            <h3 class="preview__price-title">
                Price Detail
            </h3>
            <div class="preview__price-details">
                <p class="preview__price">
                    Short Period: {{ hotelInfo.price[0] }}
                </p>
                <p class="preview__price">
                    Medium Period: ${{ mediumValue }}
                </p>
                <p class="preview__price">
                    Long Period: {{ hotelInfo.price[1] }}
                </p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, onMounted, Ref, ref } from 'vue';
import { ComputedRef } from 'vue/dist/vue';

import { useStore } from '@/store';
import { FullInfoHotelType } from '@/types/mainModelType';

const mediumValue: Ref<number> = ref(0);
const store = useStore();
const hotelInfo: ComputedRef<FullInfoHotelType> = computed(() => store.getters.hotelInfo);

onMounted(() => {
  const min = +hotelInfo.value.price[0].split('$')[1];
  const max = +hotelInfo.value.price[1].split('$')[1];

  mediumValue.value = +((min + max) / 2).toFixed();
});
</script>

<style scoped lang="scss">

.preview {
  background-color: $bg-color-primary;
  padding: 30px;
  box-shadow: 0 0 16px 0 #C2C6CC99;
  max-width: 480px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 60px;
  height: 350px;

  @media only screen and (max-width: 600px) {
    gap: 30px;
    padding: 15px;
    height: 320px;
  }

  .preview__head {
    display: flex;
    gap: 20px;
    align-items: center;

    .preview__img {
      height: 100px;
      width: 100px;
      border-radius: 6px;

      @media only screen and (max-width: 600px) {
        display: none;
      }
    }

    .preview__data {
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      .preview__hotel-name {
        font-weight: 700;
      }

      .preview__hotel-address, .preview__hotel-rooms {
        font-size: $font-size-sm;
        color: $text-color-secondary;
      }

      .preview__hotel-rooms {
        font-weight: 600;

        & span {
          padding-right: 15px;
        }
      }

      .preview__line {
        margin: 10px 0;
        background-color: $bg-color-button;
        height: 1px;
      }
    }
  }

  .preview__bottom {
    display: flex;
    flex-direction: column;
    gap: 30px;

    .preview__price-title {
      font-size: $font-size-xxl;
    }

    .preview__price-details {
      .preview__price {
        font-size: $font-size-md;
        color: $text-color-secondary;
      }
    }
  }
}

</style>

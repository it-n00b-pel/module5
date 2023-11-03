<template>
    <div class="feature">
        <div
            class="feature__item"
        >
            <carousel
                v-if="featured.images"
                ref="carousel"
                v-model="currentSlide"
                :wrap-around="true"
                snap-align="start"
                class="feature__carousel"
                draggable="false"
                :mouse-drag="false"
                :touch-drag="true"
            >
                <slide
                    v-for="image in featured.images"
                    :key="image"
                >
                    <div
                        class="feature__carousel-item"
                        :style="{ backgroundImage: `url(${image})` }"
                    />
                </slide>
            </carousel>

            <span
                class="last__heart"
                @click.prevent
            >
                <icon-base
                    icon-name="heart"
                    width="35"
                    height="28"
                />
            </span>

            <p class="feature__price">
                $ {{ startPrice }} - {{ endPrice }} USD
            </p>
            <div
                v-if="featured.images"
                class="feature__navigation"
                @click.prevent
            >
                <span
                    v-for="(feature, index) in featured.images"
                    :key="feature"
                    :class="{'feature__navigation-dot':true,
                             'feature__navigation-dot-active':(index ===
                                 currentSlide)}"
                    @click="slideTo(index)"
                />
            </div>
        </div>
        <div class="feature__data">
            <h3 class="feature__name">
                {{ featured.name }}
            </h3>
            <p class="feature__address">
                {{ featured.address }}
            </p>
            <div
                class="feature__info"
            >
                <div class="feature__room">
                    <icon-base
                        icon-name="bedroom"
                        width="23"
                        height="17"
                    />
                    <p>{{ featured.info[0].bedroom }}</p>
                </div>
                <div class="feature__room">
                    <icon-base
                        icon-name="bathroom"
                        width="19"
                        height="19"
                    />
                    <p>{{ featured.info[0].bathroom }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import 'vue3-carousel/dist/carousel.css';

import { computed, PropType, Ref, ref } from 'vue';
import { Carousel, Slide } from 'vue3-carousel';

import IconBase from '@/components/ui/IconBase.vue';
import { FeaturedHotelType } from '@/types/mainModelType';

const props = defineProps({
  featured: {
    type: Object as PropType<FeaturedHotelType>,
    default: {} as PropType<FeaturedHotelType>,
  },
});

const currentSlide: Ref<number> = ref(0);
const startPrice = computed(() => {
  if (props.featured.price && props.featured.price.length > 0) {
    return props.featured.price[0].substring(1);
  }
  return 0;
});

const endPrice = computed(() => {
  if (props.featured.price && props.featured.price.length > 0) {
    return props.featured.price[1].substring(1);
  }
  return 0;
});

const slideTo = (val: number) => {
  currentSlide.value = val;
};

</script>

<style scoped lang="scss">

.feature {

  .feature__item {
    height: 340px;
    position: relative;
    border-radius: 12px;
    transition: .3s ease;
    filter: grayscale(0.77);
    background-color: #E0E2E6;

    @media only screen and (max-width: 425px) {
      height: 360px;
    }

    &:hover {
      box-shadow: 0 10px 20px $text-color-secondary;
      transform: scale(1.1);
      filter: grayscale(0)
    }

    .feature__carousel-item {
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
      position: relative;
      width: 100%;
      height: 280px;
      border-top-left-radius: 12px;
      border-top-right-radius: 12px;
    }

    .last__heart {
      position: absolute;
      top: 20px;
      right: 20px;

      &:hover {
        transform: scale(1.1);
        cursor: pointer;
      }
    }

    .feature__price {
      position: absolute;
      bottom: 20px;
      left: 20px;
      cursor: default;
      font-size: $font-size-xxl;
      font-weight: 600;
      color: $text-color-secondary;
      pointer-events: none;

      @media only screen and (max-width: 768px) {
        font-size: $font-size-xl;
      }

      @media only screen and (max-width: 425px) {
        bottom: 45px;
      }
    }

    .feature__navigation {
      display: flex;
      position: absolute;
      bottom: 25px;
      right: 20px;
      gap: 5px;

      .feature__navigation-dot {
        width: 10px;
        height: 10px;
        background-color: #fff;
        border-radius: 50%;

        &:hover {
          transform: scale(1.2);
          background-color: $text-color-main;
          cursor: pointer;
        }

        &:active {
          background-color: #000;
        }
      }

      .feature__navigation-dot-active {
        background-color: #08ff00;
        transform: scale(1.25);
      }
    }
  }

  .feature__data {
    .feature__name {
      margin-top: 30px;
      font-size: $font-size-xxl;
      color: $text-color-main;
    }

    .feature__address {
      margin-top: 5px;
      font-size: $font-size-sm;
      color: $text-color-secondary;
    }

    .feature__info {
      display: flex;
      margin-top: 10px;
      gap: 20px;
      color: $text-color-main;

      .feature__room {
        display: flex;
        align-items: center;
        gap: 5px;
      }
    }
  }
}

</style>

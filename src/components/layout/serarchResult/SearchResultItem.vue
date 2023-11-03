<template>
    <div class="hotel">
        <div
            class="hotel__topData"
        >
            <div
                v-if="hotel"
                class="hotel_images"
            >
                <carousel
                    v-if="hotel.images"
                    ref="carousel"
                    v-model="currentSlide"
                    snap-align="start"
                    class="hotel__carousel"
                    :mouse-drag="false"
                    :touch-drag="true"
                >
                    <slide
                        v-for="image in hotel.images"
                        :key="image"
                    >
                        <div
                            class="hotel__carousel-item"
                            :style="{ backgroundImage: `url(${image})` }"
                        />
                    </slide>
                </carousel>
            </div>
            <div
                class="hotel__heart"
                @click.prevent
            >
                <icon-base
                    icon-name="heart"
                    width="30"
                    height="30"
                />
            </div>
            <div class="hotel__author">
                <img
                    :src="hotel.author.avatar"
                    class="hotel_authorAvatar"
                    alt="author avatar"
                >
                <div class="hotel__authorData">
                    <span class="hotel__listedBy">Listed By:</span>
                    <h3 class="hotel__authorName">
                        Author name
                    </h3>
                    <p class="hotel__price">
                        For: {{ hotel.price[0] }} - {{ hotel.price[1] }}
                    </p>
                </div>
            </div>
            <div
                v-if="hotel.images"
                class="hotel__navigation"
                @click.prevent
            >
                <span
                    v-for="(feature, index) in hotel.images"
                    :key="feature"
                    :class="{'hotel__navigationDot':true, 'hotel__navigationDotActive':(index ===
                        currentSlide)}"
                    @click.prevent="slideTo(index )"
                />
            </div>
        </div>
        <div class="hotel_bottom">
            <div class="hotel__locationName">
                <h3 class="hotel__hotelName">
                    {{ hotel.name }}
                </h3>
                <p class="hotel__address">
                    {{ hotel.address }}
                </p>
            </div>

            <div class="hotel__amenities">
                <div class="hotel__room">
                    <icon-base
                        icon-name="bedroom"
                        width="23"
                        height="17.25"
                    />
                    <p>{{ hotel.info[0].bedroom }}</p>
                </div>
                <div class="hotel__room">
                    <icon-base
                        icon-name="bathroom"
                        width="19"
                        height="19"
                    />
                    <p>{{ hotel.info[0].bathroom }}</p>
                </div>
            </div>
            <div class="hotel__accommodationDetails">
                <p>{{ hotel.type[0] }}</p>
                <span class="hotel__accommodationSeparator" />
                <p>{{ period }} : {{ hotel.period[0] }}</p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, Ref, ref } from 'vue';
import { PropType } from 'vue/dist/vue';
import { Carousel, Slide } from 'vue3-carousel';

import IconBase from '@/components/ui/IconBase.vue';
import { FullInfoHotelType } from '@/types/mainModelType';

type PropsType = {
  hotel: FullInfoHotelType
}

const props: PropsType = defineProps({
  hotel: {
    type: Object as PropType<FullInfoHotelType>,
    required: true,
  },
});

const { hotel, } = props;

const currentSlide: Ref<number> = ref(0);

const period = computed(() => {
  return hotel.period[0].toLowerCase().includes('years') ? 'For Long Period' :
      'For Short Period';
});

const slideTo = (val: number) => {
  currentSlide.value = val;
};

</script>

<style scoped lang="scss">

.hotel {
  width: 100%;
  box-shadow: 0 0 10px 0 $bg-color-shadow;
  border-radius: 16px;
  filter: grayscale(.77);
  transition: .3s ease;

  &:hover {
    box-shadow: 0 10px 10px $bg-color-shadow;
    transform: scale(1.025);
    filter: grayscale(0)
  }

  .hotel__topData {
    position: relative;

    .hotel_images {
      position: relative;
      transition: .3s ease;
      //width: 574px;
      width: 100%;

      height: 384px;

      .hotel__carousel {
        .hotel__carousel-item {
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          position: relative;
          width: 100%;
          height: 384px;
          border-radius: 16px 16px 0 0;
        }
      }
    }

    .hotel__heart {
      position: absolute;
      top: 20px;
      right: 20px;

      &:hover {
        transform: scale(1.1);
        cursor: pointer;
      }
    }

    .hotel__navigation {
      display: flex;
      position: absolute;
      padding: 20px;
      bottom: 0;
      right: 0;
      gap: 5px;

      .hotel__navigationDot {
        width: 10px;
        height: 10px;
        background-color: $bg-color-white;
        border-radius: 50%;

        &:hover {
          transform: scale(1.2);
          background-color: $text-color-main;
          cursor: pointer;
        }

        &:active {
          background-color: $bg-color-black;
        }
      }

      .hotel__navigationDotActive {
        background-color: $bg-color-active-dot;
        transform: scale(1.25);
      }
    }

    .hotel__author {
      position: absolute;
      bottom: 20px;
      left: 20px;
      display: flex;
      gap: 20px;
      align-items: center;
      color: $text-color-main;
      backdrop-filter: blur(4px) contrast(60%);
      background-color: $text-color-light;
      border-radius: 50px 60px 20px 50px;

      @media only screen and (max-width: 600px) {
        bottom: 50px;
      }

      @media only screen and (max-width: 425px) {
        gap: 10px;
      }

      .hotel_authorAvatar {
        border-radius: 50%;
        height: 76px;

        &:hover {
          cursor: pointer;
        }

        @media only screen and (max-width: 425px) {
          height: 58px;
        }
      }

      .hotel__authorData {
        display: flex;
        flex-direction: column;
        gap: 5px;
        padding-right: 10px;

        .hotel__listedBy {
          font-size: $font-size-xxs;
        }

        .hotel__authorName {
          font-size: $font-size-xxl;
          @media only screen and (max-width: 425px) {
            font-size: $font-size-xl;
          }
        }

        .hotel__price {
          font-size: $font-size-lg;
          @media only screen and (max-width: 425px) {
            font-size: $font-size-sm;
          }
        }
      }
    }
  }

  .hotel_bottom {
    display: flex;
    flex-direction: column;
    gap: 15px;
    padding: 20px;

    .hotel__locationName {
      .hotel__hotelName {
        font-weight: 700;
        font-size: $font-size-xxl;
        color: $text-color-main;
      }

      .hotel__address {
        font-size: $font-size-sm;
        color: $text-color-secondary;
      }
    }

    .hotel__amenities {
      display: flex;
      gap: 20px;
      color: $text-color-secondary;

      .hotel__room {
        display: flex;
        align-items: center;
        gap: 5px;
        color: $text-color-main;
      }
    }

    .hotel__accommodationDetails {
      display: flex;
      align-items: center;
      gap: 20px;
      font-weight: 600;
      font-size: $font-size-sm;
      color: $text-color-secondary;

      .hotel__accommodationSeparator {
        background-color: $bg-color-button;
        height: 16px;
        width: 1px;
      }
    }
  }
}

</style>

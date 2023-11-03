<template>
    <div
        class="last"
        :style="{ backgroundImage: `url(${last.image})` }"
    >
        <span
            class="last__heart"
            @click.prevent
        >
            <icon-base
                icon-name="heart"
                width="35"
                height="27"
            />
        </span>

        <div class="last__info">
            <img
                :src="last.author.avatar"
                class="last_avatar"
                alt="author avatar"
            >
            <div class="last__info-data">
                <h3 class="last__title">
                    {{ last.name }}
                </h3>
                <p class="last__address">
                    {{ last.address }}
                </p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { PropType } from 'vue';

import IconBase from '@/components/ui/IconBase.vue';
import { LastHotelType } from '@/types/mainModelType';

defineProps({
  last: {
    type: Object as PropType<LastHotelType>,
    default: {} as PropType<LastHotelType>,
  },
});

</script>

<style scoped lang="scss">

.last {
  width: 280px;
  height: 340px;

  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  filter: grayscale(.77);
  transition: .3s;

  @media only screen and (max-width: 768px) {
    width: 100%;
  }

  &:hover {
    filter: grayscale(0);
    transform: scale(1.1);
    box-shadow: 0 10px 20px $text-color-secondary;
  }

  .last__heart {
    margin-top: 20px;
    margin-right: 20px;
    align-self: end;

    &:hover {
      transform: scale(1.1);
      cursor: pointer;
    }
  }

  .last__info {
    padding-bottom: 20px;

    .last__info-data {
      backdrop-filter: blur(2px) brightness(30%);
      border-radius: 5px;
      padding: 5px 20px;
      height: 80px;

      .last__title {
        color: $text-color-main;
        font-size: $font-size-xl;
        margin-bottom: 10px;

        @media only screen and (max-width: 768px) {
          font-size: $font-size-md;
        }
      }

      .last__address {
        color: $text-color-secondary;
        font-size: $font-size-xs;
        font-weight: 500;

        @media only screen and (max-width: 768px) {
          font-size: $font-size-xxs;
          font-weight: 400;
        }
      }
    }

    .last_avatar {
      height: 70px;
      border-radius: 50%;
      margin-bottom: 10px;
      margin-left: 20px;

      @media only screen and (max-width: 768px) {
        height: 35px;
      }
    }
  }
}

</style>

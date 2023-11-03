<template>
    <div class="reviews">
        <div class="reviews__head">
            <h3 class="reviews__title">
                Reviews
            </h3>

            <span class="reviews__star">
                <icon-base
                    icon-name="star"
                    width="20"
                    height="20"
                />
            </span>

            <h3 class="reviews__title">
                {{ total }}
            </h3>
        </div>

        <div class="reviews__ratings">
            <div class="reviews__rating-item">
                <h3 class="reviews__rating-title">
                    Amenities
                </h3>
                <div class="reviews__rating-value">
                    <div
                        :style="{width: `${amenities*27}px`}"
                        class="reviews__rating-line"
                    />
                    <span class="reviews__rating-num">{{ amenities }}</span>
                </div>
            </div>

            <div class="reviews__rating-item">
                <h3 class="reviews__rating-title">
                    Communications
                </h3>
                <div class="reviews__rating-value">
                    <div
                        :style="{width: `${communication*27}px`}"
                        class="reviews__rating-line"
                    />
                    <span class="reviews__rating-num">{{ communication }}</span>
                </div>
            </div>

            <div class="reviews__rating-item">
                <h3 class="reviews__rating-title">
                    Value Of Money
                </h3>
                <div class="reviews__rating-value">
                    <div
                        :style="{width: `${money*27}px`}"
                        class="reviews__rating-line"
                    />
                    <span class="reviews__rating-num">{{ money }}</span>
                </div>
            </div>

            <div class="reviews__rating-item">
                <h3 class="reviews__rating-title">
                    Hygiene
                </h3>
                <div class="reviews__rating-value">
                    <div
                        :style="{width: `${hygiene*27}px`}"
                        class="reviews__rating-line"
                    />
                    <span class="reviews__rating-num">{{ hygiene }}</span>
                </div>
            </div>

            <div class="reviews__rating-item">
                <h3 class="reviews__rating-title">
                    Location Of Property
                </h3>
                <div class="reviews__rating-value">
                    <div
                        :style="{width: `${location*27}px`}"
                        class="reviews__rating-line"
                    />
                    <span class="reviews__rating-num">{{ location }}</span>
                </div>
            </div>
        </div>

        <div class="reviews__comments">
            <transition-group
                name="list"
            >
                <comment
                    v-for="review in list"
                    :key="review.author.avatar"
                    :review="review"
                    class="reviews__item"
                />
            </transition-group>
        </div>

        <show-all-button
            :is-full-list="isFullList"
            :name="buttonText"
            class="reviews__btn"
            @change-length-list="changeLengthList"
        />
    </div>
</template>

<script setup lang="ts">
import { computed, onMounted, Ref, ref, watch } from 'vue';
import { ComputedRef } from 'vue/dist/vue';

import Comment from '@/components/entities/Comment/Comment.vue';
import IconBase from '@/components/ui/IconBase.vue';
import ShowAllButton from '@/components/ui/ShowAllButton.vue';
import { useStore } from '@/store';
import { ReviewType } from '@/types/mainModelType';

const amenities: Ref<number> = ref(0);
const communication: Ref<number> = ref(0);
const money: Ref<number> = ref(0);
const hygiene: Ref<number> = ref(0);
const location: Ref<number> = ref(0);
const total: Ref<number> = ref(0);
const buttonText: Ref<string> = ref('');
const isFullList: Ref<boolean> = ref(false);
const reviews: ComputedRef<Array<ReviewType>> = computed(() => store.getters.reviews);
const list: Ref<Array<ReviewType>> = ref([]);

const store = useStore();

watch(() => isFullList.value, () => {
  if (isFullList.value) {
    list.value = reviews.value;
  } else {
    list.value = reviews.value.slice(0, 6);
  }
});

const getRandomValue = () => {
  return +((Math.random() * (5.0 - 3.5)) + 3.5).toFixed(1);
};

const changeLengthList = () => {
  isFullList.value = !isFullList.value;
};

onMounted(() => {
  // всех этих данных нет с бека
  // сделамем хоть каккую-то динамику рейтинга
  amenities.value = getRandomValue();
  communication.value = getRandomValue();
  money.value = getRandomValue();
  hygiene.value = getRandomValue();
  location.value = getRandomValue();
  total.value = +((hygiene.value + communication.value + location.value +
      amenities.value) / 5).toFixed(1);

  list.value = reviews.value.slice(0, 6);
  buttonText.value = `Show All ${reviews.value.length} Reviews`;
});

</script>

<style scoped lang="scss">

.list-item {
  display: inline-block;
  margin-right: 10px;
}

.list-enter-active,
.list-leave-active {
  transition: all 0.3s linear;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(50px);
}

.reviews {
  max-width: 770px;

  .reviews__head {
    display: flex;

    align-items: center;

    .reviews__star {
      margin: 10px;
    }

    .reviews__title {
      font-weight: 700;
      font-size: $font-size-xxxl;
    }
  }

  .reviews__ratings {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-top: 15px;
    column-gap: 30px;

    .reviews__rating-item {
      display: flex;
      width: 330px;
      justify-content: space-between;
      padding: 5px 0;

      .reviews__rating-title {
        font-size: $font-size-lg;
        font-weight: 500;
      }

      .reviews__rating-value {
        display: flex;
        align-items: center;
        width: 165px;
        justify-content: space-between;

        @media only screen and (max-width: 425px) {
          width: 20px;
        }

        .reviews__rating-line {
          background-color: $text-color-secondary;
          height: 4px;
          border-radius: 2px;

          @media only screen and (max-width: 425px) {
            display: none;
          }
        }

        .reviews__rating-num {
          font-weight: 600;
          font-size: $font-size-lg;
        }
      }
    }
  }

  .reviews__comments {
    display: flex;
    flex-wrap: wrap;
    gap: 30px;
    padding-top: 30px;

    .reviews__item {
      max-width: 48%;

      @media only screen and (max-width: 1024px) {
        max-width: 100%;
      }
    }
  }

  .reviews__btn {
    margin-top: 30px;
  }
}

</style>

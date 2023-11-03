<template>
    <div class="amenities">
        <h3 class="amenities__title">
            Offered Amenities
        </h3>

        <div class="amenities__list">
            <transition-group
                name="list"
            >
                <div
                    v-for="amenity in list"
                    :key="amenity.icon + Math.random()"
                    class="amenities__item"
                >
                    <img
                        :src="amenity.icon"
                        alt="amenity icon"
                        class="amenities__image"
                    >
                    <p>{{ amenity.name }}</p>
                </div>
            </transition-group>
        </div>
    </div>
    <show-all-button
        :is-full-list="isFullList"
        :name="buttonText"
        @change-length-list="changeLengthList"
    />
</template>

<script setup lang="ts">
import { computed, onMounted, Ref, ref, watch } from 'vue';

import ShowAllButton from '@/components/ui/ShowAllButton.vue';
import { useStore } from '@/store';
import { AmenitiesType } from '@/types/mainModelType';

const isFullList = ref(false);
const buttonText = ref('');
const list: Ref<Array<AmenitiesType> | undefined> = ref();

const store = useStore();

const amenities = computed(() => store.getters.amenities);

const changeLengthList = () => {
  isFullList.value = !isFullList.value;
};

watch(isFullList, () => {
  if (isFullList.value) {
    list.value = amenities.value;
  } else {
    list.value = amenities.value.slice(0, 6);
  }
});

onMounted(() => {
  list.value = amenities.value.slice(0, 6);
  buttonText.value = `Show All ${amenities.value.length} Amenities`;
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

.amenities {
  max-width: 745px;

  .amenities__title {
    font-size: $font-size-xxxl;
  }

  .amenities__list {
    display: flex;
    flex-wrap: wrap;
    margin-top: 15px;

    .amenities__item {
      display: flex;
      align-items: center;
      gap: 30px;
      width: 300px;
      padding-bottom: 15px;

      @media only screen and (max-width: 768px) {
        width: 50%;
        gap: 20px;
      }

      @media only screen and (max-width: 425px) {
        width: 100%;
        gap: 50px;
      }

      .amenities__image {
        width: 24px;
        height: 24px;
      }
    }

  }
}
</style>

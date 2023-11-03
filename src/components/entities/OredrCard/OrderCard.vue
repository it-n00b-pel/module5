<template>
    <div class="order">
        <h3 class="order__price">
            {{ hotelInfo.price[0] }} - {{ hotelInfo.price[1] }}
        </h3>
        <span class="order__line" />
        <button
            class="order__btn"
            @click="navigateToOrder"
        >
            Reserve Now
        </button>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { ComputedRef } from 'vue/dist/vue';

import { RoutePath, router } from '@/router/routerConfig';
import { useStore } from '@/store';
import { FullInfoHotelType } from '@/types/mainModelType';

const store = useStore();

const hotelInfo: ComputedRef<FullInfoHotelType> = computed(() => store.getters.hotelInfo);

const navigateToOrder = () => {
  router.push(RoutePath.order);
};

</script>

<style scoped lang="scss">

.order {
  padding: 30px;
  box-shadow: 0 0 16px 0 #C2C6CC99;
  height: 200px;
  max-width: 380px;
  width: 100%;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .order__line {
    background-color: #E0E2E6;
    height: 1px;
  }

  .order__btn {
    width: 100%;
    background: #484848;
    color: #fff;
    font-size: $font-size-md;
    font-weight: 700;
    height: 60px;
    border-radius: 30px;
    transition: .3s ease;

    &:hover {
      transform: scale(1.025);
      box-shadow: 0 0 8px 0 rgba(84, 97, 117, 0.6);
    }
  }
}

</style>

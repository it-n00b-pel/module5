<template>
    <div
        v-if="Object.keys(hotelInfo).length"
        class="order-page container"
    >
        <order-form />
        <order-preview-card />
    </div>
    <app-footer />
</template>

<script setup lang="ts">
import { computed, ComputedRef, onMounted } from 'vue';

import OrderForm from '@/components/entities/OrderForm/OrderForm.vue';
import OrderPreviewCard from '@/components/entities/OrderPreviewCard/OrderPreviewCard.vue';
import AppFooter from '@/components/layout/AppFooter.vue';
import { RoutePath, router } from '@/router/routerConfig';
import { useStore } from '@/store';
import { FullInfoHotelType } from '@/types/mainModelType';

const store = useStore();

const hotelInfo: ComputedRef<FullInfoHotelType> = computed(() => {
  return store.getters.hotelInfo;
});

onMounted(() => {
  if (!Object.keys(hotelInfo.value).length) {
    router.push(RoutePath.home);
  }
});

</script>

<style scoped lang="scss">
.order-page {
  display: flex;
  justify-content: space-between;
  margin: 90px auto;
  gap: 30px;

  @media only screen and (max-width: 1024px) {
    flex-direction: column-reverse;
    align-items: center;
    gap: 60px;
  }
}

</style>

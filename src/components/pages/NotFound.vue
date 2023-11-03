<template>
    <div class="page">
        <h2>NOT FOUND</h2>
        <router-link
            :to="RoutePath.home"
            class="page__home-link"
        >
            Go Home
        </router-link>
    </div>
    <app-footer />
</template>

<script setup lang="ts">
import AppFooter from '@/components/layout/AppFooter.vue';
import { RoutePath } from '@/router/routerConfig';
</script>

<style scoped lang="scss">
.page {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 30px;

  .page__home-link {
    width: 120px;
    border-radius: 20px;
    background-color: #DDDDDD;
    padding: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #484848;
    font-weight: 700;
  }
}
</style>

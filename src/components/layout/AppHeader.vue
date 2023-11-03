<template>
    <header
        class="header "
    >
        <div class="header__navigation container">
            <router-link
                class="header__logo"
                :to="RoutePath.home"
            >
                <icon-base
                    icon-name="logo"
                    width="105"
                    height="43"
                />
            </router-link>
            <nav class="header__links">
                <router-link
                    v-for="link in navBarItemsList"
                    :key="link.text"
                    :to="linkHelper(link)"
                    class="header__link"
                >
                    {{ link.text }}
                </router-link>

                <burger
                    :is-burger-active="isOpenSideBar"
                    class="header__burger"
                    @update:is-open-side-bar="toggle"
                />

                <side-bar
                    :nav-bar-items-list="navBarItemsList"
                    :is-panel-open="isOpenSideBar"
                    @update:is-open-side-bar="toggle"
                />
            </nav>
        </div>
    </header>
    <loader />
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';

import Burger from '@/components/entities/Burger/Burger.vue';
import Loader from '@/components/entities/Loader/Loader.vue';
import SideBar from '@/components/entities/Sidebar/SideBar.vue';
import IconBase from '@/components/ui/IconBase.vue';
import { navBarItemsList, RoutePath } from '@/router/routerConfig';
import { useStore } from '@/store';
import { ACTIONS } from '@/types/actions';

const isOpenSideBar = ref(false);

const store = useStore();

const toggle = () => {
  isOpenSideBar.value = !isOpenSideBar.value;
};

const linkHelper = (link: { path: string, text: string }) => {
  return link.text.includes('Download') ? `${link.path}#download` : link.path;
};

onMounted(() => {
  store.dispatch(ACTIONS.FETCH_LOCATION);
  store.dispatch(ACTIONS.FETCH_BANNERS);
  store.dispatch(ACTIONS.FETCH_LATEST);
  store.dispatch(ACTIONS.FETCH_FEATURED);
});

</script>

<style scoped lang="scss">

.header {
  height: 70px;
  background-color: $bg-color-primary;
  display: flex;
  align-items: center;
  justify-content: center;

  .header__navigation {
    display: flex;
    width: 100%;
    justify-content: start;

    @media only screen and (max-width: 1024px) {
      justify-content: space-between;
    }

    .header__logo {
      transition: 0.3s;

      &:hover {
        transform: scale(1.05);
      }
    }

    .header__links {
      display: flex;
      align-items: center;
      padding-left: 100px;

      @media only screen and (max-width: 1024px) {
        padding-left: 0;
      }

      .header__link {
        color: $text-color-main;
        font-size: $font-size-lg;
        font-weight: 600;
        padding-left: 30px;
        transition: 0.3s;

        @media only screen and (max-width: 1024px) {
          padding-left: 20px;
          font-size: $font-size-md;
        }

        @media only screen and (max-width: 768px) {
          font-size: $font-size-xxs;
          width: 95px;
        }

        @media only screen and (max-width: 600px) {
          display: none;
        }

        &:hover {
          text-decoration: underline;
          transform: scale(1.05);
        }
      }

      .header__burger {
        display: none;
        @media only screen and (max-width: 600px) {
          display: block;
        }
      }
    }
  }
}

</style>

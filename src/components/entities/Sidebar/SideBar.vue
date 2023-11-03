<template>
    <div
        class="sidebar"
        @click="closeSidebarPanel"
    >
        <div
            v-if="isPanelOpen"
            class="sidebar__backdrop"
        />
        <transition name="slide-fade">
            <div
                v-if="isPanelOpen"
                class="sidebar__panel"
            >
                <router-link
                    v-for="link in navBarItemsList"
                    :key="link.text"
                    :to="linkHelper(link)"
                    class="sidebar__header-link"
                >
                    {{ link.text }}
                </router-link>
            </div>
        </transition>
    </div>
</template>

<script setup lang="ts">
import { PropType } from 'vue/dist/vue';

defineProps({
  isPanelOpen: {
    type: Boolean,
  },
  navBarItemsList: {
    type: Array as PropType<Array<{
      path: string,
      text: string,
    }>>,
    required: true,
  },
});

const emit = defineEmits<{
  // eslint-disable-next-line
  (e: 'update:isOpenSideBar', isOpenSideBar: boolean): void
}>();

const closeSidebarPanel = () => {
  emit('update:isOpenSideBar', true);
};

const linkHelper = (link: { path: string, text: string }) => {
  return link.text.includes('Download') ? `${link.path}#download` : link.path;
};

</script>

<style scoped lang="scss">

.sidebar {
  .slide-fade-enter-active {
    transition: all .3s linear;
  }

  .slide-fade-leave-active {
    transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }

  .slide-fade-enter-from,
  .slide-fade-leave-to {
    transform: translateX(-100%);
    opacity: 0;
  }

  .sidebar__backdrop {
    background-color: rgba(79, 77, 101, 0.4);
    position: fixed;
    top: 0;
    left: 0;
    cursor: pointer;
    right: 0;
    bottom: 0;
    backdrop-filter: blur(4px);
    z-index: 1;
  }

  .sidebar__panel {
    overflow-y: auto;
    background-color: $text-color-secondary;
    position: fixed;
    left: 0;
    top: 0;
    height: 100vh;
    z-index: 999;
    padding: 3rem 20px 2rem 20px;
    width: 300px;
    display: flex;
    flex-direction: column;
    gap: 30px;

    @media only screen and (max-width: 425px) {
      width: 220px;
    }

    .sidebar__header-link {
      color: $text-color-main;
      font-size: $font-size-xl;
      font-weight: 700;

      @media only screen and (max-width: 425px) {
        font-size: $font-size-md;
      }
    }
  }
}

</style>

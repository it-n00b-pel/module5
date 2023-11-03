<template>
    <transition name="fade">
        <div
            v-if="isLoading"
            class="loader"
        >
            <icon-base
                icon-name="loader"
                width="240"
                height="120"
            />
        </div>
    </transition>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import IconBase from '@/components/ui/IconBase.vue';
import { useStore } from '@/store';

const store = useStore();

const isLoading = computed(() => store.getters.isLoading);

</script>

<style scoped lang="scss">
.fade-enter-active, .fade-leave-active {
  transition: opacity .3s;
}

.fade-enter, .fade-leave-to /* .fade-leave-active до версии 2.1.8 */
{
  opacity: 0;
}

.loader {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(72, 72, 72, 0.2);
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(4px);
}

</style>

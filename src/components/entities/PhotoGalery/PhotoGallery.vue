<template>
    <div
        v-if="gallery && gallery.length"
        class="gallery"
        style="margin: 0 auto"
    >
        <div
            class="gallery__main-img"
            :style="{ backgroundImage: `url(${gallery[0]})` }"
            @click="moveTo(0)"
        />
        <div
            class="class__little-images"
        >
            <div
                v-for="i in gallery.length-4"
                :key="gallery[i]"
                class="class__little-image"
                :style="{ backgroundImage: `url(${gallery[i]})` }"

                @click="moveTo(i)"
            >
                <div
                    v-if="i===4"
                    class="gallery__last-image"
                >
                    <h3 class="gallery__rest-img">
                        +{{ gallery.length - 5 }}
                    </h3>
                    <div class="gallery__rest-img-text">
                        <p>More</p>
                        <p>Photos</p>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <photo-gallery-carousel
        v-if="gallery "
        v-model:is-visible="isVisible"
        :current-slide="currentSlide"
        :images="gallery"
    />
</template>

<script setup lang="ts">
import { computed, Ref, ref } from 'vue';

import PhotoGalleryCarousel from '@/components/entities/PhotoGalery/PhotoGalleryCarousel.vue';
import { useStore } from '@/store';

const store = useStore();
const gallery = computed(() => store.getters.gallery);
const isVisible: Ref<boolean> = ref(false);
const currentSlide: Ref<number> = ref(0);

const moveTo = (index: number) => {
  currentSlide.value = index;
  isVisible.value = true;
};

</script>

<style scoped lang="scss">

.gallery {
  max-width: 1366px;
  padding: 0 15px;
  display: flex;
  gap: 15px;

  .gallery__main-img {
    width: 50%;
    height: 0;
    padding-bottom: 40%;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    border-radius: 16px;
    transition: 0.3s ease;
    cursor: pointer;

    &:hover {
      transform: scale(1.025);
      box-shadow: 0 10px 10px rgba(229, 229, 229, 1);
    }
  }

  .class__little-images {
    width: 50%;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    column-gap: 15px;
    row-gap: 15px;
    justify-content: space-between;

    .class__little-image {
      width: calc(50% - 8px);
      padding-bottom: calc(40% - 5px);
      border-radius: 8px;
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
      position: relative;
      transition: 0.3s ease;
      cursor: pointer;

      &:hover {
        transform: scale(1.025);
        box-shadow: 0 10px 10px rgba(229, 229, 229, 1);
      }
    }

    .gallery__last-image {
      position: absolute;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
      width: 100%;
      gap: 15px;

      .gallery__rest-img {
        font-size: 48px;
        font-weight: 700;
        color: $text-color-main;

        @media only screen and (max-width: 768px) {
          font-size: 36px;
        }
      }

      .gallery__rest-img-text {
        display: flex;
        flex-direction: column;

        @media only screen and (max-width: 768px) {
          display: none;
        }

        :first-child {
          font-size: $font-size-xxs;
          font-weight: 600;
        }

        :last-child {
          font-size: $font-size-xxl;
          font-weight: 700;
        }
      }
    }
  }
}

</style>

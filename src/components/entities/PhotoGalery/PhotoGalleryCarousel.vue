<template>
    <transition name="fade">
        <div
            v-if="isVisible"
            class="carousel__container"
            @click="hideModal"
        >
            <carousel
                id="active-classes"
                ref="myCarousel"
                v-model="current"
                :items-to-show="8"
                :wrap-around="true"
                :transition="500"
                @click.stop
            >
                <slide
                    v-for="image in $props.images"
                    :key="image"
                >
                    <div class="carousel__item">
                        <div
                            class="content"
                            :style="{ backgroundImage: `url(${image})`}"
                        />
                    </div>
                </slide>

                <template #addons>
                    <pagination />
                </template>
            </carousel>
        </div>
    </transition>
</template>

<script setup lang="ts">

import { onMounted, onUnmounted, Ref, ref, watch } from 'vue';
import { PropType } from 'vue/dist/vue';
import { Carousel, Pagination, Slide } from 'vue3-carousel';

const props = defineProps({
  isVisible: {
    type: Boolean,
    default: false,
  },
  currentSlide: {
    type: Number,
    required: true,
  },
  images: {
    type: Array as PropType<Array<string>>,
    required: true,
  },
});

const myCarousel = ref();

const current: Ref<number> = ref(0);

const emit = defineEmits<{
  // eslint-disable-next-line
  (e: 'update:isVisible', isVisible: boolean): void
}>();

const hideModal = () => {
  emit('update:isVisible', false);
};

watch(() => props.isVisible, () => {
  current.value = props.currentSlide;
});

const moveSlide = (event: KeyboardEvent) => {
  if (event.key === 'ArrowLeft') {
    myCarousel.value.prev();
  } else if (event.key === 'ArrowRight') {
    myCarousel.value.next();
  }
};

onMounted(() => {
  window.addEventListener('keydown', moveSlide);
});

onUnmounted(() => {
  window.removeEventListener('keydown', moveSlide);
});

</script>

<style scoped lang="scss">

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s ease;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

.carousel__container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  backdrop-filter: blur(8px) brightness(30%);
  z-index: 1;
}

#active-classes {
  top: 50%;
  left: 50%;
  margin-right: -50%;
  transform: translate(-50%, -50%);

  .carousel__slide {
    padding: 5px;
    transition: 0.5s;
  }

  .carousel__viewport {
    perspective: 2000px;
  }

  .carousel__track {
    transform-style: preserve-3d;
  }

  .carousel__slide--sliding {
    transition: 0.5s;
  }

  .carousel__slide {
    opacity: 0.3;
    transform: rotateY(-20deg) scale(0.9);
  }

  .carousel__slide--active ~ .carousel__slide {
    transform: rotateY(20deg) scale(0.9);
  }

  .carousel__slide--prev {
    transform: rotateY(-10deg) scale(0.95);
  }

  .carousel__slide.carousel__slide--next {
    transform: rotateY(10deg) scale(0.95);
  }

  .carousel__slide--active {
    opacity: 1;
    transform: rotateY(0) scale(1);
    z-index: 3;
  }

  .carousel__item {

    .content {
      width: 800px;
      height: 600px;
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;

      @media only screen and (max-width: 1024px) {
        width: 640px;
        height: 480px;
      }

      @media only screen and (max-width: 768px) {
        width: 480px;
        height: 360px;
      }

      @media only screen and (max-width: 768px) {
        width: 320px;
        height: 240px;
      }
    }
  }
}

</style>

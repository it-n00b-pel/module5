<template>
    <carousel
        v-if="images.length"
        :autoplay="2000"
        :wrap-around="true"
        class="hotel__carousel"
    >
        <slide
            v-for="image in images"
            :key="image"
        >
            <div
                class="hotel__carousel-item"
                :style="{ backgroundImage: `url(${image})` }"
            />
        </slide>
    </carousel>
</template>

<script setup lang="ts">
import { Carousel, Slide } from 'vue3-carousel';

const props = defineProps({
  images: {
    type: Array<string>,
    required: true,
  },
});

const { images, } = props;
</script>

<style scoped lang="scss">
.hotel__carousel {

  .hotel__carousel-item {
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    width: 160px;
    height: 160px;
    background-color: #DDDDDD;
  }
}

</style>

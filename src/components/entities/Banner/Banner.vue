<template>
    <div
        class="banner"
        :style="style"
    >
        <div :class="[{'banner__text': true}]">
            <h3
                v-for="sub in substrings"
                :key="sub"
                class="banner__title"
            >
                {{ sub }}
            </h3>
            <p class="banner__description">
                {{ description }}
            </p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
  image: {
    type: String,
    default: '',
    required: true,
  },
  title: {
    type: String,
    default: '',
  },
  description: {
    type: String,
    default: '',
  },
  border: {
    type: String,
    default: '',
  },
});

const {
  title,
  description,
  border,
  image,
} = props;

const substrings = computed(() => {
  const words = title.split(' ');
  const arr = [];

  for (let i = 0; i < words.length; i += 2) {
    const substring = words[i] + ' ' + (words[i + 1] || '');
    arr.push(substring);
  }
  return arr;
});

const style = computed(() => {
  return {
    backgroundImage: `url(${image})`,
  };
});

</script>

<style scoped lang="scss">

.banner {
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: v-bind(border);

  .banner__text {
    position: absolute;
    top: 55px;
    left: 45px;
    padding: 10px;

    @media only screen and (max-width: 425px) {
      display: none;
    }

    .banner__title {
      font-size: 38px;

      @media only screen and (max-width: 768px) {
        font-size: 34px;
      }
    }

    .banner__description {
      font-size: $font-size-lg;
      font-weight: 500;
      padding-top: 20px;

      @media only screen and (max-width: 768px) {
        font-size: $font-size-sm;
      }
    }
  }
}

</style>

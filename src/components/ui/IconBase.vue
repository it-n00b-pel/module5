<template>
    <sprite-svg />
    <svg
        xmlns="http://www.w3.org/2000/svg"
        :width="width"
        :height="height"
        :aria-labelledby="iconName"
        role="presentation"
    >
        <title
            :id="iconName"
            lang="en"
        >{{ iconName }} icon</title>

        <use
            :width="width"
            :height="height"
            style="color: #d20000"
            :href="`#${iconName}`"
        />
    </svg>
</template>

<script setup lang="ts">
import SpriteSvg from '@/assets/svg/SpriteSvg.vue';

defineProps({
  iconName: {
    type: String,
    default: 'box',
  },
  width: {
    type: [Number, String],
    default: 18,
  },
  height: {
    type: [Number, String],
    default: 18,
  },
});

</script>

<style scoped lang="scss">
</style>

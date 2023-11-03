<template>
    <transition name="no-mode-fade">
        <button
            class="btn"
            @click="changeVisible"
        >
            {{ !isFullList ? name : textButton }}
        </button>
    </transition>
</template>

<script setup lang="ts">

const textButton = 'Hide List';

defineProps({
  name: {
    type: String,
    required: true,
  },
  isFullList: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits<{
  // eslint-disable-next-line
  (e: 'changeLengthList'): void
}>();

const changeVisible = () => {
  emit('changeLengthList');
};

</script>

<style scoped lang="scss">

.btn {
  border: 2px solid $text-color-main;
  border-radius: 6px;
  width: 240px;
  height: 60px;
  font-weight: 600;
  color: $text-color-main;
  font-size: $font-size-md;
  transition: .3s ease;

  @media only screen and (max-width: 768px) {
    width: 180px;
    font-size: $font-size-xs;
    height: 40px;
  }

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 0 8px 0 rgba(84, 97, 117, 0.6);
  }
}
</style>

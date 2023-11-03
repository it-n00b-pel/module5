<template>
    <div
        class="comment"
    >
        <div
            class="comment__author-data"
        >
            <img
                :src="review.author.avatar"
                alt="author avatar"
                class="comment__author-avatar"
            >
            <div
                class="comment__author-about"
            >
                <h3 class="comment__author-name">
                    {{ review.author.name }} {{
                        review.author.surname
                    }}
                </h3>
                <span class="comment__date">{{ dateComment }}</span>
            </div>
        </div>
        <p class="comment__content">
            {{ review.content }}
        </p>
    </div>
</template>

<script setup lang="ts">
import { onMounted, Ref, ref } from 'vue';
import { PropType } from 'vue/dist/vue';

import { ReviewType } from '@/types/mainModelType';

const props = defineProps({
  review: {
    type: Object as PropType<ReviewType>,
    required: true,
  },
});

const dateComment: Ref<string> = ref('');

onMounted(() => {
  const date = new Date(props.review?.date);

  const monthNames = [
    'Jan', 'Feb', 'Mar',
    'Apr', 'May', 'Jun', 'Jul',
    'Aug', 'Sep', 'Oct',
    'Nov', 'Dec'
  ];

  const month = monthNames[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();

  dateComment.value = `${month} ${day} ${year}`;
});
</script>

<style scoped lang="scss">

.comment {
  .comment__author-data {
    display: flex;
    align-items: center;
    gap: 15px;
    transition: .2s linear;

    &:hover {
      cursor: pointer;
      transform: scale(1.025);
    }

    &:hover .comment__author-avatar {
      -webkit-box-shadow: 0 0 10px 6px rgba(0, 0, 0, 0.2);
      -moz-box-shadow: 0 0 10px 6px rgba(0, 0, 0, 0.2);
      box-shadow: 0 0 10px 6px rgba(0, 0, 0, 0.2);
    }

    .comment__author-avatar {
      width: 70px;
      border-radius: 50%;
      transition: .3s;
    }

    .comment__author-about {
      .comment__author-name {
        font-weight: 700;
        font-size: $font-size-lg;
      }

      .comment__date {
        font-size: $font-size-sm;
        color: $text-color-secondary;
      }
    }
  }

  .comment__content {
    padding-top: 15px;
    font-size: $font-size-sm;
    color: $text-color-secondary;
    font-weight: 400;

    @media only screen and (max-width: 425px) {
      font-size: $font-size-xs;
    }
  }
}

</style>

<template>
    <div class="newsletter">
        <div class="newsletter__text">
            <h3 class="newsletter__title">
                NEWSLETTER
            </h3>
            <p class="newsletter__description">
                Stay Upto Date
            </p>
        </div>
        <div class="newsletter__input-data">
            <input
                v-model.trim="form.email"
                class="newsletter__input-email"
                placeholder="Your Email…"
            >
            <button
                class="newsletter__send-btn"
                @click="checkEmail"
            >
                <icon-base
                    icon-name="sendEmail"
                    width="28"
                    height="28"
                />
            </button>
            <transition name="fade">
                <p
                    v-if="errors.email"
                    class="newsletter__error"
                >
                    {{ errors.email }}
                </p>
            </transition>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useVuelidate } from '@vuelidate/core';
import { email, helpers, required } from '@vuelidate/validators';
import { computed, reactive } from 'vue';

import IconBase from '@/components/ui/IconBase.vue';
import { FORM_ERROR } from '@/types/errorType';
import { useValidationErrors } from '@/utils/useValidationErrors';

const form = reactive({
  email: '',
});
const rules = computed(() => (
    {
      email: {
        required: helpers.withMessage(FORM_ERROR.REQUIRED_EMAIL, required),
        email: helpers.withMessage(FORM_ERROR.INVALID_EMAIL, email),
      },
    }));

const v$ = useVuelidate(rules, form);

const errors = computed(() => useValidationErrors<{ email: string }>(v$.value.$errors));

const checkEmail = async () => {
  const result = await v$.value.$validate();
  if (!result) {
    return;
  }

  //какая-то логика по потправке email
};

</script>

<style scoped lang="scss">

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s ease;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

.newsletter {
  background-color: $bg-color-secondary;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 60px;
  padding: 35px;

  @media only screen and (max-width: 768px) {
    flex-direction: column;
    align-items: start;
    gap: 10px;
  }

  .newsletter__text {
    @media only screen and (max-width: 768px) {
      display: flex;
      gap: 30px;
      padding-left: 30px;
      align-items: center;
    }

    @media only screen and (max-width: 425px) {
      gap: 15px;
    }

    .newsletter__title {
      font-size: $font-size-xxl;

      @media only screen and (max-width: 425px) {
        font-size: $font-size-xl;
      }
    }

    .newsletter__description {
      font-weight: 500;
      font-size: $font-size-sm;
      @media only screen and (max-width: 425px) {
        display: none;
      }
    }
  }

  .newsletter__input-data {
    position: relative;
    max-width: 1000px;
    width: 100%;

    input {
      color: $text-color-main;
      font-size: $font-size-sm;
      margin: 0;
      background-color: #fff;
      height: 52px;
      border-radius: 26px;
      width: 100%;
      padding-left: 30px;
    }

    & input::placeholder {
      color: $text-color-secondary;
      font-size: $font-size-sm;
    }

    & input:active, :focus, ::placeholder {
      outline: 0;
      outline-offset: 0;
    }

    .newsletter__send-btn {
      width: 52px;
      height: 52px;
      background-color: $text-color-secondary;
      border-radius: 50%;
      position: absolute;
      right: 0;
      top: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: .3s;

      &:hover {
        transform: scale(1.1);
      }

      &:active {
        background-color: $text-color-main;
      }
    }

    .newsletter__error {
      position: absolute;
      bottom: -25px;
      left: 30px;
      font-size: $font-size-sm;
      color: $text-color-error;
    }
  }
}

</style>

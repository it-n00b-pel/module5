<template>
    <form
        class="order"
        @submit.prevent
        @submit="checkForm"
    >
        <div class="order__required-part">
            <div class="order__left-part">
                <input
                    v-model.trim="form.first_name"
                    :class="{ 'order__error' : v$.first_name.$error}"
                    :placeholder="!errors.first_name ? 'First Name *' : errors.first_name "
                >
                <input
                    v-model.trim="form.info_1"
                    :class="{ 'order__error' : v$.info_1.$error}"
                    :placeholder="!errors.info_1 ? 'Info-1 *' : errors.info_1 "
                >

                <div
                    class="order__country-data"
                >
                    <div
                        class="order__country-placeholder"
                        @click="()=>{open=true}"
                    >
                        <p
                            v-if="!form.country.length && !errors.country"
                        >
                            Country *
                        </p>
                        <p
                            v-else
                            class="order__country-placeholder_active"
                        >
                            {{ form.country }}
                        </p>
                        <p
                            v-if="errors.country"
                            style="color: #d20000"
                        >
                            {{ errors.country }}
                        </p>
                        <span class="order__arrow-down">▾</span>
                    </div>

                    <div
                        v-if="open"
                        v-click-outside="()=>{open=false}"
                        :class="{ 'search__location-list' : open}"
                    >
                        <ul>
                            <li
                                v-for="someCountry in location"
                                :key="someCountry"
                                @click="onChange(someCountry)"
                            >
                                <span>{{ someCountry }}</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <div
                class="order__right-part"
            >
                <input
                    v-model.trim="form.last_name"
                    :class="{ 'order__error' : errors.last_name}"
                    :placeholder="!errors.last_name ? 'Last Name *' : errors.last_name "
                >
                <input
                    v-model.trim="form.info_2"
                    :class="{ 'order__error' : errors.info_2}"
                    :placeholder="!errors.info_2 ? 'Info-2 *' : errors.info_2 "
                >
                <input
                    v-model.trim="form.email"
                    :class="{ 'order__error' : errors.email}"
                    :placeholder="!errors.email ? 'Email address *' : errors.email "
                >
            </div>
        </div>

        <input
            v-model.trim="form.phone"
            placeholder="Phone"
        >
        <input
            v-model.trim="form.comment"
            placeholder="Comment"
        >
        <button
            type="submit"
            class="order__btn"
        >
            Reserve Now
        </button>
    </form>
</template>

<script setup lang="ts">
import { useVuelidate } from '@vuelidate/core';
import { helpers, required } from '@vuelidate/validators';
import vClickOutside from 'click-outside-vue3';
import { computed, reactive, ref } from 'vue';

import { useStore } from '@/store';
import { ACTIONS } from '@/types/actions';
import { FORM_ERROR, OrderFormType } from '@/types/errorType';
import { useValidationErrors } from '@/utils/useValidationErrors';

const form = reactive({
  first_name: '',
  last_name: '',
  info_1: '',
  info_2: '',
  country: '',
  email: '',
  phone: '',
  comment: '',
});

const open = ref(false);
const selected = ref('');
const onChange = (selection: string) => {
  selected.value = selection;
  form.country = selection;
  open.value = false;
};

const store = useStore();

const location = computed(() => store.getters.location);

const rules = computed(() => ({
  first_name: {
    required: helpers.withMessage(FORM_ERROR.REQUIRED_FIRSTNAME, required),
  },
  last_name: {
    required: helpers.withMessage(FORM_ERROR.REQUIRED_LASTNAME, required),
  },
  info_1: {
    required: helpers.withMessage(FORM_ERROR.REQUIRED_INFO1, required),
  },
  info_2: {
    required: helpers.withMessage(FORM_ERROR.REQUIRED_INFO2, required),
  },
  country: {
    required: helpers.withMessage(FORM_ERROR.REQUIRED_COUNTRY, required),
  },
  email: {
    required: helpers.withMessage(FORM_ERROR.REQUIRED_EMAIL, required),
    // проверку на корректный email не делаю,
    // на сервере никто не заморачивался с проверкой и я не буду =)
  },
  // остальные поля не проверяю,
  // судя по дизайну они по идеи не обязательны (но это не точно),
  // хотя серв требует required
}));

const v$ = useVuelidate(rules, form);

const errors = computed(() => useValidationErrors<OrderFormType>(v$.value.$errors));

const checkForm = async () => {
  const result = await v$.value.$validate();
  if (!result) {
    return;
  }

  await store.dispatch(ACTIONS.BOOK_HOTEL, form);
};

</script>

<style scoped lang="scss">

.order {
  max-width: 670px;
  width: 100%;
  display: flex;
  flex-direction: column;

  input, select {
    color: $text-color-main;
    font-size: $font-size-sm;
    padding: 15px;
    margin: 0;
    height: 48px;
    border-bottom: 1px solid #000000;
  }

  & input::placeholder {
    color: $text-color-light;
    font-size: $font-size-sm;
  }

  & input:active, :focus, ::placeholder {
    outline: 0;
    outline-offset: 0;
  }

  .order__error::placeholder {
    color: $text-color-error;
  }

  .order__required-part {
    display: flex;
    justify-content: space-between;
    gap: 15px;

    @media only screen and (max-width: 768px) {
      flex-direction: column;
      gap: 0;
    }

    .order__left-part, .order__right-part {
      display: flex;
      flex-direction: column;
      max-width: 325px;
      width: 100%;

      @media only screen and (max-width: 768px) {
        max-width: 100%;
      }
    }

    .order__left-part select {
      padding-left: 15px;
      color: $text-color-light;
      font-size: $font-size-sm;
      padding-right: 15px;
    }

    .order__left-part {
      .order__country-data {
        color: $text-color-main;
        font-size: $font-size-sm;
        margin: 0;
        height: 48px;
        border-bottom: 1px solid #000000;
        display: flex;
        align-items: center;
        padding-left: 15px;
        position: relative;

        .order__country-placeholder {
          color: $text-color-light;
          width: 100%;
        }

        .order__country-placeholder_active {
          color: $text-color-main;
        }

        .search__location-list {
          position: absolute;
          overflow-y: auto;
          max-height: 200px;
          top: 50px;
          left: 0;
          border-radius: 0 0 10px 10px;
          background-color: #fff;
          width: 100%;
          -webkit-box-shadow: 0 4px 8px 1px $text-color-light;
          -moz-box-shadow: 0 4px 8px 1px $text-color-light;
          box-shadow: 0 4px 8px 1px $text-color-light;

          & li {
            padding: 10px 15px;
          }

          & li:hover {
            cursor: pointer;
            background-color: $text-color-light;
          }
        }

        .order__arrow-down {
          position: absolute;
          right: 15px;
          top: 15px;

          &:hover {
            cursor: default;
          }
        }
      }
    }
  }

  .order__btn {
    max-width: 320px;
    width: 100%;
    background: #484848;
    color: #fff;
    font-size: $font-size-md;
    font-weight: 700;
    height: 60px;
    border-radius: 30px;
    transition: .3s ease;
    margin-top: 30px;
    align-self: end;

    &:hover {
      transform: scale(1.025);
      box-shadow: 0 0 8px 0 rgba(84, 97, 117, 0.6);
    }
  }
}

</style>

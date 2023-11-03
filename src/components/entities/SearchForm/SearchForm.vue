<template>
    <form
        class="search"
        @submit.prevent
        @submit="checkForm"
    >
        <div
            class="search__location-input-data"
        >
            <div class="search__input-data-container">
                <label class="search__input-data">
                    <span
                        class="search__title"
                    >Location</span>
                    <input
                        v-model.trim="form.location"
                        type="text"
                        placeholder="Which city do you prefer?"
                        @input="onType"
                    >
                    <transition name="fade">
                        <p
                            v-if="errors.location"
                            class="search__error"
                        >
                            {{ errors.location }}
                        </p>
                    </transition>
                </label>
                <div
                    v-if="open"
                    :class="{ 'search__location-list' : open}"
                >
                    <ul>
                        <li
                            v-for="record in locations"
                            :key="record"
                            @click="onChange(record)"
                        >
                            <span>{{ record }}</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="search__right-part">
            <div
                class="search__input-data-container"
            >
                <div class="search__separator search__first-separator" />
                <div>
                    <label class="search__input-data">
                        <span class="search__title">Check In</span>
                        <vue-date-picker
                            v-model="form.checkIn"
                            :enable-time-picker="false"
                            :min-date="new Date()"
                            :month-change-on-scroll="false"
                            :flow="['calendar']"
                            :highlight-week-days="[0, 6]"
                            auto-apply
                            :clearable="false"
                            class="search__input-picker"
                        >
                            <template #input-icon>
                                <p
                                    v-if="!form.checkIn"
                                    class="search__date-placeholder"
                                >Add Date</p>
                            </template>
                        </vue-date-picker>
                        <transition name="fade">
                            <p
                                v-if="errors.checkIn"
                                class="search__error"
                            >
                                {{ errors.checkIn }}
                            </p>
                        </transition>
                    </label>
                </div>
            </div>

            <div class="search__input-data-container">
                <div class="search__separator" />
                <label class="search__input-data">
                    <span class="search__title">Check Out</span>
                    <vue-date-picker
                        v-model="form.checkOut"
                        :enable-time-picker="false"
                        :min-date="form.checkIn || new Date()"
                        :flow="['calendar']"
                        :highlight-week-days="[0, 6]"
                        :month-change-on-scroll="false"
                        auto-apply
                        :clearable="false"
                        class="search__input-picker"
                    >
                        <template #input-icon>
                            <p
                                v-if="!form.checkOut"
                                class="search__date-placeholder"
                            >Add Date</p>
                        </template>
                    </vue-date-picker>
                    <transition name="fade">
                        <p
                            v-if="errors.checkOut"
                            class="search__error"
                        >
                            {{ errors.checkOut }}
                        </p>
                    </transition>
                </label>
            </div>

            <div
                class="search__input-data-container"
                @mouseleave="hideGuestsInput"
            >
                <div class="search__separator" />
                <label
                    :class="['search__input-data', 'search__guest-container']"
                >
                    <span class="search__title">Guests</span>
                    <p
                        v-if="form.guest && !isShowGuestInput"
                        style="height: 22px"
                        @click="showGuestsInput"
                    >
                        {{ form.guest }}
                    </p>
                    <input
                        v-if="!isShowGuestInput && !form.guest"
                        placeholder="Add Guest"
                        @click="showGuestsInput"
                    >

                    <div
                        v-if="isShowGuestInput"
                        v-click-outside="hideGuestsInput"
                        class="search__input-guest"
                    >
                        <button
                            :disabled="guestsNum<=1"
                            @click.prevent="decrement"
                        >
                            -
                        </button>
                        <p>{{ guestsNum }}</p>
                        <button @click.prevent="increment">
                            +
                        </button>
                    </div>
                    <transition name="fade">
                        <p
                            v-if="errors.guest"
                            class="search__error"
                        >
                            {{ errors.guest }}
                        </p>
                    </transition>
                </label>
            </div>
            <button
                type="submit"
                class="search__find-btn"
            >
                <icon-base
                    icon-name="search"
                    width="24"
                    height="24"
                />
            </button>
        </div>
    </form>
</template>

<script setup lang="ts">

import '@vuepic/vue-datepicker/dist/main.css';

import { useVuelidate } from '@vuelidate/core';
import { helpers, required } from '@vuelidate/validators';
import VueDatePicker from '@vuepic/vue-datepicker';
import { computed, onMounted, reactive, Ref, ref, watch } from 'vue';

import IconBase from '@/components/ui/IconBase.vue';
import { useStore } from '@/store';
import { ACTIONS } from '@/types/actions';
import { FORM_ERROR, SearchFormType } from '@/types/errorType';
import { SearchPayloadType } from '@/types/mainModelType';
import { useValidationErrors } from '@/utils/useValidationErrors';

const form = reactive({
  location: '',
  checkIn: null as unknown as Date,
  checkOut: null as unknown as Date,
  guest: null as unknown as number,
});

const open: Ref<boolean> = ref(false);
let locations = reactive([]);
const selected: Ref<string> = ref('');
const isShowGuestInput: Ref<boolean> = ref(false);
const guestsNum: Ref<number> = ref(0);
const store = useStore();
const location = computed(() => store.getters.location);

watch(() => form.checkIn, () => {
  if (form.checkIn > form.checkOut && form.checkOut) {
    form.checkOut = form.checkIn;
  }
  // @ts-ignore
  ym(95154025, 'reachGoal', 'website__select-two');
});

watch(() => form.checkOut, () => {
  // @ts-ignore
  ym(95154025, 'reachGoal', 'website__select-three');
});

watch(guestsNum, () => {
  form.guest = guestsNum.value;
  // @ts-ignore
  ym(95154025, 'reachGoal', 'website__select-four');
});

const rules = computed(() => ({
  location: {
    required: helpers.withMessage(FORM_ERROR.REQUIRED_LOCATION, required),
  },
  checkIn: {
    required: helpers.withMessage(FORM_ERROR.REQUIRED_CHECKIN, required),
  },
  checkOut: {
    required: helpers.withMessage(FORM_ERROR.REQUIRED_CHECKOUT, required),
  },
  guest: {
    required: helpers.withMessage(FORM_ERROR.REQUIRED_GUEST, required),
  },
}));

const v$ = useVuelidate(rules, form);

const errors = computed(() => useValidationErrors<SearchFormType>(v$.value.$errors));

const onChange = (selection: string) => {
  selected.value = selection;
  form.location = selection;
  open.value = false;

  // @ts-ignore
  ym(95154025, 'reachGoal', 'website__select-one');
};

const onType = (event: Event) => {
  const { value = '', } = event.target as HTMLInputElement;
  locations = location.value.map((loc: string) => {
    return loc.toLowerCase().includes(value.toLowerCase().trim()) ? loc :
        undefined;
  }).filter((local: string) =>
      local != undefined);
  open.value = value != undefined && value != '' && locations.length > 0;
};
const showGuestsInput = () => {
  isShowGuestInput.value = true;
};

const hideGuestsInput = () => {
  isShowGuestInput.value = false;
};

const increment = () => {
  guestsNum.value++;
};
const decrement = () => {
  if (guestsNum.value > 0) {
    guestsNum.value--;
  }
};

const checkForm = async () => {
  const result = await v$.value.$validate();
  if (!result) {
    return;
  }

  const data: SearchPayloadType = {
    location: form.location,
    checkIn: form.checkIn,
    checkOut: form.checkOut,
    guest: form.guest,
  };

  await store.dispatch(ACTIONS.FETCH_HOTEL_LIST, data);

};

onMounted(() => {
  // только так хватило ума переопределить цвета placeholder в datepicker
  // чтобы были примерно одинаковы в Chrome и Firefox
  // без этого костыля placeholder в datepicker слишком разные по оттенкам
  const placeHolderList: HTMLCollectionOf<Element> =
      document.getElementsByClassName('search__date-placeholder');
  let color = '';

  if (navigator.userAgent.indexOf('Chrome') != -1) {
    color = 'rgba(182, 182, 182, 0.85)';
  } else {
    color = 'rgba(182, 182, 182, 0.6)';
  }
  for (let i = 0; i < placeHolderList.length; i++) {
    const element = placeHolderList[i] as HTMLElement;
    element.style.color = color;
  }
});

</script>

<style scoped lang="scss">

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s ease;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

.search {
  display: flex;
  justify-content: space-between;
  background-color: #fff;
  padding: 8px 10px 8px 30px;
  max-width: 784px;
  margin: 0 auto;
  align-items: center;
  border-radius: 35px;
  font-weight: 600;

  @media only screen and (max-width: 768px) {
    flex-direction: column;
  }

  @media only screen and (max-width: 425px) {
    padding: 8px 10px 15px 30px;
  }

  // Стилизируем инпуты
  input {
    color: $text-color-main;
    font-size: $font-size-sm;
    height: 22px;
  }

  & input::placeholder {
    color: $text-color-light;
  }

  & input:active, :focus {
    outline: 0;
    outline-offset: 0;
  }

  .search__location-input-data {
    width: 100%;
  }

  .search__right-part {
    display: flex;
    position: relative;

    @media only screen and (max-width: 768px) {
      width: 100%;
      justify-content: space-between;
    }

    @media only screen and (max-width: 425px) {
      margin-top: 15px;
      flex-direction: column;
      gap: 15px;
    }

    .search__first-separator {
      @media only screen and (max-width: 768px) {
        display: none;
      }
    }

    .search__find-btn {
      right: 0;
      width: 54px;
      height: 54px;
      background-color: $text-color-main;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: transform 0.3s;
      z-index: 1;

      @media only screen and (max-width: 425px) {
        position: absolute;
        bottom: 0;
      }

      &:hover {
        transform: scale(1.05);
      }

      &:active {
        background-color: $text-color-secondary;
      }
    }
  }

  .search__input-data-container {
    display: flex;
    align-items: center;
    position: relative;

    .search__location-list {
      z-index: 2;
      position: absolute;
      overflow-y: auto;
      max-height: 200px;
      top: 35px;
      border-radius: 0 0 10px 10px;
      background-color: #fff;
      width: 100%;
      -webkit-box-shadow: 0 4px 8px 1px $text-color-light;
      -moz-box-shadow: 0 4px 8px 1px $text-color-light;
      box-shadow: 0 4px 8px 1px $text-color-light;

      @media only screen and (max-width: 768px) {
        width: 100%;
      }

      & li {
        padding: 5px 10px;
      }

      & li:hover {
        cursor: pointer;
        background-color: $text-color-light;
      }
    }

    .search__separator {
      height: 30px;
      width: 1px;
      background-color: #DDD;
      margin-right: 15px;

      @media only screen and (max-width: 600px) {
        margin-right: 5px;
      }
      @media only screen and (max-width: 425px) {
        display: none;
      }
    }

    .search__input-data {
      display: flex;
      flex-direction: column;
      width: 100%;
      position: relative;

      .search__title {
        font-size: $font-size-xxs;
      }

      .search__input-picker {
        width: 120px;
        color: rgb(204, 204, 204);
        @media only screen and (max-width: 600px) {
          width: 80px;
        }

        .search__date-placeholder {
          font-family: 'Montserrat', sans-serif;
          font-size: $font-size-sm;
        }
      }

      .search__input-guest {
        display: flex;
        width: 70px;
        height: 22px;
        justify-content: space-between;

        & button {
          width: 20px;
          height: 20px;
          background-color: $text-color-secondary;
          border-radius: 3px;
          display: flex;
          justify-content: center;
          align-items: center;
          cursor: pointer;
        }

        & button:disabled {
          background-color: $text-color-light;
          cursor: auto;
        }
      }

      .search__error {
        position: absolute;
        color: $text-color-error;
        bottom: -10px;
        font-size: 10px;
        font-weight: 500;
        width: 120px;

        @media only screen and (max-width: 600px) {
          font-size: 8px;
        }
      }
    }

    .search__guest-container {
      width: 120px;
      @media only screen and (max-width: 600px) {
        width: 75px;
      }
    }
  }
}

:global(.dp__input) {
  padding: 0;
  margin: 0;
  font-family: 'Montserrat', sans-serif;
  font-size: $font-size-sm;
  border: none;
  height: 18px;
}

</style>

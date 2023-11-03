import { InjectionKey } from 'vue';
import { createStore, Store, useStore as baseUseStore } from 'vuex';

import { mainModule, MainState } from '@/store/models/app/mainModel';

export interface RootState {
    isLoading: boolean,
    main: MainState;
}

export const key: InjectionKey<Store<RootState>> = Symbol();

export default createStore<RootState>({
    state: {
        isLoading: false,
    } as RootState,
    getters: {
        isLoading(state: RootState) {
            return state.isLoading;
        },
    },
    mutations: {
        setLoading(state: RootState, value: boolean) {
            state.isLoading = value;
        },
    },
    actions: {},
    modules: {
        main: mainModule,
    },
});

export function useStore() {
    return baseUseStore(key);
}

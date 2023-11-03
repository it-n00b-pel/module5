import { AxiosError } from 'axios';
import { POSITION, useToast } from 'vue-toastification';
import { Module } from 'vuex';

import { hotelApi } from '@/api/hotelApi';
import { RoutePath, router } from '@/router/routerConfig';
import { RootState } from '@/store';
import {
    AmenitiesType,
    BannersListType,
    FeaturedHotelType,
    FullInfoHotelType,
    LastHotelType,
    OrderBookFormType,
    SearchPayloadType
} from '@/types/mainModelType';
import { MUTATIONS } from '@/types/mutations';
import { errorHandler } from '@/utils/errorHandler';

const toast = useToast();

export interface MainState {
    location: Array<string>;
    latest: Array<LastHotelType>;
    banners: BannersListType;
    featured: Array<FeaturedHotelType>;
    searchResult: Array<FullInfoHotelType>;
    hotelInfo: FullInfoHotelType;
    previewHotelList: Array<FeaturedHotelType>;
}

export const mainModule: Module<MainState, RootState> = {
    state: (): MainState => ({
        location: [] as Array<string>,
        latest: [] as Array<LastHotelType>,
        banners: {} as BannersListType,
        featured: [] as FeaturedHotelType[],
        hotelInfo: {} as FullInfoHotelType,
        searchResult: [] as Array<FullInfoHotelType>,
        previewHotelList: [] as Array<FeaturedHotelType>,
    }),
    mutations: {
        [MUTATIONS.SET_LOCATIONS](state: MainState, location: Array<string>) {
            state.location = location;
        },
        [MUTATIONS.SET_BANNERS](state: MainState, banners: BannersListType) {
            state.banners = banners;
        },
        [MUTATIONS.SET_LATEST_HOTEL](state: MainState, latest: Array<LastHotelType>) {
            state.latest = latest;
        },
        [MUTATIONS.SET_FEATURES_HOTEL](state: MainState, featured: Array<FeaturedHotelType>) {
            state.featured = featured;
        },
        [MUTATIONS.SET_SEARCH_RESULT](state: MainState, hotel: FullInfoHotelType) {
            state.searchResult = [...state.searchResult, hotel];
        },
        [MUTATIONS.SET_PREVIEW_HOTEL_LIST](state: MainState, list: Array<FeaturedHotelType>) {
            state.previewHotelList = list;
        },
        [MUTATIONS.CLEAR_SEARCH_RESULT](state: MainState) {
            state.searchResult = [];
        },
        [MUTATIONS.SET_SOME_HOTEL_INFO](state: MainState, hotel: FullInfoHotelType) {
            state.hotelInfo = hotel;
        },
    },
    actions: {
        async fetchLocation({ commit, }) {
            try {
                commit(MUTATIONS.SET_LOADING, true);
                const res = await hotelApi.getLocation();
                const arr = [] as string[];
                res.data.forEach(country => arr.push(country.name));
                commit(MUTATIONS.SET_LOCATIONS, arr);
            } catch (e) {
                errorHandler(e as AxiosError);
            } finally {
                commit(MUTATIONS.SET_LOADING, false);
            }

        },
        async fetchBanners({ commit, }) {
            try {
                commit(MUTATIONS.SET_LOADING, true);
                const res = await hotelApi.getBanners();
                commit(MUTATIONS.SET_BANNERS, res.data);
            } catch (e) {
                errorHandler(e as AxiosError);
            } finally {
                commit(MUTATIONS.SET_LOADING, false);

            }
        },
        async fetchLatest({ commit, }) {
            try {
                commit(MUTATIONS.SET_LOADING, true);
                const res = await hotelApi.getLatest();
                commit(MUTATIONS.SET_LATEST_HOTEL, res.data);
            } catch (e) {
                errorHandler(e as AxiosError);
            } finally {
                commit(MUTATIONS.SET_LOADING, false);
            }

        },
        async fetchFeatured({ commit, }) {
            try {
                commit(MUTATIONS.SET_LOADING, true);
                const res = await hotelApi.getFeatured();
                commit(MUTATIONS.SET_FEATURES_HOTEL, res.data);
            } catch (e) {
                errorHandler(e as AxiosError);
            } finally {
                commit(MUTATIONS.SET_LOADING, false);
            }

        },
        async fetchHotelList({ commit, }, data: SearchPayloadType) {
            try {
                commit(MUTATIONS.SET_LOADING, true);
                const res = await hotelApi.getHotelList(data);

                commit(MUTATIONS.SET_PREVIEW_HOTEL_LIST, res.data);
                const MAX_HOTELS_TO_FETCH = 3;

                if (!res.data.length) {
                    toast.warning(`Ooops!\nNo results for Your request!`);
                } else {
                    const hotelsToFetch = Math.min(res.data.length, MAX_HOTELS_TO_FETCH);
                    // загружам только до 3х, остальные догружаем на странице при необходимости
                    // получаем поэтапно инфу по каждому отелю и сетаем
                    for (let i = 0; i < hotelsToFetch; i++) {
                        const hotel = await hotelApi.getFullHotelData(res.data[i]._id);
                        commit(MUTATIONS.SET_SEARCH_RESULT, hotel.data);
                        if (i === 0) {
                            await router.push(RoutePath.search);
                        }
                    }
                }
            } catch (e) {
                errorHandler(e as AxiosError);
            } finally {
                commit(MUTATIONS.SET_LOADING, false);
            }
        },
        // загружаем все  оставшиеся итерируячь по массиву,
        // начиная с 3го так первые три уже загружены выше fetchHotelList
        async fetchAllHotel({
                                state,
                                commit,
                            }) {
            try {
                for (let i = 3; i < state.previewHotelList.length; i++) {
                    const hotel = await hotelApi.getFullHotelData(state.previewHotelList[i]._id);
                    commit(MUTATIONS.SET_SEARCH_RESULT, hotel.data);
                }
            } catch (e) {
                errorHandler(e as AxiosError);
            } finally {
                commit(MUTATIONS.SET_LOADING, false);
            }

        },
        // загружаем и сетаем определенный/выбраный отель
        async fetchSomeHotel({ commit, }, id: string) {
            try {
                commit(MUTATIONS.SET_LOADING, true);
                const hotel = await hotelApi.getFullHotelData(id);
                commit(MUTATIONS.SET_SOME_HOTEL_INFO, hotel.data);
            } catch (e) {
                errorHandler(e as AxiosError);
            } finally {
                commit(MUTATIONS.SET_LOADING, false);
            }
        },
        async bookHotel({ commit, }, data: OrderBookFormType) {
            try {
                commit(MUTATIONS.SET_LOADING, true);
                await hotelApi.sendOrder(data);
                toast.success(`Hotel reserved!\nSend more information to Your email - ${data.email} !`, {
                    position: POSITION.TOP_CENTER,
                });
                // @ts-ignore
                ym(95154025, 'reachGoal', 'website__order-success');
                await router.push(RoutePath.home);
            } catch (e) {
                // @ts-ignore
                ym(95154025, 'reachGoal', 'website__order-error');
                errorHandler(e as AxiosError);
            } finally {
                commit(MUTATIONS.SET_LOADING, false);
            }
        },
    },
    getters: {
        location(state: MainState) {
            return state.location;
        },
        banners(state: MainState) {
            return state.banners;
        },
        latest(state: MainState) {
            return state.latest;
        },
        featured(state: MainState) {
            return state.featured;
        },
        searchResult(state: MainState): Array<FullInfoHotelType> {
            return state.searchResult;
        },
        previewHotelList(state: MainState): Array<FeaturedHotelType> {
            return state.previewHotelList;
        },
        gallery(state: MainState): Array<string> {
            return state.hotelInfo.images;
        },
        hotelInfo(state: MainState): FullInfoHotelType {
            return state.hotelInfo;
        },
        amenities(state: MainState): Array<AmenitiesType> {
            return state.hotelInfo.amenities;
        },
        reviews(state: MainState) {
            return state.hotelInfo.reviews;
        },
    },
};

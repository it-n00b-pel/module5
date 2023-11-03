import axios, { AxiosResponse } from 'axios';

import {
    BannersListType,
    CountryType,
    FeaturedHotelType, FullInfoHotelType,
    LastHotelType, OrderBookFormType,
    SearchPayloadType
} from '@/types/mainModelType';

export const instance = axios.create({
    baseURL: 'https://module5.vue.panfilov.academy/',
});

export const hotelApi = {
    getLocation(): Promise<AxiosResponse<CountryType[]>> {
        return instance.get('hotel/location');
    },
    getBanners(): Promise<AxiosResponse<BannersListType>> {
        return instance.get('banners');
    },
    getLatest(): Promise<AxiosResponse<Array<LastHotelType>>> {
        return instance.get('hotel/latest');
    },
    getFeatured(): Promise<AxiosResponse<Array<FeaturedHotelType>>> {
        return instance.get('hotel/featured');
    },
    getHotelList(data: SearchPayloadType)
        : Promise<AxiosResponse<Array<FeaturedHotelType>>> {
        return instance.post('hotel/filter', data);
    },
    getFullHotelData(id: string): Promise<AxiosResponse<FullInfoHotelType>> {
        return instance.get('hotel/detail/' + id);
    },
    sendOrder(form: OrderBookFormType): Promise<AxiosResponse> {
        return instance.post('order', form);
    },
};

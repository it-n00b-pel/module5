export type CountryType = {
    name: string
}

export type Banner = {
    title: string,
    description: string,
    image: string,
}

export type BannersListType = {
    main: {
        image: string
    }
    second: Banner,
    last: Banner,
}

export type LastHotelType = {
    author: {
        avatar: string,
    },
    _id: string,
    image: string,
    name: string,
    address: string,
}

export type FeaturedHotelType = LastHotelType & {
    price: Array<string>,
    images: Array<string>,
    info: Array<{
        bedroom: number,
        bathroom: number,
    }>
}

export type AmenitiesType = {
    icon: string,
    name: string,
}

export type ReviewType = {
    author: {
        name: string
        surname: string
        avatar: string,
    },
    date: Date,
    content: string,
}

export type FullInfoHotelType = FeaturedHotelType & {
    type: Array<string>,
    period: Array<string>,
    coords: Array<string>,
    description: Array<string>,
    amenities: Array<AmenitiesType>,
    'reviews': Array<ReviewType>,
    '__v': number,
}

export type SearchPayloadType = {
    location: string,
    checkIn: Date | string,
    checkOut: Date | string,
    guest: number,
}

export type OrderBookFormType = {
    first_name: 'string',
    last_name: 'string',
    info_1: 'string',
    info_2: 'string',
    country: 'string',
    email: 'string',
    phone: 'string',
    comment: 'string'
}

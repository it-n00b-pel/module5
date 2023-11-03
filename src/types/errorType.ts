export type OrderFormType = {
    first_name: string,
    last_name: string,
    info_1: string,
    info_2: string,
    country: string,
    email: string,
}

export type SearchFormType = {
    location: string,
    checkIn: string,
    checkOut: string,
    guest: string,
}

export enum FORM_ERROR {
    /* eslint-disable no-unused-vars */
    REQUIRED_FIRSTNAME = 'This First Name is required',
    REQUIRED_EMAIL = 'This Email is required',
    INVALID_EMAIL = 'This email is invalid',
    REQUIRED_INFO1 = 'This Info-1 is required',
    REQUIRED_INFO2 = 'This Info-2 is required',
    REQUIRED_LASTNAME = 'This Last Name is required',
    REQUIRED_PHONE = 'This Phone is required',
    REQUIRED_COMMENT = 'This Comment is required',
    REQUIRED_COUNTRY = 'This Country is required',

    REQUIRED_LOCATION = 'Location is required',
    REQUIRED_CHECKIN = 'Check In is required',
    REQUIRED_CHECKOUT = 'Check Out is required',
    REQUIRED_GUEST = 'Guest is required',

}

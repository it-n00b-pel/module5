import { createRouter, createWebHistory, Router } from 'vue-router';

import HomePage from '@/components/pages/HomePage.vue';
import NotFound from '@/components/pages/NotFound.vue';

const SearchPage = () => import('../components/pages/SearchPage.vue');
const OrderPage = () => import('../components/pages/OrderPage.vue');
const DetailsPage = () => import('../components/pages/DetailsPage.vue');

export enum AppRoutes {
    /* eslint-disable no-unused-vars */
    HOME = 'home',
    SEARCH = 'search',
    DETAILS = 'details',

    ABOUT_US = 'about_us',
    LEGAL_INFORMATION = 'legal_information',
    CONTACT_US_ = 'contact_us',
    BLOGS = 'blogs',

    FIND_A_PROPERTY = 'find_a_property',
    HOW_TO_HOST = 'how_to_host',
    WHY_US_ = 'why_us',
    FAQs = 'faqs',
    RENTAL_GUIDES = 'rental_guides',
    ORDER = 'order',

    // last
    NOT_FOUND = 'not_found',
}

export const RoutePath: Record<AppRoutes, string> = {
    [AppRoutes.HOME]: '/module5/',
    [AppRoutes.SEARCH]: '/module5/search',
    [AppRoutes.DETAILS]: '/module5/details/:id',

    [AppRoutes.ABOUT_US]: '/module5/',
    [AppRoutes.LEGAL_INFORMATION]: '/module5/',
    [AppRoutes.CONTACT_US_]: '/module5/',
    [AppRoutes.BLOGS]: '/module5/',

    [AppRoutes.FIND_A_PROPERTY]: '/module5/',
    [AppRoutes.HOW_TO_HOST]: '/module5/',
    [AppRoutes.WHY_US_]: '/module5/',
    [AppRoutes.FAQs]: '/module5/',
    [AppRoutes.RENTAL_GUIDES]: '/module5/',
    [AppRoutes.ORDER]: '/module5/order',

    // последний
    [AppRoutes.NOT_FOUND]: '/:pathMatch(.*)*',
};

export const routes = [
        {
            path: RoutePath.home,
            name: AppRoutes.HOME,
            component: HomePage,
            meta: {
                title: 'Booking',
                metaTags: [
                    {
                        name: 'description',
                        content: 'The home page of our example app.',
                    },
                    {
                        property: 'og:description',
                        content: 'The home page of our example app.',
                    }
                ],
            },
        },
        {
            path: RoutePath.details,
            name: AppRoutes.DETAILS,
            component: DetailsPage,
            meta: {
                title: 'Detail Page',
                metaTags: [
                    {
                        name: 'description',
                        content: 'The Detail page of our example app.',
                    },
                    {
                        property: 'og:description',
                        content: 'The Detail page of our example app.',
                    }
                ],
            },
        },
        {
            path: RoutePath.order,
            name: AppRoutes.ORDER,
            component: OrderPage,
            meta: {
                title: 'Order Page',
                metaTags: [
                    {
                        name: 'description',
                        content: 'The Order page of our example app.',
                    },
                    {
                        property: 'og:description',
                        content: 'The Order page of our example app.',
                    }
                ],
            },
        },
        {
            path: RoutePath.search,
            name: AppRoutes.SEARCH,
            component: SearchPage,
            meta: {
                title: 'Search Page',
                metaTags: [
                    {
                        name: 'description',
                        content: 'The Search page of our example app.',
                    },
                    {
                        property: 'og:description',
                        content: 'The Search page of our example app.',
                    }
                ],
            },
        },
        {
            path: RoutePath.not_found,
            name: AppRoutes.NOT_FOUND,
            component: NotFound,
            meta: {
                title: '404 Page',
                metaTags: [
                    {
                        name: 'description',
                        content: 'The 404 page of our example app.',
                    },
                    {
                        property: 'og:description',
                        content: 'The 404 page of our example app.',
                    }
                ],
            },
        }
    ]
;

export const navBarItemsList = [
    {
        path: RoutePath.home,
        text: 'Find a Property',
    },
    {
        path: RoutePath.home,
        text: 'Share Stories',
    },
    {
        path: RoutePath.home,
        text: 'Rental Guides',
    },
    {
        path: RoutePath.home,
        text: 'Download Mobile App',
    }
];

export const footerCompanyNav = [
    {
        path: RoutePath.about_us,
        text: 'About Us',
    },
    {
        path: RoutePath.legal_information,
        text: 'Legal Information',
    },
    {
        path: RoutePath.contact_us,
        text: 'Contact Us',
    },
    {
        path: RoutePath.blogs,
        text: 'Blogs',
    }
];

export const footerHelperNav = [
    {
        path: RoutePath.find_a_property,
        text: 'Find a Property',
    },
    {
        path: RoutePath.how_to_host,
        text: 'How To Host?',
    },
    {
        path: RoutePath.why_us,
        text: 'Why Us?',
    },
    {
        path: RoutePath.faqs,
        text: 'FAQs',
    },
    {
        path: RoutePath.rental_guides,
        text: 'Rental Guides',
    }
];

export const router: Router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior(to) {
        if (to.hash === '#download') {
            return {
                el: to.hash,
                behavior: 'smooth',
            };
        } else {
            return {
                top: 0,
            };
        }
    },
});

// добавляем мданные для seo на страницы из routes
router.beforeEach((to, from, next) => {
    const nearestWithTitle = to.matched.slice().reverse().find(r => r.meta && r.meta.title);
    // eslint-disable-next-line
    const nearestWithMeta = to.matched.slice().reverse().find(r => r.meta && r.meta.metaTags) as any;
    const previousNearestWithMeta = from.matched.slice().reverse().find(r => r.meta && r.meta.metaTags);
    if (nearestWithTitle) {
        document.title = nearestWithTitle.meta.title as string;
    } else if (previousNearestWithMeta) {
        document.title = previousNearestWithMeta.meta.title as string;
    }
    Array.from(document.querySelectorAll('[data-vue-router-controlled]'))
        .map(el => el.parentNode && el.parentNode.removeChild(el));
    if (!nearestWithMeta) return next();
    // eslint-disable-next-line
    nearestWithMeta.meta.metaTags.map((tagDef: any) => {
        const tag = document.createElement('meta');
        Object.keys(tagDef).forEach(key => {
            tag.setAttribute(key, tagDef[key]);
        });
        tag.setAttribute('data-vue-router-controlled', '');
        return tag;
    })
        .forEach((tag: HTMLElement) => document.head.appendChild(tag));
    next();
});

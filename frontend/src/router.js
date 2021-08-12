import { createRouter, createWebHistory } from 'vue-router';
import { defineAsyncComponent } from 'vue'

const PartnerDetail = defineAsyncComponent(() => import("./user/PartnerDetail"));
const PartnerRegistration = defineAsyncComponent(() => import("./user/PartnerRegistration"));
const ContactPartner = defineAsyncComponent(() => import("./message/ContactPartner"));
import PartnerList from "./user/PartnerList";
import RequestsReceived from "./message/RequestsReceived";
import NotFound from "./home/NotFound";
import UserAuth from "./user/UserAuth";
import store from './store/index'


const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', redirect: '/partners' },
        { path: '/partners', component: PartnerList },
        { path: '/partners/:id', component: PartnerDetail, props: true,
            children: [
                { path: 'contact', component: ContactPartner },
            ] },
        { path: '/register', component: PartnerRegistration}, // meta: {requiresAuth: true}
        { path: '/requests', component: RequestsReceived},  // meta: {requiresAuth: true}
        { path: '/auth', component: UserAuth},  // meta: {requiresNone: true}
        { path: '/:notFound(.*)', component: NotFound },
    ],
});

router.beforeEach(function (to, from, next) {
    if (to.meta.requiresAuth && store.getters.isAuthenticated) {
        next('/auth');
    } else if (to.meta.requiresNone && store.getters.isAuthenticated) {
        next('/partners');
    } else {
        next();
    }

});

export default router;
import Vue from 'vue';
import App from './App.vue';
import VueI18n from 'vue-i18n';
import {createStore, } from './store';
import {createRouter, } from './router';
import {sync, } from 'vuex-router-sync';
import api from '@/utils/api';

import Toast from '@/components/toast';

export function createApp() {
    const store = createStore();
    const router = createRouter();

    sync(store, router);

    if (process.env.VUE_ENV === 'client') {
        const FastClick = require('fastclick');
        FastClick.attach(document.body);
        Vue.use(Toast);
        Vue.prototype.$apiAxios = api;
    }

    // 注入国际化相关内容
    Vue.use(VueI18n);
    const i18n = new VueI18n({
        locale: 'en',
        messages: {
            'zh': require('@/i18n/zh.json'),
            'en': require('@/i18n/en.json'),
        },
    });

    const app = new Vue({
        router,
        store,
        i18n,
        render: h => h(App),
    });

    return { app, router, store, };
};

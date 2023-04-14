import {
    createApp,
    h
} from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import '@grapecity/wijmo.styles/wijmo.css';
import commons from './assets/scss/_commons.scss'

import {
    loadFonts
} from './plugins/webfontloader'

import router from './router'
import keycloak from 'keycloak-js';
import Vue3Tour from 'vue3-tour'
import 'vue3-tour/dist/vue3-tour.css'

loadFonts();


let str = location.href.match(/\/([^/]+)\/?$/)[1];
if (str.match(/#/)) {
    str = str.substring(0, str.indexOf('#'));
}
/*
let initOptions = {
    url: 'http://t-sct1wb00.fukushikenbunroku.com:8080/',
    realm: 'R' + str + '_admin',
    clientId: 'fk-admin-web-frontend',
    onLoad: 'login-required',
};
*/
// ローカルで動作させたかったため下記を有効にしています。
let initOptions = {
    url: process.env.NODE_ENV === 'production' ? 'http://t-sct1wb00.fukushikenbunroku.com:8080/' : 'http://localhost:8884/',
    realm: process.env.NODE_ENV === 'production' ? 'Admin' + str : str,
    clientId: process.env.NODE_ENV === 'production' ? 'fk-admin-web-frontend' : 'account',
    onLoad: 'login-required',
};


let kc = new keycloak(initOptions);

kc
    .init({
        onLoad: initOptions.onLoad,
        checkLoginIframe: initOptions.CheckLoginiframe,
    })
    .then((auth) => {
        if (!auth) {
            window.location.reload();
        }
        // console.log(kc);
        // console.log(kc.idToken);

        createApp({
                render: () => h(App, {
                    color: 'red',
                    keycloak: kc
                })
            })
            .use(router)
            .use(vuetify)
            .use(commons)
            .use(Vue3Tour)
            .mount('#app');


    })
    .catch(() => {
        h.$log.error("Authenticated Failed");
    });
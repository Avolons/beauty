import Vue from 'vue';
import iView from 'iview';
import { router } from './router/index';
import { appRouter } from './router/router';
import store from './store';
import App from './app.vue';
import '@/locale';
import 'iview/dist/styles/iview.css';
import VueI18n from 'vue-i18n';
import validate from './validate.js';
import promise from 'es6-promise';
import { AM } from './accessMenu.js';

Vue.prototype.AM = AM;

/** 解决es5的兼容性问题 */
promise.polyfill();
Vue.use(VueI18n);
Vue.use(iView);

Vue.prototype.validate = validate;
/* 全局设置API */

/** 设置cookie */
if (!localStorage.getItem('randomId')) {
    localStorage.setItem('randomId', '');
}

window.RSYS = new Vue({
    el: '#app',
    router: router,
    store: store,
    render: h => h(App),
    data: {
        currentPageName: ''
    },
    mounted () {
        this.currentPageName = this.$route.name;
        // 显示打开的页面的列表
        this.$store.commit('setOpenedList');
        this.$store.commit('initCachepage');
        // 权限菜单过滤相关
        this.$store.commit('updateMenulist');
        // iview-admin检查更新
        /* util.checkUpdate(this); */
    },
    created () {
        let tagsList = [];
        appRouter.map((item) => {
            if (item.children.length <= 1) {
                tagsList.push(item.children[0]);
            } else {
                tagsList.push(...item.children);
            }
        });
        this.$store.commit('setTagsList', tagsList);
    }
});

/** 全局权限指令设置 */
let menuShow = (url) => {
    let accessList = JSON.parse(localStorage.getItem('funList'));
    for (let item of accessList) {
        if (item.url == url) {
            return false;
        }
    }
    return true;
};

Vue.prototype.menuShow = menuShow;

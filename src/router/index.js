import Vue from 'vue';
import iView from 'iview';
import Util from '../libs/util';
import VueRouter from 'vue-router';
import Cookies from 'js-cookie';
/* 所有的路由，不展示在左侧menu的路由，左侧展示的路由 */
import {routers, otherRouter, appRouter} from './router';

Vue.use(VueRouter);

// 路由配置
const RouterConfig = {
    // mode: 'history',
    routes: routers
};

/* 实例化路由 */
export const router = new VueRouter(RouterConfig);

router.beforeEach((to, from, next) => {
    /* 加载进度条 */
    iView.LoadingBar.start();
    /** 即将进入的页面的title，最好每个路由设置title值 */
    Util.title(to.meta.title);
    /** 已经锁定状态下不可进入其他页面,直接跳往锁屏页面 */
    if (Cookies.get('locking') === '1' && to.name !== 'locking') {  // 判断当前是否是锁定状态
        next({
            replace: true,
            name: 'locking'
        });
    } else if (Cookies.get('locking') === '0' && to.name === 'locking') {
        next(false);
    } else {
        // 未登录跳往登录页面
        if (!Cookies.get('user') && to.name !== 'login') {
            next({
                name: 'login'
            });
        } else if (Cookies.get('user') && to.name === 'login') {  // 判断是否已经登录且前往的是登录页
            /* 已登录状态前往登录页面，直接重定向首页 */
            Util.title();
            next({
                name: 'home_index'
            });
        } else {
            const curRouterObj = Util.getRouterObjByName([otherRouter, ...appRouter], to.name);
            /* 存在需要权限判断的路由 */
            if (curRouterObj && curRouterObj.access !== undefined) {  // 需要判断权限的路由
                let menuArray = JSON.parse(localStorage.getItem('menuList'));
                let accessCode = [];
                for (let item of menuArray) {
                    accessCode.push(item.url);
                }
                if (Util.oneOf(curRouterObj.access, accessCode)) {
                    Util.toDefaultPage([otherRouter, ...appRouter], to.name, router, next);  // 如果在地址栏输入的是一级菜单则默认打开其第一个二级菜单的页面
                } else {
                    /* 无权限的情况下直接跳转403error */
                    next({
                        replace: true,
                        name: 'error-403'
                    });
                }
            } else { // 没有配置权限的路由, 直接通过
                Util.toDefaultPage([...routers], to.name, router, next);
            }
        }
    }
});

router.afterEach((to) => {
    Util.openNewPage(router.app, to.name, to.params, to.query);
    iView.LoadingBar.finish();
    window.scrollTo(0, 0);
});

import Main from '@/views/Main.vue';

// 不作为Main组件的子页面展示的页面单独写，如下
export const loginRouter = {
    path: '/login',
    name: 'login',
    meta: {
        title: 'Login - 登录'
    },
    component: resolve => { require(['@/views/login.vue'], resolve); }
};

export const page404 = {
    path: '/*',
    name: 'error-404',
    meta: {
        title: '404-页面不存在'
    },
    component: resolve => { require(['@/views/error-page/404.vue'], resolve); }
};

export const page403 = {
    path: '/403',
    meta: {
        title: '403-权限不足'
    },
    name: 'error-403',
    component: resolve => { require(['@//views/error-page/403.vue'], resolve); }
};

export const page500 = {
    path: '/500',
    meta: {
        title: '500-服务端错误'
    },
    name: 'error-500',
    component: resolve => { require(['@/views/error-page/500.vue'], resolve); }
};
export const locking = {
    path: '/locking',
    name: 'locking',
    component: resolve => { require(['@/views/main-components/lockscreen/components/locking-page.vue'], resolve); }
};

// 作为Main组件的子页面展示但是不在左侧菜单显示的路由写在otherRouter里
export const otherRouter = {
    path: '/',
    name: 'otherRouter',
    redirect: '/home',
    component: Main,
    children: [
        { path: 'home', title: '首页', name: 'home_index', component: resolve => { require(['@/views/home/home.vue'], resolve); } },
        { path: 'ownspace', title: '个人中心', name: 'ownspace_index', component: resolve => { require(['@/views/own-space/own-space.vue'], resolve); } },
        { path: 'message', title: '消息中心', name: 'message_index', component: resolve => { require(['@/views/message/message.vue'], resolve); } },
        { path: 'access/business/add', title: '添加企业', name: 'business_add', component: resolve => { require(['@/views/access/business-manage/business-add.vue'], resolve); } },
        { path: 'access/business/depart', title: '编辑部门信息', name: 'business_depart', component: resolve => { require(['@/views/access/business-manage/business-depart.vue'], resolve); } },
        { path: 'access/role/role_add/:role_id', title: '添加角色', name: 'role_add', component: resolve => { require(['@/views/access/role-manage/role-add.vue'], resolve); } },
        { path: 'access/user/user_add/:user_id', title: '添加用户', name: 'user_add', component: resolve => { require(['@/views/access/user-manage/user-add.vue'], resolve); } },
        { path: 'followBusiness/page/page', title: '空白页', name: 'page', component: resolve => { require(['@/views/followBusiness/page/page.vue'], resolve); } },
        { path: 'followSetting/voice/voice/:id', title: '语音编辑', name: 'voice', component: resolve => { require(['@/views/followSetting/voice/voice.vue'], resolve); } }
    ]
};

// 作为Main组件的子页面展示并且在左侧菜单显示的路由写在appRouter里
export const appRouter = [
    {
        path: '/component',
        icon: 'social-buffer',
        name: 'follow      ',
        title: '随访业务',
        component: Main,
        children: [
            { path: 'patientList', icon: 'crop', name: 'patientList', title: '病患列表', component: resolve => { require(['@/views/followBusiness/patientList.vue'], resolve); } },
            { path: 'followPlan', icon: 'compose', name: 'followPlan', title: '随访计划', component: resolve => { require(['@/views/followBusiness/followPlan.vue'], resolve); } },
            { path: 'followResult', icon: 'pound', name: 'followResult', title: '随访记录', component: resolve => { require(['@/views/followBusiness/followResult.vue'], resolve); } },
            { path: 'temporaryTask', icon: 'arrow-move', name: 'temporaryTask', title: '发起临时随访任务', component: resolve => { require(['@/views/followBusiness/temporaryTask.vue'], resolve); } }
        ]
    },
    {
        path: '/component',
        icon: 'social-buffer',
        name: 'followSetting',
        title: '随访设置',
        component: Main,
        children: [
            { path: 'followIndex', icon: 'compose', name: 'followIndex', title: '随访指标', component: resolve => { require(['@/views/followSetting/followIndex.vue'], resolve); } },
            { path: 'followProblems', icon: 'pound', name: 'followProblems', title: '随访问题', component: resolve => { require(['@/views/followSetting/followProblems.vue'], resolve); } },
            { path: 'followTemplate', icon: 'crop', name: 'followTemplate', title: '随访模板', component: resolve => { require(['@/views/followSetting/followTemplate.vue'], resolve); } },
            { path: 'followWay', icon: 'arrow-move', name: 'followWay', title: '随访方案', component: resolve => { require(['@/views/followSetting/followWay.vue'], resolve); } }
        ]
    },
    {
        path: '/component',
        icon: 'social-buffer',
        name: 'menReview',
        title: '人工数据审核',
        component: Main,
        children: [
            { path: 'flWayRe', icon: 'compose', name: 'flWayRe', title: '随访结果审核', component: resolve => { require(['@/views/menReview/flWayRe.vue'], resolve); } },
            { path: 'planRe', icon: 'pound', name: 'planRe', title: '计划审核', component: resolve => { require(['@/views/menReview/planRe.vue'], resolve); } },
            { path: 'wayRe', icon: 'crop', name: 'wayRe', title: '方案匹配重复审核', component: resolve => { require(['@/views/menReview/wayRe.vue'], resolve); } }
        ]
    },
    {
        path: '/dataShow',
        icon: 'ios-grid-view',
        name: 'dataShow',
        title: '数据展示',
        component: Main,
        children: [
            { path: 'docSuggests', title: '医生意见反馈', name: 'docSuggests', icon: 'arrow-move', component: resolve => { require(['@/views/dataShow/docSuggests.vue'], resolve); } },
            { path: 'phoneCounts', title: '随访信息吞吐量情况', name: 'phoneCounts', icon: 'edit', component: resolve => { require(['@/views/dataShow/phoneCounts.vue'], resolve); } }
        ]
    },
    {
        path: '/dataInteraction',
        icon: 'ios-grid-view',
        name: 'dataInteraction',
        title: '数据交互',
        component: Main,
        children: [
            { path: 'picUpload', title: '图片录入', name: 'picUpload', icon: 'arrow-move', component: resolve => { require(['@/views/dataInteraction/picUpload.vue'], resolve); } },
            { path: 'voiceUpload', title: '语音录入', name: 'voiceUpload', icon: 'edit', component: resolve => { require(['@/views/dataInteraction/voiceUpload.vue'], resolve); } },
            { path: 'temImport', title: '随访模板导入', name: 'temImport', icon: 'arrow-move', component: resolve => { require(['@/views/dataInteraction/temImport.vue'], resolve); } },
            { path: 'temExport', title: '随访模板导出', name: 'temExport', icon: 'edit', component: resolve => { require(['@/views/dataInteraction/temExport.vue'], resolve); } },
            { path: 'patientImpro', title: '病患导入', name: 'patientImpro', icon: 'edit', component: resolve => { require(['@/views/dataInteraction/patientImpro.vue'], resolve); } }
        ]
    },
    {
        path: '/systemSet',
        icon: 'ios-grid-view',
        name: 'systemSet',
        title: '系统设置',
        component: Main,
        children: [
            { path: 'systemSetup', title: '系统设置', name: 'systemSetup', icon: 'arrow-move', component: resolve => { require(['@/views/systemSet/systemSetup.vue'], resolve); } },
            { path: 'timedTask', title: '定时任务', name: 'timedTask', icon: 'edit', component: resolve => { require(['@/views/systemSet/timedTask.vue'], resolve); } },
            { path: 'timedTaskLog', title: '定时任务日志', name: 'timedTaskLog', icon: 'arrow-move', component: resolve => { require(['@/views/systemSet/timedTaskLog.vue'], resolve); } },
            { path: 'departmentSet', title: '科室设置', name: 'departmentSet', icon: 'edit', component: resolve => { require(['@/views/systemSet/departmentSet.vue'], resolve); } },
            { path: 'diseaseSet', title: '疾病设置', name: 'diseaseSet', icon: 'arrow-move', component: resolve => { require(['@/views/systemSet/diseaseSet.vue'], resolve); } },
            { path: 'systemLog', title: '系统日志', name: 'systemLog', icon: 'edit', component: resolve => { require(['@/views/systemSet/systemLog.vue'], resolve); } },
            { path: 'followType', title: '随访类型优先级展示', name: 'followType', icon: 'edit', component: resolve => { require(['@/views/systemSet/followType.vue'], resolve); } }
        ]
    },
    {
        path: '/access',
        icon: 'key',
        name: 'access',
        title: '权限管理',
        component: Main,
        children: [
            { path: 'index', icon: 'ios-cog-outline', title: '权限管理', name: 'access_index', component: resolve => { require(['@/views/access/access.vue'], resolve); } },
            { path: 'business', icon: 'person-stalker', title: '企业管理', name: 'access_business', component: resolve => { require(['@/views/access/business-manage/business-manage.vue'], resolve); } },
            { path: 'role', icon: 'ios-pricetags-outline', title: '角色管理', name: 'role_manage', component: resolve => { require(['@/views/access/role-manage/role-manage.vue'], resolve); } },
            { path: 'user', icon: 'ios-shuffle', title: '用户列表', name: 'user_manage', component: resolve => { require(['@/views/access/user-manage/user-manage.vue'], resolve); } }
        ]
    },
    {
        path: '/international',
        icon: 'earth',
        title: {i18n: 'international'},
        name: 'international',
        component: Main,
        children: [
            { path: 'index', title: {i18n: 'international'}, name: 'international_index', component: resolve => { require(['@/views/international/international.vue'], resolve); } }
        ]
    },
    {
        path: '/error-page',
        icon: 'android-sad',
        title: '错误页面',
        name: 'errorpage',
        component: Main,
        children: [
            { path: 'index', title: '错误页面', name: 'errorpage_index', component: resolve => { require(['@/views/error-page/error-page.vue'], resolve); } }
        ]
    }
];

// 所有上面定义的路由都要写在下面的routers里
export const routers = [
    loginRouter,
    otherRouter,
    locking,
    ...appRouter,
    page500,
    page403,
    page404
];

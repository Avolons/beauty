import Main from '@/views/Main.vue';

/*  不作为Main组件的子页面展示的页面单独写  */
export const loginRouter = {
    path: '/login',
    name: 'login',
    meta: {
        title: 'Login - 登录'
    },
    component: resolve => {
        require(['@/views/login.vue'], resolve);
    }
};
export const page404 = {
    path: '',
    name: 'error-404',
    meta: {
        title: '404-页面不存在'
    },
    component: resolve => {
        require(['@/views/error-page/404.vue'], resolve);
    }
};
export const page403 = {
    path: '/403',
    meta: {
        title: '403-权限不足'
    },
    name: 'error-403',
    component: resolve => {
        require(['@//views/error-page/403.vue'], resolve);
    }
};
export const page500 = {
    path: '/500',
    meta: {
        title: '500-服务端错误'
    },
    name: 'error-500',
    component: resolve => {
        require(['@/views/error-page/500.vue'], resolve);
    }
};
/* * 锁屏页面  */
export const locking = {
    path: '/locking',
    name: 'locking',
    component: resolve => {
        require([
            '@/views/main-components/lockscreen/components/locking-page.vue'
        ], resolve);
    }
};

/*  作为Main组件的子页面展示但是不在左侧菜单显示的路由写在otherRouter里  */
export const otherRouter = {
    path: '/',
    name: 'otherRouter',
    redirect: '/home',
    component: Main,
    children: [
        {
            path: 'home',
            title: '首页',
            name: 'home_index',
            component: resolve => {
                require(['@/views/home/home.vue'], resolve);
            }
        },
        {
            path: 'ownspace',
            title: '个人中心',
            name: 'ownspace_index',
            component: resolve => {
                require(['@/views/own-space/own-space.vue'], resolve);
            }
        },
        {
            path: 'message',
            title: '消息中心',
            name: 'message_index',
            component: resolve => {
                require(['@/views/message/message.vue'], resolve);
            }
        },
        {
            path: '/access/business/add',
            title: '添加企业',
            access: '/access/business/add', // access已经添加
            name: 'business_add',
            component: resolve => {
                require(['@/views/access/business-manage/business-add.vue'], resolve);
            }
        },
        {
            path: '/access/business/depart',
            title: '编辑部门信息',
            access: '/access/business/depart', // access已经添加
            name: 'business_depart',
            component: resolve => {
                require([
                    '@/views/access/business-manage/business-depart.vue'
                ], resolve);
            }
        },
        {
            path: '/access/role/role_add',
            title: '角色编辑',
            access: '/access/role/role_add', // access已经添加
            name: 'role_add',
            component: resolve => {
                require(['@/views/access/role-manage/role-add.vue'], resolve);
            }
        },
        {
            path: '/access/user/user_add',
            title: '添加用户',
            access: '/access/user/user_add', // access已经添加
            name: 'user_add',
            component: resolve => {
                require(['@/views/access/user-manage/user-add.vue'], resolve);
            }
        },
        {
            path: '/followBusiness/page/page',
            title: '空白页',
            access: '/followBusiness/page/page', // access已经添加
            name: 'page',
            component: resolve => {
                require(['@/views/followBusiness/page/page.vue'], resolve);
            }
        },
        {
            path: '/followSetting/voice/voice/:id',
            title: '话术编辑',
            access: '/followSetting/voice/voice/:id', // access已经添加
            name: 'voice',
            component: resolve => {
                require(['@/views/followSetting/voice/voice.vue'], resolve);
            }
        },
        {
            path: '/followSetting/template/template/:id',
            access: '/followSetting/template/template/:id', // access已经添加
            title: '模板编辑',
            name: 'template',
            component: resolve => {
                require(['@/views/followSetting/template/template.vue'], resolve);
            }
        },
        {
            path: '/followSetting/way/way/:id',
            access: '/followSetting/way/way/:id', // access已经添加
            title: '方案编辑',
            name: 'way',
            component: resolve => {
                require(['@/views/followSetting/way/way.vue'], resolve);
            }
        }
    ]
};

/* 作为Main组件的子页面展示并且在左侧菜单显示的路由写在appRouter里; */
export const appRouter = [
    {
        path: '/dataShow',
        icon: 'ios-world-outline',
        name: 'dataShow',
        title: '数据报表',
        access: '/dataShow', // access已经添加
        component: Main,
        children: [
            {
                path: '/dataShow/dataCollect',
                title: '随访统计',
                access: '/dataShow/dataCollect', // access已经添加
                name: 'docSuggests',
                icon: 'chatbubble',
                component: resolve => {
                    require(['@/views/dataShow/dataCollect.vue'], resolve);
                }
            }
      /*  {
        path: "/dataShow/docSuggests",
        title: "医生意见反馈",
        access: "/dataShow/docSuggests", // access已经添加
        name: "docSuggests",
        icon: "chatbubble",
        component: resolve => {
          require(["@/views/dataShow/docSuggests.vue"], resolve);
        }
      },
      {
        path: "/dataShow/phoneCounts",
        title: "随访信息吞吐量情况",
        access: "/dataShow/phoneCounts", // access已经添加
        name: "phoneCounts",
        icon: "eject",
        component: resolve => {
          require(["@/views/dataShow/phoneCounts.vue"], resolve);
        }
      } */
        ]
    },
    {
        path: '/sms',
        icon: 'chatboxes',
        name: 'sms',
        title: '短信统计',
        access: '/sms', // access已经添加
        component: Main,
        children: [
            {
                path: '/sms/sms',
                title: '短信统计',
                access: '/sms/sms', // access已经添加
                name: 'smes',
                icon: 'chatbox-working',
                component: resolve => {
                    require(['@/views/sms/sms.vue'], resolve);
                }
            }
        ]
    },
    {
        path: '/followBusiness',
        icon: 'edit',
        name: 'followBusiness',
        access: '/followBusiness', // access已经添加
        title: '随访业务',
        component: Main,
        children: [
            {
                path: '/followBusiness/patientList',
                icon: 'ios-barcode-outline',
                name: 'patientList',
                title: '客户列表',
                access: '/followBusiness/patientList', // access已经添加
                component: resolve => {
                    require(['@/views/followBusiness/patientList.vue'], resolve);
                }
            },
            {
                path: '/followBusiness/followPlan',
                icon: 'ios-speedometer',
                name: 'followPlan',
                title: '随访计划',
                access: '/followBusiness/followPlan', // access已经添加
                component: resolve => {
                    require(['@/views/followBusiness/followPlan.vue'], resolve);
                }
            },
            {
                path: '/followBusiness/normalTelephone',
                icon: 'ios-telephone-outline',
                name: 'normalTelephone',
                title: '正常通话',
                access: '/followBusiness/normalTelephone', // access已经添加
                component: resolve => {
                    require(['@/views/followBusiness/normalTelephone.vue'], resolve);
                }
            },
            {
                path: '/followBusiness/telephoneRecord',
                icon: 'ios-stopwatch-outline',
                name: 'telephoneRecord',
                title: '通话记录',
                access: '/followBusiness/telephoneRecord', // access已经添加
                component: resolve => {
                    require(['@/views/followBusiness/telephoneRecord.vue'], resolve);
                }
            },
            {
                path: '/followBusiness/temporaryTask',
                icon: 'ios-stopwatch',
                name: 'temporaryTask',
                title: '发起临时随访任务',
                access: '/followBusiness/temporaryTask', // access已经添加
                component: resolve => {
                    require(['@/views/followBusiness/temporaryTask.vue'], resolve);
                }
            }
        ]
    },
    /* {
        path: '/menReview',
        icon: 'social-buffer',
        name: 'menReview',
        title: '人工审核',
        access: '/menReview', // access已经添加
        component: Main,
        children: [
            {
                path: '/menReview/planRe',
                icon: 'podium',
                name: 'planRe',
                title: '随访计划审核',
                access: '/menReview/planRe', // access已经添加
                component: resolve => {
                    require(['@/views/menReview/planRe.vue'], resolve);
                }
            },
            {
                path: '/menReview/wayRe',
                icon: 'disc',
                name: 'wayRe',
                title: '计划匹配重复审核',
                access: '/menReview/wayRe', // access已经添加
                component: resolve => {
                    require(['@/views/menReview/wayRe.vue'], resolve);
                }
            },
            {
                path: '/menReview/flWayRe',
                icon: 'pricetags',
                name: 'flWayRe',
                title: '随访记录审核',
                access: '/menReview/flWayRe', // access已经添加
                component: resolve => {
                    require(['@/views/menReview/flWayRe.vue'], resolve);
                }
            }
        ]
    }, */
    {
        path: '/followSetting',
        icon: 'paintbucket',
        name: 'followSetting',
        title: '随访设置',
        access: '/followSetting', // access已经添加
        component: Main,
        children: [
            {
                path: '/followSetting/followIndex',
                icon: 'navigate',
                name: 'followIndex',
                title: '随访指标',
                access: '/followSetting/followIndex', // access已经添加
                component: resolve => {
                    require(['@/views/followSetting/followIndex.vue'], resolve);
                }
            },
            {
                path: '/followSetting/followProblems',
                icon: 'shuffle',
                name: 'followProblems',
                title: '随访问题',
                access: '/followSetting/followProblems', // access已经添加
                component: resolve => {
                    require(['@/views/followSetting/followProblems.vue'], resolve);
                }
            },
            {
                path: '/followSetting/followTemplate',
                icon: 'arrow-swap',
                name: 'followTemplate',
                title: '随访模板',
                access: '/followSetting/followTemplate', // access已经添加
                component: resolve => {
                    require(['@/views/followSetting/followTemplate.vue'], resolve);
                }
            },
            {
                path: '/followSetting/followWay',
                icon: 'arrow-return-left',
                name: 'followWay',
                title: '随访方案',
                access: '/followSetting/followWay', // access已经添加
                component: resolve => {
                    require(['@/views/followSetting/followWay.vue'], resolve);
                }
            }
        ]
    },
   /*  {
        path: '/notice',
        icon: 'email',
        name: 'notice',
        title: '通知业务',
        access: '/notice', // access已经添加
        component: Main,
        children: [
            {
                path: '/notice/creatNotice',
                icon: 'clipboard',
                name: 'creatNotice',
                title: '发起通知计划',
                access: '/notice/creatNotice', // access已经添加
                component: resolve => {
                    require(['@/views/notice/createNotice.vue'], resolve);
                }
            },
            {
                path: '/notice/viewNotice',
                icon: 'android-send',
                name: 'viewNotice',
                title: '查看通知进度',
                access: '/notice/viewNotice', // access已经添加
                component: resolve => {
                    require(['@/views/notice/noticeView.vue'], resolve);
                }
            }
        ]
    }, */

    {
        path: '/dataInteraction',
        icon: 'ios-settings-strong',
        name: 'dataInteraction',
        title: '数据交互',
        access: '/dataInteraction', // access已经添加
        component: Main,
        children: [
      /*  {
        path: '/dataInteraction/temImport',
        title: '随访模板导入',
        access: '/dataInteraction/temImport', // access已经添加
        name: 'temImport',
        icon: 'ios-upload',
        component: resolve => {
            require(['@/views/dataInteraction/temImport.vue'], resolve);
            }
        },
        {
            path: '/dataInteraction/temExport',
            title: '随访模板导出',
            access: '/dataInteraction/temExport', // access已经添加
            name: 'temExport',
            icon: 'ios-download-outline',
            component: resolve => {
                require(['@/views/dataInteraction/temExport.vue'], resolve);
            }
        }, */
            {
                path: '/dataInteraction/patientImpro',
                title: '病患导入',
                access: '/dataInteraction/patientImpro', // access已经添加
                name: 'patientImpro',
                icon: 'ios-cloud-upload',
                component: resolve => {
                    require(['@/views/dataInteraction/patientImpro.vue'], resolve);
                }
            },
            {
                path: '/dataInteraction/doctorImport',
                title: '医生导入',
                access: '/dataInteraction/doctorImport', // access已经添加
                name: 'doctorImport',
                icon: 'social-reddit-outline',
                component: resolve => {
                    require(['@/views/dataInteraction/doctorImport.vue'], resolve);
                }
            }
        ]
    },
    {
        path: '/systemSet',
        icon: 'ios-gear',
        name: 'systemSet',
        title: '系统设置',
        access: '/systemSet', // access已经添加
        component: Main,
        children: [
            {
                path: '/systemSet/systemSetup',
                title: '系统设置',
                operatMaintain: '/systemSet/systemSetup', // access已经添加
                name: 'systemSetup',
                icon: 'android-locate',
                component: resolve => {
                    require(['@/views/systemSet/systemSetup.vue'], resolve);
                }
            },
            {
                path: '/systemSet/operatMaintain',
                title: '运营维护',
                access: '/systemSet/operatMaintain', // access已经添加
                name: 'operatMaintain',
                icon: 'social-codepen',
                component: resolve => {
                    require(['@/views/systemSet/operatMaintain.vue'], resolve);
                }
            },
            {
                path: '/systemSet/timedTask',
                title: '定时任务',
                access: '/systemSet/timedTask', // access已经添加
                name: 'timedTask',
                icon: 'calendar',
                component: resolve => {
                    require(['@/views/systemSet/timedTask.vue'], resolve);
                }
            },
            {
                path: '/systemSet/timedTaskLog',
                title: '定时任务日志',
                access: '/systemSet/timedTaskLog', // access已经添加
                name: 'timedTaskLog',
                icon: 'android-document',
                component: resolve => {
                    require(['@/views/systemSet/timedTaskLog.vue'], resolve);
                }
            },
            {
                path: '/systemSet/departmentSet',
                title: '科室设置',
                access: '/systemSet/departmentSet', // access已经添加
                name: 'departmentSet',
                icon: 'android-map',
                component: resolve => {
                    require(['@/views/systemSet/departmentSet.vue'], resolve);
                }
            },
            {
                path: '/systemSet/diseaseSet',
                title: '疾病设置',
                access: '/systemSet/diseaseSet', // access已经添加
                name: 'diseaseSet',
                icon: 'android-share-alt',
                component: resolve => {
                    require(['@/views/systemSet/diseaseSet.vue'], resolve);
                }
            },
            {
                path: '/systemSet/systemLog',
                title: '系统日志',
                access: '/systemSet/systemLog', // access已经添加
                name: 'systemLog',
                icon: 'clipboard',
                component: resolve => {
                    require(['@/views/systemSet/systemLog.vue'], resolve);
                }
            }
      /*  {
        path: '/systemSet/followType',
        title: '随访类型优先级展示',
        access: '/systemSet/followType', // access已经添加
        name: 'level',
        icon: 'arrow-graph-up-right',
        component: resolve => {
            require(['@/views/systemSet/followType.vue'], resolve);
        }
    } */
        ]
    },
    {
        path: '/access',
        icon: 'ios-color-filter',
        name: 'access',
        title: '用户与权限',
        access: '/access', // access已经添加
        component: Main,
        children: [
            {
                path: '/access/control',
                icon: 'android-send',
                title: '权限管理',
                access: '/access/control', // access已经添加
                name: 'access_control',
                component: resolve => {
                    require(['@/views/access/access-control/accessControl.vue'], resolve);
                }
            },
      /* {
        path: '/access/group',
        icon: 'wand',
        title: '数据权限',
        access: '/access/group', // access已经添加
        name: 'access_group',
        component: resolve => {
            require(['@/views/access/group-manage/groupList.vue'], resolve);
        }
    }, */
            {
                path: '/access/business',
                icon: 'social-buffer',
                title: '企业管理',
                access: '/access/business', // access已经添加
                name: 'access_business',
                component: resolve => {
                    require([
                        '@/views/access/business-manage/business-manage.vue'
                    ], resolve);
                }
            },
            {
                path: '/access/role',
                icon: 'android-person',
                title: '角色管理',
                access: '/access/role', // access已经添加
                name: 'role_manage',
                component: resolve => {
                    require(['@/views/access/role-manage/role-manage.vue'], resolve);
                }
            },
            {
                path: '/access/user',
                icon: 'ios-list',
                title: '用户列表',
                access: '/access/user', // access已经添加
                name: 'user_manage',
                component: resolve => {
                    require(['@/views/access/user-manage/user-manage.vue'], resolve);
                }
            }
        ]
    }
  /* {
    path: '/international',
    icon: 'earth',
    title: {
        i18n: 'international'
    },
    name: 'international',
    component: Main,
    children: [{
        path: 'index',
        title: {
            i18n: 'international'
        },
        name: 'international_index',
        component: resolve => {
            require(['@/views/international/international.vue'], resolve);
        }
    }]
}, */
  /* {
    path: '/error-page',
    icon: 'android-sad',
    title: '错误页面',
    name: 'errorpage',
    component: Main,
    children: [{
        path: 'index',
        title: '错误页面',
        name: 'errorpage_index',
        component: resolve => {
            require(['@/views/error-page/error-page.vue'], resolve);
        }
    }]
} */
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


## 认识医生后台管理系统文件目录结构

```

├── accessMenu.js 权限控制集合
├── app.vue 主入口文件
├── images  图片文件夹
│   ├── cropper-test.png
│   ├── logo-min.png
│   └── logo.png
├── libs 自定义工具
│   ├── table2excel.js
│   └── util.js
├── locale 语言切换文件
│   ├── index.js
│   └── locale.js
├── main.js 主文件入口
├── router  路由文件
│   ├── index.js
│   └── router.js
├── services 服务文件（所有api）
│   ├── api.js
│   └── index.js
├── store 状态管理器
│   ├── index.js
│   └── modules
│       ├── app.js
│       └── user.js
├── styles 样式文件
│   ├── common.less
│   ├── fonts
│   │   ├── ionicons.eot
│   │   ├── ionicons.svg
│   │   ├── ionicons.ttf
│   │   └── ionicons.woff
│   ├── loading.less
│   └── login_bg.jpg
├── template 自定义模板
│   └── index.ejs
├── validate.js 验证规则文件
├── vendors 公共库
│   ├── vendors.base.js
│   └── vendors.exten.js
└── views 页面组件
    ├── Main.vue 主页面
    ├── access 权限管理页面
    │   ├── access-control 权限控制
    │   │   └── accessControl.vue
    │   ├── access.less
    │   ├── access.vue 权限控制
    │   ├── business-manage 企业管理
    │   │   ├── business-add.vue 企业新增
    │   │   ├── business-depart.vue 部门管理
    │   │   └── business-manage.vue 企业管理
    │   ├── group-manage 数据权限
    │   │   ├── groupAdd.vue
    │   │   ├── groupList.vue
    │   │   └── group_expand.vue
    │   ├── role-manage 角色管理
    │   │   ├── role-add.vue 角色新增
    │   │   └── role-manage.vue 角色添加
    │   └── user-manage 用户管理
    │       ├── user-add.vue 用户新增
    │       └── user-manage.vue 用户管理
    ├── dataInteraction 数据交互
    │   ├── patientImpro.vue  病患导入
    │   ├── temExport.vue  模板导出
    │   └── temImport.vue 模板导入
    ├── dataShow 数据展示
    │   ├── docSuggests.vue
    │   └── phoneCounts.vue
    ├── error-page
    │   ├── 403.less
    │   ├── 403.vue
    │   ├── 404.less
    │   ├── 404.vue
    │   ├── 500.less
    │   ├── 500.vue
    │   ├── error-page.less
    │   └── error-page.vue
    ├── followBusiness 随访业务
    │   ├── followPlan.vue 随访计划
    │   ├── followResult.vue 随访记录
    │   ├── patientList.vue 患者列表
    │   └── temporaryTask.vue 发起随访
    ├── followSetting 随访设置
    │   ├── followIndex.vue 随访指标
    │   ├── followProblems.vue 随访问题
    │   ├── followTemplate.vue 随访模板
    │   ├── followWay.vue 随访方案
    │   ├── template  模板编辑
    │   │   └── template.vue
    │   ├── voice 话术编辑
    │   │   └── voice.vue
    │   └── way 方案编辑
    │       └── way.vue
    ├── home 首页
    │   ├── components
    │   │   ├── countUp.vue
    │   │   ├── dataSourcePie.vue
    │   │   ├── inforCard.vue
    │   │   ├── map.vue
    │   │   ├── mapDataTable.vue
    │   │   ├── serviceRequests.vue
    │   │   ├── styles
    │   │   │   ├── infor-card.less
    │   │   │   └── to-do-list-item.less
    │   │   ├── toDoListItem.vue
    │   │   ├── userFlow.vue
    │   │   └── visiteVolume.vue
    │   ├── home.less
    │   ├── home.vue
    │   └── map-data
    │       ├── china.json
    │       ├── get-city-value.js
    │       ├── get-geography-value.js
    │       └── get-style-json.js
    ├── login.less
    ├── login.vue 登录
    ├── main-components 组件
    │   ├── breadcrumb-nav.vue 面包屑
    │   ├── fullscreen.vue 全屏
    │   ├── lockscreen 锁屏
    │   │   ├── components
    │   │   │   ├── locking-page.vue
    │   │   │   └── unlock.vue
    │   │   ├── lockscreen.vue
    │   │   └── styles
    │   │       └── unlock.less
    │   ├── message-tip.vue 
    │   ├── shrinkable-menu 左侧按钮列表
    │   │   ├── components
    │   │   │   ├── sidebarMenu.vue
    │   │   │   └── sidebarMenuShrink.vue
    │   │   ├── shrinkable-menu.vue
    │   │   └── styles
    │   │       └── menu.less
    │   ├── tags-page-opened.vue
    │   └── theme-switch 主题切换
    │       ├── theme
    │       │   ├── g.css
    │       │   ├── r.css
    │       │   └── y.css
    │       └── theme-switch.vue
    ├── main.less 
    ├── menReview 人工数据审核
    │   ├── flWayRe.vue 随访结果审核
    │   ├── planRe.vue 随访计划审核
    │   └── wayRe.vue  重复方案审核
    ├── message 消息通知
    │   ├── message.less
    │   └── message.vue
    ├── notice 通知
    │   ├── createNotice.vue 发起通知计划
    │   └── noticeView.vue 查看通知进度
    ├── own-space  个人信息
    │   ├── own-space.less
    │   └── own-space.vue 
    └── systemSet 系统设置
        ├── departmentSet.vue 科室设置
        ├── diseaseSet.vue 疾病设置
        ├── systemLog.vue 系统日志
        ├── systemSetup.vue 系统设置
        ├── timedTask.vue 定时任务
        └── timedTaskLog.vue 定时任务日志
```

/**
 * 功能权限控制对象
 */
export const AM = {
    /** 随访业务 */
    FollowBussiness: {

        /** 编辑患者信息 */
        savePat: '/visit/sufferer/save',

        /** 患者详细信息  */
        detailPat: '/visit/sufferer/get',

        /** 删除随访  */
        delPlan: '/visit/ordertask/delete',

        /** 取消随访 */
        cancelPlan: '/visit/ordertask/cancel',

        /** 随访计划详情 */
        detail: '/visit/ordertask/detail',

        /** 发起随访计划  */
        startPlan: '/visit/ordertask/visit',

        /** 删除随访记录  */
        delLog: '/visit/order/delete',

        /** 随访记录详情  */
        detailLog: '/visit/order/view',

        /** 终止随访 */
        cancleall: '/visit/ordertask/cancleall',

        /** 添加临时随访任务 */
        patSubmit: '/visit/order/temp/visit',

        /** 删除正常通话任务 */
        deleteRecord: '/bjmt/visit/deleteorder',

        /** 编辑正常通话任务 */
        editorRecord: '/bjmt/visit/getorderdetail',

        /** 导出选择项 */
        visitorDerexport: '/bjmt/visit/visitorderexport'
    },
    /** 随访设置 */
    FollowSetting: {

        /** 删除指标 */
        delIndex: '/visit/questiontarget/delete',

        /** 新增指标  */
        addIndex: '/visit/questiontarget/save',

        /** 编辑指标 */
        editIndex: '/visit/questiontarget/get',

        /** 删除问题 */
        delPro: '/visit/question/delete',

        /** 新增问题  */
        addPro: '/visit/question/save',

        /** 编辑问题 */
        editPro: '/visit/question/get',

        /** 编辑话术 */
        editVoice: '/visit/question/script/list',

        /** 删除模板 */
        delTem: '/visit/questiontemple/delete',

        /** 新增模板 */
        addTem: '/visit/questiontemple/save',

        /** 编辑模板 */
        editTem: '/visit/questiontemple/get',

        /** 导入模板 */
        importTem: '/visit/questiontemple/import',

        /** 导出模板 */
        exportTem: '/visit/questiontemple/export',

        /* 导出特殊模板 */
        specialExport:'/visit/questiontemple/specialexport',

        /** 删除方案 */
        delDep: '/visit/questionscheme/delete',

        /** 新增方案 */
        addDep: '/visit/questionscheme/save',

        /** 编辑方案 */
        editDep: '/visit/questionscheme/get'

    },
    /** 通知 */
    Notice: {
        /** 暂停计划 */
        cancelNotice: '/visit/order/notice/cancel',

        /**  删除计划 */
        delNotice: '/visit/order/notice/delete'
    },
    /** 人工数据审核 */
    Data: {

        /** 通过/不通过计划  */
        passPlan: '/visit/ordertask/vet',

        /** 结果审核  */
        saveResult: '/visit/order/vet/save',

        /** 结果删除  */
        delResult: '/visit/order/delete',

        /** 重复匹配审核  */
        listSame: '/visit/ordertask/list',

        /** 终止随访  */
        cancelall: '/visit/order/cancelall'
    },
    /** 权限管理 */
    Jur: {
        /** 企业添加  */
        addBusiness: '/visit/organization/add',

        /** 删除企业 */
        deletBusiness: '/visit/organization/del',

        /** 获取企业列表  */
        listBusiness: '/visit/organization/list',

        /** 查看企业详情 */
        infoBusiness: '/visit/organization/view',

        /** 查看企业对应部门分类树  */
        infoDepart: '/visit/adminDepartment/view',

        /** 新增部门 */
        addDepart: '/visit/adminDepartment/add',

        /** 删除部门接口  */
        delDepart: '/visit/adminDepartment/del',

        /** 查看部门对应职位树 */
        infoPosition: '/visit/position/view',

        /** 新增职位  */
        addPosition: '/visit/position/add',

        /** 删除职位 */
        delPosition: '/visit/position/del',

        /** 权限设置-功能树  */
        listFun: '/visit/admin/action/list',

        /** 编辑功能 */
        editFun: '/visit/admin/action/save',

        /** 功能删除  */
        delFun: '/visit/admin/action/del',

        /** 角色列表 */
        listRoles: '/visit/admin/roles/list',

        /** 角色新增  */
        infoRoles: '/visit/admin/roles/add',

        /** 角色编辑 */
        editRoles: '/visit/admin/roles/save',

        /** 角色删除 */
        delRoles: '/visit/admin/roles/del',

        /** 用户添加 */
        addUser: '/visit/admin/add',

        /** 用户删除  */
        editUser: '/visit/admin/update',

        /** 禁用用户 */
        lookaUser: '/visit/admin/stop',

        /** 启用用户  */
        unLookUser: '/visit/admin/unstop',

        /** 默认方案 */
        saveAction: '/visit/admin/save',

        /** 重置密码 */
        updataPass: '/visit/admin/resetPwd'
    },
    /** 系统设置 */
    Systems: {
        /** 系统参数列表  */
        listSystem: '/visit/newSysConfig/list',

        /** 系统属性添加 */
        addSystem: '/visit/newSysConfig/add',

        /** 系统功能编辑  */
        editSystem: '/visit/newSysConfig/update',

        /** 系统功能删除 */
        delSystem: '/visit/newSysConfig/del',

        /** 定时任务列表  */
        listTime: '/visit/newSysTaskHandle/list',

        /** 禁用启用定时任务 */
        typeTime: '/visit/newSysTaskHandle/enable',

        /** 定时任务备注  */
        remarkTime: '/visit/newSysTaskHandle/remark',

        /** 删除定时任务 */
        delTime: '/visit/newSysTaskHandle/del',

        /** 定时任务日志列表  */
        listTimeLog: '/visit/newSysTaskLog/list',

        /** 获取系统日志列表 */
        listSystemLog: '/visit/newSysLog/list',

        /** 科室列表  */
        listDepart: '/visit/newDepartment/list',

        /** 科室添加 */
        addDepart: '/visit/newDepartment/add',

        /** 科室编辑  */
        editDepart: '/visit/newDepartment/update',

        /** 科室删除 */
        delDepart: '/visit/newDepartment/del',

        /** 疾病信息列表 */
        listDisease: '/visit/newDisease/list',

        /** 疾病添加  */
        addDisease: '/visit/newDisease/add',

        /** 疾病编辑 */
        editDisease: '/visit/newDisease/update',

        /** 疾病删除  */
        delDisease: '/visit/newDisease/del',

        /** 查询所有部门接口 */
        listDisDepart: '/visit/newDisease/findDep',

        /** 保存方案接口 */
        saveDisAction: '/visit/newDisease/save',

        /** 查询对应模板方案 */
        listDisTemp: '/visit/newDisease/findTemp',

        /** 查询运营维护 */
        MaintainDate: '/visit/sysConfigOperation/list',

        /** 删除运营维护 */
        MaintainDel: '/visit/sysConfigOperation/del',

        /** 添加运营维护 */
        addMaintainDate: '/visit/sysConfigOperation/save',

        /** 编辑运营维护 */
        editorMaintainDate: '/visit/sysConfigOperation/view'
    }
};

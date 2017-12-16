/**
 * 功能权限控制对象
 */
export const AM = {
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

        /** 角色详情  */
        infoRoles: '/visit/admin/roles/add',

        /** 角色编辑 */
        editRoles: '/visit/admin/roles/save',

        /** 角色删除 */
        delRoles: '/visit/admin/roles/del'
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
        listDisTemp: '/visit/newDisease/findTemp'

    }
};

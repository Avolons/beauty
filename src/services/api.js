/**
 * 2017.12.8
 * wzh
 * sevices管理器
 */

import Vue from 'vue';
import axios from 'axios';
import qs from 'qs';

/* HTTP相关,使用Axios作为http库 */
Vue.prototype.$http = axios;

/* 默认最长响应时间 */
// axios.defaults.timeout = 5000;
/* 默认的接口地址 */
/* axios.defaults.baseURL = 'http://192.168.1.100:8080'; */
/* axios.defaults.baseURL = 'http://60.190.86.50:6016'; */
/* axios.defaults.baseURL = 'http://192.168.1.32:8081'; */
/* axios.defaults.baseURL = 'http://192.168.1.166:8080'; */
/* axios.defaults.baseURL = 'http://61.153.232.58:9998'; */

let JsonData = ['/order/temp/testvisit', '/order/temp/visit', '/visit/order/vet/save', '/visit/order/notice', '/ordertask/vet', '/question/script/save', '/questionscheme/save', '/questiontemple/save', '/questiontarget/save'];
// 添加请求拦截器
axios.interceptors.request.use(function (config) {
    let flag = 0;
    for (let item of JsonData) {
        if (config.url.indexOf(item) !== -1) {
            flag++;
            break;
        }
    }
    // 在发送请求之前做些什么
    if (flag > 0) {
        config.headers = {
            'Content-Type': 'application/json;charset=utf-8'
        };
    } else {
        config.data = qs.stringify(config.data);
        config.headers = {
            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
        };
    }
    /**
     * 设置cookie
     */
    if (!config.params) {
        config.params = {};
    }
    config.params.randomId = localStorage.getItem('randomId');
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

/* 返回一个Promise(发送post请求) */
function fetch (type, url, params) {
    return new Promise((resolve, reject) => {
        if (type === 'get') {
            axios.get(url, {
                params: params
            })
                .then(response => {
                    let code;
                    window.RSYS.$Spin.hide();
                    try {
                        code = JSON.parse(response.data).code;
                    } catch (error) {
                        resolve(response.data);
                    }
                    if (code === 2 || code === 21) {
                        window.RSYS.$router.push('/login');
                    } else if (code === 0) {
                        resolve(JSON.parse(response.data));
                    } else {
                        window.RSYS.$Message.warning(JSON.parse(response.data).message);
                        reject(new Error('fail'));
                    }
                }, err => {
                    reject(err);
                })
                .catch((error) => {
                    reject(error);
                });
        } else {
            axios.post(url, params)
                .then(response => {
                    window.RSYS.$Spin.hide();
                    let code = JSON.parse(response.data).code;
                    if (code === 2 || code === 21) {
                        window.RSYS.$router.push('/login');
                    } else if (code === 0) {
                        resolve(JSON.parse(response.data));
                    } else {
                        window.RSYS.$Message.warning(JSON.parse(response.data).message);
                        reject(new Error('fail'));
                    }
                }, err => {
                    reject(err);
                })
                .catch((error) => {
                    reject(error);
                });
        }
    });
}

/* 通用相关相关接口 *****/
export const Data = {
    /**
     * 登录接口
     * name
     * password
     * picCode
     * @param {any} data
     * @returns
     */
    doctorImport: axios.defaults.baseURL || '' + '/visit/excel/adminImport',
    PatImport: axios.defaults.baseURL || '' + '/visit/excel/import',
    temImport: axios.defaults.baseURL || '' + 'visit/questiontemple/import'
};

/* 首页接口 *****/
export const Home = {
    /**
     * 随访记录审核接口
     * @param {any} data
     * @returns
     */
    orderList (data) {
        return fetch('get', '/visit/hp/orderlist', data);
    },
    /**
     * 随访计划审核接口
     * @param {any} data
     * @returns
     */
    tasklist (data) {
        return fetch('get', '/visit/hp/tasklist', data);
    },
    /**
     * 方案重复匹配审核接口
     * @param {any} data
     * type:2    //必须为2(必传)
     * @returns
     */
    taskList (data) {
        return fetch('get', '/visit/hp/tasklist', data);
    },
    /**
     * 医生接诊量排行获取科室接口
     * @param {any} data
     * @returns
     */
    getdepartment (data) {
        return fetch('get', '/visit/hp/getdepartment', data);
    },
    /**
     * 医生接诊量排行接口
     * pager:1,           //当前页码
        limit:3,           //每页条数
        departmentId:6,   //科室(必传)
        type:1            //类型(必传)：1表示7日，2表示30日
     * @param {any} data
     * @returns
     */
    seniority (data) {
        return fetch('get', '/visit/hp/seniority', data);
    },
    /**
     * 就诊患者统计接口
     * departmentId:821,   //科室(必传)
        type:1            //类型(必传)：1表示7日，2表示30日
     * @param {any} data
     * @returns
     */
    jzcount (data) {
        return fetch('get', '/visit/hp/jzcount', data);
    },
    /**
     * 随访情况获取科室接口
     * @param {any} data
     * @returns
      */
    departList (data) {
        return fetch('get', '/visit/hp/getdepartmentbyorder', data);
    },
    /**
     * 随访情况接口
     * departmentId:17,   //科室(必传)
        type:1            //类型(必传)：1表示7日，2表示30日
     * @param {any} data
     * @returns
     */
    countvisitorder (data) {
        return fetch('get', '/visit/hp/countvisitorder', data);
    },
    /**
     * 每日随访任务量接口
        departmentId:821,   //科室(必传)
        type:1            //类型(必传)：1表示7日，2表示30日
     * @param {any} data
     * @returns
     */
    hccount (data) {
        return fetch('get', '/visit/hp/hccount', data);
    },
    /**
     * 任务完成情况统计接口
     * departmentId:5,   //科室(必传)
        type:1            //类型(必传)：1表示7日，2表示30日
     * @param {any} data
     * @returns
     */
    countvisitfinish (data) {
        return fetch('get', '/visit/hp/countvisitfinish', data);
    },
    /**
     * 任务失败情况统计接口
     * @param {any} data
     * @returns
     */
    countordercancel (data) {
        return fetch('get', '/visit/hp/countordercancel', data);
    }
};

/* 通用相关相关接口 *****/
export const common = {
    getNmae (data) {
        return fetch('post', '/pc/login/getYymc', data);
    },
    /**
     * 登录接口
     * name
     * password
     * picCode
     * @param {any} data
     * @returns
     */
    login (data) {
        return fetch('post', '/visit/admin/login/check', data);
    },
    change (data) {
        return fetch('post', '/wechat/login/pceditPassword', data);
    }

};

/* 权限管理相关接口 *****/
export const Jurisdiction = {
    // ****企业管理相关接口

    /**
     * 企业添加
     * name:  //公司名称 String
     * address:  //公司地址 String
     * contacts: //联系人 String
     * phone:  //公司电话 String
     * @param {any} data
     * @returns
     */
    addBusiness (data) {
        return fetch('post', '/visit/organization/save', data);
    },
    /**
     * 删除企业
     * id
     * @param {any} data
     * @returns
     */
    deletBusiness (data) {
        return fetch('get', '/visit/organization/del', data);
    },
    /**
     * 获取企业列表
     * page:1  //当前页码
     * namelk: //公司名字（用于查询）
     * @param {any} data
     * @returns
     */
    listBusiness (data) {
        return fetch('get', '/visit/organization/list', data);
    },
    /**
     * 查看企业详情
     * id
     * @param {any} data
     * @returns
     */
    infoBusiness (data) {
        return fetch('get', '/visit/organization/view', data);
    },
    /**
     * 查看企业对应部门分类树
     * orId
     * @param {any} data
     * @returns
     */
    infoDepart (data) {
        return fetch('get', '/visit/adminDepartment/view', data);
    },
    /**
     * 新增部门
     * orId
     * dpId
     * na
     * @param {any} data
     * @returns
     */
    addDepart (data) {
        return fetch('get', '/visit/adminDepartment/add', data);
    },
    /**
     * 删除部门接口
     * ids
     * @param {any} data
     * @returns
     */
    delDepart (data) {
        return fetch('get', '/visit/adminDepartment/del', data);
    },
    /**
     * 查看部门对应职位树
     * orId
     * dpId
     * @param {any} data
     * @returns
     */
    infoPosition (data) {
        return fetch('get', '/visit/position/view', data);
    },
    /**
     * 新增职位
     * orId
     * names
     * dpId
     * @param {any} data
     * @returns
     */
    addPosition (data) {
        return fetch('get', '/visit/position/add', data);
    },
    /**
     * 删除职位接口
     * nId
     * @param {any} data
     * @returns
     */
    delPosition (data) {
        return fetch('get', '/visit/position/del', data);
    },
    /**
     * 权限设置-功能树
     * @returns
     */
    listFun (data) {
        return fetch('get', '/visit/admin/action/list', data);
    },
    /**
     * 编辑功能
     * name:'我的测试11', 功能名称
     * url:'/visit/test/11', 功能对应的URL
     * isMenu:true, 菜单为true,功能为false
     * icon:'fa-home',默认为fa-home
     * menuPosStr:'',默认为空
     * paixu:0,排列顺序
     * pid:341 父ID
     * @param {any} data
     * @returns
     */
    editFun (data) {
        return fetch('post', '/visit/admin/action/save', data);
    },
    /**
     * 功能删除
     * id 功能id
     * @param {any} data
     * @returns
     */
    delFun (data) {
        return fetch('post', '/visit/admin/action/del', data);
    },
    /**
     * 角色列表
     * @returns
     */
    listRoles (data) {
        return fetch('get', '/visit/admin/roles/list', data);
    },
    /**
     * 角色详情
     * id
     * @returns
     */
    infoRoles (data) {
        return fetch('get', '/visit/admin/roles/add', data);
    },
    /**
     * 角色编辑
     * "name": "护工"
     * "profile": "护工人员"
     * "actionsIds": [0]
     * @param {any} data
     * @returns
     */
    editRoles (data) {
        return fetch('post', '/visit/admin/roles/save', data);
    },
    /**
     * 角色删除
     * id 角色id
     * @param {any} data
     * @returns
     */
    delRoles (data) {
        return fetch('post', '/visit/admin/roles/del', data);
    },
    /**
     * 用户列表
     * page:1 //当前页码
     * dpId: //科室Id
     * yhName: //用户名
     * types: //身份（0管理员，1医生）
     * state: //状态（0锁定，1正常）
     * @param {any} data
     * @returns
     */
    listUser (data) {
        return fetch('get', '/visit/admin/allList', data);
    },
    /**
     * 用户添加
     * types:0 //身份（0管理员，1医生）
     * dpId:1 //部门id
     * uName:abc //用户名
     * password:1 //密码
     * reName:acb //姓名
     * tel:123 // 电话号码
     * rIds: //权限Id（可多选）
     * @param {any} data
     * @returns
     */
    addUser (data) {
        return fetch('post', '/visit/admin/add', data);
    },
    /**
     * 用户编辑
     * types:0 //身份（0管理员，1医生）
     * dpId:1 //部门id
     * uName: //用户名
     * aId: //当前用户ID
     * reName:acb //姓名
     * tel:123 // 电话号码
     * rIds: //权限Id（可多选）
     * @param {any} data
     * @returns
     */
    editUser (data) {
        return fetch('post', '/visit/admin/update', data);
    },
    /**
     * 用户删除
     * id
     * @param {any} data
     * @returns
     */
    delUser (data) {
        return fetch('post', '/visit/admin/del', data);
    },
    /**
     * 角色详细信息
     * id: //用户Id
     * @param {any} data
     * @returns
     */
    userInfo (data) {
        return fetch('get', '/visit/admin/findAdmin', data);
    },
    /**
     * 角色信息展示接口
     * @param {any} data
     * @returns
     */
    roleList (data) {
        return fetch('get', '/visit/admin/roleList', data);
    },
    /**
     * 部门列表
     * @param {any} data
     * @returns
     */
    departList (data) {
        return fetch('get', '/visit/admin/adList', data);
    },
    /**
     * 职位列表
     * adId: //部门Id
     * @param {any} data
     * @returns
     */
    positionList (data) {
        return fetch('get', '/visit/admin/apList', data);
    },
    /**
     * 禁用用户
     * id
     * @param {any} data
     * @returns
     */
    lookaUser (data) {
        return fetch('post', '/visit/admin/stop', data);
    },
    /**
     * 启用用户
     * id
     * @param {any} data
     * @returns
     */
    unLookUser (data) {
        return fetch('post', '/visit/admin/unstop', data);
    },
    /**
     * 默认默认随访方案接口
     * page:1, //当前页码
        limit:3,//每页条数
        diseaseId:0, //疾病类型（可选）
        departmentId:899 //指标类型（可选）
     * @param {any} data
     * @returns
      */
    listUserPlan (data) {
        return fetch('get', '/visit/questionscheme/list', data);
    },
    /**
     * 重置密码
     * id: //当前用户ID
     * pwd: //新密码
     * @param {any} data
     * @returns
     */
    updataPass (data) {
        return fetch('post', '/visit/admin/resetPwd', data);
    },
    /**
     * 保存方案
     * id: //当前用户ID
     * qtId: //模板ID
     * @param {any} data
     * @returns
     */
    saveAction (data) {
        return fetch('post', '/visit/admin/save', data);
    }

};

/* 系统设置与相关接口 *****/
export const Systems = {
    /**
     * 系统列表
     * page:页码
     * @param {any} data
     * @returns
     */
    listSystem (data) {
        return fetch('get', '/visit/newSysConfig/list', data);
    },
    /**
     * 系统属性添加
     * type:0 //参数类型（ 0 文本字符串  1 开关 2 上传文件）
     * key:aaa //参数编号
     * value:bbb  //参数值
     * remark:ccc  //备注
     * @param {any} data
     * @returns
     */
    addSystem (data) {
        return fetch('get', '/visit/newSysConfig/add', data);
    },
    /**
     * 系统功能编辑
     * id:14 //当前数据id
     * value:gre //参数值
     * remark:sdfd //备注
     * @param {any} data
     * @returns
     */
    editSystem (data) {
        return fetch('post', '/visit/newSysConfig/update', data);
    },
    /**
     * 系统功能删除
     * id:14 //当前数据id
     * @param {any} data
     * @returns
     */
    delSystem (data) {
        return fetch('post', '/visit/newSysConfig/del', data);
    },
    /**
     * 定时任务列表
     * @param {any} data
     * @returns
     */
    listTime (data) {
        return fetch('get', '/visit/newSysTaskHandle/list', data);
    },
    /**
     * 禁用启用定时任务
     * id
     * @param {any} data
     * @returns
     */
    typeTime (data) {
        return fetch('get', '/visit/newSysTaskHandle/enable', data);
    },
    /**
     * 定时任务备注
     * id:
     * remark
     * @param {any} data
     * @returns
     */
    remarkTime (data) {
        return fetch('get', '/visit/newSysTaskHandle/remark', data);
    },
    /**
     * 删除定时任务
     * id
     * @param {any} data
     * @returns
     */
    delTime (data) {
        return fetch('post', '/visit/newSysTaskHandle/del', data);
    },
    /**
     * 定时任务日志列表
     * id
     * @param {any} data
     * @returns
     */
    listTimeLog (data) {
        return fetch('get', '/visit/newSysTaskLog/list', data);
    },
    /**
     * 获取系统日志列表
     * page:1 //当前页码
     * uriLike: //链接地址
     * ipLike: //ip地址
     * dateAddBegin: //起始时间（yyyy-MM-dd格式）
     * dateAddEnd: //结束时间 （yyyy-MM-dd格式）
     * @param {any} data
     */
    listSystemLog (data) {
        return fetch('get', '/visit/newSysLog/list', data);
    },
    /**
     * 科室列表
     * page:1 //当前页码
     * name:  //科室名称
     * types: //类型（0门诊，1住院，全部为null）
     * mType: //方案匹配（0疾病，1医生，全部为null）
     * iUse:  //状态（0为正常，1为禁用，全部为null）
     * @param {any} data
     * @returns
     */
    listDepart (data) {
        return fetch('get', '/visit/newDepartment/list', data);
    },
    /**
     * 科室添加
     * name:aaa //科室名字
     * paixu: 0 //排序
     * types:0 //类型（0门诊，1住院，全部为null）
     * mType:0 //方案匹配（0疾病，1医生，全部为null）
     * state:0  //状态（0为正常，1为禁用，全部为null）
     * remark:bbb //备注
     * @param {any} data
     * @returns
     */
    addDepart (data) {
        return fetch('post', '/visit/newDepartment/add', data);
    },
    /**
     * 科室编辑
     * id:555  //当前id
     * name:aaa //科室名字
     * paixu: 0 //排序
     * types:0 //类型（0门诊，1住院，全部为null）
     * mType:0 //方案匹配（0疾病，1医生，全部为null）
     * state:0  //状态（0为正常，1为禁用，全部为null）
    remark:bbb //备注
     * @param {any} data
     * @returns
     */
    editDepart (data) {
        return fetch('post', '/visit/newDepartment/update', data);
    },
    /**
     * 科室删除
     * id
     * @param {any} data
     * @returns
     */
    delDepart (data) {
        return fetch('post', '/visit/newDepartment/del', data);
    },
    /**
     * 疾病信息列表
     * page:1 //当前页码
     * dsName: //疾病名称
     * zName: //助记码
     * iName: //ICD编码
     * @param {any} data
     * @returns
     */
    listDisease (data) {
        return fetch('get', '/visit/newDisease/list', data);
    },
    /**
     * 疾病添加
     * name:aaa //疾病名称
     * zjmName:bbb //助记码
     * icdName:ccc //ICD编码
     * state:0 //状态（0正常，1禁用）
     * remark:ddd //备注
     * @param {any} data
     * @returns
     */
    addDisease (data) {
        return fetch('post', '/visit/newDisease/add', data);
    },
    /**
     * 疾病编辑
     * id: //当前疾病ID
     * name:aaa //疾病名称
     * zjmName:bbb //助记码
     * icdName:ccc //ICD编码
     * state:0 //状态（0正常，1禁用）
     * remark:ddd //备注
     * @param {any} data
     * @returns
     */
    editDisease (data) {
        return fetch('post', '/visit/newDisease/update', data);
    },
    /**
     * 疾病删除
     * id
     * @param {any} data
     * @returns
     */
    delDisease (data) {
        return fetch('post', '/visit/newDisease/del', data);
    },
    /**
     * 查询所有部门接口
     * @param {any} data
     * @returns
     */
    listDisDepart (data) {
        return fetch('post', '/visit/newDisease/findDep', data);
    },
    /**
     * 保存方案接口
     * id: //疾病ID
     * qtId: //模板ID
     * @param {any} data
     * @returns
     */
    saveDisAction (data) {
        return fetch('post', '/visit/newDisease/save', data);
    },
    /**
     * 查询对应模板方案
     * departmentId:0 //部门ID
     * diseaseId:0 //疾病ID
     * @param {any} data
     * @returns
     */
    listDisTemp (data) {
        return fetch('get', '/visit/newDisease/findTemp', data);
    }

};

/* 随访设置--随访指标接口 *****/
export const follSetting = {
    /**
     * 随访指标所有信息展示
     * page
     * limit
     * name
     * otype
     * @param {any} data
     * @returns
     */
    list (data) {
        return fetch('get', 'visit/questiontarget/list', data);
    },
    /**
     * 删除指标
     * @param {any} data
     * @returns
     */
    deleteList (data) {
        return fetch('get', 'visit/questiontarget/delete', data);
    },
    /**
     * 新增指标
     * @param {any} data
     * @returns
     */
    addList (data) {
        return fetch('post', 'visit/questiontarget/save', data);
    },
    /**
     * 编辑指标
     * @param {any} data
     * @returns
     */
    editList (data) {
        return fetch('get', 'visit/questiontarget/get', data);
    }
};
/* 随访设置--随访问题接口 *****/
export const followProblems = {
    /**
     * 随访问题所有信息展示
     * page//当前页码(必选)
     * limit//当每页条数,默认是10(必选)
     * title//指标名称(可选)
     * diseaseId //指标类型(可选)
     * @param {any} data
     * @returns
     */
    list (data) {
        return fetch('get', 'visit/question/list', data);
    },
    /**
     *删除问题
     * @param {any} data
     * @returns
     */
    deleteList (data) {
        return fetch('get', 'visit/question/delete', data);
    },
    /**
     *新增问题
     * @param {any} data
     * @returns
     */
    addList (data) {
        return fetch('post', 'visit/question/save', data);
    },
    /**
     * 编辑问题
     * @param {any} data
     * @returns
     */
    editList (data) {
        return fetch('get', 'visit/question/get', data);
    },
    /**
     * 疾病自动补全
     * @param {any} data
     * @returns
     */
    disease (data) {
        return fetch('get', 'visit/disease/autocomplete', data);
    }
};
/* 随访设置--话述信息  *****/
export const voiceSetting = {
    /*
     *话述信息
     *questionId(问题id)
     */
    question (data) {
        return fetch('get', 'visit/question/script/list', data);
    },
    /*
     *话述设置--删除
     *questionId(问题id)
     */
    questionDelete (data) {
        return fetch('get', 'visit/question/script/delete', data);
    },
    /*
     *话述设置--保存
     *questionId(问题id)
     */
    questionSave (data) {
        return fetch('post', 'visit/question/script/save', data);
    }

};
/* 随访设置--随访模板接口 *****/
export const followTemplate = {
    /*
     * 随访模板所有信息展示
     */
    list (data) {
        return fetch('get', '/visit/questiontemple/list', data);
    },
    /*
     *删除
     */
    deleteList (data) {
        return fetch('get', '/visit/questiontemple/delete', data);
    },
    /*
     *添加/修改
     *json格式
     */
    addList (data) {
        return fetch('post', '/visit/questiontemple/save', data);
    },
    /*
     *获取模板基本信息
     */
    editList (data) {
        return fetch('get', '/visit/questiontemple/get', data);
    },
    /*
     *根据模板id获取模板问题接口
     */
    questionList (data) {
        return fetch('get', '/visit/questiontemple/question/list', data);
    },
    /*
     *模板导出接口
     */
    export (data) {
        return fetch('get', '/visit/questiontemple/export', data);
    },
    /*
     *模板导入接口
     xmlFile:文件
     */
    import (data) {
        return fetch('post', '/visit/questiontemple/import', data);
    }

};

/* 随访设置--随访方案接口 *****/
export const followWay = {
    /*
     * 科室列表
     */
    departmentList (data) {
        return fetch('get', 'visit/department/list', data);
    },
    /*
     * 随访方案列表
     */
    list (data) {
        return fetch('get', 'visit/questionscheme/list', data);
    },
    /*
     *删除
     */
    deleteList (data) {
        return fetch('get', 'visit/questionscheme/delete', data);
    },
    /*
     *添加/修改
     *json格式
     */
    addList (data) {
        return fetch('post', 'visit/questionscheme/save', data);
    },
    /*
     *编辑展示
     */
    editList (data) {
        return fetch('get', 'visit/questionscheme/get', data);
    },
    /*
     *根据模板id获取语音
     */
    voiceList (data) {
        return fetch('get', 'visit/questionscheme/temple/list', data);
    }

};

/* 随访业务相关接口 *****/
export const FollowBussiness = {
    /*
     * 患者列表
     */
    listPat (data) {
        return fetch('get', '/visit/sufferer/list', data);
    },
    /*
     * 编辑患者信息
     */
    savePat (data) {
        return fetch('post', '/visit/sufferer/save', data);
    },
    /*
     * 患者详细信息
     */
    detailPat (data) {
        return fetch('get', '/visit/sufferer/get', data);
    },
    /*
     * 随访计划列表
     *  pager:1, //当前页码
    limit:3,//每页条数
    schemeName:测试,//方案名称（可选）
    brxm:朱兆庆 //患者姓名（可选）
     */
    listPlan (data) {
        return fetch('get', '/visit/ordertask/list', data);
    },
    /*
     * 删除随访
     * id:34259
     */
    delPlan (data) {
        return fetch('post', '/visit/ordertask/delete', data);
    },
    /*
     * 取消随访
     * id:34259
     */
    cancelPlan (data) {
        return fetch('get', '/visit/ordertask/cancel', data);
    },
    /*
     * 终止随访
     * id:34259
     * notPassReason:1,//未通过原因:1,患者已死亡;2,患者不接受随访;3,随访方案重复;4,方案不匹配;
     * notPassRemark:人人健康活百岁
     */
    cancleall (data) {
        return fetch('post', '/visit/ordertask/cancleall', data);
    },
    /*
     * 获取随访人的号码
     * id:患者id
     */
    gethzxx (data) {
        return fetch('get', '/visit/sufferer/gethzxx', data);
    },
    /*
     * 查看随访计划详情
     * id:id
     */
    detail (data) {
        return fetch('get', '/visit/ordertask/detail', data);
    },

    /*
     * 发起随访计划
     * id:34259,  //id
    phone:158888888 //手机号
     */
    startPlan (data) {
        return fetch('post', '/visit/ordertask/visit', data);
    },
    /*
    随访记录列表
     * pager:1, //当前页码
    limit:3,//每页条数
    schemeName:测试,//方案名称（可选）
    orderNo:1712180593098406,//编码（可选）
    brxm:许建月 //患者姓名（可选）
     */
    listLog (data) {
        return fetch('get', '/visit/order/list', data);
    },
    /*
     * 删除随访记录
     * id:34259
     */
    delLog (data) {
        return fetch('post', '/visit/order/delete', data);
    },
    /*
     * 随访记录详情
     * id:34259
     */
    detailLog (data) {
        return fetch('get', '/visit/order/view', data);
    },
    /**
     * 获取医生列表
     * pager:1, //当前页码
    limit:3,//每页条数
    departmentId:821,//医生id（必选）
    type:1 //默认为1 :1,表示医生；0，表示管理员（必选）
     * @param {any} data
     * @returns
     */
    listDoctor (data) {
        return fetch('get', '/visit/admin/list', data);
    },
    /**
     * 获取医生的患者列表
     * pager:1, //当前页码
        limit:3,//每页条数
        admin:288,//医生id（必选）
        brxm:陈金浩 //病人姓名（可选）
     * @returns
     */
    patList (data) {
        return fetch('get', '/visit/sufferer/select', data);
    },
    /**
     * 添加临时随访任务
     *"schemeId":"66afc543-e0ab-11e7-a153-6cae8b369de4", //方案id
    "schemeName":"测试方案",                            //方案名称
    "adminId":288,                                     //医生id
    "mobile":"18888888888",                            //发起人专属服务号码
    "visitStartTime":"2017-12-19 15:32:33",            //随访起始时间
    "hzxxIds":["73125","20121","3190"]                 //患者id
     * @returns
     */
    patSubmit (data) {
        return fetch('post', '/visit/order/temp/visit', data);
    },
    /**
     * 测试时间
     * "schemeId":"66afc543-e0ab-11e7-a153-6cae8b369de4", //方案id(必须)
    "schemeName":"测试方案",                            //方案名称(必须)
    "visitStartTime":"2017-12-19 15:32:33"            //随访起始时间(可选)
     * @param {any} data
     * @returns
      */
    patCeshi (data) {
        return fetch('post', '/visit/order/temp/testvisit', data);
    }
};

/* 通知相关接口 *****/
export const Notice = {
    /*
     * 通知列表
     * pager:1, //当前页码
        limit:3,//每页条数
        activeName:通知计划名称,//通知计划名称（可选）
        status:1, //状态（可选）
        dateBegin:30, //通知计划（可选）
        dateEnd:50    //通知计划（可选）
     */
    listNotice (data) {
        return fetch('get', '/visit/order/notice/list', data);
    },
    /**
     * activeId:11111  通知计划id
     * @param {any} data
     * @returns
     */
    delNotice (data) {
        return fetch('post', 'visit/order/notice/delete', data);
    },
    /**
     * activeId:11111  通知计划id
     * @param {any} data
     * @returns
     */
    cancelNotice (data) {
        return fetch('post', 'visit/order/notice/cancel', data);
    },
     /*
     * 通知列表
     * pager:1, //当前页码
        limit:3,//每页条数
        activeName:通知计划名称,//通知计划名称（可选）
        status:1, //状态（可选）
        dateBegin:30, //通知计划（可选）
        dateEnd:50    //通知计划（可选）
     */
    listPlan (data) {
        return fetch('get', '/visit/sufferer/select', data);
    },
    /**
     * activeId:11111  通知计划id
     * @param {any} data
     * @returns
     */
    createNotice (data) {
        return fetch('post', '/visit/order/notice', data);
    }

};

/* 数据审核 *****/
export const Dataaudit = {
    /*
     * 随访计划列表
     * pager:1, //当前页码
    limit:3, //每页条数
    schemeName:测试,//方案名称（可选）
    adminName:雷洋清,//医生
    brxm:李安, //患者姓名（可选）
    status:2, //状态 :0 待审核 1 不通过 2 审核通过 3 已排期 4 已取消
    operator:操作者,//操作者
    type:1  //必须传，且为1
     */
    listPlan (data) {
        return fetch('get', '/visit/ordertask/list', data);
    },
    /**
     * "status":2,//状态:只有待审核的才能审核（0 待审核 1 不通过 2 审核通过）
     * "ids":["fd47c338-e621-11e7-a153-6cae8b369de4","f08f92ff-e6bf-11e7-a153-6cae8b369de4"]
     * @param {any} data
     * @returns
     */
    passPlan (data) {
        return fetch('post', '/visit/ordertask/vet', data);
    },
    /*
     * 随访结果列表
     *pager:1, //当前页码
    limit:3,//每页条数
    schemeId:bf0aebbd-e3c0-11e7-a153-6cae8b369de4,//方案id（可选）
    orderNo:1712180593098406,//编码（可选）
    brxm:许建月, //患者姓名（可选）
    adminId:288,  //医生id
    status:2   //状态为2（必传）
     */
    listResult (data) {
        return fetch('get', '/visit/order/list', data);
    },
    /**
     * 终止随访
     *id：
     *notPassReason：2
     *notPassRemark: 拒绝随访
     */
    cancelall (data) {
        return fetch('post', '/visit/order/cancelall', data);
    },
    /**
     * 根据医生id获取方案列表接口
     * id
     * @param {any} data
     * @returns
     */
    listDoctorPlan (data) {
        return fetch('get', '/visit/questionscheme/getlistbyadminid', data);
    },
    /**
     * 随访记录详情
     * "id": //记录id
     * @param {any} data
     * @returns
     */
    infoResult (data) {
        return fetch('get', '/visit/order/view', data);
    },
    /**
     * 随访结果审核
     * @param {any} data
     * @returns
     */
    saveResult (data) {
        return fetch('post', '/visit/order/vet/save', data);
    },
    /**
     * 删除随访记录接口
     * "ids": //记录id
     * @param {any} data
     * @returns
     */
    delResult (data) {
        return fetch('post', '/visit/order/delete', data);
    },
    /**
     * 重复匹配列表
     * @param {any} data
     * @returns
     */
    listSame (data) {
        return fetch('get', '/visit/ordertask/list', data);
    }

};

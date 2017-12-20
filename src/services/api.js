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
axios.defaults.timeout = 500;
/* 默认的接口地址 */
axios.defaults.baseURL = 'http://192.168.1.100:8080/';

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
    // config.data = qs.stringify(config.data);
    if (config.url == 'http://192.168.1.100:8080/visit/question/script/save' || config.url == 'http://192.168.1.100:8080/visit/questiontemple/save' || config.url == 'http://192.168.1.100:8080/visit/questiontarget/save') {
    // config.data = JSON.stringify(config.data);
        config.headers = {
            'Content-Type': 'application/json;charset=utf-8'
        };
    } else {
        config.data = qs.stringify(config.data);
        config.headers = {
            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
        };
    }

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
                    if (JSON.parse(response.data).code === 0) {
                        resolve(JSON.parse(response.data));
                    } else {
                        window.RSYS.$Message.warning(JSON.parse(response.data).message);
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
                    if (JSON.parse(response.data).code === 0) {
                        resolve(JSON.parse(response.data));
                    } else {
                        window.RSYS.$Message.error(JSON.parse(response.data).message);
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
export const common = {
    /**
     * 登录接口
     * name
     * password
     * picCode
     * @param {any} data
     * @returns
     */
    login (data) {
        return fetch('post', 'http://192.168.1.100:8080/visit/admin/login/check', data);
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
        return fetch('post', '/visit/organization/add', data);
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
        return fetch('get', 'http://192.168.1.100:8080/visit/admin/action/list', data);
    },
    /**
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
        return fetch('post', 'http://192.168.1.100:8080/visit/admin/action/save', data);
    },
    /**
     * 功能删除
     * id 功能id
     * @param {any} data
     * @returns
     */
    delFun (data) {
        return fetch('post', 'http://192.168.1.100:8080/visit/admin/action/del', data);
    },
    /**
     * 角色列表
     * @returns
     */
    listRoles (data) {
        return fetch('get', 'http://192.168.1.100:8080/visit/admin/roles/list', data);
    },
    /**
     * 角色详情
     * id
     * @returns
     */
    infoRoles (data) {
        return fetch('get', 'http://192.168.1.100:8080/visit/admin/roles/add', data);
    },
    /**
     * "name": "护工"
     * "profile": "护工人员"
     * "actionsIds": [0]
     * @param {any} data
     * @returns
     */
    editRoles (data) {
        return fetch('post', 'http://192.168.1.100:8080/visit/admin/roles/save', data);
    },
    /**
     * 角色删除
     * id 角色id
     * @param {any} data
     * @returns
     */
    delRoles (data) {
        return fetch('post', 'http://192.168.1.100:8080/visit/admin/roles/del', data);
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
     * 定时任务列表
     * id
     * @param {any} data
     * @returns
     */
    typeTime (data) {
        return fetch('get', '/visit/newSysTaskHandle/enable', data);
    },
    /**
     * 定时任务列表
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
    addDisease  (data) {
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
    editDisease  (data) {
        return fetch('post', '/visit/newDisease/update', data);
    },
    /**
     * 疾病删除
     * id
     * @param {any} data
     * @returns
     */
    delDisease  (data) {
        return fetch('post', '/visit/newDisease/del', data);
    },
    /**
     * 查询所有部门接口
     * @param {any} data
     * @returns
     */
    listDisDepart  (data) {
        return fetch('post', '/visit/newDisease/del', data);
    },
    /**
     * 保存方案接口
     * id: //疾病ID
     * qtId: //模板ID
     * @param {any} data
     * @returns
     */
    saveDisAction (data) {
        return fetch('post', '/visit/newDisease/del', data);
    },
    /**
     * 查询对应模板方案
     * departmentId:0 //部门ID
     * diseaseId:0 //疾病ID
     * @param {any} data
     * @returns
     */
    listDisTemp  (data) {
        return fetch('post', '/visit/newDisease/findTemp', data);
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
    deleteList (data) {
        return fetch('get', 'visit/questiontarget/delete', data);
    },
    addList (data) {
        return fetch('post', 'visit/questiontarget/save', data);
    },
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
    deleteList (data) {
        return fetch('get', 'visit/questiontarget/delete', data);
    },
    addList (data) {
        return fetch('post', 'visit/question/save', data);
    },
    editList (data) {
        return fetch('get', 'visit/question/get', data);
    },
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
        return fetch('get', 'visit/questiontemple/list', data);
    },
    deleteList (data) {
        return fetch('get', 'visit/questiontemple/delete', data);
    },
  /*
  *添加/修改
  *json格式
  */
    addList (data) {
        return fetch('post', 'visit/questiontemple/save', data);
    },
  /*
  *编辑展示
  */
    editList (data) {
        return fetch('get', 'visit/questiontemple/get', data);
    },
  /*
  *根据模板id获取模板问题接口
  */
    questionList (data) {
        return fetch('get', 'visit/questiontemple/question/list', data);
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
  *方案模板信息
  */
    voiceList (data) {
        return fetch('get', 'visit/questionscheme/temple/list', data);
    }

};

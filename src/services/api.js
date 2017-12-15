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
  console.log(JSON.stringify(config))
    
  // 在发送请求之前做些什么
    config.data = qs.stringify(config.data);
  if(config.url == "http://192.168.1.100:8080/visit/question/script/save") {
     console.log('test')
    config.headers = {
      // 'Content-Type': 'application/json; charset=utf-8',
      "Content-Type": "application/json;charset=utf-8"
    }
  }else {
    
    config.headers = {
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
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
            resolve(JSON.parse(response.data));
        }, err => {
            reject(err);
        })
        .catch((error) => {
            reject(error);
        });
        } else {
            axios.post(url, params)
        .then(response => {
            resolve(JSON.parse(response.data));
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
   * username
   * password
   * picCode
   * @param {any} data
   * @returns
   */
    login (data) {
        return fetch('post', '/admin/login/check', data);
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
        return fetch('post', '/admin/organization/add', data);
    },
    /**
     * 删除企业
     * id
     * @param {any} data
     * @returns
     */
    deletBusiness (data) {
        return fetch('get', '/admin/organization/del', data);
    },
    /**
     * 获取企业列表
     * page:1  //当前页码
     * namelk: //公司名字（用于查询）
     * @param {any} data
     * @returns
     */
    listBusiness (data) {
        return fetch('get', '/admin/organization/list', data);
    },
    /**
     * 查看企业详情
     * id
     * @param {any} data
     * @returns
     */
    infoBusiness (data) {
        return fetch('get', '/admin/organization/view', data);
    },
    /**
     * 查看企业对应部门分类树
     * orId
     * @param {any} data
     * @returns
     */
    infoDepart (data) {
        return fetch('get', '/admin/adminDepartment/view', data);
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
        return fetch('get', '/admin/adminDepartment/add', data);
    },
    /**
     * 删除部门接口
     * ids
     * @param {any} data
     * @returns
     */
    delDepart (data) {
        return fetch('get', '/admin/adminDepartment/del', data);
    },
     /**
     * 查看部门对应职位树
     * orId
     * dpId
     * @param {any} data
     * @returns
     */
    infoPosition (data) {
        return fetch('get', '/admin/position/view', data);
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
        return fetch('get', '/admin/position/add', data);
    },
  /**
   * 删除职位接口
   * nId
   * @param {any} data
   * @returns
   */
    delPosition (data) {
        return fetch('get', '/admin/position/del', data);
    }

};

export const mine = {
    result (data) {
        return fetch('get', '/mine/patient', data);
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
        return fetch('get', 'visit/question/delete', data);
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
    deleteList(data) {
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
    },
};
/* 随访设置--随访问题接口 *****/
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
    deleteList(data) {
        return fetch('get', 'visit/questiontemple/delete', data);
    },
    addList (data) {
        return fetch('post', 'visit/questiontemple/save', data);
    },
    editList (data) {
        return fetch('get', 'visit/questiontemple/get', data);
    },
    disease (data) {
        return fetch('get', 'visit/disease/autocomplete', data);
    },
    /*
    *话述设置
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
    },
};


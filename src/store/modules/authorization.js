/**
 * 保存id
 * @param key
 * @param value
 */

import Vue from 'vue';

const setIdSessionStorage = (key, value) => {
    window.sessionStorage.setItem(key, JSON.stringify(value));
};

/**
 * 获取存储在sessionStorage中的数据
 * */
const getSessionData = key => window.sessionStorage.getItem(key);

// 当页面刷新后，首先从本地获取本地的存储的值
const loacalState = JSON.parse(getSessionData('authorization'));

const state = Object.assign(
    {
        followProble: {
            followProblePage: 1 // 随访问题记录页面分页页码值
        },
        followWayRecord: {
      // 随访方案
            page: 1
        },
        followTempRecord: {
      // 随访模板
            page: 1
        },
        accessUser: {
      // 用户列表
            page: 1
        },
        roleManage: {
      // 角色管理
            page: 1
        },
        accessBusiness: {
      // 企业管理
            page: 1
        }
    },
  loacalState
);

const mutations = {
  /**
     * 保存随访问题记录页面分页页码值
     * @param state
     * @param data
     */
    saveFollowProblePage (state, data) {
        try {
            Object.assign(state, data);
      // 更新后的数据存储到本地
      // setIdSessionStorage("authorization",data);
        } catch (err) {
            console.log('出现错误' + err);
        }
    },
  /**
     * 保存随访方案记录页面值
     * @param state
     * @param data
     */
    followWay (state, data) {
        try {
            Object.assign(state.followWayRecord, data);
      // 更新后的数据存储到本地
      // setIdSessionStorage("authorization",data);
        } catch (err) {
            console.log('出现错误' + err);
        }
    },
  /**
     * 保存随访模板记录页面值
     * @param state
     * @param data
     */
    followTemplate (state, data) {
        try {
            Object.assign(state.followTempRecord, data);
      // 更新后的数据存储到本地
      // setIdSessionStorage("authorization",data);
        } catch (err) {
            console.log('出现错误' + err);
        }
    },
  /**
     * 保存用户列表记录页面值
     * @param state
     * @param data
     */

    accessUse (state, data) {
        try {
            Object.assign(state.accessUser, data);
      // 更新后的数据存储到本地
      // setIdSessionStorage("authorization",data);
        } catch (err) {
            console.log('出现错误' + err);
        }
    },
  /**
     * 保存角色管理记录页面值
     * @param state
     * @param data
     */
    roleManageRecord (state, data) {
        try {
            Object.assign(state.roleManage, data);
      // 更新后的数据存储到本地
      // setIdSessionStorage("authorization",data);
        } catch (err) {
            console.log('出现错误' + err);
        }
    },
  /**
     * 保存角色管理记录页面值
     * @param state
     * @param data
     */
    accessBusinessRe (state, data) {
        try {
            Object.assign(state.accessBusiness, data);
      // 更新后的数据存储到本地
      // setIdSessionStorage("authorization",data);
        } catch (err) {
            console.log('出现错误' + err);
        }
    }
};
const actions = {
  /**
     * 保存随访问题记录页面分页页码值 进行改变
     * @param state
     * @param data
     */
    FollowProblePage ({ commit }, data) {
        commit('saveFollowProblePage', data);
    },

  /**
     * 保存随访方案记录页面值 进行改变
     * @param state
     * @param data
     */
    saveFollowWay ({ commit }, data) {
        commit('followWay', data);
    },
  /**
     * 保存随访模板记录页面值 进行改变
     * @param state
     * @param data
     */
    saveFollowTemplate ({ commit }, data) {
        commit('followTemplate', data);
    },
  /**
     * 保存用户列表记录页面值 进行改变
     * @param state
     * @param data
     */
    saveAccessUse ({ commit }, data) {
        commit('accessUse', data);
    },

  /**
     * 保存角色管理记录页面值 进行改变
     * @param state
     * @param data
     */
    saveRoleManageRecord ({ commit }, data) {
        commit('roleManageRecord', data);
    },
  /**
     * 保存企业管理记录页面值 进行改变
     * @param state
     * @param data
     */
    saveAccessBusines ({ commit }, data) {
        commit('accessBusinessRe', data);
    }
};

const getters = {
    authorToken (state) {
        return state;
    }
};

export default {
    state,
    getters,
    mutations,
    actions
};

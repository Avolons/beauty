<style lang="less">
.user {
    &_main {
        &_add {
            margin-bottom: 10px;
        }
        &_search {
            box-sizing: border-box;
            margin-bottom: 10px;
            .ivu-col {
                display: flex;
                >span {
                    background-color: #dadada;
                    text-align: center;
                    line-height: 32px;
                    display: block;
                    width: 80px;
                    border-top-left-radius: 4px;
                    border-bottom-left-radius: 4px;
                }
                .ivu-input {
                    border-top-left-radius: 0;
                    border-bottom-left-radius: 0;
                }
                .ivu-select {
                    flex-grow: 1;
                    flex-shrink: 1;
                }
                .ivu-select-selection {
                    border-top-left-radius: 0;
                    border-bottom-left-radius: 0;
                }
            }
        }
        &_page {
            margin-top: 10px;
        }
    }
}
</style>


<template>
    <div class="user">
        <div class="user_main">
            <Row class="user_main_search" :gutter="15">
                <Col span="6">
                <span>
                    所属科室
                </span>
                <Select v-model="searchParam.dpId" style="width:200px">
                    <Option v-for="item in departList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                </Select>
                </Col>
                <Col span="6">
                <span>
                    姓名
                </span>
                <Input v-model="searchParam.yhName" placeholder="请输入用户名"></Input>
                </Col>
                <Col span="6">
                <span>
                    身份
                </span>
                <Select v-model="searchParam.types" style="width:200px">
                    <Option value="-1">所有</Option>
                    <Option value="0">管理员</Option>
                    <Option value="1">医生</Option>
                </Select>
                </Col>
                <Col span="6">
                <span>
                    状态
                </span>
                <Select v-model="searchParam.state" style="width:200px">
                    <Option value="-1">所有</Option>
                    <Option value="0">锁定</Option>
                    <Option value="1">正常</Option>
                </Select>
                </Col>
            </Row>
            <div class="user_main_add">
                <Button @click="searchUser" type="primary">查询</Button>
                <Button @click="editUser(-1)" type="primary">新增用户</Button>
            </div>
            <div class="user_main_list">
                <Table border :columns="config" :data="dataList"></Table>
            </div>
            <Row class="user_main_page">
                <Page :total="totalPage" :page-size="pageSize" :current="searchParam.page" style="float:right" @on-change="changePage"></Page>
            </Row>
            <Modal v-model="actionmodal" title="选择默认方案" width=650>
                <Row class="" :gutter="15">
                    <Col span="12">
                    <span>
                        所在科室：
                    </span>
                    <Select @on-change="listDisTemp" v-model="actionList.departmentId" style="width:200px">
                        <Option v-for="item in departList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                    </Select>
                    </Col>
                    <Col span="12">
                    <span>
                        所属疾病：
                    </span>
                    <Select @on-change="listDisTemp" v-model="actionList.diseaseId" style="width:200px">
                        <Option v-for="item in tempList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                    </Select>
                    </Col>
                </Row>
                <Table style="margin-top:30px;" border :columns="tempconfig" :data="actionTree"></Table>
                <div slot="footer" class="user_main_btnList">
                </div>
            </Modal>
            <Modal v-model="passwordmodal" title="重置密码">
                <Input v-model="newPassword" placeholder="请输入新密码"></Input>
                <div slot="footer" class="user_main_btnList">
                    <Button type="primary" @click="submitPassword">确认</Button>
                </div>
            </Modal>
        </div>
    </div>
</template>

<script>
import { API } from '../../../services';
export default {
    data() {
        return {
            //当前用户id
            UserId: 0,
            //新密码
            newPassword: "",
            actionList: {
                departmentId: -1,//部门ID 
                diseaseId: -1 //疾病ID
            },
            totalPage: 10,//总页码
            pageSize: 10,//每页数据
            departList: [],//科室列表
            //模板方案列表
            tempList: [{
                name: "所有疾病",
                id: -1,
            }, {
                name: "公共模板",
                id: 0,
            }],
            //搜索参数
            searchParam: {
                page: 1,//当前页码
                dpId: "",//科室Id
                yhName: "", //用户名
                types: "-1",//身份（0管理员，1医生）
                state: "-1" //状态（0锁定，1正常）
            },
            actionmodal: false,//方案选择模态框
            passwordmodal: false,//密码更改模态框
            config: [
                {
                    title: '角色',
                    key: 'role',
                    render: (h, params) => {
                        return params.row.admin.type == 0 ? "管理员" : "医生";
                    }
                },
                {
                    title: '用户名',
                    key: 'username',
                    render: (h, params) => {
                        return params.row.admin.username
                    }
                },
                {
                    title: '最后登录时间',
                    key: 'time',
                    render: (h, params) => {
                        return params.row.admin.lastVisitDate
                    }
                },
                {
                    title: '默认方案',
                    key: 'dvtName',
                },
                {
                    title: '姓名',
                    key: 'name',
                    render: (h, params) => {
                        return params.row.admin.realname
                    }
                },
                {
                    title: '手机',
                    key: 'mobile',
                    render: (h, params) => {
                        return params.row.admin.mobile
                    }
                },
                {
                    title: '所属科室',
                    key: 'dpName',
                },
                {
                    title: '是否锁定',
                    key: 'look',
                    align: 'center',
                    render: (h, params) => {
                        if (!params.row.admin.isLock) {
                            return h('Icon', {
                                props: {
                                    type: "android-done",
                                },
                                style: {
                                    color: "#2d8cf0",
                                    fontSize: "20px"
                                }
                            });
                        } else {
                            return h('Icon', {
                                props: {
                                    type: "android-close",
                                },
                                style: {
                                    color: "#ed3f14"
                                }
                            });
                        }

                    }
                },
                {
                    title: '操作',
                    key: 'action',
                    width: 350,
                    align: 'center',
                    render: (h, params) => {
                        return h('div', [
                            h('Button', {
                                props: {
                                    type: 'primary',
                                    size: 'small'
                                },
                                style: {
                                    marginRight: '5px'
                                },
                                on: {
                                    click: () => {
                                        this.editUser(params.row.admin.id);
                                    }
                                }
                            }, '编辑'),
                            h('Button', {
                                props: {
                                    type: 'primary',
                                    size: 'small'
                                },
                                style: {
                                    marginRight: '5px'
                                },
                                on: {
                                    click: () => {
                                        /** 重置密码 */
                                        this.updataPassword(params.row.admin.id);
                                    }
                                }
                            }, '重置密码'),
                            h('Button', {
                                props: {
                                    type: params.row.admin.isLock ? 'primary' : 'info',
                                    size: 'small'
                                },
                                style: {
                                    marginRight: '5px'
                                },
                                on: {
                                    click: () => {
                                        /** 禁用/启用用户 */
                                        if (params.row.admin.isLock) {
                                            this.unLookUser(params.row.admin.id);
                                        } else {
                                            this.lookUser(params.row.admin.id);
                                        }

                                    }
                                }
                            }, params.row.admin.isLock ? '启用' : '禁用'),
                            h('Button', {
                                props: {
                                    type: 'warning',
                                    size: 'small'
                                },
                                style: {
                                    marginRight: '5px'
                                },
                                on: {
                                    click: () => {
                                        this.actionUser(params.row.admin.id);
                                    }
                                }
                            }, '默认方案'),
                            h('Button', {
                                props: {
                                    type: 'error',
                                    size: 'small'
                                },
                                style: {
                                    marginRight: '5px'
                                },
                                on: {
                                    click: () => {
                                        this.delUser(params.row.admin.id);
                                    }
                                }
                            }, '删除'),
                        ]);
                    }
                }
            ],
            dataList: [],
            tempconfig: [
                {
                    title: '随访方案',
                    key: 'name',
                },
                {
                    title: '操作',
                    key: 'action',
                    width: 100,
                    align: 'center',
                    render: (h, params) => {
                        return h('div', [
                            h('Button', {
                                props: {
                                    type: 'primary',
                                    size: 'small'
                                },
                                style: {
                                    marginRight: '5px'
                                },
                                on: {
                                    click: () => {
                                        this.saveDisAction(params.row.id);
                                    }
                                }
                            }, '选择'),
                        ]);
                    }
                }
            ],
            actionTree: [],//方案列表
        }
    },
    methods: {
        /** 
         * 获取所有部门
         */
        getDepart() {
            API.Systems.listDisDepart().then((res) => {
                this.departList = [{
                    name: "所有科室",
                    id: -1
                }, {
                    name: "公共科室",
                    id: 0
                }].concat(res.data);
            }).catch((err) => {

            });
        },
        /** 
          * 获取所有数据
          */
        getData() {
            let copyData = JSON.parse(JSON.stringify(this.searchParam));
            if (!copyData.dpId || copyData.dpId == -1) {
                delete copyData.dpId;
            }
            if (!copyData.yhName) {
                delete copyData.yhName;
            }
            if (copyData.types == -1) {
                delete copyData.types;
            }
            if (copyData.state == -1) {
                delete copyData.state;
            }
            API.Jurisdiction.listUser(copyData).then((res) => {
                this.dataList = res.data;
                this.totalPage = res.totalRow;
                this.pageSize = res.pageSize;
            }).catch((err) => {

            });
        },
        /** 
         * 搜索数据
         */
        searchUser() {
            this.searchParam.page = 1;
            this.getData();
        },
        /** 
         * 设置默认模板
         */
        actionUser(id) {
            this.actionmodal = true;
            this.UserId = id;
            this.actionList = {
                departmentId: -1,//部门ID 
                UserId: -1 //疾病ID
            };
            this.listDisTemp();
        },
        /** 
         * 设置默认模板
         */
        updataPassword(id) {
            this.passwordmodal = true;
            this.UserId = id;
        },
        /** 
         * 提交密码修改
         */
        submitPassword() {
            if (this.newPassword.trim()) {
                API.Jurisdiction.updataPass({
                    id: this.UserId,
                    pwd: this.newPassword
                }).then((res) => {
                    this.$Message.success("密码重置成功");
                    this.getData();
                    this.passwordmodal=false;
                    this.newPassword="";
                }).catch((err) => {

                });
            } else {
                this.$Message.warning("请输入新密码");
            }

        },
        /** 
         * 新增/编辑用户
         */
        editUser(id) {
            this.$router.push({
                path: "/access/user/user_add",
                query: {
                    id:id,
                }
            })
        },
        /** 
         * 
         */
        lookUser(id) {
            let self = this;
            this.$Modal.confirm({
                title: '禁用用户',
                content: '确定禁用该用户？',
                onOk: () => {
                    API.Jurisdiction.lookaUser({
                        id: id
                    }).then((res) => {
                        self.$Message.success("禁用成功");
                        self.getData();
                    }).catch((err) => {

                    });
                }
            });
        },
        /** 
         * 
         */
        unLookUser(id) {
            let self = this;
            this.$Modal.confirm({
                title: '启用用户',
                content: '确定启用该用户？',
                onOk: () => {
                    API.Jurisdiction.unLookUser({
                        id: id
                    }).then((res) => {
                        self.$Message.success("启用成功");
                        self.getData();
                    }).catch((err) => {

                    });
                }
            });
        },
        /** 
         * 删除用户
         */
        delUser(id) {
            let self = this;
            this.$Modal.confirm({
                title: '删除用户',
                content: '确定删除该用户？',
                onOk: () => {
                    API.Jurisdiction.delUser({
                        id: id
                    }).then((res) => {
                        self.$Message.success("删除成功");
                        self.getData();
                    }).catch((err) => {

                    });
                }
            });

        },
        /** 
         * 查询所有部门接口
         */
        listDisDepart() {
            API.Systems.listDisDepart().then((res) => {
                this.departList = [{
                    name: "所有科室",
                    id: -1
                }, {
                    name: "公共科室",
                    id: 0
                }].concat(res.data);
            }).catch((err) => {

            });
        },
        /** 
         * 查询对应的模板
         */
        listDisTemp() {
            API.Systems.listDisTemp({
                departmentId: this.actionList.departmentId == -1 ? null : this.actionList.departmentId,
                UserId: this.actionList.UserId == -1 ? null : this.actionList.UserId
            }).then((res) => {
                this.actionTree = res.data;
            }).catch((err) => {

            });
        },
        /** 
         * 保存方案
         */
        saveDisAction(id) {
            API.Jurisdiction.saveAction({
                id: this.UserId,
                qtId: id
            }).then((res) => {
                this.$Message.success("选择成功");
                this.actionmodal = false;
                this.getData();
            }).catch((err) => {

            });
        },
        /** 
         * 分页更改
         */
        changePage(page) {
            this.searchParam.page = page;
            this.getData();
        }
    }, mounted() {
        this.getDepart();
        this.getData();
    }
}
</script>


<style lang="less">
.user {
    &_main {
        &_add {
            margin-bottom: 10px;
        }
        &_actionTitle{
            margin: 10px 0;
            font-size: 15px;
            font-weight: 400;
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
                <Select :filterable="true" v-model="searchParam.dpId" style="width:200px">
                    <Option v-for="item in departList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                </Select>
                </Col>
                <Col span="6">
                <span>
                    真实姓名
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
                <Button @click="editUser(-1)" v-if="!menuShow(this.AM.Jur.addUser)" type="primary">新增用户</Button>
            </div>
            <div class="user_main_list">
                <Table border :columns="config" :data="dataList" :loading="createLoading"></Table>
            </div>
            <Row class="user_main_page">
                <Page :total="totalPage" :page-size="pageSize" show-total :current="searchParam.page" style="float:right" @on-change="changePage"></Page>
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
                <h3 class="user_main_actionTitle">已选方案:</h3>
                <Tag  @on-close="deletAction" :name="index" v-for="item,index in selectList" :key="item.id" closable color="blue">{{item.name}}</Tag>
                <div slot="footer" class="user_main_btnList">
                    <Button type="primary" @click="saveDisAction">确认</Button>
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
import {mapGetters, mapActions} from 'vuex';
export default {
    data() {
        return {
            selectList:[],//已选方案tag
            //当前用户id
            UserId: 0,
            createLoading:true,   //loading动画加载中
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
                types: "-1",//角色（0管理员，1医生）
                state: "-1" //状态（0锁定，1正常）
            },
            actionmodal: false,//方案选择模态框
            passwordmodal: false,//密码更改模态框
            config: [
                {
                    title: '用户名',
                    key: 'username',
                    render: (h, params) => {
                        return params.row.admin.username
                    }
                },
                {
                    title: '身份',
                    key: 'role',
                    render: (h, params) => {
                        return params.row.admin.type == 0 ? "管理员" : "医生";
                    }
                },
                // {
                //     title: '最后登录时间',
                //     key: 'time',
                //     render: (h, params) => {
                //         return params.row.admin.lastVisitDate
                //     }
                // },
                {
                    title: '默认方案',
                    key: 'dvtName',
                },
                {
                    title: '真实姓名',
                    key: 'name',
                    render: (h, params) => {
                        return params.row.admin.realname
                    }
                },
                {
                    title: '手机号码',
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
                    title: '是否禁用',
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
                                'class':{
									menuHide:this.menuShow(this.AM.Jur.addUser)
								},
                                on: {
                                    click: () => {
                                        this.editUser(params.row.admin.id);
                                        //保存数据  当再次返回的时候进行重新赋值
                                        this.saveAccessUse({
                                                "page":this.searchParam.page,       //页码
                                        });


                                    }
                                }
                            }, '编辑'),
                            h('Button', {
                                props: {
                                    type: 'primary',
                                    size: 'small'
                                },
                                'class':{
									menuHide:this.menuShow(this.AM.Jur.updataPass)
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
                                'class':{
									menuHide:(this.menuShow(this.AM.Jur.unLookUser)&&params.row.admin.isLock) || (this.menuShow(this.AM.Jur.lookaUser)&&!params.row.admin.isLock)
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
                                'class':{
									menuHide:this.menuShow(this.AM.Jur.saveAction)
								},
                                on: {
                                    click: () => {
                                        this.selectList=[];
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
                                'class':{
									menuHide:this.menuShow(this.AM.Jur.editUser)
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
                                        this.addAction(params.row);
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
    computed:{
        ...mapGetters([
            'authorToken'
        ]),

    },
    methods: {
        ...mapActions(['saveAccessUse']),
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
                this.createLoading = false;
            }).catch((err) => {

            });
        },
        /** 
         * 搜索数据
         */
        searchUser() {
            this.createLoading = true;
            this.searchParam.page = 1;
            this.getData();



            //保存数据  当再次返回的时候进行重新赋值
            this.saveAccessUse({
                dpId: this.searchParam.dpId||'',//科室Id
                yhName:this.searchParam.yhName||'', //用户名
                types:this.searchParam.types||-1,//角色（0管理员，1医生）
                state:this.searchParam.state||"-1" //状态（0锁定，1正常）
            });


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
                    pwd: this.newPassword.trim()
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
         * 锁定用户
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
         * 解锁用户
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
                        this.createLoading = true;
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
            API.Jurisdiction.listUserPlan({
                page:1,
                limit:99999,
                departmentId: this.actionList.departmentId == -1 ? null : this.actionList.departmentId,
                UserId: this.actionList.UserId == -1 ? null : this.actionList.UserId
            }).then((res) => {
                this.actionTree = res.data;


            }).catch((err) => {

            });
        },
        /** 
         * 默认方案是选择新增方案
         */
        addAction(item){
            for (const ite of this.selectList) {
                if(item.id==ite.id){
                    this.$Message.success("您已添加过");
                    return false;
                }  
            }
            this.selectList.push(item);
        },
        /** 
         * 删除已选择的方案
         */
        deletAction(event,name){
            this.selectList.splice(name,1);
        },
        /** 
         * 保存方案
         */
        saveDisAction() {
            this.createLoading = true;
            let idArray=[];
            for (const item of this.selectList) {
                idArray.push(item.id);
            }
            API.Jurisdiction.saveAction({
                id: this.UserId,
                qtId: idArray.join(',')
            }).then((res) => {
                this.$Message.success("保存成功");
                this.actionmodal = false;
                this.getData();
                this.selectList=[];
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
    },
    mounted() {
        /**
         * 获取页面 page 为Number
         * @type {number}
         */
        this.searchParam.page =Number(this.authorToken.accessUser.page);
        this.searchParam.dpId = this.authorToken.accessUser.dpId,//科室Id
        this.searchParam.yhName = this.authorToken.accessUser.yhName, //用户名
        this.searchParam.types = this.authorToken.accessUser.types//角色（0管理员，1医生）
        this.searchParam.state = this.authorToken.accessUser.state //状态（0锁定，1正常）
        this.getDepart();
        this.getData();
    }
}
</script>


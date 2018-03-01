<style lang="less" scoped>
.sys-task {
    &_main {
        &_list {}
        &_page {
            margin-top: 10px;
        }
    }
}
.sys-tasklog {
    &_main {

        &_list {}
        &_search{
            box-sizing: border-box;
            margin-bottom: 10px;
            .ivu-col{
                display: flex;
                >span{
                    background-color: #dadada;
                    text-align: center;
                    line-height: 32px;
                    display: block;
                    width: 80px;
                    flex-shrink: 0;
                    border-top-left-radius: 4px;
                    border-bottom-left-radius: 4px;
                }
                .ivu-input{
                    border-top-left-radius: 0;
                    border-bottom-left-radius: 0;
                }
                .ivu-select{
                    flex-grow: 1;
                    flex-shrink: 1;
                }
                .ivu-select-selection{
                    border-top-left-radius: 0;
                    border-bottom-left-radius: 0;
                }
            }
        }
        &_page{
            margin-top: 10px;
        }
    }
}
</style>


<template>
    <div class="user">
        <div class="sys-task_main">
            <Row class="sys-tasklog_main_search" :gutter="15">
                <Col span="6">
                    <span>
                        编号：
                    </span>
                    <Input   placeholder="请输入编号" v-model="searchParam.moduleName"></Input>
                </Col>
                <Col span="6">
                <span>
                            说明：
                        </span>
                <Input   placeholder="请输入说明" v-model="searchParam.remark"></Input>
                </Col>
                <Col span="6">
                    <span>
                            主机名：
                        </span>
                    <Input   placeholder="请输入主机名" v-model="searchParam.hostname"></Input>
                </Col>
                <Col span="6">
                <span>
                    状态：
                </span>
                <Select v-model="searchParam.state" style="width:200px">
                    <Option value="" >全部</Option>
                    <Option value=1 >禁用</Option>
                    <Option value=0 >启用</Option>
                </Select>
                </Col>
                <Col span="6">
                    <Button  type="primary" style="margin-top: 10px;" @click="searchData">查询</Button>
                </Col>

            </Row>
            <div class="sys-task_main_list">
                    <Table border :columns="config" :data="dataList" :loading="createLoading" class="tablet"></Table>
            </div>
            <Row class="sys-task_main_page" v-if="totalPage>10">
                    <Page :total="totalPage" show-total :current="page" show-elevator style="float:right" @on-change="changePage"></Page>
            </Row>
        </div>
    </div>
</template>

<script>
import { API } from '../../services/index.js';
export default {
    data() {
        return {
            createLoading:true,    //loading 动画加载中
            value: '', //备注内容
            currentId: -1, //当前被点击的id
            page: 1, //当前页码
            totalPage: 10, //总页码
            searchParam:{
                state: '',       //状态
                remark: '',     //说明
                moduleName: '' , //编号
                hostname: '' //主机名（可选）
            },
            config: [
                {
                    title: '编号',
                    key: 'moduleName',
                },
                {
                    title: '说明',
                    key: 'remark'
                },
                {
                    title: '主机名',
                    key: 'hostname'
                },
                {
                    title: '状态',
                    key: 'look',
                    width: 100,
                    align: 'center',
                    render: (h, params) => {
                        if (params.row.isEnabled == true) {
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
                    title: '创建时间',
                    key: 'createdAt'
                },
                {
                    title: '最后执行',
                    key: 'updatedAt'
                },
                {
                    title: '操作',
                    key: 'action',
                    width: 200,
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
									menuHide:this.menuShow(this.AM.Systems.remarkTime)
								},
                                on: {
                                    click: () => {
                                        this.remarkTime(params.row.id)
                                    }
                                }
                            }, '备注'),
                            h('Button', {
                                props: {
                                    type: params.row.isEnabled ? 'error' : 'info',
                                    size: 'small'
                                },
                                'class':{
									menuHide:this.menuShow(this.AM.Systems.typeTime)
								},
                                style: {
                                    marginRight: '5px'
                                },
                                on: {
                                    click: () => {
                                        this.typeTime(params.row.id)
                                    }
                                }
                            }, params.row.isEnabled ? '禁用' : '启用'),
                            h('Button', {
                                props: {
                                    type: 'warning',
                                    size: 'small'
                                },
                                'class':{
									menuHide:this.menuShow(this.AM.Systems.delTime)
								},
                                style: {
                                    marginRight: '5px'
                                },
                                on: {
                                    click: () => {
                                        this.delTime(params.index)
                                    }
                                }
                            }, '删除'),
                        ]);
                    }
                }
            ],
            dataList: []
        }
    },
    methods: {
        /**
         * 点击查询获取所有数据
         */
        searchData(){
            this.page =1;
            this.getData();
        },
        /** 
         * 获取所有数据
         */
        getData () {
            API.Systems.listTime({
                pager: this.page,
                remark: this.searchParam.remark,
                moduleName: this.searchParam.moduleName,
                hostname: this.searchParam.hostname,
                state: this.searchParam.state,
                limit: 10
            }).then((res) => {
                this.dataList = res.data;
                this.totalPage=res.total;
                this.createLoading = false;
            }).catch((err) => {

            });
        },
        /** 
         * 删除定时任务
         */
        delTime(id) {
            let self = this;
            this.$Modal.confirm({
                title: '删除设置',
                content: '确定删除该系统设置？',
                onOk: () => {
                    API.Systems.delSystem({
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
         * 添加备注
         */
        remarkTime(id) {
            let self=this;
            this.currentId = id;
            this.$Modal.confirm({
                render: (h) => {
                    return h('Input', {
                        props: {
                            value: this.value,
                            autofocus: true,
                            placeholder: '请填写备注'
                        },
                        on: {
                            input: (val) => {
                                this.value = val;
                            }
                        },

                    })
                },
                onOk: () => {
                    if (self.value.trim()) {
                        API.Systems.remarkTime({
                            id: self.currentId,
                            remark: self.value
                        }).then((res) => {
                            self.$Message.success("填写成功");
                            self.getData();
                            self.currentId=-1;
                            self.value="";
                        }).catch((err) => {
                                
                        });
                    }
                }
            })
        },
        /** 
         * 切换定时任务状态
         */
        typeTime(id) {
            API.Systems.typeTime({
                id: id
            }).then((res) => {
                this.$Message.success("操作成功");
                this.getData();
            }).catch((err) => {

            });
        },
        /** 
         * 分页更改,暂时不需要
         */
        changePage(page) {
            this.page = page;
            this.getData();
        },
    },
    mounted() {
        this.getData();
    }
}
</script>


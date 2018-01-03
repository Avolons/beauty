<style lang="less">
.sys-task {
    &_main {
        &_list {}
        &_page {
            margin-top: 10px;
        }
    }
}
</style>


<template>
    <div class="user">
        <div class="sys-task_main">
            <div class="sys-task_main_list">
                <Table border :columns="config" :data="dataList"></Table>
            </div>
            <Row class="sys-task_main_page">
                    <Page :total="totalPage" :current="page" show-elevator style="float:right" @on-change="changePage"></Page>
                </Row>
        </div>
    </div>
</template>

<script>
import { API } from '../../services/index.js';
export default {
    data() {
        return {
            value: "",//备注内容
            currentId: -1,//当前被点击的id
            page: 1,//当前页码
            totalPage: 10,//总页码
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
         * 获取所有数据
         */
        getData() {
            API.Systems.listTime({
                pager:this.page,
                limit:10
            }).then((res) => {
                this.dataList = res.data;
                this.totalPage=res.total;
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


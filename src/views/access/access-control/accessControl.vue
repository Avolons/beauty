
<style lang="less">
.ivu-modal-confirm-footer {
    margin-top: 10px;
}

.access {
    height: 100%;
    &_main {
        height: 100%;
        .ivu-tree ul {
            font-size: 15px;
        }
        .ivu-col {
            height: 100%;
            .ivu-card {
                height: 90%;
            }
        }
        &_header {
            margin-bottom: 15px;
        }
        &_page {
            margin-top: 15px;
        }
        &_title {
            color: #1c2438;
            font-size: 15px;
            >.ivu-icon {
                font-size: 15px;
                margin-right: 5px;
            }
        }
        &_tree {
            background: #fff;
            border-radius: 4px;
            overflow: hidden;
            box-sizing: border-box;
            border: 1px solid #dddee1;
            .ivu-tree {
                font-size: 15px;
                .ivu-tree-children {
                    font-size: 15px;
                }
            }
        }
        &_edit {
            background: #fff;
            border-radius: 4px;
            overflow: hidden;
            box-sizing: border-box;
            border: 1px solid #dddee1;
        }
        &_single {
            max-width: 300px;
            margin-top: 10px;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            >h4 {
                font-size: 12px;
                display: block;
                text-indent: 10px;
                height: 25px;
                border-radius: 5px;
                line-height: 25px;
                width: 60%;
                text-align: center;
                background-color: #eee;
                outline: none;
                margin-right: 3px;
            }
            .ivu-icon {
                color: #ed3f14;
                font-size: 20px;
                cursor: pointer;
            }
        }
        &_btnList {
            margin-top: 20px;
        }
    }
}
</style>
<template>
    <div class="access">
        <Card class="access_main_tree">
            <h3 slot="title" class="access_main_title">
                <Icon type="ios-copy-outline"></Icon>编辑功能权限
            </h3>
            <Tree :data="depart" :render="renderContent"></Tree>
        </Card>
        <Modal v-model="modal" title="功能编辑">
            <Form ref="access" class="access_main_form" :model="access" :rules="validate.access" :label-width="80">
                <FormItem label="名称" prop="name">
                    <Input v-model="access.name" placeholder="请填写名称"></Input>
                </FormItem>
                <FormItem label="链接地址" prop="url">
                    <Input v-model="access.url" placeholder="请填写链接地址"></Input>
                </FormItem>
                <FormItem label="是否为菜单" prop="isMenu">
                    <Select v-model="access.isMenu" placeholder="请选择类型">
                        <Option value="true" >菜单</Option>
                        <Option value="false" >功能</Option>
                    </Select>
                </FormItem>
                <div slot="footer" class="sys-sysset_main_btnList">
                    <Button type="primary" @click="addAccess">确认</Button>
                </div>
            </Form>
        </Modal>
    </div>
</template>

<script>
import { API } from '../../../services'
export default {
    data() {
        return {
            access: {
                name:'', //功能名称
                url:'', //功能对应的URL
                isMenu:"",  //菜单为true,功能为false
                icon:'fa-home',  //默认为fa-home
                menuPosStr:'',  //默认为空
                paixu:0,   //排列顺序
                pid:341    //父ID

            },
            modal: false,
            depart: [
                {
                    name: '认识医生',
                    expand: true,
                    id: -1,
                    render: (h, { root, node, data }) => {
                        return h('span', {
                            style: {
                                display: 'inline-block',
                                width: '100%'
                            }
                        }, [
                                h('span', [
                                    h('Icon', {
                                        props: {
                                            type: 'ios-folder-outline'
                                        },
                                        style: {
                                            marginRight: '8px'
                                        }
                                    }),
                                    h('span', data.name)
                                ]),
                                h('span', {
                                    style: {
                                        display: 'inline-block',
                                        float: 'right',
                                        marginRight: '32px'
                                    }
                                }, [
                                        h('Button', {
                                            props: Object.assign({}, this.buttonProps, {
                                                icon: 'compose',
                                                type: 'primary'
                                            }),
                                            style: {
                                                width: '100px'
                                            },
                                            on: {
                                                click: () => { this.editDepart(data) }
                                            }
                                        }, "新增子功能")
                                    ])
                            ]);
                    },
                    children: []
                }
            ],
            buttonProps: {
                type: 'ghost',
                size: 'small',
            }
        }
    },
    methods: {
        /** 
         * 添加新功能
         */
        addAccess(){

        },
        /** 
         * 子部门渲染
         */
        renderContent(h, { root, node, data }) {
            return h('span', {
                style: {
                    display: 'inline-block',
                    width: '100%'
                }
            }, [
                    h('span', [
                        h('Icon', {
                            props: {
                                type: 'ios-paper-outline'
                            },
                            style: {
                                marginRight: '8px'
                            }
                        }),
                        h('span', data.name)
                    ]),
                    h('span', {
                        style: {
                            display: 'inline-block',
                            float: 'right',
                            marginRight: '32px'
                        }
                    }, [
                            h('Button', {
                                props: Object.assign({}, this.buttonProps, {
                                    icon: 'ios-plus-empty'
                                }),
                                style: {
                                    marginRight: '8px'
                                },
                                on: {
                                    click: () => { this.addFun(data) }
                                }
                            }, '新增子功能'),
                            h('Button', {
                                props: Object.assign({}, this.buttonProps, {
                                    icon: 'compose'
                                }),
                                style: {
                                    marginRight: '8px'
                                },
                                on: {
                                    click: () => { this.editFun(data) }
                                }
                            }, '编辑'),
                            h('Button', {
                                props: Object.assign({}, this.buttonProps, {
                                    icon: 'ios-minus-empty'
                                }),
                                on: {
                                    click: () => { this.delFun(data) }
                                }
                            }, "删除")
                        ])
                ]);
        },
        /** 
         * 编辑子部门
         */
        editFun(data) {
            /* 根据id拉取具体信息 */
        },
        /** 
         * 删除整个部门
         */
        delFun(data) {
            this.$Modal.confirm({
                title: "删除部门",
                content: "确定删除该功能模块以及所有子功能模块",
                okText: "删除",
                cancelText: "取消",
                onOk: () => {
                    /**具体的删除逻辑，删除之后重新拉取数据 */
                    let action = async () => {
                    }
                    action();
                }
            })
        },
        /** 
         * 每次执行增删操作后便重新拉取数据
         * 接口请求数据
         */
        treeInit() {
            API.Jurisdiction.listFun().then((res) => {
                
                this.depart[0].children = this.dataFormat(res.data);
            }).catch((err) => {

            });
        },
        /** 
         * 数据格式化
         */
        dataFormat(data) {
            for (let item of data) {
                item.expand = true;
                if (item.children) {
                    this.dataFormat(item.children);
                }
            }
            return data;
        }
    },
    mounted() {
        this.id = this.$route.query.access_id;
        this.treeInit();
    }
}
</script>



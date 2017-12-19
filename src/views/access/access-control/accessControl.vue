
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
        <Modal v-model="modal" :title="title">
            <Form ref="access" class="access_main_form" :model="access" :rules="validate.access" :label-width="90">
                <FormItem label="名称" prop="name">
                    <Input v-model="access.name" placeholder="请填写名称"></Input>
                </FormItem>
                <FormItem label="链接地址" prop="url">
                    <Input v-model="access.url" placeholder="请填写链接地址"></Input>
                </FormItem>
                <FormItem label="是否为菜单" prop="isMenu">
                    <Select v-model="access.isMenu" placeholder="请选择类型">
                        <Option value="0">菜单</Option>
                        <Option value="1">功能</Option>
                    </Select>
                </FormItem>
                <FormItem label="上级编号" prop="pid">
                    <Cascader v-model="access.pid" :data="cascardList" change-on-select></Cascader>
                </FormItem>
            </Form>
            <div slot="footer" class="sys-sysset_main_btnList">
                <Button type="primary" @click="addAccess">确认</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
import { API } from '../../../services'
export default {
    data() {
        return {
            access: {
                name: '', //功能名称
                url: '', //功能对应的URL
                isMenu: "",  //菜单为true,功能为false
                icon: 'fa-home',  //默认为fa-home
                menuPosStr: '',  //默认为空
                paixu: 0,   //排列顺序
                pid: []   //父ID

            },
            title: "新增功能",
            dataTree: [],
            modal: false,
            cascardList: [
                {
                    value: 0,
                    label: '认识医生',
                    children: [],
                }
            ],
            depart: [
                {
                    name: '认识医生',
                    expand: true,
                    id: 0,
                    url: '', //功能对应的URL
                    isMenu: "",  //菜单为true,功能为false
                    icon: 'fa-home',  //默认为fa-home
                    menuPosStr: '',  //默认为空
                    paixu: 0,   //排列顺序
                    pid: [],  //父ID
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
                                                click: () => {
                                                    this.addFun({
                                                        id: 0,
                                                        name: '', //功能名称
                                                        url: '', //功能对应的URL
                                                        isMenu: "0",  //菜单为true,功能为false
                                                        icon: 'fa-home',  //默认为fa-home
                                                        menuPosStr: '',  //默认为空
                                                        paixu: 0,   //排列顺序
                                                        pid: [0],  //父ID
                                                    })
                                                }
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
        addAccess() {
            this.$refs['access'].validate((valid) => {
                if (valid) {
                    let copyData=JSON.parse(JSON.stringify(this.access));
                    copyData.pid = copyData.pid[copyData.pid.length - 1];
                    copyData.isMenu = copyData.isMenu == 0 ? true : false;
                    if (this.title == "新增功能") {
                        copyData.id = null;
                    }
                    delete copyData["children"];
                    API.Jurisdiction.editFun(copyData).then((res) => {
                        this.$Message.success("编辑成功");
                        this.modal=false;
                        this.treeInit();
                    }).catch((error) => {

                    });
                } else {
                    this.$Message.error('补全信息!');
                }

            })

        },
        /** 
         * 子部门渲染
         */
        renderContent(h, { root, node, data }) {
            return h('span', {
                style: {
                    display: 'inline-block',
                    width: 'calc(100% - 30px)',
                    backgroundColor:' #f0f6fd'
                }
            }, [
                    h('span', {
                        style: {
                            border: "1px solid #efefef",
                            padding: "5px",
                            borderRadius: "3px",
                            fontSize: "12px"
                        }
                    }, [
                            h('Icon', {
                                props: {
                                    type: data.isMenu?'ios-paper-outline':'settings'
                                },
                                style: {
                                    marginRight: '8px'
                                }
                            }),
                            h('span', {
                            }, data.name +"---"+ "url地址" + " " + "[" + data.url + "]")
                        ]),
                    h('span', {
                        style: {
                            display: 'inline-block',
                            float: 'right',
                        }
                    }, [
                            h('Button', {
                                props: Object.assign({}, this.buttonProps, {
                                    icon: 'ios-plus-empty'
                                }),
                                style: {
                                    marginRight: '8px',
                                    backgroundColor: '#2d8cf0',
                                    borderColor: '#2d8cf0',
                                    color:'#fff'
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
                                    marginRight: '8px',
                                    backgroundColor: '#2d8cf0',
                                    borderColor: '#2d8cf0',
                                    color:'#fff'
                                },
                                on: {
                                    click: () => { this.editFun(data, 1) }
                                }
                            }, '编辑'),
                            h('Button', {
                                props: Object.assign({}, this.buttonProps, {
                                    icon: 'ios-minus-empty'
                                }),
                                style: {
                                    backgroundColor: '#ffad33',
                                    borderColor: '#ffad33',
                                    color:'#fff'
                                },
                                on: {
                                    click: () => { this.delFun(data) }
                                }
                            }, "删除")
                        ])
                ]);
        },
        /** 
         * 新增子功能
         */
        addFun(data) {
            this.editFun(data, 0);
        },
        /** 
         * 编辑子部门
         */
        editFun(data, type) {
            if (type == 0) {
                this.title = "新增功能"
            } else {
                this.title = "编辑功能";
            }
            this.modal = true;
            /* 根据id拉取具体信息 */
            if (data.id == 0) {
                this.access = data;
            } else {
                let copyData = JSON.parse(JSON.stringify(data));
                /** 
                 * 删除多余属性
                 */
              /*   delete copyData
                copyData */
                copyData.pid = this.lookFor(data, type);
                copyData.isMenu = copyData.isMenu ? "0" : "1";
                if (type == 0) {
                    copyData.name = "";
                    copyData.isMenu = "1";
                    copyData.url = "";
                }
                this.access = copyData;
            }

        },
        /** 
         * 层级回溯
         */
        lookFor(data, type) {
            let level = data.level - 0;
            /** 
             * 一级目录并且操作为编辑时，直接返回顶级目录id
             */
            if (level == 0 && type==1) {
                return [0];
            }
            let pidList = [data.pid];
            let idList = [];
            if (type == 0) {
                idList = [data.id];
            }
            for (let i = level; i > 0; i--) {
                for (let item of this.dataTree[i - 1]) {
                    if (item.id == pidList[pidList.length - 1]) {
                        idList.push(item.id);
                        pidList.push(item.pid);
                    }
                }
            }
            idList.push(0);
            return idList.reverse();
        },
        /** 
         * 删除整个部门
         */
        delFun(data) {
            this.$Modal.confirm({
                title: "删除功能",
                content: "确定删除该功能模块以及所有子功能模块",
                okText: "删除",
                cancelText: "取消",
                onOk: () => {
                    /**具体的删除逻辑，删除之后不重新拉取 */
                    API.Jurisdiction.delFun({
                        id:data.id
                    }).then((res)=>{
                        this.treeInit();
                    }).catch((err)=>{

                    })
                }
            })
        },
        /** 
         * 每次执行增删操作后便重新拉取数据
         * 接口请求数据
         */
        treeInit() {
            API.Jurisdiction.listFun().then((res) => {
                let copyData=this.dataFormat(res.data);
                this.depart[0].children = JSON.parse(JSON.stringify(copyData));
                this.cascardList[0].children = JSON.parse(JSON.stringify(copyData));
            }).catch((err) => {

            });
        },
        /** 
         * 数据格式化
         */
        dataFormat(data) {
            let arrList = [];
            /** 
             * 等级分组
             */
            for (let item of data) {
                item.expand = true;
                item.label = item.name;
                item.value = item.id;
                if (!arrList[item.level]) {
                    arrList[item.level] = [];
                }
                arrList[item.level].push(item);
            }
            this.dataTree = arrList;
            let appendChild = (child, parent) => {
                for (let item of child) {
                    for (const ite of parent) {
                        if (item.pid == ite.id) {
                            if (!ite.children) {
                                ite.children = [];
                            }
                            ite.children.push(item);
                        }
                    }
                }
            }

            for (let i = arrList.length - 1; i > 0; i--) {
                appendChild(arrList[i], arrList[i - 1]);
            }
            return arrList[0];
        }
    },
    mounted() {
        this.treeInit();
    }
}
</script>



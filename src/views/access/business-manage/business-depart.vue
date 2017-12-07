
<style lang="less">
.business {
    height: 100%;
    &_main {
        height: 100%;
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
            font-size: 14PX;
            >.ivu-icon {
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
                /* max-width: 500px; */
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
    <div class="business">
        <Row :gutter="10" class="business_main">
            <Col span="8">
            <Card class="business_main_tree">
                <h3 slot="title" class="business_main_title">
                    <Icon type="ios-copy-outline"></Icon>编辑企业部门结构
                </h3>
                <Tree :data="data5" :render="renderContent"></Tree>
            </Card>
            </Col>
            <Col span="8">
            <Card class="business_main_edit">
                <h3 slot="title" class="business_main_title">
                    <Icon type="ios-copy-outline"></Icon>下级部门编辑
                </h3>
                <Breadcrumb separator=">">
                    <BreadcrumbItem>认识医生</BreadcrumbItem>
                    <!-- 循环数据展示面包屑 -->
                    <BreadcrumbItem>业务部</BreadcrumbItem>
                </Breadcrumb>
                <ul class="business_main_list">
                    <li class="business_main_single" v-for="item in departList">
                        <h4>{{item.title}}</h4>
                        <!-- 存在删除尚未保存标签的可能，因此给一个默认id，在函数中具体判断 -->
                        <Button size="small" @click="deletDepart(item.id=-1)('formValidate')">删除</Button>
                    </li>
                </ul>
                <div class="business_main_btnList">
                    <Button type="primary" @click="addDepart()">新增</Button>
                    <!-- 获取父节点id，函数中判断新增和删除操作，分发后执行操作 -->
                    <Button type="info" @click="saveDepart()">保存</Button>
                </div>
            </Card>
            </Col>
            <Col span="8">
            <Card class="business_main_edit">
                <h3 slot="title" class="business_main_title">
                    <Icon type="ios-copy-outline"></Icon>部门职位编辑
                </h3>
                <Breadcrumb separator=">">
                    <BreadcrumbItem>认识医生</BreadcrumbItem>
                    <BreadcrumbItem>业务部</BreadcrumbItem>
                </Breadcrumb>
                <ul class="business_main_list">
                    <li class="business_main_single" v-for="item in positionList">
                        <h4>{{item.title}}</h4>
                        <Button size="small" @click="handleSubmit('formValidate')">删除</Button>
                    </li>
                </ul>
                <div class="business_main_btnList">
                    <Button type="primary" @click="addPosition()">新增</Button>
                    <!-- 获取父节点id，函数中判断新增和删除操作，分发后执行操作 -->
                    <Button type="info" @click="savePosition()">保存</Button>
                </div>
            </Card>
            </Col>
        </Row>

    </div>
</template>

<script>
export default {
    data() {
        return {
            topId: -1,//当前所选中的部门id
            /** 
             * 部门列表
             */
            departList: [
                {
                    title: '计税部',
                    expand: true
                },
                {
                    title: '统计部',
                    expand: true
                }
            ],
            /** 
             * 职位列表
             */
            positionList: [
                {
                    title: '计税部',
                    expand: true
                },
                {
                    title: '统计部',
                    expand: true
                }
            ],
            copyList: [

            ],
            data5: [
                {
                    title: '认识医生',
                    expand: true,
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
                                    h('span', data.title)
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
                                                width: '52px'
                                            },
                                            on: {
                                                click: () => { this.append(data) }
                                            }
                                        }, "编辑")
                                    ])
                            ]);
                    },
                    children: [
                        {
                            title: '财务部',
                            expand: true,
                            children: [
                                {
                                    title: '计税部',
                                    expand: true
                                },
                                {
                                    title: '统计部',
                                    expand: true
                                }
                            ]
                        },
                        {
                            title: '业务部',
                            expand: true,
                            children: [
                                {
                                    title: '商务部',
                                    expand: true
                                },
                                {
                                    title: '销售部',
                                    expand: true
                                }
                            ]
                        }
                    ]
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
                        h('span', data.title)
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
                                    icon: 'compose'
                                }),
                                style: {
                                    marginRight: '8px'
                                },
                                on: {
                                    click: () => { this.append(data) }
                                }
                            }, '编辑'),
                            h('Button', {
                                props: Object.assign({}, this.buttonProps, {
                                    icon: 'ios-minus-empty'
                                }),
                                on: {
                                    click: () => { this.remove(root, node, data) }
                                }
                            }, "删除")
                        ])
                ]);
        },
        /** 
         * 添加子部门
         */
        append(data) {
            const children = data.children || [];
            children.push({
                title: 'appended node',
                expand: true
            });
            this.$set(data, 'children', children);
        },
        /** 
         * 删除整个部门
         */
        remove(root, node, data) {
            this.$Modal.confirm({
                title: "删除部门",
                content: "确定删除该部门以及其所有下属部门",
                okText: "删除",
                cancelText: "取消",
                onOk: () => {
                    const parentKey = root.find(el => el === node).parent;
                    const parent = root.find(el => el.nodeKey === parentKey).node;
                    const index = parent.children.indexOf(data);
                    parent.children.splice(index, 1);
                }
            })
        },
        /** 
         * 统计新增的数据和删除的数据
         * type：分类 0：部门操作 1：职位操作
         */
        diffData(type){
            /* 首先判断id，凡是无id的均为新增数据 */
        },
        /** 
         * 每次执行增删操作后便重新拉取数据
         * 接口请求数据
         */
        treeInit(){

        }
    }
}
</script>



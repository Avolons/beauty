
<style lang="less">
.ivu-modal-confirm-footer {
    margin-top: 10px;
}

.access {
    height: 100%;
    &_main {
        height: 100%;
        .ivu-tree ul{
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
               .ivu-tree-children{
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
            <Modal v-model="modal" title="添加新功能" @on-ok="addDepart">
			<Form ref="formValidate" class="busadd_main_form" :model="formValidate" :rules="validate" :label-width="80">
				<FormItem label="类型" prop="type">
					<Select v-model="formValidate.type" placeholder="请选择类型">
						<Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
					</Select>
				</FormItem>
				<FormItem label="编码" prop="sequential">
					<Input v-model="formValidate.sequential" placeholder="请输入序号"></Input>
				</FormItem>
				<FormItem label="参数值" prop="desc">
					<Input v-model="formValidate.desc" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请填写备注"></Input>

				</FormItem>
				<FormItem label="备注" prop="desc">
					<Input v-model="formValidate.desc" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请填写备注"></Input>

				</FormItem>
			</Form>
		</Modal>
    </div>
</template>

<script>
import { API } from '../../../services'
export default {
    data() {
        return {
            /** 
             * 
             */
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
                                    icon: 'compose'
                                }),
                                style: {
                                    marginRight: '8px'
                                },
                                on: {
                                    click: () => { this.editDepart(data) }
                                }
                            }, '新增子功能'),
                            h('Button', {
                                props: Object.assign({}, this.buttonProps, {
                                    icon: 'ios-minus-empty'
                                }),
                                on: {
                                    click: () => { this.remove(data) }
                                }
                            }, "删除")
                        ])
                ]);
        },
        /** 
         * 编辑子部门
         */
        editDepart(data) {
            /* 根据id拉取具体信息 */
        },
        /** 
         * 删除整个部门
         */
        remove(data) {
            this.$Modal.confirm({
                title: "删除部门",
                content: "确定删除该功能模块以及所有子功能模块",
                okText: "删除",
                cancelText: "取消",
                onOk: () => {
                    /**具体的删除逻辑，删除之后重新拉取数据 */
                    let action = async () => {
                        await this.removeDepart([data.id]);
                        await this.treeInit();
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
            API.Jurisdiction.infoDepart({
                orId: this.id,
            }).then((res) => {
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



<style lang="less">
	/*.sys-depart {*/
	/*&_main {*/
	/*&_add {*/
	/*margin-bottom: 10px;*/
	/*}*/
	/*&_list {}*/
	/*&_search {*/
	/*box-sizing: border-box;*/
	/*margin-bottom: 10px;*/
	/*.ivu-col {*/
	/*display: flex;*/
	/*>span {*/
	/*background-color: #dadada;*/
	/*text-align: center;*/
	/*line-height: 32px;*/
	/*display: block;*/
	/*width: 80px;*/
	/*flex-shrink: 0;*/
	/*border-top-left-radius: 4px;*/
	/*border-bottom-left-radius: 4px;*/
	/*}*/
	/*.ivu-input {*/
	/*border-top-left-radius: 0;*/
	/*border-bottom-left-radius: 0;*/
	/*}*/
	/*.ivu-select {*/
	/*flex-grow: 1;*/
	/*flex-shrink: 1;*/
	/*}*/
	/*.ivu-select-selection {*/
	/*border-top-left-radius: 0;*/
	/*border-bottom-left-radius: 0;*/
	/*}*/
	/*}*/
	/*}*/
	/*&_page {*/
	/*margin-top: 10px;*/
	/*}*/
	/*}*/
	/*}*/


	.wrap-department{
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


	}
</style>


<template>
	<div class="wrap-department">
		<Card class="access_main_tree">
			<h3 slot="title" class="access_main_title">
				<Icon type="ios-copy-outline"></Icon>编辑功能权限
			</h3>
			<Tree :data="depart" :render="renderContent" ></Tree>
		</Card>

		<Modal v-model="modal" :title="title">
			<Form ref="formData" class="sys-depart_main_form" :model="formData" :rules="validate.depart" :label-width="80">
				<FormItem label="科室名称" prop="name">
					<Input v-model="formData.name" placeholder="请输入科室名称"></Input>
				</FormItem>
				<FormItem label="排序" prop="paixu">
					<Input v-model="formData.paixu" placeholder="请输入序号"></Input>
				</FormItem>
				<FormItem label="类型" prop="types">
					<Select v-model="formData.types" placeholder="请选择类型">
						<Option value=0>门诊</Option>
						<Option value=1>住院</Option>
					</Select>
				</FormItem>
				<FormItem label="方案匹配" prop="mType">
					<Select v-model="formData.mType" placeholder="请选择方案">
						<Option value=0>疾病</Option>
						<Option value=1>医生</Option>
					</Select>
				</FormItem>
				<FormItem label="状态" prop="state">
					<Select v-model="formData.state" placeholder="请选择状态">
						<Option value=0>正常</Option>
						<Option value=1>禁用</Option>
					</Select>
				</FormItem>
				<FormItem label="备注" prop="remark">
					<Input v-model="formData.remark" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请填写备注"></Input>
				</FormItem>
			</Form>
			<div slot="footer" class="sys-depart_main_btnList">
				<Button type="primary" @click="submitDepart">确认</Button>
			</div>
		</Modal>

		<Modal v-model="modalexit" title="编辑科室">
			<Form ref="currentData" class="sys-depart_main_form" :model="currentData" :rules="validate.depart" :label-width="80">
				<FormItem label="科室名称" prop="name">
					<Input v-model="currentData.name" placeholder="请输入科室名称"></Input>
				</FormItem>
				<FormItem label="排序" prop="paixu">
					<Input v-model="currentData.paixu" placeholder="请输入序号"></Input>
				</FormItem>
				<FormItem label="类型" prop="type">
					<Select v-model="currentData.type" placeholder="请选择类型">
						<Option value=0 >门诊</Option>
						<Option value=1 >住院</Option>
					</Select>
				</FormItem>
				<FormItem label="方案匹配" prop="matchType">
					<Select v-model="currentData.matchType" placeholder="请选择方案">
						<Option value=0 >疾病</Option>
						<Option value=1 >医生</Option>
					</Select>
				</FormItem>
				<FormItem label="状态" prop="isUse">
					<Select v-model="currentData.isUse" placeholder="请选择状态">
						<Option value=0 >正常</Option>
						<Option value=1 >禁用</Option>
					</Select>
				</FormItem>
				<FormItem label="备注" prop="remark">
					<Input v-model="currentData.remark" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请填写备注"></Input>
				</FormItem>
			</Form>
			<div slot="footer" class="sys-depart_main_btnList">
				<Button type="primary" @click="changeDepart">确认</Button>
			</div>
		</Modal>
	</div>
</template>

<script>
    import { API } from '@/services/index.js';
    export default {
        data() {
            return {
                createLoading:true,		//loading 动画加载中
                //搜索参数
                searchParam: {
                    dpname: "",
                    iUse: null,
                    types: null,
                    mType: null,
                },
                depart: [
                    {
                        title: '科室设置',
                        expand: true,
                        isMenu: "",  //菜单为true,功能为false
                        icon: 'fa-home',  //默认为fa-homes
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
                                            width: '100px'
                                        },
                                        on: {
                                            click: () => {
                                                this.modal = true;
                                                this.formData.parentId = 0;  //当点击添加平级科室时parentId =0;
                                            }
                                        }
                                    },'新增子科室')
                                ])
                            ]);
                        },
                        children: [

                        ]
                    }
                ],
                buttonProps: {
                    type: 'ghost',
                    size: 'small',
                },
                actionList: [{
                    value: "",
                    label: "全部"
                }, {
                    value: 0,
                    label: "疾病"
                }, {
                    value: 1,
                    label: "医生"
                },],//随访方案列表
                typeList: [{
                    value: "",
                    label: "全部"
                }, {
                    value: 0,
                    label: "门诊"
                }, {
                    value: 1,
                    label: "住院"
                },],//随访类型
                statusList: [{
                    value: "",
                    label: "全部"
                }, {
                    value: 0,
                    label: "正常"
                }, {
                    value: 1,
                    label: "禁用"
                },],//状态选项列表
                formData: {
                    name: "",
                    paixu: "0",
                    types: "0",
                    mType: "0",
                    state: "0",
                    remark: "",//备注
                },
                currentData:{
                },
                //模态窗title
                title: "新增科室",
                modal: false,
                modalexit:false,
            }
        },
        methods: {
            /**
             * 添加新科室第一步
             */
            addData() {
                this.modal = true;
                this.formData.name = '';//新增时清空名称
            },
            /**
             * 数据格式化
             */
            dataFormat(data) {
                console.log(data)
                let arrList = [];
                /**
                 * 等级分组
                 */
                for (let item of data) {
                    item.expand = true;
                    if (!arrList[item.level]) {
                        arrList[item.level] = [];
                    }
                    arrList[item.level].push(item);
                }
                let appendChild = (child, parent) => {
                    for (let item of child) {
                        for (const ite of parent) {
                            if (item.parentId == ite.id) {
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
                return arrList[0]
            },
            /**
             * 获取所有数据
             */
            getData() {
                API.Systems.listDepart(this.searchParam).then((res) => {
                    let copyData =this.dataFormat(res.data);
                    this.depart[0].children = JSON.parse(JSON.stringify(copyData));
                }).catch((err) => {

                });
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
                                type: 'ios-paper-outline'
                            },
                            style: {
                                marginRight: '8px'
                            }
                        }),
                        h('span', {
                        }, data.name )
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
                                click: () => {
                                    console.log(data)
                                    this.addData()
                                    this.formData.parentId = data.id;
//                                this.submitDepart()

                                }
                            }
                        }, '新增子科室'),
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
                                click: () => {
//                                this.modalexit = true;
                                    this.editDepart(data)

                                }
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
                                click: () => {
                                    this.delDepart(data.id)
                                }
                            }
                        }, "删除")
                    ])
                ]);
            },
            /**
             * 重置所有属性
             */
            handleReset(name) {
                this.$refs[name].resetFields();
            },
            /**
             * 删除科室
             */
            delDepart(id) {
                let self = this;
                this.$Modal.confirm({
                    title: '删除设置',
                    content: '确定删除该系统设置？',
                    onOk: () => {
                        API.Systems.delDepart({
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
             * 编辑科室
             */
            editDepart(data) {
                this.modalexit = true;
                this.currentData = JSON.parse(JSON.stringify(data));
                this.currentData.isUse=this.currentData.isUse?"0":"1";
                this.currentData.matchType=this.currentData.matchType+"";
                this.currentData.paixu = this.currentData.paixu+""
                this.currentData.type=this.currentData.type+"";
            },
            /**
             * 提交添加
             */
            submitDepart() {
                this.$refs['formData'].validate((valid) => {
                    if (valid) {
                        API.Systems.addDepart(this.formData).then((res) => {
                            this.$Message.success("添加成功");
                            this.modal = false;
                            this.getData();
                            this.formData = {
                                name: "",
                                paixu: "0",
                                types: "0",
                                mType: "0",
                                state: "0",
                                remark: "",//备注
                            }
                        }).catch((err) => {

                        });
                    } else {
                        this.$Message.error('补全信息!');
                    }
                })
            },
            /**
             * 提交修改
             */
            changeDepart(){
                this.$refs['currentData'].validate((valid) => {
                    if (valid) {
                        API.Systems.editDepart({
                            id: this.currentData.id,
                            name:this.currentData.name,
                            paixu:this.currentData.paixu-0,
                            types:this.currentData.type-0,
                            mType:this.currentData.matchType-0,
                            state:this.currentData.isUse-0,
                            remark:this.currentData.remark
                        }).then((res) => {
//            			this.createLoading = true;
                            this.$Message.success("修改成功");
                            this.modalexit = false;
                            this.getData();
                        }).catch((err) => {
                        });
                    } else {
                        this.$Message.error('补全信息!');
                    }
                })
            },
        }, mounted() {
            this.getData();
        }
    }
</script>


<style lang="less">
.sys-dis {
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
        <div class="sys-dis_main">
            <Row class="sys-dis_main_search" :gutter="15">
                <Col span="6">
                <span>
                    疾病名称：
                </span>
                <Input v-model="value1"  placeholder="large size"></Input>
                </Col>
				<Col span="6">
                <span>
                    助记码：
                </span>
                <Input v-model="value1"  placeholder="large size"></Input>
                </Col>
				<Col span="6">
                <span>
                    ICD编码：
                </span>
                <Input v-model="value1"  placeholder="large size"></Input>
                </Col>
                <Col span="6">
					<Button @click="searchuser" type="primary" style="margin-left:15px">查询</Button>
					<Button @click="modal=true" type="info" style="margin-left:15px">新增</Button>
                </Col>
            </Row>
            <div class="sys-dis_main_list">
                <Table border :columns="columns7" :data="data6"></Table>
            </div>
            <Row class="sys-dis_main_page">
            <Page :total="100" :current="1" show-elevator style="float:right" @on-change="changePage"></Page>
            </Row>
        </div>
        <Modal v-model="modal" title="添加疾病" @on-ok="addDis">
			<Form ref="formValidate" class="busadd_main_form" :model="formValidate" :rules="ruleValidate" :label-width="80">
				<FormItem label="名称" prop="name">
					<Input v-model="formValidate.name" placeholder="请输入名称"></Input>
				</FormItem>
				<FormItem label="助记码" prop="sequential">
					<Input v-model="formValidate.sequential" placeholder="请输入助记码"></Input>
				</FormItem>
				<FormItem label="ICD编码" prop="type">
                    <Input v-model="formValidate.type" placeholder="请输入ICD编码"></Input>
				</FormItem>
				<FormItem label="状态" prop="status">
					<Select v-model="formValidate.status" placeholder="请选择状态">
						<Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
					</Select>
				</FormItem>
				<FormItem label="备注" prop="desc">
					<Input v-model="formValidate.desc" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请填写备注"></Input>
				</FormItem>
			</Form>
		</Modal>
    </div>
</template>

<script>
export default {
    data() {
        return {
            formValidate: {
				name: "",
				sequential: "",
				type: "",
				action: "",
				status: "",
				desc: "",//备注
			},
			/* 验证规则 */
			ruleValidate: {
				name: [
					{ required: true, message: '请输入科室名称', trigger: 'blur' }
				],
				sequential: [
					{ required: true, message: '请输入序号', trigger: 'blur' }
				],
				type: [
					{ required: true, message: '请选择类型', trigger: 'change' }
				],
				action: [
					{ required: true, message: '请选择匹配方案', trigger: 'change' }
				],
				status: [
					{ required: true, message: '请选择状态', trigger: 'change' }
				],
				desc: [
					{ type: 'string', min: 10, message: '请至少输入10字以上的备注', trigger: 'blur' }
				]
			},
			modal: false,
            value1: "",
             cityList: [
                    {
                        value: 'New York',
                        label: 'New York'
                    },
                    {
                        value: 'London',
                        label: 'London'
                    },
                    {
                        value: 'Sydney',
                        label: 'Sydney'
                    },
                    {
                        value: 'Ottawa',
                        label: 'Ottawa'
                    },
                    {
                        value: 'Paris',
                        label: 'Paris'
                    },
                    {
                        value: 'Canberra',
                        label: 'Canberra'
                    }
                ],
                model1: '',
            columns7: [
                {
                    title: '助记码',
                    key: 'role',
                },
                {
                    title: 'ICD编码',
                    key: 'username'
                },
                {
                    title: '名称',
                    key: 'time'
                },
                {
                    title: '默认方案',
                    key: 'name',
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
                                on: {
                                    click: () => {
                                        this.show(params.index)
                                    }
                                }
							}, '编辑'),
							h('Button', {
                                props: {
                                    type: 'info',
                                    size: 'small'
                                },
                                style: {
                                    marginRight: '5px'
                                },
                                on: {
                                    click: () => {
                                        this.show(params.index)
                                    }
                                }
                            }, '默认方案'),
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
                                        this.remove(params.index)
                                    }
                                }
                            }, '删除'),
                        ]);
                    }
                }
            ],
            data6: [
                {
                    role:"医生",
                    username:"1245786",
                    time:"2017-11-30 11:08:30",
                    action:"随访测试",
                    name:"测试",
                },
                {
                    role:"医生",
                    username:"1245786",
                    time:"2017-11-30 11:08:30",
                    action:"随访测试",
                    name:"测试",
                },
                {
                    role:"医生",
                    username:"1245786",
                    time:"2017-11-30 11:08:30",
                    action:"随访测试",
                    name:"测试",
                },
                {
                    role:"医生",
                    username:"1245786",
                    time:"2017-11-30 11:08:30",
                    action:"随访测试",
                    name:"测试",
                }
            ]
        }
    },
    methods: {
        /** 
         * 重置所有属性
         */
		handleReset(name) {
			this.$refs[name].resetFields();
		},
        show(index) {
            this.$Modal.info({
                title: 'User Info',
                content: `Name：${this.data6[index].name}<br>Age：${this.data6[index].age}<br>Address：${this.data6[index].address}`
            })
        },
        /** 
		 * 添加新部门
		 */
		addDis(){

		},
        remove(index) {
            this.data6.splice(index, 1);
        },
        adduser(){
            this.$router.push('/access/user/sys-dis_add/0');
        },
        changePage(){

        },
        searchuser(){
            
        }
    }
}
</script>


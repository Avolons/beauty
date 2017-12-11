<style lang="less">
.creatNotice {
	height: 100%;
	background-color: #fff;
	padding: 15px;
	box-sizing: border-box;
	border-radius: 5px;
	padding-top: 25px;
	&_main {
		&_add {
			margin-bottom: 10px;
		}
		&_list {}
		&_search {
			box-sizing: border-box;
			margin-bottom: 15px;
			.ivu-col {
				display: flex;
				>span {
					background-color: #dadada;
					text-align: center;
					line-height: 32px;
					display: block;
					width: 80px;
					flex-shrink: 0;
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
		&_step {
			background-color: #fff;
			margin-bottom: 40px;
		}
		&_table{
			.ivu-tabs-nav-scroll{
				display: none;
			}
			.ivu-tabs-bar{
				display: none;
			}
		}
		&_page {
			margin-top: 10px;
		}
	}
}
</style>


<template>
	<div class="creatNotice">
		<div class="creatNotice_main">
			<div class="creatNotice_main_step">
				<Steps :current="0">
					<Step title="选择用户" ></Step>
					<Step title="选择方案" ></Step>
					<Step title="发起通知" ></Step>
				</Steps>
			</div>
			<Tabs v-model="step" class="creatNotice_main_table">
				<TabPane label="标签一" name="step_one">
					<Row class="creatNotice_main_search" :gutter="15">
						<Col span="6">
						<span>
							科室名称：
						</span>
						<Input v-model="value1" placeholder="large size"></Input>
						</Col>
						<Col span="6">
						<span>
							医生：
						</span>
						<Select v-model="model1" style="width:200px">
							<Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
						</Select>
						</Col>
						<Col span="6">
						<span>
							患者姓名：
						</span>
						<Select v-model="model1" style="width:200px">
							<Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
						</Select>
						</Col>
						<Col span="6">
						<span>
							疾病类型：
						</span>
						<Select v-model="model1" style="width:200px">
							<Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
						</Select>
						</Col>
					</Row>
					<div class="creatNotice_main_add">
						<Button @click="searchuser"  type="primary">查询</Button>
						 <Badge count="100">
							 <Button @click="searchuser"  type="info">已添加患者</Button>
						</Badge>
					</div>
					<div class="creatNotice_main_list">
						<Table border :columns="columns7" :data="data6"></Table>
					</div>
					<Row class="creatNotice_main_page">
						<Button @click="handleSelectAll(true)">全选</Button>
						<Button @click="handleSelectAll(false)">取消</Button>
						<Button @click="handleSelectAll(false)" type="primary">添加</Button>
						<Page :total="100" :current="1" show-elevator style="float:right" @on-change="changePage"></Page>
					</Row>
				</TabPane>
				<TabPane label="标签二" name="step_two">

				</TabPane>
				<TabPane label="标签三" name="step_three">

				</TabPane>
			</Tabs>

		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			step: "step_one",
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
					type: 'selection',
                    width: 60,
					align: 'center'
                },
                {
                    title: '姓名',
                    key: 'username'
                },
                {
                    title: '性别',
                    key: 'time'
                },
				{
                    title: '上次就诊时间',
                    key: 'time'
                },
				{
                    title: '单位名称',
                    key: 'time'
                },
				{
                    title: '民族',
                    key: 'time'
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
							}, '添加'),
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
                    mobile:14578884125,
                    look:1,
                },
                {
                    role:"医生",
                    username:"1245786",
                    time:"2017-11-30 11:08:30",
                    action:"随访测试",
                    name:"测试",
                    mobile:14578884125,
                    look:1,
                },
                {
                    role:"医生",
                    username:"1245786",
                    time:"2017-11-30 11:08:30",
                    action:"随访测试",
                    name:"测试",
                    mobile:14578884125,
                    look:1,
                },
                {
                    role:"医生",
                    username:"1245786",
                    time:"2017-11-30 11:08:30",
                    action:"随访测试",
                    name:"测试",
                    mobile:14578884125,
                    look:1,
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
		handleSelectAll (status) {
                this.$refs.selection.selectAll(status);
            },
		/** 
		 * 添加新部门
		 */
		addDepart() {

		},
		show(index) {
			this.$Modal.info({
				title: 'User Info',
				content: `Name：${this.data6[index].name}<br>Age：${this.data6[index].age}<br>Address：${this.data6[index].address}`
			})
		},
		remove(index) {
			this.data6.splice(index, 1);
		},
		changePage() {

		},
		searchuser() {

		}
	}
}
</script>


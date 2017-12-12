<style lang="less">
.patientSearch {
	background: #fff;
	form {
		.ivu-form-item {
			margin-bottom: 0;
			padding: 20px 0;
			width: 240px;
			.ivu-form-item-label:before {
				content: ''
			}
		}
	}
	.patientList {
		padding: 10px;
	}
	.pages {
		.ivu-page {
			float: right;
			padding: 10px 20px 10px 0;
		}
	}
} //模态框垂直居中
.vertical-center-modal {
	display: flex;
	align-items: center;
	justify-content: center;

	.ivu-modal {
		top: 0;
	}
} //详情
.patientInfo .ivu-modal .ivu-modal-content {
	.ivu-modal-header {
		.ivu-modal-header-inner,
		.ivu-modal-header p {
			font-size: 16px;
			color: #1c2432;
			font-weight: normal;
		}
	}
	.ivu-modal-footer {
		display: none;
	}
}

.infoRow {
	.infoCol12 {
		height: 65px;
		padding: 0px 20px!important;
		.info {
			width: 442px;
			height: 65px;
			border: 1px solid #DCEBF7;
			.info-row {
				.info1 {
					width: 110px;
					height: 32px;
					float: left;
					line-height: 32px;
					color: #336199;
					background-color: #EDF3F4;
					text-align: right;
					padding-right: 10px;
				}
				.info2 {
					width: 330px;
					height: 32px;
					float: left;
					line-height: 32px;
					padding-left: 15px;
				}
			}
		}
	}
	.infoCol24 {
		background: #f9f9f9;
		padding: 15px;
		.infoRow2 {
			.sfCol4 {
				.counts {
					width: 80px;
					height: 80px;
					color: #fff;
					border-radius: 10px;
					line-height: 1.5;
					background: #2a8bcb;
					padding-top: 10px;
					text-align: center;
					.suifang {
						font-size: 28px;
					}
					.sfCounts {
						font-size: 14px;
					}
				}
			}
			.sfCol20 {
				h3 {
					padding: 20px 0 10px 0;
					font-size: 24px;
					font-weight: normal;
					line-height: 24px;
				}
				.sfTime {
					span {
						color: #FF892A;
					}
				}
			}
		}
	}
} //编辑
.editInfo .ivu-modal .ivu-modal-content {
	.ivu-modal-header {
		.ivu-modal-header-inner,
		.ivu-modal-header p {
			font-size: 16px;
			color: #1c2432;
			font-weight: normal;
		}
	}
	.ivu-modal-body {
		padding: 32px 132px;
	}
	.ivu-modal-footer {
		display: none;
	}
}

.bb1 {
	border-bottom: 1px solid #fff;
}

.bdx1 {
	border-bottom: 1px dotted #EDF3F4;
}

.mb12 {
	margin-bottom: 12px;
}
</style>
<template>
	<Row class="patientSearch">
		<!-- 搜索栏 -->
		<Col span="24" class="patientSearch">
		<Form ref="formInline" :model="formInline" :rules="ruleInline" :label-width="80" inline>
			<FormItem label="病人编号">
				<Input type="text" v-model="formInline.user" placeholder="Username"></Input>
			</FormItem>
			<FormItem label="姓名">
				<Input type="text" v-model="formInline.user" placeholder="Username"></Input>
			</FormItem>
			<FormItem label="就诊信息">
				<Select v-model="formInline.select">
					<Option value="beijing">New York</Option>
					<Option value="shanghai">London</Option>
					<Option value="shenzhen">Sydney</Option>
				</Select>
			</FormItem>
			<FormItem label="疾病类型">
				<Input type="text" v-model="formInline.user" placeholder="Username"></Input>
			</FormItem>
			<FormItem>
				<Button type="primary" @click="handleSubmit('formInline')">查询</Button>
			</FormItem>
		</Form>
		</Col>
		<!-- 表格 -->
		<Col span="24" class="patientList">
		<Table border :columns="columns7" :data="data6"></Table>
		</Col>
		<!-- 分页 -->
		<Col span="24" class="pages">
		<Page :total="100" show-elevator show-total></Page>
		</Col>
		<!-- 详情模态框 -->
		<Modal v-model="patientDetail" title="患者信息" class-name="patientInfo" @on-ok="ok" @on-cancel="cancel" :styles="{top: '180px'}" width="1000">
			<Row class="infoRow">
				<Col span="12" class="infoCol12 mb12">
				<div class="info">
					<div class="info-row">
						<div class="info1 bb1">姓名</div>
						<div class="info2 bdx1">薛卫国</div>
					</div>
					<div class="info-row">
						<div class="info1">性别</div>
						<div class="info2">男</div>
					</div>
				</div>
				</Col>
				<Col span="12" class="infoCol12 mb12">
				<div class="info">
					<div class="info-row">
						<div class="info1 bb1">电话</div>
						<div class="info2 bdx1">15225099945</div>
					</div>
					<div class="info-row">
						<div class="info1">地址</div>
						<div class="info2">杭州市下城区</div>
					</div>
				</div>
				</Col>
				<Col span="12" class="infoCol12 mb12">
				<div class="info">
					<div class="info-row">
						<div class="info1 bb1">年龄</div>
						<div class="info2 bdx1">52</div>
					</div>
					<div class="info-row">
						<div class="info1">民族</div>
						<div class="info2">维吾尔族</div>
					</div>
				</div>
				</Col>
				<Col span="24" class="infoCol24">
				<Row class="infoRow2">
					<Col span="4" class="sfCol4">
					<div class="counts">
						<p class="suifang">随访</p>
						<p class="sfCounts">69天</p>
					</div>
					</Col>
					<Col span="20" class="sfCol20">
					<h3 class="sfName">薛卫国</h3>
					<p class="sfTime mb12">
						<span>2017年09月28日18点05分</span>随访</p>
					<Row>
						<Col span="12">
						<p>是否知道全科医生签约服务:
							<span>是</span>
						</p>
						<p>对他(她)的服务是否满意:
							<span>是</span>
						</p>
						<p>医生意见:
							<span>是</span>
						</p>
						</Col>
						<Col span="12">
						<p>是否知道自己的签约医生:
							<span>是</span>
						</p>
						<p>是否经常在我中心就诊:
							<span>不太来</span>
						</p>
						</Col>
					</Row>
					</Col>
				</Row>
				</Col>
			</Row>
		</Modal>
		<!-- 编辑功能模态框 -->
		<Modal v-model="patientText" title="编辑患者信息" class-name="editInfo" @on-ok="ok" @on-cancel="cancel" :styles="{top: '180px'}" width="800">
			<Form ref="formCustom" :model="formCustom" :rules="editRules" :label-width="80">
				<FormItem label="姓名" prop="ptNa">
					<span v-model="formCustom.ptNa">{{formCustom.ptNa}}</span>
				</FormItem>
				<FormItem label="电话" prop="ptPhone">
					<Input v-model="formCustom.ptPhone" placeholder="请输入电话号码"></Input>
				</FormItem>
				<FormItem label="住址" prop="ptAdd">
					<Input type="text" v-model="formCustom.ptAdd" placeholder="请输入住址"></Input>
				</FormItem>
				<FormItem label="邮编" prop="ptYb">
					<Input type="text" v-model="formCustom.ptYb" placeholder="请输入邮编"></Input>
				</FormItem>
				<FormItem label="联系人姓名" prop="ptName">
					<Input type="text" v-model="formCustom.ptName" placeholder="请输入联系人姓名"></Input>
				</FormItem>
				<FormItem label="联系人关系" prop="ptRe">
					<Input type="text" v-model="formCustom.ptRe" placeholder="请输入联系人关系"></Input>
				</FormItem>
				<FormItem label="联系地址" prop="ptDz">
					<Input type="text" v-model="formCustom.ptDz" placeholder="请输入联系人地址"></Input>
				</FormItem>
				<FormItem label="联系电话" prop="ptDh">
					<Input type="text" v-model="formCustom.ptDh" placeholder="请输入联系人电话号码"></Input>
				</FormItem>
				<FormItem label="单位名称" prop="ptDe">
					<Input type="text" v-model="formCustom.ptDe" placeholder="请输入单位名称"></Input>
				</FormItem>
				<FormItem>
					<Button type="primary" style="margin-left: 110px;" @click="handleEdit('formCustom')">提交</Button>
					<Button type="ghost" style="margin-left: 8px">重置</Button>
				</FormItem>
			</Form>
		</Modal>
	</Row>
</template>

<script>
export default {
	data() {
		return {
			formInline: {//搜索框
				user: '',
				password: '',
				select: '',
			},
			ruleInline: {//搜索框校验
				user: [
					{ required: true, message: 'Please fill in the user name', trigger: 'blur' }
				],
				password: [
					{ required: true, message: 'Please fill in the password.', trigger: 'blur' },
					{ type: 'string', min: 6, message: 'The password length cannot be less than 6 bits', trigger: 'blur' }
				]
			},
			columns7: [//表格栏
				{
					title: 'Name',
					key: 'name',
					render: (h, params) => {
						return h('div', [
							h('Icon', {
								props: {
									type: 'person'
								}
							}),
							h('strong', params.row.name)
						]);
					}
				},
				{
					title: 'Age',
					key: 'age'
				},
				{
					title: 'Age',
					key: 'age'
				},
				{
					title: 'Age',
					key: 'age'
				},
				{
					title: 'Age',
					key: 'age'
				},
				{
					title: 'Age',
					key: 'age'
				},
				{
					title: 'Age',
					key: 'age'
				},
				{
					title: 'Age',
					key: 'age'
				},
				{
					title: 'Age',
					key: 'age'
				},
				{
					title: 'Address',
					key: 'address'
				},
				{
					title: 'Action',
					key: 'action',
					width: 250,
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
										this.patientDetail = true
									}
								}
							}, '详情'),
							h('Button', {
								props: {
									type: 'success',
									size: 'small'
								},
								style: {
									marginRight: '5px'
								},
								on: {
									click: () => {
										this.patientText = true
										console.log('99')
									}
								}
							}, '编辑'),
							h('Button', {
								props: {
									type: 'warning',
									size: 'small'
								},
								style: {

								},
								on: {
									click: () => {
										this.remove(params.index)
									}
								}
							}, '增加随访')
						]);
					}
				}],
			data6: [//表格data
				{
					name: 'John Brown',
					age: 18,
					address: 'New York No. 1 Lake Park'
				},
				{
					name: 'Jim Green',
					age: 24,
					address: 'London No. 1 Lake Park'
				},
				{
					name: 'Joe Black',
					age: 30,
					address: 'Sydney No. 1 Lake Park'
				},
				{
					name: 'Jon Snow',
					age: 26,
					address: 'Ottawa No. 2 Lake Park'
				}
			],
			patientDetail: false,//详情模态框
			patientText: false,//编辑模态框
			formCustom: {//编辑表格data
				ptNa: '薛卫国',
				ptPhone: '',
				ptAdd: '',
				ptYb: '',
				ptName: '',
				ptRe: '',
				ptDz: '',
				ptDh: '',
				ptDe: ''
			},
			editRules: {
				// ptPhone: [
				//      { required: true, message: '请填写联系电话', trigger: 'blur' },
				//      { type: 'number', message: 'The password length cannot be less than 6 bits', trigger: 'blur' }
				//    ],
			}
		}
	},
	methods: {
		//搜索栏提交按钮
		handleSubmit(name) {
			this.$refs[name].validate((valid) => {
				if (valid) {
					this.$Message.success('Success!');
				} else {
					this.$Message.error('Fail!');
				}
			})
		},
		//详情模态框
		show(index) {
			this.$Modal.info({
				title: 'User Info',
				content: `Name：${this.data6[index].name}<br>Age：${this.data6[index].age}<br>Address：${this.data6[index].address}`
			})
		},
		remove(index) {
			this.data6.splice(index, 1);
		},
		//详情关闭确认点击事件
		ok() {
			this.$Message.info('Clicked ok');
		},
		cancel() {
			this.$Message.info('Clicked cancel');
		},
		//编辑模态框提交按钮
		handleEdit(name) {
			this.$refs[name].validate((valid) => {
				if (valid) {
					this.$Message.success('Success!');
				} else {
					this.$Message.error('Fail!');
				}
			})
		},
	}
}
</script>


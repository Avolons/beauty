<template>
	<Row>
		<!-- 搜索栏 -->
		<Col span="24" class="followResult">
		<Row class="inter-down_main_search" :gutter="15">
			<Col span="6">
			<span>
				随访编号
			</span>
			<Input type="text" v-model="searchParams.orderNo" placeholder="请输入随访编号"></Input>
			</Col>
			<Col span="6">
			<span>
				患者姓名
			</span>
			<Input type="text" v-model="searchParams.brxm" placeholder="请输入患者姓名"></Input>
			</Col>
			<Col span="6">
			<span>
				随访状态
			</span>
			<Select v-model="searchParams.status">
				<Option v-for="item in statusList" :value="item.id" :key="item.id">{{item.name}}</Option>
			</Select>
			</Col>
			<Col span="6">
			<span>
				随访方案
			</span>
			<Input type="text" v-model="searchParams.schemeName" placeholder="请输入随访方案"></Input>
			</Col>
			<Col span="6" style="margin-top:10px">
			<Button @click="searchParams.pager=1;getData()" type="primary">查询</Button>
			</Col>
		</Row>
		</Col>
		<!-- 表格 -->
		<Col span="24" class="fpTable">
		<Table border :columns="config" :data="dataList" class="margin-bottom-10" :loading="createLoading"></Table>
		<Row>
			<Page style="float:right" :current="searchParams.pager" :total="totalPage" @on-change="changePage" show-elevator show-total></Page>
		</Row>
		</Col>
		<!-- 随访模态框 -->
		<Modal v-model="follInfo" title="随访详情" width="950" class-name="patientInfo" :styles="{top: '180px'}">
			<Collapse>
				<Panel name="1">
					随访结果
					<div slot="content" class="followResult_table">
						<table border="1">
							<tr>
								<td>患者姓名</td>
								<td>{{planInfo.brxm}}</td>
								<td>采用随访方案</td>
								<td>{{planInfo.schemeName}}</td>
							</tr>
							<tr>
								<td>随访状态</td>
								<td>{{planInfo.statusStr}}</td>
								<td>呼叫状态</td>
								<td>{{planInfo.remark}}</td>
							</tr>
							<tr>
								<td>完成时间</td>
								<td>{{planInfo.dateEnd}}</td>
								<td>被叫号码</td>
								<td>{{planInfo.mobile}}</td>
							</tr>
							<tr>
								<td>审核意见</td>
								<td colspan=3>{{planInfo.vetRemark}}</td>
							</tr>
							<tr>
								<td>随访结果</td>
								<td colspan=3>
									<template v-if="item.fieldName&&item.fieldValue" v-for="item in planInfo.orderReplyQuestions">
										<span style="display:block">{{item.fieldName}}:
											<b :class="{'redColor':!item.isNormal}">{{item.fieldValue}}</b>
										</span>
									</template>
								</td>
							</tr>
							<tr>
								<td>医生意见</td>
								<td colspan=3>{{planInfo.yishenyijian}}</td>
							</tr>
						</table>
						<Form :model="zzsfForm" ref="zzsfForm" :rules="zzsfFormRule" :label-width="60" style="padding-top: 30px;">
							<FormItem label="原因" prop="select" style="text-align:left;" v-if="zzsfForm.radio == 1">
								<Select v-model="zzsfForm.select" style="width: 50%;" @on-change="xzReason">
									<Option value="1">死亡</Option>
									<Option value="2">拒绝随访</Option>
									<Option value="3">随访方案重复</Option>
									<Option value="4">方案不匹配</Option>
									<Option value="5">其他</Option>
								</Select>
							</FormItem>
							<FormItem label="详情" prop="textarea" style="text-align:left;" v-if="zzsfForm.radio == 1">
								<Input v-model="zzsfForm.textarea" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请详细说明情况" style="width: 50%;"></Input>
							</FormItem>
						</Form>
					</div>
				</Panel>
				<Panel name="2">
					记录详情
					<ul slot="content" class="followResult_message">
						<template v-for="item in planInfo.orderReplyQuestions">
							<li class="followResult_single_ai">
								<Icon type="android-call"></Icon>
								<span>
									{{item.question}}
								</span>
							</li>
							<li class="followResult_single_pat">
								<span>
									<audio controls :src="item.audio"></audio>
								</span>
								<Icon type="person"></Icon>
							</li>
						</template>
					</ul>
				</Panel>
			</Collapse>
		</Modal>
		<!-- 详情模态框 -->
		<Modal v-model="patientDetail" title="患者信息" class-name="patientInfo" :styles="{top: '36px'}" width="1000">
			<Row class="infoRow">
				<Col span="12" class="info-col mb12">
				<div class="info">
					<div class="info-row">
						<div class="info-one bb1">姓名</div>
						<div class="info-two bdx1">{{currentData.brxm}}</div>
					</div>
					<div class="info-row">
						<div class="info-one">性别</div>
						<div class="info-two">{{currentData.brxb}}</div>
					</div>
				</div>
				</Col>
				<Col span="12" class="info-col mb12">
				<div class="info">
					<div class="info-row">
						<div class="info-one bb1">电话</div>
						<div class="info-two bdx1">{{currentData.jtdh}}</div>
					</div>
					<div class="info-row">
						<div class="info-one">地址</div>
						<div class="info-two">{{currentData.xzzQtdz}}</div>
					</div>
				</div>
				</Col>
				<Col span="12" class="info-col mb12">
				<div class="info">
					<div class="info-row">
						<div class="info-one bb1">年龄</div>
						<div class="info-two bdx1">{{currentData.age}}</div>
					</div>
					<div class="info-row">
						<div class="info-one">民族</div>
						<div class="info-two">{{currentData.mz}}</div>
					</div>
				</div>
				</Col>
				<Col span="12" class="info-col mb12">
				<div class="info">
					<div class="info-row">
						<div class="info-one bb1">出生年月</div>
						<div class="info-two bdx1">{{currentData.csny}}</div>
					</div>
					<div class="info-row">
						<div class="info-one">身份证号</div>
						<div class="info-two">{{currentData.sfzh}}</div>
					</div>
				</div>
				</Col>
				<Col span="12" class="info-col mb12">
				<div class="info">
					<div class="info-row">
						<div class="info-one bb1">紧急联系人</div>
						<div class="info-two bdx1">{{currentData.lxrm}}</div>
					</div>
					<div class="info-row">
						<div class="info-one">关系</div>
						<div class="info-two">{{currentData.lxgx}}</div>
					</div>
				</div>
				</Col>
				<Col span="12" class="info-col mb12">
				<div class="info">
					<div class="info-row">
						<div class="info-one bb1">联系地址</div>
						<div class="info-two bdx1">{{currentData.lxdz}}</div>
					</div>
					<div class="info-row">
						<div class="info-one">联系电话</div>
						<div class="info-two">{{currentData.lxdh}}</div>
					</div>
				</div>
				</Col>
				<Col span="12" class="info-col mb12">
				<div class="info" style="height: 32px;">
					<div class="info-row">
						<div class="info-one bdx1">单位</div>
						<div class="info-two bdx1">{{currentData.dwmc}}</div>
					</div>
				</div>
				</Col>
				<!-- 门诊 -->
				<Col span="24" class="info-co-public" v-if="mjzData.length" v-for="item,index in mjzData" :key="index">
				<Row class="infoRow2">
					<Col span="4" class="sfCol4">
					<div class="counts">
						<p class="suifang">门诊</p>
					</div>
					</Col>
					<Col span="20" class="sfCol20">
					<h3 class="sfName">{{currentData.brxm}}</h3>
					<Row>
						<Col span="12">
						<span>就诊卡号:</span>
						<span>{{currentData.jzkh}}</span>
						</Col>
						<Col span="12">
						<span>患者性质:</span>
						<span>{{currentData.brxz}}</span>
						</Col>
						<Col span="12">
						<span>就诊时间:</span>
						<span>{{item.jzrq}}</span>
						</Col>
						<Col span="12">
						<span>是否初诊:</span>
						<span>44</span>
						</Col>
						<Col span="12">
						<span>就诊科室:</span>
						<span>{{item.ksmc}}</span>
						</Col>
						<Col span="12">
						<span>就诊医生:</span>
						<span>{{item.ysxm}}</span>
						</Col>
						<Col span="12">
						<span>主诉:</span>
						<span>{{item.zs}}</span>
						</Col>
						<Col span="12">
						<span>诊断:</span>
						<span>{{item.zdmc}}</span>
						</Col>
					</Row>
					</Col>
				</Row>
				</Col>
				<!-- 住院 -->
				<Col span="24" class="info-co-public" v-if="zyData.length" v-for="item1,index1 in zyData" :key="index1">
				<Row class="infoRow2">

					<Col span="4" class="sfCol4">
					<div class="counts">
						<p class="suifang">住院</p>
					</div>
					</Col>
					<Col span="20" class="sfCol20">
					<h3 class="sfName">{{currentData.brxm}}</h3>
					<Row>
						<Col span="12">
						<span>住院号:</span>
						<span>{{item1.zyhm}}</span>
						</Col>
						<Col span="12">
						<span>患者性质:</span>
						<span>{{currentData.brxz}}</span>
						</Col>
						<Col span="12">
						<span>入院时间:</span>
						<span>{{item1.admissiontime}}</span>
						</Col>
						<Col span="12">
						<span>出院时间:</span>
						<span>{{item1.leavetime}}</span>
						</Col>
						<Col span="12">
						<span>入院科别:</span>
						<span>{{item1.departname}}</span>
						</Col>
						<Col span="12">
						<span>主治医生:</span>
						<span>{{item1.doctorname}}</span>
						</Col>
						<Col span="12">
						<span>入院诊断:</span>
						<span>{{item1.admissiondiagnose}}</span>
						</Col>
						<Col span="12">
						<span>出院诊断:</span>
						<span>{{item1.leavediagnose}}</span>
						</Col>
						<Col span="12">
						<span>入院情况:</span>
						<span>{{item1.admissiondescription}}</span>
						</Col>
						<Col span="12">
						<span>出院情况:</span>
						<span>{{item1.leavedescription}}</span>
						</Col>
					</Row>
					</Col>
				</Row>
				</Col>
			</Row>
		</Modal>
		<!-- 终止随访 -->
		<Modal v-model="zzsfModel" class-name="zzsfModel" width="480px">
			<p slot="header" style="color:#ed3f14;text-align:center;font-size:16px;">
				<span>终止{{sfrName}}所有随访</span>
			</p>
			<div style="text-align:center">
				<Form :model="zzsfForm" ref="zzsfForm" :rules="zzsfFormRule" :label-width="80">
					<FormItem label="原因" prop="select" style="text-align:left;">
						<Select v-model="zzsfForm.select" style="width: 80%;" @on-change="xzReason">
							<Option value="1">死亡</Option>
							<Option value="2">拒绝随访</Option>
							<Option value="3">随访方案重复</Option>
							<Option value="4">方案不匹配</Option>
							<Option value="5">其他</Option>
						</Select>
					</FormItem>
					<FormItem label="详情" prop="textarea" style="text-align:left;">
						<Input v-model.trim="zzsfForm.textarea" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请详细说明情况" style="width: 80%;"></Input>
					</FormItem>
					<FormItem>
						<Button type="primary" style="margin-left:-80px" @click="zzsfCancel('zzsfForm')">取消</Button>
						<Button type="ghost" @click="zzsfOk('zzsfForm')" style="margin-left: 8px">提交</Button>
					</FormItem>
				</Form>
			</div>
			<div slot="footer">
			</div>
		</Modal>
	</Row>
</template>

<script>
import { API } from '@/services/index.js';
export default {
	data() {
		return {
			//搜索选项
			createLoading: true,   //loading动画加载
			searchParams: {
				pager: 1, //当前页码
				limit: 10,//每页条数
				schemeName: "",//方案名称（可选）
				orderNo: "",//编码（可选）
				brxm: "", //患者姓名（可选）
				status: "",
			},
			statusList: [{
				name: "全部",
				id: ""
			}, {
				name: "等待随访",
				id: 0
			}, {
				name: "随访中",
				id: 1
			}, {
				name: "已随访",
				id: 2
			}, {
				name: "已停止",
				id: 3
			}, {
				name: "配置错误",
				id: 4
			},],//审核状态选项列表
			totalPage: 100,//总页数
			//随访记录详情
			planInfo: {
				orderReplyQuestions: []
			},
			//表格配置
			config: [
				{
					title: '随访编号',
					key: 'orderNo',
					align: 'center'
				},
				{
					title: '患者姓名',
					key: 'brxm',
					align: 'center',
					render: (h, params) => {
						return h('div', [
							h('span', {
								props: {
									type: 'primary',
									size: 'small'
								},
								style: {
									borderBottom: '1px solid #5cadff',
									color: '#5cadff'
								},
								on: {
									click: () => {
										this.getInfo(params.row.hzxxId);
										this.patientDetail = true;
									}
								}
							}, params.row.brxm),
						])
					}
				},
				{
					title: '疾病诊断',
					key: 'icdName',
					align: 'center'
				},
				{
					title: '随访方案',
					key: 'schemeName',
					align: 'center'
				},
				{
					title: '随访状态',
					key: 'statusStr',
					align: 'center'
				},
				{
					title: '通话状态',
					key: 'remark',
					align: 'center'
				},
				{
					title: '生成时间',
					key: 'dateAdd',
					align: 'center'
				},
				{
					title: '执行日期',
					key: 'dateUpdate',
					align: 'center'
				},
				{
					title: '操作',
					key: 'action',
					width: 250,
					align: 'center',
					render: (h, params) => {
						return h('div', [
							h('Button', {
								props: {
									type: params.row.vetStatus != 0 ? 'primary' : 'dashed',
									size: 'small',
								},
								style: {
									marginRight: '5px'
								},
								'class': {
									menuHide: this.menuShow(this.AM.FollowBussiness.detailLog)
								},
								on: {
									click: () => {
										/** 
										 * 该处类型判断
										 */
										if (params.row.vetStatus != 0) {
											this.showInfo(params.row.id);
										}
									}
								}
							}, params.row.vetStatus == 0 ? '审核中' : '详情'),
							h('Button', {
								props: {
									type: 'info',
									size: 'small'
								},
								style: {
									marginRight: '5px'
								},
								'class': {
									menuHide: this.menuShow(this.AM.FollowBussiness.cancleall)
								},
								on: {
									click: () => {
										this.zzsfFun(params.row.brxm, params.row.id)
										this.$refs.zzsfForm.resetFields();
									}
								}
							}, '终止随访'),
							 h('Button', {
								props: {
									type: 'warning',
									size: 'small'
								},
								style: {

								},
								'class': {
									menuHide: this.menuShow(this.AM.FollowBussiness.delLog)
								},
								on: {
									click: () => {
										this.deletResult(params.row.id);
									}
								}
							}, '删除')
						]);
					}
				}],
			//表格data
			dataList: [],
			follInfo: false,//详情模态框
			//当前被点击患者，编辑和详情按钮触发时更换数据
			currentData: {},
			//门急诊信息
			mjzData: [],
			//住院信息
			zyData: [],
			//详情模态框
			patientDetail: false,
			//终止随访
			zzsfModel: false,//弹框
			sfrName: '',//终止随访人姓名
			nowId: '',//终止随访人数据id
			zzsfForm: {
				select: '',//终止随访原因
				textarea: '',//终止随访备注
				radio: '0',
			},
			zzsfFormRule: {//终止随访form验证
				select: [
					{ required: true, message: '请选择不通过原因', trigger: 'change' }
				],
				textarea: [
					{ required: true, message: '请输入详情', trigger: 'blur' },
				]
			},
		}
	},
	methods: {
		/** 
		 * 获取列表数据,搜索接口
		 */
		getData() {
			API.FollowBussiness.listLog(this.searchParams).then((res) => {
				this.dataList = res.data;
				this.totalPage = res.total;
				this.createLoading = false;
			}).catch((err) => {
				//弹出错误信息
				this.$Message.error(err);
			});
		},
		/** 
		 * 页码改变
		 */
		changePage(index) {
			this.searchParams.pager = index;
			this.getData();
		},
		/** 
		 * 显示随访详情
		 */
		showInfo(id) {
			/** 
			 * 获取详情并且赋值到临时数据
			 */
			API.FollowBussiness.detailLog({
				id: id
			}).then((res) => {
				this.planInfo = res.data;
				if (res.data.notPassReason != '') {
					this.zzsfForm.radio = 1;
					this.zzsfForm.select = res.data.notPassReason;
					this.zzsfForm.textarea = res.data.notPassRemark;
				} else {
					this.zzsfForm.radio = 0;
				}
			}).catch((err) => {
				//弹出错误信息
				this.$Message.error(err);
			});
			this.follInfo = true;
		},
		/** 
		 * 删除随访记录
		 */
		deletResult(id) {
			this.$Modal.confirm({
				title: '删除记录',
				content: '确定删除该条记录？',
				onOk: () => {
					API.FollowBussiness.delLog({
						id: id
					}).then((res) => {
						this.$Message.success("删除成功");
						this.getData();
					}).catch((err) => {
						//弹出错误信息
						this.$Message.error(err);
					});
				}
			});
		},
		/** 
     * 查看患者详情
     */
		getInfo(id) {
			API.FollowBussiness.detailPat({
				id: id
			}).then((res) => {
				if (res.data.mjzs.length) {
					this.mjzData = res.data.mjzs
				}
				if (res.data.cyxjs.length) {
					this.zyData = res.data.cyxjs
				}
				this.currentData = res.data;
			}).catch((err) => {
				//弹出错误信息
				this.$Message.error(err);

			});
		},
    /**
       * 终止随访按钮
       */
		zzsfFun(name, id) {
			this.zzsfModel = true;
			this.sfrName = name;
			this.nowId = id;
		},
		//选择终止随访的原因
		xzReason(value) {
			this.zzsfForm.select = value
		},
		/**
		 * 终止随访取消按钮
		 */
		zzsfCancel(name) {
			this.$refs[name].resetFields();
			this.zzsfModel = false;
		},
		/**
		 * 终止随访确定按钮
		 */
		zzsfOk(name) {
			this.$refs[name].validate((valid) => {
				if (valid) {
					API.Dataaudit.cancelall({
						id: this.nowId,
						notPassReason: this.zzsfForm.select,
						notPassRemark: this.zzsfForm.textarea,
					}).then((res) => {
						console.log(res)
						this.$Message.success('成功!');
						this.zzsfModel = false;

					}).catch((err) => {
						//弹出错误信息
						this.$Message.error(err);
					});
				} else {
					this.$Message.error('失败');
				}
			})
		},

	},
	mounted() {
		this.getData();
	}
}
</script>

<style lang="less">
@import "../../styles/common.less";
@import "../../styles/jzda.less";
.followResult {
	&_single {
		&_ai {
			padding-right: calc(50% + 10px);
			box-sizing: border-box;
			font-size: 0;
			.ivu-icon {
				font-size: 20px;
				margin-right: 10px;
				width: 20px;
				margin-top: 10px;
			}
			span {
				display: inline-block;
				background-color: #d9edf7;
				border-radius: 4px;
				padding: 10px;
				font-size: 13px;
				box-sizing: border-box;
				vertical-align: top;
				width: calc(~"100% - 30px");
			}
		}
		&_pat {
			padding-left: calc(50% + 10px);
			box-sizing: border-box;
			.ivu-icon {
				font-size: 20px;
				margin-left: 10px;
				width: 20px;
				margin-top: 10px;
				float: right;
			}
			span {
				display: block;
				float: left;
				background-color: #d9edf7;
				border-radius: 4px;
				padding: 10px;
				font-size: 13px;
				box-sizing: border-box;

				width: calc(~"100% - 30px");
				audio {
					display: inline-block;
				}
			}
			&:after {
				content: "";
				display: block;
				clear: both;
			}
		}
	}
	&_table {
		width: 100%;
		table {
			width: 100%;
			border: 1px solid #dadada;
			border-collapse: collapse;
		}
		tr {
			height: 35px;
			line-height: 35px;
			font-size: 13px;
			&:nth-of-type(odd) {
				background-color: #f7f7f7;
			}
		}
		td {
			text-indent: 5px;
			width: 25%
		}
	}
	form {
		.ivu-form-item {
			margin-bottom: 10px;
			padding: 0;
			width: 200px;
			.ivu-form-item-label:before {
				content: ''
			}
		}
	}
	.fpTable {
		padding: 10px;
	}
}

.pages {
	.ivu-page {
		float: right;
		padding: 10px 20px 10px 0;
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
.bb1 {
	border-bottom: 1px solid #fff;
}

.bdx1 {
	border-bottom: 1px dotted #EDF3F4;
}

.mb12 {
	margin-bottom: 12px;
}

.redColor {
	color: red;
}

.inter-down {
	&_main {
		&_list {}
		&_search {
			box-sizing: border-box;
			margin-bottom: 10px;
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
				.ivu-date-picker {
					width: 100%;
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
		&_page {
			margin-top: 10px;
		}
	}
}
</style>
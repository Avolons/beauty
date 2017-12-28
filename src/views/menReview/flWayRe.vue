<style lang="less">
.followResult {
	&_message_vemark {
		text-indent: 0;
		display: block;
		textarea {
			border: none;
			outline: none;
		}
	}
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
		&_patInner{
				width: 100%;
				float: left;
				background-color: #d9edf7;
				border-radius: 4px;
				padding: 10px;
				font-size: 13px;
				box-sizing: border-box;
				margin-top: 10px;
				clear: both;
				>h3{
					font-size: 14px;
					font-weight: 400;
				}
				>h4{
					font-weight: 400;
					margin: 5px 0;
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

			>span {
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

.sys-depart {
	&_main {
		&_add {
			margin-bottom: 10px;
		}
		&_list {}
		&_search {
			box-sizing: border-box;
			.ivu-col {
				display: flex;
				margin-bottom: 10px;
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
		&_page {
			margin-top: 10px;
		}
	}
}
</style>


<template>
	<div class="user">
		<div class="sys-depart_main">
			<Row class="sys-depart_main_search" :gutter="15">
				<Col span="6">
				<span>
					随访编号
				</span>
				<Input type="text" v-model="searchParam.orderNo" placeholder="请输入随访编号"></Input>
				</Col>
				<Col span="6">
				<span>
					患者姓名
				</span>
				<Input type="text" v-model="searchParam.brxm" placeholder="请输入患者姓名"></Input>
				</Col>
				<Col span="6">
				<span>
					科室名称：
				</span>
				<Select @on-change="getDoctorList" v-model="departId">
					<Option v-for="item in departList" :value="item.id" :key="item.id">{{item.name}}</Option>
				</Select>
				</Col>
				<Col span="6">
				<span>
					医生：
				</span>
				<Select @on-change="getData" v-model="searchParam.admin">
					<Option v-for="item in doctorList" :value="item.realname+','+item.id" :key="item.id">{{item.realname}}</Option>
				</Select>
				</Col>
				<Col span="6">
				<span>
					方案匹配：
				</span>
				<Select v-model="searchParam.schemeId" placeholder="请选择方案" style="width:200px">
					<Option v-for="item in actionList" :value="item.value" :key="item.value">{{ item.label }}</Option>
				</Select>
				</Col>

				<Col span="6">
				<Button @click="getData" type="primary">查询</Button>
				</Col>
			</Row>
			<div class="sys-depart_main_list">
				<Table border :columns="config" :data="dataList"></Table>
			</div>
			<Row class="sys-depart_main_page">
				<Page :page-size="pageSize" :total="totalPage" :current="searchParam.pager" show-elevator style="float:right" @on-change="changePage"></Page>
			</Row>
			<!-- 随访模态框 -->
			<Modal v-model="modal" title="随访详情" width="950" class-name="patientInfo" :styles="{top:'100px',height:'700px',overflowY:'auto'}">
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
									<td colspan=3>
										<Input type="textarea" class="followResult_message_vemark" v-model="planInfo.vetRemark" placeholder="请输入您的审核意见"></Input>
									</td>
								</tr>
							</table>
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

									<div class="followResult_single_patInner">
										<Input v-model="item.asr" placeholder="患者回复"></Input>
									</div>
									<div class="followResult_single_patInner">
										<h3>指标：{{item.fieldName}}</h3>
										<h4>
											采集指标：
											<RadioGroup v-model="item.fieldValue" @on-change="labeChange(item)">
												<Radio v-for="ite,index in item.optionValues" :key="index" :label="ite">
													<span>{{ite}}</span>
												</Radio>
											</RadioGroup>
										</h4>
										<h4>
											指标是否正常：
											<RadioGroup v-model="item.isNormal">
												<Radio label="1">
													<span>正常</span>
												</Radio>
												<Radio label="0">
													<span>不正常</span>
												</Radio>
											</RadioGroup>
										</h4>
									</div>
								</li>
							</template>
						</ul>
					</Panel>
				</Collapse>
				<div slot="footer" class="sys-sysset_main_btnList">
					<Button type="primary">提交审核</Button>
                </div>
			</Modal>
		</div>
	</div>
</template>

<script>
import { API } from '../../services/index.js';
export default {
	data() {
		return {
			//搜索参数
			searchParam: {
				pager: 1, //当前页码
				limit: 3,//每页条数
				schemeId: "",//方案id（可选）
				orderNo: "",//编码（可选）
				brxm: "", //患者姓名（可选）
				adminId: 288,  //医生id
				status: 2   //状态为2（必传）
			},
			//随访结果详情
			planInfo: {
				orderReplyQuestions: []
			},
			pageSize: 10,
			totalPage: 10,//总页码
			departList: [],//科室选项列表
			departId: "",//科室id
			doctorList: [],//医生选项列表
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
			formData: {
				name: "",
				paixu: 0,
				types: "0",
				mType: "0",
				state: "0",
				remark: "",//备注
			},
			//模态窗title
			modal: false,
			//表格配置
			config: [
				{
					title: '编号',
					key: 'orderNo',
				},
				{
					title: '随访方案',
					key: 'schemeName',
				},
				{
					title: '患者',
					key: 'brxm',
				},
				{
					title: '状态',
					key: 'statusStr',
				},
				{
					title: '生成时间',
					key: 'dateAdd'
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
										this.editDepart(params.row.id)
									}
								}
							}, params.row.vetStatus == 0 ? '审核' : '重新审核'),
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
										this.delDepart(params.row.id)
									}
								}
							}, '删除'),
						]);
					}
				}
			],
			//列表数据
			dataList: []
		}
	},
	methods: {
		labeChange(item){

		},
		/** 
		 * 获取科室列表
		 */
		getDepartList() {
			API.Systems.listDisDepart().then((res) => {
				this.departList = res.data;
			}).catch((err) => {

			});
		},
		/** 
		 * 获取医生列表
		 */
		getDoctorList() {
			API.FollowBussiness.listDoctor({
				pager: 1,
				limit: 100000,
				departmentId: this.departId,
				type: 1
			}).then((res) => {
				this.doctorList = res.data;
			}).catch((err) => {

			});
		},
		/** 
         * 获取所有数据
         */
		getData() {
			API.Dataaudit.listResult(this.searchParam).then((res) => {
				this.totalPage = res.data.total;
				this.dataList = res.data;
			}).catch((err) => {

			});
		},
		/** 
		 * 数据格式化
		 */
		dataForm(data){
			for (const item of data.orderReplyQuestions) {
					item.isNormal=item.isNormal==false?"0":"1";
					item.thresholdValue=item.thresholdValue.split(",");
					item.optionValues=item.optionValues.split(",");
			}
			return data;
		},
		/** 
		 * 审核结果
		 */
		editDepart(id) {
			this.modal = true;
			API.Dataaudit.infoResult({
				id: "7a093412-ebc4-11e7-94fe-6cae8b369de4"
			}).then((res) => {
				this.planInfo = this.dataForm(res.data);
			}).catch((err) => {

			});
		},
		/** 
		 * 删除结果
		 */
		delDepart(id) {
			this.$Modal.confirm({
				title: '删除结果',
				content: '确定删除该结果？',
				onOk: () => {
					API.Dataaudit.delResult({
						id: id
					}).then((res) => {
						this.$Message.success("删除成功");
						this.getData();
					}).catch((err) => {

					});
				}
			});
		},
		submitData(){
			let ajaxDa
		},
		/** 
         * 重置所有属性
         */
		handleReset(name) {
			this.$refs[name].resetFields();
		},
		/** 
		 * 分页改变
		 */
		changePage(page) {
			this.searchParam.pager = page;
			this.getData();
		},
	}, mounted() {
		this.getData();
	}
}
</script>


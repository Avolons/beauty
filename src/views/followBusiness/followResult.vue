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
				随访方案
			</span>
			<Input type="text" v-model="searchParams.schemeName" placeholder="请输入随访方案"></Input>
			</Col>
			<Col span="6">
			<Button @click="getData" type="primary">查询</Button>
			</Col>
		</Row>
		</Col>
		<!-- 表格 -->
		<Col span="24" class="fpTable">
		<Table border :columns="config" :data="dataList" class="margin-bottom-10"></Table>
		<Row>
			<Page style="float:right" :total="totalPage" @on-change="changePage" show-elevator show-total></Page>
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
	</Row>
</template>

<script>
import { API } from '@/services/index.js';
export default {
	data() {
		return {
			//搜索选项
			searchParams: {
				pager: 1, //当前页码
				limit: 10,//每页条数
				schemeName: "",//方案名称（可选）
				orderNo: "",//编码（可选）
				brxm: "" //患者姓名（可选）
			},
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
					title: '随访方案',
					key: 'schemeName',
					align: 'center'
				},

				{
					title: '患者',
					key: 'brxm',
					align: 'center'
				},
				{
					title: '随访状态',
					key: 'statusStr',
					align: 'center'
				},
				{
					title: '生成时间',
					key: 'dateAdd',
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
									type: params.row.vetStatus == 1 ? 'primary' : 'dashed',
									size: 'small',
								},
								style: {
									marginRight: '5px'
								},
								 'class':{
									menuHide:this.menuShow(this.AM.FollowBussiness.detailLog)
								},
								on: {
									click: () => {
										/** 
										 * 该处类型判断
										 */
										if (params.row.vetStatus == 1) {
											this.showInfo(params.row.id);
										}
									}
								}
							}, params.row.vetStatus == 0 ? '审核中' : '详情'),
							h('Button', {
								props: {
									type: 'warning',
									size: 'small'
								},
								style: {

								},
								 'class':{
									menuHide:this.menuShow(this.AM.FollowBussiness.delLog)
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
			}).catch((err) => {

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
			}).catch((err) => {

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

					});
				}
			});
		}

	},
	mounted() {
		this.getData();
	}
}
</script>

<style lang="less">
@import "../../styles/common.less";

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

.redColor{
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
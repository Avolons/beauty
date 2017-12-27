<style lang="less">
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
				<Input type="text" v-model="searchParam.brxm" placeholder="请输入随访编号"></Input>
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
				<Select @on-change="getDoctorList" v-model="searchParam.departId">
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
				<Select v-model="searchParam.mType" placeholder="请选择方案" style="width:200px">
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
				<Page :page-size="pageSize" :total="totalPage" :current="searchParam.page" show-elevator style="float:right" @on-change="changePage"></Page>
			</Row>
			<!-- 随访模态框 -->
		<Modal v-model="modal" title="随访详情" width="950" class-name="patientInfo" :styles="{top: '180px'}">
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
									<Input v-model="planInfo.vetRemark" type="textarea"  placeholder="请输入您的审核意见"></Input>
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
							</li>
						</template>
					</ul>
				</Panel>
			</Collapse>
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
				page: 1,//当前页码
				dpname: "",
				iUse: null,
				types: null,
				mType: null,
			},
			//随访结果详情
			planInfo: {
				orderReplyQuestions: []
			},
			pageSize: 10,
			totalPage: 10,//总页码
			departList: [],//科室选项列表
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
			currentData: {

			},
			//模态窗title
			modal: false,
			//表格配置
			config: [
				{
					title: '科室编号',
					key: 'id',
				},
				{
					title: '类型',
					key: 'type',
					render: (h, params) => {
						return params.row.type == 0 ? "门诊" : "住院"
					}
				},
				{
					title: '方案匹配模式',
					key: 'matchType',
					render: (h, params) => {
						return params.row.matchType == 0 ? "疾病" : "医生"
					}
				},
				{
					title: '名称',
					key: 'name',
				},
				{
					title: '状态',
					key: 'look',
					align: 'center',
					render: (h, params) => {
						if (params.row.isUse) {
							return h('Icon', {
								props: {
									type: "android-done",
								},
								style: {
									color: "#2d8cf0",
									fontSize: "20px"
								}
							});
						} else {
							return h('Icon', {
								props: {
									type: "android-close",
								},
								style: {
									color: "#ed3f14"
								}
							});
						}

					}
				},
				{
					title: '生成时间',
					key: 'dateAdd'
				},
				{
					title: '更新时间',
					key: 'dateUpdate'
				},
				{
					title: '操作',
					key: 'action',
					width: 150,
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
										this.editDepart(params.row)
									}
								}
							}, '审核'),
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
			API.Systems.listDepart(this.searchParam).then((res) => {
				this.totalPage = res.data.totalRow;
				this.pageSize = res.data.pageSize;
				this.dataList = res.data.result;
			}).catch((err) => {

			});
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
			this.searchParam.page = page;
			this.getData();
		},
	}, mounted() {
		this.getData();
	}
}
</script>


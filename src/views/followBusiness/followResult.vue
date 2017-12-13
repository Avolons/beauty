<template>
	<Row>
		<!-- 搜索栏 -->
		<Col span="24" class="followPlan">
		<Form ref="searchParams" :model="searchParams" :rules="validate" :label-width="90" inline>
			<FormItem label="编号">
				<Input type="text" v-model="searchParams.code" placeholder="请输入患者编号"></Input>
			</FormItem>
			<FormItem label="患者姓名">
				<Input type="text" v-model="searchParams.patient" placeholder="请输入患者姓名"></Input>
			</FormItem>
			<FormItem label="科室">
				<Select v-model="searchParams.depart">
					<Option v-for="item in departList" :value="item.val" :key="item.id">{{item.title}}</Option>
				</Select>
			</FormItem>
			<FormItem label="医生">
				<Select v-model="searchParams.doctor">
					<Option v-for="item in doctorList" :value="item.val" :key="item.id">{{item.title}}</Option>

				</Select>
			</FormItem>
			<FormItem label="随访方案">
				<Select v-model="searchParams.action">
					<Option v-for="item in actionList" :value="item.val" :key="item.id">{{item.title}}</Option>
				</Select>
			</FormItem>
			<FormItem>
				<Button type="primary" @click="getData">查询</Button>
			</FormItem>
		</Form>
		</Col>
		<!-- 表格 -->
		<Col span="24" class="fpTable">
		<Table border :columns="config" :data="dataList" class="margin-bottom-10"></Table>
		<Row>
			<Page :total="100" style="float:right" show-elevator show-total></Page>
		</Row>
		</Col>
		<!-- 随访模态框 -->
		<Modal v-model="follInfo" title="随访详情" width="950" class-name="patientInfo" :styles="{top: '180px'}">
			 <Collapse >
				<Panel name="1">
					随访结果
					<div slot="content" class="followPlan_table">
						<table border="1">
						<tr>
							<td>患者姓名</td>
							<td>薛伟杰</td>
							<td>采用随访方案</td>
							<td>拱墅卫生局试点</td>
						</tr>
						<tr>
							<td>随访状态</td>
							<td>已随访</td>
							<td>呼叫状态</td>
							<td>正常通话结束</td>
						</tr>
						<tr>
							<td>完成时间</td>
							<td>2017-09-28 16:31:33</td>
							<td>被叫号码</td>
							<td>15874514589</td>
						</tr>
						<tr>
							<td>审核意见</td>
							<td colspan=3>都是分支问题，目前没相应知识库</td>
						</tr>
						<tr>
							<td>随访结果</td>
							<td colspan=3>是否知道全科医生签约服务</td>
						</tr>
						<tr>
							<td>医生意见</td>
							<td colspan=3>没有大概的什么毛病</td>
						</tr>
					</table>
					</div>
				</Panel>
				<Panel name="2">
					记录详情
					<ul slot="content" class="followPlan_message">
						<li class="followPlan_single_ai">
							<Icon type="android-call"></Icon>
							<span>
								姓名
							</span>
						</li>
						<li class="followPlan_single_pat">
							<span>
								<audio controls src="http://192.168.1.100:8080/AIVoc\2017-09-28\20170928163021_8.wav"></audio>
							</span>
							<Icon type="person"></Icon>
						</li>
					</ul>
				</Panel>
			</Collapse>
		</Modal>
	</Row>
</template>

<script>
export default {
	data() {
		return {
			//搜索选项
			searchParams: {
				depart: '',//科室
				doctor: '',//医生
				patient: '',//患者姓名
				action: '',//随访方案
				code: '',//患者编号
			},
			//随访记录详情
			planInfo:{

			},
			departList: [],//科室选项列表
			actionList: [],//随访方案列表
			doctorList: [],//医生选项列表
			//表格配置
			config: [
				{
					title: '随访编号',
					key: 'name',
					align: 'center'
				},
				{
					title: '随访方案',
					key: 'age',
					align: 'center'
				},

				{
					title: '患者',
					key: 'age',
					align: 'center'
				},
				{
					title: '随访状态',
					key: 'address',
					align: 'center'
				},
				{
					title: '生成时间',
					key: 'address',
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
									type: 'primary',
									size: 'small'
								},
								style: {
									marginRight: '5px'
								},
								on: {
									click: () => {
										/** 
										 * 该处类型判断
										 */
										if (params.row.action1 == true) {
											this.$router.push({ path: '/followBusiness/page/page' });
										} else {
											this.showInfo(params.row.id);
											this.patientDetail = true
										}
									}
								}
							}, params.row.action1 == true ? '审核中' : '详情'),
							h('Button', {
								props: {
									type: 'warning',
									size: 'small'
								},
								style: {

								},
								on: {
									click: () => {
										this.patientText = true
										//this.remove(params.index)
										this.$Modal.confirm({
											title: 'Title',
											content: '<p>确定要删除吗?</p>',
											onOk: () => {
												this.remove(params.index)
											},
											onCancel: () => {
												// this.$Message.info('Clicked cancel');
											}
										});
									}
								}
							}, '删除')
						]);
					}
				}],
			//表格data
			dataList: [
				{
					name: 'John Brown',
					age: 18,
					action1: true,
					address: 'New York No. 1 Lake Park',
				},
				{
					name: 'Jim Green',
					age: 24,
					action1: false,
					address: 'London No. 1 Lake Park'
				},
				{
					name: 'Joe Black',
					age: 30,
					action1: true,
					address: 'Sydney No. 1 Lake Park'
				},
				{
					name: 'Jon Snow',
					age: 26,
					action1: true,
					address: 'Ottawa No. 2 Lake Park'
				},
			],
			follInfo: false,//详情模态框
		}
	},
	methods: {
		/** 
		 * 获取列表数据,搜索接口
		 */
        getData() {

        },
		/** 
		 * 页码改变
		 */
        changePage(index) {
            this.page = index;
            this.getData();
		},
		showInfo(id){
			/** 
			 * 获取详情并且赋值到临时数据
			 */
			this.follInfo=true;
		}
		
	},
	mounted () {
		this.getData();
	}
}
</script>

<style lang="less">
@import "../../styles/common.less";

.followPlan {
	&_single{
		&_ai{
			padding-right: calc(50% + 10px);
			box-sizing: border-box;
			font-size: 0;
			.ivu-icon{
				font-size: 20px;
				margin-right: 10px;
				width: 20px;
				margin-top: 10px;
			}
			span{
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
		&_pat{
			padding-left: calc(50% + 10px);
			box-sizing: border-box;
			.ivu-icon{
				font-size: 20px;
				margin-left: 10px;
				width: 20px;
				margin-top: 10px;
				float: right;
			}
			span{
					display: block;
					float: left;
					background-color: #d9edf7;
					border-radius: 4px;
					padding: 10px;
					font-size: 13px;
					box-sizing: border-box;
	
					width: calc(~"100% - 30px");
					audio{
						display: inline-block;
					}
			}
			&:after{
				content: "";
				display: block;
				clear: both;
			}
		}
	}
	&_table{
		width: 100%;
		table{
			width: 100%;
			border: 1px solid #dadada;
			border-collapse:collapse;
		}
		tr{
			height: 35px;
			line-height: 35px;
			font-size: 13px;
			&:nth-of-type(odd){
				background-color: #f7f7f7;
			}
		}
		td{
			text-indent: 5px;
			width: 25%
		}
	}
	padding: 20px 0;
	background: #fff;
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
</style>
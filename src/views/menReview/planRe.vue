<template>
	<Row class="planRe">
		<!-- 搜索栏 -->
		<Col span="24">
		<Row class="planRe_main_search" :gutter="15">
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
			<span>
				审核状态
			</span>
			<Select v-model="searchParams.status">
				<Option v-for="item in statusList" :value="item.id" :key="item.id">{{item.name}}</Option>
			</Select>
			</Col>
			<Col span="6">
			<span>
				医生
			</span>
			<Input type="text" v-model="searchParams.adminName" placeholder="请输入医生姓名"></Input>
			</Col>
			<Col span="6">
			<span>
				操作者
			</span>
			<Input type="text" v-model="searchParams.operator" placeholder="请输入操作者姓名"></Input>
			</Col>
			<Col span="6">
			<Button type="primary" @click="getData">查询</Button>
			</Col>
		</Row>
		</Col>
		<!-- 表格 -->
		<Col span="24" class="fpTable">
		<Table @on-selection-change="selectChange" ref="selection" border :columns="config" :data="dataList" class="margin-bottom-10"></Table>
		<Row class="planRe_main_page">
			<Button @click="handleSelectAll(true)">全选</Button>
			<Button v-if="!menuShow(this.AM.Data.passPlan)" type="primary" @click="passPlan(haveSelect,2)">通过</Button>
			<Button v-if="!menuShow(this.AM.Data.passPlan)" type="warning" @click="passPlan(haveSelect,1)">不通过</Button>
			<Page style="float:right" :total="totalPage" @on-change="changePage" show-elevator show-total></Page>
		</Row>
		</Col>
	</Row>
</template>

<script>
import { API } from '@/services/index.js';
export default {
	data() {
		return {
			//搜索选项
			searchParams: {
				brxm: '',//患者姓名
				schemeName: '',//随访方案
				brxm: "",
				adminName: "",
				operator: "",
				type: 1,
				status: '',//审核状态
				pager: 1,//
				limit: 10,//每页条数
			},
			//列表配置
			config: [
				{
					type: 'selection',
					width: 60,
					align: 'center'
				},
				{
					title: '患者姓名',
					key: 'brxm',
				},
				{
					title: '随访方案',
					key: 'schemeName',
				},
				{
					title: '状态',
					key: 'statusStr',
				},
				{
					title: '生成时间',
					key: 'dateAdd',
				},
				{
					title: '审核时间',
					key: 'dateVet',
				},
				{
					title: '医生',
					key: 'adminName',
				},
				{
					title: '操作者',
					key: 'operator',
				},
				{
					title: '审核操作',
					key: 'action',
					width: 150,
					align: 'center',
					render: (h, params) => {
						if (params.row.status == 0) {
							return h('div', [
								h('Button', {
									props: {
										type: 'primary',
										size: 'small'
									},
									style: {
										marginRight: '5px',
									},
									 'class': {
								menuHide: this.menuShow(this.AM.Data.passPlan)
								},
									on: {
										click: () => {
											this.passPlan([params.row.id], 2);
										}
									}
								}, '通过'),
								h('Button', {
									props: {
										type: 'warning',
										size: 'small'
									},
									style: {

									},
									 'class': {
								menuHide: this.menuShow(this.AM.Data.passPlan)
								},
									on: {
										click: () => {
											/** 
											 * 删除计划
											 */
											this.passPlan([params.row.id], 1);
										}
									}
								}, '不通过')
							]);
						} else {
							return h('div', [
								h('Button', {
									props: {
										type: 'dashed',
										size: 'small'
									},
									style: {
										marginRight: '5px',
									},
									on: {

									}
								}, params.row.statusStr)
							]);
						}

					}
				}],
			//列表数据
			dataList: [],
			statusList: [{
				name: "全部",
				id: ""
			}, {
				name: "待审核",
				id: 0
			}, {
				name: "不通过",
				id: 1
			}, {
				name: "审核通过",
				id: 2
			}, {
				name: "已排期",
				id: 3
			}, {
				name: "已取消",
				id: 4
			},],//审核状态选项列表
			id: -1,//当前被选中的数据id
			totalPage: 100,//总页数
			haveSelect: []
		}
	},
	methods: {
        /** 
		 * 获取列表数据,搜索接口
		 */
		getData() {
			API.Dataaudit.listPlan(this.searchParams).then((res) => {
				this.dataList = this.dataForm(res.data);
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
		 * 选项改变
		 */
		selectChange(select) {
			let arr = [];
			for (let item of select) {
				arr.push(item.id);
			}
			this.haveSelect = arr;
		},
		/** 
		 * 数据格式化
		 */
		dataForm(data) {
			for (const item of data) {
				if (item.status != 0) {
					item._disabled = true;
				}
			}
			return data;
		},
		/** 
		 * 通过审核
		 */
		passPlan(arr, type) {
			console.log(arr);
			this.$Modal.confirm({
				title: '审核确认',
				content: '是否确定执行该操作？',
				onOk: () => {
					API.Dataaudit.passPlan({
						status: type,
						ids: arr
					}).then((res) => {
						this.$Message.success("操作成功");
						this.getData();
					}).catch((err) => {

					});
				}
			});
		},
		/** 
		 * 全选
		 */
		handleSelectAll(status) {
			this.$refs.selection.selectAll(status);
		},

	},
	mounted() {
		this.getData();
	}
}
</script>

<style lang="less">
.planRe {
	&_main {
		&_list {}
		&_search {
			box-sizing: border-box;
			/* margin-bottom: 10px; */
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
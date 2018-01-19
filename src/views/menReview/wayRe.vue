<style lang="less">
	td.ivu-table-expanded-cell{
		padding: 0;
		padding-left: 50px;
		td{
			background-color: #f8f8f9;
		}
	}
</style>

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
			<!-- <Col span="6">
			<span>
				审核状态
			</span>
			<Select v-model="searchParams.status">
				<Option v-for="item in statusList" :value="item.id" :key="item.id">{{item.name}}</Option>
			</Select>
			</Col> -->
			<Col span="6">
			<span>
				医生
			</span>
			<Input type="text" v-model="searchParams.adminName" placeholder="请输入医生姓名"></Input>
			</Col>
			<Col span="6">
			<Button type="primary" @click="searchParams.pager=1;getData()">查询</Button>
			</Col>
		</Row>
		</Col>
		<!-- 表格 -->
		<Col span="24" class="fpTable">
		<Table  ref="selection"  :columns="config" :data="dataList" class="margin-bottom-10"></Table>
		<Row class="planRe_main_page">
			<Page style="float:right" :current="searchParams.pager" :total="totalPage" @on-change="changePage" show-elevator show-total></Page>
		</Row>
		</Col>
	</Row>
</template>

<script>
import { API } from '@/services/index.js';
import expandRow from './table-expand.vue';
export default {
	components: { expandRow },
	data() {
		return {
			//搜索选项
			searchParams: {
				pager: 1,      //当前页码
				limit: 10,     //每页条数
				schemeName: "",//方案名称（可选）
				adminName: "", //医生
				brxm: "",      //患者姓名（可选）
				status: "",    //状态 :0 待审核 1 不通过 2 审核通过 3 已排期 4 已取消
				type: 2        //必须传，且为2
			},
			//列表配置
			config: [
				{
					type: 'expand',
					width: 50,
					render: (h, params) => {
						return h(expandRow, {
							props: {
								data: params.row.child
							},
							on:{
								getData:this.getData
							}
						})
					}
				},
				{
					title: '患者姓名',
					key: 'brxm',
				},
				{
					title: '疾病诊断',
					key: 'icdName',
				},
				{
					title: '随访方案',
					key: 'schemeName',
				},
				{
					title: '随访状态',
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
					title: '操作',
					key: 'action',
					width: 200,
                    align: 'center',
					
				}
				],


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
			API.Dataaudit.listSame(this.searchParams).then((res) => {
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
		 * 数据格式化
		 */
		dataForm(data) {
			let Arrays={

			};
			for (let item of data) {
				if(Arrays[item.brxm]){
					Arrays[item.brxm].child.push(item);
				}else{
				   Arrays[item.brxm]={
					   brxm:item.brxm,
					   schemeName:item.schemeName,
					   statusStr:item.statusStr,
					   dateAdd:item.dateAdd,
					   dateVet:item.dateVet,
					   adminName:item.adminName,
					   operator:item.operator,
					   child:[]
				   };
				   Arrays[item.brxm].child.push(item);	
				}
			}
			let newArray=[];
			for (let key in Arrays) {
				newArray.push(Arrays[key]);
			}
			return newArray;
		},
		/** 
		 * 通过审核
		 */
		passPlan(arr, type) {
			
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
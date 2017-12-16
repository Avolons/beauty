<style lang="less">
.sys-depart {
	&_main {
		&_add {
			margin-bottom: 10px;
		}
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
					科室名称：
				</span>
				<Input v-model="searchParam.dpname" placeholder="请选择科室"></Input>
				</Col>
				<Col span="6">
				<span>
					类型：
				</span>
				<Select v-model="searchParam.types" placeholder="请选择类型" style="width:200px">
					<Option v-for="item in typeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
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
				<span>
					状态：
				</span>
				<Select v-model="searchParam.iUse" placeholder="请选择状态" style="width:200px">
					<Option v-for="item in statusList" :value="item.value" :key="item.value">{{ item.label }}</Option>
				</Select>
				</Col>
			</Row>
			<div class="sys-depart_main_add">
				<Button @click="getData" type="primary">查询</Button>
				<Button @click="addData" type="info">新增科室</Button>
			</div>
			<div class="sys-depart_main_list">
				<Table border :columns="config" :data="dataList"></Table>
			</div>
			<Row class="sys-depart_main_page">
				<Page :page-size="pageSize" :total="totalPage" :current="searchParam.page" show-elevator style="float:right" @on-change="changePage"></Page>
			</Row>
		</div>
		<Modal v-model="modal" :title="title">
			<Form ref="formData" class="sys-depart_main_form" :model="formData" :rules="validate.depart" :label-width="80">
				<FormItem label="科室名称" prop="name">
					<Input v-model="formData.name" placeholder="请输入科室名称"></Input>
				</FormItem>
				<FormItem label="排序" prop="paixu">
					<Input v-model="formData.paixu" placeholder="请输入序号"></Input>
				</FormItem>
				<FormItem label="类型" prop="types">
					<Select v-model="formData.types" placeholder="请选择类型">
						<Option value=0>门诊</Option>
						<Option value=1>住院</Option>
					</Select>
				</FormItem>
				<FormItem label="方案匹配" prop="mType">
					<Select v-model="formData.mType" placeholder="请选择方案">
						<Option value=0>疾病</Option>
						<Option value=1>医生</Option>
					</Select>
				</FormItem>
				<FormItem label="状态" prop="state">
					<Select v-model="formData.state" placeholder="请选择状态">
						<Option value=0>正常</Option>
						<Option value=1>禁用</Option>
					</Select>
				</FormItem>
				<FormItem label="备注" prop="remark">
					<Input v-model="formData.remark" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请填写备注"></Input>
				</FormItem>
			</Form>
			<div slot="footer" class="sys-depart_main_btnList">
				<Button type="primary" @click="submitDepart">确认</Button>
			</div>
		</Modal>
		<Modal v-model="modalexit" title="编辑科室">
			<Form ref="currentData" class="sys-depart_main_form" :model="currentData" :rules="validate.depart" :label-width="80">
				<FormItem label="科室名称" prop="name">
					<Input v-model="currentData.name" placeholder="请输入科室名称"></Input>
				</FormItem>
				<FormItem label="排序" prop="paixu">
					<Input v-model="currentData.paixu" placeholder="请输入序号"></Input>
				</FormItem>
				<FormItem label="类型" prop="type">
					<Select v-model="currentData.type" placeholder="请选择类型">
						<Option value=0 >门诊</Option>
						<Option value=1 >住院</Option>
					</Select>
				</FormItem>
				<FormItem label="方案匹配" prop="matchType">
					<Select v-model="currentData.matchType" placeholder="请选择方案">
						<Option value=0 >疾病</Option>
						<Option value=1 >医生</Option>
					</Select>
				</FormItem>
				<FormItem label="状态" prop="isUse">
					<Select v-model="currentData.isUse" placeholder="请选择状态">
						<Option value=0 >正常</Option>
						<Option value=1 >禁用</Option>
					</Select>
				</FormItem>
				<FormItem label="备注" prop="remark">
					<Input v-model="currentData.remark" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请填写备注"></Input>
				</FormItem>
			</Form>
			<div slot="footer" class="sys-depart_main_btnList">
				<Button type="primary" @click="changeDepart">确认</Button>
			</div>
		</Modal>
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
			pageSize:10,
			totalPage: 10,//总页码
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
			statusList: [{
				value: "",
				label: "全部"
			}, {
				value: 0,
				label: "正常"
			}, {
				value: 1,
				label: "禁用"
			},],//状态选项列表
			formData: {
				name: "",
				paixu: 0,
				types: "0",
				mType: "0",
				state: "0",
				remark: "",//备注
			},
			currentData:{

			},
			//模态窗title
			title: "新增科室",
			modal: false,
			modalexit:false,
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
					title: '添加时间',
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
							}, '编辑'),
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
		 * 添加新科室第一步
		 */
		addData() {
			this.modal = true;
		},
		/** 
         * 获取所有数据
         */
		getData() {
			API.Systems.listDepart(this.searchParam).then((res) => {
				this.totalPage = res.data.totalRow;
				this.pageSize=res.data.pageSize;
				this.dataList = res.data.result;
			}).catch((err) => {

			});
		},
		/** 
		 * 科室搜索
		 */
		searchResult() {
			this.searchParam.page = 1;
			this.getData();
		},
		/** 
         * 重置所有属性
         */
		handleReset(name) {
			this.$refs[name].resetFields();
		},
        /** 
         * 删除科室
         */
		delDepart(id) {
			let self = this;
			this.$Modal.confirm({
				title: '删除设置',
				content: '确定删除该系统设置？',
				onOk: () => {
					API.Systems.delDepart({
						id: id
					}).then((res) => {
						self.$Message.success("删除成功");
						self.getData();
					}).catch((err) => {

					});
				}
			});

		},
        /** 
         * 编辑科室
         */
		editDepart(data) {
			this.modalexit = true;
			this.currentData = JSON.parse(JSON.stringify(data));
			this.currentData.isUse=this.currentData.isUse?"0":"1";
			this.currentData.matchType=this.currentData.matchType+"";
			this.currentData.type=this.currentData.type+"";

		},
        /** 
         * 提交添加
         */
		submitDepart() {
			this.$refs['formData'].validate((valid) => {
				if (valid) {
					API.Systems.addDepart(this.formData).then((res) => {
						this.$Message.success("添加成功");
						this.modal = false;
						this.getData();
					}).catch((err) => {

					});
				} else {
					this.$Message.error('补全信息!');
				}

			})
		},
		/** 
		 * 提交修改
		 */
		changeDepart(){
			this.$refs['currentData'].validate((valid) => {
				if (valid) {
					API.Systems.editDepart({
						id: this.currentData.id,
						name:this.currentData.name,
						paixu:this.currentData.paixu-0,
						types:this.currentData.type-0,
						mType:this.currentData.matchType-0,
						state:this.currentData.isUse-0,
					}).then((res) => {
						this.$Message.success("修改成功");
						this.modalexit = false;
						this.getData();
					}).catch((err) => {

					});
				} else {
					this.$Message.error('补全信息!');
				}

			})
		},
        /** 
         * 分页更改
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


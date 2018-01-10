<style lang="less">
.creatNotice {
	height: 100%;
	padding: 5px;
	box-sizing: border-box;
	border-radius: 5px;
	&_main {
		.ivu-alert-info {
			border: 1px solid #fadad2;
			background-color: #fdece9
		}
		.ivu-alert-info .ivu-alert-icon {
			color: #e6451e
		}
		height: 100%;
		&_sendDataTitle {
			font-size: 15px;
			color: #2d8cf0;
			padding-bottom: 15px;
		}
		&_form {
			width: 520px;
			height: 600px;
		}
		&_success {
			width: 500px;
			margin: 0 auto;
			.ivu-icon {
				color: #2d8cf0;
				font-size: 100px;
				margin: 0 auto;
				display: block;
				text-align: center;
				margin-bottom: 10px;
			}
			button {}
		}
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
				.ivu-input-number{
					&:last-of-type{
						
					}
					border-radius: 0;
					.ivu-input-number-input{
						border-radius: 0;
					}
				}
			}
		}
		&_step {
			background-color: #fff;
			margin-bottom: 15px;
			padding: 25px 15px;
			box-sizing: border-box;
			border-radius: 5px;
		}
		&_box {
			background-color: #fff;
			border-radius: 5px;
			padding: 15px;
			box-sizing: border-box;
		}
		&_table {

			.ivu-tabs-nav-scroll {
				display: none;
			}
			.ivu-tabs-bar {
				display: none;
			}
		}
		&_page {
			margin-top: 10px;
		}
		&_listBox {
			box-sizing: border-box;
			padding: 15px;
			border-radius: 3px;
			background-color: #f1f1f1;
			margin-bottom: 15px;
			&:after {
				content: "";
				display: block;
				clear: both;
			}
		}
		&_modal {
			.ivu-modal-body {
				height: 300px;
				overflow-y: auto;
			}
		}
	}
}
</style>


<template>
	<div class="creatNotice">
		<Modal width="700" class="creatNotice_main_modal" :styles="{height:'500px', overflowY:'auto'}" v-model="patModal" title="已选患者列表">
			<Table border :columns="patConfig" :data="addList"></Table>
		</Modal>
		<div class="creatNotice_main">
			<div class="creatNotice_main_step">
				<Steps :current="step=='step_one'?0:step=='step_two'?1:2">
					<Step title="选择发起人和随访患者"></Step>
					<Step title="选择方案"></Step>
					<Step title="发起通知"></Step>
				</Steps>
			</div>
			<div class="creatNotice_main_box">
				<Tabs v-model="step" class="creatNotice_main_table">
					<TabPane label="标签一" name="step_one">
						<h3 class="creatNotice_main_sendDataTitle">
							选择发起人
						</h3>
						<Row class="creatNotice_main_search" :gutter="15">
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
							<Select @on-change="doctorChange" v-model="doctorobj">
								<Option v-for="item in doctorList" :value="item.realname+','+item.id" :key="item.id">{{item.realname}}</Option>
							</Select>
							</Col>
						</Row>
						<Alert show-icon>选择具体医生仅表示发起人，不作为筛选患者的条件之一</Alert>
						<h3 class="creatNotice_main_sendDataTitle">
							选择接收随访患者
						</h3>
						<Row class="creatNotice_main_search" :gutter="15">
							<Col span="6">
							<span>
								患者姓名：
							</span>
							<Input type="text" v-model="searchParams.brxm" placeholder="请输入患者姓名"></Input>
							</Col>
							<Col span="6">
							<span>
								性别
							</span>
							<Select v-model="searchParams.brxb">
								<Option value="" >全部</Option>
								<Option value="男" >男</Option>
								<Option value="女" >女</Option>
							</Select>
							</Col>
							<Col span="6">
							<span>
								年龄范围
							</span>
							<InputNumber :max="searchParams.ageEnd" :min="0" v-model="searchParams.ageBegin"></InputNumber>
							<InputNumber :max="100" :min="searchParams.ageBegin" v-model="searchParams.ageEnd"></InputNumber>
							</Col>
							<Col span="6">
								<span>
									疾病类型
								</span>
								<Select v-model="searchParams.diseaseId" filterable remote not-found-text="" :remote-method="remoteMethod" clearable>
									<Option v-for="(item, index) in diseaseList" :value="item.id" :key="index">{{item.name}}</Option>
								</Select>
								</Col>
						</Row>
						<div class="creatNotice_main_add">
							<Button @click="searchParams.pager=1;getData()" style="margin-right:10px" type="primary">搜索</Button>
							<Badge :count="addList.length">
								<Button @click="patModal=true" type="info">已添加患者</Button>
							</Badge>
						</div>
						<Alert show-icon>已添加过的患者无法重复添加，您可在已添加患者列表里进行删除操作</Alert>
						<div class="creatNotice_main_list">
							<Table border ref="selection" :columns="config" :data="dataList"></Table>
						</div>
						<Row class="creatNotice_main_page">
							<Button @click="addAll">添加当前页</Button>
							<Button @click="nextStep" type="primary">下一步选择方案</Button>
							<Page :total="totalPage" :current="searchParams.pager" show-elevator style="float:right" @on-change="changePage"></Page>
						</Row>
					</TabPane>
					<TabPane label="标签二" name="step_two">
						<div class="creatNotice_main_listBox">
							<Row class="creatNotice_main_search" :gutter="15">
								<Col span="6">
								<span>
									科室名称：
								</span>
								<Select v-model="patParams.departmentId">
									<Option v-for="item in departList" :value="item.id" :key="item.id">{{item.name}}</Option>
								</Select>
								</Col>
								<Col span="6">
								<span>
									疾病类型
								</span>
								<Select v-model="patParams.diseaseId" filterable remote not-found-text="" :remote-method="remoteMethod" clearable>
									<Option v-for="(item, index) in diseaseList" :value="item.id" :key="index">{{item.name}}</Option>
								</Select>
								</Col>
								<Col span="6">
								<Button @click="patParams.pager=1;getPlanList()" type="primary">搜索</Button>
								</Col>
							</Row>
							<Table border :columns="planConfig" :data="planList"></Table>
							<Page :total="patTotalPage" :current="patParams.pager" show-elevator style="float:right;margin-top:10px;" @on-change="patChangePage"></Page>
						</div>
						<Button @click="returnStep(1)" style="margin-right:10px">返回上一步</Button>
					</TabPane>
					<TabPane label="标签三" name="step_three">
						<Form ref="sendData" class="creatNotice_main_form" :model="sendData" :rules="validate.sendData" :label-width="100">
							<FormItem label="通知计划名称" prop="taskName" style="width:450px;">
								<Input v-model="sendData.taskName" placeholder="请填写计划名称" style="width: 435px"></Input>
							</FormItem>
							<FormItem label="发起人"  style="width:450px;">
								<Input disabled v-model="sendData.admin" style="width: 435px"></Input>
							</FormItem>
							<FormItem label="发起人号码" prop="mobile" style="width:450px;">
								<Input v-model="sendData.mobile" style="width: 435px" placeholder="请填写发起人号码"></Input>
							</FormItem>
							<FormItem label="已选方案" style="width:450px;">
								<Input disabled v-model="sendData.schemeName" style="width: 435px" placeholder="请选择计划"></Input>
							</FormItem>
							<FormItem label="通知起止时间"  style="width:450px;">
								<DatePicker @on-change="dateChange" type="datetimerange" format="yyyy-MM-dd HH:mm:ss" placeholder="请选择通知起止时间" style="width: 435px"></DatePicker>
							</FormItem>
							<FormItem label="通知简介" prop="remark" style="width:450px;">
								<Input type="textarea" v-model="sendData.remark" style="width: 435px" placeholder="请填写通知简介"></Input>
							</FormItem>
							<FormItem>
								<Button @click="returnStep(2)" style="margin-right:10px">返回上一步</Button>
								<Button type="primary" @click="handleSave()">发起通知</Button>
							</FormItem>
						</Form>
						<!-- <div class="creatNotice_main_success">
								<Icon type="checkmark-circled"></Icon>
								<Alert type="success">恭喜你，发起通知成功</Alert>
								<Button type="success">查看通知进度</Button>
							</div> -->
					</TabPane>
				</Tabs>
			</div>
		</div>
	</div>
</template>

<script>
import { API } from '@/services';
export default {
	data() {
		return {
			timeobj: {
				date: "",
				time: "",
			},
			step: "step_one",
			departId: "",//科室id
			doctorobj: "",//医生数据
			//搜索选项
			searchParams: {
				pager: 1,//当前页码
				brxm: '',//患者姓名
				limit: 10,//每页条数
				adminId: "",
				diseaseId:[],//疾病id，多个用英文逗号分开（可选）
				brxb:"",     //性别：男,女
				ageBegin:0, //年龄开始（可选）
    			ageEnd:200   //年龄结束（可选）
			},
			/** 
			 * 方案请求数据
			 */
			patParams: {
				pager: 1, //当前页码
				limit: 10,//每页条数
				departmentId: "",
				diseaseId: "", //疾病类型（可选）
				activeType: 1 //方案类型：0，表示随访方案；1，表示通知方案（可选）
			},
			sendData: {
				schemeId: "", //方案id
				schemeName: "", //方案名称
				mobile: "",  //发起人专属服务号码
				visitStartTime: "",//通知开始时间
				visitEndTime:"",//通知结束时间
				taskName:"", //通知计划名称 
				hzxxIds: [],  //患者id
				remark:""    
			},
			departList: [],//科室选项列表
			doctorList: [],//医生选项列表
			diseaseList: [],//疾病列表
			addList: [],//已经添加的用户
			totalPage: 10,//总页数
			patTotalPage: 10,
			patModal: false,//已选患者列表显示
			planConfig: [
				{
					title: '方案名称',
					key: 'name'
				},
				{
					title: '疾病类型',
					key: 'diseaseName'
				},
				{
					title: '科室',
					key: 'departmentName'
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
								on: {
									click: () => {
										this.selectAction(params.row);
									}
								}
							}, '选则该方案'),
						]);
					}
				}
			],
			planList: [

			],
			patConfig: [
				{
					title: '姓名',
					key: 'brxm'
				},
				{
					title: '性别',
					key: 'brxb'
				},
				{
					title: '年龄',
					key: 'age'
				},
				{
					title: '民族',
					key: 'mz'
				},
				
				{
					title: '居住地址',
					key: 'xzzQtdz'
				},
				{
					title: '家庭电话',
					key: 'jtdh'
				},
				{
					title: '操作',
					key: 'action',
					width: 100,
					align: 'center',
					render: (h, params) => {
						return h('div', [
							h('Button', {
								props: {
									type: 'warning',
									size: 'small'
								},
								on: {
									click: () => {
										this.removePat(params.index);
									}
								}
							}, "移除"),
						]);
					}
				}
			],
			//数据列表配置
			config: [
				{
					title: '姓名',
					key: 'brxm'
				},
				{
					title: '性别',
					key: 'brxb'
				},
				{
					title: '年龄',
					key: 'age'
				},
				{
					title: '民族',
					key: 'mz'
				},
				{
					title: '疾病类型',
					key: 'diseaseName'
				},
				{
					title: '居住地址',
					key: 'xzzQtdz'
				},
				{
					title: '家庭电话',
					key: 'jtdh'
				},
				{
					title: '操作',
					key: 'action',
					width: 100,
					align: 'center',
					render: (h, params) => {
						return h('div', [
							h('Button', {
								props: {
									type: params.row.isAdd == 1 ? 'dashed' : 'primary',
									size: 'small'
								},
								on: {
									click: () => {
										if (params.row.isAdd != 1) {
											this.addPat(params.row, params.index);
										}
									}
								}
							}, params.row.isAdd == 1 ? "已添加" : '添加'),
						]);
					}
				}


			],
			//列表数据,必须使用缓存数据方式
			dataList: [],
		}
	},
	methods: {
		/** 
		 * 发起通知
		 */
		handleSave() {
			this.$refs["sendData"].validate((valid) => {
				if(!valid){
					return false;
				}
				if (this.sendData.visitEndTime == "" || this.sendData.visitStartTime == "") {
					this.$Message.warning("请填写具体随访发起时间");
					return false;
				}
				this.$Modal.confirm({
					title: '发起随访',
					content: '确定要发起随访吗?',
					onOk: () => {
						for (let item of this.addList) {
							this.sendData.hzxxIds.push(item.id);
						}
						let ajaxData=JSON.parse(JSON.stringify(this.sendData));
						/* delete ajaxData.admin;
						delete ajaxData.adminId; */
						API.Notice.createNotice(ajaxData).then((res) => {
							this.$Message.success("发起成功");
							setTimeout(()=> {
								this.$router.push("/notice/viewNotice");
							}, 1000);
						}).catch((err) => {

						});

					},
				})
			});
		},
		/** 
		 * 获取随访方案
		 */
		getPlanList() {
			API.followWay.list(this.patParams).then((res) => {
				this.planList = res.data
				this.patTotalPage = res.total
			}).catch((error) => {
				console.log(error)
			})
		},
		/** 
		 * 获取科室列表
		 */
		getDepartList() {
			API.Systems.listDisDepart().then((res) => {
				this.departList = res.data;
				this.departList.splice(0,0,{
					id:"",
					name:'全部'
				});
				this.getDoctorList();
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
		doctorChange(){
			this.sendData.admin = this.doctorobj.split(",")[0];
			this.sendData.adminId = this.doctorobj.split(",")[1];
		},
		/** 
		 * 获取列表数据,搜索接口
		 */
		getData() {
			/** 
			 * id 赋值
			 */
			API.Notice.listPlan(this.searchParams).then((res) => {
				this.dataList = this.formData(res.data);
				this.totalPage = res.total;
			}).catch((err) => {

			});
		},
		/** 
		 * 数据格式化
		 */
		formData(data) {
			for (let item of data) {
				for (let ite of this.addList) {
					if (item.id == ite.id) {
						item.isAdd = 1;
					}
				}
			}
			return data;
		},
		/** 
		 * 下一步
		 */
		nextStep() {
			if (this.addList.length == 0) {
				this.$Message.warning("您尚未添加任何患者");
				return false;
			}
			if (this.sendData.admin == "") {
				this.$Message.warning("您未选择默认发起人");
				return false;
			}
			
			this.step = "step_two";
		},
		/** 
		 * 全选或者全部取消-
		 */
		addAll() {
			for (let index = 0; index < this.dataList.length; index++) {
				if (this.dataList[index].isAdd != 1) {
					this.addPat(this.dataList[index], index);
				}
			}
		},
		/** 
		 * 日期改变
		 */
		dateChange(date) {
			this.sendData.visitStartTime=date[0];
			this.sendData.visitEndTime=date[1];
		},
		/** 
		 * 添加患者
		 */
		addPat(data, index) {
			/* for (let item of addList) {
				if(item.id==data.id){
					this.$Message
					return false;
				}		
			} */
			let copyData = JSON.parse(JSON.stringify(data));
			copyData.isAdd = 1;
			this.dataList.splice(index, 1, copyData);
			this.addList.push(copyData);
		},
		/** 
		 * 移除已选患者
		 */
		removePat(index) {
			this.addList.splice(index, 1);
			for (let item of this.dataList) {
				let flag = 0;
				for (let ite of this.addList) {
					if (item.id == ite.id) {
						flag++;
						item.isAdd = 1;
					}
				}
				if (flag == 0) {
					item.isAdd = 0;
				}
			}
			this.dataList = JSON.parse(JSON.stringify(this.dataList));
		},
		/** 
		 * 页码改变
		 */
		changePage(index) {
			this.searchParams.pager = index;
			this.getData();
		},
		/** 
		 * 患者列表页码更改
		 */
		patChangePage(index) {
			this.patParams.pager = index;
			this.getPlanList();
		},
		/** 
		 * 选择具体方案
		 */
		selectAction(data) {
			this.step = "step_three";
			this.sendData.schemeId = data.id;
			this.sendData.schemeName = data.name;
		},
		/** 
		 * 返回上一步
		 */
		returnStep(index) {
			if (index == 1) {
				this.step = "step_one";
			} else {
				this.step = "step_two";
			}
		},
		/**  
		 * 疾病远程搜索
		 */
		remoteMethod(query) {
			if (query.trim() == "") {
				return false;
			}
			API.followProblems.disease({
				zjm: query
			}).then((res) => {
				this.diseaseList = res.data;
			}).catch((error) => {
			})
		},
	},
	mounted() {
		/** 
		 * 获取科室列表
		 */
		this.getDepartList();
		this.getPlanList();
		this.getData();
	}
}
</script>


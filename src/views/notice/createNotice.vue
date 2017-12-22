<style lang="less">
.creatNotice {
	height: 100%;
	padding: 5px;
	box-sizing: border-box;
	border-radius: 5px;
	&_main {
		height: 100%;
		&_form{
			width: 520px;
			height: 600px;
			margin-left: 50px;
			margin-top: 40px;
		}
		&_success{
			width: 500px;
			margin: 0 auto;
			.ivu-icon{
				color: #2d8cf0;
				font-size: 100px;
				margin: 0 auto;
				display: block;
				text-align: center;
				margin-bottom: 10px;
			}
			button{
			}
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
			}
		}
		&_step {
			background-color: #fff;
			margin-bottom: 15px;
			padding: 25px 15px;
			box-sizing: border-box;
			border-radius: 5px;
		}
		&_box{
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
	}
}
</style>


<template>
	<div class="creatNotice">
		<div class="creatNotice_main">
			<div class="creatNotice_main_step">
				<Steps :current="step=='step_one'?0:step=='step_two'?1:2">
					<Step title="选择用户"></Step>
					<Step title="选择方案"></Step>
					<Step title="发起通知"></Step>
				</Steps>
			</div>
			<div class="creatNotice_main_box">
				<Tabs v-model="step" class="creatNotice_main_table">
				<TabPane label="标签一" name="step_one">
					<Row class="creatNotice_main_search" :gutter="15">
						<Col span="6">
						<span>
							科室名称：
						</span>
						<Select v-model="searchParams.depart">
							<Option v-for="item in departList" :value="item.val" :key="item.id">{{item.title}}</Option>
						</Select>
						</Col>
						<Col span="6">
						<span>
							医生：
						</span>
						<Select v-model="searchParams.doctor">
							<Option v-for="item in doctorList" :value="item.val" :key="item.id">{{item.title}}</Option>
						</Select>
						</Col>
						<Col span="6">
						<span>
							患者姓名：
						</span>
						<Input type="text" v-model="searchParams.patient" placeholder="请输入患者姓名"></Input>
						</Col>
						<Col span="6">
						<span>
							疾病类型：
						</span>
						<Select v-model="searchParams.type">
							<Option v-for="item in doctorList" :value="item.val" :key="item.id">{{item.title}}</Option>
						</Select>
						</Col>
					</Row>
					<div class="creatNotice_main_add">
						<Button @click="getData" type="primary">查询</Button>
						<!-- <Badge :count="addList.length">
							<Button @click="patList" type="info">已添加患者</Button>
						</Badge> -->
					</div>
					<Alert type="warning">如果不选择具体患者则视为默认选中您的所有患者</Alert>
					<div class="creatNotice_main_list">
						<Table border @on-selection-change="patChange" ref="selection" :columns="config" :data="dataList"></Table>
					</div>
					<Row class="creatNotice_main_page">
						<Button @click="handleSelectAll(true)">全选当前页</Button>
						<Button @click="handleSelectAll(false)">取消</Button>
						<Button @click="handleSelectAll(false)" type="primary">下一步选择方案</Button>
						<Page :total="totalPage" :current="page" show-elevator style="float:right" @on-change="changePage"></Page>
					</Row>
				</TabPane>
				<TabPane label="标签二" name="step_two">
					<Table border :columns="planConfig" :data="planList"></Table>
					<Form ref="notice" class="creatNotice_main_form" :model="notice" :rules="validate.notice" :label-width="100">
						<FormItem label="已选计划" prop="name" style="width:450px;">
							<Input v-model="notice.name" style="width: 435px" placeholder="已选计划名称"></Input>
						</FormItem>
						<FormItem label="通知起止时间" prop="time" style="width:450px;">
							<DatePicker :value="notice.time" format="yyyy/MM/dd" type="daterange" placement="bottom-end" placeholder="Select date" style="width: 435px"></DatePicker>
						</FormItem>
						<FormItem label="公司简介" prop="desc" style="width:600px;">
							<Input v-model="notice.desc" type="textarea" style="width: 435px" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入公司简介"></Input>
						</FormItem>
						<FormItem>
							<Button @click="returnStep" style="margin-right:10px">返回上一步</Button>
							<Button type="primary" @click="handleSave()">通知</Button>
						</FormItem>
					</Form>
				</TabPane>
				<TabPane label="标签三" name="step_three">
					<div class="creatNotice_main_success">
						<Icon type="checkmark-circled"></Icon>
						<Alert type="success">恭喜你，发起通知成功</Alert>
						<Button type="success">查看通知进度</Button>
					</div>
				</TabPane>
			</Tabs>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			step: "step_one",
			//搜索选项
			searchParams: {
				depart: '',//科室
				doctor: '',//医生
				patient: '',//患者姓名
				type: '',//疾病类型
			},
			departList: [],//科室选项列表
			doctorList: [],//医生选项列表
			addList: [],//已经添加的用户
			page:1,//当前页码
			totalPage:10,//总页数
			modal: false,
			//通知内容
			notice:{
				name:"",
				time:"",
				desc:"",
			},
			planConfig: [
				{
					title: '方案名称',
					key: 'username'
				},
				{
					title: '方案类型',
					key: 'time'
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
				{
					role: "医生",
					username: "1245786",
					time: "2017-11-30 11:08:30",
					action: "随访测试",
					name: "测试",
					mobile: 14578884125,
					look: 1,
				},
				{
					role: "医生",
					username: "1245786",
					time: "2017-11-30 11:08:30",
					action: "随访测试",
					name: "测试",
					mobile: 14578884125,
					look: 1,
				},
				{
					role: "医生",
					username: "1245786",
					time: "2017-11-30 11:08:30",
					action: "随访测试",
					name: "测试",
					mobile: 14578884125,
					look: 1,
				},
				{
					role: "医生",
					username: "1245786",
					time: "2017-11-30 11:08:30",
					action: "随访测试",
					name: "测试",
					mobile: 14578884125,
					look: 1,
				}
			],
			//数据列表配置
			config: [
				{
					type: 'selection',
					width: 60,
					align: 'center'
				},
				{
					title: '姓名',
					key: 'username'
				},
				{
					title: '性别',
					key: 'time'
				},
				{
					title: '上次就诊时间',
					key: 'time'
				},
				{
					title: '单位名称',
					key: 'time'
				},
				{
					title: '民族',
					key: 'time'
				},
				
			],
			//列表数据,必须使用缓存数据方式
			dataList: []
		}
	},
	methods: {
		patChange(selection){
			this.copyAction=selection;
		},
		/** 
		 * 全选或者全部取消
		 */
		handleSelectAll(status) {
			this.$refs.selection.selectAll(status);
		},
		/** 
		 * 添加患者
		 */
		addpat() {

		},
		show(index) {
			this.$Modal.info({
				title: 'User Info',
				content: `Name：${this.dataList[index].name}<br>Age：${this.dataList[index].age}<br>Address：${this.dataList[index].address}`
			})
		},
		remove(index) {
			this.dataList.splice(index, 1);
		},
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
		/** 
		 * 查看已添加的患者
		 */
		patList() {

		},
		/** 
		 * 选择具体方案
		 */
		selectAction(data) {

		},
		/** 
		 * 返回上一步
		 */
		returnStep(){
			this.step="step_one";
		}
	}
}
</script>


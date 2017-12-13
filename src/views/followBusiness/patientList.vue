<style lang="less">
.patientSearch {
	background: #fff;
	form {
		.ivu-form-item {
			margin-bottom: 0;
			padding: 20px 0;
			width: 240px;
			.ivu-form-item-label:before {
				content: ''
			}
		}
	}
	.patientList {
		padding: 10px;
	}
	.pages {
		.ivu-page {
			float: right;
			padding: 10px 20px 10px 0;
		}
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
.patientInfo .ivu-modal .ivu-modal-content {
	.ivu-modal-header {
		.ivu-modal-header-inner,
		.ivu-modal-header p {
			font-size: 16px;
			color: #1c2432;
			font-weight: normal;
		}
	}
	.ivu-modal-footer {
		display: none;
	}
}

.infoRow {
	.infoCol12 {
		height: 65px;
		padding: 0px 20px!important;
		.info {
			width: 442px;
			height: 65px;
			border: 1px solid #DCEBF7;
			.info-row {
				.info1 {
					width: 110px;
					height: 32px;
					float: left;
					line-height: 32px;
					color: #336199;
					background-color: #EDF3F4;
					text-align: right;
					padding-right: 10px;
				}
				.info2 {
					width: 330px;
					height: 32px;
					float: left;
					line-height: 32px;
					padding-left: 15px;
				}
			}
		}
	}
	.infoCol24 {
		background: #f9f9f9;
		padding: 15px;
		.infoRow2 {
			.sfCol4 {
				.counts {
					width: 80px;
					height: 80px;
					color: #fff;
					border-radius: 10px;
					line-height: 1.5;
					background: #2a8bcb;
					padding-top: 10px;
					text-align: center;
					.suifang {
						font-size: 28px;
					}
					.sfCounts {
						font-size: 14px;
					}
				}
			}
			.sfCol20 {
				h3 {
					padding: 20px 0 10px 0;
					font-size: 24px;
					font-weight: normal;
					line-height: 24px;
				}
				.sfTime {
					span {
						color: #FF892A;
					}
				}
			}
		}
	}
} //编辑
.editInfo .ivu-modal .ivu-modal-content {
	.ivu-modal-header {
		.ivu-modal-header-inner,
		.ivu-modal-header p {
			font-size: 16px;
			color: #1c2432;
			font-weight: normal;
		}
	}
	.ivu-modal-body {
		padding: 32px 132px;
	}
	.ivu-modal-footer {
		display: none;
	}
}

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
<template>
	<Row class="patientSearch">
		<!-- 搜索栏 -->
		<Col span="24" class="patientSearch">
		<Form :label-width="80" inline>
			<FormItem label="患者编号">
				<Input type="text" v-model="searchParams.code" placeholder="请输入患者编号"></Input>
			</FormItem>
			<FormItem label="患者姓名">
				<Input type="text" v-model="searchParams.user" placeholder="请输入患者姓名"></Input>
			</FormItem>
			<FormItem>
				<Button type="primary" @click="getData">查询</Button>
			</FormItem>
		</Form>
		</Col>
		<!-- 表格 -->
		<Col span="24" class="patientList">
		<Table border :columns="config" :data="dataList"></Table>
		</Col>
		<!-- 分页 -->
		<Col span="24" class="pages">
		<Page :total="totalPage" show-elevator @on-change="changePage" show-total></Page>
		</Col>
		<!-- 详情模态框 -->
		<Modal v-model="patientDetail" title="患者信息" class-name="patientInfo" :styles="{top: '180px'}" width="1000">
			<Row class="infoRow">
				<Col span="12" class="infoCol12 mb12">
				<div class="info">
					<div class="info-row">
						<div class="info1 bb1">姓名</div>
						<div class="info2 bdx1">薛卫国</div>
					</div>
					<div class="info-row">
						<div class="info1">性别</div>
						<div class="info2">男</div>
					</div>
				</div>
				</Col>
				<Col span="12" class="infoCol12 mb12">
				<div class="info">
					<div class="info-row">
						<div class="info1 bb1">电话</div>
						<div class="info2 bdx1">15225099945</div>
					</div>
					<div class="info-row">
						<div class="info1">地址</div>
						<div class="info2">杭州市下城区</div>
					</div>
				</div>
				</Col>
				<Col span="12" class="infoCol12 mb12">
				<div class="info">
					<div class="info-row">
						<div class="info1 bb1">年龄</div>
						<div class="info2 bdx1">52</div>
					</div>
					<div class="info-row">
						<div class="info1">民族</div>
						<div class="info2">维吾尔族</div>
					</div>
				</div>
				</Col>
				<Col span="24" class="infoCol24">
				<Row class="infoRow2">
					<Col span="4" class="sfCol4">
					<div class="counts">
						<p class="suifang">随访</p>
						<p class="sfCounts">69天</p>
					</div>
					</Col>
					<Col span="20" class="sfCol20">
					<h3 class="sfName">薛卫国</h3>
					<p class="sfTime mb12">
						<span>2017年09月28日18点05分</span>随访</p>
					<Row>
						<Col span="12">
						<p>是否知道全科医生签约服务:
							<span>是</span>
						</p>
						<p>对他(她)的服务是否满意:
							<span>是</span>
						</p>
						<p>医生意见:
							<span>是</span>
						</p>
						</Col>
						<Col span="12">
						<p>是否知道自己的签约医生:
							<span>是</span>
						</p>
						<p>是否经常在我中心就诊:
							<span>不太来</span>
						</p>
						</Col>
					</Row>
					</Col>
				</Row>
				</Col>
			</Row>
		</Modal>
		<!-- 编辑功能模态框 -->
		<Modal v-model="patientText" title="编辑患者信息" class-name="editInfo" :styles="{top: '180px'}" width="800">
			<Form ref="formCustom" :model="formCustom" :rules="validate" :label-width="80">
				<FormItem label="姓名">
					<span v-model="formCustom.ptNa">{{formCustom.ptNa}}</span>
				</FormItem>
				<FormItem label="电话" prop="ptPhone">
					<Input v-model="formCustom.ptPhone" placeholder="请输入电话号码"></Input>
				</FormItem>
				<FormItem label="住址" prop="ptAdd">
					<Input type="text" v-model="formCustom.ptAdd" placeholder="请输入住址"></Input>
				</FormItem>
				<FormItem label="邮编" prop="ptYb">
					<Input type="text" v-model="formCustom.ptYb" placeholder="请输入邮编"></Input>
				</FormItem>
				<FormItem label="联系人姓名" prop="ptName">
					<Input type="text" v-model="formCustom.ptName" placeholder="请输入联系人姓名"></Input>
				</FormItem>
				<FormItem label="联系人关系" prop="ptRe">
					<Input type="text" v-model="formCustom.ptRe" placeholder="请输入联系人关系"></Input>
				</FormItem>
				<FormItem label="联系地址" prop="ptDz">
					<Input type="text" v-model="formCustom.ptDz" placeholder="请输入联系人地址"></Input>
				</FormItem>
				<FormItem label="联系电话" prop="ptDh">
					<Input type="text" v-model="formCustom.ptDh" placeholder="请输入联系人电话号码"></Input>
				</FormItem>
				<FormItem label="单位名称" prop="ptDe">
					<Input type="text" v-model="formCustom.ptDe" placeholder="请输入单位名称"></Input>
				</FormItem>
				<FormItem>
					<Button type="primary" style="margin-left: 110px;" @click="submitData">提交</Button>
					<Button type="ghost" style="margin-left: 8px" @click="handleReset('formCustom')" >重置</Button>
				</FormItem>
			</Form>
		</Modal>
	</Row>
</template>

<script>
export default {
	data() {
		return {
			//搜索条件对象
			searchParams: {
				code:'',//患者编号
				user: '',//患者姓名
			},
			page:1,//当前页码
			totalPage:100,//总页数
			//当前被点击患者，编辑和详情按钮触发时更换数据
			currentData:{},
			//详情模态框
			patientDetail: false,
			//编辑模态框
			patientText: false,
			//编辑功能form数据,暂时未知必填信息，字段未知
			formCustom: {
				ptNa: '薛卫国',//姓名
				ptPhone: '',//电话
				ptAdd: '',//地址
				ptYb: '',//邮编
				ptName: '',//联系人名
				ptRe: '',//联系人关系
				ptDz: '',//联系地址
				ptDh: '',//联系电话
				ptDe: ''//单位名称
			},
			//表格数据
			dataList: [
				{
					name: 'John Brown',
					age: 18,
					address: 'New York No. 1 Lake Park'
				},
				{
					name: 'Jim Green',
					age: 24,
					address: 'London No. 1 Lake Park'
				},
				{
					name: 'Joe Black',
					age: 30,
					address: 'Sydney No. 1 Lake Park'
				},
				{
					name: 'Jon Snow',
					age: 26,
					address: 'Ottawa No. 2 Lake Park'
				}
			],
			//表格配置
			config: [
				{
					title: '编号',
					key: 'age'
				},
				{
					title: '姓名',
					key: 'age'
				},
				{
					title: '民族',
					key: 'age'
				},
				{
					title: '出生年月',
					key: 'age'
				},
				{
					title: '性别',
					key: 'age'
				},
				{
					title: '家庭电话',
					key: 'age'
				},
				{
					title: '居住地址',
					key: 'age'
				},
				{
					title: '单位名称',
					key: 'address'
				},
				{
					title: 'Action',
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
										/* 传递相关的id，渲染完成后显示出模态框 */
										this.editPat(params.row);
									}
								}
							}, '编辑'),
							h('Button', {
								props: {
									type: 'info',
									size: 'small'
								},
								style: {
									marginRight: '5px'
								},
								on: {
									click: () => {
										this.getInfo(params.row);
									}
								}
							}, '详情'),
							h('Button', {
								props: {
									type: 'warning',
									size: 'small'
								},
								style: {

								},
								on: {
									click: () => {
										this.addFollow(params.row);
									}
								}
							}, '增加随访')
						]);
					}
				}],
			
			
		}
	},
	methods: {
		editPat(data){
			this.currentData=data;
			this.patientText = true;
		},
		/** 
		 * 查看患者详情
		 */
		getInfo(data){
			this.currentData=data;
			this.patientDetail = true;
		},
		/** 
		 * 修改患者信息
		 */
		submitData() {
			this.$refs[name].validate((valid) => {
				if (valid) {
					/** 
					 * 此处填写具体的ajax请求
					 */
					this.$Message.success('保存成功!');
				} else {
					this.$Message.error('请正确填写信息');
				}
			})
		},
		/** 
		 * 获取列表数据,搜索接口
		 */
		getData(){

		},
		/** 
		 * 页码改变
		 */
		changePage(index){
			this.page=index;
			this.getData();
		},
		/** 
		 * 增加随访
		 */
		addFollow(data){
			const id=data.id;
			/** 
			 * 此处填写具体页面跳转，携带id
			 */
			this.$route.push({
				path:"/",//替换成具体的地址
				query:{
					id:id,
				}
			})
		},
		/** 
         * 重置所有属性
         */
        handleReset(name) {
            this.$refs[name].resetFields();
        },
	},
	mounted () {
		this.getData();
	}
}
</script>


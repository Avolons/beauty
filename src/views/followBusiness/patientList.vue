<style lang="less">
@import "../../styles/jzda.less";
.patientSearch {
	border-radius: 5px;
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
}

//编辑
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
<template>
	<Row class="patientSearch">
		<!-- 搜索栏 -->
		<Row class="inter-down_main_search" :gutter="15">
			<Col span="6">
			<span>
				客户姓名：
			</span>
			<Input type="text" v-model.trim="searchParams.brxm" placeholder="请输入客户姓名"></Input>
			</Col>
			<Col span="6">
			<span>
				性别：
			</span>
			<Select v-model="searchParams.brxb">
				<Option v-for="item in statusList" :value="item.id" :key="item.id">{{item.name}}</Option>
			</Select>
			</Col>
			<Col span="6">
			<span>
				出生年月：
			</span>
			<DatePicker @on-change="timeChange_one" type="daterange" split-panels placeholder="请选择出生年月" style="width: 300px"></DatePicker>
			</Col>
			<Col span="6" style="height:32px;">
			<span>
				联系电话：
			</span>
			<Input type="text" v-model.trim="searchParams.jtdh" placeholder="请输入联系电话"></Input>
			</Col>
			<Col span="6" style="height:32px;margin-top:10px">
			<span>
				居住地址：
			</span>
			<Input type="text" v-model.trim="searchParams.qtdz" placeholder="请输入居住地址"></Input>
			</Col>
			<Col span="6" style="height:32px;margin-top:10px">
			<span>
				导入时间
			</span>
			<DatePicker @on-change="timeChange_two" type="daterange" placeholder="请选择导入时间"></DatePicker>
			</Col>
			<Col span="6">
			<Button type="primary" @click="searchParams.pager=1;getData()" style="margin-top: 10px;">查询</Button>
			</Col>
		</Row>
		<!-- 表格 -->
		<Col span="24">
		<Table border :columns="config" :data="dataList" :loading="createLoading"></Table>
		</Col>
		<!-- 分页 -->
		<Col span="24" class="pages">
		<Page :total="totalPage" :current="searchParams.pager" show-elevator @on-change="changePage" show-total></Page>
		</Col>
		<!-- 详情模态框 -->
		<Modal v-model="patientDetail" title="客户信息" class-name="patientInfo" :styles="{top: '36px'}" width="1000">
			<Row class="infoRow">
				<Col span="12" class="info-col mb12">
				<div class="info">
					<div class="info-row">
						<div class="info-one bb1">姓名</div>
						<div class="info-two bdx1">{{currentData.brxm}}</div>
					</div>
					<div class="info-row">
						<div class="info-one">性别</div>
						<div class="info-two">{{currentData.brxb}}</div>
					</div>
				</div>
				</Col>
				<Col span="12" class="info-col mb12">
				<div class="info">
					<div class="info-row">
						<div class="info-one bb1">电话</div>
						<div class="info-two bdx1">{{currentData.jtdh}}</div>
					</div>
					<div class="info-row">
						<div class="info-one">地址</div>
						<div class="info-two">{{currentData.xzzQtdz}}</div>
					</div>
				</div>
				</Col>
				<Col span="12" class="info-col mb12">
				<div class="info">
					<div class="info-row">
						<div class="info-one bb1">年龄</div>
						<div class="info-two bdx1">{{currentData.age}}</div>
					</div>
					<div class="info-row">
						<div class="info-one">民族</div>
						<div class="info-two">{{currentData.mz}}</div>
					</div>
				</div>
				</Col>
				<Col span="12" class="info-col mb12">
				<div class="info">
					<div class="info-row">
						<div class="info-one bb1">出生年月</div>
						<div class="info-two bdx1">{{currentData.csny?currentData.csny.slice(0,10): ''}}</div>
					</div>
					<div class="info-row">
						<div class="info-one">单位</div>
						<div class="info-two">{{currentData.dwmc}}</div>
					</div>
				</div>
				</Col>
				<Col span="12" class="info-col mb12">
				<div class="info">
					<div class="info-row">
						<div class="info-one bb1">紧急联系人</div>
						<div class="info-two bdx1">{{currentData.lxrm}}</div>
					</div>
					<div class="info-row">
						<div class="info-one">关系</div>
						<div class="info-two">{{currentData.lxgx}}</div>
					</div>
				</div>
				</Col>
				<Col span="12" class="info-col mb12">
				<div class="info">
					<div class="info-row">
						<div class="info-one bb1">联系地址</div>
						<div class="info-two bdx1">{{currentData.lxdz}}</div>
					</div>
					<div class="info-row">
						<div class="info-one">联系电话</div>
						<div class="info-two">{{currentData.lxdh}}</div>
					</div>
				</div>
				</Col>
				<!-- 门诊 -->
				<Col span="24" class="info-co-public" v-if="mjzData.length" v-for="item,index in mjzData" :key="index">
				<Row class="infoRow2">
					<Col span="4" class="sfCol4">
					<div class="counts">
						<p class="suifang">门诊</p>
					</div>
					</Col>
					<Col span="20" class="sfCol20">
					<h3 class="sfName">{{currentData.brxm}}</h3>
					<Row>
						<Col span="12">
						<span>就诊卡号:</span>
						<span>{{currentData.jzkh}}</span>
						</Col>
						<Col span="12">
						<span>客户性质:</span>
						<span>{{currentData.brxz}}</span>
						</Col>
						<Col span="12">
						<span>就诊时间:</span>
						<span>{{item.jzrq}}</span>
						</Col>
						<Col span="12">
						<span>是否初诊:</span>
						<span>44</span>
						</Col>
						<Col span="12">
						<span>就诊科室:</span>
						<span>{{item.ksmc}}</span>
						</Col>
						<Col span="12">
						<span>就诊医生:</span>
						<span>{{item.ysxm}}</span>
						</Col>
						<Col span="12">
						<span>主诉:</span>
						<span>{{item.zs}}</span>
						</Col>
						<Col span="12">
						<span>诊断:</span>
						<span>{{item.zdmc}}</span>
						</Col>
					</Row>
					</Col>
				</Row>
				</Col>
				<!-- 住院 -->
				<Col span="24" class="info-co-public" v-if="zyData.length" v-for="item1,index1 in zyData" :key="index1">
				<Row class="infoRow2">

					<Col span="4" class="sfCol4">
					<div class="counts">
						<p class="suifang">住院</p>
					</div>
					</Col>
					<Col span="20" class="sfCol20">
					<h3 class="sfName">{{currentData.brxm}}</h3>
					<Row>
						<Col span="12">
						<span>住院号:</span>
						<span>{{item1.zyhm}}</span>
						</Col>
						<Col span="12">
						<span>客户性质:</span>
						<span>{{currentData.brxz}}</span>
						</Col>
						<Col span="12">
						<span>入院时间:</span>
						<span>{{item1.admissiontime}}</span>
						</Col>
						<Col span="12">
						<span>出院时间:</span>
						<span>{{item1.leavetime}}</span>
						</Col>
						<Col span="12">
						<span>入院科别:</span>
						<span>{{item1.departname}}</span>
						</Col>
						<Col span="12">
						<span>主治医生:</span>
						<span>{{item1.doctorname}}</span>
						</Col>
						<Col span="12">
						<span>入院诊断:</span>
						<span>{{item1.admissiondiagnose}}</span>
						</Col>
						<Col span="12">
						<span>出院诊断:</span>
						<span>{{item1.leavediagnose}}</span>
						</Col>
						<Col span="12">
						<span>入院情况:</span>
						<span>{{item1.admissiondescription}}</span>
						</Col>
						<Col span="12">
						<span>出院情况:</span>
						<span>{{item1.leavedescription}}</span>
						</Col>
					</Row>
					</Col>
				</Row>
				</Col>
			</Row>
		</Modal>
		<!-- 编辑功能模态框 -->
		<Modal v-model="patientText" :mask-closable="false" title="编辑客户信息" class-name="patientInfo" :styles="{top: '36px'}" width="1000">
			<!-- 门诊 -->
			<Row class="infoRow">
				<Form ref="formCustom" :model="formCustom" :rules="validate.patList" :label-width="80">
					<Col span="12">
					<FormItem label="姓名" prop="brxm">
						<Input v-model="formCustom.brxm"></Input>
					</FormItem>
					</Col>
					<Col span="12">
					<FormItem label="性别" prop="brxb">
						<Input v-model="formCustom.brxb"></Input>
					</FormItem>
					</Col>
					<Col span="12">
					<FormItem label="民族" prop="mz">
						<Input v-model="formCustom.mz"></Input>
					</FormItem>
					</Col>
					<Col span="12">
					<FormItem label="年龄">
						<InputNumber :max="150" :min="0" v-model="formCustom.age"></InputNumber>
					</FormItem>
					</Col>
					<Col span="12">
					<FormItem label="联系电话" prop="jtdh">
						<Input v-model="formCustom.jtdh" placeholder="请输入联系电话"></Input>
					</FormItem>
					</Col>
					<Col span="12">
					<FormItem label="出生年月">
						<DatePicker :value="formCustom.csny" type="date" placeholder="Select date" style="width: 400px" @on-change="csnyChange"></DatePicker>
					</FormItem>
					</Col>
					<Col span="12">
					<FormItem label="住址" prop="xzzQtdz">
						<Input v-model="formCustom.xzzQtdz" placeholder="请输入住址"></Input>
					</FormItem>
					</Col>
					<Col span="12">
					<FormItem label="单位" prop="dwmc">
						<Input v-model="formCustom.dwmc" placeholder="请输入单位"></Input>
					</FormItem>
					</Col>
					<Col span="12">
					<FormItem label="紧急联系人" prop="lxrm">
						<Input v-model="formCustom.lxrm" placeholder="请输入紧急联系人"></Input>
					</FormItem>
					</Col>
					<Col span="12">
					<FormItem label="关系" prop="lxgx">
						<Input v-model="formCustom.lxgx" placeholder="请输入与紧急联系人关系"></Input>
					</FormItem>
					</Col>
					<Col span="12">
					<FormItem label="联系地址" prop="lxdz">
						<Input v-model="formCustom.lxdz" placeholder="请输入紧急联系人地址"></Input>
					</FormItem>
					</Col>
					<Col span="12">
					<FormItem label="联系电话" prop="lxdh">
						<Input v-model="formCustom.lxdh" placeholder="请输入紧急联系人电话"></Input>
					</FormItem>
					</Col>
					<Col span="24" :style="{textAlign:'right',margin: '10px 0'}">
					<Button type="primary" @click="submitData('formCustom')">保存</Button>
					</Col>
				</Form>
				<Col span="24" class="info-co-public" v-if="mjzData.length" v-for="item,index in mjzData" :key="index">
				<Row class="infoRow2">
					<Col span="4" class="sfCol4">
					<div class="counts">
						<p class="suifang">门诊</p>
					</div>
					</Col>
					<Col span="20" class="sfCol20">
					<h3 class="sfName">{{currentData.brxm}}</h3>
					<Row>
						<Col span="12">
						<span>就诊卡号:</span>
						<span>{{currentData.jzkh}}</span>
						</Col>
						<Col span="12">
						<span>客户性质:</span>
						<span>{{currentData.brxz}}</span>
						</Col>
						<Col span="12">
						<span>就诊时间:</span>
						<span>{{item.jzrq}}</span>
						</Col>
						<Col span="12">
						<span>是否初诊:</span>
						<span>44</span>
						</Col>
						<Col span="12">
						<span>就诊科室:</span>
						<span>{{item.ksmc}}</span>
						</Col>
						<Col span="12">
						<span>就诊医生:</span>
						<span>{{item.ysxm}}</span>
						</Col>
						<Col span="12">
						<span>主诉:</span>
						<span>{{item.zs}}</span>
						</Col>
						<Col span="12">
						<span>诊断:</span>
						<span>{{item.zdmc}}</span>
						</Col>
					</Row>
					</Col>
				</Row>
				</Col>
				<!-- 住院 -->
				<Col span="24" class="info-co-public" v-if="zyData.length" v-for="item1,index1 in zyData" :key="index1">
				<Row class="infoRow2">
					<Col span="4" class="sfCol4">
					<div class="counts">
						<p class="suifang">住院</p>
					</div>
					</Col>
					<Col span="20" class="sfCol20">
					<h3 class="sfName">{{currentData.brxm}}</h3>
					<Row>
						<Col span="12">
						<span>住院号:</span>
						<span>{{item1.zyhm}}</span>
						</Col>
						<Col span="12">
						<span>客户性质:</span>
						<span>{{currentData.brxz}}</span>
						</Col>
						<Col span="12">
						<span>入院时间:</span>
						<span>{{item1.admissiontime}}</span>
						</Col>
						<Col span="12">
						<span>出院时间:</span>
						<span>{{item1.leavetime}}</span>
						</Col>
						<Col span="12">
						<span>入院科别:</span>
						<span>{{item1.departname}}</span>
						</Col>
						<Col span="12">
						<span>主治医生:</span>
						<span>{{item1.doctorname}}</span>
						</Col>
						<Col span="12">
						<span>入院诊断:</span>
						<span>{{item1.admissiondiagnose}}</span>
						</Col>
						<Col span="12">
						<span>出院诊断:</span>
						<span>{{item1.leavediagnose}}</span>
						</Col>
						<Col span="12">
						<span>入院情况:</span>
						<span>{{item1.admissiondescription}}</span>
						</Col>
						<Col span="12">
						<span>出院情况:</span>
						<span>{{item1.leavedescription}}</span>
						</Col>
					</Row>
					</Col>
				</Row>
				</Col>
			</Row>
		</Modal>
	</Row>
</template>

<script>
import { API } from '@/services';
export default {
	data() {
		return {
			createLoading: true,			//loading动画 加载中
			//搜索条件对象
			searchParams: {
				brxm: '',//客户姓名
				brxb: '',//客户性别
				jtdh: '',//联系电话
				qtdz: '',//户主地址
				csnyBegin: '',//出生年月（可选） 不用时分秒
				csnyEnd: '',//出生年月（可选） 不用时分秒
				sourceTimeBegin: '',//导入开始日期（可选） 不用时分秒
				sourceTimeEnd: '',///导入结束日期（可选） 不用时分秒
				pager: 1,//当前页码
				limit: 10,//每页条数
			},
			statusList: [{//性别
				name: "全部",
				id: ""
			}, {
				name: "男",
				id: "男"
			}, {
				name: "女",
				id: "女"
			}],
			totalPage: 100,//总页数
			currentData: {}, //当前被点击客户，编辑和详情按钮触发时更换数据
			mjzData: [],//门急诊信息
			zyData: [],//住院信息
			patientDetail: false,//详情模态框
			patientText: false,//编辑模态框
			formCustom: { //编辑功能form数据,暂时未知必填信息，字段未知
				id: '',
				brxm: '', //姓名
				brxb: '',//性别
				mz: '',//民族
				sfzh: '',//身份证号
				jtdh: '',//电话
				xzzQtdz: '',//地址
				lxrm: '',//联系人名
				lxgx: '',//联系人关系
				lxdz: '',//联系地址
				lxdh: '',//联系电话
				dwmc: '',//单位名称
				csny: '',//出生年月
			},
			dataList: [], //表格数据
			config: [     //表格配置
				{
					title: '序号',
					type: 'index',
					align: 'center'
				},
				{
					title: '客户姓名',
					key: 'brxm',
					align: 'center'
				},
				{
					title: '性别',
					key: 'brxb',
					align: 'center'
				},
				{
					title: '民族',
					key: 'mz',
					align: 'center'
				},
				{
					title: '出生年月',
					key: 'csny',
					align: 'center'
				},
				{
					title: '联系电话',
					key: 'jtdh',
					align: 'center'
				},
				{
					title: '居住地址',
					key: 'xzzQtdz',
					align: 'center'
				},
				{
					title: '导入时间',
					key: 'sourcetime',
					align: 'center'
				},
				{
					title: '操作',
					key: 'action',
					width: 150,
					align: 'center',
					render: (h, params) => {   // render函数
						return h('div', [
							h('Button', {
								props: {
									type: 'primary',
									size: 'small'
								},
								'class': {
									menuHide: this.menuShow(this.AM.FollowBussiness.savePat)
								},
								style: {
									marginRight: '5px'
								},
								on: {
									click: () => {
										/* 传递相关的id，渲染完成后显示出模态框 */
										this.editPat(params.row);
										this.getInfo(params.row.id)
									}
								}
							}, '编辑'),
							h('Button', {
								props: {
									type: 'info',
									size: 'small'
								},
								'class': {
									menuHide: this.menuShow(this.AM.FollowBussiness.detailPat)
								},
								style: {
									marginRight: '5px'
								},
								on: {
									click: () => {
										this.getInfo(params.row.id);
										this.patientDetail = true;
									}
								}
							}, '详情')
						]);
					}
				}],
		}
	},
	methods: {
		/**
		 * 出生年月select
		 * @function 出生年月
		 */
		timeChange_one(date) {
			this.searchParams.csnyBegin = date[0];
			this.searchParams.csnyEnd = date[1];
		},
		/**
		 * 导入时间select
		 * @function 出生年月
		 */
		timeChange_two(date) {
			this.searchParams.sourceTimeBegin = date[0];
			this.searchParams.sourceTimeEnd = date[1];
		},
		/** 
		 * 获取列表数据,搜索接口
		 * @function getData
		 * @param {searchParams} 搜索列表
		 */
		getData() {
			API.FollowBussiness.listPat(this.searchParams).then((res) => {
				this.dataList = res.data;
				this.totalPage = res.total;
				this.createLoading = false;
			}).catch((err) => {
				//弹出错误信息
				this.$Message.error(err);
			});
		},
		/**
		 * 点击编辑按钮
		 */
		editPat(data) {
			this.formCustom = JSON.parse(JSON.stringify(data));
			this.patientText = true;
		},
		/**
		 * 编辑出生年月
		 */
		csnyChange(value) {
			this.formCustom.csny = value
		},
		/** 
		 * 查看客户详情
		 */
		getInfo(id) {
			API.FollowBussiness.detailPat({
				id: id
			}).then((res) => {
				if (res.data.mjzs.length) {
					this.mjzData = res.data.mjzs
				}
				if (res.data.cyxjs.length) {
					this.zyData = res.data.cyxjs
				}
				this.currentData = res.data;
			}).catch((err) => {
				//弹出错误信息
				this.$Message.error(err);

			});
		},
		/** 
		 * 修改客户信息
		 */
		submitData(name) {
			this.$refs[name].validate((valid) => {
				if (valid) {
					/* 属于新增状态 */
                    /** 
					 * 此处填写具体的ajax请求
					 */
					this.$Spin.show();
					API.FollowBussiness.savePat({
						id: this.formCustom.id,
						brxm: this.formCustom.brxm,
						brxb: this.formCustom.brxb,
						age: this.formCustom.age,
						mz: this.formCustom.mz,
						jtdh: this.formCustom.jtdh,
						xzzQtdz: this.formCustom.xzzQtdz,
						lxrm: this.formCustom.lxrm,
						lxdh: this.formCustom.lxdh,
						lxgx: this.formCustom.lxgx,
						lxdz: this.formCustom.lxdz,
						dwmc: this.formCustom.dwmc,
						csny: this.formCustom.csny,
					}).then((res) => {
						this.$Message.success("编辑成功");
						this.getData();
						this.patientText = false;
						this.$Spin.hide();
					}).catch((err) => {
						//弹出错误信息
						this.$Spin.hide();
						this.$Message.error(err);
					});
				} else {
					this.$Message.error('补全信息!');
				}

			})

		},
		/** 
		 * 页码改变
		 */
		changePage(index) {
			this.searchParams.pager = index;
			this.getData();
		},
		/** 
		 * 增加随访
		 */
		addFollow(data) {
			const id = data.id;
			/** 
			 * 此处填写具体页面跳转，携带id
			 */
			this.$route.push({
				path: "/",//替换成具体的地址
				query: {
					id: id,
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
	mounted() {
		this.getData();
	}
}
</script>


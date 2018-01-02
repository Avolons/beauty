<style lang="less">
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
				患者编号
			</span>
			<Input type="text" v-model="searchParams.brid" placeholder="请输入患者编号"></Input>
			</Col>
			<Col span="6">
			<span>
				患者姓名
			</span>
			<Input type="text" v-model="searchParams.brxm" placeholder="请输入患者姓名"></Input>
			</Col>
			<Col span="6">
			<Button type="primary" @click="getData">查询</Button>
			</Col>
		</Row>
		<!-- 表格 -->
		<Col span="24" >
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
						<div class="info2 bdx1">{{currentData.brxm}}</div>
					</div>
					<div class="info-row">
						<div class="info1">性别</div>
						<div class="info2">{{currentData.brxb}}</div>
					</div>
				</div>
				</Col>
				<Col span="12" class="infoCol12 mb12">
				<div class="info">
					<div class="info-row">
						<div class="info1 bb1">电话</div>
						<div class="info2 bdx1">{{currentData.lxdh}}</div>
					</div>
					<div class="info-row">
						<div class="info1">地址</div>
						<div class="info2">{{currentData.xzzQtdz}}</div>
					</div>
				</div>
				</Col>
				<Col span="12" class="infoCol12 mb12">
				<div class="info">
					<div class="info-row">
						<div class="info1 bb1">年龄</div>
						<div class="info2 bdx1">{{currentData.age}}</div>
					</div>
					<div class="info-row">
						<div class="info1">民族</div>
						<div class="info2">{{currentData.mz}}</div>
					</div>
				</div>
				</Col>
				<Col span="24" class="infoCol24">
				<Row class="infoRow2" v-for="item in currentData.logs" :key="item.id">
					<Col span="4" class="sfCol4">
					<div class="counts">
						<p class="suifang">{{item.type}}</p>
					</div>
					</Col>
					<Col span="20" class="sfCol20">
					<h3 class="sfName">{{currentData.brxm}}</h3>
					<p class="sfTime mb12">
						<span>{{item.dateAdd}}</span> {{item.title}}</p>
					<Row>
						<Col v-for="ite,index in item.jsonData" span="12" :key="index">
						<p>
							{{ite}}
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
			<Form ref="formCustom" :model="formCustom" :rules="validate.formCustom" :label-width="80">
				<FormItem label="姓名">
					<span v-model="formCustom.ptNa">{{formCustom.brxm}}</span>
				</FormItem>
				<FormItem label="手机号码" prop="jtdh">
					<Input v-model="formCustom.jtdh" placeholder="请输入电话号码"></Input>
				</FormItem>
				<FormItem label="住址" prop="xzzQtdz">
					<Input type="text" v-model="formCustom.xzzQtdz" placeholder="请输入住址"></Input>
				</FormItem>
				<FormItem label="邮编" prop="xzzYb">
					<Input type="text" v-model="formCustom.xzzYb" placeholder="请输入邮编"></Input>
				</FormItem>
				<FormItem label="联系人姓名" prop="lxrm">
					<Input type="text" v-model="formCustom.lxrm" placeholder="请输入联系人姓名"></Input>
				</FormItem>
				<FormItem label="联系人关系" prop="lxgx">
					<Input type="text" v-model="formCustom.lxgx" placeholder="请输入联系人关系"></Input>
				</FormItem>
				<FormItem label="联系人地址" prop="lxdz">
					<Input type="text" v-model="formCustom.lxdz" placeholder="请输入联系人地址"></Input>
				</FormItem>
				<FormItem label="联系人手机" prop="lxdh">
					<Input type="text" v-model="formCustom.lxdh" placeholder="请输入联系人电话号码"></Input>
				</FormItem>
				<FormItem label="单位名称" prop="dwmc">
					<Input type="text" v-model="formCustom.dwmc" placeholder="请输入单位名称"></Input>
				</FormItem>
				<FormItem>
					<Button type="primary" style="margin-left: 110px;" @click="submitData('formCustom')">提交</Button>
					<Button type="ghost" style="margin-left: 8px" @click="handleReset('formCustom')">重置</Button>
				</FormItem>
			</Form>
		</Modal>
	</Row>
</template>

<script>
import { API } from '@/services';
export default {
	data() {
		return {
			//搜索条件对象
			searchParams: {
				brid: '',//患者编号
				brxm: '',//患者姓名
				pager: 1,//当前页码
				limit: 10,//每页条数
			},
			totalPage: 100,//总页数
			//当前被点击患者，编辑和详情按钮触发时更换数据
			currentData: {

			},
			//详情模态框
			patientDetail: false,
			//编辑模态框
			patientText: false,
			//编辑功能form数据,暂时未知必填信息，字段未知
			formCustom: {
				brxm: '',//姓名
				jtdh: '',//电话
				xzzQtdz: '',//地址
				xzzYb: '',//邮编
				lxrm: '',//联系人名
				lxgx: '',//联系人关系
				lxdz: '',//联系地址
				lxdh: '',//联系电话
				dwmc: ''//单位名称
			},
			//表格数据
			dataList: [

			],
			//表格配置
			config: [
				{
					title: '编号',
					key: 'brid'
				},
				{
					title: '姓名',
					key: 'brxm'
				},
				{
					title: '民族',
					key: 'mz'
				},
				{
					title: '出生年月',
					key: 'csny'
				},
				{
					title: '性别',
					key: 'brxb'
				},
				{
					title: '家庭电话',
					key: 'jtdh'
				},
				{
					title: '居住地址',
					key: 'xzzQtdz'
				},
				{
					title: '单位名称',
					key: 'dwmc'
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
								'class':{
									menuHide:this.menuShow(this.AM.FollowBussiness.savePat)
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
								'class':{
									menuHide:this.menuShow(this.AM.FollowBussiness.detailPat)
								},
								style: {
									marginRight: '5px'
								},
								on: {
									click: () => {
										this.getInfo(params.row.id);
									}
								}
							}, '详情')
						]);
					}
				}],


		}
	},
	methods: {
		editPat(data) {
			this.formCustom = JSON.parse(JSON.stringify(data));
			this.patientText = true;
		},
		/** 
		 * 查看患者详情
		 */
		getInfo(id) {
			API.FollowBussiness.detailPat({
				id: id
			}).then((res) => {
				for (let item of res.data.logs) {
					item.jsonData = item.jsonData.replace(/"/g, '');
					item.jsonData = item.jsonData.replace("{", '');
					item.jsonData = item.jsonData.replace("}", '');
					item.jsonData = item.jsonData.split(",");
				}
				this.currentData = res.data;
			}).catch((err) => {

			});
			this.patientDetail = true;
		},
		/** 
		 * 修改患者信息
		 */
		submitData(name) {
			this.$refs[name].validate((valid) => {
				if (valid) {
					/** 
					 * 此处填写具体的ajax请求
					 */
					API.FollowBussiness.savePat(this.formCustom).then((res) => {
						this.$Message.success("编辑成功");
						this.getData();
						this.patientText = false;
					}).catch((err) => {

					});
				} else {
					this.$Message.error('请正确填写信息');
				}
			})
		},
		/** 
		 * 获取列表数据,搜索接口
		 */
		getData() {
			API.FollowBussiness.listPat(this.searchParams).then((res) => {
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


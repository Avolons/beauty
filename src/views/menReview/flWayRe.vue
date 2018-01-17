<style lang="less">
@import "../../styles/jzda.less";
.follPass {
	&_message{
		height: 450px;
		overflow-y: auto;
	}
	&_message_vemark {
		text-indent: 0;
		display: block;
		textarea {
			border: none;
			outline: none;
		}
	}
	&_single {
		&_ai {
			padding-right: calc(50% + 10px);
			box-sizing: border-box;
			font-size: 0;
			.ivu-icon {
				font-size: 20px;
				margin-right: 10px;
				width: 20px;
				margin-top: 5px;
			}
			span {
				display: inline-block;
				background-color: #d9edf7;
				border-radius: 4px;
				padding: 5px;
				font-size: 13px;
				box-sizing: border-box;
				vertical-align: top;
				width: calc(~"100% - 30px");
			}
		}
		&_patInner {
			width: 100%;
			float: left;
			background-color: #d9edf7;
			border:1px solid #d9edf7;
			border-radius: 4px;
			font-size: 13px;
			padding: 2px;
			box-sizing: border-box;
			margin-top: 5px;
			clear: both;
			>h3 {
				font-size: 14px;
				font-weight: 400;
			}
			>h4 {
				font-weight: 400;
				margin: 5px 0;
			}
		}
		&_pat {
			padding-left: calc(50% + 10px);
			box-sizing: border-box;
			.ivu-icon {
				font-size: 20px;
				margin-left: 10px;
				width: 20px;
				margin-top: 10px;
				float: right;
			}

			>span {
				display: block;
				float: left;
				background-color: #d9edf7;
				border-radius: 4px;
				font-size: 13px;
				padding: 5px;
				box-sizing: border-box;
				width: calc(~"100% - 30px");
				audio {
					display:block;
					width: 100%;
					margin: 0;
				}
			}
			&:after {
				content: "";
				display: block;
				clear: both;
			}
		}
		&_abnormal{
			>span{
				background-color: #ffdede;
			}
			.follPass_main_patInner{
				background-color: #ffdede;
			}
			audio{
				background-color: #ff8181;
			}
		}
	}
	&_table {
		width: 100%;
		table {
			width: 100%;
			border: 1px solid #dadada;
			border-collapse: collapse;
		}
		tr {
			height: 25px;
			line-height: 25px;
			font-size: 13px;
			&:nth-of-type(odd) {
				background-color: #f7f7f7;
			}
		}
		td {
			text-indent: 5px;
			width: 25%
		}
	}
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
			<!-- 搜索 -->
			<Row class="sys-depart_main_search" :gutter="15">
				<Col span="6">
				<span>
					随访编号
				</span>
				<Input type="text" v-model="searchParam.orderNo" placeholder="请输入随访编号"></Input>
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
				<Select @on-change="getDoctorList" v-model="departId">
					<Option v-for="item in departList" :value="item.id" :key="item.id">{{item.name}}</Option>
				</Select>
				</Col>
				<Col span="6">
				<span>
					医生：
				</span>
				<Select @on-change="getPlan" v-model="searchParam.adminId">
					<Option v-for="item in doctorList" :value="item.id" :key="item.id">{{item.realname}}</Option>
				</Select>
				</Col>
				<Col span="6">
				<span>
					方案匹配：
				</span>
				<Select v-model="searchParam.schemeId" placeholder="请选择方案" style="width:200px">
					<Option v-for="item in actionList" :value="item.id" :key="item.id">{{ item.name }}</Option>
				</Select>
				</Col>

				<Col span="6">
				<Button @click="searchParam.pager=1;getData()" type="primary">查询</Button>
				</Col>
			</Row>
			<!-- 表格 -->
			<div class="sys-depart_main_list">
				<Table border :columns="config" :data="dataList"></Table>
			</div>
			<!-- 分页 -->
			<Row class="sys-depart_main_page">
				<Page :page-size="pageSize" :total="totalPage" :current="searchParam.pager" show-elevator style="float:right" @on-change="changePage"></Page>
			</Row>
			<!-- 随访模态框 -->
			<Modal v-model="modal" title="随访详情" width="950" class-name="" :styles="{top:'50px'}">
				<Collapse v-model="showAll">
					<Panel name="1">
						随访结果
						<div slot="content" class="follPass_table">
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
										<Input type="textarea" class="follPass_message_vemark" v-model="planInfo.vetRemark" placeholder="请输入您的审核意见"></Input>
									</td>
								</tr>
							</table>
							<Form :model="zzsfForm" ref="zzsfForm" :rules="zzsfFormRule" :label-width="60">
								<FormItem label="终止随访">
			            <RadioGroup v-model="zzsfForm.radio" @on-change="radioChange">
		                <Radio label="1">是</Radio>
		                <Radio label="0">否</Radio>
			            </RadioGroup>
				        </FormItem>
			          <FormItem label="原因"  prop="select" style="text-align:left;" v-if="zzsfForm.radio == 1">
			            <Select v-model="zzsfForm.select" style="width: 50%;" @on-change="xzReason">
			                <Option value="1">死亡</Option>
			                <Option value="2">拒绝随访</Option>
			                <Option value="3">随访方案重复</Option>
			                <Option value="4">方案不匹配</Option>
			                <Option value="5">其他</Option>
			            </Select>
			          </FormItem>
			          <FormItem label="详情" prop="textarea" style="text-align:left;" v-if="zzsfForm.radio == 1">
			            <Input v-model="zzsfForm.textarea" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请详细说明情况" style="width: 50%;"></Input>
			          </FormItem>
			        </Form>
						</div>
					</Panel>
					<Panel name="2">
						记录详情
						<ul slot="content" class="follPass_message">
							<template v-for="item in planInfo.orderReplyQuestions">
								<li class="follPass_single_ai">
									<Icon type="android-call"></Icon>
									<span>
										{{item.question}}
									</span>
								</li>
								<li class="follPass_single_pat" :class="{'follPass_single_abnormal':item.abnormal}">
									<span>
										<audio controls :src="item.audio"></audio>
									</span>
									<Icon type="person"></Icon>

									<div class="follPass_single_patInner">
										<Input v-model="item.asr" placeholder="患者回复"></Input>
									</div>
									<div v-if="item.fieldName" class="follPass_single_patInner">
										<h3>指标：{{item.fieldName}}</h3>
										<h4>
											采集指标：
											<CheckboxGroup style="display: inline-block;" v-if="item.optionValues" v-model="item.fieldValue" @on-change="labeChange(item)">
												<Checkbox v-for="ite,index in item.optionValues" :key="index" :label="ite">
													<span>{{ite}}</span>
												</Checkbox>
											</CheckboxGroup>
											<Input v-else v-model="item.fieldValue" placeholder="采集指标"></Input>
										</h4>
										<h4>
											指标是否正常：
											<RadioGroup v-model="item.isNormal">
												<Radio label="1">
													<span>正常</span>
												</Radio>
												<Radio label="0">
													<span>不正常</span>
												</Radio>
											</RadioGroup>
										</h4>
									</div>
								</li>
							</template>
						</ul>
					</Panel>
				</Collapse>
				<div slot="footer" class="sys-sysset_main_btnList">
					<Button @click="submitData" type="primary">提交审核</Button>
				</div>
			</Modal>
		</div>
		<!-- 详情模态框 -->
    <Modal v-model="patientDetail" title="患者信息" class-name="patientInfo" :styles="{top: '36px'}" width="1000">
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
              <div class="info2 bdx1">{{currentData.jtdh}}</div>
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
        <Col span="12" class="infoCol12 mb12">
          <div class="info">
            <div class="info-row">
              <div class="info1 bb1">出生年月</div>
              <div class="info2 bdx1">{{currentData.csny}}</div>
            </div>
            <div class="info-row">
              <div class="info1">身份证号</div>
              <div class="info2">{{currentData.sfzh}}</div>
            </div>
          </div>
        </Col>
        <Col span="12" class="infoCol12 mb12">
          <div class="info">
            <div class="info-row">
              <div class="info1 bb1">紧急联系人</div>
              <div class="info2 bdx1">{{currentData.lxrm}}</div>
            </div>
            <div class="info-row">
              <div class="info1">关系</div>
              <div class="info2">{{currentData.lxgx}}</div>
            </div>
          </div>
        </Col>
        <Col span="12" class="infoCol12 mb12">
          <div class="info">
            <div class="info-row">
              <div class="info1 bb1">联系地址</div>
              <div class="info2 bdx1">{{currentData.lxdz}}</div>
            </div>
            <div class="info-row">
              <div class="info1">联系电话</div>
              <div class="info2">{{currentData.lxdh}}</div>
            </div>
          </div>
        </Col>
        <Col span="12" class="infoCol12 mb12">
          <div class="info" style="height: 32px;">
            <div class="info-row">
              <div class="info1 bdx1">单位</div>
              <div class="info2 bdx1">{{currentData.dwmc}}</div>
            </div>
          </div>
        </Col>
        <!-- 门诊 -->
        <Col span="24" class="infoCol24" v-if="mjzData.length" v-for="item,index in mjzData" :key="index">
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
                <span>就诊卡号:</span><span>{{currentData.jzkh}}</span>
              </Col>
              <Col span="12">
                <span>患者性质:</span><span>{{currentData.brxz}}</span>
              </Col>
              <Col span="12">
                <span>就诊时间:</span><span>{{item.jzrq}}</span>
              </Col>
              <Col span="12">
                <span>是否初诊:</span><span>44</span>
              </Col>
              <Col span="12">
                <span>就诊科室:</span><span>{{item.ksmc}}</span>
              </Col>
              <Col span="12">
                <span>就诊医生:</span><span>{{item.ysxm}}</span>
              </Col>
              <Col span="12">
                <span>主诉:</span><span>{{item.zs}}</span>
              </Col>
              <Col span="12">
                <span>诊断:</span><span>{{item.zdmc}}</span>
              </Col>
            </Row>
            </Col>
          </Row>
        </Col>
        <!-- 住院 -->
        <Col span="24" class="infoCol24" v-if="zyData.length" v-for="item1,index1 in zyData" :key="index1">
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
                <span>住院号:</span><span>{{item1.zyhm}}</span>
              </Col>
              <Col span="12">
                <span>患者性质:</span><span>{{currentData.brxz}}</span>
              </Col>
              <Col span="12">
                <span>入院时间:</span><span>{{item1.admissiontime}}</span>
              </Col>
              <Col span="12">
                <span>出院时间:</span><span>{{item1.leavetime}}</span>
              </Col>
              <Col span="12">
                <span>入院科别:</span><span>{{item1.departname}}</span>
              </Col>
              <Col span="12">
                <span>主治医生:</span><span>{{item1.doctorname}}</span>
              </Col>
              <Col span="12">
                <span>入院诊断:</span><span>{{item1.admissiondiagnose}}</span>
              </Col>
              <Col span="12">
                <span>出院诊断:</span><span>{{item1.leavediagnose}}</span>
              </Col>
              <Col span="12">
                <span>入院情况:</span><span>{{item1.admissiondescription}}</span>
              </Col>
              <Col span="12">
                <span>出院情况:</span><span>{{item1.leavedescription}}</span>
              </Col>
            </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </Modal>
     <!-- 终止随访 -->
    <Modal v-model="zzsfModel" class-name="zzsfModel" width="480px">
      <p slot="header" style="color:#ed3f14;text-align:center;font-size:16px;">
        <span>终止{{sfrName}}所有随访</span>
      </p>
      <div style="text-align:center">
        <Form :model="zzsfForm" ref="zzsfForm" :rules="zzsfFormRule" :label-width="80">
          <FormItem label="原因"  prop="select" style="text-align:left;">
            <Select v-model="zzsfForm.select" style="width: 80%;" @on-change="xzReason">
                <Option value="1">死亡</Option>
                <Option value="2">拒绝随访</Option>
                <Option value="3">随访方案重复</Option>
                <Option value="4">方案不匹配</Option>
                <Option value="5">其他</Option>
            </Select>
          </FormItem>
          <FormItem label="详情" prop="textarea" style="text-align:left;">
            <Input v-model.trim="zzsfForm.textarea" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请详细说明情况" style="width: 80%;"></Input>
          </FormItem>
          <FormItem>
            <Button type="primary" @click="zzsfCancel('zzsfForm')">取消</Button>
            <Button type="ghost" @click="zzsfOk('zzsfForm')" style="margin-left: 8px">提交</Button>
          </FormItem>
        </Form>
      </div>
      <div slot="footer">
      </div>
    </Modal>
	</div>
</template>

<script>
import { API } from '../../services/index.js';
export default {
	data() {
		return {
			showAll:["1","2"],
			hzxxId:"",//患者id
			//搜索参数
			searchParam: {
				pager: 1, //当前页码
				limit: 10,//每页条数
				schemeId: "",//方案id（可选）
				orderNo: "",//编码（可选）
				brxm: "", //患者姓名（可选）
				adminId: "",  //医生id
				status: 2 ,  //状态为2（必传）
				isConceal:1
			},
			//随访结果详情
			planInfo: {
				orderReplyQuestions: [],
			},
			pageSize: 10,
			totalPage: 10,//总页码
			departList: [],//科室选项列表
			departId: "",//科室id
			doctorList: [],//医生选项列表
			planList:[],
			actionList: [],//随访方案列表
			formData: {
				name: "",
				paixu: 0,
				types: "0",
				mType: "0",
				state: "0",
				remark: "",//备注
			},
			//模态窗title
			modal: false,
			//表格配置
			config: [
				{
					title: '随访编号',
					key: 'orderNo',
				},
				{
					title: '患者姓名',
					key: 'brxm',
					render: (h, params)=>{
            return h('div', [
              h('span', {
                props: {
                    type: 'primary',
                    size: 'small'
                },
                style: {
                    borderBottom: '1px solid #5cadff',
                    color: '#5cadff'
                },
                on: {
                  click: () => {
                    this.getInfo(params.row.hzxxId);
                    this.patientDetail = true;
                  }
                }
              }, params.row.brxm),
            ])
          }
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
					title: '执行日期',
					key: 'dateBegin'
				},
				{
					title: '审核人',
					key: 'vetPerson'
				},
				{
					title: '审核日期',
					key: 'vetDate'
				},
				{
					title: '操作',
					key: 'action',
					width: 200,
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
								 'class': {
								menuHide: this.menuShow(this.AM.Data.saveResult)
								},
								on: {
									click: () => {
										this.editDepart(params.row.id)
									}
								}
							}, params.row.vetStatus == 0 ? '审核' : '重新审核'),
							// h('Button', {
							// 	props: {
							// 		type: 'warning',
							// 		size: 'small'
							// 	},
							// 	style: {
							// 		marginRight: '5px'
							// 	},
							// 	 'class': {
							// 	menuHide: this.menuShow(this.AM.Data.delResult)
							// 	},
							// 	on: {
							// 		click: () => {
							// 			this.delDepart(params.row.id)
							// 		}
							// 	}
							// }, '删除'),
							h('Button', {
                props: {
                  type: 'warning',
                  size: 'small'
                },
                style: {

                },
                'class':{
                  menuHide:this.menuShow(this.AM.FollowBussiness.delPlan)
                },
                on: {
                  click: () => {
                    this.zzsfFun(params.row.brxm, params.row.id)
                    this.$refs.zzsfForm.resetFields();
                  }
                }
              }, '终止随访')
						]);
					}
				}
			],
			//列表数据
			dataList: [],
			//当前被点击患者，编辑和详情按钮触发时更换数据
      currentData: {},
      //门急诊信息
      mjzData: [],
      //住院信息
      zyData: [],
      //详情模态框
      patientDetail: false,
      //终止随访
      zzsfModel: false,//弹框
      sfrName: '',//终止随访人姓名
      nowId: '',//终止随访人数据id
      zzsfForm: {
        select: '',//终止随访原因
        textarea: '',//终止随访备注
        radio: '0',
      },
      zzsfFormRule: {//终止随访form验证
        select: [
          { required: true, message: '请选择不通过原因', trigger: 'change' }
        ],
        textarea: [
          { required: true, message: '请输入详情', trigger: 'blur' },
        ]
      },
		}
	},
	methods: {
		/** 
		 * 获取方案
		 */
		getPlan(){
			if(!this.searchParam.adminId){
				return false;
			}
			API.Dataaudit.listDoctorPlan({
				id:this.searchParam.adminId
			}).then((res) => {
				this.actionList = res.data;
			}).catch((err) => {

			});		
		},
		labeChange(item) {
			/* 获取预警阈值 */
			let flag=0;
			for (let ite of item.thresholdValue) {
					for (let it of item.fieldValue) {
						if(it==ite){
							flag++;
						}
					}
			}
			if(flag>0){
				item.isNormal=0;
			}else{
				item.isNormal=1;
			}
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
		/** 
         * 获取所有数据
         */
		getData() {
			API.Dataaudit.listResult(this.searchParam).then((res) => {
				this.totalPage = res.total;
				this.dataList = res.data;
			}).catch((err) => {

			});
		},
		/** 
		 * 数据格式化
		 */
		dataForm(data) {
			console.log(data);
			for (const item of data.orderReplyQuestions) {
				item.isNormal = item.isNormal == false ? "0" : "1";
				if (item.optionValues) {
					item.optionValues = item.optionValues.split(",");
					item.thresholdValue = item.thresholdValue.split(",");
					if(item.fieldValue){
						item.fieldValue=item.fieldValue.split(",");
					}
					let flag=0;
					for (const ite of item.optionValues) {
						if(ite==item.fieldValue){
							flag++
						}	
					}
					if(flag==0){
						item.abnormal=true;
					}
				}
				if(!item.fieldValue){
					item.abnormal=true;
				}
			}
			return data;
		},
		/** 
		 * 审核结果
		 */
		editDepart(id) {
			this.modal = true;
			API.Dataaudit.infoResult({
				id: id
			}).then((res) => {
				this.planInfo = this.dataForm(res.data);
				if(res.data.notPassReason !='') {
					this.zzsfForm.select = res.data.notPassReason;
					this.zzsfForm.textarea = res.data.notPassRemark;
				}else {
					this.zzsfForm.radio = 0;
				}
			}).catch((err) => {

			});
		},
		/** 
		 * 删除结果
		 */
		delDepart(id) {
			this.$Modal.confirm({
				title: '删除结果',
				content: '确定删除该结果？',
				onOk: () => {
					API.Dataaudit.delResult({
						id: id
					}).then((res) => {
						this.$Message.success("删除成功");
						this.getData();
					}).catch((err) => {

					});
				}
			});
		},
		/**
		 * 审核是否终止随访
		 */
		radioChange(value) {
			console.log(value)
			if(value == 1) {//清空
				this.$refs.zzsfForm.resetFields();
			}
		},		 
		submitData() {
			/**
			 * 发送数据
			 */
			let ajaxDa={
				id:this.planInfo.id,               
				dateEnd: this.planInfo.dateEnd,    
				hzxxId:this.planInfo.hzxxId,   
				vetRemark:this.planInfo.vetRemark,  
				orderReplyQuestions:[],
				notPassReason: this.zzsfForm.select,
				notPassRemark: this.zzsfForm.textarea
			}
			for (let item of this.planInfo.orderReplyQuestions) {
				let copyData=JSON.parse(JSON.stringify(item));
				if(copyData.fieldValue instanceof Array){
					copyData.fieldValue=copyData.fieldValue.join(",");
				}
				copyData.isNormal=copyData.isNormal==0?false:true;
				ajaxDa.orderReplyQuestions.push({
					id:copyData.id,
					asr:copyData.asr,
					isNormal:copyData.isNormal,
					fieldName:copyData.fieldName,
					fieldValue:copyData.fieldValue,
				})
			}
			if(this.zzsfForm.select == ''||this.zzsfForm.textarea.toString().length<1) {
				this.$Message.error('请填写终止随访的原因')
			}else {
				API.Dataaudit.saveResult(
					ajaxDa
				).then((res) => {
					this.$Message.success("提交成功");
					this.modal = false;
					this.getData();
				}).catch((err) => {

				});
			}
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
			this.searchParam.pager = page;
			this.getData();
		},
		/** 
     * 查看患者详情
     */
    getInfo(id) {
      API.FollowBussiness.detailPat({
        id: id
      }).then((res) => {
        if(res.data.mjzs.length) {
          this.mjzData = res.data.mjzs
        }
        if(res.data.cyxjs.length) {
          this.zyData = res.data.cyxjs
        } 
        this.currentData = res.data;
      }).catch((err) => {
        console.log(err)

      });
    },
    /**
       * 终止随访按钮
       */
      zzsfFun(name, id) {
        this.zzsfModel = true;
        this.sfrName = name;
        this.nowId = id;
      },
      //选择终止随访的原因
      xzReason(value) {
        this.zzsfForm.select = value
      },
      /**
       * 终止随访取消按钮
       */
      zzsfCancel (name) {
        this.$refs[name].resetFields();
        this.zzsfModel = false;
      },
      /**
       * 终止随访确定按钮
       */
      zzsfOk (name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            API.Dataaudit.cancelall({
                id:this.nowId,
                notPassReason:this.zzsfForm.select,
                notPassRemark:this.zzsfForm.textarea,
            }).then((res)=>{
              console.log(res)
              this.$Message.success('成功!');
              this.zzsfModel = false;
               
            }).catch((err)=>{

            });
          } else {
              this.$Message.error('失败');
          }
        })
      },
	},
	mounted() {
		this.getDepartList();
		this.getData();
	}
}
</script>


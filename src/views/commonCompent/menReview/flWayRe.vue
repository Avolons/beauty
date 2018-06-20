<style lang="less">
@import "../../../styles/jzda.less";
#audioObj {
  display: none;
}

.follPass {
  &_message {
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
      border: 1px solid #d9edf7;
      border-radius: 4px;
      font-size: 13px;
      padding: 2px;
      box-sizing: border-box;
      margin-top: 5px;
      clear: both;
      > h3 {
        font-size: 14px;
        font-weight: 400;
      }
      > h4 {
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

      > span {
        display: block;
        float: left;
        background-color: #d9edf7;
        border-radius: 4px;
        font-size: 13px;
        padding: 5px;
        box-sizing: border-box;
        width: calc(~"100% - 30px");
        audio {
          display: block;
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
    &_abnormal {
      > span {
        background-color: #ffdede;
      }
      .follPass_main_patInner {
        background-color: #ffdede;
      }
      audio {
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
      width: 25%;
    }
  }
  form {
    .ivu-form-item {
      margin-bottom: 10px;
      padding: 0;
      width: 200px;
      .ivu-form-item-label:before {
        content: "";
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
    &_list {
    }
    &_search {
      box-sizing: border-box;
      .ivu-col {
        display: flex;
        margin-bottom: 10px;
        > span {
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
	<div class="user">
		<div class="sys-depart_main">
			<!-- 搜索 -->
			<Row class="sys-depart_main_search" :gutter="15">
				<Col span="6" v-if="searchNumber">
				<span>
					{{planType}}编号
				</span>
				<Input type="text" v-model="searchParam.orderNo" placeholder="请输入随访编号"></Input>
				</Col>
				<Col span="6" v-if="searchName">
				<span>
				姓名
				</span>
				<Input type="text" v-model="searchParam.brxm" placeholder="请输入患者姓名"></Input>
				</Col>
				<Col span="6" v-if="searchStatus">
				<span>
					审核状态
				</span>
				<Select v-model="searchParam.vetStatus">
					<Option v-for="item in statusList" :value="item.id" :key="item.id">{{item.name}}</Option>
				</Select>
				</Col>
				<Col span="6" v-if="searchProject">
				<span>
					{{planType}}方案
				</span>
				<Input type="text" v-model="searchParam.schemeName" :placeholder="`请输入${planType}方案`"></Input>
				</Col>
				<Col span="6" v-if="searchAuther">
				<span>
					审核人
				</span>
				<Input type="text" v-model="searchParam.vetPerson" placeholder="请输入审核人"></Input>
				</Col>
				<Col span="6" v-if="searchRunTime" style="height:32px;">
				<span>
					执行日期：
				</span>
				<DatePicker @on-change="timeChange_one" type="datetimerange" placeholder="请选择执行日期"></DatePicker>
				</Col>
        	<Col span="6" v-if="searchNoticeTime" style="height:32px;">
				<span>
					通知日期：
				</span>
				<DatePicker @on-change="timeChange_one" placement="bottom-end" type="datetimerange" placeholder="请选择通知日期"></DatePicker>
				</Col>
				<Col span="6" v-if="searchCheckTime" style="height:32px;">
				<span>
					审核日期：
				</span>
				<DatePicker @on-change="timeChange_two" placement="bottom-end" type="datetimerange" placeholder="请选择审核日期"></DatePicker>
				</Col>
				<Col span="6">
				<Button @click="searchParam.pager=1;getData()" type="primary">查询</Button>
				</Col>
			</Row>
			<!-- 表格 -->
			<div class="sys-depart_main_list">
				<Table border :columns="config" :data="dataList" :loading="createLoading"></Table>
			</div>
			<!-- 分页 -->
			<Row class="sys-depart_main_page">
				<Page :page-size="pageSize" :total="totalPage" :current="searchParam.pager" show-elevator show-total style="float:right" @on-change="changePage"></Page>
			</Row>
			<!-- 随访模态框 -->
			<Modal :mask-closable="false" v-model="modal" title="随访详情" width="950" class-name="" :styles="{top:'50px'}">
				<Collapse v-model="showAll">
					<Panel name="1">
						{{planType}}结果
						<div slot="content" class="follPass_table">
							<table border="1">
								<tr>
									<td>患者姓名</td>
									<td>{{planInfo.brxm}}</td>
									<td>采用随访方案</td>
									<td>{{planInfo.schemeName}}</td>
								</tr>
								<tr>
									<td>{{planType}}状态</td>
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
										<Radio :label="1">是</Radio>
										<Radio :label="0">否</Radio>
									</RadioGroup>
								</FormItem>
								<FormItem label="原因" prop="select" style="text-align:left;" v-if="zzsfForm.radio == 1">
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
						<!-- <Button style="margin:7px 15px 0 0;float:right" @click.stop="allAudio" size="small" icon="volume-medium" type="primary">一键播放所有语音</Button> -->
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
					<Button @click="submit1" type="primary">提交审核</Button>
				</div>
			</Modal>
		</div>
		<!-- 详情模态框 -->
		<Modal v-model="patientDetail" title="患者信息" class-name="patientInfo"  width="700">
			<person-info 
        :baseData="currentData"
        :outpatientData="mjzData"
        :hospitalData="zyData"
        :physicalData="tjData"
        >
      </person-info>
		</Modal>
		<!-- 终止随访 -->
		<Modal v-model="zzsfModel" class-name="zzsfModel" width="480px">
			<p slot="header" style="text-align:center;font-size:16px;">
				<span>终止{{sfrName}}所有{{planType}}</span>
			</p>
			<div style="text-align:center">
				<Form :model="zzsfForm" ref="zzsfForm" :rules="zzsfFormRule" :label-width="80">
					<FormItem label="原因" prop="select" style="text-align:left;">
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
						<Button type="primary" style="margin-left:-80px" @click="zzsfCancel('zzsfForm')">取消</Button>
						<Button type="ghost" @click="zzsfOk('zzsfForm')" style="margin-left: 8px" ref="sfStatusBtn">提交</Button>
					</FormItem>
				</Form>
			</div>
			<div slot="footer">
			</div>
		</Modal>
		<audio id="audioObj" src="http://192.168.1.100:8080/AIVoc/2018-01-26/20180126090634_12.wav"></audio>
		<!-- 确定终止随访计划 -->
		<Modal v-model="qdqx" title="提示" @on-ok="submitData">
			<div style="text-align:center;line-height:30px;font-size:16px;">
				<p>确认提交后将终止该患者一切随访计划，<br>且不再为该患者自动生成随访计划?</p>
			</div>
		</Modal>
	</div>
</template>

<script>
import { API } from "@/services/index.js";
import personInfo from '../common/personInfo.vue'
export default {
  components: {
    personInfo
  },
  props: {
    planType: {
      type: String,
      default: "随访"
    },
    activeType: {
      type: String,
      default: "0,2"
    },
    delParams: {
      type: Array,
      default: () => ["通知日期","通知入院日期","预约时间"]
    },
    /* 编号 */
    searchNumber: {
      type: Boolean,
      default: true
    },
    /* 姓名 */
    searchName: {
      type: Boolean,
      default: true
    },
    /* 方案 */
    searchProject: {
      type: Boolean,
      default: true
    },
    /* 状态 */
    searchStatus: {
      type: Boolean,
      default: true
    },
    /* 审核人 */
    searchAuther: {
      type: Boolean,
      default: true
    },
    /* 执行日期 */
    searchRunTime: {
      type: Boolean,
      default: true
    },
    /* 通知日期 */
    searchNoticeTime: {
      type: Boolean,
      default: false
    },
    /* 审核时间 */
    searchCheckTime: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      statusList: [
        {
          name: "全部",
          id: ""
        },
        {
          name: "未审核",
          id: 0
        },
        {
          name: "已审核",
          id: 1
        },
        {
          name: "未处理",
          id: 10
        },
        {
          name: "已处理",
          id: 11
        },
        {
          name: "已取消",
          id: 12
        }
      ], //审核状态选项列表
      audioObj: document.querySelector("#audioObj"),
      showAll: ["1", "2"],
      hzxxId: "", //患者id
      //搜索参数
      searchParam: {
        pager: 1, //当前页码
        limit: 10, //每页条数
        schemeName: "", //方案id（可选）
        orderNo: "", //编码（可选）
        brxm: "", //患者姓名（可选）
        adminId: "", //医生id
        status: 2, //状态为2（必传）
        isConceal: 1,
        dateEndBegin: null, //执行开始日期（可选）通知开始时间
        dateEndEnd: null ,//执行结束日期（可选）通知结束时间
        dateVetBegin: "", //审核开始日期（可选）
        dateVetEnd: "", //审核结束日期（可选）
        vetStatus: "", //审核状态: 0 未审核，1 已审核,10 未处理,11 已处理,12 已取消
        vetPerson: "", //审核人
        activeType: this.activeType
      },
      createLoading: true, //默认为true
      //随访结果详情
      planInfo: {
        orderReplyQuestions: []
      },
      pageSize: 10,
      totalPage: 10, //总页码
      departList: [], //科室选项列表
      departId: "", //科室id
      doctorList: [], //医生选项列表
      planList: [],
      actionList: [], //随访方案列表
      formData: {
        name: "",
        paixu: 0,
        types: "0",
        mType: "0",
        state: "0",
        remark: "" //备注
      },
      //模态窗title
      modal: false,
      //表格配置
      config: [
        {
          title: "序号",
          type: "index",
          align: "center",
          width: 70
        },
        {
          title: `${this.planType}编号`,
          key: "orderNo"
        },
        {
          title: "姓名",
          key: "brxm",
          render: (h, params) => {
            return h("div", [
              h(
                "span",
                {
                  props: {
                    type: "primary",
                    size: "small"
                  },
                  style: {
                    borderBottom: "1px solid #5cadff",
                    color: "#5cadff"
                  },
                  on: {
                    click: () => {
                      this.getInfo(params.row.hzxxId);
                      this.patientDetail = true;
                    }
                  }
                },
                params.row.brxm
              )
            ]);
          }
        },
        {
          title: this.activeType=="5"?"体检套餐":"疾病名称",
          key: "icdName"
        },
        {
          title: `${this.planType}方案`,
          key: "schemeName"
        },
        {
          title: `${this.planType}状态`,
          key: "statusStr"
        },
        {
          title: "通知日期",
          key: "dateEnd"
        },
        {
          title: "执行日期",
          key: "dateEnd"
        },
        {
          title: "通知入院日期",
          key: "dateBegin"
        },
        {
          title: "预约时间",
          key: "dateBegin"
        },
        {
          title: "审核人",
          key: "vetPerson"
        },
        {
          title: "审核日期",
          key: "vetDate"
        },
        {
          title: "操作",
          key: "action",
          width: 220,
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  class: {
                    menuHide: this.menuShow(this.AM.Data.saveResult)
                  },
                  on: {
                    click: () => {
                      this.editDepart(params.row.id);
                    }
                  }
                },
                params.row.vetStatus == 0 ? "初次审核" : "重新审核"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "warning",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  class: {
                    menuHide: this.menuShow(this.AM.Data.cancelall)
                  },
                  on: {
                    click: () => {
                      this.$refs.zzsfForm.resetFields();
                      this.zzsfFun(
                        params.row.brxm,
                        params.row.id,
                        params.row.notPassReason,
                        params.row.notPassRemark
                      );
                      // this.$refs.zzsfForm.resetFields();
                    }
                  }
                },
                "终止" + (this.planType == "随访" ? "随访" : "通知")
              ),
              h(
                "Button",
                {
                  props: {
                    type: "error",
                    size: "small"
                  },
                  style: {},
                  class: {
                    menuHide: this.menuShow(this.AM.Data.delResult)
                  },
                  on: {
                    click: () => {
                      this.delDepart(params.row.id);
                    }
                  }
                },
                "删除"
              )
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
      tjData:[],
      //详情模态框
      patientDetail: false,
      //终止随访
      zzsfModel: false, //弹框
      sfrName: "", //终止随访人姓名
      nowId: "", //终止随访人数据id
      zzsfForm: {
        select: "", //终止随访原因
        textarea: "", //终止随访备注
        radio: 0
      },
      zzsfFormRule: {
        //终止随访form验证
        select: [
          { required: true, message: "请选择不通过原因", trigger: "change" }
        ],
        textarea: [{ required: true, message: "请输入详情", trigger: "blur" }]
      },
      qdqx: false //确定终止随访？Model
    };
  },
  mounted() {
    /**
     * 获取科室列表集合
     */
    this.getDepartList();
    this.getData();
    this.finallConfig();
    /* audioObj.addEventListener("ended", () => {
		}); */
  },
  methods: {
    finallConfig() {
      for (const item of this.delParams) {
        for (let index = 0; index < this.config.length; index++) {
          if (item == this.config[index].title) {
            this.config.splice(index, 1);
          }
        }
      }
    },
    /**
     * 时间变更触发
     */
    timeChange_one(date) {
      this.searchParam.dateEndBegin = date[0];
      this.searchParam.dateEndEnd = date[1];
    },
    timeChange_two(date) {
      this.searchParam.dateVetBegin = date[0];
      this.searchParam.dateVetEnd = date[1];
    },
    /**
     * 一键播放所有语音
     */
    allAudio() {
      this.audioObj.src =
        "http://192.168.1.100:8080/AIVoc/2018-01-26/20180126090634_12.wav";
      this.audioObj.play();
    },
    /**
     * 指标变化自动判断
     */
    labeChange(item) {
      /* 获取预警阈值 */
      let flag = 0;
      for (let ite of item.thresholdValue) {
        for (let it of item.fieldValue) {
          if (it == ite) {
            flag++;
          }
        }
      }
      if (flag > 0) {
        item.isNormal = 0;
      } else {
        item.isNormal = 1;
      }
    },
    /**
     * 获取科室列表
     */
    getDepartList() {
      API.Systems.listDisDepart()
        .then(res => {
          this.departList = res.data;
          this.departList.splice(0, 0, {
            id: "",
            name: "全部"
          });
          this.getDoctorList();
        })
        .catch(err => {});
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
      })
        .then(res => {
          this.doctorList = res.data;
        })
        .catch(err => {});
    },
    /**
     * 获取所有数据
     */
    getData() {
      API.Dataaudit.listResult(this.searchParam)
        .then(res => {
          this.totalPage = res.total;
          this.dataList = res.data;
          this.createLoading = false;
        })
        .catch(err => {});
    },
    /**
     * 数据格式化
     */
    dataForm(data) {
      /**
       * 遍历所有数据
       */
      for (const item of data.orderReplyQuestions) {
        /**
         * 格式化正常值
         */
        item.isNormal = !item.isNormal ? "0" : "1";
        let flag = 0;
        /**
         * 判断是否属于采集指标类型
         */
        if (item.optionValues) {
          /** 指标选项列表 */
          item.optionValues = item.optionValues.split(",");
          /* 阈值列表 */
          item.thresholdValue = item.thresholdValue.split(",");
          /** 用户选项列表 */
          if (item.fieldValue) {
            item.fieldValue = item.fieldValue.split(",");
          } else {
            item.abnormal = true;
            item.isNormal = 1;
            item.fieldValue = [];
          }
          let flag = 0;
          for (const ite of item.optionValues) {
            if (ite == item.fieldValue) {
              flag++;
            }
          }
          if (flag == 0) {
            item.abnormal = true;
          }
          /**
           * 只要用户已选选项中存在指标阈值列表中的数据，就认为数据不正常
           */
          let flags = 0;
          for (let ite of item.thresholdValue) {
            for (let it of item.fieldValue) {
              if (it == ite) {
                flags++;
              }
            }
          }
          if (flags > 0) {
            item.isNormal = 0;
          } else {
            item.isNormal = 1;
          }
        }
      }
      return data;
    },
    /**
     * 审核结果
     */
    editDepart(id) {
      this.modal = true;
      this.modal = false;
      this.modal = true;

      this.zzsfForm.select = "";
      this.zzsfForm.textarea = "";
      API.Dataaudit.infoResult({
        id: id
      })
        .then(res => {
          this.planInfo = {
            orderReplyQuestions: []
          };
          this.planInfo = this.dataForm(res.data);
          if (res.data.notPassReason != "") {
            this.zzsfForm.radio = 1;
            this.zzsfForm.select = res.data.notPassReason;
            this.zzsfForm.textarea = res.data.notPassRemark;
          } else {
            this.zzsfForm.radio = 0;
          }
        })
        .catch(err => {});
    },
    /**
     * 删除结果
     */
    delDepart(id) {
      this.$Modal.confirm({
        title: "删除结果",
        content: "确定删除该结果？",
        onOk: () => {
          API.Dataaudit.delResult({
            id: id
          })
            .then(res => {
              this.$Message.success("删除成功");
              this.getData();
            })
            .catch(err => {});
        }
      });
    },
    /**
     * 审核是否终止随访
     */
    radioChange(value) {
      if (value == 1) {
        //清空
        this.$refs.zzsfForm.resetFields();
      } else if (value == 0) {
        //清空
        this.$refs.zzsfForm.resetFields();
        this.zzsfForm.select = "";
        this.zzsfForm.textarea = "";
      }
    },

    /**
     * 判断是否终止随访
     */
    submit1() {
      if (this.zzsfForm.radio == 1) {
        this.qdqx = true;
      } else {
        this.submitData();
      }
    },
    submitData() {
      /**
       * 发送数据
       */
      this.createLoading = true;
      let ajaxDa = {
        id: this.planInfo.id,
        dateEnd: this.planInfo.dateEnd,
        hzxxId: this.planInfo.hzxxId,
        vetRemark: this.planInfo.vetRemark,
        orderReplyQuestions: [],
        notPassReason: this.zzsfForm.select,
        notPassRemark: this.zzsfForm.textarea
      };
      for (let item of this.planInfo.orderReplyQuestions) {
        let copyData = JSON.parse(JSON.stringify(item));
        if (copyData.fieldValue instanceof Array) {
          copyData.fieldValue = copyData.fieldValue.join(",");
        }
        copyData.isNormal = copyData.isNormal == 0 ? false : true;
        ajaxDa.orderReplyQuestions.push({
          id: copyData.id,
          asr: copyData.asr,
          isNormal: copyData.isNormal,
          fieldName: copyData.fieldName,
          fieldValue: copyData.fieldValue
        });
      }
      if (this.zzsfForm.radio == 1) {
        if (
          this.zzsfForm.select == "" ||
          this.zzsfForm.textarea.toString().length < 1
        ) {
          this.$Message.error("请填写终止随访的原因");
        } else {
          API.Dataaudit.saveResult(ajaxDa)
            .then(res => {
              this.$Message.success("提交成功");
              this.modal = false;
              this.getData();
            })
            .catch(err => {});
        }
      } else {
        API.Dataaudit.saveResult(ajaxDa)
          .then(res => {
            this.$Message.success("提交成功");
            this.modal = false;
            this.getData();
          })
          .catch(err => {});
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
      })
        .then(res => {
          if (res.data.mjzs.length) {
            this.mjzData = res.data.mjzs;
          }
          if (res.data.cyxjs.length) {
            this.zyData = res.data.cyxjs;
          }
          if (res.data.InspectClient.length) {
            this.tjData = res.data.InspectClient;
          }
          this.currentData = res.data;
        })
        .catch(err => {});
    },
    /**
     * 终止随访按钮
     */
    zzsfFun(name, id, notPassReason, notPassRemark) {
      this.zzsfModel = true;
      this.sfrName = name;
      this.nowId = id;
      console.log(notPassReason, notPassRemark);
      //清空终止随访的旧值
      if (notPassReason != "") {
        this.zzsfForm.radio = 1;
        this.zzsfForm.select = notPassReason;
        this.zzsfForm.textarea = notPassRemark;
        this.$refs.sfStatusBtn.$el.setAttribute("disabled", true);
      } else {
        this.zzsfForm.radio = 0;
        this.zzsfForm.select = "";
        this.zzsfForm.textarea = "";
        this.$refs.sfStatusBtn.$el.removeAttribute("disabled");
      }
    },
    //选择终止随访的原因
    xzReason(value) {
      this.zzsfForm.select = value;
    },
    /**
     * 终止随访取消按钮
     */
    zzsfCancel(name) {
      this.$refs[name].resetFields();
      this.zzsfModel = false;
    },
    /**
     * 终止随访确定按钮
     */
    zzsfOk(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          API.Dataaudit.cancelall({
            id: this.nowId,
            notPassReason: this.zzsfForm.select,
            notPassRemark: this.zzsfForm.textarea
          })
            .then(res => {
              this.$Message.success("成功!");
              this.zzsfModel = false;
              this.getData(this.searchParams.pager);
            })
            .catch(err => {});
        } else {
          this.$Message.error("失败");
        }
      });
    }
  }
};
</script>


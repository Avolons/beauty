<template>
	<Row>
		<!-- 搜索栏 -->
		<Col span="24" class="followResult">
		<Row class="followResult_main_search common_search" :gutter="15">
			<!-- <Col span="6">
			<span>
				{{planType}}编号
			</span>
			<Input type="text" v-model="searchParams.orderNo" placeholder="请输入编号"></Input>
			</Col> -->
			<Col span="6">
			<span>
				姓名
			</span>
			<Input type="text" v-model="searchParams.brxm" placeholder="请输入姓名"></Input>
			</Col>
      <Col span="6">
			<span>
				联系电话
			</span>
			<Input type="text" v-model="searchParams.mobile" placeholder="请输入联系电话"></Input>
			</Col>
			<Col span="6">
			<span>
				状态
			</span>
			<Select v-model="searchParams.status">
				<Option v-for="item in statusList" :value="item.id" :key="item.id">{{item.name}}</Option>
			</Select>
			</Col>
			<Col span="6">
			<span>
				{{planType}}方案
			</span>
			<Input type="text" v-model="searchParams.schemeName" :placeholder="`请输入${planType}方案`"></Input>
			</Col>
			<Col span="6" >
			<span>
				生成日期
			</span>
			<DatePicker @on-change="timeChange_one" type="datetimerange" placeholder="请选择生成日期"></DatePicker>
			</Col>
			<Col span="6" >
			<span>
				执行日期
			</span>
			<DatePicker @on-change="timeChange_two" type="datetimerange" placeholder="请选择执行日期"></DatePicker>
			</Col>
			<Col span="6" >
			<span>
				审核日期
			</span>
			<DatePicker @on-change="timeChange_three" type="datetimerange" placeholder="请选择审核日期"></DatePicker>
			</Col>
			<!-- <Col span="6" >
			<span style="width:105px;height:32px;">
				计划执行日期
			</span>
			<DatePicker @on-change="timeChange_four" type="datetimerange" placement="bottom-end" placeholder="请选择计划执行日期" style="width:calc(100% - 105px)"></DatePicker>
			</Col> -->
			<Col span="6" >
			<Button @click="searchParams.pager=1;getData()" type="primary">查询</Button>
			</Col>
		</Row>
		</Col>
		<!-- 表格 -->
		<Col span="24" class="fpTable">
		<Table @on-selection-change="selectAll" border :columns="config" :data="dataList" class="margin-bottom-10" :loading="createLoading"></Table>
		<Row>
			<Button v-if="!menuShow(this.AM.FollowBussiness.cancleall)" @click="cancelAllResult" :type="haveSelect.length>0?'primary':'dashed'">批量终止{{planType}}</Button>
			<Page style="float:right" :current="searchParams.pager" :total="totalPage" @on-change="changePage" show-elevator show-total></Page>
		</Row>
		</Col>
		<!-- 随访模态框 -->
		<Modal v-model="follInfo" title="随访详情" width="950" class-name="patientInfo" :styles="{top: '180px'}">
			<Collapse v-model="follshow">
				<Panel name="1">
					{{planType}}结果
					<div slot="content" class="followResult_table">
						<table border="1">
							<tr>
								<td>姓名</td>
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
								<td colspan=3>{{planInfo.vetRemark}}</td>
							</tr>
							<tr>
								<td>{{planType}}结果</td>
								<td colspan=3>
									<template v-if="item.fieldName&&item.fieldValue" v-for="item in planInfo.orderReplyQuestions">
										<span style="display:block">{{item.fieldName}}:
											<b :class="{'redColor':!item.isNormal}">{{item.fieldValue}}</b>
										</span>
									</template>
								</td>
							</tr>
							<tr>
								<td>医生意见</td>
								<td colspan=3>{{planInfo.yishenyijian}}</td>
							</tr>
						</table>
						<Form :model="zzsfForm" ref="zzsfForm" :rules="zzsfFormRule" :label-width="60" style="padding-top: 30px;">
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
					<ul slot="content" class="followResult_message">
						<template v-for="item in planInfo.orderReplyQuestions">
							<li class="followResult_single_ai">
								<Icon type="android-call"></Icon>
								<span>
									{{item.question}}
								</span>
							</li>
							<li class="followResult_single_pat">
								<span>
									<audio controls :src="item.audio"></audio>
								</span>
								<Icon type="person"></Icon>
							</li>
						</template>
					</ul>
				</Panel>
			</Collapse>
		</Modal>
		<!-- 详情模态框 -->
		<Modal v-model="patientDetail" title="详细信息" class-name="patientInfo"  width="700">
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
	</Row>
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
    /* 需要删除的列名 */
    delParams: {
      type: Array,
      default: () => []
    },
  },
  data() {
    return {
      follshow: "1",
      //搜索选项
      createLoading: false, //loading动画加载
      searchParams: {
        activeType:this.activeType, //0，随访；1，通知，2，临时随访；3，是出院随访;4入院通知；5体检
        pager: 1, //当前页码
        limit: 10, //每页条数
        mobile:"",//联系电话
        schemeName: "", //方案名称（可选）
        orderNo: "", //编码（可选）
        brxm: "", //患者姓名（可选）
        status: "",
        dateAddBegin: "", //生成开始日期（可选）
        dateAddEnd: "", //生成结束日期（可选）
        dateEndBegin: "", //执行开始日期（可选）
        dateEndEnd: "", //执行结束日期（可选）
        dateVetBegin: "", //审核开始日期（可选）
        dateVetEnd: "", //审核结束日期（可选）
        dateBeginBegin: "", //计划开始日期（可选）
        dateBeginEnd: "" //计划结束日期（可选）
      },
      statusList: [
        {
          name: "全部",
          id: ""
        },
        {
          name:`等待${this.planType}`,
          id: 0
        },
        {
          name: `${this.planType}中`,
          id: 1
        },
        {
          name: `已${this.planType}`,
          id: 2
        },
        {
          name: "已停止",
          id: 3
        },
        {
          name: "配置错误",
          id: 4
        }
      ], //审核状态选项列表
      totalPage: 100, //总页数
      //随访记录详情
      planInfo: {
        orderReplyQuestions: []
      },
      //表格配置
      config: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
       /*  {
          title: "序号",
          type: "index",
          align: "center",
          width: 70
        },
        {
          title: `${this.planType}编号`,
          key: "orderNo",
          align: "center"
        }, */
        {
          title: "姓名",
          key: "brxm",
          align: "center",
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
          title: "联系电话",
          key: "mobile",
          align: "center"
        },
        {
          title: this.activeType=="5"?"体检套餐":"疾病诊断",
          key: "icdName",
          align: "center"
        },
        {
          title: `${this.planType}方案`,
          key: "schemeName",
          align: "center",
         /*  width: 200 */
        },
        {
          title: "状态",
          key: "statusStr",
          align: "center"
        },
        {
          title: "通话状态",
          key: "remark",
          align: "center"
        },
        {
          title: "生成时间",
          key: "dateAdd",
          align: "center",
          width: 110
        },
        {
          title: "执行日期",
          key: "dateEnd",
          align: "center",
          width: 110
        },
        {
          title: "审核日期",
          key: "vetDate",
          align: "center",
           width: 110
        },
        {
          title: "审核意见",
          key: "vetRemark",
          align: "center",
         
        },
       /*  {
          title: "计划执行日期",
          key: "dateBegin",
          align: "center"
        }, */
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
                    type: params.row.vetStatus != 0 ? "info" : "dashed",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  class: {
                    menuHide: this.menuShow(this.AM.FollowBussiness.detailLog)
                  },
                  on: {
                    click: () => {
                      /**
                       * 该处类型判断
                       */
                      if (params.row.vetStatus != 0) {
                        this.showInfo(params.row.id);
                      }
                    }
                  }
                },
                params.row.vetStatus == 0 ? "审核之中" : "查看详情"
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
                    menuHide: this.menuShow(this.AM.FollowBussiness.cancleall)
                  },
                  on: {
                    click: () => {
                      this.$refs.zzsfForm.resetFields();
                      this.zzsfFun(
                        params.row.brxm,
                        params.row.id,
                        params.row.status,
                        params.row.notPassReason,
                        params.row.notPassRemark
                      );
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
                    menuHide: this.menuShow(this.AM.FollowBussiness.delLog)
                  },
                  on: {
                    click: () => {
                      this.deletResult(params.row.id);
                    }
                  }
                },
                "删除"
              )
            ]);
          }
        }
      ],
      //表格data
      dataList: [],
      follInfo: false, //详情模态框
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
        radio: "0"
      },
      zzsfFormRule: {
        //终止随访form验证
        select: [
          { required: true, message: "请选择不通过原因", trigger: "change" }
        ],
        textarea: [{ required: true, message: "请输入详情", trigger: "blur" }]
      },
      sfStatus: "", //当前患者的随访状态
      haveSelect: [],
      clickAll: false //是否是批量选择
    };
  },
  methods: {
    finallConfig() {
      for (const item of this.delParams) {
        for (let index = 0; index < this.config.length; index++) {
          if (item == this.config[index].key) {
            this.config.splice(index, 1);
          }
        }
      }
    },
    /**
     * 批量终止随访
     */
    cancelAllResult() {
      if (this.haveSelect.length == 0) {
        return false;
      }
      this.$refs.zzsfForm.resetFields();
      this.zzsfModel = true;
      this.sfrName = "选中的";
      this.zzsfForm.select = "";
      this.zzsfForm.textarea = "";
      this.clickAll = true;
    },
    selectAll(selection) {
      this.haveSelect = selection;
      this.clickAll = true;
    },
    timeChange_one(date) {
      this.searchParams.dateAddBegin = date[0];
      this.searchParams.dateAddEnd = date[1];
    },
    timeChange_two(date) {
      this.searchParams.dateEndBegin = date[0];
      this.searchParams.dateEndEnd = date[1];
    },
    timeChange_three(date) {
      this.searchParams.dateVetBegin = date[0];
      this.searchParams.dateVetEnd = date[1];
    },
    timeChange_four(date) {
      this.searchParams.dateBeginBegin = date[0];
      this.searchParams.dateBeginEnd = date[1];
    },
    /**
     * 获取列表数据,搜索接口
     */
    getData() {
      this.createLoading=true;
      API.FollowBussiness.listLog(this.searchParams)
        .then(res => {
          for (const item of res.data) {
            if (item.status >= 2) {
              item._disabled = true;
            }
          }
          this.dataList = res.data;
          this.totalPage = res.total;
          this.createLoading = false;
        })
        .catch(err => {
          //弹出错误信息
          this.$Message.error(err);
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
     * 显示随访详情
     */
    showInfo(id) {
      /**
       * 获取详情并且赋值到临时数据
       */
      API.FollowBussiness.detailLog({
        id: id
      })
        .then(res => {
          this.planInfo = res.data;
          if (res.data.notPassReason != "") {
            this.zzsfForm.radio = 1;
            this.zzsfForm.select = res.data.notPassReason;
            this.zzsfForm.textarea = res.data.notPassRemark;
          } else {
            this.zzsfForm.radio = 0;
          }
        })
        .catch(err => {
          //弹出错误信息
          this.$Message.error(err);
        });
      this.follInfo = true;
    },
    /**
     * 删除随访记录
     */
    deletResult(id) {
      this.$Modal.confirm({
        title: "删除记录",
        content: "确定删除该条记录？",
        onOk: () => {
          API.FollowBussiness.delLog({
            id: id
          })
            .then(res => {
              this.$Message.success("删除成功");
              this.getData();
            })
            .catch(err => {
              //弹出错误信息
              this.$Message.error(err);
            });
        }
      });
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
        .catch(err => {
          //弹出错误信息
          this.$Message.error(err);
        });
    },
    /**
     * 终止随访按钮
     */
    zzsfFun(name, id, sfStatus, notPassReason, notPassRemark) {
      this.zzsfModel = true;
      this.sfrName = name;
      this.nowId = id;
      this.sfStatus = sfStatus; //获取当前的随访状态,3=停止
      if (sfStatus == "3") {
        this.$refs.sfStatusBtn.$el.setAttribute("disabled", true);
        /* return false; */
      } else {
        this.$refs.sfStatusBtn.$el.removeAttribute("disabled");
      }
      //清空终止随访的旧值
      if (notPassReason != "") {
        this.zzsfForm.select = notPassReason;
        this.zzsfForm.textarea = notPassRemark;
      } else {
        this.zzsfForm.select = "";
        this.zzsfForm.textarea = "";
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
          if (this.clickAll) {
            let ids = [];
            for (const item of this.haveSelect) {
              ids.push(item.id);
            }
            API.FollowBussiness.cancleAllResult({
              ids: ids,
              notPassReason: this.zzsfForm.select,
              notPassRemark: this.zzsfForm.textarea
            })
              .then(res => {
                this.$Message.success("成功!");
                this.zzsfModel = false;
                this.clickAll = false;
                this.zzsfForm.select = "";
                this.zzsfForm.textarea = "";
                this.getData(this.searchParams.pager);
              })
              .catch(err => {
                //弹出错误信息
                this.$Message.error(err);
                this.clickAll = false;
              });
          } else {
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
              .catch(err => {
                //弹出错误信息
                this.$Message.error(err);
              });
          }
        } else {
          this.$Message.error("失败");
        }
      });
    }
  },
  mounted() {
    this.getData();
    this.finallConfig();
  }
};
</script>

<style lang="less">
@import "../../../styles/common.less";
@import "../../../styles/jzda.less";
.result_patinfo {
  .ivu-col {
    margin-top: 5px;
  }
}
.followResult {
  &_single {
    &_ai {
      padding-right: calc(50% + 10px);
      box-sizing: border-box;
      font-size: 0;
      .ivu-icon {
        font-size: 20px;
        margin-right: 10px;
        width: 20px;
        margin-top: 10px;
      }
      span {
        display: inline-block;
        background-color: #d9edf7;
        border-radius: 4px;
        padding: 10px;
        font-size: 13px;
        box-sizing: border-box;
        vertical-align: top;
        width: calc(~"100% - 30px");
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
      span {
        display: block;
        float: left;
        background-color: #d9edf7;
        border-radius: 4px;
        padding: 10px;
        font-size: 13px;
        box-sizing: border-box;

        width: calc(~"100% - 30px");
        audio {
          display: inline-block;
        }
      }
      &:after {
        content: "";
        display: block;
        clear: both;
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
      height: 35px;
      line-height: 35px;
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

.pages {
  .ivu-page {
    float: right;
    padding: 10px 20px 10px 0;
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
.bb1 {
  border-bottom: 1px solid #fff;
}

.bdx1 {
  border-bottom: 1px dotted #edf3f4;
}

.mb12 {
  margin-bottom: 12px;
}

.redColor {
  color: red;
}

.followResult {
  &_main {
    &_search {
      box-sizing: border-box;
      .ivu-col {
        display: flex;
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
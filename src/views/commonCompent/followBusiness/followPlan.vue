<template>
  <Row>
    <!-- 搜索栏 -->
    <Col span="24" class="followPlan">
    <Row class="followPlan_main_search common_search" :gutter="15">
      <Col span="6" v-if="searchName">
      <span>
        姓名
      </span>
      <Input type="text" v-model="searchParams.brxm" clearable placeholder="请输入患者姓名"></Input>
      </Col>
      <Col span="6" v-if="searchMobile">
      <span>
        联系电话
      </span>
      <Input type="text" v-model="searchParams.mobile" clearable placeholder="请输入患者联系电话"></Input>
      </Col>
      <Col span="6" v-if="searchDepartMent">
      <span>
        科室
      </span>
        <Cascader :data="cascardList" filterable change-on-select :render-format="changeFormat"   @on-change='handleDeparment' style="width: 100%;"></Cascader>
      </Col>
      <Col span="6" v-if="searchProject">
      <span>
        {{planType}}方案
      </span>
      <Input type="text" v-model="searchParams.schemeName" clearable :placeholder="`请输入${planType}方案`"></Input>
      </Col>
      <Col span="6" v-if="searchStatus">
      <span>
        状态
      </span>
      <Select v-model="searchParams.status">
        <Option v-for="item in statusList" :value="item.id"  :key="item.id">{{item.name}}</Option>
      </Select>
      </Col>
      <Col span="6" v-if="searchCreateTime">
      <span>
        生成日期
      </span>
      <DatePicker @on-change="timeChange_one" type="datetimerange"  placeholder="请选择生成日期"></DatePicker>
      </Col>
      <Col span="6"  v-if="searchStartTime">
      <span style="width:105px;height:32px;">
        计划开始日期
      </span>
      <DatePicker @on-change="timeChange_two" type="datetimerange" placeholder="请选择计划开始日期" style="width:calc(100% - 105px)"></DatePicker>
      </Col>
      <Col span="6" v-if="searchCheckTime">
      <span>
        审核日期
      </span>
      <DatePicker @on-change="timeChange_three" type="datetimerange" placement="bottom-end" placeholder="请选择审核日期"></DatePicker>
      </Col>
      <Col span="6" v-if="searchHospital">
      <span>
        入院日期
      </span>
      <DatePicker @on-change="timeChange_hospital" type="datetimerange" placement="bottom-end" placeholder="请选择入院日期"></DatePicker>
      </Col>
      <Col span="6" v-if="searchOrderTime">
      <span>
        预约时间
      </span>
      <DatePicker @on-change="timeChange_hospital" type="datetimerange" placement="bottom-end" placeholder="请选择预约时间"></DatePicker>
      </Col>
      <Col span="6" >
      <Button type="primary" @click="searchParams.pager=1;getData()">查询</Button>
      </Col>
    </Row>
    </Col>
    <!-- 表格 -->
    <Col span="24" class="fpTable">
    <Table border :columns="config" :data="dataList" class="margin-bottom-10" :loading="createLoading">></Table>
    <Row>
      <Page style="float:right" :current="searchParams.pager" :total="totalPage" @on-change="changePage" show-elevator show-total></Page>
    </Row>
    </Col>
    <!-- 随访模态框 -->
    <Modal v-model="followShow" title="随访电话" class-name="patientInfo" :styles="{top: '180px'}">
      <Form ref="AIform" :model="AIform" :rules="validate.followPlan" inline :label="80" class="AIform">
        <FormItem prop="AIphone" label="电话">
          <Input v-model="AIform.AIphone" placeholder="请输入号码" type="text"></Input>
        </FormItem>
        <FormItem>
          <Button type="primary" @click="submitData('AIform')">提交</Button>
        </FormItem>
      </Form>
    </Modal>
    <!-- 就诊档案 -->
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
      <p slot="header" style="color:#ed3f14;text-align:center;font-size:16px;">
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
            <Input v-model="zzsfForm.textarea" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请详细说明情况" style="width: 80%;"></Input>
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
    <!-- 随访计划详情 -->
    <Modal v-model="sfjhModel" :title="`${planType}计划详情`" class-name="followPlan_main_info"  width="700">
      <div class="followPlan_main_infoHeader">
          <h3>
            {{sfjhData.znjqrHzxx.brxm}}
            <span>
            {{sfjhData.znjqrHzxx.brxb}}/{{sfjhData.znjqrHzxx.age}}
          </span>
          </h3>
          <ul class="followPlan_main_infoBase">
            <li>
              {{activeType=='5'?'体检套餐':'疾病名称'}}：{{sfjhData.icdName}}
            </li>
            icdName
            <li>
              联系电话：{{sfjhData.znjqrHzxx.jtdh}}
            </li>
            <li v-show="activeType!='4'&& activeType!='5'">
              就诊日期：{{sfjhData.visitStartTime}}
            </li>
            <li>
              {{planType}}方案：{{sfjhData.schemeName}}
            </li>
            <li>
              {{planType}}进度：{{sfjhData.totalNum}}
            </li>
          </ul>
      </div>
        <!-- 随访计划时间 -->
        <div class="followPlan_main_infoFooter">
            <Timeline>
              <TimelineItem class="followPlan_main_infoHistory"  v-for="(item,index) in sfjhData.orders" :key="index">
                  <h3>第{{index+1}}随访:</h3>
                  <p class="content">执行日期：{{item.dateBegin}}/状态：{{item.statusStr}}</p>
                  <h4>采集指标:</h4>
                  <Tag color="blue" v-for="(ite,inde) in item.CollectionIndex" :key="inde">{{ite}}</Tag>
              </TimelineItem>
          </Timeline>
        </div>
      <Row slot="footer">
      </Row>
    </Modal>
  </Row>
</template>

<script>
import personInfo from '../common/personInfo.vue'
import { API } from "@/services/index.js";
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
      default: () => ["入院日期","预约时间"]
    },
    /* 姓名 */
    searchName: {
      type: Boolean,
      default: true
    },
    /* 联系电话 */
    searchMobile: {
      type: Boolean,
      default: true
    },
    /* 科室 */
    searchDepartMent: {
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
    /* 生成日期 */
    searchCreateTime: {
      type: Boolean,
      default: true
    },
    /* 计划开始日期 */
    searchStartTime: {
      type: Boolean,
      default: true
    },
    /* 审核时间 */
    searchCheckTime: {
      type: Boolean,
      default: true
    },
    /* 入院时间 */
    searchHospital: {
      type: Boolean,
      default: false
    },
    /* 预约时间 */
    searchOrderTime: {
      type: Boolean,
      default: false
    },
  },

  data() {
    return {
      cascardList: [], //科室选项列表
      createLoading: true, //loading 动画加载中
      //搜索选项
      searchParams: {
        mobile: "", //联系电话
        activeType: this.activeType, //0，随访；1，通知，2，临时随访；3，是出院随访;4入院通知；5体检
        brxm: "", //患者姓名
        schemeName: "", //随访方案
        status: "", //审核状态
        pager: 1, //
        dateAddBegin: "", //生成开始日期（可选）
        dateAddEnd: "", //生成结束日期（可选）
        VisitStartTimeBegin: "", //计划开始日期（可选）
        VisitStartTimeEnd: "", //计划结束日期（可选）
        dateVetBegin: "", //审核开始日期（可选）
        dateVetEnd: "", //审核结束日期（可选）
        limit: 10, //每页条数
        departmentId: "", //科室id
        hospitalStartTime:null,//入院开始时间
        hospitalEndTime:null,//入院结束时间
      },
      //列表配置
      config: [
        {
          title: "序号",
          type: "index",
          align: "center",
          width: 70
        },
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
          align: "center",
        },
        {
          title: "科室",
          key: "departmentName",
          align: "center",
        },
        {
          title: `${this.planType}方案`,
          key: "schemeName",
          align: "center",
        },
        {
          title: "状态",
          key: "statusStr",
          align: "center",
        },
        {
          title: "生成时间",
          key: "dateAdd",
          align: "center"
          /* width: 150, */
        },
        {
          title: "计划开始时间",
          key: "visitStartTime",
          align: "center"
          /* width: 150, */
        },
        {
          title: "入院日期",
          key: "orderTime",
          align: "center"
          /* width: 150, */
        },
        {
          title: "预约时间",
          key: "orderTime",
          align: "center"
          /* width: 150, */
        },
        {
          title: "审核时间",
          key: "dateVet",
          align: "center"
          /* width: 150, */
        },
        {
          title: `${this.planType}进度`,
          key: "totalNum",
          align: "center",
        },
        {
          title: "操作",
          key: "action",
          width: 250,
          align: "center",
          /* fixed:"right", */
          /**
           * 按钮状态
           * 随访中  停止随访  删除
           * 未开始  随访     删除
           * 已暂停  恢复随访  删除
           * 完成    删除
           */
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small"
                  },
                  class: {
                    menuHide: this.menuShow(this.AM.FollowBussiness.startPlan)
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.followShow = true;
                      this.sfMobile(params.row.hzxxId);
                      this.startPlan(params.row.id);
                    }
                  }
                },
                this.planType == "随访" ? "随访" : "通知"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "info",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  class: {
                    menuHide: this.menuShow(this.AM.FollowBussiness.detail)
                  },
                  on: {
                    click: () => {
                      this.sfjhModel = true;
                      this.detailFun(params.row.id);
                      /**
                       * 删除计划
                       */
                      //this.deletPlan(params.row.id);
                    }
                  }
                },
                "详情"
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
                    menuHide: this.menuShow(this.AM.FollowBussiness.delPlan)
                  },
                  on: {
                    click: () => {
                      this.deletPlan(params.row.id);
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
      statusList: [
        {
          name: "全部",
          id: ""
        },
        {
          name: "待审核",
          id: 0
        },
        {
          name: "不通过",
          id: 1
        },
        {
          name: "审核通过",
          id: 2
        },
        {
          name: "已排期",
          id: 3
        },
        {
          name: "已取消",
          id: 4
        }
      ], //审核状态选项列表
      id: -1, //当前被选中的数据id
      totalPage: 100, //总页数
      followShow: false, //编辑模态框
      //随访数据
      AIform: {
        AIphone: ""
      },
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
        textarea: "" //终止随访备注
      },
      zzsfFormRule: {
        //终止随访form验证
        select: [
          { required: true, message: "请选择不通过原因", trigger: "change" }
        ],
        textarea: [{ required: true, message: "请输入详情", trigger: "blur" }]
      },
      //随访计划详情
      sfjhModel: false,
      sfjhData: {
        znjqrHzxx: {
          brxm: ""
        }
      }, //随访计划详情
      sfStatus: "" //当前患者的随访状态
    };
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
     ** 改变科室列表得输出格式
     **/
    changeFormat(value) {
      return value[value.length - 1];
    },
    /**
     * 获取科室列表
     */
    getDepartList() {
      API.Systems.listDisDepart()
        .then(res => {
          let copyData = this.dataFormat(res.data);
          this.cascardList = JSON.parse(JSON.stringify(copyData));
        })
        .catch(err => {});
    },
    /***
     * 改变数据
     **/
    handleDeparment(value) {
      if (value) {
        this.searchParams.departmentId = value[value.length - 1];
      } else {
        this.searchParams.departmentId = "";
      }
    },
    /**
     * 数据格式化
     */
    dataFormat(data) {
      let arrList = [];
      /**
       * 等级分组
       */
      for (let item of data) {
        item.expand = true;
        item.label = item.name;
        item.value = item.id;
        if (!arrList[item.level]) {
          arrList[item.level] = [];
        }
        arrList[item.level].push(item);
      }
      let appendChild = (child, parent) => {
        for (let item of child) {
          for (const ite of parent) {
            if (item.parentId == ite.id) {
              if (!ite.children) {
                ite.children = [];
              }
              ite.children.push(item);
            }
          }
        }
      };
      for (let i = arrList.length - 1; i > 0; i--) {
        appendChild(arrList[i], arrList[i - 1]);
      }
      return arrList[0];
    },
    /**@description
     * 时间格式化
     */
    timeChange_one(date) {
      this.searchParams.dateAddBegin = date[0];
      this.searchParams.dateAddEnd = date[1];
    },
    timeChange_two(date) {
      this.searchParams.VisitStartTimeBegin = date[0];
      this.searchParams.VisitStartTimeEnd = date[1];
    },
    timeChange_three(date) {
      this.searchParams.dateVetBegin = date[0];
      this.searchParams.dateVetEnd = date[1];
    },
    timeChange_hospital(){
      this.searchParams.hospitalStartTime = date[0];
      this.searchParams.hospitalEndTime = date[1];
    },
    /**
     * 获取列表数据,搜索接口
     */
    getData() {
      API.FollowBussiness.listPlan(this.searchParams)
        .then(res => {
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
     * 请求随访人的号码
     */
    sfMobile(id) {
      API.FollowBussiness.gethzxx({
        id: id
      })
        .then(res => {
          this.AIform.AIphone = res.data.jtdh;
        })
        .catch(err => {
          //弹出错误信息
          this.$Message.error(err);
        });
    },
    //随访提交
    submitData(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          /**
           * 此处填写具体的ajax请求
           */
          this.$Spin.show();
          API.FollowBussiness.startPlan({
            id: this.id,
            phone: this.AIform.AIphone
          })
            .then(res => {
              this.$Spin.hide();
              this.$Message.success("提交成功!");
              this.AIform.AIphone = "";
              this.followShow = false;
            })
            .catch(err => {
              //弹出错误信息
              this.$Message.error(err);
            });
        } else {
          this.$Message.error("请正确填写信息");
        }
      });
    },
    /**
     * 删除随访计划
     */
    deletPlan(id) {
      this.$Modal.confirm({
        title: "删除设置",
        content: "确定删除该随访计划？",
        onOk: () => {
          API.FollowBussiness.delPlan({
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
     * 开始随访
     */
    startPlan(id) {
      this.id = id;
      // this.followShow = true;
    },
    /**
     * 停止计划
     */
    stopPlan(id) {
      API.FollowBussiness.listPat(this.searchParams)
        .then(res => {
          this.dataList = res.data;
          this.totalPage = res.total;
        })
        .catch(err => {
          //弹出错误信息
          this.$Message.error(err);
        });
      /* 暂停后在回调中刷新当前数据 */
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
          //mjzs //门急诊信息
          if (res.data.mjzs.length) {
            this.mjzData = res.data.mjzs;
          } else {
            this.mjzData = [];
          }
          //住院信息
          if (res.data.cyxjs.length) {
            this.zyData = res.data.cyxjs;
          } else {
            this.zyData = [];
          }

          if (res.data.InspectClient.length) {
            this.tjData = res.data.InspectClient;
          }
          this.currentData = res.data;
        })
        .catch(err => {
          console.log(err);
          //弹出错误信息
          this.$Message.error(err);
        });
    },
    /**
     * 终止随访按钮
     */
    zzsfFun(name, id, sfStatus, notPassReason, notPassRemark) {
      this.$refs.zzsfForm.resetFields();
      this.zzsfModel = true;
      this.sfrName = name;
      this.nowId = id;
      this.sfStatus = sfStatus; //获取当前的随访状态,4=已取消
      if (sfStatus == "4") {
        this.$refs.sfStatusBtn.$el.setAttribute("disabled", true);
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
          API.FollowBussiness.cancleall({
            id: this.nowId,
            notPassReason: this.zzsfForm.select,
            notPassRemark: this.zzsfForm.textarea
          })
            .then(res => {
              this.$Message.success("成功!");
              this.zzsfModel = false;
              this.$refs[name].resetFields();
              this.getData(this.searchParams.pager);
            })
            .catch(err => {
              //弹出错误信息
            });
        } else {
          this.$Message.error("失败");
        }
      });
    },
    /**
     * 获取随访计划详情
     */
    detailFun(id) {
      API.FollowBussiness.detail({
        id: id
      })
        .then(res => {
          this.sfjhData = res.data;
          if (res.data.orders.length) {
            res.data.orders.forEach(item => {
              item.CollectionIndex = item.CollectionIndex.split(",");
            });
          }
        })
        .catch(err => {
          //弹出错误信息
        });
    }
  },
  mounted() {
    this.getData();
    this.getDepartList();
    this.finallConfig();
  }
};
</script>

<style lang="less">
@import "../../../styles/common.less";
@import "../../../styles/jzda.less";
.followPlan {
  &_main {
    &_infoHeader {
      > h3 {
        color: #2d8cf0;
        font-size: 30px;
        >span{
          color: #666;
          font-size: 15px;
          color: #2db7f5;
          margin-left: 20px;
        }
      }
    }
    &_infoBase{
      margin-top: 10px;
      font-size: 0;
      >li{
        width: 50%;
        font-size: 12px;
        color: #666;
        display: inline-block;
        margin-bottom: 5px;

      }
      border-bottom: 4px solid #dadada;
      margin-bottom: 20px;
      padding-bottom: 10px;
    }
    &_infoFooter{
      max-height: 400px;
      overflow-x: auto;
    }
    &_infoHistory{
      h3{
        margin-bottom: 5px;
        font-size:16px;
        color: #666;
      }
      p{
        color: #f90;
      }
      h4{
        margin-top: 10px;
        margin-bottom: 5px;
      }
    }
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

.followPlan {
  form {
    .ivu-form-item {
      margin-bottom: 0;
      padding: 20px 0;
      width: 250px;
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
.patientInfo .ivu-modal .ivu-modal-content {
  .ivu-modal-header {
    .ivu-modal-header-inner,
    .ivu-modal-header p {
      font-size: 16px;
      color: #1c2432;
      font-weight: normal;
    }
  }
  .ivu-modal-body {
    .AIform {
      text-align: center;
      .ivu-form-item {
        padding: 10px 0;
        width: 250px;
        margin-bottom: 0;
        .ivu-form-item-label:before {
          content: "";
        }
        .ivu-form-item-content .ivu-input-wrapper {
          width: 80%;
        }
      }
    }
  }
  .ivu-modal-footer {
    display: none;
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
  border-bottom: 1px dotted #edf3f4;
}

.mb12 {
  margin-bottom: 12px;
}

//随访计划详情
.sfjhModel .ivu-modal .ivu-modal-content {
  border-radius: 6px;
  .ivu-modal-body {
    padding: 0; //计划内容
    .sfjhContent {
      margin: 16px 0 0px;
      padding-bottom: 16px;
      background: #f0f0f0;
      border-radius: 10px; //患者基本信息
      .patientMs {
        background: #fff;
        line-height: 30px;
        padding-bottom: 10px;
        .hzName {
          font-size: 20px;
          color: #ff6800;
        }
        .hzxq {
          font-size: 14px;
        }
      } //诊断信息
      .patientMs2 {
        background: #fff;

        line-height: 24px;
        font-size: 14px;
        padding-bottom: 10px;
      }
    }
  }
  .ivu-modal-footer {
    padding: 0;
    border: none;
  }
}
</style>
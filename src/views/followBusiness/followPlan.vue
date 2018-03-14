<template>
  <Row>
    <!-- 搜索栏 -->
    <Col span="24" class="followPlan">
    <Row class="inter-down_main_search" :gutter="15">
      <Col span="6">
      <span>
        客户姓名
      </span>
      <Input type="text" v-model="searchParams.brxm" placeholder="请输入客户姓名"></Input>
      </Col>
      <Col span="6">
      <span>
        随访方案
      </span>
      <Input type="text" v-model="searchParams.schemeName" placeholder="请输入随访方案"></Input>
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
        生成日期：
      </span>
      <DatePicker @on-change="timeChange_one" type="daterange" placement="bottom-end" placeholder="请选择生成日期"></DatePicker>
      </Col>
      <Col span="6" style="height:32px;margin-top:10px">
      <span style="width:105px;height:32px;">
        计划开始日期：
      </span>
      <DatePicker @on-change="timeChange_two" type="daterange" placeholder="请选择计划开始日期" style="width:calc(100% - 105px)"></DatePicker>
      </Col>
      <!-- <Col span="6" style="height:32px;margin-top:10px">
      <span>
        审核日期：
      </span>
      <DatePicker @on-change="timeChange_three" type="datetimerange" placeholder="请选择审核日期"></DatePicker>
      </Col> -->
      <Col span="6" style="margin-top:10px">
      <Button type="primary" @click="searchParams.pager=1;getData()">查询</Button>
      </Col>
    </Row>
    </Col>
    <!-- 表格 -->
    <Col span="24" class="fpTable">
    <Table border :columns="config" :data="dataList" class="margin-bottom-10" :loading="createLoading">></Table>
    <Row>
      <Page style="float:right" :current="searchParams.pager" :total="totalPage" @on-change="changePage" show-elevator show-total show-sizer :page-size-opts="[10, 20]"></Page>
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
            <div class="info-two bdx1">{{currentData.csny}}</div>
          </div>
          <div class="info-row">
            <div class="info-one">身份证号</div>
            <div class="info-two">{{currentData.sfzh}}</div>
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
        <Col span="12" class="info-col mb12">
        <div class="info" style="height: 32px;">
          <div class="info-row">
            <div class="info-one bdx1">单位</div>
            <div class="info-two bdx1">{{currentData.dwmc}}</div>
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
    <!-- 终止随访 -->
    <Modal v-model="zzsfModel" class-name="zzsfModel" width="480px">
      <p slot="header" style="color:#ed3f14;text-align:center;font-size:16px;">
        <span>终止{{sfrName}}所有随访</span>
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
    <Modal v-model="sfjhModel" title="随访计划详情" class-name="sfjhModel" :styles="{top: '36px'}" width="700">
      <Row class="sfjhContent">
        <Row class="patientMs">
          <Col span="4" offset="4" class="hzName">{{sfjhData.znjqrHzxx.brxm}}</Col>
          <Col span="16" class="hzxq">{{sfjhData.znjqrHzxx.brxb}}
          <span>/</span>{{sfjhData.znjqrHzxx.age}}</Col>
        </Row>
        <Row class="patientMs2">
          <Col span="4" offset="4" class="hzXx1">疾病诊断:</Col>
          <Col span="16" class="hzXx2">{{sfjhData.icdName}}</Col>
        </Row>
        <Row class="patientMs2">
          <Col span="4" offset="4" class="hzXx1">电话号码:</Col>
          <Col span="16" class="hzXx2">{{sfjhData.znjqrHzxx.jtdh}}</Col>
        </Row>
        <Row class="patientMs2">
          <Col span="4" offset="4" class="hzXx1">就诊日期:</Col>
          <Col span="16" class="hzXx2">{{sfjhData.visitStartTime}}</Col>
        </Row>
        <!-- 随访模板 -->
        <Row class="patientMs2 gray">
          <Col span="4" offset="4" class="hzXx1">随访方案:</Col>
          <Col span="16" class="hzXx2">{{sfjhData.schemeName}}</Col>
        </Row>
        <Row class="patientMs2 gray">
          <Col span="4" offset="4" class="hzXx1">随访进度:</Col>
          <Col span="16" class="hzXx2">{{sfjhData.totalNum}}</Col>
        </Row>
        <!-- 随访计划时间 -->
        <Row style="height:500px;overflow-y:auto;">
          <Row class="gray" style="font-size:14px;padding-top:20px;" v-for="(item,index) in sfjhData.orders" :key="index">
            <Col span="20" offset="4">{{item.startDate}}</Col>
            <Row style="padding-left:200px;">
              <Col span="6" v-for="(item1,index1) in item.CollectionIndex" :key="index1+1" style="line-height:30px;">{{item1}}</Col>
            </Row>
          </Row>
        </Row>
      </Row>
      <Row slot="footer">
      </Row>
    </Modal>
  </Row>
</template>

<script>
import { API } from '@/services/index.js';
export default {
  data() {
    return {
      createLoading: true,     //loading 动画加载中
      //搜索选项
      searchParams: {
        brxm: '',//客户姓名
        schemeName: '',//随访方案
        status: '',//审核状态
        pager: 1,//
        dateAddBegin: "",  //生成开始日期（可选）
        dateAddEnd: "",  //生成结束日期（可选）
        VisitStartTimeBegin: "", //计划开始日期（可选）
        VisitStartTimeEnd: "",    //计划结束日期（可选）
        dateVetBegin: "",         //审核开始日期（可选）
        dateVetEnd: "",         //审核结束日期（可选）
        limit: 10,//每页条数
      },
      //列表配置
      config: [
        {
          title: '序号',
          type: 'index',
          align: 'center',
          width: 70,
        },
        {
          title: '客户姓名',
          key: 'brxm',
          align: 'center',
          render: (h, params) => {
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
          title: '随访方案',
          key: 'schemeName',
          align: 'center'
        },
        {
          title: '状态',
          key: 'statusStr',
          align: 'center'
        },
        {
          title: '生成时间',
          key: 'dateAdd',
          align: 'center'
        },
        {
          title: '计划开始时间',
          key: 'visitStartTime',
          align: 'center'
        },
        {
          title: '操作',
          key: 'action',
          width: 250,
          align: 'center',
          /** 
           * 按钮状态
           * 随访中  停止随访  删除
           * 未开始  随访     删除
           * 已暂停  恢复随访  删除
           * 完成    删除
           */
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                'class': {
                  menuHide: this.menuShow(this.AM.FollowBussiness.startPlan)
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.followShow = true;
                    this.sfMobile(params.row.hzxxId)
                    this.startPlan(params.row.id);
                  }
                }
              }, '随访'),
              h('Button', {
                props: {
                  type: 'info',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                'class': {
                  menuHide: this.menuShow(this.AM.FollowBussiness.detail)
                },
                on: {
                  click: () => {
                    this.sfjhModel = true;
                    this.detailFun(params.row.id)
                    /** 
                     * 删除计划
                     */
                    //this.deletPlan(params.row.id);
                  }
                }
              }, '详情'),
              h('Button', {
                props: {
                  type: 'warning',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                'class': {
                  menuHide: this.menuShow(this.AM.FollowBussiness.cancleall)
                },
                on: {
                  click: () => {
                    this.zzsfFun(params.row.brxm, params.row.id, params.row.status, params.row.notPassReason, params.row.notPassRemark)
                  }
                }
              }, '终止随访'),
              // h('Button', {
              //   props: {
              //     type: 'warning',
              //     size: 'small'
              //   },
              //   style: {

              //   },
              //   'class': {
              //     menuHide: this.menuShow(this.AM.FollowBussiness.delPlan)
              //   },
              //   on: {
              //     click: () => {
              //       this.deletPlan(params.row.id)
              //     }
              //   }
              // }, '删除')
            ]);
          }
        }],
      //列表数据
      dataList: [],
      statusList: [
        {
          name: "全部",
          id: ""
        },
        {
          name: "已停止",
          id: 0
        },
        {
          name: "已排期",
          id: 1
        }
      ],//审核状态选项列表
      id: -1,//当前被选中的数据id
      totalPage: 100,//总页数
      followShow: false,//编辑模态框
      //随访数据
      AIform: {
        AIphone: '',
      },
      //当前被点击客户，编辑和详情按钮触发时更换数据
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
        textarea: ''//终止随访备注
      },
      zzsfFormRule: {//终止随访form验证
        select: [
          { required: true, message: '请选择不通过原因', trigger: 'change' }
        ],
        textarea: [
          { required: true, message: '请输入详情', trigger: 'blur' },
        ]
      },
      //随访计划详情
      sfjhModel: false,
      sfjhData: {
        znjqrHzxx: {
          brxm: '',
        },
      },//随访计划详情
      sfStatus: '',//当前客户的随访状态
    }
  },
  methods: {
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
    /** 
 * 获取列表数据,搜索接口
 */
    getData() {
      API.FollowBussiness.listPlan(this.searchParams).then((res) => {
        this.dataList = res.data;
        this.totalPage = res.total;
        this.createLoading = false;
      }).catch((err) => {
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
      }).then((res) => {
        this.AIform.AIphone = res.data.jtdh
      }).catch((err) => {
        //弹出错误信息
        this.$Message.error(err);
      });
    },
    //随访提交
    submitData(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          /** 
 * 此处填写具体的ajax请求
 */
          API.FollowBussiness.startPlan({
            id: this.id,
            phone: this.AIform.AIphone
          }).then((res) => {
            this.$Message.success('提交成功!');
            this.AIform.AIphone = "";
            this.followShow = false;
          }).catch((err) => {
            //弹出错误信息
            this.$Message.error(err);
          });
        } else {
          this.$Message.error('请正确填写信息');
        }
      })
    },
    /** 
     * 删除随访计划
     */
    deletPlan(id) {
      this.$Modal.confirm({
        title: '删除设置',
        content: '确定删除该系统设置？',
        onOk: () => {
          API.FollowBussiness.delPlan({
            id: id
          }).then((res) => {
            this.$Message.success("删除成功");
            this.getData();
          }).catch((err) => {
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
      API.FollowBussiness.listPat(this.searchParams).then((res) => {
        this.dataList = res.data;
        this.totalPage = res.total;
      }).catch((err) => {
        //弹出错误信息
        this.$Message.error(err);
      });
      /* 暂停后在回调中刷新当前数据 */
      this.getData();
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
        console.log(err)
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
      this.sfStatus = sfStatus; //获取当前的随访状态,4=已取消
      if (sfStatus == '4') {
        this.$refs.sfStatusBtn.$el.setAttribute('disabled', true)
      } else {
        this.$refs.sfStatusBtn.$el.removeAttribute('disabled')
      }

      //清空终止随访的旧值
      if (notPassReason != '') {
        this.zzsfForm.select = notPassReason;
        this.zzsfForm.textarea = notPassRemark;
      } else {
        this.zzsfForm.select = '';
        this.zzsfForm.textarea = '';
      }

    },
    //选择终止随访的原因
    xzReason(value) {
      this.zzsfForm.select = value
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
      this.$refs[name].validate((valid) => {
        if (valid) {
          API.FollowBussiness.cancleall({
            id: this.nowId,
            notPassReason: this.zzsfForm.select,
            notPassRemark: this.zzsfForm.textarea,
          }).then((res) => {
            this.$Message.success('成功!');
            this.zzsfModel = false;
            this.$refs[name].resetFields();
            this.getData(this.searchParams.pager)
          }).catch((err) => {
            //弹出错误信息
          });
        } else {
          this.$Message.error('失败');
        }
      })
    },
    /**
     * 获取随访计划详情
     */
    detailFun(id) {
      API.FollowBussiness.detail({
        id: id,
      }).then((res) => {
        this.sfjhData = res.data;
        if (res.data.orders.length) {
          res.data.orders.forEach((item) => {
            item.CollectionIndex = item.CollectionIndex.split(',')
          })
        }
      }).catch((err) => {
        //弹出错误信息
      });
    },
  },
  mounted() {
    this.getData();
  }
}
</script>

<style lang="less">
@import "../../styles/common.less";
@import "../../styles/jzda.less";
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

.followPlan {
  form {
    .ivu-form-item {
      margin-bottom: 0;
      padding: 20px 0;
      width: 250px;
      .ivu-form-item-label:before {
        content: ''
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
          content: ''
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
  border-bottom: 1px dotted #EDF3F4;
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
      border-radius: 10px; //客户基本信息
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

//随访计划背景色
.gray {
  // background: #f0f0f0;
}
</style>
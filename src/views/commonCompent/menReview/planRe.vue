<template>
	<Row class="planRe">
		<!-- 搜索栏 -->
		<Col span="24">
		<Row class="planRe_main_search" :gutter="15">
			<Col span="6">
			<span>
				患者姓名
			</span>
			<Input type="text" v-model="searchParams.brxm" placeholder="请输入患者姓名"></Input>
			</Col>
			<Col span="6" v-show="planType!='normal'">
			<span>
				联系方式
			</span>
			<Input type="text" v-model="searchParams.mobile" placeholder="请输入联系方式"></Input>
			</Col>
			<Col span="6">
			<span>
				随访方案
			</span>
			<Input type="text" v-model="searchParams.schemeName" placeholder="请输入随访方案"></Input>
			</Col>
			<Col span="6" v-show="planType!='normal'">
			<span>
				疾病类型
			</span>
			<Select v-model="searchParams.icdName" filterable remote not-found-text="" :remote-method="remoteMethod" :label-in-value="true" clearable   placeholder="请输入疾病类型">
				<Option v-for="(option, index) in diseaseList" :value="option.value" :key="index">{{option.label}}</Option>
			</Select>
			</Col>
			<Col span="6" v-show="planType=='normal'">
			<span>
				医生
			</span>
			<Input type="text" v-model="searchParams.adminName" placeholder="请输入医生姓名"></Input>
			</Col>
			<Col span="6" v-show="planType=='normal'">
			<span>
				操作者
			</span>
			<Input type="text" v-model="searchParams.operator" placeholder="请输入操作者姓名"></Input>
			</Col>
			<Col span="6">
			<Button type="primary" @click="searchParams.pager=1;getData()">查询</Button>
			</Col>
		</Row>
		</Col>
		<!-- 表格 -->
		<Col span="24" class="fpTable">
		<Table @on-selection-change="selectChange" ref="selection" border :columns="config" :data="dataList" class="margin-bottom-10"></Table>
		<Row class="planRe_main_page">
			<Button @click="handleSelectAll(true)">全选</Button>
			<Button v-if="!menuShow(this.AM.Data.passPlan)" type="primary" @click="passPlan(haveSelect,2)">通过</Button>
			<Button v-if="!menuShow(this.AM.Data.passPlan)" type="warning" @click="passPlan(haveSelect,1)">不通过</Button>
			<Page style="float:right" :total="totalPage" @on-change="changePage" :current="searchParams.pager" show-elevator show-total></Page>
		</Row>
		</Col>
		<!-- 就诊档案模态框 -->
    <Modal v-model="patientDetail" title="患者信息" class-name="patientInfo" :styles="{top: '36px'}" width="1000">
       <person-info 
        :baseData="currentData"
        :outpatientData="mjzData"
        :hospitalData="zyData"
				:physicalData="tjData"
        >
      </person-info>
    </Modal>
    <!-- 随访计划详情 -->
    <Modal v-model="sfjhModel" title="随访计划详情" class-name="planRe_main_info"  width="700">
			<div class="planRe_main_infoHeader">
          <h3>
            {{sfjhData.znjqrHzxx.brxm}}
            <span>
            {{sfjhData.znjqrHzxx.brxb}}/{{sfjhData.znjqrHzxx.age}}
          </span>
          </h3>
          <ul class="planRe_main_infoBase">
            <li>
              疾病名称：{{sfjhData.icdName}}
            </li>
            icdName
            <li>
              联系电话：{{sfjhData.znjqrHzxx.jtdh}}
            </li>
            <li>
              随访方案：{{sfjhData.schemeName}}
            </li>
            <li>
              随访进度：{{sfjhData.totalNum}}
            </li>
          </ul>
      </div>
			 <!-- 随访计划时间 -->
        <div class="planRe_main_infoFooter">
            <Timeline>
              <TimelineItem class="planRe_main_infoHistory"  v-for="(item,index) in sfjhData.orders" :key="index">
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
import { API } from "@/services/index.js";
import personInfo from '../common/personInfo.vue'
export default {
	components: {
    personInfo
  },
  props: {
    planType: {
      type: String,
      default: "normal"
    },
    activeType: {
      type: String,
      default: "0,2"
    }
  },
  data() {
    return {
      diseaseList: [], //疾病标签下拉框数组
      //搜索选项
      searchParams: {
        brxm: "", //患者姓名
        schemeName: "", //随访方案
        brxm: "",
        adminName: "",
        mobile: "",
        icdName: "",
        operator: "",
        type: 1,
        status: "", //审核状态
        pager: 1, //
        limit: 10, //每页条数
        activeType: this.activeType
      },
      //列表配置
      config: [
        {
          type: "selection",
          width: 60,
          align: "center"
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
          title: "联系方式",
          key: "mobile",
          align: "center"
        },
        {
          title: "疾病诊断",
          key: "icdName",
          align: "center"
        },
        {
          title: "随访方案",
          key: "schemeName",
          align: "center"
        },
        {
          title: "审核状态",
          key: "statusStr",
          align: "center",
          render: (h, params) => {
            return h("div", [
              h("div", {}, params.row.statusStr),
              h("div", {}, params.row.vetMinuteName)
            ]);
          }
        },
        {
          title: "生成时间",
          key: "dateAdd",
          align: "center"
        },
        {
          title: "计划开始时间",
          key: "visitStartTime",
          align: "center"
        },
        {
          title: "审核时间",
          key: "dateVet",
          align: "center"
        },
        {
          title: "医生",
          key: "adminName",
          align: "center"
        },
        {
          title: "审核操作",
          key: "action",
          align: "center",
          width: 200,
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
                    menuHide: this.menuShow(this.AM.Data.passPlan)
                  },
                  on: {
                    click: () => {
                      this.passPlan([params.row.id], 2);
                    }
                  }
                },
                "通过"
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
                    menuHide: this.menuShow(this.AM.Data.passPlan)
                  },
                  on: {
                    click: () => {
                      this.sfjhModel = true;
                      this.detailFun(params.row.id);
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
                  class: {
                    menuHide: this.menuShow(this.AM.Data.passPlan)
                  },
                  on: {
                    click: () => {
                      /**
                       * 删除计划
                       */
                      this.passPlan([params.row.id], 1);
                    }
                  }
                },
                "不通过"
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
      haveSelect: [],
      //当前被点击患者，编辑和详情按钮触发时更换数据
      currentData: {},
      //门急诊信息
      mjzData: [],
      //住院信息
			zyData: [],
			tjData:[],
      //患者档案模态框
      patientDetail: false,
      //随访计划详情
      sfjhModel: false,
      sfjhData: {
        znjqrHzxx: {
          brxm: ""
        }
      } //随访计划详情
    };
  },
  methods: {
    /*
		*疾病类型--远程搜索
		*/
    remoteMethod(query) {
      if (query == "") {
        return false;
      }
      this.diseaseList = [];
      API.followProblems
        .disease({
          zjm: query
        })
        .then(res => {
          res.data.forEach(item => {
            this.diseaseList.push({
              value: item.id,
              label: item.value
            });
          });
        })
        .catch(error => {});
    },
    /**
     * 获取列表数据,搜索接口
     */
    getData() {
      API.Dataaudit.listPlan(this.searchParams)
        .then(res => {
          this.dataList = this.dataForm(res.data);
          this.totalPage = res.total;
        })
        .catch(err => {});
    },
    /**
     * 页码改变
     */
    changePage(index) {
      this.searchParams.pager = index;
      this.getData();
    },
    /**
     * 选项改变
     */
    selectChange(select) {
      let arr = [];
      for (let item of select) {
        arr.push(item.id);
      }
      this.haveSelect = arr;
    },
    /**
     * 数据格式化
     */
    dataForm(data) {
      for (const item of data) {
        if (item.status != 0) {
          item._disabled = true;
        }
      }
      return data;
    },
    /**
     * 通过审核
     */
    passPlan(arr, type) {
      console.log(arr);
      this.$Modal.confirm({
        title: "审核确认",
        content: "是否确定执行该操作？",
        onOk: () => {
          API.Dataaudit.passPlan({
            status: type,
            ids: arr
          })
            .then(res => {
              this.$Message.success("操作成功");
              this.getData();
            })
            .catch(err => {});
        }
      });
    },
    /**
     * 全选
     */
    handleSelectAll(status) {
      this.$refs.selection.selectAll(status);
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
          console.log(err);
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
        .catch(err => {});
    }
  },
  mounted() {
    this.getData();
  }
};
</script>

<style lang="less">
@import "../../../styles/jzda.less";
.planRe {
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
      /* margin-bottom: 10px; */
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
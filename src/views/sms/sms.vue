<template>
   <div class="sms">
      <Tabs type="card" value="1" v-bind:style="styleObject" @on-click = "tabClick">
        <!-- 日期 -->
        <TabPane label="日期" name="1">
          <!-- 表格 -->
          <Table border height="521" :columns="columns1" :data="data1" class="smsTable" v-bind:style="styleObject2" :loading = "smsLoading1"></Table>
        </TabPane>
        <!-- 月份 -->
        <TabPane label="月份" name="2">
          <!-- 表格 -->
          <Table border height="521" :columns="columns1" :data="data1" v-bind:style="styleObject2" class="smsTable" :loading = "smsLoading2"></Table>
        </TabPane>
        <!-- 日期选择 -->
        <Select v-model="sameYear" style="width:200px;" slot="extra" @on-change="selectYear">
          <Option v-for="item in yearList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
        <Select v-model="sameMonth" style="width:200px;margin-left: 20px;" v-show="showSelect" slot="extra" @on-change="selectMonth">
          <Option v-for="item in monthList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
      </Tabs>
       <!-- 总计 -->
      <Row class="totals">
        <Col :span="4"> 总计 </Col>
        <Col :span="4" offset="4"> {{ totalNumber.noIntentionStrip }} </Col>
        <Col :span="4"> {{ totalNumber.intentionStrip }} </Col>
        <Col :span="4"> {{ totalNumber.totalStrip }} </Col>
        <Col :span="4"> {{ totalNumber.totalCost }} </Col>
      </Row>
    </div>
</template>
<script>
/**
 * 短信统计
 * @module sms
 */
import { API } from '@/services';
import Point from './formatYear'

export default {
  data () {
    return {
      styleObject: {
        marginTop: '5px',
      },
      styleObject2: {
        marginTop: '15px',
      },
      tabName: '1',//当前选中的tab 1:日期。2：yue 
      yearList: [],//年份集合
      monthList: [//月份集合
        {
          value: '1',
          label: '1月'
        },
        {
          value: '2',
          label: '2月'
        },
        {
          value: '3',
          label: '3月'
        },
        {
          value: '4',
          label: '4月'
        },
        {
          value: '5',
          label: '5月'
        },
        {
          value: '6',
          label: '6月'
        },
        {
          value: '7',
          label: '7月'
        },
        {
          value: '8',
          label: '8月'
        },
        {
          value: '9',
          label: '9月'
        },
        {
          value: '10',
          label: '10月'
        },
        {
          value: '11',
          label: '11月'
        },
        {
          value: '12',
          label: '12月'
        }
      ],
      sameMonth: '',//当前月份
      sameYear: '',//当前年份
      columns1: [//日期
        {
          title: '序号',
          type: 'index'
        },
        {
          title: '发送时间',
          key: 'sendTime'
        },
        {
          title: '无意向发送数',
          key: 'hasnotSendreasonCount'
        },
        {
          title: '有意向发送数',
          key: 'hasSendreasonCount'
        },
        {
          title: '发送总条数(条)',
          key: 'sendMsgCount'
        },
        {
          title: '费用合计(元)',
          key: 'free'
        }
      ],
      data1: [],//数据
      totalNumber: {
        noIntentionStrip: 55,//无意向发送条数
        intentionStrip: 55,//有意向发送条数
        totalStrip: 100,//发送总条数
        totalCost: 1000, //费用合计
      },
      showSelect: true,//是否显示月份select
      // selectMonth: null, //查看某月短信量
      smsLoading1: true,
      smsLoading2: true
    }
  },
  mounted() {
    this.getTime();
  },
  methods: {
    /**
     * 获取当前的年份和月份
     */
    getTime () {
      //获取当前年月
      let date = new Date;
      let years = date.getFullYear();
      let months = date.getMonth() +1;
      this.sameYear = years;
      this.sameMonth = String(months);
      const p1 = new Point(years,years)
      let arr = [];
      arr.push(p1)
      this.yearList = arr;
      this.getList(this.tabName, this.sameYear, this.sameMonth)
    },
    /**
     * 获取短信统计列表
     * @function getList
     * @param {String} type 1:按日汇总 2:按月汇总
     * @param {String} year 需要汇总的年
     * @param {String} month month
     */
    getList (type, year, month) {
      API.sms.selectByTime({
        type: type,
        year: year,
        month: month
      }).then((res) => {
        this.smsLoading1 = false;
        this.smsLoading2 = false;
        // console.log(res.data)
        if(res.code == 0) {
          //处理年月日和费用
          if(this.tabName == 1) {
            res.data.smsCallMonitorVOs.forEach((item) => {
              item.sendTime = item.sendTime.slice(0,4) +'-'+ item.sendTime.slice(4,6)+'-'+item.sendTime.slice(6,8)
              item.free = item.free/100
            });
          }else {
            res.data.smsCallMonitorVOs.forEach((item) => {
              item.sendTime = item.sendTime.slice(0,4) +'-'+ item.sendTime.slice(4,6)
              item.free = item.free/100
            });
          }
          
          this.data1 = res.data.smsCallMonitorVOs
          //总计
          this.totalNumber.totalStrip = res.data.sendMsgCount
          this.totalNumber.noIntentionStrip = res.data.hasnotSendreasonCount
          this.totalNumber.intentionStrip = res.data.hasSendreasonCount
          this.totalNumber.totalCost = res.data.free / 100 
          
          //获取年份
          
          res.data.years.forEach((item, index) => {
           this.yearList[index] = new Point(item, item)
          })
         
          //当前年份和月份
          this.sameYear = res.data.sendTime.slice(0,4)
          this.sameMonth = res.data.sendTime.slice(4,6)
        
        }
			}).catch((error) => {
				console.log(error)
			})
    },
    /**
     * 点击tab切换栏的时候请求当前tab的短信统计
     * @function  tabClick
     */
    tabClick(evt) {
      //当从月份切到日期时，重新给月份赋值
      let date = new Date;
      let months = date.getMonth() +1;
      this.sameMonth = String(months);

      this.selectChange(evt)
    },
    /**
     * 请求统计的function
     * @function selectChange
     */
    selectChange (evt) {
      if(evt == '1') {
        this.showSelect = true;
        this.tabName = 1;
        this.getList(this.tabName, this.sameYear, this.sameMonth)
      }else {
        this.showSelect = false;
        this.tabName = 2;
        this.getList(this.tabName, this.sameYear)
      }
    },
    /**
     * 年份选择的时候产看当前年份统计
     * @function selectYear
     */
    selectYear(val) {
      this.sameYear = val;
      this.selectChange(this.tabName)
    },
    /**
     * 月份选择的时候产看当前年份统计
     * @function selectYear
     */
    selectMonth(val) {
      this.sameMonth = val;
      this.selectChange(this.tabName)
    }
  }
}
</script>

<style lang="scss">
.totals {
  width: 100%;
  height:48px;
  line-height: 48px;
  background:rgba(159, 157, 157, 0.26);
  .ivu-col {
    padding-left: 18px;
  }
}
.smsTable .ivu-table-body {
  height: 479px!important;
}
</style>



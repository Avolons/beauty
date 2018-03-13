<template>
   <div class="sms">
      <Tabs type="card" value="name1" v-bind:style="styleObject" @on-click = "tabClick">
        <!-- 日期 -->
        <TabPane label="日期" name="name1">
          <!-- 表格 -->
          <Table border height="520" :columns="columns1" :data="data1" v-bind:style="styleObject2"></Table>
        </TabPane>
        <!-- 月份 -->
        <TabPane label="月份" name="name2">
          <!-- 表格 -->
          <Table border height="520" :columns="columns1" :data="data1" v-bind:style="styleObject2"></Table>
        </TabPane>
        <!-- 选择时间 -->
        <Select v-model="Month" v-if="showSelect" style="width:200px;" slot="extra" @on-change="selectChange">
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
export default {
  data () {
    return {
      styleObject: {
        marginTop: '5px',
      },
      styleObject2: {
        marginTop: '15px',
      },
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
      Month: '2',//当前月份
      columns1: [//日期
        {
          title: '序号',
          key: 'name'
        },
        {
          title: '发送时间',
          key: 'age'
        },
        {
          title: '无意向发送数',
          key: 'address'
        },
        {
          title: '有意向发送数',
          key: 'name'
        },
        {
          title: '发送总条数(条)',
          key: 'age'
        },
        {
          title: '费用合计(元)',
          key: 'address'
        }
      ],
      data1: [//日期data
        {
          name: 'John Brown',
          age: 18,
          address: 'New York No. 1 Lake Park',
          date: '2016-10-03'
        },
        {
          name: 'John Brown',
          age: 18,
          address: 'New York No. 1 Lake Park',
          date: '2016-10-03'
        },
        {
          name: 'John Brown',
          age: 18,
          address: 'New York No. 1 Lake Park',
          date: '2016-10-03'
        },
        {
          name: 'John Brown',
          age: 18,
          address: 'New York No. 1 Lake Park',
          date: '2016-10-03'
        },
        {
          name: 'John Brown',
          age: 18,
          address: 'New York No. 1 Lake Park',
          date: '2016-10-03'
        },
        {
          name: 'John Brown',
          age: 18,
          address: 'New York No. 1 Lake Park',
          date: '2016-10-03'
        },
        {
          name: 'John Brown',
          age: 18,
          address: 'New York No. 1 Lake Park',
          date: '2016-10-03'
        },
        {
          name: 'John Brown',
          age: 18,
          address: 'New York No. 1 Lake Park',
          date: '2016-10-03'
        },
        {
          name: 'John Brown',
          age: 18,
          address: 'New York No. 1 Lake Park',
          date: '2016-10-03'
        },
        {
          name: 'John Brown',
          age: 18,
          address: 'New York No. 1 Lake Park',
          date: '2016-10-03'
        },
        {
          name: 'John Brown',
          age: 18,
          address: 'New York No. 1 Lake Park',
          date: '2016-10-03'
        },
        {
          name: 'John Brown',
          age: 18,
          address: 'New York No. 1 Lake Park',
          date: '2016-10-03'
        }
        
      ],
      totalNumber: {
        noIntentionStrip: 55,//无意向发送条数
        intentionStrip: 55,//有意向发送条数
        totalStrip: 100,//发送总条数
        totalCost: 1000, //费用合计
      },
      showSelect: true,//是否显示月份select
      selectMonth: null, //查看某月短信量
    }
  },
  methods: {
    /**
     * 如果是name1,则显示月份select
     * @function  tabClick
     */
    tabClick(evt) {
      console.log(evt)
      if(evt == 'name1') {
        this.showSelect = true;
      }else {
        this.showSelect = false;
      }
    },
    /**
     * 查看某月的短信量
     * @function selectChange
     */
    selectChange(val) {
      console.log(val)
      this.selectMonth = val
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
</style>



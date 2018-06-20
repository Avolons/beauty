<style lang="less">
.personInfo {
  &_header {
    > h2 {
      color: #2d8cf0;
      font-size: 30px;
      > span {
        color: #666;
        font-size: 15px;
        color: #2db7f5;
        margin-left: 20px;
      }
    }
    &_baseData {
      margin-top: 10px;
      font-size: 0;
      > li {
        width: 50%;
        font-size: 12px;
        color: #666;
        display: inline-block;
        margin-bottom: 10px;
        box-sizing: border-box;
		padding-right: 20px;
		line-height: 20px;
      }
      border-bottom: 4px solid #dadada;
      margin-bottom: 20px;
      padding-bottom: 10px;
	}
	 &_singleText {
      display: inline-block;
      background-color: #f1f1f1;
      border-radius: 5px;
	  color: #666;
	  width: 100%;
	  box-sizing: border-box;
	  vertical-align: top;
    }
    &_singleTitle {
	  display: inline-block;
      background-color: #2db7f5;
	  color: #fff;
	  padding: 0 5px;
	  border-radius: 5px;
	  margin-right: 5px;
	 /*  border-top-right-radius: 0;
	  border-bottom-right-radius: 0; */
    }
  }

  &_footer {
    max-height: 400px;
    overflow-x: auto;
  }
  &_infoHistory {
    h3 {
      margin-bottom: 5px;
      font-size: 16px;
      color: #2db7f5;
	}
	&_list{
      font-size: 0;
	}
	&_single{
		width: 50%;
        font-size: 12px;
        color: #666;
        display: inline-block;
        margin-bottom: 5px;
        box-sizing: border-box;
		padding-right: 20px;
		line-height: 20px;
	}
	&_title{
	  color: #f90;
	}
  }
  &_index{
	  &_list{
		  border-bottom: 2px solid #f1f1f1;
		  margin-bottom: 10px;
	  }
  }
}
</style>
<template>
	<div class="personInfo">
		<div class="personInfo_header">
			<h2 class="personInfo_header_name">
				{{baseData.brxm}}
				<span>
					{{baseData.brxb}}/{{baseData.mz}}
				</span>
			</h2>
			<ul class="personInfo_header_baseData">
				<li v-for="item in baseList" :key="item.key" v-if="baseData[item.key]" class="personInfo_header_single">
					<span class="personInfo_header_singleText">
						<span class="personInfo_header_singleTitle">
							{{item.title}}:
						</span>
						{{baseData[item.key]}}
					</span>
				</li>
			</ul>
		</div>
		<div class="personInfo_footer">
			<Tabs>
				<TabPane label="门诊" icon="android-people" v-if="outpatientData.length>0">
					<Timeline>
						<TimelineItem class="personInfo_infoHistory" color="#2db7f5" v-for="(item,index) in outpatientData" :key="index">
							<h3>第{{index+1}}次门诊:</h3>
							<ul class="personInfo_infoHistory_list">
								<li class="personInfo_infoHistory_single">
									<span class="personInfo_infoHistory_title">
										就诊卡号:
									</span>
									{{baseData.jzkh}}
								</li>
								<li class="personInfo_infoHistory_single">
									<span class="personInfo_infoHistory_title">
										患者性质:
									</span>
									{{baseData.brxz}}
								</li>
								<li class="personInfo_infoHistory_single">
									<span class="personInfo_infoHistory_title">
										就诊时间:
									</span>
									{{item.jzrq}}
								</li>
								<li class="personInfo_infoHistory_single">
									<span class="personInfo_infoHistory_title">
										是否初诊:
									</span>
									{{item.czbz?"否":"是"}}
								</li>
								<li class="personInfo_infoHistory_single">
									<span class="personInfo_infoHistory_title">
										就诊科室:
									</span>
									{{item.ksmc}}
								</li>
								<li class="personInfo_infoHistory_single">
									<span class="personInfo_infoHistory_title">
										就诊医生:
									</span>
									{{item.ysxm}}
								</li>
								<li class="personInfo_infoHistory_single">
									<span class="personInfo_infoHistory_title">
										主诉:
									</span>
									{{item.zs}}
								</li>
								<li class="personInfo_infoHistory_single">
									<span class="personInfo_infoHistory_title">
										诊断:
									</span>
									{{item.zdmc}}
								</li>
							</ul>
						</TimelineItem>
					</Timeline>
				</TabPane>
				<TabPane label="住院" icon="android-done-all" v-if="hospitalData.length>0">
					<Timeline>
						<TimelineItem class="personInfo_infoHistory" color="#2db7f5"  v-for="(item,index) in hospitalData" :key="index">
							<h3>第{{index+1}}次住院:</h3>
							<ul class="personInfo_infoHistory_list">
								<li class="personInfo_infoHistory_single">
									<span class="personInfo_infoHistory_title">
										住院号:
									</span>
									{{item.zyhm}}
								</li>
								<li class="personInfo_infoHistory_single">
									<span class="personInfo_infoHistory_title">
										患者性质:
									</span>
									{{baseData.brxz}}
								</li>
								<li class="personInfo_infoHistory_single">
									<span class="personInfo_infoHistory_title">
										入院时间:
									</span>
									{{item.admissiontime}}
								</li>
								<li class="personInfo_infoHistory_single">
									<span class="personInfo_infoHistory_title">
										出院时间:
									</span>
									{{item.leavetime}}
								</li>
								<li class="personInfo_infoHistory_single">
									<span class="personInfo_infoHistory_title">
										入院科室:
									</span>
									{{item.departname}}
								</li>
								<li class="personInfo_infoHistory_single">
									<span class="personInfo_infoHistory_title">
										主治医生：
									</span>
									{{item.doctorname}}
								</li>
								<li class="personInfo_infoHistory_single">
									<span class="personInfo_infoHistory_title">
										入院诊断:
									</span>
									{{item.admissiondiagnose}}
								</li>
								<li class="personInfo_infoHistory_single">
									<span class="personInfo_infoHistory_title">
										出院诊断:
									</span>
									{{item.leavediagnose}}
								</li>
								<li class="personInfo_infoHistory_single">
									<span class="personInfo_infoHistory_title">
										入院情况:
									</span>
									{{item.admissiondescription}}
								</li>
								<li class="personInfo_infoHistory_single">
									<span class="personInfo_infoHistory_title">
										出院情况:
									</span>
									{{item.leavedescription}}
								</li>
							</ul>
						</TimelineItem>
					</Timeline>
				</TabPane>
				<TabPane label="体检" icon="android-search" v-if="physicalData.length>0">
					<Timeline>
						<TimelineItem class="personInfo_infoHistory" color="#2db7f5"  v-for="(item,index) in physicalData" :key="index">
							<h3>第{{index+1}}次体检：</h3>
							<ul class="personInfo_infoHistory_list">
								<li class="personInfo_infoHistory_single">
									<span class="personInfo_infoHistory_title">
										体检套餐编号:
									</span>
									{{item.tjtcbh}}
								</li>
								<li class="personInfo_infoHistory_single">
									<span class="personInfo_infoHistory_title">
										预约体检日期:
									</span>
									{{baseData.yytjrq}}
								</li>
								<li class="personInfo_infoHistory_single">
									<span class="personInfo_infoHistory_title">
										体检套餐名称:
									</span>
									{{item.tjtcmc}}
								</li>
								<li class="personInfo_infoHistory_single">
									<span class="personInfo_infoHistory_title">
										建档时间:
									</span>
									{{item.jdsj}}
								</li>
								<li class="personInfo_infoHistory_single">
									<span class="personInfo_infoHistory_title">
										总检医生编码:
									</span>
									{{item.zjysbm}}
								</li>
								<li class="personInfo_infoHistory_single">
									<span class="personInfo_infoHistory_title">
										总检医生:
									</span>
									{{item.zjys}}
								</li>
								<li class="personInfo_infoHistory_single">
									<span class="personInfo_infoHistory_title">
										体检总检结果:
									</span>
									{{item.tjzjjg}}
								</li>
								<li class="personInfo_infoHistory_single">
									<span class="personInfo_infoHistory_title">
										体检健康建议:
									</span>
									{{item.tjjkjy}}
								</li>
							</ul>
							<h3>体检项目：</h3>
							<ul v-for="ite in item.detailList" :key="ite.id" class="personInfo_infoHistory_list personInfo_index_list">
								<li class="personInfo_infoHistory_single">
									<span class="personInfo_infoHistory_title">
										项目名称:
									</span>
									{{ite.xmmxmc}}
								</li>
								<li class="personInfo_infoHistory_single">
									<span class="personInfo_infoHistory_title">
										项目小结:
									</span>
									{{ite.jgts}}
								</li>
								<li class="personInfo_infoHistory_single">
									<span class="personInfo_infoHistory_title">
										完成状态:
									</span>
									{{ite.tjtcmc}}
								</li>
								<li class="personInfo_infoHistory_single">
									<span class="personInfo_infoHistory_title">
										体检科室:
									</span>
									{{ite.xmlbmc}}
								</li>
								<li class="personInfo_infoHistory_single">
									<span class="personInfo_infoHistory_title">
										体检时间:
									</span>
									{{ite.tjsj}}
								</li>
								<li class="personInfo_infoHistory_single">
									<span class="personInfo_infoHistory_title">
										结果值:
									</span>
									{{ite.jgz}}
								</li>
								<li class="personInfo_infoHistory_single">
									<span class="personInfo_infoHistory_title">
										上限值:
									</span>
									{{ite.sxz}}
								</li>
								<li class="personInfo_infoHistory_single">
									<span class="personInfo_infoHistory_title">
										下限值:
									</span>
									{{ite.xxz}}
								</li>
							</ul>
						</TimelineItem>
					</Timeline>
				</TabPane>
			</Tabs>
			<!-- 分为门诊和住院两种 -->
			
		</div>
	</div>
</template>

<script>
export default {
  props: {
    /* 基础信息 */
    baseData: {
      type: Object,
      default: () => {}
    },
    /* 门诊数据 */
    outpatientData: {
      type: Array,
      default: () => []
    },
    /* 住院数据 */
    hospitalData: {
      type: Array,
      default: () => []
	},
	/* 体检数据 */
	physicalData: {
      type: Array,
      default: () => []
	},
  },
  data() {
    return {
      baseList: [
        {
          title: "婚姻状态",
          key: "maritalStatus"
        },
        /* {
          title: "民族",
          key: "mz"
        }, */
        {
          title: "身份证号",
          key: "sfzh"
        },
        {
          title: "联系方式",
          key: "jtdh"
        },
        {
          title: "出生年月",
          key: "csny"
        },
        {
          title: "地址",
          key: "xzzQtdz"
        },
        {
          title: "邮箱",
          key: "email"
        },
        {
          title: "单位",
          key: "dwmc"
        },
        {
          title: "部门",
          key: "department"
        },
        {
          title: "职务",
          key: "dutiesTitle"
        },
        {
          title: "紧急联系人",
          key: "lxrm"
        },
        {
          title: "联系人关系",
          key: "lxgx"
        },
        {
          title: "联系人地址",
          key: "lxdz"
        },
        {
          title: "联系人电话",
          key: "lxdh"
		},
		{
          title: "诊断结果",
          key: "diagnose"
        },
        {
          title: "治疗方案",
          key: "treatmentPlan"
        },
      ]
    };
  }
};
</script>


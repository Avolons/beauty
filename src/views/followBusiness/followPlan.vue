<template>
    <Row>
        <!-- 搜索栏 -->
        <Col span="24" class="followPlan">
        <Row class="inter-down_main_search" :gutter="15">
                <Col span="6">
                <span>
                    患者姓名
                </span>
                <Input type="text" v-model="searchParams.brxm" placeholder="请输入患者姓名"></Input>
                </Col>
                <Col span="6">
                <span>
                    随访方案
                </span>
                <Input type="text" v-model="searchParams.schemeName" placeholder="请输入随访方案"></Input>
                </Col>
                <Col span="6">
                <span>
                    审核状态
                </span>
                <Select v-model="searchParams.status">
                    <Option v-for="item in statusList" :value="item.id" :key="item.id">{{item.name}}</Option>
                </Select>
                </Col>
                <Col span="6">
                   <Button type="primary" @click="searchParams.pager=1;getData()">查询</Button>
                </Col>
            </Row>
        </Col>
        <!-- 表格 -->
        <Col span="24" class="fpTable">
        <Table border :columns="config" :data="dataList" class="margin-bottom-10"></Table>
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
    </Row>
</template>

<script>
import { API } from '@/services/index.js';
export default {
    data() {
      return {
        //搜索选项
        searchParams: {
            brxm: '',//患者姓名
            schemeName: '',//随访方案
            status: '',//审核状态
            pager: 1,//
            limit:10,//每页条数
        },
        //列表配置
        config: [
            {
                title: '患者姓名',
                key: 'brxm',
                align: 'center',
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
                title: '随访方案',
                key: 'schemeName',
                align: 'center'
            },

            {
                title: '审核状态',
                key: 'statusStr',
                align: 'center'
            },
            {
                title: '生成时间',
                key: 'dateAdd',
                align: 'center'
            },
            {
                title: '审核时间',
                key: 'dateVet',
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
                            style: {
                                marginRight: '5px'
                            },
                            'class':{
                							menuHide:this.menuShow(this.AM.FollowBussiness.startPlan)
                						},
                            on: {
                                click: () => {
                                    this.startPlan(params.row.id);
                                }
                            }
                        }, '随访'),
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
                                    /** 
                                     * 删除计划
                                     */
                                    this.deletPlan(params.row.id);
                                }
                            }
                        }, '删除')
                    ]);
                }
            }],
        //列表数据
        dataList: [],
        statusList: [
          {
            name:"全部",
            id:""
          },
          {
            name:"待审核",
            id:0
          },
          {
            name:"不通过",
            id:1
          },
          {
            name:"审核通过",
            id:2
          },
          {
            name:"已排期",
            id:3
          },
          {
            name:"已取消",
            id:4
          }
        ],//审核状态选项列表
        id: -1,//当前被选中的数据id
        totalPage: 100,//总页数
        followShow: false,//编辑模态框
        //随访数据
        AIform: {
          AIphone: '',
        },
        //当前被点击患者，编辑和详情按钮触发时更换数据
        currentData: {},
        //门急诊信息
        mjzData: [],
        //住院信息
        zyData: [],
        //详情模态框
        patientDetail: false,
      }
    },
    methods: {
        /** 
		 * 获取列表数据,搜索接口
		 */
        getData() {
            API.FollowBussiness.listPlan(this.searchParams).then((res)=>{
				this.dataList=res.data;
				this.totalPage=res.total;
			}).catch((err)=>{

			});
        },
		/** 
		 * 页码改变
		 */
        changePage(index) {
            this.searchParams.pager = index;
            this.getData();
        },
        //随访提交
        submitData(name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    /** 
					 * 此处填写具体的ajax请求
					 */
                    API.FollowBussiness.startPlan({
                        id:this.id,
                        phone:this.AIform.AIphone
                    }).then((res)=>{
                        this.$Message.success('提交成功!');
                        this.AIform.AIphone="";
                        this.followShow = false;
                    }).catch((err)=>{

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

					});
				}
			});
            
        },
        /** 
         * 开始随访
         */
        startPlan(id) {
            this.id = id;
            this.followShow = true;
        },
        /** 
         * 停止计划
         */
        stopPlan(id) {
            API.FollowBussiness.listPat(this.searchParams).then((res)=>{
      				this.dataList=res.data;
      				this.totalPage=res.total;
      			}).catch((err)=>{

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
    },
    mounted () {
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
</style>
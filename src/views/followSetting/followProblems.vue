<style lang="less">
.patientSearch {
  /* 	background: #fff; */
  form {
    .ivu-form-item {
      margin-bottom: 0;
      padding: 20px 0;
      width: 240px;
      .ivu-form-item-label:before {
        content: ''
      }
    }
  }
  .patientList {
    padding: 10px;
  }
  .pages {
    .ivu-page {
      float: right;
      padding: 10px 20px 10px 0;
    }
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
}

.infoRow {
  .infoCol12 {
    height: 65px;
    padding: 0px 20px!important;
    .info {
      width: 442px;
      height: 65px;
      border: 1px solid #DCEBF7;
      .info-row {
        .info1 {
          width: 110px;
          height: 32px;
          float: left;
          line-height: 32px;
          color: #336199;
          background-color: #EDF3F4;
          text-align: right;
          padding-right: 10px;
        }
        .info2 {
          width: 330px;
          height: 32px;
          float: left;
          line-height: 32px;
          padding-left: 15px;
        }
      }
    }
  }
  .infoCol24 {
    /* background: #f9f9f9; */
    padding: 15px;
    .infoRow2 {
      .sfCol4 {
        .counts {
          width: 80px;
          height: 80px;
          color: #fff;
          border-radius: 10px;
          line-height: 1.5;
          background: #2a8bcb;
          padding-top: 10px;
          text-align: center;
          .suifang {
            font-size: 28px;
          }
          .sfCounts {
            font-size: 14px;
          }
        }
      }
      .sfCol20 {
        h3 {
          padding: 20px 0 10px 0;
          font-size: 24px;
          font-weight: normal;
          line-height: 24px;
        }
        .sfTime {
          span {
            color: #FF892A;
          }
        }
      }
    }
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
}

.bb1 {
  border-bottom: 1px solid #fff;
}

.bdx1 {
  border-bottom: 1px dotted #EDF3F4;
}

.mb12 {
  margin-bottom: 12px;
} //搜索框
.wayForm {
  .ivu-form-item {
    width: 200px;
  }
  .ivu-form-item:nth-of-type(3),
  .ivu-form-item:nth-of-type(4) {
    width: 100px;
    .ivu-form-item-content {
      margin-left: 30px!important;
    }
  }
}

.followProblem {
  &_main {
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
  }
}
</style>
<template>
  <Row class="followProblem">
    <!-- 搜索栏 -->
    <Col span="24">
    <Row class="followProblem_main_search" :gutter="15">
      <Col span="6">
      <span>
        问题标题
      </span>
      <Input type="text" v-model="proSearch.title" placeholder="请输入问题名称"></Input>
      </Col>
      <Col span="6">
      <span>
        疾病类型
      </span>
      <Select v-model="proSearch.diseaseName" filterable remote not-found-text="" :remote-method="remoteMethod2" clearable placeholder="请输入疾病类型">
        <Option v-for="(option, index) in diseaseList" :value="option.value" :key="index">{{option.label}}</Option>
      </Select>
      </Col>
      <Col span="6">
      <Button style="margin-right:10px" type="primary" @click="handleSearch('proSearch')">查询</Button>
      <Button type="info"  v-if="!menuShow(this.AM.FollowSetting.addPro)"  @click="addBtn('proRuleModel')">添加问题</Button>
      </Col>
    </Row>
    </Col>
    <!-- 表格 -->
    <Col span="24">
    <Table border :columns="config" :data="pardata"></Table>
    </Col>
    <!-- 分页 -->
    <Col span="24" style="margin-top:10px;">
    <Page style="float:right" :total="pageTotal" :current="page"  @on-change="currentPage" show-elevator show-total></Page>
    </Col>
    <!-- 详情模态框 -->
    <Modal v-model="patientText" title="添加问题 / 编辑问题" width="650">
      <Form :model="formItem" :label-width="100" ref="proRuleModel" :rules="proRuleModel">
        <input type="hidden" v-model="formItem.id" placeholder="id">
        <FormItem label="问题标题" prop="title">
          <Input v-model="formItem.title" placeholder="请输入问题标题"></Input>
        </FormItem>
        <FormItem label="问题内容" prop="content">
          <Input v-model="formItem.content" placeholder="请输入随访问题内容"></Input>
        </FormItem>
        <FormItem label="疾病类型" prop="diseaseId">
          <Select :label="labelobj" v-model="formItem.diseaseId" multiple filterable remote :remote-method="remoteMethod2" not-found-text="" placeholder="搜索疾病类型添加至疾病标签">
            <Option v-for="(option, index) in diseaseList" :value="option.value" :key="index">{{option.label}}</Option>
          </Select>
        </FormItem>
        <FormItem label="采集指标">
          <RadioGroup v-model="formItem.isTarget" @on-change="targetChange">
            <Radio label="0">是</Radio>
            <Radio label="1">否</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem label="指标类型" v-show="targetShow">
          <Select @on-change="remoteMethod1()" v-model="search.otype">
            <Option value="01">症状</Option>
            <Option value="02">体征</Option>
            <Option value="03">生活方式指导</Option>
            <Option value="04">辅助检查</Option>
            <Option value="05">用药反馈</Option>
            <Option value="06">转诊情况</Option>
            <Option value="07">通用</Option>
          </Select>
        </FormItem>
        <FormItem label="疾病类型" v-show="targetShow">
          <Select @on-change="remoteMethod1()" clearable v-model="search.diseaseId" filterable remote :remote-method="remoteMethod" not-found-text="" placeholder="搜索疾病类型添加至疾病标签">
            <Option v-for="(option, index) in options3" :value="option.value" :key="index">{{option.label}}</Option>
          </Select>
        </FormItem>
        <FormItem label="关联指标" prop="targetName1" v-show="targetShow">
          <Select :label="taglabel" v-model="formItem.targetName1" filterable remote :remote-method="remoteMethod1" :loading="loading1" clearable :label-in-value="true"  not-found-text="">
            <Option v-for="(option, index) in options1" :value="option.value" :key="index">{{option.label}}</Option>
          </Select>
        </FormItem>
        <FormItem label="纯放音">
          <RadioGroup v-model="formItem.playWavOnly" >
            <Radio label="1">是</Radio>
            <Radio label="0">否</Radio>
          </RadioGroup>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="primary" @click="addModel('proRuleModel')">保存</Button>
      </div>
    </Modal>
  </Row>
</template>

<script>
import { API } from '@/services';
export default {
  data() {
    return {
      page:1,
      taglabel: "",
      //指标筛选
      search: {
        pager: 1,
        limit: 999999,
        otype: "",
        diseaseId: "",
        zjm: ""
      },
      labelobj: [],
      options3: [],
      proSearch: {//搜索框
        title: '',
        diseaseName: '',
      },
      config: [//表格栏
        {
          title: '问题标题',
          key: 'title',
          align: 'center'
        },
        {
          title: '疾病类型',
          key: 'diseaseName',
          align: 'center'
        },
        {
          title: '问题内容',
          key: 'content',
          align: 'center'
        },
        {
          title: '关联指标',
          key: 'targetName',
          align: 'center'
        },
        {
          title: '指标类型',
          key: 'otype',
          align: 'center',
          render: (h, params) => {
            if (params.row.otype == '01') {
              return params.row.type = '症状'
            } else if (params.row.otype == '02') {
              return params.row.type = '体征'
            } else if (params.row.otype == '03') {
              return params.row.type = '生活方式指导'
            } else if (params.row.otype == '04') {
              return params.row.type = '辅助检查'
            } else if (params.row.otype == '05') {
              return params.row.type = '用药反馈'
            } else if (params.row.otype == '06') {
              return params.row.type = '转诊情况'
            } else if (params.row.otype == '07') {
              return params.row.type = '通用'
            }
            return h('div', {
            }, params.row.type);
          }
        },
        {
          title: '操作',
          key: 'action',
          width: 250,
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                'class':{
									menuHide:this.menuShow(this.AM.FollowSetting.editPro)
								},
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.patientText = true;
                    this.search.otype = "";
                    this.search.diseaseId = "";
                    /* this.formItem.targetName1 =""; */
                    API.followProblems.editList({
                      "id": params.row.id
                    }).then((res) => {
                        this.formItem.id = res.data.id
                        this.formItem.title = res.data.title
                        this.formItem.content = res.data.content
                        this.formItem.playWavOnly = res.data.playWavOnly
                        this.formItem.isTarget = res.data.isTarget
                        let arr = [];
                        res.data.diseaseId = res.data.diseaseId.split(",");
                        res.data.diseaseName = res.data.diseaseName.split(",");
                        res.data.diseaseId.forEach((item, index) => {
                          arr.push({
                            value: item,
                            label: res.data.diseaseName[index]
                          })
                        })
                        this.diseaseList = arr;
                        let result = [];
                        this.labelobj = [];
                        for (const item of arr) {
                          result.push(item.value);
                          this.labelobj.push(item.label);
                        }
                        this.formItem.diseaseId = result;
                        if (res.data.isTarget == '0') {
                          this.targetShow = true
                          this.tagShow = true
                        } else {
                          this.targetShow = false
                          this.tagShow = false
                          this.targetTag = ''
                        }
                        this.options1 = [];
                        this.options1.push({
                          label: res.data.targetName,
                          value: res.data.targetId,
                        })
                        this.taglabel = res.data.targetName;
                        this.formItem.targetName1 = res.data.targetId
                    
                    }).catch((error) => {
                      console.log(error)
                    })
                  }
                }
              }, '编辑'),
              h('Button', {
                props: {
                  type: params.row.playWavOnly==1?'dashed':'info',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                'class':{
									menuHide:this.menuShow(this.AM.FollowSetting.editVoice) 
								},
                on: {
                  click: () => {
                    if(params.row.playWavOnly!=1){
                      let id = params.row.id
                      this.$router.push({ path: `/followSetting/voice/voice/${params.row.id}` });
                    }
                    
                  }
                }
              }, '编辑话述'),
              h('Button', {
                props: {
                  type: 'warning',
                  size: 'small'
                },
                'class':{
									menuHide:this.menuShow(this.AM.FollowSetting.delPro)
								},
                on: {
                  click: () => {
                    this.$Modal.confirm({
                      title: '删除问题',
                      content: '<p>确定要删除该问题吗?</p>',
                      onOk: () => {
                        this.deleteRow(params.row.id)
                      },
                      onCancel: () => {
                      }
                    });
                  }
                }
              }, '删除'),
            ]);
          }
        }],
      pardata: [],//表格data
      pageTotal: 0,//数据总计
      patientText: false,//编辑模态框
      diseaseIdInp: '',//疾病id隐藏域
      formItem: {
        id: '',
        title: '',
        content: '',
        targetId: '',
        targetName1: '',
        diseaseName: [],
        diseaseId: [],
        model10: [],
        playWavOnly: '0',
        isTarget: '0'//是否采集指标
      },
      proRuleModel: {//模态框校验
        title: [
          { required: true, message: '问题标题问题标题不能为空', trigger: 'blur' },
          { type: 'string', max: 30, message: '最大长度不超过30', trigger: 'blur' }
        ],
        content: [
          { required: true, message: '问题内容不能为空', trigger: 'blur' }
        ],
        diseaseId: [
          { required: true, type: "array", message: '疾病类型不能为空', trigger: 'blur' }
        ],
        password: [
          { required: true, message: 'Please fill in the password.', trigger: 'blur' },
          { type: 'string', min: 6, message: 'The password length cannot be less than 6 bits', trigger: 'blur' }
        ]
      },
      tagCount: [],
      tagCount2: [],
      tagCountId: [],
      editRules: {
      },
      zjmdata: [],//助记码array
      loading1: false,
      options1: [],
      listdata: [],
      loading2: false,
      diseaseList: [],
      listdata2: [],
      diseasedata: [],
      selectLabel: '',
      selectValue: '',
      targetShow: true,//判断是否疾病标签是否展示
      targetTag: '',//指标标签
      tagShow: false,//标签是否展示,
      targetSelectId: '',//选中指标的id
      selectOtype: ''//模态框选中的指标类型
    }
  },
  mounted() {
    this.list(1)
  },

  methods: {
    /** 
     * 清空所有数据
     */
    clearAllData() {

    },
    /*
   *获取prolist列表数据
   */
    list(pager) {
   
      API.followProblems.list({
        'pager': pager,
        'limit': '10',
      }).then((res) => {
        if (res.code == 0) {
          // console.log(res)
          this.pardata = res.data
          this.pageTotal = res.total
        } else {
          console.log(res.code)
        }
      }).catch((error) => {
        console.log(error)
      })
    },
    /*
    *获取分页列表数据
    */
    currentPage: function(page) {
      this.page=page;
      API.followProblems.list({
        pager: page,
        limit: '10',
        title: this.proSearch.title,
        diseaseId: this.proSearch.diseaseName
      }).then((res) => {
        if (res.code == 0) {
          this.pardata = res.data
          this.pageTotal = res.total
        } else {
          console.log(res.message)
        }
      }).catch((error) => {
        console.log(error)
      })
    },
    /*
    *获取选中的指标value
    */
    targetRadio(value) {
      /* console.log(value)

      API.follSetting.list({
        pager: 1,
        limit: '10',
        name: value.label,
      }).then((res) => {
        if (res.code == 0) {
          console.log(res)
          this.selectOtype = res.data[0].otype
          let otypeName
          if (res.data[0].otype == '01') {
            otypeName = '症状'
          } else if (res.data[0].otype == '02') {
            otypeName = '体征'
          } else if (res.data[0].otype == '03') {
            otypeName = '生活方式指导'
          } else if (res.data[0].otype == '04') {
            otypeName = '辅助检查'
          } else if (res.data[0].otype == '05') {
            otypeName = '用药反馈'
          } else if (res.data[0].otype == '06') {
            otypeName = '转诊情况'
          } else if (res.data[0].otype == '07') {
            otypeName = '通用'
          }
          if (this.formItem.targetName1 != '') {
            this.tagShow = true
            this.targetTag = otypeName
            this.targetSelectId = res.data[0].id
          } else {
            this.tagShow = false
            this.targetTag = ''
          }
          // console.log('this.targetTag='+this.targetTag)
        } else {
          console.log(res.message)
        }
      }).catch((error) => {
        console.log(error)
      }) */
    },
    /*
    *查询功能
    */
    handleSearch() {
      API.followProblems.list({
        'pager': 1,
        'limit': '10',
        'title': this.proSearch.title,
        'diseaseId': this.proSearch.diseaseName
      }).then((res) => {
        if (res.code == 0) {
          this.pardata = res.data
          this.pageTotal = res.total
        } else {
          console.log(res.message)
        }
      }).catch((error) => {
        console.log(error)
      })
    },
    /*
    *添加指标
    */
    addBtn(name) {
      this.formItem.targetName1="";
      this.formItem.id = "";
      this.patientText = true;//打开模态框
      this.$refs[name].resetFields();//清空表单
    },
    /*
    *获取选中的疾病标签列value
    */
    selectChange(value) {
      console.log(value.label)
      this.selectLabel = value.label
      this.selectValue = value.value
    },
    /*
    *确定添加
    */
    addModel(name) {

      let jbnam = this.tagCount.join(',')
      let addPram = {
        "id": this.formItem.id,
        "title": this.formItem.title,
        "isTarget": this.formItem.isTarget,
        "content": this.formItem.content,
        "targetId": this.formItem.targetName1,
        "diseaseId": JSON.parse(JSON.stringify(this.formItem.diseaseId)).join(','),
        "playWavOnly": this.formItem.playWavOnly,
        "status": 0,
        /* "otype": this.search.otype */
      }
      this.$refs[name].validate((valid) => {
        if (valid) {
          API.followProblems.addList(addPram).then((res) => {
            this.search.otype = "";
            this.search.diseaseId = "";
            this.formItem.name = ''
            this.formItem.select2 = ''
            this.formItem.select = ''
            this.formItem.radio = 'string'
            this.formItem.textarea = ''
            this.patientText = false;
            this.tagCount = []//清空疾病标签
            this.list(this.page);
            this.$Message.success("提交成功");
          }).catch((error) => {
            console.log(error)
          })
        } else {
          this.$Message.error('Fail!');
        }
      })
    },
    /*
    *删除
    */
    deleteRow(id) {
      API.followProblems.deleteList({
        id: id
      }).then((res) => {
        if (res.code == 0) {
          console.log(res.message)
          this.list(1)
          this.$Message.success({
            content: '删除成功',
            top: 500
          });
        } else {
          alert(res.message)
        }
      }).catch((error) => {
        console.log(error)
      })
    },
    /*
    *监听是否采集指标
    */
    targetChange(value) {
      if (value == '0') {
        this.targetShow = true;
      } else {
        this.formItem.targetName1="";
        this.targetShow = false;
      }
    },
    /* remove(index) {
      this.pardata.splice(index, 1);
    }, */
    /*
    *指标类型--远程搜索
    */
    remoteMethod1(query) {
      if (query == "") {
        return false;
      }
      this.options1 = [];
      this.search.zjm = query;
      API.follSetting.list(this.search).then((res) => {
        res.data.forEach((item) => {
          this.options1.push({
            value: item.id,
            label: item.name
          });
        })
      }).catch((error) => {
        console.log(error)
      })
    },
    /*
   *指标类型--远程搜索
   */
    remoteMethod(query) {
      if (query == "") {
        return false;
      }
      this.options3 = [];
      API.followProblems.disease({
        'zjm': query
      }).then((res) => {
        res.data.forEach((item) => {
          this.options3.push({
            value: item.id,
            label: item.value
          })
        })
      }).catch((error) => {
        console.log(error)
      })
    },
    /*
    *疾病类型--远程搜索
    */
    remoteMethod2(query) {
      if (query == "") {
        return false;
      }
      this.diseaseList = [];
      API.followProblems.disease({
        'zjm': query
      }).then((res) => {
        res.data.forEach((item) => {
          this.diseaseList.push({
            value: item.id,
            label: item.value
          });
        })
      }).catch((error) => {
        console.log(error)
      })
    },
  }
}
</script>


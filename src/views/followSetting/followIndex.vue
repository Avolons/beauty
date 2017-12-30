<style lang="less">
@import "../../styles/common.less"; //详情
.patientInfo .ivu-modal .ivu-modal-content {
  .ivu-modal-header {
    .ivu-modal-header-inner,
    .ivu-modal-header p {
      font-size: 16px;
      color: #1c2432;
      font-weight: normal;
    }
  }
  .ivu-modal-footer {
    display: none;
  }
}

.wayForm {
  .ivu-form-item {
    width: 240px;
  }
  .ivu-form-item:nth-of-type(4),
  .ivu-form-item:nth-of-type(5) {
    width: 100px;
    .ivu-form-item-content {
      margin-left: 30px!important;
    }
  }
}

.followIndex {


  &_main {
    &_select {
      background-color: #f1f1f1;
      border-radius: 3px;
      display: inline-block;
      position: relative;
      padding: 0 8px;
      height: 25px;
      line-height: 25px;
      margin-right: 15px;
    }
    &_delet {
      position: absolute;
      top: -5px;
      right: -5px;
      font-size: 14px;
      cursor: pointer;
    }
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
  <Row class="followIndex">
    <!-- 搜索栏 -->
    <Col span="24" class="searchCol">
    <Row class="followIndex_main_search" :gutter="15">
      <Col span="6">
      <span>
        指标名称
      </span>
      <Input type="text" v-model="IndexSearch.name" placeholder="请输入指标名称"></Input>
      </Col>
      <Col span="6">
      <span>
        指标类型
      </span>
      <Select v-model="IndexSearch.select">
        <Option value="">无</Option>
        <Option value="01">症状</Option>
        <Option value="02">体征</Option>
        <Option value="03">生活方式指导</Option>
        <Option value="04">辅助检查</Option>
        <Option value="05">用药反馈</Option>
        <Option value="06">转诊情况</Option>
        <Option value="07">通用</Option>
      </Select>
      </Col>
      <Col span="6">
      <span>
        疾病类型
      </span>
      <Select v-model="IndexSearch.diseaseId" filterable remote not-found-text="" :remote-method="remoteMethod2" :label-in-value="true" clearable @on-change="selectChange" placeholder="请输入名称首字母">
        <Option v-for="(option, index) in options2" :value="option.value" :key="index">{{option.label}}</Option>
      </Select>
      </Col>
      <Col span="6">
      <Button style="margin-right:10px" type="primary" @click="handleSearch('IndexSearch')">查询</Button>
      <Button type="info" @click="addBtn">添加指标</Button>
      </Col>
    </Row>
    </Col>
    <Col span="24" class="fpTable">
    <Table border :columns="config" :data="datalist" class="margin-bottom-10"></Table>
    <Row>
      <Page style="float:right" :total="pageTotal" @on-change="currentPage" show-elevator show-total></Page>
    </Row>
    </Col>
    <!-- 编辑功能模态框 -->
    <Modal v-model="patientText" title="添加指标 / 编辑指标" @on-ok="ok" @on-cancel="cancel()" width="650" class-name="patientInfo">
      <Form :model="formItem" :label-width="100" ref="formValidate" :rules="followIndexVal">
        <input type="hidden" v-model="formItem.id" placeholder="id">
        <FormItem label="指标名称" prop="name">
          <Input v-model="formItem.name" placeholder="请输入指标名称"></Input>
        </FormItem>
        <FormItem label="指标类型" prop="select">
          <Select v-model="formItem.select">
            <Option value="01">症状</Option>
            <Option value="02">体征</Option>
            <Option value="03">生活方式指导</Option>
            <Option value="04">辅助检查</Option>
            <Option value="05">用药反馈</Option>
            <Option value="06">转诊情况</Option>
            <Option value="07">通用</Option>
          </Select>
        </FormItem>
        <FormItem label="添加疾病类型" prop="diseaseName">
          <Select :label="labelobj" v-model="formItem.diseaseName" multiple filterable remote :remote-method="remoteMethod2" not-found-text="">
            <Option v-for="(option, index) in options2" :value="option.value" :key="index">{{option.label}}</Option>
          </Select>
        </FormItem>
        <FormItem label="结果类型" prop="radio">
          <RadioGroup v-model="formItem.radio" @on-change="radioChange">
            <Radio label="string">文本</Radio>
            <Radio label="select">选项</Radio>
            <Radio label="digit">数值</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem label="指标选项" v-if="radioText">
          <Input v-model="formItem.indexName" placeholder="请输入指标选项" style="width:80%"></Input>
          <Button type="primary" @click="addItem">添加</Button>
        </FormItem>
        <FormItem label="已选指标选项" v-if="radioText">
          <span class="followIndex_main_select" v-for="item,index in optionList">
            {{item.label}}
            <span @click="deletIndex(index)">
              <Icon class="followIndex_main_delet" type="ios-close"></Icon>
            </span>
          </span>
        </FormItem>
        <FormItem label="预警阀值" v-if="radioText" prop="model10">
          <Select v-model="formItem.model10" multiple style="width:260px">
            <Option v-for="item in optionList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </FormItem>
        <FormItem label="预警阀值" v-if="radioNumber">
          <Input v-model="formItem.top" type="text" placeholder="请输入下限" style="width:20%" number prop="top"></Input>
          <span>-</span>
          <Input v-model="formItem.bottom" type="text" placeholder="请输入上限" style="width:20%" number></Input>
        </FormItem>
        <FormItem label="备注">
          <Input v-model="formItem.textarea" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="添加备注"></Input>
        </FormItem>
        <FormItem>
          <Button type="primary" @click="addModel('formValidate')">保存</Button>
        </FormItem>
      </Form>
    </Modal>
  </Row>
</template>

<script>
import { API } from '@/services';
export default {
  data() {
    const validateAge = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('Age cannot be empty'));
      }
      if (!Number.isInteger(value)) {
        callback(new Error('Please enter a numeric value'));
      } else {
      }
    };
    return {
      labelobj: [],//指标多选label标签
      IndexSearch: {
        name: '',
        select: '',
        diseaseId:'',
      },
      config: [//表格栏
        {
          title: '指标名称',
          key: 'name',
          align: 'center',
        },
        {
          title: '指标类型',
          key: 'otype',
          align: 'center',
          render: (h, params) => {
            switch (params.row.otype) {
              case '01':
                return '症状';
                break;
              case '02':
                return '体征';
                break;
              case '03':
                return '生活方式指导';
                break;
              case '04':
                return '辅助检查';
                break;
              case '05':
                return '用药反馈';
                break;
              case '06':
                return '转诊情况';
                break;
              default:
                return '通用';
                break;
            }
          }
        },
        {
          title: '结果类型',
          key: 'type',
          align: 'center',
          render: (h, params) => {
            let type = params.row.type;
            return type == 'digit' ? '数值' : type == 'select' ? '选项' : '文本';
          }
        },
        {
          title: '疾病类型',
          key: 'diseaseName',
          align: 'center',
        },
        /* {
          title: '启用状态',
          key: 'status',
          align: 'center',
          render: (h, params) => {
            if (params.row.status == '0') {
              return params.row.status = '启用'
            } else if (params.row.status == '1') {
              return params.row.status = '停用'
            }
            return h('div', {
            }, params.row.status);
          }
        }, */
        /* {
          title: '备注',
          key: 'remark',
          align: 'center',
        }, */
        {
          title: '操作',
          key: 'action',
          width: 100,
          align: 'center',
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
                on: {
                  click: () => {
                    this.patientText = true
                    this.formItem.model10 = []
                    this.optionList = []
                    API.follSetting.editList({
                      id: params.row.id
                    }).then((res) => {
                      if (res.code == 0) {
                        let arr = [];
                        res.data.diseaseId = res.data.diseaseId.split(",");
                        res.data.diseaseName = res.data.diseaseName.split(",");
                        res.data.diseaseId.forEach((item, index) => {
                          arr.push({
                            value: item,
                            label: res.data.diseaseName[index]
                          })
                        })
                        this.options2 = arr;
                        let result = [];
                        this.labelobj = [];
                        for (const item of arr) {
                          result.push(item.value);
                          this.labelobj.push(item.label);
                        }
                        this.formItem.diseaseName = result;
                        this.formItem.id = res.data.id
                        this.formItem.name = res.data.name
                        this.formItem.radio = res.data.type
                        this.formItem.select = res.data.otype
                        this.formItem.select2 = res.data.status
                        this.formItem.textarea = res.data.remark
                        this.formItem.top = res.data.thresholdValueStart
                        this.formItem.bottom = res.data.thresholdValueEnd
                        this.formItem.bottom = res.data.thresholdValueEnd
                        console.log(this.formItem.select2)


                        //判断指标类型
                        if (this.formItem.radio == 'select') {
                          this.radioText = true
                          this.radioNumber = false
                        } else if (this.formItem.radio == 'digit') {
                          this.radioNumber = true
                          this.radioText = false
                        } else {
                          this.radioText = false
                          this.radioNumber = false
                        }
                        let oplist = res.data.optionValues;
                        let oplist2 = res.data.thresholdValue;//指标阀值所有选项
                        var kk = oplist.split(",");//以逗号作为分隔字符串
                        var kk2 = oplist2.split(",");//以逗号作为分隔字符串

                        class Point {
                          constructor(value, label) {
                            this.value = value;
                            this.label = label;
                          }
                        }
                        let p1;
                        for (let i = 0; i < kk.length; i++) {
                            p1 = new Point(kk[i], kk[i])
                        }
                        let p2;
                        this.optionList1 = []
                        for (let i = 0; i < kk2.length; i++) {
                          p2 = new Point(kk2[i], kk2[i])
                        }
                        console.log(this.optionList)
                        //预警阀值
                        this.formItem.model10 = kk2
                        //备注
                      } else {
                        console.log(res)
                      }
                    }).catch((error) => {
                      console.log(error)
                    })
                  }
                }
              }, '编辑'),
              /*  h('Button', {
                 props: {
                   type: 'warning',
                   size: 'small'
                 },
                 style: {
 
                 },
                 on: {
                   click: () => {
                     this.$Modal.confirm({
                       title: '删除指标',
                       content: '<p>确定要删除该指标吗?</p>',
                       onOk: () => {
                         this.deleteRow(params.row.id)
                       },
                       onCancel: () => {
                       }
                     })
                   }
                 }
               }, '删除') */
            ]);
          }
        }
      ],
      datalist: [],
      pageTotal: 0,
      patientText: false,//添加--修改模态框
      //编辑内容
      formItem: {
        select: '',
        radio: 'string',
        select2: '',
        textarea: '',
        indexName: '',
        model10: [],
        top: '',
        bottom: '',
        diseaseName: [],//疾病标签 
      },
      options2: [],//疾病标签下拉框数组
      tagCount: [],
      tagCount2: [],
      loading2: false,
      followIndexVal: {
        name: [
          { required: true, message: '指标名称不能为空', trigger: 'blur' }
        ],
        select: [
          { required: true, message: '指标类型不能为空', trigger: 'change' }
        ],
        radio: [
          { required: true, message: '请选择是否放音', trigger: 'change' }
        ],

      },
      optionList: [],//指标选项的select
      optionList1: [],//指标选项select的label
      radioText: false,
      radioNumber: false,
      defaultData: '',
    }
  },

  mounted() {
    this.list(1)
  },
  methods: {
    /** 
     * 清除所有历史遗留数据
     */
    clearAll() {

    },
    editIndex(id) {

    },
    disChange() {

    },
    /**
    疾病类型变化是触发 
     */
    selectChange() {

    },
    deletIndex(index) {
      this.optionList.splice(index, 1);
      this.optionList1.splice(index, 1);
    },
    /*
    *获取list列表数据
    */
    list(pager) {
      API.follSetting.list({
        pager: pager,
        limit: '10',
        name: this.IndexSearch.name,
        otype: this.IndexSearch.select,
        diseaseId: this.selectValue
      }).then((res) => {
          this.datalist = res.data;
          this.pageTotal = res.total;
      }).catch((error) => {
      })
    },
    /*
    *获取分页列表数据
    */
    currentPage: function(page) {
      API.follSetting.list({
        pager: page,
        limit: '10',
        name: this.IndexSearch.name,
        otype: this.IndexSearch.select,
        diseaseId: this.selectValue
      }).then((res) => {
        if (res.code == 0) {
          this.datalist = res.data
          this.pageTotal = res.total
        } else {
          console.log(res.message)
        }
      }).catch((error) => {
        console.log(error)
      })
    },
    /*
    *查询
    */
    handleSearch() {
      API.follSetting.list({
        pager: 1,
        limit: '10',
        name: this.IndexSearch.name,
        otype: this.IndexSearch.select,
        diseaseId: this.selectValue
      }).then((res) => {
        if (res.code == 0) {
          this.datalist = res.data
          this.pageTotal = res.total
        } else {
          console.log(res.message)
        }
      }).catch((error) => {
        console.log(error)
      })
    },
    /*
    *删除
    */
    deleteRow(id) {
      API.follSetting.deleteList({
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
    *添加指标
    */
    addBtn() {
      /** 
       * 数据清空处理
       */
      this.patientText = true
      this.formItem.id = ''
      this.formItem.name = ''
      this.formItem.diseaseName = [];
      this.labelobj = [];
      this.options2 = [];
      this.formItem.radio = 'string'
      this.formItem.select = ""
      this.formItem.textarea = ''
      this.formItem.top = ''
      this.tagCount = [];
      this.formItem.bottom = ''
      this.optionList = []
      this.radioText = false
      this.radioNumber = false
    },
    /*
    *确定添加
    */
    addModel(name) {
      if (this.formItem.radio == "select" && this.optionList.length == 0) {
        this.$Message.warning("指标选项不可为空");
        return false;
      }
      this.$refs[name].validate((valid) => {
        if (valid) {
          let addPram
          let addPram3 = {
            "id": this.formItem.id,
            "name": this.formItem.name,
            "diseaseId": this.formItem.diseaseName.join(','),
            "status": '0',
            "type": this.formItem.radio,
            "otype": this.formItem.select,
            "optionValues": this.optionList1.join(','),
            "thresholdValue": this.formItem.model10.join(","),
            "thresholdValueStart": this.formItem.top,
            "thresholdValueEnd": this.formItem.bottom,
            "remark": this.formItem.textarea
          }
          API.follSetting.addList(addPram3).then((res) => {
            this.formItem.id = ''
            this.formItem.name = ''
            this.formItem.select2 = ''
            this.formItem.select = ''
            this.formItem.radio = 'string'
            this.formItem.textarea = ''
            this.patientText = false;
            this.list(1);
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
    *监听增加/编辑单选状态
    */
    radioChange(value) {
      if (value == 'select') {
        this.radioText = true
        this.radioNumber = false
      } else if (value == 'digit') {
        this.radioNumber = true
        this.radioText = false
      } else {
        this.radioText = false
        this.radioNumber = false
      }
    },
    /*
    *编辑指标
    */
    ok() {
      // this.$Message.info('Clicked ok');
    },
    cancel(name) {
      // this.$refs[name].resetFields();
      // this.defaultData = JSON.parse(JSON.stringify(this.$data.formItem));//清空表单
      // this.$data = Object.assign(this.$data, this.defaultData)
      this.selectLabel = ''
    },
    //编辑模态框提交按钮
    handleEdit(name) {
      this.$refs[name].validate((valid) => { })
    },
    /*
    *指标选项添加预警阀值
    */
    addItem() {
      if (this.formItem.indexName.trim() == "") {
        this.$Message.warning('您添加的为空');
        return false;
      }
      for (let item of this.optionList1) {
        if (item == this.formItem.indexName) {
          this.$Message.warning('不可重复添加');
          return false;
        }
      }
      this.optionList.push({
        value: this.formItem.indexName,
        label: this.formItem.indexName,
      });
      this.optionList1.push(this.formItem.indexName)
      this.formItem.indexName = ''
    },
    /*
    *获取选中的疾病标签列value
    */
    selectChange(value) {
      this.selectLabel = value.label
      this.selectValue = value.value
      console.log(value)
    },
    /*
    *疾病类型--远程搜索
    */
    remoteMethod2(query) {
      if (query == "") {
        return false;
      }
      this.options2 = [];
      API.followProblems.disease({
        'zjm': query
      }).then((res) => {
        console.log(res)
        class Point {
          constructor(item) {
            this.value = item.value;
            this.label = item.label;
          }
        }
        let parr2 = []
        let more2 = res.data
        more2.forEach((item) => {
          parr2.push(new Point({
            value: item.id,
            label: item.value
          }))
        })

        this.options2 = parr2;

      }).catch((error) => {
        console.log(error)
      })
    },
    /*
   *添加标签
   */
    addTag() {
      let flag = 0;
      this.tagCount.forEach((item) => {
        if (this.selectLabel == item || this.selectLabel.trim() == '') {
          flag++;
          this.$Message.warning('您添加的为空或者重复添加');
        }
      })
      if (flag > 0) {
        this.selectLabel = ''
        return false;
      }
      this.tagCount.push(this.selectLabel)
      this.tagCount2.push(this.selectValue)
      this.selectLabel = ''
      this.selectValue = ''
      this.formItem.diseaseName = [];
    },
    /*
    *删除标签
    */
    tagClose(event, name) {
      const index = this.tagCount.indexOf(name);
      this.tagCount.splice(index, 1);
    },
  },

}
</script>


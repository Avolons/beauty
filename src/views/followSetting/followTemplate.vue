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

.followTem {
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
  <Row class="followTem">
    <!-- 搜索栏 -->
    <Col span="24">
    <Row class="followTem_main_search" :gutter="15">
      <Col span="6">
      <span>
        模板名称
      </span>
      <Input type="text" v-model="IndexSearch.name" placeholder="请输入模板名称"></Input>
      </Col>
      <Col span="6">
      <span>
        疾病类型
      </span>
      <Select v-model="IndexSearch.diseaseName" filterable remote not-found-text="" :remote-method="remoteMethod2" clearable>
        <Option v-for="(option, index) in options2" :value="option.value" :key="index">{{option.label}}</Option>
      </Select>
      </Col>
      <Col span="6">
      <Button type="primary" style="margin-right:10px" @click="handleSearch('IndexSearch')">查询</Button>
      <Button type="info" @click="addBtn">添加模板</Button>
      </Col>
    </Row>
    </Col>
    <Col span="24" class="fpTable">
    <Table border :columns="columns7" :data="datalist" class="margin-bottom-10"></Table>
    <Row>
      <Page style="margin-top:10px;float:right" :total="pageTotal" @on-change="currentPage" show-elevator show-total></Page>
    </Row>
    </Col>
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
      IndexSearch: {
        name: '',
        diseaseName: ''
      },
      columns7: [//表格栏
        {
          title: 'id',
          key: 'id',
          align: 'center',

        },
        {
          title: '模板名称',
          key: 'name',
          align: 'center',
        },
        {
          title: '疾病类型',
          key: 'name',
          align: 'center',
        },
        {
          title: '操作',
          key: 'action',
          width: 150,
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
                    this.$router.push({ path: `/followSetting/template/template/${params.row.id}` });
                  }
                }
              }, '编辑'),
              h('Button', {
                props: {
                  type: 'warning',
                  size: 'small'
                },
                style: {

                },
                on: {
                  click: () => {
                    this.deleteRow(params.row.id)
                  }
                }
              }, '删除')
            ]);
          }
        }
      ],
      datalist: [],
      pageTotal: 0,
      patientText: false,//添加--修改模态框
      formItem: {
        select: '',
        radio: 'string',
        select2: '',
        textarea: '',
        indexName: '',
        model10: [],
        top: '',
        bottom: ''
      },
      ruleValidate: {
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
      optionList: [],
      radioText: false,
      radioNumber: false,
      options2: [],
    }
  },
  mounted() {
    this.list(1);
  },
  methods: {
    /*
    *获取list列表数据
    */
    list(pager) {
      API.followTemplate.list({
        pager: pager,
        limit: '10',
        name: this.IndexSearch.name,
        diseaseId: this.IndexSearch.diseaseName
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
     *获取分页列表数据
     */
    currentPage: function(page) {
      API.followTemplate.list({
        pager: page,
        limit: '10',
        name: this.IndexSearch.name,
        diseaseId: this.IndexSearch.diseaseName
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
      API.followTemplate.list({
        pager: 1,
        limit: '10',
        name: this.IndexSearch.name,
        diseaseId: this.IndexSearch.diseaseName
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
      this.$Modal.confirm({
        title: '删除',
        content: '<p>确定要删除吗?</p>',
        onOk: () => {
          API.followTemplate.deleteList({
            id: id
          }).then((res) => {
              this.list(1)
              this.$Message.success({
                content: '删除成功',
                top: 500
              });
          }).catch((error) => {
            console.log(error)
          })
        },
        onCancel: () => {
        }
      });

    },
    /*
    *添加指标
    */
    addBtn() {
      this.$router.push({ path: `/followSetting/template/template/new` });
    },
    /*
    *确定添加
    */
    addModel(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.$Message.success('Success!');
          let addPram
          let addPram1 = {
            "id": this.formItem.id,
            "name": this.formItem.name,
            "status": this.formItem.select2,
            "type": this.formItem.radio,
            "otype": this.formItem.select,
            "remark": this.formItem.textarea
          }
          console.log(this.formItem.model10)
          let strModel = this.formItem.model10.join(",")
          let addPram2 = {
            "id": this.formItem.id,
            "name": this.formItem.name,
            "status": this.formItem.select2,
            "type": this.formItem.radio,
            "otype": this.formItem.select,
            "optionValues": strModel,
            "remark": this.formItem.textarea,
          }
          let addPram3 = {
            "id": this.formItem.id,
            "name": this.formItem.name,
            "status": this.formItem.select2,
            "type": this.formItem.radio,
            "otype": this.formItem.select,
            "thresholdValueStart": this.formItem.top,
            "thresholdValueEnd": this.formItem.bottom,
            "remark": this.formItem.textarea
          }
          console.log(addPram1)
          if (this.formItem.radio == 'string') {
            addPram = addPram1
          }
          if (this.formItem.radio == 'digit') {
            addPram = addPram3
          }
          if (this.formItem.radio == 'select') {
            addPram = addPram2
          }
          API.follSetting.addList(addPram).then((res) => {
            if (res.code == 0) {
              console.log(res.message)
              this.formItem.id = ''
              this.formItem.name = ''
              this.formItem.select2 = ''
              this.formItem.select = ''
              this.formItem.radio = 'string'
              this.formItem.textarea = ''
              this.patientText = false;
              this.list(1)
            } else {
              alert('res.message=' + res.message)
            }
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
      this.$Message.info('Clicked ok');
    },
    cancel() {
      this.$Message.info('Clicked cancel');
    },
    //编辑模态框提交按钮
    handleEdit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.$Message.success('Success!');
        } else {
          this.$Message.error('Fail!');
        }
      })
    },
    /*
    *指标选项添加预警阀值
    */
    addItem() {
      class Point {
        constructor(value, label) {
          this.value = value;
          this.label = label;
        }
      }

      let p1 = new Point(this.formItem.indexName, this.formItem.indexName)
      this.optionList.push(p1)
      this.formItem.indexName = ''
      console.log(this.optionList)
    },
    /*
    *疾病类型--远程搜索
    */
    remoteMethod2(query) {
      API.followProblems.disease({
        'zjm': query
      }).then((res) => {
        // console.log(res)
        if (res.code == 0) {
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

          this.options2 = parr2
          if (query !== '') {
            this.options2 = parr2
          } else {
            this.options2 = [];
            this.proSearch.diseaseName = ''
          }
        } else {
          console.log(res)
        }
      }).catch((error) => {
        console.log(error)
      })
    },
  },



}
</script>


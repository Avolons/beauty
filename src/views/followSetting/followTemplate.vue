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
      <Select :label="modelTre" v-model="IndexSearch.diseaseName" filterable remote not-found-text="" :remote-method="remoteMethod2" placeholder="请输入疾病类型" clearable>
        <Option v-for="(option, index) in options2" :value="option.value" :key="index">{{option.label}}</Option>
      </Select>
      </Col>
      <Col span="6">
      <Button type="primary" style="margin-right:10px" @click="handleSearch('IndexSearch')">查询</Button>
      <Upload
              v-if="!menuShow(this.AM.FollowSetting.importTem)"
              :on-success="handleSuccess"
              style="margin-right:10px"
              :show-upload-list='false'
              :action="API.Data.temImport"
              name="xmlFile">
        <Button type="primary" icon="ios-cloud-upload-outline">导入模板</Button>
      </Upload>
      <Button type="info" v-if="!menuShow(this.AM.FollowSetting.addTem)" @click="addBtn">添加模板</Button>
      </Col>
    </Row>
    </Col>
    <Col span="24" class="fpTable">
    <Table border :columns="columns7" :data="datalist" class="margin-bottom-10" :loading="createLoading"></Table>
    <Row>
      <Page :current="page" style="margin-top:10px;float:right" :total="pageTotal" @on-change="currentPage" show-elevator show-total></Page>
    </Row>
    </Col>
  </Row>
</template>

<script>
import { API } from '@/services';
import {mapGetters, mapActions} from 'vuex';

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
       modelTre:"",  //记录值
      API: API,
      IndexSearch: {
        name: '',
        diseaseName: ''
      },
      createLoading:true,
      page: 1,
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
          key: 'diseaseName',
          align: 'center',
        },
        {
          title: '操作',
          key: 'action',
          width: 200,
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
                'class': {
                  menuHide: this.menuShow(this.AM.FollowSetting.editTem)
                },
                on: {
                  click: () => {
                    this.$router.push({ path: `/followSetting/template/template/${params.row.id}` });
                      //保存数据  当再次返回的时候进行重新赋值
                      this.saveFollowTemplate({
                          "page":this.page,       //页码
                      });

                  }
                }
              }, '编辑'),
              h('Button', {
                props: {
                  type: 'info',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                'class': {
                  menuHide:this.menuShow(this.AM.FollowSetting.exportTem)
                },
                on: {
                  click: () => {
                    API.followTemplate.export({
                      id: params.row.id,
                    }).then((content) => {
                      var aLink = document.createElement('a');
                      var blob = new Blob([content], { type: 'application/xml' });
                      aLink.download = params.row.name;
                      aLink.href = URL.createObjectURL(blob);
                      if (document.all) {
                        aLink.click();
                      }
                      else {
                        var evt = document.createEvent("MouseEvents");
                        evt.initEvent("click", true, true);
                        aLink.dispatchEvent(evt);
                      }
                    }).catch((error) => {
                    });
                  }
                }
              }, '下载'),
              h('Button', {
                props: {
                  type: 'warning',
                  size: 'small'
                },
                style: {

                },
                'class': {
                  menuHide: true//this.menuShow(this.AM.FollowSetting.delTem)
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
  computed:{
      ...mapGetters([
          'authorToken'
      ]),
  },
  mounted() {
    /**
     * 获取页面 page 为Number   进入页面进行再一次赋值
     * @type {number}
     */
    this.page =Number(this.authorToken.followTempRecord.page) ;     //页码
    this.IndexSearch.name = this.authorToken.followTempRecord.name||'';            //方案名称
    this.IndexSearch.diseaseName = this.authorToken.followTempRecord.diseaseId!==''?this.authorToken.followTempRecord.diseaseId:'';
    this.options2 = this.authorToken.followTempRecord.diseaseList||[];
    if(this.options2) {
        for (const item of this.options2) {
            if (this.authorToken.followTempRecord.diseaseId == item.value) {
                this.modelTre = item.label
            }
        }
    }



    this.list( this.page);
  },
  methods: {
    ...mapActions(['saveFollowTemplate']),
    handleSuccess(res, file) {
      res = JSON.parse(res);
      if (res.code == 0) {
        this.$Message.success({
          content: '上传成功',
          top: 500
        });
        this.list(1);
      } else {
        this.$Message.cancel({
          content: res.msg,
          top: 500
        });
      }
    },
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
            this.createLoading = false;
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
      this.page = page;
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
      this.page = 1;
      API.followTemplate.list({
        pager: 1,
        limit: '10',
        name: this.IndexSearch.name,
        diseaseId: this.IndexSearch.diseaseName
      }).then((res) => {
        if (res.code == 0) {
          this.datalist = res.data
          this.pageTotal = res.total

          //保存数据  当再次返回的时候进行重新赋值
          this.saveFollowTemplate({
              "name":this.IndexSearch.name,       //页码
              'diseaseId': this.IndexSearch.diseaseName,
              "diseaseList":this.options2
          });

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
      this.formItem.indexName = '';
      console.log(this.optionList)
    },
    /*
    *疾病类型--远程搜索
    */
    remoteMethod2(query) {
      if(query==""){
        return false;
      }
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


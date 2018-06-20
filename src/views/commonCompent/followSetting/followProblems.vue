<style lang="less">
.patientSearch {
  /* 	background: #fff; */
  form {
    .ivu-form-item {
      margin-bottom: 0;
      padding: 20px 0;
      width: 240px;
      .ivu-form-item-label:before {
        content: "";
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
    padding: 0px 20px !important;
    .info {
      width: 442px;
      height: 65px;
      border: 1px solid #dcebf7;
      .info-row {
        .info1 {
          width: 110px;
          height: 32px;
          float: left;
          line-height: 32px;
          color: #336199;
          background-color: #edf3f4;
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
            color: #ff892a;
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
  border-bottom: 1px dotted #edf3f4;
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
      margin-left: 30px !important;
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
      <Input type="text" v-model="searchParams.title" placeholder="请输入问题名称"></Input>
      </Col>
      <Col span="6">
      <span>
        {{diseaseType}}
      </span>
      <Select :label="modelTre" v-model="searchParams.diseaseId" filterable remote not-found-text="" :remote-method="remoteMethod2" clearable :placeholder="`请输入${diseaseType}`">
        <Option v-for="(option, index) in diseaseList" :value="option.value" :key="index" :label="option.label">{{option.label}}</Option>
      </Select>
      </Col>
      <Col span="6">
      <span>
        指标id
      </span>
      <Input type="text" v-model="searchParams.targetId" placeholder="请输入相关联的指标id"></Input>
      </Col>
      <Col span="6">
      <Button style="margin-right:10px" type="primary" @click="getData">查询</Button>
      <Button type="info" v-if="!menuShow(this.AM.FollowSetting.addPro)" @click="addBtn('proRuleModel')">添加问题</Button>
      </Col>
    </Row>
    </Col>
    <!-- 表格 -->
    <Col span="24">
    <Table border :columns="config" :data="dataList" :loading="createLoading"></Table>
    </Col>
    <!-- 分页 -->
    <Col span="24" style="margin-top:10px;">
    <Page style="float:right" :total="pageTotal" :current="searchParams.pager" @on-change="changePage" show-elevator show-total></Page>
    </Col>
    <!-- 详情模态框 -->
    <Modal :closable="false" :mask-closable="false" v-model="patientText" title="添加问题 / 编辑问题" width="650">
      <Form :model="formItem" :label-width="100" ref="proRuleModel" :rules="proRuleModel">
        <input type="hidden" v-model="formItem.id" placeholder="id">
        <FormItem label="问题标题" prop="title">
          <Input v-model="formItem.title" placeholder="请输入问题标题"></Input>
        </FormItem>
        <FormItem label="问题内容" prop="content">
          <Input v-model="formItem.content" placeholder="请输入随访问题内容"></Input>
        </FormItem>
        <FormItem :label="diseaseType" prop="diseaseId">
          <Select :label="labelobj" v-model="formItem.diseaseId" multiple filterable remote :remote-method="remoteMethod2" not-found-text="" :placeholder="`搜索${diseaseType}添加至体检标签`">
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
          <Select @on-change="remoteMethod1()" v-model="indexParams.otype">
            <Option value="01">症状</Option>
            <Option value="02">体征</Option>
            <Option value="03">生活方式指导</Option>
            <Option value="04">辅助检查</Option>
            <Option value="05">用药反馈</Option>
            <Option value="06">转诊情况</Option>
            <Option value="07">通用</Option>
            <Option value="08">通知</Option>
          </Select>
        </FormItem>
        <FormItem :label="diseaseType" v-show="targetShow">
          <Select @on-change="remoteMethod1()" clearable v-model="indexParams.diseaseId" filterable remote :remote-method="remoteMethod" not-found-text="" :placeholder="`搜索${diseaseType}添加至体检标签`">
            <Option v-for="(option, index) in netDisList" :value="option.value" :key="index">{{option.label}}</Option>
          </Select>
        </FormItem>
        <FormItem label="关联指标" v-show="targetShow">
          <Select :label="taglabel" v-model="formItem.targetId" filterable remote :remote-method="remoteMethod1" clearable :label-in-value="true" not-found-text="">
            <Option v-for="(option, index) in indexOptions" :value="option.value" :key="index">{{option.label}}</Option>
          </Select>
        </FormItem>
        <FormItem label="纯放音">
          <RadioGroup v-model="formItem.playWavOnly">
            <Radio label="1">是</Radio>
            <Radio label="0">否</Radio>
          </RadioGroup>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button style="margin-right:15px" type="default" @click="cancelModel">取消</Button>
        <Button type="primary" @click="addModel('proRuleModel')">保存</Button>
      </div>
    </Modal>
  </Row>
</template>

<script>
import { API } from "@/services";
import { mapGetters, mapActions } from "vuex";
export default {
  props: {
    diseaseType: {
      type: String,
      default: "疾病类型"
    },
    activeType: {
      type: String,
      default: "0,1,3,4"
    }
  },
  data() {
    return {
      createLoading: true, //默认加载
      taglabel: "",
      modelTre: "",
      editorDate: {}, //记录编辑数据  确认是否改变
      pageTotal: 0 /* 数据总量 */,
      //搜索框
      searchParams: {
        pager: 1,
        limit: 10,
        title: "",
        diseaseId: "",
        targetId: "",
        mouldType: this.diseaseType == "疾病类型" ? 0 : 1 //类型：0，普通随访；1，体检随访（必须）
      },
      //指标筛选
      indexParams: {
        pager: 1,
        limit: 999999,
        otype: "",
        diseaseId: "",
        zjm: ""
      },
      labelobj: [], //疾病编辑疾病类型label
      netDisList: [], //远程搜索疾病列表
      //表格data
      dataList: [],
      //数据总计
      //表格栏
      config: [
        {
          title: "问题标题",
          key: "title",
          align: "center"
        },
        {
          title: this.diseaseType == "疾病类型" ? "疾病类型" : "体检套餐",
          key: "diseaseName",
          align: "center"
        },
        {
          title: "问题内容",
          key: "content",
          align: "center"
        },
        {
          title: "关联指标",
          key: "targetName",
          align: "center"
        },
        {
          title: "指标类型",
          key: "otype",
          align: "center",
          render: (h, params) => {
            switch (params.row.otype) {
              case "01":
                return "症状";
                break;
              case "02":
                return "体征";
                break;
              case "03":
                return "生活方式指导";
                break;
              case "04":
                return "辅助检查";
                break;
              case "05":
                return "用药反馈";
                break;
              case "06":
                return "转诊情况";
                break;
              case "07":
                return "通用";
                break;
              default:
                return "通知";
                break;
            }
          }
        },
        {
          title: "操作",
          key: "action",
          width: 250,
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small"
                  },
                  class: {
                    menuHide: this.menuShow(this.AM.FollowSetting.editPro)
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.patientText = true;
                      this.indexParams.otype = "";
                      this.indexParams.diseaseId = "";
                      API.followProblems
                        .editList({
                          id: params.row.id
                        })
                        .then(res => {
                          //用来记录上一次的值 看是否改变
                          this.editorDate = {
                            id: res.data.id,
                            title: res.data.title,
                            isTarget: res.data.isTarget+'',
                            content: res.data.content,
                            targetId: res.data.targetId,
                            diseaseId: res.data.diseaseId,
                            playWavOnly: res.data.playWavOnly+"",
                            status: res.data.status
                          };
                          this.formItem = {
                            id: res.data.id,
                            title: res.data.title,
                            content: res.data.content,
                            playWavOnly: res.data.playWavOnly+"",
                            isTarget: res.data.isTarget+''
                          };
                          console.log(res.data.isTarget,res.data.playWavOnly);
                          let arr = [];
                          res.data.diseaseId = res.data.diseaseId.split(",");
                          res.data.diseaseName = res.data.diseaseName.split(
                            ","
                          );
                          res.data.diseaseId.forEach((item, index) => {
                            arr.push({
                              value: item,
                              label: res.data.diseaseName[index]
                            });
                          });
                          this.diseaseList = arr;
                          let result = [];
                          this.labelobj = [];
                          for (const item of arr) {
                            result.push(item.value);
                            this.labelobj.push(item.label);
                          }
                          this.formItem.diseaseId = result;
                          if (res.data.isTarget == "0") {
                            this.targetShow = true;
                            this.tagShow = true;
                          } else {
                            this.targetShow = false;
                            this.tagShow = false;
                            this.targetTag = "";
                          }
                          this.indexOptions = [];
                          this.indexOptions.push({
                            label: res.data.targetName,
                            value: res.data.targetId
                          });
                          this.taglabel = res.data.targetName;
                          this.formItem.targetId = res.data.targetId;
                        })
                        .catch(error => {});
                    }
                  }
                },
                "编辑"
              ),
              h(
                "Button",
                {
                  props: {
                    type: params.row.playWavOnly == 1 ? "dashed" : "info",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  class: {
                    menuHide: this.menuShow(this.AM.FollowSetting.editVoice)
                  },
                  on: {
                    click: () => {
                      if (params.row.playWavOnly != 1) {
                        let id = params.row.id;
                        if (this.diseaseType == "疾病类型") {
                          this.$router.push({
                            path: `/followSetting/voice/voice/${params.row.id}`
                          });
                        } else {
                          this.$router.push({
                            path: `/physical/noticeSetting/voice/voice/${
                              params.row.id
                            }`
                          });
                        }
                        //保存数据  当再次返回的时候进行重新赋值
                        this.FollowProblePage({
                          followProble: {
                            followProblePage: this.page //页码
                          }
                        });
                      }
                    }
                  }
                },
                "编辑话术"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "warning",
                    size: "small"
                  },
                  class: {
                    menuHide: true //this.menuShow(this.AM.FollowSetting.delPro)
                  },
                  on: {
                    click: () => {
                      this.$Modal.confirm({
                        title: "删除问题",
                        content: "<p>确定要删除该问题吗?</p>",
                        onOk: () => {
                          this.deleteRow(params.row.id);
                        },
                        onCancel: () => {}
                      });
                    }
                  }
                },
                "删除"
              )
            ]);
          }
        }
      ],
      patientText: false, //编辑模态框
      diseaseIdInp: "", //疾病id隐藏域
      formItem: {
        id: "",
        title: "",
        content: "",
        targetId: "",
        diseaseName: [],
        diseaseId: [],
        playWavOnly: "0",
        isTarget: "0" //是否采集指标
      },
      indexOptions: [], //关联指标数组
      diseaseList: [], //疾病远程所有列表
      selectLabel: "",
      selectValue: "",
      targetShow: true, //判断是否疾病标签是否展示
      targetTag: "", //指标标签
      tagShow: false, //标签是否展示,
      proRuleModel: {
        //模态框校验
        title: [
          {
            required: true,
            message: "问题标题问题标题不能为空",
            trigger: "blur"
          },
          {
            type: "string",
            max: 30,
            message: "最大长度不超过30",
            trigger: "blur"
          }
        ],
        content: [
          { required: true, message: "问题内容不能为空", trigger: "blur" }
        ],
        diseaseId: [
          {
            required: true,
            type: "array",
            message: "疾病类型不能为空",
            trigger: "blur"
          }
        ],
        targetId: [
          { required: true, message: "关联指标不能为空", trigger: "blur" }
        ]
      }
    };
  },
  computed: {
    ...mapGetters(["authorToken"])
  },
  mounted() {
    /**
     * 获取页面 page 为Number
     * @type {number}
     */
    this.page = Number(this.authorToken.followProble.followProblePage);
    this.searchParams.title = this.authorToken.title || ""; //获取搜索标题
    this.searchParams.diseaseId =
      this.authorToken.diseaseId !== "" ? this.authorToken.diseaseId : "";
    this.diseaseList = this.authorToken.diseaseList || [];
    if (this.diseaseList) {
      for (const item of this.diseaseList) {
        if (this.authorToken.diseaseId == item.value) {
          this.modelTre = item.label;
        }
      }
    }
    this.getData(this.authorToken.followProble.followProblePage);
    //this.$Spin.show();
  },

  methods: {
    ...mapActions(["FollowProblePage"]),
    /**
     * 取消弹框
     */
    cancelModel() {
      this.$Modal.confirm({
        title: "退出编辑",
        content: "<p>您还有内容未保存，确定要退出?</p>",
        onOk: () => {
          this.patientText = false;
        },
        onCancel: () => {}
      });
    },
    /**
     * 清空所有数据
     */
    clearAllData() {},
    /**@description
     * 获取基础数据
     */
    getData() {
      this.createLoading = true;
      API.followProblems
        .list(this.searchParams)
        .then(res => {
          this.dataList = res.data;
          this.pageTotal = res.total;
          this.createLoading = false;
          this.FollowProblePage({
            title: this.searchParams.title, //问题标题
            diseaseId: this.searchParams.diseaseId, //疾病类型
            diseaseList: this.diseaseList.concat() //疾病类型数组
          });
        })
        .catch(error => {
          this.createLoading = false;
          console.log(error);
        });
    },
    /*
    *获取分页列表数据
    */
    changePage(page) {
      this.searchParams.pager = page;
      this.getData();
    },
    /*
    *添加指标
    */
    addBtn(name) {
      this.formItem.targetId = "";
      this.formItem.id = "";
      this.patientText = true; //打开模态框
      this.$refs[name].resetFields(); //清空表单
    },
    /*
    *获取选中的疾病标签列value
    */
    selectChange(value) {
      this.selectLabel = value.label;
      this.selectValue = value.value;
    },
    /*
    *确定添加
    */
    addModel(name) {
      let addPram = {
        id: this.formItem.id,
        title: this.formItem.title,
        isTarget: this.formItem.isTarget,
        content: this.formItem.content,
        targetId: this.formItem.targetId,
        diseaseId: JSON.parse(JSON.stringify(this.formItem.diseaseId)).join(
          ","
        ),
        playWavOnly: this.formItem.playWavOnly,
        status: 0,
        mouldType: this.diseaseType == "疾病类型" ? 0 : 1 //类型：0，普通随访；1，体检随访（必须）
      };
      this.$refs[name].validate(valid => {
        if (valid) {
          API.followProblems
            .addList(addPram)
            .then(res => {
              this.indexParams.otype = "";
              this.indexParams.diseaseId = "";
              this.formItem.name = "";
              this.formItem.radio = "string";
              this.formItem.textarea = "";
              this.patientText = false;
              this.getData();
              this.$Message.success("提交成功");
              if (this.formItem.id) {
                if (
                  JSON.stringify(addPram) != JSON.stringify(this.editorDate)
                ) {
                  if (this.formItem.playWavOnly == "0") {
                    this.$router.push({
                      path:
                        "/followSetting/voice/voice/" + this.formItem.id + ""
                    });
                    //保存数据  当再次返回的时候进行重新赋值
                    this.FollowProblePage({
                      followProble: {
                        followProblePage: this.page //页码
                      }
                    });
                  }
                }
              }
            })
            .catch(error => {});
        } else {
          this.$Message.error("Fail!");
        }
      });
    },
    /*
    *删除
    */
    deleteRow(id) {
      this.$Modal.confirm({
        title: "删除问题",
        content: "是否确认删除该问题?",
        onOk: () => {
          API.followProblems
            .deleteList({
              id: id
            })
            .then(res => {
              this.getData();
              this.$Message.success({
                content: "删除成功",
                top: 500
              });
            })
            .catch(error => {});
        }
      });
    },
    /*
    *监听是否采集指标
    */
    targetChange(value) {
      if (value == "0") {
        this.targetShow = true;
      } else {
        /* 不采集指标，清空指标选项 */
        this.formItem.targetId = "";
        this.targetShow = false;
      }
    },
    /*
    *指标类型--远程搜索
    */
    remoteMethod1(query) {
      if (query == "") {
        return false;
      }
      this.indexOptions = [];
      this.indexParams.zjm = query;
      API.follSetting
        .list(this.indexParams)
        .then(res => {
          res.data.forEach(item => {
            this.indexOptions.push({
              value: item.id,
              label: item.name
            });
          });
        })
        .catch(error => {
          console.log(error);
        });
    },
    /*
   *指标类型--远程搜索
   */
    remoteMethod(query) {
      if (query == "") {
        return false;
      }
      this.netDisList = [];
      API.followProblems
        .disease({
          diseaseType: this.diseaseType == "体检套餐" ? 1 : 0,
          zjm: query
        })
        .then(res => {
          res.data.forEach(item => {
            this.netDisList.push({
              value: item.id,
              label: item.value
            });
          });
        })
        .catch(error => {});
    },
    /*
    *疾病类型--远程搜索
    */
    remoteMethod2(query) {
      if (query == "") {
        return false;
      }
      this.diseaseList = [];
      API.followProblems
        .disease({
          diseaseType: this.diseaseType == "体检套餐" ? 1 : 0,
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
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>


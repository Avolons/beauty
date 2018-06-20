<style lang="less">
@import "../../../styles/common.less"; //详情
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
  <Row class="followTem">
    <!-- 搜索栏 -->
    <Col span="24">
    <Row class="followTem_main_search" :gutter="15">
      <Col span="6">
      <span>
        模板名称
      </span>
      <Input type="text" v-model="searchParams.name" placeholder="请输入模板名称"></Input>
      </Col>
      <Col span="6">
      <span>
        {{diseaseType}}
      </span>
      <Select :label="modelTre" v-model="searchParams.diseaseId" filterable remote not-found-text="" :remote-method="remoteMethod"  :placeholder="`请输入${diseaseType}`" clearable>
        <Option v-for="(option, index) in diseaseList" :value="option.value" :key="index">{{option.label}}</Option>
      </Select>
      </Col>
      <Col span="6">
      <Button type="primary" style="margin-right:10px" @click="getData">查询</Button>
      <Upload v-if="!menuShow(this.AM.FollowSetting.importTem)" 
        :on-format-error="handleFormatError"  
        :format="['xml']"  
        :on-success="handleSuccess" 
        :before-upload="handleBeforeUpload" 
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
    <Table border :columns="config" :data="datalist" class="margin-bottom-10" :loading="createLoading"></Table>
    <Row>
      <Page :current="searchParams.pager" style="margin-top:10px;float:right" :total="pageTotal" @on-change="currentPage" show-elevator show-total></Page>
    </Row>
    </Col>
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
      modelTre: "", //疾病类型记录值
      API: API,
      /* 搜索条件 */
      searchParams: {
        pager: 1,
        limit: 10,
        name: "",
        diseaseId: "",
        mouldType: this.diseaseType == "疾病类型" ? 0 : 1 //类型：0，普通随访；1，体检随访（必须）
      },
      pageTotal: 0 /* 总页数 */,
      createLoading: true /* 表格loading */,
      config: [
        //表格栏
        {
          title: "id",
          key: "id",
          align: "center"
        },
        {
          title: "模板名称",
          key: "name",
          align: "center"
        },
        {
          title: this.diseaseType == "疾病类型" ? "疾病类型" : "体检套餐",
          key: "diseaseName",
          align: "center"
        },
        {
          title: "操作",
          key: "action",
          width: 200,
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
                  style: {
                    marginRight: "5px"
                  },
                  class: {
                    menuHide: this.menuShow(this.AM.FollowSetting.editTem)
                  },
                  on: {
                    click: () => {
                      this.editTem(params);
                    }
                  }
                },
                "编辑"
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
                    menuHide: this.menuShow(this.AM.FollowSetting.exportTem)
                  },
                  on: {
                    click: () => {
                      API.followTemplate
                        .export({
                          id: params.row.id
                        })
                        .then(content => {
                          var aLink = document.createElement("a");
                          var blob = new Blob([content], {
                            type: "application/xml"
                          });
                          aLink.download = params.row.name;
                          aLink.href = URL.createObjectURL(blob);
                          if (document.all) {
                            aLink.click();
                          } else {
                            var evt = document.createEvent("MouseEvents");
                            evt.initEvent("click", true, true);
                            aLink.dispatchEvent(evt);
                          }
                        })
                        .catch(error => {});
                    }
                  }
                },
                "下载"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "warning",
                    size: "small"
                  },
                  style: {},
                  class: {
                    menuHide: true
                  },
                  on: {
                    click: () => {
                      this.deleteTem(params.row.id); /* 删除模板 */
                    }
                  }
                },
                "删除"
              )
            ]);
          }
        }
      ],
      datalist: [] /* 表格数据 */,
      diseaseList: [] /* 疾病列表 */,
      uploadList: []
    };
  },
  computed: {
    ...mapGetters(["authorToken"])
  },
  mounted() {
    /**
     * 获取页面 page 为Number   进入页面进行再一次赋值
     * @type {number}
     */
    this.page = Number(this.authorToken.followTempRecord.page); //页码
    this.searchParams.name = this.authorToken.followTempRecord.name || ""; //方案名称
    this.searchParams.diseaseId =
      this.authorToken.followTempRecord.diseaseId !== ""
        ? this.authorToken.followTempRecord.diseaseId
        : "";
    this.diseaseList = this.authorToken.followTempRecord.diseaseList || [];
    if (this.diseaseList) {
      for (const item of this.diseaseList) {
        if (this.authorToken.followTempRecord.diseaseId == item.value) {
          this.modelTre = item.label;
        }
      }
    }
    this.getData();
  },
  methods: {
    ...mapActions(["saveFollowTemplate"]),
    handleBeforeUpload() {
      this.$Spin.show();
      const check = this.uploadList.length < 500;
      if (!check) {
        this.$Notice.warning({
          title: "Up to five pictures can be uploaded."
        });
      }
      return check;
    },
    /**
     * @function {function name}
     * @param  {type} file {description}
     * @return {type} {description}
     */
    handleFormatError(file) {
      this.$Spin.hide();
      this.$Notice.warning({
        title: "文件格式错误",
        desc: file.name + " 格式不正确, 请选择 xml 格式文件."
      });
    },
    /**
     * @function {function name}
     * @param  {type} res  {description}
     * @param  {type} file {description}
     * @return {type} {description}
     */
    handleSuccess(res, file) {
      res = JSON.parse(res);
      if (res.code == 0) {
        this.$Message.success({
          content: "上传成功",
          top: 500
        });
        this.getData();
      } else {
        this.$Message.error({
          content: res.message,
          top: 500
        });
      }
      this.$Spin.hide();
    },
    /*
    *获取list列表数据
    */
    getData() {
      this.createLoading = true;
      API.followTemplate
        .list(this.searchParams)
        .then(res => {
          this.datalist = res.data;
          this.pageTotal = res.total;
          this.createLoading = false;
        })
        .catch(error => {
          console.log(error);
        });
    },
    /*
     *获取分页列表数据
     */
    currentPage: function(page) {
      this.searchParams.pager = page;
      this.getData();
    },
    /*
    *删除
    */
    deleteTem(id) {
      this.$Modal.confirm({
        title: "删除",
        content: "<p>确定要删除吗?</p>",
        onOk: () => {
          API.followTemplate
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
            .catch(error => {
              console.log(error);
            });
        },
        onCancel: () => {}
      });
    },
    /*
    *添加模板
    */
    addBtn() {
      if (this.diseaseType == "疾病类型") {
        this.$router.push({ path: `/followSetting/template/template/new` });
      } else {
        this.$router.push({
          path: `/physical/noticeSetting/template/template/new`
        });
      }
    },
    /**@description
     * 编辑模板
     */
    editTem(params) {
      if (this.diseaseType == "疾病类型") {
        this.$router.push({
          path: `/followSetting/template/template/${params.row.id}`
        });
      } else {
        this.$router.push({
          path: `/physical/noticeSetting/template/template/${params.row.id}`
        });
      }
      //保存数据  当再次返回的时候进行重新赋值
      this.saveFollowTemplate({
        diseaseId: this.searchParams.diseaseId,
        diseaseList: this.diseaseList,
        page: this.searchParams.pager //页码
      });
    },
    /*
    *疾病类型--远程搜索
    */
   
    remoteMethod(query) {
      if (query == "") {
        this.diseaseList = [];
        return false;
      }
      API.followProblems
        .disease({
          diseaseType: this.diseaseType == "体检套餐" ? 1 : 0,
          zjm: query
        })
        .then(res => {
          this.diseaseList = [];
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


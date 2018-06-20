<style lang="less">
.followWay {
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
  <Row class="followWay">
    <!-- 搜索栏 -->
    <Col span="24" class="">
    <Row class="followWay_main_search" :gutter="15">
				<Col span="6">
				<span>
					方案名称
				</span>
        <Input type="text" v-model="searchParams.name" placeholder="请输入方案名称"></Input>
				</Col>
				<Col span="6" v-show="searchDepartMent">
				<span>
					科室类别
				</span>
         <Cascader  :data="departmentList" change-on-select  :render-format="changeFormat"   @on-change='handleDeparment' style="width: 100%;">
         </Cascader>
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
				<Button style="margin-right:10px" type="primary" @click="getData">查询</Button>
        <Button type="info" v-if="!menuShow(this.AM.FollowSetting.addDep)" @click="addBtn()">新增方案</Button>
				</Col>
			</Row>
    </Col>
    <!-- 表格 -->
    <Col span="24" class="patientList">
    <Table border :columns="config" :data="pardata" :loading="createLoading"></Table>
    </Col>
    <!-- 分页 -->
    <Col span="24" class="pages">
    <Page style="margin-top:10px;float:right" :current="searchParams.pager" :total="pageTotal" @on-change="currentPage" show-elevator show-total></Page>
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
    },
     /* 需要删除的列名 */
    delParams: {
      type: Array,
      default: () => []
    },
    /* 科室 */
    searchDepartMent: {
      type: Boolean,
      default: true
    },
  },
  data() {
    return {
      departmentList: [], //科室列表数据
      createLoading: true, //默认显示为true
      searchParams: {
        pager: 1,
        limit: 10,
        //搜索框
        name: "",
        diseaseId: "",
        departmentId: "",
        activeType: this.activeType
      },
      modelTre: "", //记录疾病类型值
      page: 1,
      config: [
        //表格栏
        {
          title: "id",
          key: "id",
          align: "center"
        },
        {
          title: "方案名称",
          key: "name",
          align: "center"
        },
        {
          title: "科室类别",
          key: "departmentName",
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
          width: 150,
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
                    menuHide: this.menuShow(this.AM.FollowSetting.editDep)
                  },
                  on: {
                    click: () => {
                      if (this.diseaseType == "疾病类型") {
                        this.$router.push({
                          path: `/followSetting/way/way/${params.row.id}`
                        });
                      } else {
                        this.$router.push({
                          path: `/physical/noticeSetting/way/way/${
                            params.row.id
                          }`
                        });
                      }
                      //保存数据  当再次返回的时候进行重新赋值
                      this.saveFollowWay({
                        page: this.page //页码
                      });
                    }
                  }
                },
                "编辑"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "error",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  class: {
                    menuHide: this.menuShow(this.AM.FollowSetting.delDep)
                  },
                  on: {
                    click: () => {
                      this.$Modal.confirm({
                        title: "删除",
                        content: "<p>确定要删除吗?</p>",
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
      pardata: [], //表格data
      pageTotal: 0, //数据总计
      diseaseList: [] /* 疾病列表 */
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
    this.page = Number(this.authorToken.followWayRecord.page); //页码
    this.searchParams.name = this.authorToken.followWayRecord.name || ""; //方案名称
    this.searchParams.departmentId =
      this.authorToken.followWayRecord.departmentId || ""; //类别
    this.searchParams.diseaseId =
      this.authorToken.followWayRecord.diseaseId !== ""
        ? this.authorToken.followWayRecord.diseaseId
        : "";
    this.diseaseList = this.authorToken.followWayRecord.diseaseList || [];
    if (this.diseaseList) {
      for (const item of this.diseaseList) {
        if (this.authorToken.followWayRecord.diseaseId == item.value) {
          this.modelTre = item.label;
        }
      }
    }
    this.getData();
    this.getdepartmentList();
    this.finallConfig();
  },

  methods: {
    finallConfig() {
      for (const item of this.delParams) {
        for (let index = 0; index < this.config.length; index++) {
          if (item == this.config[index].key) {
            this.config.splice(index, 1);
          }
        }
      }
    },
    ...mapActions(["saveFollowWay"]),
    
    /*
    *获取prolist列表数据
    */
    getData() {
      this.createLoading = true;
      API.followWay
        .list(this.searchParams)
        .then(res => {
          this.pardata = res.data;
          this.pageTotal = res.total;
          this.createLoading = false;
          this.saveFollowWay({
            name: this.searchParams.name, //页码
            diseaseId: this.searchParams.diseaseId,
            departmentId: this.searchParams.departmentId,
            diseaseList: this.diseaseList
          });
        })
        .catch(error => {
          this.createLoading = false;
        });
    },
    /*
      * 改变科室列表得输出格式
      **/
    changeFormat(value) {
      return value[value.length - 1];
    },
    /*
    *获取科室列表
    */
    getdepartmentList() {
      API.followWay
        .departmentList({
          pager: 1,
          limit: 10000
        })
        .then(res => {
          let copyData = this.dataFormat(res.data);
          this.departmentList = JSON.parse(JSON.stringify(copyData));
        })
        .catch(error => {
          console.log(error);
        });
    },
    /**
     * 数据格式化
     */
    dataFormat(data) {
      let arrList = [];
      /**
       * 等级分组
       */
      for (let item of data) {
        item.expand = true;
        item.label = item.name;
        item.value = item.id;
        if (!arrList[item.level]) {
          arrList[item.level] = [];
        }
        arrList[item.level].push(item);
      }
      let appendChild = (child, parent) => {
        for (let item of child) {
          for (const ite of parent) {
            if (item.parentId == ite.id) {
              if (!ite.children) {
                ite.children = [];
              }
              ite.children.push(item);
            }
          }
        }
      };
      for (let i = arrList.length - 1; i > 0; i--) {
        appendChild(arrList[i], arrList[i - 1]);
      }
      return arrList[0];
    },
    /*
    *获取选中的部门id
    */
    handleDeparment(value, data) {
      if (value) {
        this.searchParams.departmentId = value[value.length - 1];
      } else {
        this.searchParams.departmentId = "";
      }
    },
    /*
    *获取分页列表数据
    */
    currentPage: function(page) {
      this.searchParams.pager = page;
      this.getData();
    },
    /*
    *添加指标
    */
    addBtn(name) {
      if (this.diseaseType == "疾病类型") {
        this.$router.push({ path: `/followSetting/way/way/new` });
      } else {
        this.$router.push({ path: `/physical/noticeSetting/way/way/new` });
      }
    },
    /*
    *删除
    */
    deleteRow(id) {
      API.followWay
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
    /*
    *疾病类型--远程搜索
    */
    remoteMethod(query) {
      if (query.trim() == "") {
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
            diseaseList.push({
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


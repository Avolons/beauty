<style lang="less">
@import "../../../styles/jzda.less";
.patientSearch {
  border-radius: 5px;
  .ivu-upload{
	  width: 98px !important;
	  .ivu-upload-drag{
		  background-color: transparent;
		  border: none;
	  }
  }
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
}

//编辑
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

.inter-down {
  &_main {
    &_list {
    }
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
</style>
<template>
	<Row class="patientSearch">
		<Modal title="上传错误" v-model="errorMsg">
			<Table border :columns="loadConfig" :data="loadList"></Table>
			<Button style="display:block;margin-top:20px;" type="primary">
				<a style="color:#fff" :href="'/assets/templatedoc/'+errLink+'.xls'">下载{{title}}错误信息</a>
			</Button>
		</Modal>
		<!-- 搜索栏 -->
		<Row class="inter-down_main_search" :gutter="15">
      <Col span="6">
			<span>
				姓名
			</span>
			<Input type="text" v-model="searchParams.brxm" placeholder="请输入患者姓名"></Input>
			</Col>
			<Col span="6">
			<span>
				联系电话
			</span>
			<Input type="text" v-model="searchParams.jtdh" placeholder="请输入患者联系电话"></Input>
			</Col>
			<Col span="6">
				<Button style="margin-right:15px" type="primary" @click="searchParams.pager=1;getData()">查询</Button>
				<Upload  v-show="loadFun"  ref="upload" :show-upload-list="false" :on-success="handleSuccess" :format="['xls','xlsx']" :on-format-error="handleFormatError" :before-upload="handleBeforeUpload" multiple name="upfile" type="drag" :action="importApi" style="display: inline-block;width:158px;">
					<Button  icon="ios-cloud-upload" type="info" >{{title}}导入</Button>
 				</Upload>
				<Button  style="margin-left:15px" v-show="loadFun"  icon="ios-cloud-download-outline" type="info" >
					<a style="color:#fff" :href="'/assets/templatedoc/'+downLink+'.xls'">下载{{title}}模板</a>
				</Button>
			</Col>
		</Row>
		<!-- 表格 -->
		<Col span="24">
		<Table border :columns="config" :data="dataList" :loading="createLoading"></Table>
		</Col>
		<!-- 分页 -->
		<Col span="24" class="pages">
		<Page :total="totalPage" :current="searchParams.pager" show-elevator @on-change="changePage" show-total></Page>
		</Col>
		<!-- 详情模态框 -->
		<Modal v-model="patientDetail" title="患者信息" class-name="patientInfo"  width="700">
      <person-info 
        :baseData="currentData"
        :outpatientData="mjzData"
        :hospitalData="zyData"
        :physicalData="tjData"
        >
      </person-info>
		</Modal>
		<!-- 编辑功能模态框 -->
		<Modal v-model="patientText" :mask-closable="false" title="编辑患者信息" class-name="patientInfo" :styles="{top: '36px'}" width="1000">
			<Row class="infoRow">
				<Form ref="formCustom" :rules="validate.patList" :model="formCustom" :label-width="80">
					<Col span="12">
					<FormItem label="姓名" prop="brxm">
						<Input v-model="formCustom.brxm" disabled></Input>
					</FormItem>
					</Col>
					<Col span="12">
					<FormItem label="性别" prop="brxb">
						<Input v-model="formCustom.brxb" disabled></Input>
					</FormItem>
					</Col>
          <!-- 客户 -->
          <Col span="12" v-if="title=='客户'">
					<FormItem label="婚姻状态" prop="mz">
						<Input v-model="formCustom.maritalStatus" ></Input>
					</FormItem>
					</Col>
					<Col span="12" v-if="title!='客户'">
					<FormItem label="民族" prop="mz">
						<Input v-model="formCustom.mz" disabled></Input>
					</FormItem>
					</Col>
					<Col span="12">
					<FormItem label="身份证号" prop="sfzh">
						<Input v-model="formCustom.sfzh" disabled></Input>
					</FormItem>
					</Col>
					<Col span="12">
					<FormItem :label="title=='客户'?'联系电话':'家庭电话'" prop="jtdh">
						<Input v-model="formCustom.jtdh" placeholder="请输入家庭电话"></Input>
					</FormItem>
					</Col>
					<Col span="12" v-if="title=='客户'">
					<FormItem label="出生年月" prop="csny">
						<DatePicker disabled  :value="formCustom.csny" type="date" placeholder="Select date" style="width: 200px" @on-change="csnyChange"></DatePicker>
					</FormItem>
					</Col>
          <Col span="12" v-if="title!='客户'">
					<FormItem label="出生年月" prop="csny">
						<DatePicker   :value="formCustom.csny" type="date" placeholder="Select date" style="width: 200px" @on-change="csnyChange"></DatePicker>
					</FormItem>
					</Col>
					<Col span="12">
					<FormItem label="地址" prop="xzzQtdz">
						<Input v-model="formCustom.xzzQtdz" placeholder="请输入住址"></Input>
					</FormItem>
					</Col>
          <Col span="12" v-if="title=='客户'">
					<FormItem label="邮箱" prop="mz">
						<Input v-model="formCustom.email" ></Input>
					</FormItem>
					</Col>
					<Col span="12">
					<FormItem label="单位" prop="dwmc">
						<Input v-model="formCustom.dwmc" placeholder="请输入单位"></Input>
					</FormItem>
					</Col>
          <Col span="12">
					<FormItem label="部门" v-if="title=='客户'" prop="lxrm">
						<Input v-model="formCustom.department" placeholder="请输入部门"></Input>
					</FormItem>
					</Col>
          <Col span="12">
					<FormItem label="职务" v-if="title=='客户'" prop="lxrm">
						<Input v-model="formCustom.duties" placeholder="请输入职务"></Input>
					</FormItem>
					</Col>
          <Col span="12">
					<FormItem label="职称" v-if="title=='客户'" prop="lxrm">
						<Input v-model="formCustom.dutiesTitle" placeholder="请输入职称"></Input>
					</FormItem>
					</Col>
					<Col span="12">
					<FormItem label="紧急联系人" v-if="title!='客户'" prop="lxrm">
						<Input v-model="formCustom.lxrm" placeholder="请输入紧急联系人"></Input>
					</FormItem>
					</Col>
					<Col span="12">
					<FormItem label="关系" v-if="title!='客户'" prop="lxgx">
						<Input v-model="formCustom.lxgx" placeholder="请输入与紧急联系人关系"></Input>
					</FormItem>
					</Col>
					<Col span="12">
					<FormItem label="联系地址" v-if="title!='客户'" prop="lxdz">
						<Input v-model="formCustom.lxdz" placeholder="请输入紧急联系人地址"></Input>
					</FormItem>
					</Col>
					<Col span="12">
					<FormItem label="联系电话" v-if="title!='客户'" prop="lxdh">
						<Input v-model="formCustom.lxdh" placeholder="请输入紧急联系人电话"></Input>
					</FormItem>
					</Col>
					<Col span="24" :style="{textAlign:'right',margin: '10px 0'}">
					<Button type="primary" @click="submitData('formCustom')">保存</Button>
					</Col>
				</Form>
			</Row>
		</Modal>
	</Row>
</template>

<script>
import { API } from "@/services";
/* import {datrrrr} from "./data.js" */
import personInfo from '../common/personInfo.vue'
export default {
  components: {
    personInfo
  },
  props: {
    //是否展示上传和下载功能
    loadFun: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: "患者"
    },
    errLink: {
      type: String,
      default: "患者信息错误"
    },
    downLink: {
      type: String,
      default: "Patient"
    },
    /* 导入数据 */
    importApi:{
      type: String,
      default: API.Data.PatImport
    },
    /* 列表详情 */
    listApi:{
      type: Function,
      default: API.FollowBussiness.listPat
    },
    /* 详情 */
    infoApi:{
      type: Function,
      default: API.FollowBussiness.detailPat
    },
    /* 更新 */
    updateApi:{
      type: Function,
      default: API.FollowBussiness.savePat
    },
    delParams:{
			type:Array,
			default:()=>[],
		}
  },
  data() {
    return {
      //是否显示上传文件的弹出层
      showUpload: false,
        API: API,
      loadList: [], //错误文件列表
      //是否存在文件错误
      errorMsg: false,
      //错误文件配置
      loadConfig: [
        {
          title: "导入成功的条数",
          key: "successNum",
          align: "center"
        },
        {
          title: "导入失败的条数",
          key: "failNum",
          align: "center"
        }
      ],
      uploadList: [], //上传文件对象
      createLoading: true, //loading动画 加载中
      //搜索条件对象
      searchParams: {
        jtdh: "", //患者编号
        brxm: "", //患者姓名
        pager: 1, //当前页码
        limit: 10 //每页条数
      },
      totalPage: 100, //总页数
      currentData: {}, //当前被点击患者，编辑和详情按钮触发时更换数据
      mjzData: [], //门急诊信息
      zyData: [], //住院信息
      tjData:[],
      patientDetail: false, //详情模态框
      patientText: false, //编辑模态框
      formCustom: {
        //编辑功能form数据,暂时未知必填信息，字段未知
        id: "",
        brxm: "", //姓名
        brxb: "", //性别
        mz: "", //民族
        sfzh: "", //身份证号
        jtdh: "", //电话
        xzzQtdz: "", //地址
        lxrm: "", //联系人名
        lxgx: "", //联系人关系
        lxdz: "", //联系地址
        lxdh: "", //联系电话
        dwmc: "", //单位名称
        csny: "" //出生年月
      },
      dataList: [], //表格数据
      config: [
        //表格配置
        {
          title: `${this.title}编号`,
          key: "brid",
          align: "center",
          render:  (h, params)=> {
            if(params.row.brid){
              return params.row.brid;
            }else{
              return params.row.id;
            }       
          }
        },
        {
          title: "姓名",
          key: "brxm",
          align: "center"
        },
        {
          title: "联系电话",
          key: "jtdh",
          align: "center",
        },
         {
          title: "身份证号",
          key: "sfzh",
          align: "center"
        },
        {
          title: "民族",
          key: "mz",
          align: "center",
        },
        {
          title: "性别",
          key: "brxb",
          align: "center",
        },
        {
          title: "出生年月",
          key: "csny",
          align: "center"
        },
        {
          title: "操作",
          key: "action",
          width: 150,
          align: "center",
          render: (h, params) => {
            // render函数
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small"
                  },
                  class: {
                    menuHide: this.menuShow(this.AM.FollowBussiness.savePat)
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      /* 传递相关的id，渲染完成后显示出模态框 */
                      this.editPat(params.row);
                      this.getInfo(params.row.id);
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
                  class: {
                    menuHide: this.menuShow(this.AM.FollowBussiness.detailPat)
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.getInfo(params.row.id);
                      this.patientDetail = true;
                    }
                  }
                },
                "详情"
              )
            ]);
          }
        }
      ]
    };
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
    /**@augments
     * 文件上传相关函数
     */
    /**@description
     * 上传成功回调函数
     */
    handleSuccess(res, file) {
      res = JSON.parse(res);
      if (res.code == 0) {
        this.$Message.success("上传成功");
      } else {
        if (res.data) {
          this.errorMsg = true;
          this.loadList = [res.data];
          this.$Message.warning(res.message);
        } else {
          this.$Message.warning(res.message);
        }
      }
      this.$Spin.hide();
    },
    /**@description
     * 格式错误回调函数
     */
    handleFormatError(file) {
      this.$Spin.hide();
      this.$Notice.warning({
        title: "文件格式错误",
        desc: file.name + " 格式不正确, 请选择 xls 或者 xlsx 格式文件."
      });
    },
    /**@description
     * 最大文件上传数量限制
     */
    handleBeforeUpload() {
      const check = this.uploadList.length < 500;
      this.$Spin.show();
      if (!check) {
        this.$Notice.warning({
          title: "Up to five pictures can be uploaded."
        });
      }
      return check;
    },
    /**
     * 点击编辑按钮
     */
    editPat(data) {
      this.formCustom = JSON.parse(JSON.stringify(data));
      this.patientText = true;
    },
    /**
     * 编辑出生年月
     */
    csnyChange(value) {
      this.formCustom.csny = value;
    },
    /**
     * 查看患者详情
     */
    getInfo(id) {
      this.infoApi({
        id: id
      })
        .then(res => {
          this.currentData = res.data;
          if (res.data.mjzs.length) {
            this.mjzData = res.data.mjzs;
          }
          if (res.data.cyxjs.length) {
            this.zyData = res.data.cyxjs;
          }
          if (res.data.InspectClient.length) {
            this.tjData = res.data.InspectClient;
          }
        })
        .catch(err => {
          //弹出错误信息
          /* this.$Message.error(err); */
        });
    },
    /**
     * 修改患者信息
     */
    submitData(name) {
      /**
       * 此处填写具体的ajax请求
       */
      this.$Spin.show();
      this.updateApi({
        id: this.formCustom.id,
        jtdh: this.formCustom.jtdh,
        xzzQtdz: this.formCustom.xzzQtdz,
        lxrm: this.formCustom.lxrm,
        lxdh: this.formCustom.lxdh,
        lxgx: this.formCustom.lxgx,
        lxdz: this.formCustom.lxdz,
        dwmc: this.formCustom.dwmc,
        csny: this.formCustom.csny,
        maritalStatus:this.formCustom.maritalStatus,    //婚姻状态
        email: this.formCustom.email,  //邮箱
        department: this.formCustom.department,    //部门
        duties:  this.formCustom.duties,    //职务
        dutiesTitle:  this.formCustom.dutiesTitle, //职称
      })
        .then(res => {
          this.$Message.success("编辑成功");
          this.getData();
          this.patientText = false;
          this.$Spin.hide();
        })
        .catch(err => {
          //弹出错误信息
          this.$Message.error(err);
        });
    },
    /**
     * 获取列表数据,搜索接口
     */
    getData() {
      this.listApi(this.searchParams)
        .then(res => {
          this.dataList = res.data;
          if(res.total!=undefined || res.count!=undefined){
            this.totalPage = res.total || res.count;
          }
          this.createLoading = false;
        })
        .catch(err => {
          //弹出错误信息
          this.$Message.error(err);
        });
    },
    /**
     * 页码改变
     */
    changePage(index) {
      this.searchParams.pager = index;
      this.getData();
    },
    /**
     * 增加随访
     */
    addFollow(data) {
      const id = data.id;
      /**
       * 此处填写具体页面跳转，携带id
       */
      this.$route.push({
        path: "/", //替换成具体的地址
        query: {
          id: id
        }
      });
    },
    /**
     * 重置所有属性
     */
    handleReset(name) {
      this.$refs[name].resetFields();
    }
  },
  mounted() {
    this.getData();
    this.finallConfig();
  }
};
</script>


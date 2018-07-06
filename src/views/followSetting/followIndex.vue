<style lang="less">
@import "../../styles/followSetting/followIndex.less";
</style>


<template>
	<Row class="followIndex">
		<!-- 搜索栏 start -->
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
			<Select v-model="IndexSearch.otype">
				<Option v-for="item,index in indexTypeList" :key="index" :value="item.value">{{item.label}}</Option>
			</Select>
			</Col>
			<Col span="6">
			<span>
				分类类型
			</span>
			<Select v-model="IndexSearch.diseaseId" filterable remote not-found-text="" :remote-method="remoteMethod2" :label-in-value="true" clearable @on-change="selectChange" placeholder="请输入分类类型">
				<Option v-for="(option, index) in diseaseList" :value="option.value" :key="index">{{option.label}}</Option>
			</Select>
			</Col>
			<Col span="6">
			<Button style="margin-right:10px" type="primary" @click="IndexSearch.pager=1;list()">查询</Button>
			<Button type="info" v-if="!menuShow(this.AM.FollowSetting.addIndex)" @click="addBtn">添加指标</Button>
			</Col>
		</Row>
		</Col>
		<!-- 搜索栏 end -->

		<!-- 表格栏 start-->
		<Col span="24" class="fpTable">
		<Table border :columns="config" :data="datalist" class="margin-bottom-10" :loading="createLoading"></Table>
		<Row>
			<Page style="float:right" :current="IndexSearch.pager" :total="pageTotal" @on-change="currentPage" show-elevator show-total></Page>
		</Row>
		</Col>
		<!-- 表格栏 end-->

		<!-- 编辑功能模态框 -->
		<Modal :closable="false" :mask-closable="false" v-model="patientText" title="添加指标 / 编辑指标" width="650" class-name="patientInfo">
			<Form :model="formItem" :label-width="100" ref="formValidate" :rules="followIndexVal">
				<input type="hidden" v-model="formItem.id" placeholder="id">
				<FormItem label="指标名称" prop="name">
					<Input v-model="formItem.name" placeholder="请输入指标名称"></Input>
				</FormItem>
				<FormItem label="指标类型" prop="otype">
					<Select v-model="formItem.otype">
						<Option v-for="item,index in indexTypeList" :key="index" :value="item.value">{{item.label}}</Option>
					</Select>
				</FormItem>
				<FormItem label="添加分类类型" prop="diseaseId">
					<Select :label="labelobj" v-model="formItem.diseaseId" multiple filterable remote :remote-method="remoteMethod2" not-found-text="">
						<Option v-for="(option, index) in diseaseList" :value="option.value" :key="index">{{option.label}}</Option>
					</Select>
				</FormItem>
				<FormItem label="结果类型" prop="type">
					<RadioGroup v-model="formItem.type">
						<Radio label="string">文本</Radio>
						<Radio label="select">选项</Radio>
						<Radio label="digit">数值</Radio>
					</RadioGroup>
				</FormItem>
				<FormItem label="有无意向" prop="isCheck">
					<RadioGroup v-model="formItem.isCheck">
						<Radio label="0">有意向</Radio>
						<Radio label="1">无意向</Radio>
					</RadioGroup>
				</FormItem>
				<FormItem v-show="formItem.isCheck=='0'" label="关键词">
					<Tag v-for="item,index in formItem.fieldValue" :key="item" :name="item" closable @on-close="keyClose(index)">{{item}}</Tag>
					<Button icon="ios-plus-empty" type="dashed" size="small" @click="keyAdds">添加关键词</Button>
					<Button type="primary" size="small" @click="getallIndex">同步</Button>
				</FormItem>
				<FormItem label="指标选项" v-if="formItem.type=='select'">
					<Input v-model="willIndex" placeholder="请输入指标选项" style="width:80%"></Input>
					<Button type="primary" @click="addItem">添加</Button>
				</FormItem>
				<FormItem label="已选指标选项" v-if="formItem.type=='select'">
					<span class="followIndex_main_select" v-for="item,index in formItem.optionValues">
						{{item}}
						<span @click="deletIndex(index)">
							<Icon class="followIndex_main_delet" type="ios-close"></Icon>
						</span>
					</span>
				</FormItem>
				<FormItem label="预警阀值" v-if="formItem.type=='select'" prop="thresholdValue">
					<Select v-model="formItem.thresholdValue" multiple style="width:260px">
						<Option v-for="item,index in formItem.optionValues" :value="item" :key="index">{{ item }}</Option>
					</Select>
				</FormItem>
				<FormItem label="预警阀值" v-if="formItem.type=='digit'">
					<Input v-model="formItem.thresholdValueStart" type="text" placeholder="请输入下限" style="width:20%" number prop="top"></Input>
					<span>-</span>
					<Input v-model="formItem.thresholdValueEnd" type="text" placeholder="请输入上限" style="width:20%" number></Input>
				</FormItem>
				<FormItem label="备注">
					<Input v-model="formItem.remark" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="添加备注"></Input>
				</FormItem>
				<FormItem>
					<Button style="margin-right:30px" type="default" @click="cancelModel">取消</Button>
					<Button type="primary" @click="addModel('formValidate')">保存</Button>
				</FormItem>
			</Form>
		</Modal>

	</Row>
</template>

<script>
import { API } from "@/services";
export default {
  data() {
    return {
      createLoading: true, //loading 动画加载中
      //搜索数据
      IndexSearch: {
        pager: 1,
        limit: 10,
        name: "",
        otype: "",
        diseaseId: ""
      },
      keyArray: [], //关键词数组
      willIndex: "", //即将要添加的指标值
      //表格数据
      datalist: [],
      pageTotal: 0,
      patientText: false, //添加--修改模态框
      labelobj: [], //指标多选label标签
      //编辑内容
      formItem: {
        id: "", //不传表示增加
        diseaseId: [], //疾病标签，多个用应为逗号分开
        otype: "01", //指标类型
        name: "", //指标名称
        type: "select", //结果类型string，select，digit
        optionValues: [], //指标选项
        thresholdValue: [], //预警阀值
        thresholdValueStart: "", //数值下限
        thresholdValueEnd: "", //数值上限
        status: 0, //状态：0，启用；1，禁用
        remark: "", //备注
        isCheck: 1, //是否需要考核：0，是；1，否
        fieldValue: [] //关键词
      },
      diseaseList: [], //疾病标签下拉框数组
      optionList: [], //指标选项的select
      tagCount: [],
      tagCount2: [],
      radioText: false, //文本类型
      radioNumber: false, //数值类型
      /**
       *指标类型集合
       **/
      indexTypeList: [
        {
          value: "",
          label: "无"
        },
        {
          value: "01",
          label: "症状"
        },
        {
          value: "02",
          label: "体征"
        },
        {
          value: "03",
          label: "生活方式指导"
        },
        {
          value: "04",
          label: "辅助检查"
        },
        {
          value: "05",
          label: "用药反馈"
        },
        {
          value: "06",
          label: "转诊情况"
        },
        {
          value: "07",
          label: "通用"
        }
      ],
      /**
       * 表格栏
       * 渲染数据
       */
      config: [
        {
          title: "指标id",
          key: "id",
          align: "center"
        },
        {
          title: "指标名称",
          key: "name",
          align: "center"
        },
        {
          title: "指标类型",
          key: "otype",
          align: "center",
          render: (h, params) => {
            for (const item of this.indexTypeList) {
              if (item.value == params.row.otype) {
                return item.label;
              }
            }
          }
        },
        {
          title: "结果类型",
          key: "type",
          align: "center",
          render: (h, params) => {
            let type = params.row.type;
            return type == "digit"
              ? "数值"
              : type == "select" ? "选项" : "文本";
          }
        },
        {
          title: "分类类型",
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
                    menuHide: this.menuShow(this.AM.FollowSetting.editIndex)
                  },
                  on: {
                    click: () => {
                      this.editIndex(params.row.id);
                    }
                  }
                },
                "编辑"
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
                    menuHide: true //this.menuShow(this.AM.FollowSetting.delIndex)
                  },
                  on: {
                    click: () => {
                      this.$Modal.confirm({
                        title: "删除指标",
                        content: "确定要删除该指标吗?",
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
      ]
    };
  },
  computed: {
    /**
     *校验规则
     * followIndexVal
     **/
    followIndexVal() {
      return {
        name: [
          { required: true, message: "指标名称不能为空", trigger: "blur" }
        ],
        otype: [
          { required: true, message: "指标类型不能为空", trigger: "change" }
        ]
      };
    }
  },
  mounted() {
    /**
     * 获取数据
     */
    this.list();
  },
  methods: {
    getallIndex(){
      let self=this;
      this.formItem.fieldValue=[...new Set(self.formItem.fieldValue.concat(self.formItem.optionValues))]
    },
    /**
     * 标签关闭
     */
    keyClose(index) {
      this.formItem.fieldValue.splice(index, 1);
    },
    /**
     * 新增关键词
     */
    keyAdds() {
      let addVal;
      this.$Modal.confirm({
        render: h => {
          return h("Input", {
            props: {
              value: this.value,
              autofocus: true,
              placeholder: "请输入关键词"
            },
            on: {
              input: val => {
                addVal = val;
              }
            }
          });
        },
        okText: "添加",
        onOk: () => {
          let val = addVal || "";
          val = val.trim();
          if (!val) {
            this.$Message.warning("您添加的为空");
            return false;
          }
          for (let item of this.formItem.fieldValue) {
            if (item == val) {
              this.$Message.warning("不可重复添加");
              return false;
            }
          }
          this.formItem.fieldValue.push(val);
        }
      });
    },
    /**
     * 清除所有历史遗留数据
     */
    clearAll() {
      this.formItem = {
        id: "", //不传表示增加
        diseaseId: [], //疾病标签，多个用应为逗号分开
        otype: "01", //指标类型
        name: "", //指标名称
        type: "select", //结果类型string，select，digit
        optionValues: [], //指标选项
        thresholdValue: [], //预警阀值
        thresholdValueStart: "", //数值下限
        thresholdValueEnd: "", //数值上限
        status: 0, //状态：0，启用；1，禁用
        remark: "", //备注
        isCheck: 1, //是否需要考核：0，是；1，否
        fieldValue: []
      };
      this.labelobj = [];
      this.diseaseList = [];
      this.tagCount = [];
    },
    /**
     * 编辑指标
     */
    editIndex(id) {
      /**
       * 显示编辑框
       */
      this.clearAll();
      API.follSetting
        .editList({
          id: id
        })
        .then(res => {
          let arr = [];
          let result = [];
          this.labelobj = [];
          /**
           * 首先判断是否存在疾病id
           */
          if (res.data.diseaseId) {
            res.data.diseaseId = res.data.diseaseId.split(",");
            res.data.diseaseName = res.data.diseaseName.split(",");
            /* 疾病数据的格式化 */
            res.data.diseaseId.forEach((item, index) => {
              arr.push({
                value: item,
                label: res.data.diseaseName[index]
              });
            });
            this.diseaseList = arr;
            for (const item of arr) {
              result.push(item.value);
              this.labelobj.push(item.label);
            }
          }
          /**数据格式化 */
          this.formItem = {
            id: res.data.id, //不传表示增加
            diseaseId: result, //疾病标签，多个用应为逗号分开
            otype: res.data.otype, //指标类型
            name: res.data.name, //指标名称
            type: res.data.type, //结果类型string，select，digit
            optionValues: [], //指标选项
            thresholdValue: [], //预警阀值
            thresholdValueStart: res.data.thresholdValueStart, //数值下限
            thresholdValueEnd: res.data.thresholdValueEnd, //数值上限
            status: res.data.status, //状态：0，启用；1，禁用
            remark: res.data.remark, //备注
            isCheck: res.data.isCheck, //是否需要考核：0，是；1，否
            fieldValue: res.data.fieldValue
              ? res.data.fieldValue.split(",")
              : []
          };

          if (res.data.optionValues) {
            this.formItem.optionValues = res.data.optionValues.split(",");
            this.formItem.thresholdValue = res.data.thresholdValue.split(","); //预警阈值
          }
          /**
           * 全部渲染完成后显示
           */
          this.patientText = true;
        })
        .catch(error => {});
    },
    /**
     * 删除指标
     */
    deletIndex(index) {
      this.formItem.optionValues.splice(index, 1);
    },
    /*
		*获取list列表数据
		*/
    list() {
      API.follSetting
        .list(this.IndexSearch)
        .then(res => {
          this.datalist = res.data;
          this.pageTotal = res.total;
          this.createLoading = false;
        })
        .catch(error => {});
    },
    /*
		*获取分页列表数据
		*/
    currentPage(page) {
      this.IndexSearch.pager = page;
      this.list();
    },
    /*
		*删除
		*/
    deleteRow(id) {
      API.follSetting
        .deleteList({
          id: id
        })
        .then(res => {
          this.$Message.success({
            content: "删除成功",
            top: 500
          });
          this.list();
        })
        .catch(error => {});
    },
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

    /*
		*添加指标
		*/
    addBtn() {
      this.clearAll();
      this.patientText = true;
    },
    /*
		*确定添加
		*/
    addModel(name) {
      if (
        this.formItem.type == "select" &&
        this.formItem.optionValues.length == 0
      ) {
        this.$Message.warning("指标选项不可为空");
        return false;
      }
      this.$refs[name].validate(valid => {
        if (valid) {
          if (this.formItem.diseaseId.length == 0) {
            this.$Message.error("请填写正确的分类类型");
            return false;
          }
          let sendData = JSON.parse(JSON.stringify(this.formItem));
          sendData.diseaseId = sendData.diseaseId.join(",");
          sendData.optionValues =
            sendData.type == "select" ? sendData.optionValues.join(",") : "";
          sendData.thresholdValue =
            sendData.type == "select" ? sendData.thresholdValue.join(",") : "";
          sendData.thresholdValueStart =
            sendData.type == "digit" ? sendData.thresholdValueStart : "";
          sendData.thresholdValueEnd =
            sendData.type == "digit" ? sendData.thresholdValueEnd : "";
          sendData.fieldValue =
            sendData.fieldValue.length != 0
              ? sendData.fieldValue.join(",")
              : "";
          API.follSetting
            .addList(sendData)
            .then(res => {
              //数据进行清空
              this.clearAll();
              this.patientText = false;
              this.list();
              this.$Message.success("提交成功");
            })
            .catch(error => {});
        } else {
        }
      });
    },
    /*
		*指标选项添加预警阀值
		*/
    addItem() {
      let val = this.willIndex.trim();
      if (!val) {
        this.$Message.warning("您添加的为空");
        return false;
      }
      for (let item of this.formItem.optionValues) {
        if (item == val) {
          this.$Message.warning("不可重复添加");
          return false;
        }
      }
      this.formItem.optionValues.push(val);
      this.willIndex = "";
    },
    /*
		*获取选中的疾病标签列value
		*/
    selectChange(value) {
      this.selectLabel = value.label;
      this.selectValue = value.value;
    },
    /*
		*分类类型--远程搜索
		*/
    remoteMethod2(query) {
      if (query == "") {
        return false;
      }
      this.diseaseList = [];
      API.followProblems
        .disease({
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
        .catch(error => {});
    }
  }
};
</script>


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
					疾病类型
				</span>
				<Select v-model="IndexSearch.diseaseId" filterable remote not-found-text="" :remote-method="remoteMethod2" :label-in-value="true" clearable @on-change="selectChange" placeholder="请输入疾病类型">
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
				<FormItem label="指标类型" prop="select">
					<Select v-model="formItem.select">
						<Option v-for="item,index in indexTypeList" :key="index" :value="item.value">{{item.label}}</Option>
					</Select>
				</FormItem>
				<FormItem label="添加疾病类型" prop="diseaseName">
					<Select :label="labelobj" v-model="formItem.diseaseName" multiple filterable remote :remote-method="remoteMethod2" not-found-text="">
						<Option v-for="(option, index) in diseaseList" :value="option.value" :key="index">{{option.label}}</Option>
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
						{{item}}
						<span @click="deletIndex(index)">
							<Icon class="followIndex_main_delet" type="ios-close"></Icon>
						</span>
					</span>
				</FormItem>
				<FormItem label="预警阀值" v-if="radioText" prop="anormal">
					<Select v-model="formItem.anormal" multiple style="width:260px">
						<Option v-for="item,index in optionList" :value="item" :key="index">{{ item }}</Option>
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
					<Button style="margin-right:30px" type="default" @click="cancelModel">取消</Button>
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
		return {
            createLoading:true,	 //loading 动画加载中
			//搜索数据
			IndexSearch: {
				pager: 1,
				limit: 10,
				name: '',
				otype: '',
				diseaseId: '',
			},
			//表格数据
			datalist: [],
			pageTotal: 0,
			patientText: false,//添加--修改模态框
			labelobj: [],//指标多选label标签
			//编辑内容
			formItem: {
				name: "",//指标名称
				select: '',//指标类型，id
				radio: 'string',//结果类型
				select2: '',//
				textarea: '',//备注
				indexName: '',//指标选项（临时数据）
				anormal: [],//预警阈值
				top: '',//预警阈值上限（数值类型）
				bottom: '',//预警阈值下限（数值类型）
				diseaseName: [],//疾病标签 
			},
			diseaseList: [],//疾病标签下拉框数组
			optionList: [],//指标选项的select
			optionList1: [],//指标选项select的label
			tagCount: [],
			tagCount2: [],
			radioText: false,//文本类型
			radioNumber: false,//数值类型
		}
	},
	computed:{
	   /**
		*校验规则
		* followIndexVal
	    **/
       followIndexVal(){
           return {
               name: [
                   { required: true, message: '指标名称不能为空', trigger: 'blur' }
               ],
               select: [
                   { required: true, message: '指标类型不能为空', trigger: 'change' }
               ],
               radio: [
                   { required: true, message: '请选择是否放音', trigger: 'change' }
               ],
		   }
	   },
	  /**
	   *指标类型集合
	   **/
      indexTypeList(){
		return [
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
        ]
      },
		/**
		 * 表格栏
		 * 渲染数据
		 */
	  config(){
		return [
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
					for (const item of this.indexTypeList) {
						if (item.value == params.row.otype) {
							return item.label
						}
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
							'class': {
								menuHide: this.menuShow(this.AM.FollowSetting.editIndex)
							},
							on: {
								click: () => {
									this.editIndex(params.row.id);
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
							'class': {
								menuHide:  true //this.menuShow(this.AM.FollowSetting.delIndex)
							},
							on: {
								click: () => {
									this.$Modal.confirm({
										title: '删除指标',
										content: '确定要删除该指标吗?',
										onOk: () => {
											this.deleteRow(params.row.id)
										},
										onCancel: () => {
										}
									})
								}
							}
						}, '删除')
					]);
				}
			}
		]
	  }
	},
	mounted() {
		/** 
		 * 获取数据
		 */
		this.list();
	},
	methods: {
		editIndex(id) {
			/** 
			 * 显示编辑框
			 */
			this.clearAll();
			this.patientText = true;
			this.formItem.anormal = [];
			this.optionList = [];
			API.follSetting.editList({
				id: id
			}).then((res) => {
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
				this.formItem ={
                    diseaseName:result,					//疾病标签
                    id:res.data.id,						//
                    name:res.data.name,					//指标名称
                    radio:res.data.type,				//结果类型
                    select:res.data.otype,				//指标类型，id
                    select2:res.data.status,			//
                    textarea:res.data.remark,			//备注
                    top:res.data.thresholdValueStart,	//预警阈值上限（数值类型）
                    bottom:res.data.thresholdValueEnd	//预警阈值下限（数值类型）
				}
				/** 
				 * 指标类型判断
				 */
				if (this.formItem.radio == 'select') {
					this.radioText = true;
					this.radioNumber = false;
				} else if (this.formItem.radio == 'digit') {
					this.radioNumber = true;
					this.radioText = false;
				} else {
					this.radioText = false;
					this.radioNumber = false;
				}
				if (res.data.optionValues) {
					res.data.optionValues = res.data.optionValues.split(",");
					res.data.thresholdValue = res.data.thresholdValue.split(",");
					this.optionList = res.data.optionValues;
					this.formItem.anormal = res.data.thresholdValue;  //预警阈值
				}

			}).catch((error) => {
				console.log(error)
			})
		},
		/** 
		 * 删除指标
		 */
		deletIndex(index) {
			this.optionList.splice(index, 1);
		},
		/*
		*获取list列表数据
		*/
		list() {
			API.follSetting.list(this.IndexSearch).then((res) => {
				this.datalist = res.data;
				this.pageTotal = res.total;
				this.createLoading = false;
			}).catch((error) => {
			})
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
			API.follSetting.deleteList({
				id: id
			}).then((res) => {
				this.$Message.success({
					content: '删除成功',
					top: 500
				});
				this.list();
			}).catch((error) => {
				console.log(error)
			})
		},
		/** 
		 * 取消弹框
		 */
		cancelModel(){
		 this.$Modal.confirm({
			  title: '退出编辑',
			  content: '<p>您还有内容未保存，确定要退出?</p>',
			  onOk: () => {
				this.patientText=false;
			  },
			  onCancel: () => {
			  }
			});
		},
        /**
         * 清除所有历史遗留数据
         */
		clearAll() {
		    this.formItem={
                id:'',           //
                name:'',         //指标名称
                diseaseName:[],  //
                anormal:[],      //预警阈值
                radio:'string',  //结果类型
                select:'',       //指标类型，id
                textarea:'',     //备注
                top:'',          //预警阈值上限（数值类型）
                bottom:''        //预警阈值下限（数值类型）
			};
			this.labelobj = [];   ////指标多选label标签
			this.diseaseList = [];  //指标选项的select
			this.tagCount = [];
			this.optionList = [];
			this.radioText = false;
			this.radioNumber = false;
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
			if (this.formItem.radio == "select" && this.optionList.length == 0) {
				this.$Message.warning("指标选项不可为空");
				return false;
			}
			this.$refs[name].validate((valid) => {
				if (valid) {
					let sendData = {
						"id": this.formItem.id,
						"name": this.formItem.name,
						"diseaseId": this.formItem.diseaseName.join(','),
						"status": '0',
						"type": this.formItem.radio,
						"otype": this.formItem.select,
						"optionValues": this.formItem.radio == "select" ? this.optionList.join(',') : "",
						"thresholdValue": this.formItem.radio == "select" ? this.formItem.anormal.join(",") : "",
						"thresholdValueStart": this.formItem.top,
						"thresholdValueEnd": this.formItem.bottom,
						"remark": this.formItem.textarea
					}
					API.follSetting.addList(sendData).then((res) => {
					    //数据进行清空
                        this.formItem={
                            id:'',
                            name:'',
                            select2:'',
                            select:'',
                            radio:'string',
                            textarea:''
						}
						this.patientText = false;
						this.list();
						this.$Message.success("提交成功");
					}).catch((error) => {
						console.log(error)
					})
				} else {
				}
			})
		},
		/*
		*监听增加/编辑单选状态
		*/
		radioChange(value) {
			if (value == 'select') {
				this.radioText = true;
				this.radioNumber = false;
			} else if (value == 'digit') {
				this.radioNumber = true;
				this.radioText = false;
			} else {
				this.radioText = false;
				this.radioNumber = false;
			}
		},
		/*
		*指标选项添加预警阀值
		*/
		addItem() {
		    if(!this.formItem.indexName){
                this.$Message.warning('您添加的为空');
                return false;
			}
			for (let item of this.optionList) {
				if (item == this.formItem.indexName) {
					this.$Message.warning('不可重复添加');
					return false;
				}
			}
			this.optionList.push(
				this.formItem.indexName
			);
			this.formItem.indexName = '';
		},
		/*
		*获取选中的疾病标签列value
		*/
		selectChange(value) {
			this.selectLabel = value.label
			this.selectValue = value.value
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
					})
				})
			}).catch((error) => {
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


<style lang="less">
.way {
	background: #fff;
}

.line {
	padding: 5px 20px;
	border-bottom: 1px solid #b1b1b1;
	width: 100%;
	margin-bottom: 34px;
}

.lineheight32 {
	line-height: 32px;
}

.mb5 {
	margin-bottom: 5px;
}

.padleft40 {
	padding-left: 40px;
}

.margintop20 {
	margin-top: 20px;
}

.border1 {
	border: 1px #b1b1b1 solid;
}

.textRight {
	text-align: right;
}



.wayNumber {
	.wayIndex {
		padding: 10px 0;
		.ivu-col {
			line-height: 30px;
			h3 {
				width: 30px;
				height: 30px;
				text-align: center;
				border-radius: 50%;
				background: #2d8cf0;
				color: #fff;
			}
		}
	}
}


.wayForm2 .ivu-form-item {
	margin-bottom: 10px;
	width: 50%;
}

.way {
	padding: 15px;
	border-radius: 5px;
	&_main {
		&_commonTemTitle{
			font-size: 16px;
			color: #2d8cf0;
			margin-bottom: 10px;
		}
		&_commonTitle {
			font-size: 20px;
			color: #333;
			margin-bottom: 20px;
		}
		&_diseaseType {
			width: calc(~"100% - 76px");
			margin-right: 20px;
			float: left;
		}
		&_wayForm {
			max-width: 500px;
		}
		&_questSize {
			height: 35px;
			width: 35px;
			border-radius: 50%;
			background: #2d8cf0;
			line-height: 35px;
			text-align: center;
			color: #fff;
			font-size: 12px;
			display: block;
		}
		&_timeSection {
			text-align: center;
			border-radius: 5px;
			display: block;
			background-color: #f1f1f1;
			margin-right: 10px;
			height: 25px;
			line-height: 25px;
			margin-top: 5px;
			position: relative;
		}
		&_closeTime{
			position: absolute;
			top: -5px;
			right: -5px;
			font-size: 14px;
			color: #2d8cf0;
			cursor: pointer;
		}
		&_temIndex{
			height: 25px;
			width: 25px;
			border-radius: 50%;
			border: 2px solid #2d8cf0;
			text-align: center;
			line-height: 21px;
			margin-top: 5px;
		}
		&_questTitle{
			border: 1px solid #f1f1f1;
			border-radius: 5px;
			background-color: #f1f1f1;
			.ivu-form-item-label{
				color: #2d8cf0;
				font-size: 15px;
				padding-top: 8px;
				width: 50px !important;
			}
			.ivu-form-item-content{
				 color: #2d8cf0;
				font-size: 15px;
				margin-left: 50px !important;
			 }
			color: #2d8cf0;
			font-size: 15px;

		}
		&_nowarp{
			/* display: inline-block; */
			width: 90%;
		}
		&_saveButton{
			margin: 10px auto;
			display: block;
			margin-top: 30px;
		}
		&_timePicker{
			display: block;
			margin:  0 auto;
		}
	}
}
</style>

<template>
	<Row class="way">
		<!-- 随访方案信息 -->
		<Col span="24">
			<h2 class="way_main_commonTitle">随访方案信息:</h2>
			<Form ref="wayForms" :model="wayForm" :label-width="80" :rules="validate.followAction" class="way_main_wayForm">
				<FormItem label="方案名称" prop="name">
					<Input v-model="wayForm.name" placeholder="请输入方案名称"></Input>
				</FormItem>
				<FormItem label="科室类别" prop="departmentId">
					<Select  v-model="wayForm.departmentId" placeholder="情选择科室类别">
						<Option v-for="item in departmentList" :value="item.id" :key="item.id">{{item.name}}</Option>
					</Select>
				</FormItem>
				<FormItem label="方案类型" prop="activeType">
					<RadioGroup v-model="wayForm.activeType" @on-change="typeChange">
						<Radio label="0">随访</Radio>
						<Radio label="1">通知</Radio>
					</RadioGroup>
				</FormItem>
				<FormItem label="疾病类型" >
					<Select class="way_main_diseaseType" v-model="wayForm.diseaseId" not-found-text="" filterable remote :remote-method="autoSearch" clearable style="" @on-change="selectChange" :label-in-value="true" placeholder="搜索疾病类型添加至疾病标签">
						<Option v-for="item in diseaseList" :value="item.id" :key="item.id">{{item.name}}</Option>
					</Select>
					<Button type="primary" @click="addTag" ref="addTagbtn">添加</Button>
				</FormItem>
				<FormItem  label="疾病标签">
					<tag v-for="item in wayForm.tagCount" color="blue" :key="item.value" :name="item.label" closable @on-close="tagClose">{{item.label}}</tag>
				</FormItem>
				<FormItem label="选择模板" prop="wayTem">
					<Select v-model="wayForm.wayTem" multiple style="width:260px">
						<Option v-for="item in temList" :value="item.id" :key="item.id">{{ item.name }}</Option>
					</Select>
				</FormItem>
			</Form>
		</Col>
		<!-- 配置随访方案 -->
		<h2 class="way_main_commonTitle">配置随访方案:</h2>
		<Col span="24" v-for="(item,index) in showList" :key="item.id">
		<!-- 模板名称&&随访周期 -->
			<Row>
				<Col span="1" class="lineheight32">
					<h3 class="way_main_temIndex">{{index+1}}</h3>
				</Col>
				<Col span="2" style="max-width:70px" class="lineheight32 way_main_commonTemTitle">
					<strong>模板名称:</strong>
				</Col> 
				<Col span="21" class="lineheight32 way_main_commonTemTitle">
					<strong>{{item.name}}</strong>
				</Col>
				<Col span="2" style="max-width:65px" class="lineheight32 " offset="1">
					<strong>随访周期:</strong>
				</Col>
				<Col span="21" class="lineheight32">
					<Row>
						<Col span="2">
							<span>随访次数:</span>
						</Col>
						<Col span="21">
							<InputNumber size="small" :max="100" :min="1" v-model="item.questionTemples.questionTempleFrequency.number"></InputNumber>次, 第
							<InputNumber size="small" :min="1" v-model="item.questionTemples.questionTempleFrequency.firstday"></InputNumber> 天,第一次随访,每隔
							<InputNumber size="small" :max="100" :min="1" v-model="item.questionTemples.questionTempleFrequency.intervalDays"></InputNumber> 天，随访一次。
						</Col>
					</Row>
				</Col>
			</Row>
			<!-- 随访区间 -->
			<Row style="margin:10px 0;">
				<Col style="max-width:65px" span="2" class="lineheight32" offset="1">
				<strong>随访区间:</strong>
				</Col>
				<Col span="21" class="lineheight32">
				<Row>
					<Col span="2">
					<span>时间段:</span>
					</Col>
					<template v-for="ite,i in item.questionTemples.questionTempleTimeRanges">
						<Col span="3" class="way_main_timeSection">
							<span>{{ite.beginTime}}</span>
							<span>-</span>
							<span>{{ite.endTime}}</span>
							<span  @click="deletTime(item.questionTemples.questionTempleTimeRanges,i)" >
							<Icon class="way_main_closeTime" type="ios-close"></Icon>
							</span>
						</Col>
					</template>
					<Col span="2">
					<Button type="primary" size="small" @click="addTime(item)">新增</Button>
					</Col>
				</Row>
				</Col>
			</Row>
			<Row style="margin-top:10px;">
				<Col style="max-width:65px" span="2" offset="1">
					<strong style="margin-top:5px;display:block">语音配置:</strong>
				</Col>
				<Col span="21">
				<!-- title和只能语音单独处理 -->
				<Row class="wayIndex" v-for="ite in item.questionTemples.questionSchemeWavs" :key="ite.id">
					<Col span="2">
					<span class="way_main_questSize">
						{{ite.questionIdXml}}
					</span>
					</Col>
					<Col span="20">
					<Collapse v-model="ite.questionId">
						<Panel name="1">
							<span class="way_main_nowarp">问题:{{ite.questionName}}</span>
							<Icon type="chevron-right" size="14" color="#999" style="line-height: 35px; float:right; margin-right:10px"></Icon>
							<div slot="content">
							<Form :label-width="110" v-for="it,index in ite.questionTempleQuestionJumps" :key="index" v-if="it.switchId==''">
								<FormItem label="问题AI语音">
									<Input v-model="it.switchWav" placeholder="请输入问题ai语音"></Input>
								</FormItem>
							</Form>
							<Form   :model="it"  :rules="validate.followAction"   :label-width="110"  v-for="it,index in ite.questionTempleQuestionJumps" :key="index" v-if="it.switchId!=''">
								<FormItem class="way_main_questTitle"  label="处理">
									<span>{{(it.switchId=="无匹配"||it.switchId=="无声音"||it.switchId=="通用处理")?it.switchId:it.switchId==""?"人工ai":"自定义处理"}}</span>
								</FormItem>
								<!-- <FormItem v-if="it.switchId!='无匹配'&&it.switchId!='无声音'&&it.switchId!='通用处理'" label="名称">
									<Input v-model="it.switchText" placeholder="请输入名称"></Input>
									<span>{{it.switchText}}</span>
								</FormItem> -->
								<FormItem v-if="it.switchId!='无匹配'&&it.switchId!='无声音'&&it.switchId!='通用处理'" label="判别规则">
									<span>{{it.switchRegexText}}</span>
								</FormItem>
								<FormItem v-if="it.switchId!='无匹配'&&it.switchId!='无声音'&&it.switchId!='通用处理'" label="指标值">
									<span>{{it.keyname}} ：{{it.keyvalue}}</span>
								</FormItem>
								<FormItem prop="switchWav" label="AI语音">
									<!-- <Upload action="//jsonplaceholder.typicode.com/posts/" :before-upload="handleUpload">
										<Button type="ghost" icon="ios-cloud-upload-outline">请输入ai语音地址</Button>
									</Upload> -->
									<Input v-model="it.switchWav" placeholder="请输入ai语音地址"></Input>
								</FormItem>
								<FormItem label="跳转问题编号">
									<span>{{it.nextQuestionId}}</span>
								</FormItem>
								<FormItem label="无匹配超次数跳转">
									<!-- <Input v-model="it.outRptSwitchID" placeholder="请输入无匹配的跳转次数"></Input> -->
									<span>{{it.outRptSwitchID}}</span>
								</FormItem>
							</Form>
							</div>
						</Panel>
					</Collapse>
					</Col>
				</Row>
				</Col>
			</Row>
		</Col>
		<Col span="24">
		<Button class="way_main_saveButton" type="primary" @click="saveChange">保存</Button>
		</Col>
		 <Modal v-model="timemodal" title="新增随访时间段" >
			<TimePicker @on-change="timeChange" class="way_main_timePicker" format="HH:mm" type="timerange" placement="bottom-end" placeholder="请选择随访时间段" style="width: 168px"></TimePicker>
            <div slot="footer" class="sys-sysset_main_btnList">
				<Button @click="timerangeSave" type="primary">确认</Button>
            </div>
        </Modal>
	</Row>
</template>

<script>
import { API } from '@/services';
//模拟数据
import { aa } from '@/views/followSetting/template/aa.js'
export default {
	data() {
		return {
			//最终需要提交的数据
			formData: aa,
			templateId: '',//模板id
			//最终提交数据数据头部
			wayForm: {
				/* id:"",//id不传代表新增 */
				name: '',//方案名称
				diseaseId: '',//疾病类型id
				departmentId: '', //科室类型id
				activeType: '0',//方案类型：0代表随访，1代表通知
				status: 0,//状态：0，启用；1，禁用
				wayTem: [],
				tagCount: [],//疾病标签列表
			},
			creatTime:[],//生成的时间
			clickTime:{},//被选中的对象
			timemodal:false,
			departmentList: [],//科室列表
			diseaseList: [],//疾病列表
			temList: [],//模板列表
			selectList: [],//已选择模板列表
			normaldata: {
			},//默认数据
			editList:[],//被编辑的数据
			actionTime:0,//剩余操作次数
			selectItem: {},//被选中的疾病列表
			targetShow: true,//判断是否疾病标签是否展示
			targetTag: '',//指标标签
			tagShow: false,//标签是否展示,
		}
	},
	computed: {
		/** 
		 * 自动计算已经选中的方案
		 */
		showList() {
			let arr = [];
			for (let item of this.wayForm.wayTem) {
				for (let ite of this.temList) {
					if (item == ite.id) {
						arr.push(ite);
					}
				}
			}
			return arr;
		}
	},
	methods: {
		/** 
		 * 删除时间段
		 */
		deletTime(obj,index){
			if(obj.length==1){
				this.$Message.warning("至少保留一个随访时间段");
				return false;
			}
			this.$Modal.confirm({
                title: '删除时间段',
                content: '确定删除该时间段？',
                onOk: () => {
                    obj.splice(index,1);
                   this.$Message.success("删除成功");
                   
                }
            });
		},
		/** 
		 * 保存新增的时间段
		 */
		timerangeSave(){
			this.clickTime.questionTemples.questionTempleTimeRanges.push({
				templeId:this.clickTime.id, 
				type: 0,  
				beginTime: this.creatTime[0],    
				endTime: this.creatTime[1]  
			});
			this.creatTime=[];
			this.timemodal=false;
		},
		/** 
		 * 时间变化
		 */
		timeChange(time){
			this.creatTime=time;
		},
		/** 
		 * 新增时间段
		 */
		addTime(obj){
			this.clickTime=obj;
			this.timemodal=true;
		},
		/** 
		 * 最终的数据保存操作
		 */
		saveChange(){
			let flag=0;
			this.$refs["wayForms"].validate((valid) => {
                if (valid) {
                   
                } else {
					this.$Message.error('补全信息!');
					flag++;
                }
			});
			for (let item of this.showList) {
				for (let ite of item.questionTemples.questionSchemeWavs) {
					for (let it of ite.questionTempleQuestionJumps) {
						if(it.switchWav!=undefined && (it.switchWav).trim()==""){
							this.$Message.error('请输入ai语音!');
							flag++;
							return false;
						}
					}
				}
			}
			if(flag>0){
				return false;
			}
			if(this.wayForm.tagCount.length==0){
				this.$Message.error('请选择疾病类型!');
				return false;
			}
			let sendData=JSON.parse(JSON.stringify(this.wayForm));
			delete sendData.wayTem;
			sendData.diseaseId="";
			for (const item of this.wayForm.tagCount) {
				sendData.diseaseId+=(item.value+",");
			}
			sendData.diseaseId = sendData.diseaseId.substr(0,sendData.diseaseId.length-1);
			/** 
			 * 模板列表
			 */
			sendData.questionTemples=[];
			for (let item of this.temList) {
				let copyItem=JSON.parse(JSON.stringify(item.questionTemples));
				copyItem.questionSchemeWavs=[];
				for (let ite of item.questionTemples.questionSchemeWavs) {
					for (let it of ite.questionTempleQuestionJumps) {
					copyItem.questionSchemeWavs.push(JSON.parse(JSON.stringify(it)));
					}
				}
				sendData.questionTemples.push(copyItem);
			}
			API.followWay.addList(sendData).then((res) => {
				this.$Message.success("保存成功");
			}).catch((error) => {
				console.log(error)
			})
		},
		/**@argument
		获取所有科室
		 */
		getDepartment() {
			API.followWay.departmentList({
				page: 1, //当前页码
				limit: 100000,//每页条数
			}).then((res) => {
				this.departmentList = res.data;
			}).catch((error) => {
				console.log(error)
			})
		},
		/*
		*通过方案id获取方案信息
		*/
		templateInfo() {
			API.followWay.editList({
				id: this.templateId,
			}).then((res) => {
				this.wayForm={
					id:this.templateId,
					name:res.data.name,//方案名称
					diseaseId:res.data.diseaseId,//疾病类型id
					departmentId:res.data.departmentId, //科室类型id
					activeType: res.data.activeType,//方案类型：0代表随访，1代表通知
					status: res.data.status,//状态：0，启用；1，禁用
					wayTem: [],
					tagCount:[]
				}
				let idList=res.data.diseaseId.split(",");
				let nameList=res.data.diseaseName.split(",");
				let diseaseArray=[];
				/** 
				 * 数据重组
				 */
				for (let index = 0; index < idList.length; index++) {
					diseaseArray.push({
						label:nameList[index],
						value:idList[index]
					})
				}
				for (let item of diseaseArray) {
					this.actionTime=diseaseArray.length;
					this.selectItem = item;
					this.addTag();
				}
			}).catch((error) => {
				console.log(error)
			})
		},
		/** 
		 * 根据方案id获取语音等信息
		 */
		getvoiceList(){
			API.followWay.voiceList({
				id: this.templateId,
			}).then((res) => {
				this.editList=res.data;
			}).catch((error) => {
			})
		},
		/*
		* 方案类型切换
		*/
		typeChange(value) {
			/* this.person = value */
		},
		/*
		* 疾病类型--智能匹配
		*/
		autoSearch(query) {
			if (query == '') {
				return false;
			}
			API.followProblems.disease({
				zjm: query
			}).then((res) => {
				this.diseaseList = res.data
			}).catch((error) => {
			})
		},
		/*
		* 获取选中的疾病标签列value
		*/
		selectChange(item) {
			/** 
			 * 根据item的id获取对应的模板
			 * 根据模板id获取获取问题模板
			 */
			this.selectItem = item;
		},
		/*
		 *通过模板id获取模板问题列表
		 */
		temQuestion(data) {
			API.followTemplate.questionList({
				id: data.id,
			}).then((res) => {
				data.questionTemples.questionSchemeWavs = res.data;
				this.temList.push(data);
				if(this.actionTime>0){
					/** 
					 * 最好在此处直接进行数据的最终格式化
					 */
					for(let item of this.editList) {
					  if (item.id==data.id) {
						  data.questionTemples.questionTempleFrequency=item.questionTempleFrequency;
						  data.questionTemples.questionTempleTimeRanges=item.questionTempleTimeRanges;
						 data.questionTemples.questionSchemeWavs=this.editFormData(JSON.parse(JSON.stringify(data.questionTemples.questionSchemeWavs)),item);
						 this.wayForm.wayTem.push(data.id); 
					  }
					}
					this.actionTime--;
				}
				
			}).catch((error) => {
			})
		},
		/** 
		 * 编辑过程中的初始化数据编辑
		 */
		editFormData(data,all){
			for(let item of data) {
				item.questionTempleQuestionJumps=[];
			   for (let ite of all.questionSchemeWavs) {
				   console.log(item.questionId,ite.questionId);
				  if (item.questionId==ite.questionId) {
					  item.questionTempleQuestionJumps.push(ite);
				  } 
			   }
			}
			console.log(data);
			return data;
		},
		/** 
		 * 根据疾病id获取具体模板信息
		 */
		temDisease(id) {
			API.followTemplate.list({
				diseaseId: id,
				pager: 1, //当前页码
				limit: 3, //每页条数
			}).then((res) => {
				this.dataForm(res.data[0]);
			}, err => {
				console.log(err);
			}).catch((error) => {
				console.log(error);
			})
		},
		/*
		*添加标签
		*/
		addTag() {
			let flag = 0;
			this.wayForm.tagCount.forEach((item) => {
				if (this.selectItem.label == item || this.selectItem.label == '') {
					flag++;
					alert('您添加的为空或者重复添加')
				}
			})
			if (flag > 0) {
				this.selectItem = {}
				return false;
			}
			/** 
			 * 获取具体模板
			 */
			this.temDisease(this.selectItem.value);
			this.wayForm.tagCount.push(this.selectItem);
			this.selectItem = {};
			this.wayForm.diseaseId = ''
		},
		/** 
		 * 数据格式化
		 */
		dataForm(data) {
			data.questionTemples = {
				questionTempleTimeRanges: [
					{
						templeId: data.id, // 模板id
						type: '0',          // 默认0
						beginTime: '7:00',  // 随访区间，时间段1
						endTime: '11:00'   // 随访区间，时间段2
					},
					{
						templeId:  data.id,
						type: '0',
						beginTime: '14:00',
						endTime: '23:00'
					}
				],
				questionTempleFrequency: {
					templeId:  data.id,   // 模板id
					number: 10,    // 随访次数
					firstday: 3,   // 出院后第几天，第一次随访
					intervalDays: 2  // 间隔多少天再次随访
				},
				questionSchemeWavs: []
			};
			this.temQuestion(data)
		},
		/*
		* 疾病标签删除
		*/
		tagClose(event, name) {
			const index = this.wayForm.tagCount.indexOf(name);
			this.wayForm.tagCount.splice(index, 1);
		},
		async dataInit(){
			/** 
			 * 首先获取具体问题列表
			 */
			await this.getvoiceList();
			/** 
			 * 获取大体信息
			 */
			await this.templateInfo();
		}

	},
	mounted() {
		this.templateId = this.$route.params.id
		if (this.templateId != "new") {
			this.dataInit();
		}
		this.getDepartment();
		
	}
}
</script>


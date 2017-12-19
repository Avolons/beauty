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
		&_commonTitle {
			font-size: 20px;
			color: #333;
			margin-bottom: 20px;
		}
		&_diseaseType {
			width: calc(~"100% - 76px");
			float: left;
			margin-right: 20px;
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
	}
}
</style>

<template>
	<Row class="way">
		<!-- 随访方案信息 -->
		<Col span="24">
		<h2 class="way_main_commonTitle">随访方案信息:</h2>
		<Form ref="wayForm" :model="wayForm" :label-width="80" class="way_main_wayForm">
			<FormItem label="方案名称" prop="name">
				<Input v-model="wayForm.name" placeholder="Enter your name"></Input>
			</FormItem>
			<FormItem label="科室类别" prop="departmentId">
				<Select class="way_main_diseaseType" v-model="wayForm.departmentId" placeholder="搜索疾病类型添加至疾病标签">
					<Option v-for="item in departmentList" :value="item.id" :key="item.id">{{item.name}}</Option>
				</Select>
			</FormItem>
			<FormItem label="方案类型" prop="activeType">
				<RadioGroup v-model="wayForm.activeType" @on-change="typeChange">
					<Radio label="0">随访</Radio>
					<Radio label="1">通知</Radio>
				</RadioGroup>
			</FormItem>
			<FormItem label="疾病类型" prop="diseaseId">
				<Select class="way_main_diseaseType" v-model="wayForm.diseaseId" filterable remote :remote-method="autoSearch" clearable style="" @on-change="selectChange" :label-in-value="true" placeholder="搜索疾病类型添加至疾病标签">
					<Option v-for="item in diseaseList" :value="item.id" :key="item.id">{{item.name}}</Option>
				</Select>
				<Button type="primary" @click="addTag" ref="addTagbtn">添加</Button>
			</FormItem>
			<FormItem label="" prop="" label="疾病标签">
				<tag v-for="item in tagCount" color="blue" :key="item" :name="item" closable @on-close="tagClose">{{item}}</tag>
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
			<Col span="2" class="lineheight32">
				<strong>模板名称:</strong>
			</Col>
			<Col span="21" class="lineheight32">
				<strong>{{item.name}}</strong>
			</Col>
			<Col span="2" class="lineheight32" offset="1">
				<strong>随访周期:</strong>
			</Col>
			<Col span="21" class="lineheight32">
				<Row>
					<Col span="2">
						<span>随访次数:</span>
					</Col>
					<Col span="21">
						<InputNumber size="small" :max="100" :min="1" v-model="item.questionTemples.questionTempleFrequency.number"></InputNumber> 第
						<InputNumber size="small" :min="0" v-model="item.questionTemples.questionTempleFrequency.firstday"></InputNumber> 天,第一次随访,每隔
						<InputNumber size="small" :max="100" :min="0" v-model="item.questionTemples.questionTempleFrequency.intervalDays"></InputNumber> 天，随访一次。
					</Col>
				</Row>
			</Col>
		</Row>
		<!-- 随访区间 -->
		<Row style="margin:10px 0;">
			<Col span="2" class="lineheight32" offset="1">
			<strong>随访区间:</strong>
			</Col>
			<Col span="21" class="lineheight32">
			<Row>
				<Col span="2">
				<span>时间段:</span>
				</Col>
				<template v-for="ite in item.questionTemples.questionTempleTimeRanges">
					<Col span="3" class="way_main_timeSection">
					<span>{{ite.beginTime}}</span>
					<span>-</span>
					<span>{{ite.endTime}}</span>
					</Col>
				</template>
				<Col span="2">
				<Button type="primary" size="small">新增</Button>
				</Col>
			</Row>
			</Col>
		</Row>
		<Row style="margin-top:10px;">
			<Col span="2" offset="1">
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
						问题{{ite.questionName}}
						<Icon type="close-circled" size="22" color="#f70000" style="line-height: 35px; float:right; margin-right:10px"></Icon>
						<Form :label-width="100" slot="content" v-for="it,index in ite.questionTempleQuestionJumps" :key="index">
							<!-- <FormItem label="问题AI语音">
									<Input placeholder="请输入问题ai语音"></Input>
								</FormItem> -->
							<FormItem label="处理">
								<span>{{(it.switchId=="无匹配"||it.switchId=="无声音"||it.switchId==-"通用处理")?it.switchId:it.switchId==""?"人工ai":"自定义处理"}}</span>
							</FormItem>
							<FormItem label="名称">
								<Input v-model="it.switchText" placeholder="请输入名称"></Input>
							</FormItem>
							<FormItem label="判别规则">
								<Input v-model="it.switchRegexText" placeholder="请填写判别规则"></Input>
							</FormItem>
							<FormItem label="指标值">
								<Input v-model="it.keyname" placeholder="请填写指标值"></Input>
								<span>{{it.keyname}}:{{it.keyvalue}}</span>
							</FormItem>
							<FormItem label="AI语音">
								<Input v-model="it.switchWav" placeholder="请输入ai语音地址"></Input>
							</FormItem>
							<FormItem label="跳转问题编号">
								<Input v-model="it.nextQuestionId" placeholder="请输入跳转问题编号"></Input>
							</FormItem>
							<FormItem v-if="it.outRptSwitchID" label="无匹配超次跳转">
								<Input v-model="it.outRptSwitchID" placeholder="请输入无匹配的跳转次数"></Input>
							</FormItem>
						</Form>
					</Panel>
				</Collapse>
				</Col>
			</Row>
			</Col>
		</Row>

		</Col>

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
				wayTem: []
			},
			departmentList: [],//科室列表
			diseaseList: [],//疾病列表
			temList: [],//模板列表
			selectList: [],//已选择模板列表
			normaldata: {

			},//默认数据
			collapse: '1',
			tagCount: [],
			tagCount2: [],
			selectLabel: '',
			selectValue: '',
			targetShow: true,//判断是否疾病标签是否展示
			targetTag: '',//指标标签
			tagShow: false,//标签是否展示,
		}
	},
	computed: {
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
		*通过模板id获取模板表单信息
		*/
		templateInfo() {
			API.followWay.editList({
				id: this.templateId,
			}).then((res) => {
				// console.log(res)
				if (res.code == 0) {
					this.wayForm.name = res.data.name
					this.diseaseName = res.data.name
					this.wayForm.diseaseId = res.data.diseaseId
					this.wayForm.departmentId = res.data.departmentId
					this.wayForm.person = res.data.activeType

				} else {
					console.log(res.message)
				}
			}).catch((error) => {
				console.log(error)
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
			this.selectLabel = item.label;
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
			}).catch((error) => {
			})
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
				console.log(err);
			})
		},
		/*
		*添加标签
		*/
		addTag() {
			let flag = 0;
			this.tagCount.forEach((item) => {
				if (this.selectLabel == item || this.selectLabel == '') {
					flag++;
					alert('您添加的为空或者重复添加')
				}
			})
			if (flag > 0) {
				this.selectLabel = ''
				return false;
			}
			/** 
			 * 获取具体模板
			 */
			this.temDisease(this.wayForm.diseaseId);
			this.tagCount.push(this.selectLabel);
			this.selectLabel = ''
			this.selectValue = ''
			this.wayForm.diseaseId = ''
		},
		/** 
		 * 数据格式化
		 */
		dataForm(data) {
			data.questionTemples = {
				questionTempleTimeRanges: [
					{
						templeId: this.templateId, // 模板id
						type: '0',          // 默认0
						beginTime: '7:00',  // 随访区间，时间段1
						endTime: '11:00'   // 随访区间，时间段2
					},
					{
						templeId: this.templateId,
						type: '0',
						beginTime: '14:00',
						endTime: '23:00'
					}
				],
				questionTempleFrequency: {
					templeId: this.templateId,   // 模板id
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
			console.log(event)
			console.log(name)
			const index = this.tagCount.indexOf(name);
			this.tagCount.splice(index, 1);
		},
		/*
		  *删除一条模板
		  */
		deleteCol(index) {
			console.log(index)
			this.templateList1.splice(index, 1)
			console.log(this.templateList1)
		}

	},
	mounted() {
		this.templateId = this.$route.params.id
		if (this.templateId != "new") {
			this.templateInfo()
		}
		this.getDepartment();
	}
}
</script>


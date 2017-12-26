<style lang="less">
.line {
	padding: 5px 20px;
	border-bottom: 1px solid #2d8cf0;
	width: 100%;
	margin-bottom: 34px;
	h2 {
		font-weight: 400;
		font-family: "Open Sans", "Helvetica Neue", Helvetica, Arial, sans-serif;
		font-size: 22px;
	}
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

.template {
	background: #fff;
	padding: 10px;
	height: 100%;
	color: #333;
	form {
		padding-right: 500px;
		.ivu-form-item:nth-of-type(1),
		.ivu-form-item:nth-of-type(6) {
			width: 100%;
		}
		.ivu-form-item:nth-of-type(7) {
			.ivu-input-wrapper {
				width: 60%;
			}
		}
		.ivu-form-item:nth-of-type(7) {
			.ivu-input-wrapper {
				width: 60%;
			}
		}
		.ivu-form-item {
			width: 50%;
			float: left;
		}
	}
	.questionTem {
		background: #fff;
		.setQuestion {
			padding: 0 200px;
			.questionList {
				height: 100%;
			}
			.questionSelect {
				height: 100%; // border-left: 1px #b1b1b1 solid;
				p {
					line-height: 40px;
					font-size: 22px;
				}
			}
		}
	}
}

.collapseStyle {
	border: 0;
}

.ivu-timeline-item-content {
	border: 1px solid #dddee1;
}

.ivu-tabs-bar {
	padding-left: 20px;
}

.template {
	&_main {
		&_commonTitle {
			font-size: 15px;
			margin: 15px 0;
			>span {
				display: inline-block;
				height: 25px;
				line-height: 25px;
				width: 25px;
				border-radius: 50%;
				background-color: #2d8cf0;
				text-align: center;
				color: #fff;
				margin-right: 10px;
			}
		}
		&_stepOne {
			max-width: 900px;
		}
		&_tag {
			border: 1px solid #dadada;
			height: 200px;
			border-radius: 5px;
			.ivu-tabs-bar {
				margin: 0;
			}
			.ivu-tabs-content-animated {
				height: calc(~'100% - 36px');
				.ivu-tabs-tabpane {
					height: 100%;
					overflow-y: auto;
				}
			}
		}
		&_tagList {
			>li {
				margin: 5px;
				border-radius: 5px;
				padding: 1px 10px;
				cursor: pointer;
				background-color: #f3f3f3;
			}
		}
		&_disAdd {
			width: 50%;
		}
		&_questionItem {
			background-color: #fff;
			border-radius: 5px;
			box-sizing: border-box;
			padding: 10px;
			margin-bottom: 10px;
			h3 {
				background-color: #f1f1f1;
				border-radius: 5px;
				padding: 5px 15px;
				color: #2d8cf0;
				margin: 15px 0;
			}
		}
		&_questionSelect {
			margin-left: 25px;
			border-radius: 5px;
			box-sizing: border-box;
			padding: 15px;
			border: 1px solid #dadada;
			background-color: #f3f3f3;
		}
		&_questList {
			border: 1px solid #dadada;
			background-color: #f3f3f3;
			border-radius: 5px;
			max-height: 500px;
			overflow-y: auto;
			box-sizing: border-box;
			padding: 10px;
			>li {
				height: 30px;
				line-height: 30px;
				text-align: left;
				background-color: #2d8cf0;
				color: #fff;
				font-size: 13px;
				border-radius: 5px;
				margin-bottom: 10px;
				.ivu-poptip {
					width: 100%;
					cursor: pointer;
					.ivu-poptip-rel{
						width: 100%;
					}
				}
				.ivu-btn-text {
					color: #fff;
					text-align: left;
					display: block;
					margin-left: 30px;
					width: calc(~"100% - 30px")
				}
			}
		}
	}
}
</style>
<template>
	<Row class="template">
		<Col span="24" class="line">
		<h2>随访模板信息:</h2>
		</Col>
		<Form ref="templateForm" :model="templateForm" :rules="ruleValidate" :label-width="80">
			<FormItem label="模板名称" prop="name">
				<Input v-model="templateForm.name" placeholder="请填写模板名称"></Input>
			</FormItem>
			<FormItem label="疾病类型" prop="diseaseId">
				<Select :label="labelobj" v-model="templateForm.diseaseId"  multiple filterable remote not-found-text="" :remote-method="remoteMethod" >
					<Option v-for="(item, index) in diseaseList" :value="item.value" :key="index">{{item.label}}</Option>
				</Select>
				<!-- <AutoComplete
						v-model="templateForm.diseaseId"
						@on-search="remoteMethod"
						placeholder="请输入疾病类型"
						>
						<Option v-for="item in diseaseList" :value="item.label+'('+item.value+')'" :key="item.value">{{ item.label }}</Option>
   		 </AutoComplete> -->
			</FormItem>
			<FormItem label="静默时间" prop="silencetime">
				<InputNumber v-model="templateForm.silencetime" :min="0" style="width:100%;" placeholder="请输入静默时间,类型为数字,单位默认为秒"></InputNumber>
				<!-- <Input v-model="templateForm.silencetime" placeholder="Enter your name"></Input> -->
			</FormItem>
			<FormItem label="重复次数" prop="outrepeattimes">
				<InputNumber v-model="templateForm.outrepeattimes" :min="0" style="width:100%;" placeholder="请输入重复次数,类型为数字,单位默认为次数"></InputNumber>
				<!-- <Input v-model="templateForm.outrepeattimes" placeholder="Enter your name"></Input> -->
			</FormItem>
			<FormItem label="起始问题" prop="firsttaskid">
				<!-- <InputNumber v-model="templateForm.firsttaskid" :min="0" style="width:100%;" placeholder="Enter your name"></InputNumber> -->
				<Input v-model="templateForm.firsttaskid" placeholder="Enter your name"></Input>
			</FormItem>
			<FormItem label="合成声音" prop="person">
				<RadioGroup v-model="templateForm.person" @on-change="radioChange">
					<Radio label="0">女声</Radio>
					<Radio label="1">男声</Radio>
				</RadioGroup>
			</FormItem>
			<FormItem label="添加通用库" prop="addSubmoulds">
				<Input v-model="templateForm.addSubmoulds" placeholder="请添加以.xml结尾的文件"></Input>
				<Button type="primary" @click="addTag">添加</Button>
			</FormItem>
			<FormItem label="通用库">
				<tag v-for="item in tagCount" color="blue" :key="item" :name="item" closable @on-close="tagClose">{{item}}</tag>
			</FormItem>
		</Form>
		<Col span="24" class="line">
		<h2>配置随访问题:</h2>
		</Col>

		<Col span="24" class="template_main_questionTem">
		<div class="template_main_stepOne">
			<h3 class="template_main_commonTitle">
				<span>1</span>
				选择疾病类型
			</h3>
			<Alert type="success">
				添加疾病类型显示对应的指标
			</Alert>
			<div class="template_main_disAdd">
				<Select placeholder="选择疾病类型获取对应的指标" v-model="listDisID" filterable remote not-found-text="" :remote-method="remoteMethod2" clearable @on-change="selectChange">
					<Option v-for="(option, index) in diseaseListQues" :value="option.value" :key="index">{{option.label}}</Option>
				</Select>
			</div>
		</div>
		<div class="template_main_stepOne">
			<h3 class="template_main_commonTitle">
				<span>2</span>
				配置问题
			</h3>
			<Alert type="success">
				双击指标可添加到第三步
			</Alert>
			<Row class="targetpz margintop20">
				<Tabs value="name1" class="template_main_tag" @on-click="tabsClick">
					<TabPane label="无" name="">
						<ul class="template_main_tagList">
							<li v-for="item in this.allQuestions">
								<Poptip trigger="hover" title="" content="双击问题添加到第三步">
									<Button type="text" v-on:dblclick.native="addQuestion(item)">{{item.title}}</Button>
								</Poptip>
							</li>
						</ul>
					</TabPane>
					<TabPane label="症状" name="01">
						<ul class="template_main_tagList">
							<li v-for="item in this.question1">
								<Poptip trigger="hover" title="" content="双击问题添加到第三步">
									<Button type="text" v-on:dblclick.native="addQuestion(item)">{{item.title}}</Button>
								</Poptip>
							</li>
						</ul>
					</TabPane>
					<TabPane label="体征" name="02">
						<ul class="template_main_tagList">
							<li v-for="item in this.question2">
								<Poptip trigger="hover" title="" content="双击问题添加到第三步">
									<Button type="text" v-on:dblclick.native="addQuestion(item)">{{item.title}}</Button>
								</Poptip>
							</li>
						</ul>
					</TabPane>
					<TabPane label="生活方式指导" name="03">
						<ul class="template_main_tagList">
							<li v-for="item in this.question3">
								<Poptip trigger="hover" title="" content="双击问题添加到第三步">
									<Button type="text" v-on:dblclick.native="addQuestion(item)">{{item.title}}</Button>
								</Poptip>
							</li>
						</ul>
					</TabPane>
					<TabPane label="辅助检查" name="04">
						<ul class="template_main_tagList">
							<li v-for="item in this.question4">
								<Poptip trigger="hover" title="" content="双击问题添加到第三步">
									<Button type="text" v-on:dblclick.native="addQuestion(item)">{{item.title}}</Button>
								</Poptip>
							</li>
						</ul>
					</TabPane>
					<TabPane label="用药反馈" name="05">
						<ul class="template_main_tagList">
							<li v-for="item in this.question5">
								<Poptip trigger="hover" title="" content="双击问题添加到第三步">
									<Button type="text" v-on:dblclick.native="addQuestion(item)">{{item.title}}</Button>
								</Poptip>
							</li>
						</ul>
					</TabPane>
					<TabPane label="转诊情况" name="06">
						<ul class="template_main_tagList">
							<li v-for="item in this.question6">
								<Poptip trigger="hover" title="" content="双击问题添加到第三步">
									<Button type="text" v-on:dblclick.native="addQuestion(item)">{{item.title}}</Button>
								</Poptip>
							</li>
						</ul>
					</TabPane>
					<TabPane label="通用" name="07">
						<ul class="template_main_tagList">
							<li v-for="item in this.question7">
								<Poptip trigger="hover" title="" content="双击问题添加到第三步">
									<Button type="text" v-on:dblclick.native="addQuestion(item)">{{item.title}}</Button>
								</Poptip>
							</li>
						</ul>
					</TabPane>
				</Tabs>
			</Row>
		</div>
		<h3 class="template_main_commonTitle">
			<span>3</span>
			问题编辑
		</h3>
		<Alert type="success">
			双击问题可添加到右侧进行编辑
		</Alert>
		<Row class="setQuestion">
			<Col span="6" class="questionList">
			<ul class="template_main_questList">
				<li v-for="item in this.stepThirdQuestion">
					<Poptip trigger="hover" title="" content="双击问题开始编辑">
						<Button type="text" v-on:dblclick.native="addThirdQuestion(item)">{{item.title}}</Button>
					</Poptip>
				</li>
			</ul>
			<p style="line-height: 30px;">小提示：补充完右侧末班内容后，点击创建即可新增模板！</p>
			<Button type="primary" @click="addTemplate">创建随访模板</Button>
			</Col>
			<Col span="16" offset="2" class="template_main_questionSelect">
			<div class="template_main_questionItem" v-for="(item, index) in this.templateList" :key="item.questionIdXml">
				<Row>
					<Col span="2">
					<div style="border-radius: 100%; width: 38px; height: 38px; line-height: 38px; text-align: center;background:#2d8cf0;color:#fff">{{item.questionIdXml}}</div>
					</Col>
					<Col span="18">
					<Collapse v-model="collapse" class="collapseStyle">
						<Panel :name="index+1+''">
							{{item.questionName}}
							<ul slot="content" v-for="item1 in item.questionTempleQuestionJumps">
								<li>
									<Row class="itemli">
										<h3 class="">处理: {{item1.switchId==-1?"无匹配":item1.switchId==-2?"无声音":item1.switchId==-3?"通用处理":"自定义处理"}}</h3>
										<Row class="padleft40 mb5" v-show="item1.switchRegexText">
											<Col span="4" style="width:105px" class="lineheight32">判别规则:</Col>
											<Col span="20" style="width:calc(100% - 105px)" class="textCenter lineheight32">
											<span>{{item1.switchRegexText}}</span>
											</Col>
										</Row>
										<Row class="padleft40 mb5" v-show="item1.keyname">
											<Col span="4" style="width:105px" class="lineheight32">指标值:</Col>
											<Col span="20" style="width:calc(100% - 105px)" class="textCenter lineheight32">
											<span>{{item1.keyname}}{{item1.keyvalue}}</span>
											</Col>
										</Row>
										<Row class="padleft40 mb5">
											<Col span="4" style="width:105px" class="lineheight32">跳转问题编号:</Col>
											<Col span="20" style="width:calc(100% - 105px)" class="textCenter">
											<Input placeholder="请填写跳转问题编号" v-model="item1.nextQuestionId"></Input>
											</Col>
										</Row>
										<Row class="padleft40 mb5" v-if="item1.switchId==-1">
											<Col span="4" style="width:105px" class="lineheight32">无匹配超次数跳转:</Col>
											<Col span="18" style="width:calc(100% - 105px)" class="textCenter">
											<Input placeholder="请填写无匹配超次数跳转" v-model="item1.outRptSwitchID"></Input>
											</Col>
										</Row>
									</Row>
								</li>
							</ul>
						</Panel>
					</Collapse>
					</Col>
					<Col span="4" @click.native="deleteCol(index)" style="background:#f7f7f7">
					<Icon type="close-circled" size="22" color="#999;" style="line-height: 38px; float:right;margin-right:10px;"></Icon>
					</Col>
				</Row>
			</div>
			</Col>
		</Row>
		</Col>
	</Row>
</template>

<script>
import { API } from '@/services';
export default {

	data() {
		return {
			labelobj:[],
			templateId: '',//模板id
			/* 模板默认信息 */
			templateForm: {
				name: '',//模板名称
				diseaseId: [],//疾病类型
				silencetime: 0,//静默时间
				outrepeattimes: 0,//重复次数
				firsttaskid: 0,//起始问题
				person: '0',//合成声音
				addSubmoulds: ''//添加的通用库
			},
			listDisID:"",//第二部被选中的疾病的id
			tagCount: [],//通用库
			/* 验证规则 */
			ruleValidate: {
				name: [
					{ required: true, message: '模板名称不能为空', trigger: 'blur' }
				],
				silencetime: [
					{ required: true, message: '静默时间不能为空', trigger: 'blur' }
				],
			},
			diseaseListQues:[],//问题编辑情况下的远程搜索疾病列表
			diseaseList: [],//远程搜索疾病列表
			allQuestions: [],//所有问题
			switchArr: [],//语音list
			templateList: [],//模板语音开场白
			question1: [],//症状
			question2: [],//体征
			question3: [],//生活方式指导
			question4: [],//辅助检查
			question5: [],//用药反馈
			question6: [],//转诊情况
			question7: [],//通用
			stepThirdQuestion: [],//第三步配置问题
			selecetDiseId: '',//第二部选中的疾病类型的id
			collapse: '1',
			showRow: false,
			lastQuestionId: '',//最后一个问题的索引
			resDislist:[]
		}
	},
	created() {
		this.fetchData();
	},
	mounted() {
		if (this.templateId != 'new') {
			this.templateInfo();
			this.templateResolve();
		}
	},
	methods: {
		/*
		*获取模板id
		*/
		fetchData() {
			this.templateId = this.$route.params.id
		},
		/*
		*通过模板id获取模板表单信息
		*/
		templateInfo() {
			API.followTemplate.editList({
				id: this.templateId,
			}).then((res) => {
				/** 
				 * 基本信息赋值
				 */
				res.data.diseaseId=res.data.diseaseId.split(",");
				res.data.diseaseName=res.data.diseaseName.split(",");
				this.templateForm = {
					name: res.data.name,
					silencetime: res.data.silencetime,
					outrepeattimes: res.data.outrepeattimes,
					firsttaskid: res.data.firsttaskid,
					person: res.data.person,
					diseaseId:  res.data.diseaseId,
					addSubmoulds: ''//添加的通用库
				}
				this.diseaseList=[];
				this.labelobj=[];
				res.data.diseaseName.forEach((item,index)=>{
					this.diseaseList.push({
						label:item,
						value:res.data.diseaseId[index]
					})
					this.labelobj.push(item);
				})
				/** 
				 * 通用库赋值
				 */
				this.tagCount = res.data.submoulds.split(';');
				
			}).catch((error) => {
				console.log(error)
			})
		},
		/*
		*通过模板id获取模板处理信息
		*/
		templateResolve() {
			API.followTemplate.questionList({
				id: this.templateId,
			}).then((res) => {
				let maps = {
					questionId: '',
					questionIdXml: '',
					targetId: '',
					questionTempleQuestionJumps: []
				}
				res.data.forEach((item) => {
					this.stepThirdQuestion.push({
						title:item.questionName,
						id:item.questionId,
					})
					this.templateList.push({
						questionId: item.questionId,
						questionIdXml: item.questionIdXml,
						targetId: item.targetId,
						questionName: item.questionName,
						questionTempleQuestionJumps: item.questionTempleQuestionJumps
					})
				})
			}).catch((error) => {
				console.log(error)
			})
		},
		/*
		*监听radio男声女声
		*/
		radioChange(value) {
			this.person = value
		},
		/*
		* 通用库添加标签
		*/
		addTag() {
			let flag = 0;
			this.tagCount.forEach((item) => {
				if (this.templateForm.addSubmoulds == item || this.templateForm.addSubmoulds == '') {
					flag++;
					this.$Message.warning('您添加的为空或者重复添加');
				}
			})
			if (flag > 0) {
				this.templateForm.addSubmoulds = ''
				return false;
			}
			let strRegex = "(.xml)$"; //用于验证图片扩展名的正则表达式
			let re = new RegExp(strRegex);
			if (re.test(this.templateForm.addSubmoulds)) {
				/** 
				 * 验证通过
				 */
				this.tagCount.push(this.templateForm.addSubmoulds)
				this.templateForm.addSubmoulds = '';
			} else {
				this.$Message.warning("请添加以.xml结尾的文件")
			}
		},
		/*
		*删除标签
		*/
		tagClose(event, name) {
			const index = this.tagCount.indexOf(name);
			this.tagCount.splice(index, 1);
		},
		/** 
		 * 自动完成
		 */
		remoteMethod(query){
				if (query == '') {
					return false;
				}
				this.diseaseList=[];
			API.followProblems.disease({
				'zjm': query
			}).then((res) => {
					let parr = [];
					(res.data).forEach((item) => {
						parr.push({
							value: item.id,
							label: item.value
						})
					})
					this.diseaseList = parr
			}).catch((error) => {
				console.log(error)
			})
		},
		/*
		*疾病类型--远程搜索
		*/
		remoteMethod2(query) {
			if (query.trim() == '') {
				this.allQuestions.length = 0;
				this.question1.length = 0;
				this.question2.length = 0;
				this.question3.length = 0;
				this.question4.length = 0;
				this.question5.length = 0;
				this.question6.length = 0;
				this.question7.length = 0;
				return false;
			}
			this.listDisID = '';
			this.diseaseListQues=[];
			API.followProblems.disease({
				'zjm': query
			}).then((res) => {
					let parr = [];
					(res.data).forEach((item) => {
						parr.push({
							value: item.id,
							label: item.value
						})
					})
					this.diseaseListQues = parr;
			}).catch((error) => {
				console.log(error)
			})
		},
		/*
	 *获取选中的疾病类型id，根据疾病类型获取所有问题
	 */
		selectChange(value) {
			if (value != '') {
				this.selecetDiseId = value;
				API.followProblems.list({
					'pager': 1,
					'limit': '1000',
					'title': '',
					'diseaseId': value
				}).then((res) => {
					if (res.code == 0) {
						// console.log(res)
						this.allQuestions = res.data
					} else {
						console.log(res.code)
					}
				}).catch((error) => {
					console.log(error)
				})
			} else {
				console.log('value是空')
				this.allQuestions.length = 0
				this.question1.length = 0
				this.question2.length = 0
				this.question3.length = 0
				this.question4.length = 0
				this.question5.length = 0
				this.question6.length = 0
				this.question7.length = 0
			}

		},
		/*
		*双击添加事件
		*/
		addQuestion(item) {
			this.stepThirdQuestion.push(item)
			//console.log(this.stepThirdQuestion)
		},
		/*
		*第三步点击问题开始编辑
		*/
		addThirdQuestion(item) {
			/** 
			 * 获取问题列表编号
			 */
			let questionIdXml = 1000;
			questionIdXml = questionIdXml + this.templateList.length;
			/** 
			 * 根据问题id获取问题列表
			 */
			API.voiceSetting.question({
				"questionId": item.id
			}).then((res) => {
				let saveSwitch = res.data;//临时数据
				/** 
				 * 临时数据初始化三种问题
				 */
				this.switchArr.push({
					switchId:-1
				},{
					switchId:-2
				},{
					switchId:-3
				});
				/** 
				 * 遍历生成新的问题模板
				 */
				saveSwitch.forEach((item) => {
					this.switchArr.push({
							switchId: item.switchId,
							switchRegexText: item.switchRegexText,
							keyname: item.keyname,
							outRptSwitchID: item.outRptSwitchID,
							keyvalue: item.keyvalue
				  	}
					)
				})
				/* this.switchArr.forEach((item, index) => {
					item.switchId = index - 3
					item.switchId >= 0 ? item.switchId = item.switchId + 1 : item.switchId //除去switchId = 0
				}) */
				let maps = {
					questionId: item.id,
					questionIdXml: questionIdXml,
					questionName: item.title,
					targetId: item.targetId,
					questionTempleQuestionJumps: JSON.parse(JSON.stringify(this.switchArr))
				}
				/** 
				 * 数据格式转化
				 */
				this.templateList.push(maps);
				this.switchArr=[];
			}).catch((error) => {

			})
		},
		/*
		* tabs点击操作
		*/
		tabsClick(name) {
			if (name == 0) {
				name = ''
			}
			console.log(this.selecetDiseId)
			API.followProblems.list({
				pager: 1,
				limit: '1000',
				otype: name,
				diseaseId: this.selecetDiseId
			}).then((res) => {
				if (res.code == 0) {

					if (name == '01') {
						this.question1 = res.data
					}
					if (name == '02') {
						this.question2 = res.data
					}
					if (name == '03') {
						this.question3 = res.data
					}
					if (name == '04') {
						this.question4 = res.data
					}
					if (name == '05') {
						this.question5 = res.data
					}
					if (name == '06') {
						this.question6 = res.data
					}
					if (name == '07') {
						this.question7 = res.data
					}
				} else {
					console.log(res.message)
				}
			}).catch((error) => {
				console.log(error)
			})
		},
		/*
		*增加模板配置
		*/
		addTemplate() {
			let ids;
			if (this.templateId == 'new') {
				ids = '';
			} else {
				ids = this.templateId;
			}

			API.followTemplate.addList({
				"id": ids, //不传表示新增 
				"diseaseId": this.templateForm.diseaseId.join(","),//疾病id      
				"name": this.templateForm.name, //模板名称      
				"silencetime": this.templateForm.silencetime,//静默时间      
				"outrepeattimes": this.templateForm.outrepeattimes,//重复次数      
				"person": this.templateForm.person,    //女声传0 男声传1      
				"status": 0, //0 正常 1 停用      
				"submoulds": (JSON.parse(JSON.stringify(this.tagCount))).join(';'), //通用库        
				"firsttaskid": this.templateForm.firsttaskid,//起始问题编号      
				"questionTempleQuestions": this.templateList
			}).then((res) => {
				this.$Message.success("创建成功");
				setTimeout(()=> {
					this.$router.push("/followSetting/followTemplate");
				}, 1500);
			}).catch((error) => {

			})
		},
		/*
		*删除一条模板
		*/
		deleteCol(index) {
			this.templateList.splice(index, 1);
			let code=1000;
			for (let item of this.templateList) {
					item.questionIdXml=code;
					code++;
			}
		}
	},
}
</script>


<style lang="less">
.main .single-page-con .single-page {
	height: 100%;
}

.way {
	/* background: #fff; */
}

.way {
	padding: 0 !important;
	height: 100%;
	>.ivu-col {
		height: 100%;
		&:first-of-type {
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			>.ivu-card {
				&:last-of-type {
					flex: 1;
				}
			}
		}
		&:last-of-type {
			.ivu-card {
				height: 100%;
				.ivu-card-body {
					height: calc(~'100% - 51px');
					overflow-y: auto;
					box-sizing: border-box;
				}
			}
		}
	}
	&_main {}
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
		&_commonTemTitle {
			font-size: 15px;
			color: #2d8cf0;
			/* margin-bottom: 10px; */
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
			.ivu-form-item {
				margin-bottom: 20px;
			}
		}
		&_questSize {
			height: 30px;
			width: 30px;
			border-radius: 50%;
			background: #2d8cf0;
			line-height: 30px;
			text-align: center;
			color: #fff;
			font-size: 10px;
			display: block;
			margin: 0 auto;
			margin-top: 4px;
		}
		&_timeSection {
			text-align: center;
			border-radius: 5px;
			display: block;
			background-color: #fff;
			margin-right: 10px;
			height: 25px;
			line-height: 25px;
			margin-top: 5px;
			position: relative;
		}
		&_closeTime {
			position: absolute;
			top: -5px;
			right: -5px;
			font-size: 14px;
			color: #2d8cf0;
			cursor: pointer;
		}
		&_temIndex {
			height: 30px;
			width: 30px;
			border-radius: 50%;
			border: 2px solid #2d8cf0;
			text-align: center;
			line-height: 26px;
			color: #666;
		}
		&_innerBox {
			.ivu-form-item {
				margin-bottom: 10px;
			}
		}
		&_questTitle {
			border: 1px solid #f1f1f1;
			border-radius: 5px;
			background-color: #f1f1f1;
			.ivu-form-item-label {
				color: #2d8cf0;
				font-size: 13px;
				padding-top: 8px;
				width: 50px !important;
			}
			.ivu-form-item-content {
				color: #2d8cf0;
				font-size: 13px;
				margin-left: 50px !important;
			}
			color: #2d8cf0;
			font-size: 13px;
			margin-bottom: 10px;
		}
		&_nowarp {
			/* display: inline-block; */
			width: 90%;
		}
		&_saveButton {
			margin: 10px auto;
			display: block;
			margin-top: 30px;
		}
		&_timePicker {
			display: block;
			margin: 0 auto;
		}
		&_btnCollect{
			text-align: center;
		}
		&_planSingle {
			margin-bottom: 10px;
			border: 1px solid #dedede;
			padding: 10px;
			padding-right: 0;
			box-sizing: border-box;
			border-radius: 5px;
			background-color: #f5f5f5;
			.wayIndex {
				margin-bottom: 5px;
			}
		}
	}
}
</style>

<template>
	<Row class="way" :gutter="10">
		<!-- 随访方案信息 -->
		<Col span="10">
		<Card>
			<p slot="title">
				<Icon type="android-archive"></Icon>
				随访方案基本信息
			</p>
			<Form ref="wayForms" :model="baseData" :label-width="80" :rules="validate.followAction" class="way_main_wayForm">
				<FormItem label="方案名称" prop="name">
					<Input v-model="baseData.name" placeholder="请输入方案名称"></Input>
				</FormItem>
				<FormItem label="科室类别" prop="departmentId">
					<Select v-model="baseData.departmentId" placeholder="情选择科室类别">
						<Option v-for="item in departmentList" :value="item.id" :key="item.id">{{item.name}}</Option>
					</Select>
				</FormItem>
				<FormItem label="方案类型" prop="activeType">
					<RadioGroup v-model="baseData.activeType">
						<Radio label="0">随访</Radio>
						<Radio label="1">通知</Radio>
					</RadioGroup>
				</FormItem>
				<FormItem label="疾病类型" prop="diseaseId">
					<Select :label="labelobj" v-model="baseData.diseaseId" not-found-text="" multiple filterable remote :remote-method="autoSearch_base" :label-in-value="true" placeholder="搜索疾病类型">
						<Option v-for="item in diseaseList" :value="item.value" :key="item.value">{{item.label}}</Option>
					</Select>
				</FormItem>
			</Form>
		</Card>
		<Card style="margin-top:10px">
			<p slot="title">
				<Icon type="social-buffer"></Icon>
				选择随访模板
			</p>
			<Form :label-width="80" class="way_main_wayForm">
				<FormItem label="疾病类型">
					<Select v-model="selectDisTemp" not-found-text="" multiple filterable remote :remote-method="autoSearch_tem" @on-change="selectChange" :label-in-value="true" placeholder="搜索疾病类型">
						<Option v-for="item in diseaseList_tem" :value="item.value" :key="item.value">{{item.label}}</Option>
					</Select>
				</FormItem>
			</Form>
			<Table border height="400" :columns="tableConfig" :data="tableList"></Table>
		</Card>
		</Col>
		<!-- 配置随访方案 -->
		<Col span="14" >
		<Card style="height:863px">
			<p slot="title" style="position:relative;overflow:auto">
				<Icon type="android-list"></Icon>
				配置随访方案
				<Button size="small" @click="seeModal=true" type="primary" style="position:absolute;top:0;right:0;padding:0 7px">预览方案</Button>
			</p>
			<ul class="way_main_planList">
				<li class="way_main_planSingle" v-for="(item,index) in showList" :key="item.id">
					<!-- 模板名称&&随访周期 -->
					<Row>
						<Col span="2" class="lineheight32">
						<h3 class="way_main_temIndex">{{index+1}}</h3>
						</Col>
						<Col span="4" style="max-width:70px" class="lineheight32 way_main_commonTemTitle">
						<strong>模板名称:</strong>
						</Col>
						<Col span="14" class="lineheight32 way_main_commonTemTitle">
						<strong>{{item.name}}</strong>
						</Col>
						<Col span="4" class="lineheight32 ">
						<Button size="small" v-show="followId!='new'" style="float:right" type="info" @click="updateTemp(item,index)">更新</Button>
						</Col>
						<Col span="24" style="margin-top:10px" class="lineheight32 ">
						<Row>
							<Col span="4" style="max-width:65px" offset="1" class="lineheight32 ">
							<strong>随访周期:</strong>
							</Col>
							<Col span="20" class="lineheight32">
							<Row>
								<Col span="3">
								<span>随访次数:</span>
								</Col>
								<Col span="21">
								<InputNumber size="small" :max="100" :min="1" v-model="item.questionTemples.questionTempleFrequency.number"></InputNumber>次,
								<template v-if="index==0">
									第
									<InputNumber size="small" :min="0" v-model="item.questionTemples.questionTempleFrequency.firstday"></InputNumber>
									天第一次随访,
								</template>
								每隔
								<InputNumber size="small" :max="100" :min="1" v-model="item.questionTemples.questionTempleFrequency.intervalDays"></InputNumber> 天，随访一次。
								</Col>
							</Row>
							</Col>
						</Row>
						</Col>
					</Row>
					<!-- 随访区间 -->
					<Row style="margin:10px 0;">
						<Col style="max-width:65px" span="4" class="lineheight32" offset="1">
						<strong>随访区间:</strong>
						</Col>
						<Col span="20" class="lineheight32">
						<Row>
							<Col span="3">
							<span>时间段:</span>
							</Col>
							<template v-for="ite,i in item.questionTemples.questionTempleTimeRanges">
								<Col span="8" class="way_main_timeSection">
								<span>{{ite.beginTime}}</span>
								<span>-</span>
								<span>{{ite.endTime}}</span>
								<span @click="deletTime(item.questionTemples.questionTempleTimeRanges,i)">
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
						<Col style="max-width:65px" span="4" offset="1">
						<strong style="margin-top:5px;display:block">语音配置:</strong>
						</Col>
						<Col span="20">
						<!-- title和只能语音单独处理 -->
						<Row class="wayIndex" v-for="ite in item.questionTemples.questionSchemeWavs" :key="ite.id">
							<Col span="3">
							<span class="way_main_questSize">
								{{ite.questionIdXml}}
							</span>
							</Col>
							<Col span="20">
							<Collapse v-model="ite.questionId">
								<Panel name="1">
									<span class="way_main_nowarp">问题:{{ite.questionName}}</span>
									<Icon type="chevron-right" size="14" color="#999" style="line-height: 35px; float:right; margin-right:10px"></Icon>
									<div slot="content" class="way_main_innerBox">
										<Form :label-width="110" v-for="it,index in ite.questionTempleQuestionJumps" :key="index" v-if="it.switchId==''">
											<FormItem label="问题AI语音">
												<Input v-model="it.switchWav" placeholder="请输入问题ai语音"></Input>
											</FormItem>
										</Form>
										<Form :model="it" :rules="validate.followAction" :label-width="110" v-for="it,index in ite.questionTempleQuestionJumps" :key="index" v-if="it.switchId!=''">
											<FormItem class="way_main_questTitle" label="处理">
												<span>{{it.switchId==-1?"无匹配":it.switchId==-2?"无声音":it.switchId==-3?"通用处理":it.switchId==""?"人工ai":it.switchId}}</span>
											</FormItem>
											<FormItem v-if="it.switchId!='-1'&&it.switchId!='-2'&&it.switchId!='-3'&&it.switchId!=''" label="话术名称">
												<span>{{it.switchText}}</span>
											</FormItem>
											<FormItem v-if="it.switchId!=-1&&it.switchId!=-2&&it.switchId!=-3" label="判别规则">
												<span>{{it.switchRegexText}}</span>
											</FormItem>
											<FormItem v-if="it.switchId!=-1&&it.switchId!=-2&&it.switchId!=-3" label="指标值">
												<span>{{it.keyname}} ：{{it.keyvalue}}</span>
											</FormItem>
											<FormItem v-if="it.switchId==-2" label="超时语音">
												<Input v-model="it.silenceWav" placeholder="请输入超时语音地址"></Input>
											</FormItem>
											<FormItem label="AI语音">
												<Input v-model="it.switchWav" placeholder="请输入ai语音地址"></Input>
											</FormItem>
											<FormItem label="跳转问题编号">
												<span>{{it.nextQuestionId}}</span>
											</FormItem>
											<FormItem v-if="it.switchId==-1" label="无匹配超次数跳转">
												<Input v-model="it.outRptSwitchID" placeholder="请输入无匹配的跳转"></Input>
												<!-- <span>{{it.outRptSwitchId}}</span> -->
											</FormItem>
										</Form>
									</div>
								</Panel>
							</Collapse>
							</Col>
						</Row>
						</Col>
					</Row>
				</li>
			</ul>
			<div class="way_main_btnCollect">
				<Button v-show="temList.length>0"  type="primary" @click="saveChange">保存</Button>
				<Button v-show="temList.length>0" style="margin-left:30px" type="info" @click="saveChange(1)">另存为新方案</Button>
			</div>
		</Card>
		</Col>

		<Modal v-model="seeModal" title="预览计划">
			<DatePicker type="datetime" @on-change="dateChange" format="yyyy-MM-dd HH:mm"  placeholder="请选择随访发起时间" style="width: 200px"></DatePicker>
			<Button style="margin-left:20px" type="primary" @click="submitCeshi">预览方案</Button>
			<Table style="margin-top:15px" height="400" border :columns="timeConfig" :data="timeData" v-if="followId!='new'"></Table>
			<div slot="footer">
			</div>
		</Modal>

		<Modal v-model="timemodal" title="新增随访时间段">
			<TimePicker @on-change="timeChange" class="way_main_timePicker" format="HH:mm:ss" type="timerange" placement="bottom-end" placeholder="请选择随访时间段" style="width: 168px"></TimePicker>
			<div slot="footer" class="sys-sysset_main_btnList">
				<Button @click="timerangeSave" type="primary">确认</Button>
			</div>
		</Modal>
	</Row>
</template>

<script>
import { API } from '@/services';
export default {
	data() {
		return {
			/** 
			 * 基础数据，
			 */
			baseData: {
				id: "",   		//id不传表示新增
				name: "",  		//方案名称
				departmentId: "",//科室类型id
				diseaseId: [],    //疾病类型id,多个之间用英文逗号分开
				activeType: 0,    //方案类型：0代表随访，1代表通知
				status: 0,        //状态：0，启用；1，禁用
				visitStartTime:""
			},
			labelobj: [],//疾病多选初始化名称
			departmentList: [],//科室列表
			diseaseList: [],//疾病列表
			/** 
			 * 最终需要提交数据的列表部分
			 */
			questionTemples: [],
			/** 
			 * 第二部分，模板筛选部分
			 */
			diseaseList_tem: [],//疾病列表(模板筛选)
			selectDisTemp: [],//被选中的疾病id
			tableList: [],//表格数据
			//表格配置
			tableConfig: [
				{
					title: '模板名称',
					key: 'name',
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

								on: {
									click: () => {
										this.addTemplate(params.row)
									}
								}
							}, '添加到方案编辑'),

						]);
					}
				}
			],
			/**  */
			temList: [],//模板列表
			/** 
			 * 复制出来的数据，用于辨识
			 */
			copyList: [],
			copyIndex: [],//已选模板id

			diseaseLength: 0,
			//最终需要提交的数据
			formData: {},
			followId: '',//模板id
			//最终提交数据数据头部

			creatTime: [],//生成的时间
			clickTime: {},//被选中的对象
			timemodal: false,//时间切换显示
			editList: [],//被编辑的数据
			seeModal: false,//预览显示
			timeConfig: [{
				title: '计划序号',
				key: 'index',
				align: 'center',
				render: (h, params) => {
					return h('div', [
						h('strong', '第' + Number(params.index + 1) + '次')
					]);
				}
			},
			{
				title: '模板名称',
				key: 'schemeName',
				align: 'center'
			},
			{
				title: '随访时间',
				key: 'dateBegin',
				align: 'center'
			},],//时间配置
			timeData: [],//时间数据列表
			timeobj: {//随访时间
				date: "",
				time: "",
			},
		}
	},
	computed: {
		/** 
		 * 自动计算已经选中的方案
		 */
		showList() {
			for (const item of this.temList) {
				for (let ite of item.questionTemples.questionSchemeWavs) {
					if (!ite.questionTempleQuestionJumps[0]) {
						ite.questionTempleQuestionJumps.splice(0, 0, {
							switchId: "",
							switchWav: "",
						})
					} else {
						if (ite.questionTempleQuestionJumps[0].switchId != "") {
							ite.questionTempleQuestionJumps.splice(0, 0, {
								switchId: "",
								switchWav: "",
							})
						}
					}
				}
			}
			return this.temList;
		}
	},
	methods: {
		/** 
		 * 预览随访方案
		 */
		submitCeshi() {
			let param;
				if(this.baseData.visitStartTime=='') {
					param = {
						schemeId: this.followId,
						schemeName: this.baseData.name,
					}
				}else {
					param = {
						schemeId: this.followId,
						schemeName: this.baseData.name,
						/* visitStartTime: this.timeobj.date */
					}
				}
				API.FollowBussiness.patCeshi(param).then((res) => {
					this.timeData=res.data;
				}).catch((err) => {
					console.log(err)
				});
			// }
		},
		/** 
		 * 日期改变
		 */
		dateChange(date) {
			this.timeobj.date = date;
		},
		/** 
		 * 删除时间段
		 */
		deletTime(obj, index) {
			if (obj.length == 1) {
				this.$Message.warning("至少保留一个随访时间段");
				return false;
			}
			this.$Modal.confirm({
				title: '删除时间段',
				content: '确定删除该时间段？',
				onOk: () => {
					obj.splice(index, 1);
					this.$Message.success("删除成功");
					this.clickTime = obj;
					this.timemodal = true;
					this.timemodal = false;
				}
			});
		},
		/** 
		 * 新增时间段
		 */
		addTime(obj) {
			this.clickTime = obj;
			this.timemodal = true;
		},
		/** 
		 * 保存新增的时间段
		 */
		timerangeSave() {
			this.clickTime.questionTemples.questionTempleTimeRanges.push({
				templeId: this.clickTime.id,
				type: 0,
				beginTime: this.creatTime[0],
				endTime: this.creatTime[1]
			});
			this.creatTime = [];
			this.timemodal = false;
		},
		/** 
		 * 时间变化
		 */
		timeChange(time) {
			this.creatTime = time;
		},
		/** 
		 * 更新模板
		 */
		updateTemp(item, index) {
			API.followTemplate.questionList({
				id: item.id,
			}).then((res) => {
				this.temList[index].questionTemples.questionSchemeWavs = this.differData(res.data, this.temList[index].questionTemples.questionSchemeWavs)
				let obj = JSON.parse(JSON.stringify(this.temList[index]));
				this.temList.splice(index, 1, obj);
			}).catch((error) => {
			})
		},
		/** 
		 * 数据更新
		 */
		differData(newdata, old) {
			for (let item of newdata) {
				for (let ite of old) {
					if (item.questionId == ite.questionId) {
						/** 
						 * 循环之前初始默认节点
						 */
						item.questionTempleQuestionJumps.splice(0, 0, {
							switchId: "",
							switchWav: "",
						});
						for (let it of item.questionTempleQuestionJumps) {
							for (let i of ite.questionTempleQuestionJumps) {
								if (it.switchId == i.switchId) {
									if (i.outRptSwitchID) {
										it.outRptSwitchID = i.outRptSwitchID;
									}
									if (i.silenceWav) {
										it.silenceWav = i.silenceWav;
									}
									if (i.switchWav) {
										it.switchWav = i.switchWav;
									}
								}
							}
						}
					}
				}
			}
			return newdata;
		},
		/** 
		 * 最终的数据保存操作
		 */
		saveChange(type=0) {
			let flag = 0;
			this.$refs.wayForms.validate((valid) => {
				if (valid) {

				} else {
					this.$Message.error('补全信息!');
					flag++;
				}
			});
			if (flag > 0) {
				return false;
			}
			//深拷贝数据
			let sendData = JSON.parse(JSON.stringify(this.baseData));
			//格式化疾病id
			sendData.diseaseId = sendData.diseaseId.join(",");
			/** 
			 * 模板列表序列化
			 */
			sendData.questionTemples = [];
			for (let item of this.showList) {
				let copyItem = JSON.parse(JSON.stringify(item.questionTemples));
				copyItem.questionSchemeWavs = [];
				for (let ite of item.questionTemples.questionSchemeWavs) {
					let newId = ite.questionId;
					if (newId instanceof Array) {
						newId = newId[0];
					}
					for (let it of ite.questionTempleQuestionJumps) {
						it.questionIdXml = JSON.parse(JSON.stringify(ite.questionIdXml));
						it.questionId = newId;
						it.templeId = ite.templeId;
						it.questionName = ite.questionName
						copyItem.questionSchemeWavs.push(JSON.parse(JSON.stringify(it)));
					}
				}
				sendData.questionTemples.push(copyItem);
			}
			/**
			 * 另存为新方案
			 */
			if(type==1){
				delete sendData.id;
			}
			API.followWay.addList(sendData).then((res) => {
				this.$Message.success("保存成功");
				setTimeout(() => {
					this.$router.push("/followSetting/followWay");
				}, 1500);
			}).catch((error) => {
			})
		},

		/*
		*通过方案id获取方案信息
		*/
		templateInfo() {
			API.followWay.editList({
				id: this.followId,
			}).then((res) => {
				res.data.diseaseId = res.data.diseaseId.split(',');
				res.data.diseaseName = res.data.diseaseName.split(',');
				let idList = res.data.diseaseId;
				let nameList = res.data.diseaseName;
				for (let index = 0; index < idList.length; index++) {
					this.diseaseList.push({
						label: nameList[index],
						value: idList[index]
					});
					this.labelobj.push(nameList[index]);
				}
				/** 
				 * 基础数据赋值
				 */
				this.baseData = {
					id: this.followId,
					name: res.data.name,//方案名称
					diseaseId: res.data.diseaseId,//疾病类型id
					departmentId: res.data.departmentId, //科室类型id
					activeType: res.data.activeType,//方案类型：0代表随访，1代表通知
					status: res.data.status,//状态：0，启用；1，禁用
				}
			}).catch((error) => {
				console.log(error)
			})
		},
		/** 
		 * 方案编辑模板重组
		 */
		wavForm() {
			/** 
			 * 格式化获取到的模板列表
			 */
			for (const item of this.editList) {
				let arr = [];
				/** 
				 * 循环问题列表
				 */
				for (const ite of item.questionSchemeWavs) {
					if (arr.length == 0) {
						arr.push({
							questionId: ite.questionId,
							questionIdXml: ite.questionIdXml,
							questionName: ite.questionName,
							templeId: ite.templeId,
							questionTempleQuestionJumps: [ite],
						})
					} else {
						let flag = 0;
						for (const it of arr) {
							if (it.questionId == ite.questionId) {
								it.questionTempleQuestionJumps.push(ite)
								flag++;
							}
						}
						if (flag == 0) {
							arr.push({
								questionId: ite.questionId,
								questionIdXml: ite.questionIdXml,
								questionName: ite.questionName,
								templeId: ite.templeId,
								questionTempleQuestionJumps: [ite],
							})
						}
					}
				}
				item.questionSchemeWavs = arr;
				/** 
				 * 格式重组
				 */
				item.questionTemples = {
					questionSchemeWavs: item.questionSchemeWavs,
					questionTempleFrequency: item.questionTempleFrequency,
					questionTempleTimeRanges: item.questionTempleTimeRanges
				}
				/** 
				 * 删除多余的属性
				 */
				delete item.questionSchemeWavs;
				delete item.questionTempleFrequency;
				delete item.questionTempleTimeRanges;

			}
			this.temList = this.editList;
		},
		/** 
		 * 根据方案id获取语音等信息
		 */
		getvoiceList() {
			API.followWay.voiceList({
				id: this.followId,
			}).then((res) => {
				/** 
				 * 获取最新的数据列表
				 */
				this.editList = res.data;
				this.wavForm();
				this.templateInfo();
			}).catch((error) => {
			})
		},
		/*
		 *通过模板id获取模板问题列表
		 */
		temQuestion(item) {
			API.followTemplate.questionList({
				id: item.id,
			}).then((res) => {
				item.questionTemples.questionSchemeWavs = res.data;
				this.temList.push(item);
			}).catch((error) => {
			})
		},
		/** 
		 * 编辑过程中的初始化数据编辑
		 */
		editFormData(data, all) {
			for (let item of data) {
				item.questionTempleQuestionJumps = [];
				for (let ite of all.questionSchemeWavs) {
					if (item.questionId == ite.questionId) {
						item.questionTempleQuestionJumps.push(ite);
					}
				}

			}
			return data;
		},
		/*
		*添加当前模板到方案
		*/
		addTemplate(item) {
			item = this.cerateItem(item);
			this.temQuestion(item);
		},
		/** 
		 * 创建列表基础数据
		 */
		cerateItem(data) {
			data.questionTemples = {
				questionTempleTimeRanges: [
					{
						templeId: data.id, // 模板id
						type: '0',          // 默认0
						beginTime: '07:00:00',  // 随访区间，时间段1
						endTime: '11:00:00'   // 随访区间，时间段2
					},
					{
						templeId: data.id,
						type: '0',
						beginTime: '14:00:00',
						endTime: '23:00:00'
					}
				],
				questionTempleFrequency: {
					templeId: data.id,   // 模板id
					number: 10,    // 随访次数
					firstday: 3,   // 出院后第几天，第一次随访
					intervalDays: 2  // 间隔多少天再次随访
				},
				questionSchemeWavs: []
			};
			return data;
		},

		/*
		* 疾病类型--智能匹配
		*/
		autoSearch_base(query) {
			if (query == "") {
				return false;
			}
			this.diseaseList = [];
			API.followProblems.disease({
				zjm: query
			}).then((res) => {
				for (const item of res.data) {
					this.diseaseList.push({
						label: item.name,
						value: item.id
					})
				}
			}).catch((error) => {
			})
		},
		/*
		* 疾病类型--智能匹配(模板搜索)
		*/
		autoSearch_tem(query) {
			if (query == "") {
				return false;
			}
			this.diseaseList_tem = [];
			API.followProblems.disease({
				zjm: query
			}).then((res) => {
				for (const item of res.data) {
					this.diseaseList_tem.push({
						label: item.name,
						value: item.id
					})
				}
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
			if (item.length > 0) {
				let id = item[item.length - 1].value;
				API.followTemplate.list({
					diseaseId: id,
					pager: 1, //当前页码
					limit: 999999, //每页条数
				}).then((res) => {
					/** 
					 * 数据筛选
					 */
					for (const item of res.data) {
						let flag = 0
						for (const ite of this.tableList) {
							if (ite.id == item.id) {
								flag++
							}
						}
						if (flag == 0) {
							this.tableList.push(item);
						}
					}
				}, err => {

				}).catch((error) => {

				})
			}
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

			})
		},

	},
	mounted() {
		/** 
		 * 方案id赋值
		 */
		this.followId = this.$route.params.id
		if (this.followId != "new") {
			this.getvoiceList();
		}
		//获取所有科室
		this.getDepartment();

	}
}
</script>


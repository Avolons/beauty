<template>
	<Row class="way">
		<Col span="24" class="line">
		<h2>随访方案信息:</h2>
		</Col>
		<Form ref="wayForm" :model="wayForm" :label-width="80">
			<FormItem label="方案名称" prop="name">
				<Input v-model="wayForm.name" placeholder="Enter your name"></Input>
			</FormItem>
			<FormItem label="疾病类型" prop="diseaseId">
				<Select v-model="wayForm.diseaseId" filterable remote not-found-text="" :remote-method="remoteMethod2" clearable>
					<Option v-for="(option, index) in options2" :value="option.value" :key="index">{{option.label}}</Option>
				</Select>
				<p>{{wayForm.diseaseId}}</p>
			</FormItem>
			<FormItem label="选择模板" prop="wayTem">
				<Input v-model="wayForm.wayTem" placeholder="Enter your name"></Input>
			</FormItem>
			<FormItem label="科室类别" prop="departmentId">
				<Input v-model="wayForm.departmentId" placeholder="Enter your name"></Input>
				<p>{{wayForm.departmentId}}</p>
			</FormItem>
			<FormItem label="方案类型" prop="person">
				<RadioGroup v-model="wayForm.person" @on-change="radioChange">
					<Radio label="0">随访</Radio>
					<Radio label="1">通知</Radio>
				</RadioGroup>
			</FormItem>
		</Form>
		<Col span="24" class="line">
		<h2>配置随访方案:</h2>
		</Col>
		<Row class="wayNumber">

			<Row class="wayIndex" v-for="item,index in getData.questionTemples" :key="index">
				<Col span="1">
				<h3>1</h3>
				</Col>
				<Col span="1">
				<strong>模板名称:</strong>
				</Col>
				<Col span="21">
				<strong>糖尿病一号模板</strong>
				</Col>
					<Row class="wayIndex">
				<Col span="1" offset="1">
				<strong>随访周期:</strong>
				</Col>
				<Col span="21">
				<p>随访次数:
					<InputNumber :max="10" :min="1"></InputNumber>第
					<InputNumber :max="10" :min="1"></InputNumber>天,第一次随访,每隔
					<InputNumber :max="10" :min="1"></InputNumber>天，随访一次。</p>
				</Col>
			</Row>
			<Row class="wayIndex">
				<!-- 随访区间 -->
				<Col span="1" offset="1">
				<strong>随访区间:</strong>
				</Col>
				<Col span="22">
				<ul>
					<li v-for="ite in item.questionTempleTimeRanges" :key="ite.templeId">
						<!-- <time-picker format="HH：mm" placeholder="Select time" style="width: 100px"></time-picker>
			          <span style="padding: 0 10px;">-</span>
			          <time-picker format="HH：mm" placeholder="Select time" style="width: 100px"></time-picker>
			          <Icon type="plus" style="padding-left:20px;"></Icon><Icon type="minus" style="padding-left:20px;"></Icon> -->
						<span>{{ite.beginTime}}</span> -
						<span>{{ite.endTime}}</span>

					</li>
				</ul>
				</Col>
			</Row>
			<!-- title和只能语音单独处理 -->
			<Row class="wayIndex" v-for="ite,index in item.questionSchemeWavs" :key="index" v-if="index>0">
				<Col span="1" offset="1">
				<strong>语音配置:</strong>
				</Col>
				<Col span="1">
				<strong>
					<Button type="primary">1001</Button>
				</strong>
				</Col>
				<Col span="21" class="border1">
				<Collapse v-model="collapse">
					<Panel name="1">
						问题
						<Icon type="close-circled" size="22" color="#f70000" style="line-height: 45px; float:right;"></Icon>
						<Form :label-width="100" slot="content" class="wayForm2">
							<FormItem label="处理">
								<span>{{ite.switchId==-1?"无匹配":ite.switchId==-2?"无声音":ite.switchId==-3?"通用处理":ite.switchId==""?"人工ai":"自定义处理"}}</span>
							</FormItem>
							<FormItem label="问题AI语音">
								<Upload action="//jsonplaceholder.typicode.com/posts/">
									<Button type="ghost" icon="ios-cloud-upload-outline">Upload files</Button>
								</Upload>
							</FormItem>
							<FormItem label="名称">
								<span>使患者家人</span>
							</FormItem>
							<FormItem label="判别规则">
								<span>我是判别规则</span>
							</FormItem>
							<FormItem label="指标值">
								<span>我是指标值</span>
							</FormItem>
							<FormItem label="AI语音">
								<Input placeholder="Enter something..."></Input>
							</FormItem>
							<FormItem label="跳转问题编号">
								<span>1002</span>
							</FormItem>
							<FormItem label="无匹配超次跳转">
								<span>2</span>
							</FormItem>
						</Form>
					</Panel>

				</Collapse>

				</Col>
			</Row>
			</Row>
		
		</Row>

	</Row>
</template>

<script>
import { API } from '@/services';
import { aa } from '@/views/followSetting/template/aa.js'
export default {
	data() {
		return {
			getData:aa,
			templateId: '',//模板id
			wayForm: {
				name: '',
				diseaseId: '',
				wayTem: '',
				departmentId: '',
				firsttaskid: '',
				activeType: '0',
			},
			options2: [],
			collapse: '1',
		}
	},
	created() {
		this.fetchData()
	},
	mounted() {
		this.templateInfo()
		//this.templateResolve()
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
		*通过模板id获取模板处理信息
		*/
		templateResolve() {
			API.followTemplate.questionList({
				id: this.templateId,
			}).then((res) => {

				if (res.code == 0) {
					// console.log(res.data)

					if (res.data.length > 0) {
						this.templateList1 = res.data
						console.log(this.templateList1)
					}
				} else {
					console.log(res.message)
				}
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
		*疾病类型--远程搜索
		*/
		remoteMethod2(query) {
			if (query == '') {
				this.allQuestions.length = 0
				this.question1.length = 0
				this.question2.length = 0
				this.question3.length = 0
				this.question4.length = 0
				this.question5.length = 0
				this.question6.length = 0
				this.question7.length = 0
			}
			API.followProblems.disease({
				'zjm': query
			}).then((res) => {
				// console.log(res)
				if (res.code == 0) {
					class Point {
						constructor(item) {
							this.value = item.value;
							this.label = item.label;
						}
					}
					let parr2 = []
					let more2 = res.data
					more2.forEach((item) => {
						parr2.push(new Point({
							value: item.id,
							label: item.value
						}))
					})

					this.options2 = parr2
					if (query !== '') {
						this.options2 = parr2
					} else {
						this.options2 = [];
						this.diseaseName = ''
					}
				} else {
					console.log(res)
				}
			}).catch((error) => {
				console.log(error)
			})
		},

	},
	watch: {
		'$route': 'fetchData'
	}

}
</script>

<style lang="less">
.way {
	background: #fff;
}

.line {
	padding: 5px 20px;
	border-bottom: 1px solid #b1b1b1;
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
}
</style>
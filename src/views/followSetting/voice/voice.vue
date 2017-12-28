<style lang="less">
@import "../../../styles/common.less";
.fontvoice {
	font-size: 14px;
	box-sizing: border-box;
	padding-left: 15px;
	line-height: 30px;
}

.textCenter {
	text-align: center;
}

.voice {
	background: #fff;
	border-radius: 5px;
	.sfproblem {}
	.voicepz {
		.voicetitle {
			margin: 20px 10px;
		}
		ul {
			width: 80%;
			margin-left: 10px;
		}
	}
}

.followVoice {
	box-sizing: border-box;
	padding: 10px;
	border-radius: 5px;
	padding-left: 25px;
	background-color: #fff;
	.itemli {
		height: 40px;
		line-height: 40px;
		position: relative;
	}
	li {
		border: 1px solid #e7e7e7;
		margin-bottom: 10px;
		padding-bottom: 15px;
	}
	&_main {
		&_title {
			float: left;
			margin-right: 10px;
			font-size: 15px;
			color: #2d8cf0;
		}
		&_commonTitle {
			font-size: 16px;
			line-height: 45px;
			position: relative;
		}
		&_config {
			max-width: 900px;
		}
		&_content {
			box-sizing: border-box;
			padding-right: 15px;
		}
		&_icon {
			position: absolute;
			right: 5px;
			top: 5px;
			color: rgb(242, 94, 67);
			cursor: pointer;
		}
	}
}
</style>
<template>
	<Row class="followVoice">
		<h3 class="followVoice_main_commonTitle">基本信息</h3>
		<Col span="24" class="sfzhibaio">
		<Row class="fontvoice">
			<span class="followVoice_main_title">随访问题:</span>
			<Col span="20">
			<span>{{questionName}}</span>
			</Col>
		</Row>
		</Col>
		<Col span="24" class="sfzhibaio">
		<Row class="fontvoice">
			<span class="followVoice_main_title">采集指标:</span>
			<Col span="20">
			<span>{{questionTargetName}}</span>
			</Col>
		</Row>
		</Col>
		<Col span="24" class="sfzhibaio">
		<Row class="fontvoice">
			<span class="followVoice_main_title">指标类型:</span>
			<Col span="20">
			<span>{{questionTargetStyle}}</span>
			</Col>
		</Row>
		</Col>
		<Col span="24" class="sfzhibaio">
		<Row class="fontvoice">
			<span class="followVoice_main_title">指标阀值:</span>
			<Col span="20">
			<span>{{questionTargetfz}}</span>
			</Col>
		</Row>
		</Col>
		<h3 class="followVoice_main_commonTitle">话术配置</h3>
		<Col span="24" class="voicepz">
		<ul class="followVoice_main_config">
			<!-- 话术列表 -->
			<li v-for="(item,index) in switchArr">
				<Row class="itemli" style="background:#f7f7f7">
					<Col span="4" class="textCenter">处理</Col>
					<Col span="12">
					</Input>
					<span>{{item.switchID==-1?"无匹配":item.switchID==-2?"无声音":item.switchID==-3?"通用处理":item.switchID}}</span>
					</Col>
					<Col span="2" offset="6" @click.native="removequestion(index)">
					<Icon class="followVoice_main_icon" type="close-circled" size="22"></Icon>
					</Col>
				</Row>
				<div class="followVoice_main_content">
					<Row class="itemli">
						<Col span="4" class="textCenter">话术名称</Col>
						<Col span="20">
						<Input v-model="item.switchText" placeholder="请输入话术名称"></Input>
						</Col>
					</Row>
					<Row class="itemli">
						<Col span="4" class="textCenter">判别规则</Col>
						<Col span="20">
						<Input v-model="item.switchRegexText" placeholder="请填写判别规则"></Input>
						</Col>
					</Row>
					<Row class="itemli" v-show="false">
						<Col span="4" class="textCenter">超时跳转</Col>
						<Col span="20">
						<Input v-model="item.outRptSwitchID" placeholder="请填写超时跳转问题编号"></Input>
						</Col>
					</Row>
					<Row class="itemli" v-show="false">
						<Col span="4" class="textCenter">指标名称</Col>
						<Col span="20">
						<span>
								{{item.keyname}}
						</span>
						
						</Col>
					</Row>
					<Row class="itemli">
						<Col span="4" class="textCenter">指标值</Col>
						<Col span="20">
						<Input v-model="item.keyvalue" placeholder="请填写指标值"></Input>
						</Col>
					</Row>
				</div>
			</li>
		</ul>
		</Col>
		<Col span="24">
		<Button type="primary" style="margin: 10px 20px;" @click="addVoice()">添加话术</Button>
		<Button style="margin: 10px 20px;" type="primary" @click="handleSubmit()">保存</Button>
		</Col>
	</Row>
</template>

<script>
import { API } from '@/services';
export default {
	data() {
		return {
			type: 1,//1为编辑
			questionId: '',//话术id(从路由获取)
			questionName: '',//随访问题，
			questionTargetName: '',//随访指标
			questionTargetStyle: '',//指标类型，
			questionTargetfz: '',//指标阀值字符串
			fzArray: [],//指标阀值数组
			switchArr: [],
			saveSwitch: [],
			switchInfo: '',
		}
	},
	created() {
		this.fetchData()
	},
	mounted() {
		this.questionInfo()
	},
	methods: {
		/*
		*根据问题id，获取switch信息
		*/
		questionInfo() {
			API.voiceSetting.question({
				"questionId": this.questionId
			}).then((res) => {
				if (res.data.length == 0) {
					this.type = 0;
				}
				res.data.forEach((item, index) => {
					item.switchID = index + 1
				})
				if (res.data.length) {
					this.switchArr = res.data
				}
			}).catch((error) => {
			})
			/*
			*根据问题id，获取指标id
			*/
			API.followProblems.editList({
				"id": this.questionId
			}).then((res) => {
				if (res.code == 0) {
					this.questionName = res.data.title
					/*
					*根据指标id，获取指标阀值等信息
					*/
					let getTargetIDVoice = res.data.targetId//指标id
					if (getTargetIDVoice) {
						API.follSetting.editList({
							id: getTargetIDVoice
						}).then((res) => {
							if (res.code == 0) {
								this.questionTargetName = res.data.name
								//获取指标类型，阀值
								if (res.data.type == 'digit') {
									this.questionTargetStyle = '数值'
								} else if (res.data.type == 'select') {
									this.questionTargetStyle = '选项'
								} else if (res.data.type == 'string') {
									this.questionTargetStyle = '文本'
								}
								//获取指标阀值
								this.questionTargetfz = res.data.optionValues
								this.fzArray = this.questionTargetfz.split(',')
								/*switch信息*/
								class Point {
									constructor(item) {
										this.switchID = item.switchID
										this.switchText = item.switchText
										this.switchRegexText = item.switchRegexText
										this.keyname = item.keyname
										this.outRptSwitchID = item.outRptSwitchID
										this.keyvalue = item.keyvalue
									}
								}
								if (this.switchArr.length == 0) {
									this.fzArray.forEach((item, index) => {
										this.switchArr.push(new Point({
											switchID: index + 1,
											// switchText : '',
											switchRegexText: '',
											keyname: '',
											outRptSwitchID: '',
											keyvalue: item
										}))
									})
									this.switchArr.forEach((item, index) => {
										item.keyname = this.questionTargetName
									})
								}

								console.log(this.switchArr)
							} else {
								console.log('指标id=' + res.code)
							}
						}).catch((error) => {
							//alert('error')
							console.log(error)
						})
					}
				}
			}).catch((error) => {

			})
		},
		/*
		*获取问题id
		*/
		fetchData() {
			this.questionId = this.$route.params.id
		},
		/*
		*添加话术
		*/
		addVoice() {
			this.switchArr.push({})
			this.switchArr.forEach((item, index) => {
				item.switchID = index + 1
			})
			console.log(this.switchArr)
		},
		/*
		*删除话术
		*/
		removequestion(index) {
			this.switchArr.splice(index, 1)
			let pp = []
			pp = this.switchArr.splice(index, this.switchArr.length)
			pp.forEach((item) => {
				item.switchID = item.switchID - 1
			})
			this.switchArr = this.switchArr.concat(pp)
			console.log(this.switchArr)
		},

		/*
		*获取点击的index
		*/
		questionClick(index) {
			console.log(index)
		},
		/*
		*保存话术
		*/
		handleSubmit() {
			let tBag = 0;
			/* 非空判断 */
			this.switchArr.forEach((item) => {
				/* 话术名称判断 */
				if (item.switchText == '') {
					tBag++
				}
			})
			if (tBag > 0) {
				this.$Message.warning("话术名称不能为空");
				return false;
			}

			/* 此处的操作必须先删除后添加 */
			let dataPromise = async () => {
				await API.voiceSetting.questionSave({
					"id": this.questionId,   //问题id
					"questionCallScripts": this.switchArr
				}).then((res) => {
					this.$Message.success('添加成功!');
					this.questionInfo();
					setTimeout(()=> {
						this.$router.push('/followSetting/followProblems');
					}, 1500);
					
				}).catch((error) => {

				});
			}
			dataPromise();
		},
	},
}
</script>


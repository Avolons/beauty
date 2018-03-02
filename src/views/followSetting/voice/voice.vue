<style lang="less">
@import "../../../styles/common.less";
.iview-admin-draggable-list {
	height: 100%;
}

.iview-admin-draggable-list li {
	padding: 9px;
	border: 1px solid #e7ebee;
	border-radius: 3px;
	margin-bottom: 5px;
	cursor: pointer;
	position: relative;
	transition: all .2s;
}

.iview-admin-draggable-list li:hover {
	color: #87b4ee;
	border-color: #87b4ee;
	transition: all .2s;
}

.iview-admin-draggable-delete {
	height: 100%;
	position: absolute;
	right: -8px;
	top: 0px;
	display: none;
}

.iview-admin-draggable-list li:hover .iview-admin-draggable-delete {
	display: block;
}

.placeholder-style {
	display: block !important;
	color: transparent;
	border-style: dashed !important;
}

.delte-item-animation {
	opacity: 0;
	transition: all .2s;
}

.iview-admin-draggable-list {
	overflow: auto
}

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
	border-radius: 5px;
	height: 100%;
	/* background-color: #fff; */
	.ivu-card-body {
		height: calc(~"100% - 51px");
		overflow-y: auto;
	}
	.itemli {
		height: 40px;
		line-height: 40px;
		position: relative;
	}
	&_main {
		&_title {
			float: left;
			margin-right: 10px;
			font-size: 15px;
			color: #2d8cf0;
		}
		&_single {
			border: 1px solid #e7e7e7;
			margin-bottom: 10px;
			padding-bottom: 15px;
			border-radius: 5px;
		}
		&_voiceList {}
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
			top: 7px;
			color: #666;
			cursor: pointer;
		}
	}
}
</style>
<template>
	<div class="followVoice">
		<Card>
			<p slot="title">
				<Icon type="android-list"></Icon>
				基本信息
			</p>
			<Row>
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
			</Row>
		</Card>
		<Card style="margin-top:10px;height:calc(100% - 215px);overflow-y:auto">
			<p slot="title">
				<Icon type="social-buffer"></Icon>
				话术配置
			</p>
			<Row class="followVoice_main_voiceList">
				<Col span="24" class="voicepz">
				<ul class="followVoice_main_config">
					<li v-for="item,index in switchArr" :key="index" class="followVoice_main_single">
						<Row class="itemli" style="background:#f7f7f7">
							<Col span="4" class="textCenter">处理</Col>
							<Col span="12">
							</Input>
							<span>{{index+1}}</span>
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
		</Card>
	</div>
</template>

<script>
// import draggable from 'vuedraggable'
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
	components: {
		// draggable,
	},
	created() {
		this.fetchData()
	},
	mounted() {
		this.questionInfo();
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
				this.questionName = res.data.title
				/*
				*根据指标id，获取指标阀值等信息
				*/
				let getTargetIDVoice = res.data.targetId.trim()//指标id
				if (getTargetIDVoice) {
					API.follSetting.editList({
						id: getTargetIDVoice
					}).then((res) => {
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

						this.questionTargetfz = res.data.optionValues;
						this.fzArray = this.questionTargetfz.split(',');
						console.log(this.fzArray);
						/*switch信息*/

						let questionList = [];

						for (const item of this.fzArray) {
							questionList.push({
								switchID: 0,
								switchText: '',
								switchRegexText: '',
								keyname: this.questionTargetName,
								outRptSwitchID: '',
								keyvalue: item
							})
						}

						if (this.switchArr.length == 0) {
							this.switchArr = questionList.concat(this.switchArr);
						} else {
							if (this.switchArr[0].keyname) {
								for (const item of questionList) {
									for (const ite of this.switchArr) {
										if (item.keyvalue = ite.keyvalue) {
											item.switchText = ite.switchText;
											item.switchRegexText = ite.switchRegexText;
											item.outRptSwitchID = ite.outRptSwitchID;
											break;
										}
									}
								}
								let flag = 0;
								for (const item of this.switchArr) {
									if (item.keyvalue) {
										flag++;
									}
								}
								this.switchArr.splice(0, flag);
								this.switchArr = questionList.concat(this.switchArr);
							}
						}

						this.switchArr.forEach((item, index) => {
							item.switchID = index + 1
						})

					}).catch((error) => {
					})
				} else {
					for (var index = 0; index < this.switchArr.length; index++) {
						if (this.switchArr[index].keyname) {
							this.switchArr.splice(index, 1);
							index--;
						}

					}
					this.switchArr.forEach((item, index) => {
						item.switchID = index + 1
					})
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
			this.switchArr.push({

			})
			this.switchArr.forEach((item, index) => {
				item.switchID = index + 1
			})
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
					setTimeout(() => {
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

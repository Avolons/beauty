<template>
	<Row class="voice">
		<Col span="24" class="sfproblem">
			<Row class="pad20 fontvoice">
				<Col span="4"> <span>随访问题:</span></Col>
				<Col span="20"><span>{{questionName}}</span></Col>
			</Row>
		</Col>
		<Col span="24" class="sfzhibaio">
			<Row class="pad20 fontvoice">
				<Col span="4"> <span>采集指标:</span></Col>
				<Col span="20"><span>{{questionTargetName}}</span></Col>
			</Row>
		</Col>
		<Col span="24" class="sfzhibaio">
			<Row class="pad20 fontvoice">
				<Col span="4"> <span>指标类型:</span></Col>
				<Col span="20"><span>{{questionTargetStyle}}</span></Col>
			</Row>
		</Col>
		<Col span="24" class="sfzhibaio">
			<Row class="pad20 fontvoice">
				<Col span="4"> <span>指标阀值:</span></Col>
				<Col span="20"><span>{{questionTargetfz}}</span></Col>
			</Row>
		</Col>
		<Col span="24" class="voicepz">
			<span class="fontvoice voicetitle">话术配置</span>
      <ul>
      	<li v-for="(item,index) in switchArr">
    			 <Row class="itemli" style="background:#f7f7f7">
    			 	<Col span="4" class="textCenter">switchID</Col>
    			 	<Col span="12"></Input>
							<span>{{item.switchID}}</span>
    			 </Col>
    			 	<Col span="2" offset="6" @click.native="removequestion(index)"><Icon type="close-circled" size="22" color="#f70000" style="line-height: 45px;"></Icon></Col>
    			 </Row> 
    			 <Row class="itemli">
    			 	<Col span="4" class="textCenter">名称</Col>
    			 	<Col span="20"><Input v-model="item.keyname" placeholder="large size"></Input></Col>
    			 </Row> 
    			 <Row class="itemli">
    			 	<Col span="4" class="textCenter">判别规则</Col>
    			 	<Col span="20"><Input v-model="item.switchRegexText" placeholder="large size"></Input></Col>
    			 </Row> 
    			 <Row class="itemli">
    			 	<Col span="4" class="textCenter">超时跳转</Col>
    			 	<Col span="20"><Input v-model="item.outRptSwitchID" placeholder="large size"></Input></Col>
    			 </Row> 
    			 <Row class="itemli">
    			 	<Col span="4" class="textCenter">指标值</Col>
    			 	<Col span="20"><Input v-model="item.keyvalue" placeholder="large size"></Input></Col>
    			 </Row>
      	</li>
      </ul>
		</Col>
		<Col span="24">
			<Button type="primary" style="margin: 10px 20px;" @click="addVoice()">添加话述</Button><Button  style="margin: 10px 20px;" type="primary" @click="handleSubmit()">保存</Button>
		</Col>
		
	</Row>
</template>

<script>
import {API} from '@/services';
	export default {
		data() {
			return {
				questionId: '',//话述id(从路由获取)
				questionName: '',//随访问题，
				questionTargetName: '',//随访指标
				questionTargetStyle: '',//指标类型，
				questionTargetfz: '',//指标阀值
        switchArr: [],
        saveSwitch: [],
			}
		},
		created(){
			this.fetchData()
		},
		mounted() {
			this.questionInfo()
		},
		methods: {
			/*
			*获取问题信息
			*/
			questionInfo() {
				API.voiceSetting.question({
          "questionId": this.questionId
        }).then((res) => {
          if(res.code == 0) {
            this.saveSwitch = res.data

            class Point {
						  constructor(item) {
						    this.switchID = item.switchID
						    this.switchRegexText = item.switchRegexText
						    this.keyname = item.keyname
						    this.outRptSwitchID = item.outRptSwitchID
						    this.keyvalue = item.keyvalue
						  }
						}
						this.saveSwitch.forEach((item) => {
            	this.switchArr.push(new Point({
            		switchID : item.switchID,
						    switchRegexText : item.switchRegexText,
						    keyname : item.keyname,
						    outRptSwitchID : item.outRptSwitchID,
						    keyvalue : item.keyvalue
            	}))
            })
            this.switchArr.push({})
            this.switchArr.push({})
            this.switchArr.push({})
            console.log( this.switchArr)
            this.switchArr.forEach((item, index) => {
							item.switchID = index -3
						})
						this.switchArr.forEach((item) => {
        	
        		if(item.switchID == -1) {
        			return item.switchID = '无匹配'
        		}
        		if(item1.switchID == -2) {
        			return item.switchID = '无声音'
        		}
        		if(item1.switchID == -3) {
        			return item.switchID = '通用处理'
        		}
        
          })
          }
        }).catch((error)=> {
        })
        //根据问题id获取指标id
        API.followProblems.editList({
          "id": this.questionId
        }).then((res) => {
          if(res.code == 0) {
          	 this.questionName = res.data.title
            let getTargetIDVoice = res.data.targetId
            /*************/
            API.follSetting.editList({
              id: getTargetIDVoice
            }).then((res) => {
              if(res.code == 0) {
              	//alert('刷新成功')
              	this.questionTargetName = res.data.name
              	//获取指标类型，阀值
              	if(res.data.type == 'digit') {
		               this.questionTargetStyle = '数值'
		            }else if(res.data.type == 'select') {
		              this.questionTargetStyle = '选项'
		            }else if(res.data.type == 'string') {
		              this.questionTargetStyle = '文本'
		            }
		            //获取指标阀值
		            this.questionTargetfz = res.data.optionValues
              }
            }).catch((error)=>{
            	alert(error.data)
            })
          }
        }).catch((error)=> {

        })

			},
			/*
			*获取问题id
			*/ 
			fetchData () {
	      this.questionId = this.$route.params.id
	    },
	    /*
			*添加话述
			*/
			addVoice() {
				this.switchArr.push({
				})
				this.switchArr.forEach((item, index) => {
					item.switchID = index-3
				})
				console.log(this.switchArr)
			},
			/*
			*删除话述
			*/
			removequestion(index) {
				this.switchArr.splice(index,1)
				this.switchArr.forEach((item, index) => {
					console.log('index='+index)
					console.log('item.switchID='+item.switchID)
					item.switchID = index-3
				})
			},
    
			/*
			*获取点击的index
			*/ 
			questionClick(index) {
				console.log(index)
			},
			/*
			*保存话述
			*/
			handleSubmit() {
				API.voiceSetting.questionDelete({
          "questionId": this.questionId,
        }).then((res) => {
          consoel.log(res)
        }).catch((error)=> {

        })
        API.voiceSetting.questionSave({
          "id": this.questionId,   //问题id
				  "questionCallScripts": this.switchArr
        }).then((res) => {
          if(res.code == 0) {
            console.log(res)
            this.$Message.success('添加成功!');
          }
        }).catch((error)=> {

        })
			},
		},
		watch:{
			'$route': 'fetchData'
		}
}
</script>

<style lang="less">
@import "../../../styles/common.less";
	.fontvoice {
		font-size: 16px;
		border-bottom: 1px solid #f6f6f6;
	}
	.textCenter {
		text-align: center;
	}
	.voice {
		width: 900px;
		background: #fff;
		.sfproblem {

		}
		.voicepz {
			.voicetitle {
				margin: 20px 10px;
			}
			ul {
				width: 80%;
				margin-left: 10px;
				li{
					border: 1px solid #e7e7e7;
					margin-bottom: 10px;
					.itemli {
						height: 40px;
						line-height: 40px;
					}
				}
			}
		}
	}
</style>
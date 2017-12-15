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
      	<li v-for="(item,index) in switchArr" @click="questionClick(index)">
    			 <Row class="itemli">
    			 	<Col span="4" class="textCenter">switchID</Col>
    			 	<Col span="12"><Input v-model="item.switchID" placeholder="large size"></Input></Col>
    			 	<Col span="2" offset="6"><Icon type="close-circled" size="22" color="#f70000" style="line-height: 45px;" @click="removequestion(index)"></Icon></Col>
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
import axios from 'axios'
	export default {
		data() {
			return {
				cfRadio: 'yes',
				AIpro: '',
				value: '',
				questionId: '',//话述id(从路由获取)
				questionName: '',//随访问题，
				questionTargetName: '',//随访指标
				questionTargetStyle: '',//指标类型，
				questionTargetfz: '',//指标阀值
        switchArr: [],
			}
		},
		created(){
			
			//this.fetchData()
		},
		mounted() {
			 
			//this.questionInfo()
		},
		methods: {
			/*
			*获取问题信息
			*/
			questionInfo() {
				API.followTemplate.question({
          "id": this.questionId
        }).then((res) => {
          if(res.code == 0) {
            console.log(res)
            this.questionName = res.data.title
            this.questionTargetName = res.data.targetName
            this.questionTargetStyle = res.data.targetName
            this.questionTargetfz = res.data.targetName
          }
        }).catch((error)=> {

        })
			},
			/*
			*获取指标选项，阀值
			*/
			targetInfo() {
				API.followProblems.editList({
          "id": this.questionId
        }).then((res) => {
          if(res.code == 0) {
            console.log(res)
            this.questionName = res.data.title
            this.questionTargetName = res.data.targetName
            this.questionTargetStyle = res.data.targetName
            this.questionTargetfz = res.data.targetName
          }
        }).catch((error)=> {

        })
			},
			/*
			*获取问题id
			*/ 
			fetchData () {
	      this.questionId = this.$route.params.id
	      console.log('questionId='+this.questionId)
	    },
	    /*
			*添加话述
			*/
			addVoice() {
				this.switchArr.push({
					"switchID": '',
					"keyname": '',
					"switchRegexText": '',
					"outRptSwitchID": '',
					"keyvalue": '',
				})
				console.log(this.switchArr)
			},
			/*
			*删除话述
			*/
			removequestion() {
				this.switchArr.splice()
				console.log(this.switchArr)
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
				console.log(this.switchArr)
				// API.followTemplate.questionDelete({
    //       "questionId": this.questionId,
    //     }).then((res) => {
    //       if(res.code == 0) {
    //         console.log(res)
            
    //       }
    //     }).catch((error)=> {

    //     })
    
        // API.followTemplate.questionSave({
        //   "id": JSON.stringify(this.questionId),
        //   "questionCallScripts": JSON.stringify(this.switchArr)
        // }).then((res) => {
        //   if(res.code == 0) {
        //     console.log(res)
            
        //   }
        // }).catch((error)=> {

        // })
        // axios.post('http://192.168.1.100:8080/visit/question/script/save',{
        // 	"id": JSON.stringify(this.questionId),
        // 	"questionCallScripts": JSON.stringify(this.switchArr)
        // }).then((res) => {
        //   if(res.code == 0) {
        //     console.log(res)
            
        //   }
        // }).catch((error)=> {

        // })
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
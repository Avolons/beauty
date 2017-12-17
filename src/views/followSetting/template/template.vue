<template>
	<Row class="template">
		<Col span="24" class="line"> <h2>随访方案信息:</h2></Col>
		<Form ref="templateForm" :model="templateForm" :label-width="80">
      <FormItem label="方案名称" prop="name">
        <Input v-model="templateForm.name" placeholder="Enter your name"></Input>
      </FormItem>
      <FormItem label="疾病类型" prop="jibName">
       <!--  <Input v-model="templateForm.jibName" placeholder="Enter your name"></Input> -->
	      <Select v-model="diseaseName" filterable remote not-found-text="" :remote-method="remoteMethod2" clearable>
	        <Option v-for="(option, index) in options2" :value="option.value" :key="index">{{option.label}}</Option>
	      </Select>
	    </FormItem>
      <FormItem label="静默时间" prop="silencetime">
        <Input v-model="templateForm.silencetime" placeholder="Enter your name"></Input>
      </FormItem>
      <FormItem label="重复次数" prop="outrepeattimes">
        <Input v-model="templateForm.outrepeattimes" placeholder="Enter your name"></Input>
      </FormItem>
      <FormItem label="起始问题" prop="firsttaskid">
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
      <FormItem label="通用库" prop="submoulds">
        
        <tag v-for="item in tagCount" color="blue" :key="item" :name="item" closable @on-close="tagClose">{{item}}</tag>
        
      </FormItem>
    </Form>
		<Col span="24" class="line"> <h2>配置随访问题:</h2></Col>
		
		<Col span="24" class="questionTem">
			<Row class="stepOne margintop20">
				<Col span="2">
					<Button type="success" long>第一步</Button>
				</Col>
				<Col span="2"><h3 style="line-height:32px;text-align:right;padding-right:20px;">疾病类型</h3></Col>
				<Col span="10">
					<Select v-model="diseaseName" filterable remote not-found-text="" :remote-method="remoteMethod2" clearable @on-change="selectChange">
            <Option v-for="(option, index) in options2" :value="option.value" :key="index">{{option.label}}</Option>
          </Select></Col>
				<Col span="10"></Col>
			</Row>
			<Row class="stepTwo margintop20">
				<Col span="2">
					<Button type="success" long>第二步</Button>
				</Col>
				<Col span="2"><h3 style="line-height:32px;text-align:right;padding-right:20px;">配置问题</h3></Col>
				<Col span="20"></Col>
			</Row>
			<Row class="targetpz margintop20" >
				<Col span="12" push="2">
					<Tabs value="name1" style="border: 1px solid #b1b1b1;padding-left:20px;height:200px;" @on-click="tabsClick">
		        <TabPane label="无" name="">
		        	<ul>
		        		<li v-for="item in this.allQuestions">
		        			<Poptip trigger="hover" title="" content="双击问题添加到第三步">
							      <Button type="text" v-on:dblclick.native="addQuestion(item)">{{item.title}}</Button>
							    </Poptip>
		        		</li>
		        	</ul>
		        </TabPane>
		        <TabPane label="症状" name="01">
		        	<ul>
		        		<li v-for="item in this.question1">
		        			<Poptip trigger="hover" title="" content="双击问题添加到第三步">
							      <Button type="text" v-on:dblclick.native="addQuestion(item)">{{item.title}}</Button>
							    </Poptip>
		        		</li>
		        	</ul>
		        </TabPane>
		        <TabPane label="体征" name="02">
							<ul>
		        		<li v-for="item in this.question2">
		        			<Poptip trigger="hover" title="" content="双击问题添加到第三步">
							      <Button type="text" v-on:dblclick.native="addQuestion(item)">{{item.title}}</Button>
							    </Poptip>
		        		</li>
		        	</ul>
		        </TabPane>
		        <TabPane label="生活方式指导" name="03">
		        	<ul>
		        		<li v-for="item in this.question3">
		        			<Poptip trigger="hover" title="" content="双击问题添加到第三步">
							      <Button type="text" v-on:dblclick.native="addQuestion(item)">{{item.title}}</Button>
							    </Poptip>
		        		</li>
		        	</ul>
		        </TabPane>
		        <TabPane label="辅助检查" name="04">
		        	<ul>
		        		<li v-for="item in this.question4">
		        			<Poptip trigger="hover" title="" content="双击问题添加到第三步">
							      <Button type="text" v-on:dblclick.native="addQuestion(item)">{{item.title}}</Button>
							    </Poptip>
		        		</li>
		        	</ul>
		        </TabPane>
		        <TabPane label="用药反馈" name="05">
							<ul>
		        		<li v-for="item in this.question5">
		        			<Poptip trigger="hover" title="" content="双击问题添加到第三步">
							      <Button type="text" v-on:dblclick.native="addQuestion(item)">{{item.title}}</Button>
							    </Poptip>
		        		</li>
		        	</ul>
		        </TabPane>
		        <TabPane label="转诊情况" name="06">
		        	<ul>
		        		<li v-for="item in this.question6">
		        			<Poptip trigger="hover" title="" content="双击问题添加到第三步">
							      <Button type="text" v-on:dblclick.native="addQuestion(item)">{{item.title}}</Button>
							    </Poptip>
		        		</li>
		        	</ul>
		        </TabPane>
		        <TabPane label="通用" name="07">
              <ul>
		        		<li v-for="item in this.question7">
		        			<Poptip trigger="hover" title="" content="双击问题添加到第三步">
							      <Button type="text" v-on:dblclick.native="addQuestion(item)">{{item.title}}</Button>
							    </Poptip>
		        		</li>
		        	</ul>
		        </TabPane>
			    </Tabs>
				</Col>
			</Row>
			<Row class="stepThird margintop20">
				<Col span="2">
					<Button type="success" long>第三步</Button>
				</Col>
				<Col span="2"><h3 style="line-height:32px;text-align:right;padding-right:20px;">随访选项</h3></Col>
				<Col span="20"></Col>
			</Row>
			<Row class="border1 setQuestion">
				<Col span="6" offset="2" class="questionList">
				 <p>问题</p>
					<ul>
						<li v-for="item in this.stepThirdQuestion">
							<Poptip trigger="hover" title="" content="双击问题添加到第三步">
					      <Button type="text" v-on:dblclick.native="addThirdQuestion(item)">{{item.title}}</Button>
					    </Poptip>
						</li>
					</ul>
				</Col>
				<Col span="12" class="questionSelect">
					<Timeline  >
						 <TimelineItem color="green" v-for="item in this.templateList1">
		        	 <Button type="primary">{{item.questionIdXml}}</Button>
		        	<Collapse v-model="collapse">
				       <Panel name="1">
			          {{item.questionName}}<Icon type="close-circled" size="22" color="#f70000" style="line-height: 45px; float:right;"></Icon>
			           
			           <ul slot="content" v-for="item1 in item.questionTempleQuestionJumps">
						      	<li>
						    			<Row class="itemli">
						    			 	<h3>处理: {{item1.switchId}}</h3>
						    			 
							    			<Row class="padleft40 mb5">
							    			 	<Col span="4" class="lineheight32">名称:</Col>
							    			 	<Col span="20" class="textCenter"><span></span></Col>
							    			</Row>
							    			<Row class="padleft40 mb5">
							    			 <Col span="4" class="lineheight32">判别规则:</Col>
								    			<Col span="20" class="textCenter"><span>{{item1.switchRegexText}}</span></Col>
							    			</Row>
							    			<Row class="padleft40 mb5">
							    			 	<Col span="4" class="lineheight32">指标值:</Col>
								    			<Col span="20" class="textCenter"><span>{{item1.keyname}}</span></Col>
							    			</Row>
							    			<Row class="padleft40 mb5">
							    			 	<Col span="4" class="lineheight32">跳转问题编号:</Col>
								    			<Col span="20" class="textCenter"><Input placeholder="large size" v-model="item1.nextQuestionId"></Input></Col>
							    			</Row>
							    			<Row class="padleft40 mb5">
							    			 	<Col span="4" class="lineheight32">无匹配超次数跳转:</Col>
							    			 	<Col span="20" class="textCenter"><Input  placeholder="large size" v-model="item1.outRptSwitchID"></Input></Col>
							    			</Row>
							    			
							    		</Row>	
						      	</li>
						      </ul>
						      
				        </Panel> 
					    </Collapse>
		        </TimelineItem>
		        
		        
			    </Timeline>
					
				</Col>
			</Row>
		</Col>
	</Row>
</template>

<script>
import {API} from '@/services';
	export default {
		data() {
			return {
				templateId: '',//模板id
				templateForm: {
					name: '',
					jibName: '',
					silencetime: '',
					outrepeattimes: '',
					firsttaskid: '',
					person: '0',
					submoulds: '',
					addSubmoulds: ''
				},
				diseName: '',//第一步--选择疾病类型
				diseaseName: '',
				options2: [],
				tagCount: [],//通用库
				tagCount2: [],//通用库
				allQuestions: [],//所有问题
				question1: [],//症状
				question2: [],//体征
				question3: [],//生活方式指导
				question4: [],//辅助检查
				question5: [],//用药反馈
				question6: [],//转诊情况
				question7: [],//通用
				stepThirdQuestion: [],//第三步配置问题
				seleceDiseId: '',//第二部选中的疾病类型的id
				collapse: '1',
				switchArr: [],//语音list
				templateList1: [],//模板语音开场白
			}
		},
		created(){
			this.fetchData()
		},
		mounted() {
			this.templateInfo()
			this.templateResolve()
		},
		methods: {
			/*
			*获取模板id
			*/ 
			fetchData () {
	      this.templateId = this.$route.params.id
	    },
			/*
			*通过模板id获取模板表单信息
			*/ 
			templateInfo() {
        API.followTemplate.editList({
          id: this.templateId,
        }).then((res) => {
        	// console.log(res)
          if(res.code == 0) {
            this.templateForm.name = res.data.name
            this.diseaseName = res.data.name
            // console.log(res.data.name)
            this.templateForm.silencetime = res.data.silencetime
            this.templateForm.outrepeattimes = res.data.outrepeattimes
            this.templateForm.firsttaskid = res.data.firsttaskid
            this.templateForm.person = res.data.person
            this.templateForm.submoulds = res.data.submoulds
          }else {
            console.log(res.message)
          }
        }).catch((error) => {
          console.log(error)
        })
      },
      /*
      *序列化模板问题
      */
       _normalizeSinger(getList1,getList2) {
     //   	 class switchList {
					//   constructor(item1) {
					//     this.questionName = item1.questionName
					//     this.questionIdXml = item1.questionIdXml
					//     this.templeId = item1.templeId
					//     this.questionId = item1.questionId
					//     this.keyvalue = item.keyvalue
					//   }
					// }
	        
	    //     getList1.forEach((item, index) => {
	    //       map.hot.items.push(new switchList({
	    //         switchId: item.switchId,//话术分支ID (-1 无匹配；-2 无声音；-3 通用处理)
	    //         questionIdXml: item.questionIdXml, //xml中从1000开始的问题编号
	    //         switchRegexText: item.switchRegexText,//判别规则
	    //         switchWav: item.switchWav,
	    //         outRptSwitchID: item.outRptSwitchID,//超时跳转
	    //         nextQuestionId: item.nextQuestionId,//下个问题
	    //       }))
	    //     })
	      },
      /*
			*通过模板id获取模板处理信息
			*/ 
      templateResolve() {
        API.followTemplate.questionList({
          id: this.templateId,
        }).then((res) => {
        
          if(res.code == 0) {
            // console.log(res.data)
            
            if(res.data.length>0) {
            	this.templateList1 = res.data
            	
            	console.log(this.templateList1)
            	
            }
            

          }else {
            console.log(res.message)
          }
        }).catch((error) => {
          console.log(error)
        })
      },
      /*
      *监听radio男声女声
      */
			radioChange(value){
				this.person = value
			},
			/*
			*添加标签
      */
      addTag() {
        let flag=0;
        this.tagCount.forEach((item) => {
          if(this.templateForm.addSubmoulds == item || this.templateForm.addSubmoulds == '') {
            flag++; 
            alert('您添加的为空或者重复添加')
          }
        })
        if(flag>0){
          this.templateForm.addSubmoulds = ''
          return false;
        }
        var strRegex = "(.xml)$"; //用于验证图片扩展名的正则表达式
  			var re=new RegExp(strRegex);
  			if(re.test(this.templateForm.addSubmoulds)){
	        this.tagCount.push(this.templateForm.addSubmoulds)
	        this.tagCount2.push(this.templateForm.addSubmoulds)
	        this.templateForm.addSubmoulds = ''
  			}else{
  				console.log(re.test(this.templateForm.addSubmoulds))
  				alert("请添加以.xml结尾的文件")
  			}
      },
      /*
      *删除标签
      */
      tagClose(event, name) {
        const index = this.tagCount.indexOf(name);
        this.tagCount.splice(index, 1);
      },
			/*
      *疾病类型--远程搜索
      */
      remoteMethod2 (query) {
      	if(query == '') {
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
          if(res.code == 0) {
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
          }else {
            console.log(res)
          }
        }).catch((error) => {
          console.log(error)
        })
      },
       /*
      *获取选中的疾病类型id，根据疾病类型获取所有问题
      */
      selectChange(value) {
        // console.log(value)
        if(value != ''){
        	this.seleceDiseId = value
	        API.followProblems.list({
	          'pager': 1,
	          'limit': '1000',
	          'title': '',
	          'diseaseId': value
	        }).then((res) => {
	          if(res.code == 0) {
	            // console.log(res)
	            this.allQuestions = res.data
	          }else {
	            console.log(res.code)
	          }
	        }).catch((error) => {
	          console.log(error)
	        })
        }else{
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
      *点击第二部的问题的操作
      */
      addThirdQuestion(item) {
      	// console.log(item)
      	
      },
      /*
      *tabs点击操作
      */
      tabsClick(name) {
      	if(name == 0) {
      		name = ''
      	}
      	console.log(this.seleceDiseId)
      	API.followProblems.list({
          pager: 1,
          limit: '1000',
          otype: name,
          diseaseId: this.seleceDiseId
        }).then((res) => {
          if(res.code == 0) {
           
            if(name == '01') {
            	this.question1 = res.data
            }
            if(name == '02') {
            	this.question2 = res.data
            }
            if(name == '03') {
            	this.question3 = res.data
            }
            if(name == '04') {
            	this.question4 = res.data
            }
            if(name == '05') {
            	this.question5 = res.data
            }
            if(name == '06') {
            	this.question6 = res.data
            }
            if(name == '07') {
            	this.question7 = res.data
            }
          }else {
            console.log(res.message)
          }
        }).catch((error) => {
          console.log(error)
        })
      },
      /*
			*删除模板配置
			*/
			removequestion(index) {
				this.switchArr.splice(index,1)
				this.switchArr.forEach((item, index) => {
					//item.switchID = index
					console.log('index='+index)
					console.log('item.switchID='+item.switchID)
					item.switchID = index+1
				})
			},

		},
		watch:{
			'$route': 'fetchData'
		}

	}
</script>

<style lang="less">
	.line {
		padding: 5px 20px;
		border-bottom: 1px solid #b1b1b1;
		width: 100%;
		margin-bottom: 34px;
		h2 {
			font-weight: 400;
			font-family: "Open Sans","Helvetica Neue",Helvetica,Arial,sans-serif;
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
	.border1{
		border: 1px #b1b1b1 solid;
	}
	.template {
		background: #fff;
		padding: 10px;
		height: 100%;
		color: #333;
		form {
			padding-right: 500px;
			.ivu-form-item:nth-of-type(1),.ivu-form-item:nth-of-type(6) {
				width: 100%;
			}
			.ivu-form-item:nth-of-type(7){
				.ivu-input-wrapper {
					width: 60%;
				}
			}
			.ivu-form-item:nth-of-type(7){
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
				height: 500px;
				// padding: 0 200px;
				.questionList {
					height: 100%;
					border-right: 1px #b1b1b1 solid;
					p {
						line-height: 40px;
						font-size: 22px;
						border-bottom: 1px #b1b1b1 solid;
					}
				}
				.questionSelect {
					height: 100%;
					// border-left: 1px #b1b1b1 solid;
					p {
						line-height: 40px;
						font-size: 22px;
						border-bottom: 1px #b1b1b1 solid;
					}
				}
			}
		}
	}
</style>
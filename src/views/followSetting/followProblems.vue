<template>
	<Row class="patientSearch">
		<!-- 搜索栏 -->
		<Col span="24" class="patientSearch">
			<Form ref="proSearch" :model="proSearch" :label-width="80" inline >
        <FormItem prop="title" label="问题标题">
          <Input type="text" v-model="proSearch.title" placeholder="请输入问题名称"></Input>
        </FormItem>
        <FormItem prop="diseaseName" label="疾病类型">
          <Select v-model="proSearch.diseaseName" filterable remote not-found-text="" :remote-method="remoteMethod2" :loading="loading2" >
            <Option v-for="(option, index) in options2" :value="option.value" :key="index">{{option.label}}</Option>
          </Select>
        </FormItem>
        <FormItem>
          <Button type="primary" @click="handleSearch('proSearch')">查询</Button>
      	</FormItem>
      	<FormItem>
          <Button type="primary" @click="addBtn('proRuleModel')">添加问题</Button>
      	</FormItem>
		  </Form>
		</Col>
		<!-- 表格 -->
		<Col span="24" class="patientList">
			<Table border :columns="columns7" :data="pardata"></Table>
		</Col>
		<!-- 分页 -->
		<Col span="24" class="pages">
			<Page :total="pageTotal" @on-change="currentPage" show-elevator show-total></Page>
		</Col>
		<!-- 详情模态框 -->
	  <Modal v-model="patientText" title="添加问题 / 编辑问题"  @on-ok="ok" @on-cancel="cancel" width="650" class-name="patientInfo">
      <Form :model="formItem" :label-width="100" ref="proRuleModel" :rules="proRuleModel">
        <input type="hidden" v-model="formItem.id" placeholder="id">
        <FormItem label="问题标题" prop="title">
            <Input v-model="formItem.title" placeholder="请输入问题标题"></Input>
        </FormItem> 
        <FormItem label="问题内容" prop="content">
            <Input v-model="formItem.content" placeholder="请输入随访问题内容"></Input>
        </FormItem>
        <FormItem label="采集指标">
            <RadioGroup v-model="formItem.isTarget" @on-change="targetChange">
              <Radio label="0">是</Radio>
              <Radio label="1">否</Radio>
            </RadioGroup>
        </FormItem>
        <FormItem label="关联指标" prop="targetName1" v-if="targetShow">
            <!-- <Input v-model="formItem.targetName" placeholder="根据首字母进行搜索" @on-keyup="keyupzb($event)"></Input> -->
            <Select v-model="formItem.targetName1" filterable remote :remote-method="remoteMethod1" :loading="loading1" clearable :label-in-value=true @on-change="targetRadio">
                <Option v-for="(option, index) in options1" :value="option.value" :key="index">{{option.label}}</Option>
            </Select>
        </FormItem>
        <FormItem label="" prop="" label="指标类型" v-if="targetShow">
          <Tag color="blue" v-if="tagShow">{{targetTag}}</Tag>
        </FormItem>
        <FormItem label="疾病类型" prop="diseaseName">
          <Select v-model="formItem.diseaseName" filterable remote :remote-method="remoteMethod2" :loading="loading2" clearable style="width: 70%;float: left;margin-right:20px;" @on-change="selectChange" not-found-text="" :label-in-value=true placeholder="搜索疾病类型添加至疾病标签">
            <Option v-for="(option, index) in options2" :value="option.value" :key="index">{{option.label}}</Option>
          </Select>
          <Button type="primary" @click="addTag" ref="addTagbtn">添加</Button>
        </FormItem>
        <FormItem label="" prop="" label="疾病标签">
          <tag v-for="item in tagCount" color="blue" :key="item" :name="item" closable @on-close="tagClose">{{item}}</tag>
        </FormItem>
        <FormItem label="纯放音">
            <RadioGroup v-model="formItem.playWavOnly" @on-change="radioChange">
              <Radio label="1">是</Radio>
              <Radio label="0">否</Radio>
            </RadioGroup>
        </FormItem>
        <FormItem>
            <Button type="primary" @click="addModel('proRuleModel')">保存</Button>
        </FormItem>
      </Form>
    </Modal>
	 
	</Row>
</template>

<script>
  import {API} from '@/services';
	export default {
		data() {
			return {
				proSearch: {//搜索框
          title: '',
          diseaseName: '',
        },
        columns7: [//表格栏
          {
            title: 'id',
            key: 'id',
            align: 'center'
          },         
          {
            title: '问题名称',
            key: 'title',
            align: 'center'
          },
          {
            title: '疾病标签',
            key: 'diseaseName',
            align: 'center'
          },
          {
            title: '问题内容',
            key: 'content',
            align: 'center'
          },
          {
            title: '关联指标',
            key: 'targetName',
            align: 'center'
          },
          {
            title: '操作',
            key: 'action',
            width: 250,
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                    	this.patientText = true
                      API.followProblems.editList({
                        "id": params.row.id
                      }).then((res) => {
                        if(res.code == 0) {
                          console.log(res)
                          this.formItem.id = res.data.id
                          this.formItem.title = res.data.title
                          this.formItem.content = res.data.content
                          this.formItem.targetName = res.data.targetName
                          this.formItem.playWavOnly = res.data.playWavOnly
                          //this.formItem.textarea = res.data.remark
                          addModel(this.formItem.id)
                        }else {
                          console.log(res)
                        }
                      }).catch((error) => {
                        console.log(error)
                      })
                    }
                  }
                }, '编辑'),
               
                h('Button', {
                  props: {
                    type: 'warning',
                    size: 'small'
                  },
                  style: {
                  	marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.$Modal.confirm({
		                    title: 'Title',
		                    content: '<p>确定要删除吗?</p>',
		                    onOk: () => {
	                        this.deleteRow(params.row.id)
		                    },
		                    onCancel: () => {
		                        // this.$Message.info('Clicked cancel');
		                    }
		                  });
                    }
                  }
                }, '删除'),
                // h('Button', {
                //   props: {
                //     type: 'warning',
                //     size: 'small'
                //   },
                //   style: {},
                //   on: {
                //     click: () => {
                //       this.$router.push({path:'/followSetting/voice/voice/:123'});
                //     }
                //   }
                // }, '编辑话述')
              ]);
            }
				}],
        pardata: [],//表格data
        pageTotal: 0,//数据总计
        patientText: false,//编辑模态框
        diseaseIdInp: '',//疾病id隐藏域
		    formItem: {
          id:'',
          title: '',
          content: '',
          targetName1: '',
          diseaseName: '',
          diseaseId: '',
          model10: [],
          playWavOnly: '1',
          isTarget: '0'//是否采集指标
        },
        proRuleModel: {//模态框校验
          title: [
            { required: true, message: '问题标题问题标题不能为空', trigger: 'blur' },
            { type: 'string', max: 30, message: '最大长度不超过30', trigger: 'blur' }
          ],
          content: [
            { required: true, message: '问题内容不能为空', trigger: 'blur' }
          ],
          targetName1: [
            { required: true, message: '关联指标不能为空', trigger: 'blur' }
          ],
          password: [
            { required: true, message: 'Please fill in the password.', trigger: 'blur' },
            { type: 'string', min: 6, message: 'The password length cannot be less than 6 bits', trigger: 'blur' }
          ]
        },             
        tagCount: [],
        tagCount2: [],
		    editRules: {
		    }, 
        zjmdata: [],//助记码array
        loading1: false,
        options1: [],
        listdata: [],
        loading2: false,
        options2: [],
        listdata2: [],
        diseasedata: [],
        selectLabel: '',
        selectValue: '',
        targetShow: true,//判断是否疾病标签是否展示
        targetTag: '',//指标标签
        tagShow: false,//标签是否展示
			}
		},
    mounted() {
      this.list(1)
    },

		methods: {
       /*
      *获取prolist列表数据
      */
      list(pager) {
        API.followProblems.list({
          'pager': pager,
          'limit': '10',
        }).then((res) => {
          if(res.code == 0) {
            this.pardata = res.data
            this.pageTotal = res.total
          }else {
            console.log(res.code)
          }
        }).catch((error) => {
          console.log(error)
        })
      },
      /*
      *获取分页列表数据
      */
      currentPage: function (page) {
        console.log(this.proSearch.diseaseName)
       API.followProblems.list({
          pager: page,
          limit: '10',
          title: this.proSearch.title,
          diseaseId: this.proSearch.diseaseName
        }).then((res) => {
          if(res.code == 0) {
            this.pardata = res.data
            this.pageTotal = res.total
          }else {
            console.log(res.message)
          }
        }).catch((error) => {
          console.log(error)
        })
      },
      /*
      *获取选中的疾病标签列value
      */
      selectChange(value) {
        console.log(value.label)
        this.selectLabel = value.label
        this.selectValue = value.value
      },
      /*
      *获取选中的指标value
      */
      targetRadio(value) {
        console.log(value.label)
        API.follSetting.list({
          pager: 1,
          limit: '10',
          name: value.label,
          
        }).then((res) => {
          if(res.code == 0) {
            console.log(res.data[0].otype)
            let otypeName
            if(res.data[0].otype == '01') {
              otypeName = '症状'
            }else if(res.data[0].otype == '02') {
              otypeName = '体征'
            }else if(res.data[0].otype == '03') {
              otypeName = '生活方式指导'
            }else if(res.data[0].otype == '04') {
              otypeName = '辅助检查'
            }else if(res.data[0].otype == '05') {
              otypeName = '用药反馈'
            }else if(res.data[0].otype == '06') {
              otypeName = '转诊情况'
            }else if(res.data[0].otype == '07') {
              otypeName = '通用'
            }
            if(this.formItem.targetName1 != '') {
              this.tagShow = true
              this.targetTag = otypeName
            }else {
              this.tagShow = false
              this.targetTag = ''
            }
            console.log('this.targetTag='+this.targetTag)
          }else {
            console.log(res.message)
          }
        }).catch((error) => {
          console.log(error)
        })
      },
      /*
      *查询功能
      */
      handleSearch() {
        API.followProblems.list({
          'pager': 1,
          'limit': '10',
          'title': this.proSearch.title,
          'diseaseId': this.proSearch.diseaseName
        }).then((res) => {
          if(res.code == 0) {
            this.pardata = res.data
            this.pageTotal = res.total
          }else {
            console.log(res.message)
          }
        }).catch((error) => {
          console.log(error)
        })
      },
      /*
      *添加指标
      */
      addBtn(name) {
        this.patientText = true;//打开模态框
        this.$refs[name].resetFields();//清空表单
      },
      /*
      *确定添加
      */
      addModel(name) {
        let jbnam = this.tagCount.join(',')
        let addPram = {
          "id": this.formItem.id,
          "title": this.formItem.title,
          "isTarget": this.formItem.isTarget,
          "content": this.formItem.content,
          "targetId": this.formItem.targetName1,
          "diseaseId": this.tagCount2.join(','),
          "playWavOnly": this.formItem.playWavOnly,
          "status": 0,
        }
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.$Message.success('Success!');
            API.followProblems.addList(addPram).then((res) => {
              if(res.code == 0) {
                console.log(res.message)
                this.formItem.name = ''
                this.formItem.select2 = ''
                this.formItem.select = ''
                this.formItem.radio = 'string'
                this.formItem.textarea = ''
                this.patientText = false;
                this.tagCount = []//清空疾病标签
                this.list(1)
                console.log(res)
              }else {
                alert('res.message='+res.message)
              }
            }).catch((error) => {
              console.log(error)
            })
          } else {
            this.$Message.error('Fail!');
          }
        })
      },
      /*
      *删除
      */
      deleteRow(id){
        API.follSetting.deleteList({
         id:id
        }).then((res) => {
          if(res.code == 0) {
            console.log(res.message)
            this.list(1)
            this.$Message.success({
              content: '删除成功',
              top: 500
            });
          }else {
            alert(res.message)
          }
        }).catch((error) => {
          console.log(error)
        })
      },
      /*
      *添加标签
      */
      addTag() {
        let flag=0;
        this.tagCount.forEach((item) => {
          if(this.selectLabel == item || this.selectLabel == '') {
            flag++; 
            alert('您添加的为空或者重复添加')
          }
        })
        if(flag>0){
          this.selectLabel = ''
          return false;
        }
        this.tagCount.push(this.selectLabel)
        this.tagCount2.push(this.selectValue)
        this.selectLabel = ''
        this.selectValue = ''
        this.formItem.diseaseName = ''
      },
      /*
      *删除标签
      */
      tagClose(event, name) {
        const index = this.tagCount.indexOf(name);
        this.tagCount.splice(index, 1);
      },
      /*
      *监听是否纯放音的单选
      */
      radioChange(value) {
        console.log('是否纯放音='+value)
      },
      /*
      *监听是否采集指标
      */
      targetChange(value) {
        console.log('是否采集指标='+value)
        if(value == '0') {
          this.targetShow = true
        }else {
          this.targetShow = false
        }
      },
    	//详情模态框
    	show (index) {
        this.$Modal.info({
            title: 'User Info',
            content: `Name：${this.pardata[index].name}<br>Age：${this.pardata[index].age}<br>Address：${this.pardata[index].address}`
        })
      },
      remove (index) {
      	this.pardata.splice(index, 1);
      },
      //详情关闭确认点击事件
      ok () {
        this.$Message.info('您打开了弹框');
      },
      cancel () {
        this.$Message.info('您关闭了弹框');
        this.tagCount = []//清空疾病标签
      },
      //编辑模态框提交按钮
      handleEdit(name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.$Message.success('Success!');
          } else {
            this.$Message.error('Fail!');
          }
        })
    	},
      /*
      *知名名称，根据助记码搜索指标类型
      */
      keyupzb: function(ev) {
        console.log(this.formItem.targetName)
      },
      /*
      *指标类型--远程搜索
      */ 
      remoteMethod1 (query) {
        API.follSetting.list({
          'pager': '1',
          'limit': '1000',
          'zjm': query
        }).then((res) => {
          if(res.code == 0) {
            // console.log(res.data)
            class Point {
              constructor(item) {
                this.value = item.value;
                this.label = item.label;
              }
            }
            let parr = []
            let more = res.data
            more.forEach((item) => {
              parr.push(new Point({
                value: item.id,
                label: item.name
              }))
            })

            this.options1 = parr
            if (query !== '') {
              this.options1 = parr
              
            } else {
              this.options1 = [];
            }
          }else {
            console.log(res)
          }
        }).catch((error) => {
          console.log(error)
        })
      },
      /*
      *疾病类型--远程搜索
      */
      remoteMethod2 (query) {
        API.followProblems.disease({
          'zjm': query
        }).then((res) => {
         
          console.log(res)
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
              this.proSearch.diseaseName = ''
            }

            
          }else {
            console.log(res)
          }
        }).catch((error) => {
          console.log(error)
        })
      },
		}
	}
</script>

<style lang="less">
	.patientSearch {
		background: #fff;
			form {
				.ivu-form-item {
					margin-bottom: 0;
					padding: 20px 0;
					width: 240px;
					.ivu-form-item-label:before {
						content: ''
					}
			}
		}
		.patientList {
			padding: 10px;
		}
		.pages{
			.ivu-page {
				float: right;
				padding: 10px 20px 10px 0;
			}
		}
	}
	//模态框垂直居中
	.vertical-center-modal{
	    display: flex;
	    align-items: center;
	    justify-content: center;

	    .ivu-modal{
	        top: 0;
	    }
	}
	//详情
	.patientInfo .ivu-modal .ivu-modal-content {
		.ivu-modal-header {
			.ivu-modal-header-inner, .ivu-modal-header p {
				font-size: 16px;
		    	color: #1c2432;
		    	font-weight: normal;
			}
		}
		.ivu-modal-footer {
			display: none;
		}
	}
	.infoRow{
		.infoCol12 {
			height: 65px;
			padding: 0px 20px!important;
			.info {
				width: 442px;
				height: 65px;
				border: 1px solid #DCEBF7;
				.info-row {
					.info1 {
						width: 110px;
						height: 32px;
						float: left;
						line-height: 32px;
						color: #336199;
	  					background-color: #EDF3F4;
	  					text-align: right;
	  					padding-right: 10px;
					}
					.info2 {
						width: 330px;
						height: 32px;
						float: left;
						line-height: 32px;
						padding-left: 15px;
					}
				}
			}
		}
		.infoCol24 {
			background: #f9f9f9;
			padding: 15px;
			.infoRow2 {
				.sfCol4 {
					.counts {
						width: 80px;
						height: 80px;
						color: #fff;
					    border-radius: 10px;
					    line-height: 1.5;
					    background: #2a8bcb;
					    padding-top: 10px;
	  					text-align: center;
					    .suifang {
					    	font-size: 28px;
					    }
					    .sfCounts {
					    	font-size: 14px;
					    }

					}
				}
				.sfCol20 {
					h3 {
						padding: 20px 0 10px 0;
						font-size: 24px;
						font-weight: normal;
						line-height: 24px;
					}
					.sfTime {
						span {
							color: #FF892A;
						}
					}
				} 
			}
		}
	}
	//编辑
	.editInfo .ivu-modal .ivu-modal-content {
		.ivu-modal-header {
			.ivu-modal-header-inner, .ivu-modal-header p {
				font-size: 16px;
		    	color: #1c2432;
		    	font-weight: normal;
			}
		}
		.ivu-modal-body {
			padding: 32px 132px;

		}
		.ivu-modal-footer {
			display: none;
		}
	}
	.bb1 {
		border-bottom: 1px solid #fff; 
	}
	.bdx1 {
		border-bottom: 1px dotted #EDF3F4;
	}
	.mb12 {
		margin-bottom: 12px;
	}
</style>
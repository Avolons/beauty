<template>
	<Row>
		<!-- 搜索栏 -->
		<Col span="24" class="followPlan">
			<Form ref="formInline" :model="formInline" :rules="ruleInline" :label-width="90" inline >
        <FormItem prop="user" label="随访状态">
          <Select v-model="formInline.select">
            <Option value="beijing">不限</Option>
            <Option value="shanghai">已随访</Option>
            <Option value="shenzhen">等待随访</Option>
            <Option value="beijing">随访中</Option>
            <Option value="shanghai">停止</Option>
            <Option value="shenzhen">配置错误</Option>
          </Select>
        </FormItem>
        <FormItem prop="user" label="患者姓名">
          <Input type="text" v-model="formInline.user" placeholder="请输入患者姓名"></Input>
        </FormItem>
        <FormItem prop="user" label="随访单号">
          <Input type="text" v-model="formInline.user" placeholder="请输入随访单号"></Input>
        </FormItem>
        <FormItem prop="user" label="引用随访方案">
          <Input type="text" v-model="formInline.user" placeholder="请输入引用随访方案"></Input>
        </FormItem>
        <FormItem>
          <Button type="primary" @click="handleSubmit('formInline')">查询</Button>
      	</FormItem>
		  </Form>
		</Col>
		<!-- 表格 -->
		<Col span="24" class="fpTable">
			<Table border :columns="columns7" :data="data6" class="margin-bottom-10"></Table>
			<Row>
				<Col span="10">
					<Button type="error" @click="examineBtn" class="margin-left-20">审核</Button>
		      <Button type="warning" @click="testBtn" class="margin-left-20">通过</Button>
		    </Col>
		     <Col span="14" class="text-right padding-right-20">
		      <Page :total="100" show-elevator show-total></Page>
				</Col>
			</Row>
		</Col>
		<!-- 随访模态框 -->
		<Modal v-model="patientDetail" title="随访电话" class-name="patientInfo" @on-ok="ok" @on-cancel="cancel" :styles="{top: '180px'}" >
			<Form ref="formInline" :model="AIform" :rules="ruleInline" inline :label="80" class="AIform">
        <FormItem prop="user" label="电话">
            <Input v-model="AIform.AIphone" placeholder="请输入号码" type="text"></Input>
        </FormItem>
        <FormItem>
          <Button type="primary" @click="testBtn">提交AI</Button>
      	</FormItem>
      </Form>
	  </Modal>
	  <!-- 编辑功能模态框 -->
		<!-- <Modal v-model="patientText" title="编辑患者信息" class-name="editInfo" @on-ok="ok" @on-cancel="cancel" :styles="{top: '180px'}">
    	
    </Modal> -->
	</Row>
</template>

<script>
	export default {
		data() {
			return {
				formInline: {//搜索框
          user: '',
          password: '',
          select: '',
        },
        ruleInline: {//搜索框校验
          user: [
            { required: true, message: 'Please fill in the user name', trigger: 'blur' }
          ],
          password: [
            { required: true, message: 'Please fill in the password.', trigger: 'blur' },
            { type: 'string', min: 6, message: 'The password length cannot be less than 6 bits', trigger: 'blur' }
          ]
        },
        columns7: [//表格栏
            {
              title: '随访编号',
              key: 'name',
              align: 'center'
          },
          {
              title: '引用随访方案',
              key: 'age',
              align: 'center'
          },
          
          {
              title: '患者',
              key: 'age',
              align: 'center'
          },
          {
              title: '随访状态',
              key: 'address',
              align: 'center'
          },
          {
              title: '呼叫状态',
              key: 'address',
              align: 'center'
          },
          {
              title: '计划呼出时间',
              key: 'age',
              align: 'center'
          },
          {
              title: '实际完成时间',
              key: 'address',
              align: 'center'
          },
          {
              title: '生成时间',
              key: 'address',
              align: 'center'
          },
          {
              title: 'Action',
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
                            	
                            	console.log(params)
                            	if(params.row.action1==true) {
                            		this.$router.push('business/add/0');
                            	}else{
                            		this.patientDetail = true
                            	}
                            }
                          }
                      }, params.row.action1==true ? '审核中':'详情'),
                      h('Button', {
                          props: {
                              type: 'warning',
                              size: 'small'
                          },
                          style: {

                          },
                          on: {
                              click: () => {
                                  //this.remove(params.index)
                                  this.$Modal.confirm({
								                    title: '提示',
								                    content: '<p>确定要删除吗?</p>',
								                    onOk: () => {
								                        this.remove(params.index)
								                    },
								                    onCancel: () => {
								                        // this.$Message.info('Clicked cancel');
								                    }
								                });
                              }
                          }
                      }, '删除')
                  ]);
              }
				}],
        data6: [//表格data
            {
                name: 'John Brown',
                age: 18,
                action1: true,
                address: 'New York No. 1 Lake Park',
            },
            {
                name: 'Jim Green',
                age: 24,
                action1: false,
                address: 'London No. 1 Lake Park'
            },
            {
                name: 'Joe Black',
                age: 30,
                action1: true,
                address: 'Sydney No. 1 Lake Park'
            },
            {
                name: 'Jon Snow',
                age: 26,
                action1: true,
                address: 'Ottawa No. 2 Lake Park'
            },
            {
                name: 'John Brown',
                age: 18,
                action1: true,
                address: 'New York No. 1 Lake Park'
            },
            {
                name: 'Jim Green',
                age: 24,
                action1: true,
                address: 'London No. 1 Lake Park'
            },
            {
                name: 'Joe Black',
                age: 30,
                action1: true,
                address: 'Sydney No. 1 Lake Park'
            },
            {
                name: 'Jon Snow',
                age: 26,
                action1: true,
                address: 'Ottawa No. 2 Lake Park'
            },
            {
                name: 'John Brown',
                age: 18,
                action1: true,
                address: 'New York No. 1 Lake Park'
            },
            {
                name: 'Jim Green',
                age: 24,
                action1: true,
                address: 'London No. 1 Lake Park'
            },
            {
                name: 'Joe Black',
                age: 30,
                action1: true,
                address: 'Sydney No. 1 Lake Park'
            },
            {
                name: 'Jon Snow',
                age: 26,
                action1: true,
                address: 'Ottawa No. 2 Lake Park'
            }
        ],
        patientDetail: false,//详情模态框
        patientText: false,//编辑模态框
		    formCustom: {//编辑表格data
		    	ptNa: '薛卫国',
		    	ptPhone: '',
		    	ptAdd: '',
		    	ptYb: '',
		    	ptName: '',
		    	ptRe: '',
		    	ptDz: '',
		    	ptDh: '',
		    	ptDe: ''
		    },
		    AIform: {
		    	AIphone: '',
		    },
		    editRules: {
		    	// ptPhone: [
       //      { required: true, message: '请填写联系电话', trigger: 'blur' },
       //      { type: 'number', message: 'The password length cannot be less than 6 bits', trigger: 'blur' }
       //    ],
		    } 
			}
		},
		methods: {
			//搜索栏提交按钮
			handleSubmit(name) {
	        this.$refs[name].validate((valid) => {
	          if (valid) {
	            this.$Message.success('Success!');
	          } else {
	            this.$Message.error('Fail!');
	          }
	        })
	    	},
	    	//详情模态框
	    	show (index) {
		        this.$Modal.info({
		            title: 'User Info',
		            content: `Name：${this.data6[index].name}<br>Age：${this.data6[index].age}<br>Address：${this.data6[index].address}`
		        })
	        },
		      remove (index) {
		      	this.data6.splice(index, 1);
		      },
		      //详情关闭确认点击事件
		      ok () {
		        this.$Message.info('Clicked ok');
		      },
		      cancel () {
		        this.$Message.info('Clicked cancel');
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
		    examineBtn() {
		    	alert('审核')
		    },
		    testBtn() {
		    	alert('测试')
		    }
		},
	}
</script>

<style lang="less">

@import "../../styles/common.less";

	.followPlan {
		background: #fff;
			form {
				.ivu-form-item {
					margin-bottom: 0;
					padding: 20px 0;
					width: 250px;
					.ivu-form-item-label:before {
						content: ''
					}
			}
		}
		.fpTable {
			padding: 10px;
		}
	}
		.pages{
			.ivu-page {
				float: right;
				padding: 10px 20px 10px 0;
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
		.ivu-modal-body {
			.AIform {
				text-align: center;
				.ivu-form-item {
					padding: 10px 0;
					width: 250px;
					margin-bottom: 0;
					.ivu-form-item-label:before {
						content: ''
					}
					.ivu-form-item-content .ivu-input-wrapper {
						width: 80%;
					}
				}
			}
		}
		.ivu-modal-footer {
			display: none;
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
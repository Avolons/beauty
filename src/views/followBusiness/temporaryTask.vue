<template>
	<Row>
		<!-- 搜索栏 -->
		<Col span="24" class="followPlan">
			<Form ref="formInline" :model="formInline" :rules="ruleInline" :label-width="90" inline >
        <FormItem prop="user" label="患者姓名">
          <Input type="text" v-model="formInline.user" placeholder="Username"></Input>
        </FormItem>
        <FormItem prop="user" label="疾病类型">
          <Input type="text" v-model="formInline.user" placeholder="Username"></Input>
        </FormItem>
       	<FormItem label="开始时间">
          <DatePicker type="date" placeholder="Select date" v-model="formInline.date"></DatePicker>
        </FormItem>
        <FormItem label="结束时间">
          <DatePicker type="date" placeholder="Select date" v-model="formInline.date"></DatePicker>
        </FormItem>
        <FormItem>
          <Button type="primary" @click="handleSubmit('formInline')">查询</Button>
      	</FormItem>
		  </Form>
		</Col>
		<!-- 表格 -->
		<Col span="24" class="fpTable">
			<Table border :columns="columns7" :data="data6" class="margin-bottom-10" ref="selection"></Table>
			<Row>
				<Col span="10">
					<Button type="error" @click="handleSelectAll(true)" class="margin-left-20">全选</Button>
		      <Button type="warning" @click="testBtn" class="margin-left-20">发起临时随访</Button>
		    </Col>
		     <Col span="14" class="text-right padding-right-20">
		      <Page :total="100" show-elevator show-total></Page>
				</Col>
			</Row>
		</Col>
		<!-- 随访模态框 -->
		<Modal v-model="patientDetail" title="发起临时随访" class-name="patientInfo" @on-ok="ok" @on-cancel="cancel" :styles="{top: '180px'}" width="800px;">
			
        	<Table border :columns="temTask" :data="temTaskData" class="margin-bottom-10" ref="temTask" @on-select-all="onlySelectOne"></Table>
        	<Row>
        		<Col span="24" class="text-center margin-top-10">
        			<span style="font-size:14px;font-weight:bold;margin:2px 20px 0 0;">随访起始时间</span>
        			<DatePicker type="date" placeholder="Select date" v-model="formInline.date"></DatePicker>
        		</Col>
        		<Col span="24" class="text-center margin-top-10">
        			<Button type="primary" @click="testBtn">提交AI</Button>
        		</Col>
        	</Row>
      </Form>
	  </Modal>
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
          date: '',
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
                type: 'selection',
                width: 60,
                align: 'center'
            },
            {
              title: '姓名',
              key: 'name',
              align: 'center'
          },
          {
              title: '性别',
              key: 'age',
              align: 'center'
          },
          
          {
              title: '上次就诊时间',
              key: 'age',
              align: 'center'
          },
          {
              title: '疾病类型',
              key: 'address',
              align: 'center'
          },
          {
              title: '单位名称',
              key: 'address',
              align: 'center'
          },
          {
              title: '民族',
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
                            	this.patientDetail = true
                            }
                          }
                      }, '发起临时随访'),
                  ]);
              }
				}],
        data6: [//表格data
            {
                name: 'John Brown',
                age: 18,
                address: 'New York No. 1 Lake Park'
            },
            {
                name: 'Jim Green',
                age: 24,
                address: 'London No. 1 Lake Park'
            },
            {
                name: 'Joe Black',
                age: 30,
                address: 'Sydney No. 1 Lake Park'
            },
            {
                name: 'Jon Snow',
                age: 26,
                address: 'Ottawa No. 2 Lake Park'
            },
            {
                name: 'John Brown',
                age: 18,
                address: 'New York No. 1 Lake Park'
            },
            {
                name: 'Jim Green',
                age: 24,
                address: 'London No. 1 Lake Park'
            },
            {
                name: 'Joe Black',
                age: 30,
                address: 'Sydney No. 1 Lake Park'
            },
            {
                name: 'Jon Snow',
                age: 26,
                address: 'Ottawa No. 2 Lake Park'
            },
            {
                name: 'John Brown',
                age: 18,
                address: 'New York No. 1 Lake Park'
            },
            {
                name: 'Jim Green',
                age: 24,
                address: 'London No. 1 Lake Park'
            },
            {
                name: 'Joe Black',
                age: 30,
                address: 'Sydney No. 1 Lake Park'
            },
            {
                name: 'Jon Snow',
                age: 26,
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
		    },
		    temTask: [
		    	{
                type: 'selection',
                width: 60,
                align: 'center'
            },
            {
              title: '方案名称',
              key: 'name',
              align: 'center'
          },
          {
              title: '疾病类型',
              key: 'age',
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
                            	this.$router.push({path:'/followBusiness/page/page'});
                            }
                          }
                      }, '查看方案详情'),
                  ]);
              }
					}
		    ], 
		    temTaskData: [
		    	{
		    		name: '糖尿病方案',
		    		age: '糖尿病'
		    	},
		    	{
		    		name: '高血压方案',
		    		age: '高血压'
		    	},
		    ],
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
	    	handleSelectAll (status) {//全选
          this.$refs.selection.selectAll(status);
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
		    },
		    onlySelectOne() {
		    	alert('只能选择一种方案')
		    	 this.$refs.temTask.selectAll(false);
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
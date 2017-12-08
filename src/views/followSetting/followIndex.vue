<template>
	<Row>
		<!-- 搜索栏 -->
		<Col span="24" class="searchCol">
			<Form ref="IndexSearch" :model="IndexSearch" :label-width="90" inline >
				<FormItem prop="user" label="指标名称">
          <Input type="text" v-model="IndexSearch.user" placeholder="请输入指标名称"></Input>
        </FormItem>
        <FormItem prop="user" label="指标类型">
          <Select v-model="IndexSearch.select">
            <Option value="0">通用</Option>
            <Option value="1">症状</Option>
            <Option value="2">生活方式指导</Option>
            <Option value="3">辅助检查</Option>
            <Option value="4">用药反馈</Option>
            <Option value="5">转诊情况</Option>
          </Select>
        </FormItem>
        <FormItem>
          <Button type="primary" @click="handleSubmit('IndexSearch')">查询</Button>
      	</FormItem>
      	<FormItem>
          <Button type="primary" @click="handleSubmit('IndexSearch')">添加指标</Button>
      	</FormItem>
		  </Form>
		</Col>
		<Col span="24" class="fpTable">
			<Table border :columns="columns7" :data="data6" class="margin-bottom-10"></Table>
			<Row>
				<Col span="10"></Col>
		     <Col span="14" class="text-right padding-right-20">
		      <Page :total="100" show-elevator show-total></Page>
				</Col>
			</Row>
		</Col>
	
		<!-- 编辑功能模态框 -->
		<Modal v-model="patientText" title="添加指标 / 编辑指标"  @on-ok="ok" @on-cancel="cancel" width="650" class-name="patientInfo">
      <Form :model="formItem" :label-width="80">
        <FormItem label="指标名称">
            <Input v-model="formItem.input" placeholder="请输入指标名称"></Input>
        </FormItem>
        <FormItem label="指标类型">
            <Select v-model="formItem.select">
                <Option value="beijing">通用</Option>
                <Option value="shanghai">症状</Option>
                <Option value="shenzhen">体征</Option>
                <Option value="beijing">生活方式指导</Option>
                <Option value="shanghai">辅助检查</Option>
                <Option value="shenzhen">用药反馈</Option>
                <Option value="shenzhen">转诊情况</Option>
            </Select>
        </FormItem>
        <FormItem label="结果类型"  >
            <RadioGroup v-model="formItem.radio" @on-change="hello">
              <Radio label="textLabel" checked>文本</Radio>
              <Radio label="xxLabel">选项</Radio>
              <Radio label="numberLabel">数值</Radio>
            </RadioGroup>
        </FormItem>
        	<FormItem label="指标名称" v-if="radioText">
            <Input v-model="formItem.indexName" placeholder="请输入指标名称" style="width:80%"></Input>
            <Button type="primary" @click="addItem">添加</Button>
        	</FormItem>
        <FormItem label="预警阀值"  v-if="radioText">
        	<Select v-model="formItem.model10" multiple style="width:260px">
			        <Option v-for="item in optionList" :value="item.value" :key="item.value">{{ item.label }}</Option>
			    </Select>
        </FormItem>
        <FormItem label="预警阀值"  v-if="radioNumber">
        	<Input v-model="formItem.indexName" placeholder="请输入下限" style="width:20%"></Input>
        	<span>-</span>
        	<Input v-model="formItem.indexName" placeholder="请输入上限" style="width:20%"></Input>
        </FormItem>
        <FormItem label="备注">
            <Input v-model="formItem.textarea" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="添加备注"></Input>
        </FormItem>
        <FormItem>
            <Button type="primary">保存</Button>
        </FormItem>
    </Form>
    </Modal>
  </Row>
</template>

<script>
	export default {
		data() {
			return {
				IndexSearch: {
					user: '',
					select: ''
				},
				columns7: [//表格栏
          {
            title: '指标名称',
            key: 'name',
            align: 'center'
          },
          {
              title: '指标类型',
              key: 'age',
              align: 'center'
          },
          
          {
              title: '结果类型',
              key: 'age',
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
                            	this.patientText = true
                            }
                          }
                      }, '编辑'),
                      h('Button', {
                          props: {
                              type: 'warning',
                              size: 'small'
                          },
                          style: {

                          },
                          on: {
                            click: () => {
                              this.remove(params.index)
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
        patientText: false,
        formItem: {
          input: '',
          select: '',
          radio: 'textLabel',
          checkbox: [],
          switch: true,
          date: '',
          time: '',
          slider: [20, 50],
          textarea: '',
          indexName: '',
          model10: []
        },
        optionList: [],
        radioText: false,
        radioNumber: false,
			}
		},
		methods: {
			hello(value){
				if(value == 'xxLabel') {
					this.radioText = true
					this.radioNumber = false
				}else if(value == 'numberLabel') {
					this.radioNumber = true
					this.radioText = false
				}else {
					this.radioText = false
					this.radioNumber = false
				}
			},
			handleSubmit() {
				alert('搜索')
			},
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
    	addItem() {
    		class Point {
				  constructor(value, label) {
				    this.value = value;
				    this.label = label;
				  }
				}

				let p1 = new Point(this.formItem.indexName,this.formItem.indexName)
				this.optionList.push(p1)
    		this.formItem.indexName = ''
    		console.log(this.optionList)
    	}
		},
		
	}
</script>

<style lang="less">
	@import "../../styles/common.less";
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
</style>
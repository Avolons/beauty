<template>
	<Row>
		<!-- 搜索栏 -->
		<Col span="24" class="searchCol" style="background: #fff;">
			<Form ref="IndexSearch" :model="IndexSearch" :label-width="90" inline style="padding:20px;">
				<FormItem label="指标名称">
          <Input type="text" v-model="IndexSearch.name" placeholder="请输入指标名称"></Input>
        </FormItem>
        <FormItem label="指标类型">
          <Select v-model="IndexSearch.select">
            <Option value="01">症状</Option>
            <Option value="02">体征</Option>
            <Option value="03">生活方式指导</Option>
            <Option value="04">辅助检查</Option>
            <Option value="05">用药反馈</Option>
            <Option value="06">转诊情况</Option>
            <Option value="07">通用</Option>
          </Select>
        </FormItem>
        <FormItem>
          <Button type="primary" @click="handleSearch('IndexSearch')">查询</Button>
      	</FormItem>
      	<FormItem>
          <Button type="primary" @click="addBtn">添加指标</Button>
      	</FormItem>
		  </Form>
		</Col>
		<Col span="24" class="fpTable">
			<Table border :columns="columns7" :data="datalist" class="margin-bottom-10"></Table>
			<Row>
				<Col span="10"></Col>
		     <Col span="14" class="text-right padding-right-20">
		      <Page :total="pageTotal" @on-change="currentPage" show-elevator show-total ></Page>
				</Col>
			</Row>
		</Col>
	
		<!-- 编辑功能模态框 -->
		<Modal v-model="patientText" title="添加指标 / 编辑指标"  @on-ok="ok" @on-cancel="cancel" width="650" class-name="patientInfo">
      <Form :model="formItem" :label-width="80" ref="formValidate" :rules="ruleValidate">
        <input type="hidden" v-model="formItem.id" placeholder="id">
        <FormItem label="指标名称" prop="name">
            <Input v-model="formItem.name" placeholder="请输入指标名称"></Input>
        </FormItem>
        <FormItem label="指标类型" prop="select">
            <Select v-model="formItem.select">
              <Option value="01">症状</Option>
              <Option value="02">体征</Option>
              <Option value="03">生活方式指导</Option>
              <Option value="04">辅助检查</Option>
              <Option value="05">用药反馈</Option>
              <Option value="06">转诊情况</Option>
              <Option value="07">通用</Option>
            </Select>
        </FormItem>
        <FormItem label="结果类型"  prop="radio">
            <RadioGroup v-model="formItem.radio" @on-change="radioChange">
              <Radio label="string">文本</Radio>
              <Radio label="select">选项</Radio>
              <Radio label="digit">数值</Radio>
            </RadioGroup>
        </FormItem>
        	<FormItem label="指标选项" v-if="radioText" prop="indexName">
            <Input v-model="formItem.indexName" placeholder="请输入指标选项" style="width:80%"></Input>
            <Button type="primary" @click="addItem">添加</Button>
        	</FormItem>
        <FormItem label="预警阀值"  v-if="radioText" prop="model10">
        	<Select v-model="formItem.model10" multiple style="width:260px">
			        <Option v-for="item in optionList" :value="item.value" :key="item.value">{{ item.label }}</Option>
			    </Select>
        </FormItem>
        <FormItem label="预警阀值"  v-if="radioNumber" >
        	<Input v-model="formItem.top" type="text" placeholder="请输入下限" style="width:20%" number prop="top"></Input>
        	<span>-</span>
        	<Input v-model="formItem.bottom" type="text" placeholder="请输入上限" style="width:20%" number></Input>
        </FormItem>
        <FormItem label="备注">
            <Input v-model="formItem.textarea" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="添加备注"></Input>
        </FormItem>
        <FormItem>
            <Button type="primary" @click="addModel('formValidate')">保存</Button>
        </FormItem>
    </Form>
    </Modal>
  </Row>
</template>

<script>
  import {API} from '@/services';
	export default {
		data() {
      const validateAge = (rule, value, callback) => {
          if (!value) {
              return callback(new Error('Age cannot be empty'));
          }
          
          if (!Number.isInteger(value)) {
              callback(new Error('Please enter a numeric value'));
          } else {
          }
         
      };
			return {
				IndexSearch: {
					name: '',
					select: ''
				},
				columns7: [//表格栏
          {
            title: 'id',
            key: 'id',
            align: 'center',
            
          },
          {
            title: '指标名称',
            key: 'name',
            align: 'center',
          },
          {
            title: '指标类型',
            key: 'otype',
            align: 'center',
            render: (h, params) => {
              
              if(params.row.otype == '01') {
                return params.row.otype = '症状'
              }else if(params.row.otype == '02') {
                return params.row.otype = '体征'
              }else if(params.row.otype == '03') {
                return params.row.otype = '生活方式指导'
              }else if(params.row.otype == '04') {
                return params.row.otype = '辅助检查'
              }else if(params.row.otype == '05') {
                return params.row.otype = '用药反馈'
              }else if(params.row.otype == '06') {
                return params.row.otype = '转诊情况'
              }else if(params.row.otype == '07') {
                return params.row.otype = '通用'
              }
              return h('div', {

              }, params.row.otype);
            }
          },
          {
            title: '结果类型',
            key: 'type',
            align: 'center',
            render: (h, params) => {
              if(params.row.type == 'digit') {
                return params.row.type = '数值'
              }else if(params.row.type == 'select') {
                return params.row.type = '选项'
              }else if(params.row.type == 'string') {
                return params.row.type = '文本'
              }
              return h('div', {
              }, params.row.type);
            }
          },
          {
            title: '启用状态',
            key: 'status',
            align: 'center',
            render: (h, params) => {
              if(params.row.status == '0') {
                return params.row.status = '启用'
              }else if(params.row.status == '1') {
                return params.row.status = '停用'
              }
              return h('div', {
              }, params.row.status);
            }
          },
          {
            title: '备注',
            key: 'remark',
            align: 'center',
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
                      API.follSetting.editList({
                        id: params.row.id
                      }).then((res) => {
                        if(res.code == 0) {

                          this.formItem.id = res.data.id
                          this.formItem.name = res.data.name
                          this.formItem.radio = res.data.type
                          this.formItem.select = res.data.otype
                          this.formItem.select2 = res.data.status
                          this.formItem.textarea = res.data.remark
                          this.formItem.top = res.data.thresholdValueStart
                          this.formItem.bottom = res.data.thresholdValueEnd
                          this.formItem.bottom = res.data.thresholdValueEnd
                          console.log(this.formItem.select2)


                          //判断指标类型
                          if(this.formItem.radio == 'select') {
                            this.radioText = true
                            this.radioNumber = false
                          }else if(this.formItem.radio == 'digit') {
                            this.radioNumber = true
                            this.radioText = false
                          }else {
                            this.radioText = false
                            this.radioNumber = false
                          }
                          let oplist = res.data.optionValues;
                          var kk = oplist.split(",");//以逗号作为分隔字符串
                          class Point {
                            constructor(value, label) {
                              this.value = value;
                              this.label = label;
                            }
                          }
                          let p1;
                          for(let i=0; i<kk.length;i++ ){
                            p1 = new Point(kk[i],kk[i])
                            this.optionList.push(p1)
                          }
                          //预警阀值
                          this.formItem.model10 = kk
                          //备注

                          
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

                  },
                  on: {
                    click: () => {
                      console.log(params.row.id)
                      this.deleteRow(params.row.id)
                    }
                  }
                }, '删除')
              ]);
            }
				  }
        ],
        datalist: [],
        pageTotal: 0,
        patientText: false,//添加--修改模态框
        formItem: {
          select: '',
          radio: 'string',
          select2: '',
          textarea: '',
          indexName: '',
          model10: [],
          top: '',
          bottom: ''
        },

        ruleValidate: {
          name: [
            { required: true, message: '指标名称不能为空', trigger: 'blur' }
          ],
          select: [
            { required: true, message: '指标类型不能为空', trigger: 'change' }
          ],
          radio: [
            { required: true, message: '请选择是否放音', trigger: 'change' }
          ],
         
        },
        optionList: [],
        radioText: false,
        radioNumber: false,
			}
		},
    
    mounted() {
      this.list(1)
    },
		methods: {
      /*
      *获取list列表数据
      */
      list(pager) {
        API.follSetting.list({
          pager: pager,
          limit: '10',
        }).then((res) => {
          if(res.code == 0) {
            this.datalist = res.data
            this.pageTotal = res.total
          }else {
            console.log(res.message)
          }
        }).catch((error) => {
          console.log(error)
        })
      },
     /*
      *获取分页列表数据
      */
      currentPage: function (page) {
       API.follSetting.list({
          pager: page,
          limit: '10',
          name: this.IndexSearch.name,
          otype: this.IndexSearch.select
        }).then((res) => {
          if(res.code == 0) {
            this.datalist = res.data
            this.pageTotal = res.total
          }else {
            console.log(res.message)
          }
        }).catch((error) => {
          console.log(error)
        })
      },
      /*
      *查询
      */
      handleSearch() {
        API.follSetting.list({
          pager: 1,
          limit: '10',
          name: this.IndexSearch.name,
          otype: this.IndexSearch.select
        }).then((res) => {
          if(res.code == 0) {
            this.datalist = res.data
            this.pageTotal = res.total
          }else {
            console.log(res.message)
          }
        }).catch((error) => {
          console.log(error)
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
      *添加指标
      */
      addBtn() {
        this.patientText = true
        this.formItem.id = ''
        this.formItem.name = ''
        this.formItem.radio = 'string'
        this.formItem.textarea = ''
        this.formItem.top = ''
        this.formItem.bottom = ''
        this.optionList = []
        this.radioText = false
        this.radioNumber = false
       
      },
      /*
      *确定添加
      */
      addModel(name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.$Message.success('Success!');
            let addPram
            let addPram1 = {
              "id": this.formItem.id,
              "name": this.formItem.name,
              "status": '0',
              "type": this.formItem.radio,
              "otype": this.formItem.select,
              "remark": this.formItem.textarea
            }
            console.log(this.formItem.model10)
            let strModel = this.formItem.model10.join(",")
            let addPram2 = {
              "id": this.formItem.id,
              "name": this.formItem.name,
              "status": '0',
              "type": this.formItem.radio,
              "otype": this.formItem.select,
              "optionValues": strModel,
              "remark": this.formItem.textarea,
            }
            let addPram3 = {
              "id": this.formItem.id,
              "name": this.formItem.name,
              "status": '0',
              "type": this.formItem.radio,
              "otype": this.formItem.select,
              "thresholdValueStart": this.formItem.top,
              "thresholdValueEnd": this.formItem.bottom,
              "remark": this.formItem.textarea
            }
            console.log(addPram1)
            if(this.formItem.radio == 'string') {
              addPram = addPram1
            }
            if(this.formItem.radio == 'digit') {
              addPram = addPram3
            }
            if(this.formItem.radio == 'select') {
              addPram = addPram2
            }
            API.follSetting.addList(addPram).then((res) => {
              if(res.code == 0) {
                console.log(res.message)
                this.formItem.id = ''
                this.formItem.name = ''
                this.formItem.select2 = ''
                this.formItem.select = ''
                this.formItem.radio = 'string'
                this.formItem.textarea = ''
                this.patientText = false;
                this.list(1)
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
      *监听增加/编辑单选状态
      */
			radioChange(value){
				if(value == 'select') {
					this.radioText = true
					this.radioNumber = false
				}else if(value == 'digit') {
					this.radioNumber = true
					this.radioText = false
				}else {
					this.radioText = false
					this.radioNumber = false
				}
			},
			
      /*
      *编辑指标
      */
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
      /*
      *指标选项添加预警阀值
      */
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
    /*
    *预警阀值
    */
  
		
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
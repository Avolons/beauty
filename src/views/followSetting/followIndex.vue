<template>
	<Row>
		<!-- 搜索栏 -->
		<Col span="24" class="searchCol" style="background: #fff;">
			<Form ref="IndexSearch" :model="IndexSearch" :label-width="80" inline style="padding:20px;" class="wayForm">
				<FormItem label="指标名称" class="width200">
          <Input type="text" v-model="IndexSearch.name" placeholder="请输入指标名称"></Input>
        </FormItem>
        <FormItem label="指标类型">
          <Select v-model="IndexSearch.select">
            <Option value="">无</Option>
            <Option value="01">症状</Option>
            <Option value="02">体征</Option>
            <Option value="03">生活方式指导</Option>
            <Option value="04">辅助检查</Option>
            <Option value="05">用药反馈</Option>
            <Option value="06">转诊情况</Option>
            <Option value="07">通用</Option>
          </Select>
        </FormItem>
        <FormItem prop="diseaseName" label="疾病类型">
          <Select v-model="IndexSearch.diseaseName" filterable remote not-found-text="" :remote-method="remoteMethod2" :label-in-value=true clearable @on-change="selectChange" placeholder="请输入名称首字母">
            <Option v-for="(option, index) in options2" :value="option.value" :key="index">{{option.label}}</Option>
          </Select>
        </FormItem>
        <FormItem class="widthPadding">
          <Button type="primary" @click="handleSearch('IndexSearch')">查询</Button>
      	</FormItem>
      	<FormItem class="widthPadding">
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
		<Modal v-model="patientText" title="添加指标 / 编辑指标"  @on-ok="ok" @on-cancel="cancel()" width="650" class-name="patientInfo">
      <Form :model="formItem" :label-width="100" ref="formValidate" :rules="ruleValidate">
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
        <FormItem label="添加疾病类型" prop="diseaseName">
          <Select v-model="formItem.diseaseName" filterable remote :remote-method="remoteMethod2" :loading="loading2" clearable @label-in-value="true"  @on-keyup="keyupSearch($event)" style="width: 70%;float: left;margin-right:20px;" @on-change="selectChange" not-found-text="" :label-in-value=true>
            <Option v-for="(option, index) in options2" :value="option.value" :key="index">{{option.label}}</Option>
          </Select>
          <Button type="primary" @click="addTag" ref="addTagbtn">添加</Button>
        </FormItem>
        <FormItem label="已选疾病类型" prop="selecttagCount">
          <tag v-for="item in tagCount" color="blue" :key="item" :name="item" closable @on-close="tagClose">{{item}}</tag>
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
            title: '疾病类型',
            key: 'diseaseName',
            align: 'center',
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
                      this.formItem.model10 = []
                      this.optionList = []
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
                          let oplist2 = res.data.thresholdValue;//指标阀值所有选项
                          var kk = oplist.split(",");//以逗号作为分隔字符串
                          var kk2 = oplist2.split(",");//以逗号作为分隔字符串
                         
                          class Point {
                            constructor(value, label) {
                              this.value = value;
                              this.label = label;
                            }
                          }
                          let p1;
                          for(let i=0; i<kk.length;i++ ){
                            p1 = new Point(kk[i],kk[i])
                          }
                          let p2;
                          this.optionList1 = []
                          for(let i=0; i<kk2.length;i++ ){
                            p2 = new Point(kk2[i],kk2[i])
                            this.optionList.push(p2)
                          }
                           console.log(this.optionList)
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
                      this.$Modal.confirm({
                        title: 'Title',
                        content: '<p>确定要删除吗?</p>',
                        onOk: () => {
                         this.deleteRow(params.row.id)
                        },
                        onCancel: () => {
                        }
                      })
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
          bottom: '',
          diseaseName: '',//疾病标签 
        },
        options2: [],//疾病标签下拉框数组
        tagCount: [],
        tagCount2: [],           
        loading2: false,
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
        optionList: [],//指标选项的select
        optionList1: [],//指标选项select的label
        radioText: false,
        radioNumber: false,
        defaultData:'',
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
          name: this.IndexSearch.name,
          otype: this.IndexSearch.select,
          diseaseId: this.selectValue
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
          otype: this.IndexSearch.select,
          diseaseId: this.selectValue
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
          otype: this.IndexSearch.select,
          diseaseId: this.selectValue
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
            let addPram
            let addPram3 = {
              "id": this.formItem.id,
              "name": this.formItem.name,
              "diseaseId": this.tagCount2.join(','),
              "status": '0',
              "type": this.formItem.radio,
              "otype": this.formItem.select,
              "optionValues": this.formItem.model10.join(","),
              "thresholdValue": this.optionList1.join(','),
              "thresholdValueStart": this.formItem.top,
              "thresholdValueEnd": this.formItem.bottom,
              "remark": this.formItem.textarea
            }
            API.follSetting.addList(addPram3).then((res) => {
              if(res.code == 0) {
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
        // this.$Message.info('Clicked ok');
      },
      cancel (name) {
        // this.$refs[name].resetFields();
       // this.defaultData = JSON.parse(JSON.stringify(this.$data.formItem));//清空表单
       // this.$data = Object.assign(this.$data, this.defaultData)
       this.selectLabel = ''
      },
      //编辑模态框提交按钮
      handleEdit(name) {
        this.$refs[name].validate((valid) => {})
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
        this.optionList1.push(this.formItem.indexName)
       

    		console.log(this.optionList1)
        this.formItem.indexName = ''
    	},
      /*
      *获取选中的疾病标签列value
      */
      selectChange(value) {
        this.selectLabel = value.label
        this.selectValue = value.value
        console.log(value)
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
              this.IndexSearch.diseaseName = ''
            }

            
          }else {
            console.log(res)
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
              this.IndexSearch.diseaseName = ''
            }

            
          }else {
            console.log(res)
          }
        }).catch((error) => {
          console.log(error)
        })
      },
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
  .wayForm {
    .ivu-form-item {
      width: 240px;
    }
    .ivu-form-item:nth-of-type(4), .ivu-form-item:nth-of-type(5){
      width: 100px;
      .ivu-form-item-content {
          margin-left: 30px!important;
        }
      } 
  }
</style>
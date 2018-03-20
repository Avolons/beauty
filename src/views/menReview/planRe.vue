<template>
	<Row class="planRe">
		<!-- 搜索栏 -->
		<Col span="24">
		<Row class="planRe_main_search" :gutter="15">
			<Col span="6">
			<span>
				客户姓名
			</span>
			<Input type="text" v-model="searchParams.brxm" placeholder="请输入客户姓名"></Input>
			</Col>
			<Col span="6">
			<span>
				随访方案
			</span>
			<Input type="text" v-model="searchParams.schemeName" placeholder="请输入随访方案"></Input>
			</Col>
			<!-- <Col span="6">
			<span>
				审核状态
			</span>
			<Select v-model="searchParams.status">
				<Option v-for="item in statusList" :value="item.id" :key="item.id">{{item.name}}</Option>
			</Select>
			</Col> -->
			<Col span="6">
			<span>
				医生
			</span>
			<Input type="text" v-model="searchParams.adminName" placeholder="请输入医生姓名"></Input>
			</Col>
			<Col span="6">
			<span>
				操作者
			</span>
			<Input type="text" v-model="searchParams.operator" placeholder="请输入操作者姓名"></Input>
			</Col>
			<Col span="6">
			<Button type="primary" @click="searchParams.pager=1;getData()">查询</Button>
			</Col>
		</Row>
		</Col>
		<!-- 表格 -->
		<Col span="24" class="fpTable">
		<Table @on-selection-change="selectChange" ref="selection" border :columns="config" :data="dataList" class="margin-bottom-10"></Table>
		<Row class="planRe_main_page">
			<Button @click="handleSelectAll(true)">全选</Button>
			<Button v-if="!menuShow(this.AM.Data.passPlan)" type="primary" @click="passPlan(haveSelect,2)">通过</Button>
			<Button v-if="!menuShow(this.AM.Data.passPlan)" type="warning" @click="passPlan(haveSelect,1)">不通过</Button>
			<Page style="float:right" :total="totalPage" @on-change="changePage" :current="searchParams.pager" show-elevator show-total></Page>
		</Row>
		</Col>
		<!-- 就诊档案模态框 -->
    <Modal v-model="patientDetail" title="客户信息" class-name="patientInfo" :styles="{top: '36px'}" width="1000">
      <Row class="infoRow">
        <Col span="12" class="info-col mb12">
          <div class="info">
            <div class="info-row">
              <div class="info-one bb1">姓名</div>
              <div class="info-two bdx1">{{currentData.brxm}}</div>
            </div>
            <div class="info-row">
              <div class="info-one">性别</div>
              <div class="info-two">{{currentData.brxb}}</div>
            </div>
          </div>
        </Col>
        <Col span="12" class="info-col mb12">
          <div class="info">
            <div class="info-row">
              <div class="info-one bb1">电话</div>
              <div class="info-two bdx1">{{currentData.jtdh}}</div>
            </div>
            <div class="info-row">
              <div class="info-one">地址</div>
              <div class="info-two">{{currentData.xzzQtdz}}</div>
            </div>
          </div>
        </Col>
        <Col span="12" class="info-col mb12">
          <div class="info">
            <div class="info-row">
              <div class="info-one bb1">年龄</div>
              <div class="info-two bdx1">{{currentData.age}}</div>
            </div>
            <div class="info-row">
              <div class="info-one">民族</div>
              <div class="info-two">{{currentData.mz}}</div>
            </div>
          </div>
        </Col>
        <Col span="12" class="info-col mb12">
          <div class="info">
            <div class="info-row">
              <div class="info-one bb1">出生年月</div>
              <div class="info-two bdx1">{{currentData.csny}}</div>
            </div>
            <div class="info-row">
              <div class="info-one">身份证号</div>
              <div class="info-two">{{currentData.sfzh}}</div>
            </div>
          </div>
        </Col>
        <Col span="12" class="info-col mb12">
          <div class="info">
            <div class="info-row">
              <div class="info-one bb1">紧急联系人</div>
              <div class="info-two bdx1">{{currentData.lxrm}}</div>
            </div>
            <div class="info-row">
              <div class="info-one">关系</div>
              <div class="info-two">{{currentData.lxgx}}</div>
            </div>
          </div>
        </Col>
        <Col span="12" class="info-col mb12">
          <div class="info">
            <div class="info-row">
              <div class="info-one bb1">联系地址</div>
              <div class="info-two bdx1">{{currentData.lxdz}}</div>
            </div>
            <div class="info-row">
              <div class="info-one">联系电话</div>
              <div class="info-two">{{currentData.lxdh}}</div>
            </div>
          </div>
        </Col>
        <Col span="12" class="info-col mb12">
          <div class="info" style="height: 32px;">
            <div class="info-row">
              <div class="info-one bdx1">单位</div>
              <div class="info-two bdx1">{{currentData.dwmc}}</div>
            </div>
          </div>
        </Col>
        <!-- 门诊 -->
        <Col span="24" class="info-co-public" v-if="mjzData.length" v-for="item,index in mjzData" :key="index">
          <Row class="infoRow2">
            <Col span="4" class="sfCol4">
            <div class="counts">
              <p class="suifang">门诊</p>
            </div>
            </Col>
            <Col span="20" class="sfCol20">
            <h3 class="sfName">{{currentData.brxm}}</h3>            
            <Row>
              <Col span="12">
                <span>就诊卡号:</span><span>{{currentData.jzkh}}</span>
              </Col>
              <Col span="12">
                <span>客户性质:</span><span>{{currentData.brxz}}</span>
              </Col>
              <Col span="12">
                <span>就诊时间:</span><span>{{item.jzrq}}</span>
              </Col>
              <Col span="12">
                <span>是否初诊:</span><span>44</span>
              </Col>
              <Col span="12">
                <span>就诊科室:</span><span>{{item.ksmc}}</span>
              </Col>
              <Col span="12">
                <span>就诊医生:</span><span>{{item.ysxm}}</span>
              </Col>
              <Col span="12">
                <span>主诉:</span><span>{{item.zs}}</span>
              </Col>
              <Col span="12">
                <span>诊断:</span><span>{{item.zdmc}}</span>
              </Col>
            </Row>
            </Col>
          </Row>
        </Col>
        <!-- 住院 -->
        <Col span="24" class="info-co-public" v-if="zyData.length" v-for="item1,index1 in zyData" :key="index1">
          <Row class="infoRow2">

            <Col span="4" class="sfCol4">
            <div class="counts">
              <p class="suifang">住院</p>
            </div>
            </Col>
            <Col span="20" class="sfCol20">
            <h3 class="sfName">{{currentData.brxm}}</h3>            
            <Row>
              <Col span="12">
                <span>住院号:</span><span>{{item1.zyhm}}</span>
              </Col>
              <Col span="12">
                <span>客户性质:</span><span>{{currentData.brxz}}</span>
              </Col>
              <Col span="12">
                <span>入院时间:</span><span>{{item1.admissiontime}}</span>
              </Col>
              <Col span="12">
                <span>出院时间:</span><span>{{item1.leavetime}}</span>
              </Col>
              <Col span="12">
                <span>入院科别:</span><span>{{item1.departname}}</span>
              </Col>
              <Col span="12">
                <span>主治医生:</span><span>{{item1.doctorname}}</span>
              </Col>
              <Col span="12">
                <span>入院诊断:</span><span>{{item1.admissiondiagnose}}</span>
              </Col>
              <Col span="12">
                <span>出院诊断:</span><span>{{item1.leavediagnose}}</span>
              </Col>
              <Col span="12">
                <span>入院情况:</span><span>{{item1.admissiondescription}}</span>
              </Col>
              <Col span="12">
                <span>出院情况:</span><span>{{item1.leavedescription}}</span>
              </Col>
            </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </Modal>
    <!-- 随访计划详情 -->
    <Modal v-model="sfjhModel" title="随访计划详情" class-name="sfjhModel" :styles="{top: '36px'}" width="700">
      <Row class="sfjhContent">
        <Row class="patientMs">
          <Col span="4" offset="4" class="hzName">{{sfjhData.znjqrHzxx.brxm}}</Col>
          <Col span="16" class="hzxq">{{sfjhData.znjqrHzxx.brxb}}<span>/</span>{{sfjhData.znjqrHzxx.age}}</Col>
        </Row>
        <Row class="patientMs2">
          <Col span="4" offset="4" class="hzXx1">疾病诊断:</Col>
           <Col span="16" class="hzXx2">{{sfjhData.icdName}}</Col>
        </Row>
        <Row class="patientMs2">
          <Col span="4" offset="4" class="hzXx1">电话号码:</Col>
           <Col span="16" class="hzXx2">{{sfjhData.znjqrHzxx.jtdh}}</Col>
        </Row>
        <Row class="patientMs2">
          <Col span="4" offset="4" class="hzXx1">就诊日期:</Col>
          <Col span="16" class="hzXx2">{{sfjhData.visitStartTime}}</Col>
        </Row>
        <!-- 随访模板 -->
        <Row class="patientMs2 gray">
          <Col span="4" offset="4" class="hzXx1">随访方案:</Col>
          <Col span="16" class="hzXx2">{{sfjhData.schemeName}}</Col>
        </Row> 
        <Row class="patientMs2 gray">
          <Col span="4" offset="4" class="hzXx1">随访进度:</Col>
          <Col span="16" class="hzXx2">{{sfjhData.totalNum}}</Col>
        </Row>
        <!-- 随访计划时间 -->
        <Row style="height:500px;overflow-y:auto;">
          <Row class="gray" style="font-size:14px;padding-top:20px;" v-for="(item,index) in sfjhData.orders" :key="index">
            <Col span="20" offset="4">{{item.startDate}}</Col>
            <Row style="padding-left:200px;">
              <Col span="6" v-for="(item1,index1) in item.CollectionIndex" :key="index1+1" style="line-height:30px;">{{item1}}</Col> 
            </Row>
          </Row>
        </Row>
      </Row>
      <Row slot="footer">
      </Row>
    </Modal>
	</Row>
</template>

<script>
import { API } from '@/services/index.js';
export default {
	data() {
		return {
			//搜索选项
			searchParams: {
				brxm: '',//客户姓名
				schemeName: '',//随访方案
				brxm: "",
				adminName: "",
				operator: "",
				type: 1,
				status: '',//审核状态
				pager: 1,//
				limit: 10,//每页条数
			},
			//列表配置
			config: [
				{
					type: 'selection',
					width: 60,
					align: 'center'
				},
				{
					title: '客户姓名',
					key: 'brxm',
					align: 'center',
          render: (h, params)=>{
            return h('div', [
              h('span', {
                props: {
                    type: 'primary',
                    size: 'small'
                },
                style: {
                    borderBottom: '1px solid #5cadff',
                    color: '#5cadff'
                },
                on: {
                  click: () => {
                    this.getInfo(params.row.hzxxId);
                    this.patientDetail = true;
                  }
                }
              }, params.row.brxm),
            ])
          }
				},
				{
					title: '疾病诊断',
					key: 'icdName',
					align: 'center'
				},
				{
					title: '随访方案',
					key: 'schemeName',
					align: 'center'
				},
				{
					title: '审核状态',
					key: 'statusStr',
					align: 'center',
					render: (h, params) => {
						return h('div', [
							  h('div', {
	              }, params.row.statusStr),
	              h('div', {
	              }, params.row.vetMinuteName)
						]);
					}
				},
				{
					title: '生成时间',
					key: 'dateAdd',
					align: 'center'
				},
				{
					title: '计划开始时间',
					key: 'visitStartTime',
					align: 'center'
				},
				{
					title: '审核时间',
					key: 'dateVet',
					align: 'center'
				},
				{
					title: '医生',
					key: 'adminName',
					align: 'center'
				},
				{
					title: '操作者',
					key: 'operator',
					align: 'center'
				},
				{
					title: '审核操作',
					key: 'action',
					align: 'center',
					width: '200px',
					render: (h, params) => {
						return h('div', [
							h('Button', {
								props: {
									type: 'primary',
									size: 'small'
								},
								style: {
									marginRight: '5px',
								},
								'class': {
								menuHide: this.menuShow(this.AM.Data.passPlan)
								},
								on: {
									click: () => {
										this.passPlan([params.row.id], 2);
									}
								}
							}, '通过'),
							h('Button', {
                props: {
                  type: 'info',
                  size: 'small'
								},
								style: {
									marginRight: '5px'
								},
                'class':{
									menuHide: this.menuShow(this.AM.Data.passPlan)
								},
                on: {
                  click: () => {
                    this.sfjhModel = true;
                    this.detailFun(params.row.id)
                    
                  }
                }
							}, '详情'),
							h('Button', {
								props: {
									type: 'warning',
									size: 'small'
								},
								'class': {
								menuHide: this.menuShow(this.AM.Data.passPlan)
								},
								on: {
									click: () => {
										/** 
										 * 删除计划
										 */
										this.passPlan([params.row.id], 1);
									}
								}
							}, '不通过'),
						]);
					}
				}],
			//列表数据
			dataList: [],
			statusList: [{
				name: "全部",
				id: ""
			}, {
				name: "待审核",
				id: 0
			}, {
				name: "不通过",
				id: 1
			}, {
				name: "审核通过",
				id: 2
			}, {
				name: "已排期",
				id: 3
			}, {
				name: "已取消",
				id: 4
			},],//审核状态选项列表
			id: -1,//当前被选中的数据id
			totalPage: 100,//总页数
			haveSelect: [],
			//当前被点击客户，编辑和详情按钮触发时更换数据
      currentData: {},
      //门急诊信息
      mjzData: [],
      //住院信息
      zyData: [],
      //客户档案模态框
      patientDetail: false,
      //随访计划详情
      sfjhModel: false,
      sfjhData: {
        znjqrHzxx: {
          brxm: '',
        },
      },//随访计划详情
		}
	},
	methods: {
        /** 
		 * 获取列表数据,搜索接口
		 */
		getData() {
			API.Dataaudit.listPlan(this.searchParams).then((res) => {
				this.dataList = this.dataForm(res.data);
				this.totalPage = res.total;
			}).catch((err) => {

			});
		},
		/** 
		 * 页码改变
		 */
		changePage(index) {
			this.searchParams.pager = index;
			this.getData();
		},
		/** 
		 * 选项改变
		 */
		selectChange(select) {
			let arr = [];
			for (let item of select) {
				arr.push(item.id);
			}
			this.haveSelect = arr;
		},
		/** 
		 * 数据格式化
		 */
		dataForm(data) {
			for (const item of data) {
				if (item.status != 0) {
					item._disabled = true;
				}
			}
			return data;
		},
		/** 
		 * 通过审核
		 */
		passPlan(arr, type) {
			console.log(arr);
			this.$Modal.confirm({
				title: '审核确认',
				content: '是否确定执行该操作？',
				onOk: () => {
					API.Dataaudit.passPlan({
						status: type,
						ids: arr
					}).then((res) => {
						this.$Message.success("操作成功");
						this.getData();
					}).catch((err) => {

					});
				}
			});
		},
		/** 
		 * 全选
		 */
		handleSelectAll(status) {
			this.$refs.selection.selectAll(status);
		},
		/** 
     * 查看客户详情
     */
    getInfo(id) {
      API.FollowBussiness.detailPat({
        id: id
      }).then((res) => {
        if(res.data.mjzs.length) {
          this.mjzData = res.data.mjzs
        }
        if(res.data.cyxjs.length) {
          this.zyData = res.data.cyxjs
        } 
        this.currentData = res.data;
      }).catch((err) => {
        console.log(err)

      });
    },
    /**
       * 获取随访计划详情
       */
      detailFun(id) {
        API.FollowBussiness.detail({
          id:id,
        }).then((res)=>{
          console.log(res)
          // this.$Message.success('成功!');
          // this.zzsfModel = false;
          this.sfjhData = res.data;
          if(res.data.orders.length) {
            res.data.orders.forEach((item)=> {
              item.CollectionIndex = item.CollectionIndex.split(',')
            })
          }
        }).catch((err)=>{

        });
      },

	},
	mounted() {
		this.getData();
	}
}
</script>

<style lang="less">
@import "../../styles/jzda.less";
.planRe {
	&_main {
		&_list {}
		&_search {
			box-sizing: border-box;
			/* margin-bottom: 10px; */
			.ivu-col {
				display: flex;
				margin-bottom: 10px;
				>span {
					background-color: #dadada;
					text-align: center;
					line-height: 32px;
					display: block;
					width: 80px;
					flex-shrink: 0;
					border-top-left-radius: 4px;
					border-bottom-left-radius: 4px;
				}
				.ivu-input {
					border-top-left-radius: 0;
					border-bottom-left-radius: 0;
				}
				.ivu-select {
					flex-grow: 1;
					flex-shrink: 1;
				}
				.ivu-select-selection {
					border-top-left-radius: 0;
					border-bottom-left-radius: 0;
				}
			}
		}
		&_page {
			margin-top: 10px;
		}
	}
}
</style>
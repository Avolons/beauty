<template>
    <Row>
        <!-- 搜索栏 -->
        <Col span="24" class="followPlan">
        <Row class="inter-down_main_search" :gutter="15">
                <Col span="6">
                <span>
                    患者姓名
                </span>
                <Input type="text" v-model="searchParams.brxm" placeholder="请输入患者姓名"></Input>
                </Col>
                <Col span="6">
                <span>
                    随访方案
                </span>
                <Input type="text" v-model="searchParams.schemeName" placeholder="请输入随访方案"></Input>
                </Col>
                <Col span="6">
                <span>
                    审核状态
                </span>
                <Select v-model="searchParams.status">
                    <Option v-for="item in statusList" :value="item.id" :key="item.id">{{item.name}}</Option>
                </Select>
                </Col>
                <Col span="6">
                   <Button type="primary" @click="getData">查询</Button>
                </Col>
            </Row>
        </Col>
        <!-- 表格 -->
        <Col span="24" class="fpTable">
        <Table border :columns="config" :data="dataList" class="margin-bottom-10"></Table>
        <Row>
            <Page style="float:right" :total="totalPage" @on-change="changePage" show-elevator show-total></Page>
        </Row>
        </Col>
        <!-- 随访模态框 -->
        <Modal v-model="followShow" title="随访电话" class-name="patientInfo" :styles="{top: '180px'}">
            <Form ref="AIform" :model="AIform" :rules="validate.followPlan" inline :label="80" class="AIform">
                <FormItem prop="AIphone" label="电话">
                    <Input v-model="AIform.AIphone" placeholder="请输入号码" type="text"></Input>
                </FormItem>
                <FormItem>
                    <Button type="primary" @click="submitData('AIform')">提交AI</Button>
                </FormItem>
            </Form>
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
                brxm: '',//患者姓名
                schemeName: '',//随访方案
                status: '',//审核状态
                pager: 1,//
                limit:10,//每页条数
            },
            //列表配置
            config: [
                {
                    title: '患者姓名',
                    key: 'brxm',
                    align: 'center'
                },
                {
                    title: '随访方案',
                    key: 'schemeName',
                    align: 'center'
                },

                {
                    title: '状态',
                    key: 'statusStr',
                    align: 'center'
                },
                {
                    title: '生成时间',
                    key: 'dateAdd',
                    align: 'center'
                },
                {
                    title: '审核时间',
                    key: 'dateVet',
                    align: 'center'
                },
                {
                    title: '操作',
                    key: 'action',
                    width: 250,
                    align: 'center',
                    /** 
                     * 按钮状态
                     * 随访中  停止随访  删除
                     * 未开始  随访     删除
                     * 已暂停  恢复随访  删除
                     * 完成    删除
                     */
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
                                        this.startPlan(params.row.id);
                                    }
                                }
                            }, '随访'),
                            h('Button', {
                                props: {
                                    type: 'warning',
                                    size: 'small'
                                },
                                style: {

                                },
                                on: {
                                    click: () => {
                                        /** 
                                         * 删除计划
                                         */
                                        this.deletPlan(params.row.id);
                                    }
                                }
                            }, '删除')
                        ]);
                    }
                }],
            //列表数据
            dataList: [],
            statusList: [{
                name:"全部",
                id:""
            },{
                name:"待审核",
                id:0
            },{
                name:"不通过",
                id:1
            },{
                name:"审核通过",
                id:2
            },{
                name:"已排期",
                id:3
            },{
                name:"已取消",
                id:4
            },],//审核状态选项列表
            id: -1,//当前被选中的数据id
            totalPage: 100,//总页数
            followShow: false,//编辑模态框
            //随访数据
            AIform: {
                AIphone: '',
            },
        }
    },
    methods: {
        /** 
		 * 获取列表数据,搜索接口
		 */
        getData() {
            API.FollowBussiness.listPlan(this.searchParams).then((res)=>{
				this.dataList=res.data;
				this.totalPage=res.total;
			}).catch((err)=>{

			});
        },
		/** 
		 * 页码改变
		 */
        changePage(index) {
            this.searchParams.pager = index;
            this.getData();
        },
        //随访提交
        submitData(name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    /** 
					 * 此处填写具体的ajax请求
					 */
                    API.FollowBussiness.startPlan({
                        id:this.id,
                        phone:this.AIform.AIphone
                    }).then((res)=>{
                        this.$Message.success('提交成功!');
                        this.followShow = false;
                    }).catch((err)=>{

                    });
                } else {
                    this.$Message.error('请正确填写信息');
                }
            })
        },
        /** 
         * 删除随访计划
         */
        deletPlan(id) {
            this.$Modal.confirm({
				title: '删除设置',
				content: '确定删除该系统设置？',
				onOk: () => {
					API.FollowBussiness.delPlan({
						id: id
					}).then((res) => {
						this.$Message.success("删除成功");
						this.getData();
					}).catch((err) => {

					});
				}
			});
            
        },
        /** 
         * 开始随访
         */
        startPlan(id) {
            this.id = id;
            this.followShow = true;
        },
        /** 
         * 停止计划
         */
        stopPlan(id) {
            API.FollowBussiness.listPat(this.searchParams).then((res)=>{
				this.dataList=res.data;
				this.totalPage=res.total;
			}).catch((err)=>{

			});
            /* 暂停后在回调中刷新当前数据 */
            this.getData();
        }
    },
    mounted () {
        this.getData();
    }
}
</script>

<style lang="less">
@import "../../styles/common.less";
.inter-down {
    &_main {
        &_list {}
        &_search {
            box-sizing: border-box;
            margin-bottom: 10px;
            .ivu-col {
                display: flex;
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
                .ivu-date-picker {
                    width: 100%;
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
.followPlan {
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

.pages {
    .ivu-page {
        float: right;
        padding: 10px 20px 10px 0;
    }
} //模态框垂直居中
.vertical-center-modal {
    display: flex;
    align-items: center;
    justify-content: center;

    .ivu-modal {
        top: 0;
    }
} //详情
.patientInfo .ivu-modal .ivu-modal-content {
    .ivu-modal-header {
        .ivu-modal-header-inner,
        .ivu-modal-header p {
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
} //编辑
.editInfo .ivu-modal .ivu-modal-content {
    .ivu-modal-header {
        .ivu-modal-header-inner,
        .ivu-modal-header p {
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
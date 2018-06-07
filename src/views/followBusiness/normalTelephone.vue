<template>
    <Row>
        <!-- 搜索栏 -->
        <Col span="24" class="followResult">
        <Row class="inter-down_main_search" :gutter="15">
            <Col span="6">
            <span>
                随访编号
            </span>
            <Input type="text" v-model="searchParams.orderno" placeholder="请输入随访编号"></Input>
            </Col>
            <Col span="6">
            <span>
                客户姓名
            </span>
            <Input type="text" v-model="searchParams.brxm" placeholder="请输入客户姓名"></Input>
            </Col>
            <Col span="6">
            <span>
                联系电话
            </span>
            <Input type="text" v-model="searchParams.mobile" placeholder="请输入联系电话"></Input>
            </Col>
            <Col span="6">
            <span>
                随防方案
            </span>
            <Input type="text" v-model="searchParams.schemeName" placeholder="请输入随访方案"></Input>
            </Col>
            <Col span="6" style="height:32px;margin-top:10px">
            <span>
                生成日期：
            </span>
            <DatePicker v-model="time_creat" @on-change="timeChange_one" type="datetimerange"  placeholder="请选择生成日期"></DatePicker>
            </Col>
            <Col span="6" style="height:32px;margin-top:10px">
            <span>
                执行日期：
            </span>
            <DatePicker v-model="time_action" @on-change="timeChange_two" type="daterange"  placeholder="请选择执行日期"></DatePicker>
            </Col>
            <Col span="6" style="height:32px;margin-top:10px">
            <span>
                执行时间：
            </span>
            <TimePicker v-model="time_actionTime" type="timerange" placement="bottom-end" placeholder="请选择执行时间" @on-change="executionTime" @on-clear="clearTime"></TimePicker>
            </Col>
            <Col span="6" style="margin-top:10px">
            <span>
                呼叫次数
            </span>
            <Select v-model="searchParams.callTime">
                <Option v-for="item in CallTimes" :value="item.id" :key="item.id">{{item.name}}</Option>
            </Select>
            </Col>
            <Col span="6" style="margin-top:10px">
            <span>
                有无意向
            </span>
            <Select v-model="searchParams.intention">
                <Option v-for="item in isIntention" :value="item.id" :key="item.id">{{item.name}}</Option>
            </Select>
            </Col>
            <Col span="6" style="margin-top:10px">
            <span>
                通话时长
            </span>
            <InputNumber  :min="0" v-model="searchParams.startDuration" @on-change="changeTalkStart"></InputNumber>
            <span style="background: none;width:30px;">--</span>
            <InputNumber  :min="searchParams.startDuration" v-model="searchParams.endDuration" @on-change="changeTalk"></InputNumber>
            </Col>
            <Col span="6" style="margin-top:10px">
            <Button @click="restParams" type="info" style="margin-right:20px;">重置</Button>
            <Button @click="searchParams.pager=1;normalCallDateList()" type="primary">查询</Button>
            </Col>
        </Row>
        </Col>
        <!-- 表格 -->
        <Col span="24" class="fpTable">
        <Table @on-selection-change="selectAll" @on-select-cancel="cancelSingle" ref="selection" border :columns="config" :data="dataList" class="margin-bottom-10" :loading="createLoading"></Table>
        <Row>
            <Button v-if="!menuShow(this.AM.FollowBussiness.visitorDerexport)" @click="cancelAllResult" :type="idSelectArr.length>0?'primary':'dashed'">导出选择项</Button>
            <Button v-if="!menuShow(this.AM.FollowBussiness.visitorDerexport)" @click="handleSelectAll" :type="dataList.length>0?'primary':'dashed'" >全部导出</Button>
            <Page style="float:right" :current="searchParams.pager" :total="totalPage" @on-change="changePage" show-elevator show-total></Page>
        </Row>
        </Col>
        <!-- 随访模态框 -->
        <Modal v-model="follInfo" title="随访详情" width="950" class-name="patientInfo" :styles="{top: '180px'}">
            <Collapse>
                <Panel name="1">
                    随访结果
                    <div slot="content" class="followResult_table">
                        <Form :model="formLeft" label-position="left" :label-width="100">
                            <Row>
                                <Col span="12">
                                <FormItem label="客户姓名">
                                    <Input v-model="formLeft.brxm" placeholder="Enter something..." readonly></Input>
                                </FormItem>
                                </Col>
                                <Col span="12">
                                <FormItem label="联系电话">
                                    <Input v-model="formLeft.mobile" placeholder="Enter something..." readonly></Input>
                                </FormItem>
                                </Col>
                                <Col span="12">
                                <FormItem label="随访方案">
                                    <Input v-model="formLeft.schemeName" placeholder="Enter something..." readonly></Input>
                                </FormItem>
                                </Col>
                                <Col span="12">
                                <FormItem label="是否有意向">
                                    <RadioGroup v-model="formLeft.intention">
                                        <Radio label="1" disabled>是</Radio>
                                        <Radio label="0" disabled>否</Radio>
                                    </RadioGroup>
                                </FormItem>
                                </Col>
                            </Row>
                        </Form>
                        <table border="1">
                            <tr>
                                <td>呼叫次数</td>
                                <td>执行时间</td>
                                <td>通话时长</td>
                                <td>通话状态</td>
                            </tr>
                            <tr v-for="item,index in orderResultList">
                                <td>第{{index+1}}次</td>
                                <td>{{item.dateAdd}}</td>
                                <td>{{item.duration}}</td>
                                <td>{{item.statusStr}}</td>
                            </tr>
                        </table>
                    </div>
                </Panel>
                <Panel name="2">
                    记录详情
                    <ul slot="content" class="followResult_message">
                        <template v-for="item,index in orderReplyQuestionList">
                            <li class="followResult_single_ai">
                                <Icon type="android-call"></Icon>
                                <span>
                                    {{item.question}}
                                </span>
                            </li>
                            <li class="followResult_single_pat">
                                <span>
                                    <audio controls :src="item.audio"></audio>
                                </span>
                                <Icon type="person"></Icon>
                            </li>
                        </template>
                    </ul>
                </Panel>
            </Collapse>
        </Modal>

        <!--选择导出的数量-->
        <Modal v-model="modal3" @on-cancel="configCancelAction" class-name="exportNum" @on-ok="configNumExport" :mask-closable="false" :loading="loading ">
            <p>已选择
                <span style="color: red;">{{!allExp?idSelectArr.length:totalPage}}</span>位客户，是否确认导出</p>
        </Modal>

        <div id="fixDownload" v-if="showLayer">
            <Spin size="large"></Spin>
            <div class="dataLoading">由于数据过多，请耐心等候...</div>
        </div>
    </Row>
</template>

<script>
import { API } from '@/services/index.js';
export default {
    data() {
        return {
            time_creat:[],
            time_action:[],
            time_actionTime:[],
            // 随访结果
            formLeft: {
                brxm: '',     // 客户姓名
                mobile: '',     // 联系电话
                schemeName: '', // 随访方案
                intention: 1     // 是否有意向
            },
            showLayer: false,
            orderResultList: [],     // 随访次数
            orderReplyQuestionList: [],  // 随访详情
            CallTimes: [   // 通话次数
                {
                    name: '全部',
                    id: ''
                },
                {
                    name: '1',
                    id: '1'
                },
                {
                    name: '2',
                    id: '2'
                },
                {
                    name: '3',
                    id: '3'
                }
            ],
            isIntention: [   // 是否有意向
                {
                    name: '全部',
                    id: ''
                },
                {
                    name: '有意向',
                    id: '1'
                },
                {
                    name: '无意向',
                    id: '0'
                }
            ],
            loading: true,
            listSelect: [],
            ConversationDetail: false,  // 通话详情
            // 搜索选项
            createLoading: true,   // loading动画加载
            searchParams: {
                limit: 10, // 每页条数
                pager: 1, // 第几页
                startDuration : null,
                endDuration: null,
                brxm: '',   // 客户姓名
                mobile: '',  // 手机号
                schemeName: '', // 方案名称
                callTime: '',  // 呼叫次数
                intention: '',  // 是否有意向 （ 1:有  0：无）
                dateAddStart: '',  // 生成开始时间
                dateAddEnd: '',   // 生成结束时间
                datebeginStart: '',  // 执行开始时间
                datebeginEnd: '',    // 执行结束时间
                backStatus: '2',     // 通话状态
                orderno: '',       // 随访编号
                isExport: '',        // 是否导出过（是：1  否：0）
                timeBegin:"",    //执行开始时间段（如：11:00:00）
                timeEnd:""     //执行结束时间段（如：16:59:59）
            },
            modal3: false,   // 导出数量
            totalPage: 100, // 总页数
            // 随访记录详情
            planInfo: {
                orderReplyQuestions: []
            },
            // 表格配置
            config: [
                {
                    type: 'selection',
                    width: 60,
                    align: 'center'
                },
                {
                    title: '序号',
                    type: 'index',
                    align: 'center',
                    width: 70
                },
                {
                    title: '随访编号',
                    key: 'orderNo',
                    align: 'center'
                },
                {
                    title: '客户姓名',
                    key: 'brxm',
                    align: 'center'
                },
                {
                    title: '联系电话',
                    key: 'mobile',
                    align: 'center'

                },
                {
                    title: '随访方案',
                    key: 'schemeName',
                    align: 'center'
                },
                {
                    title: '生成时间',
                    key: 'dateAdd',
                    align: 'center'
                },
                {
                    title: '执行日期',
                    key: 'dateEnd',
                    align: 'center'
                },
                {
                    title: '执行时间',
                    key: 'timeBegin',
                    align: 'center'
                },
                {
                    title: '呼叫次数',
                    key: 'callTime',
                    align: 'center'
                },
                {
                    title: '有无意向',
                    key: 'intention',
                    align: 'center',
                    render: (h, params) => {
                        if (params.row.intention) {
                            return '有';
                        } else {
                            return '无';
                        }
                    }
                },
                {
                    title: '通话时长',
                    key: 'duration',
                    align: 'center'
                },
                {
                    title: '操作',
                    key: 'action',
                    width: 220,
                    align: 'center',
                    render: (h, params) => {
                        return h('div', [
                            h('Button', {
                                props: {
                                    type: 'primary',
                                    size: 'small',
                                },
                                style: {
                                    marginRight: '5px'
                                },
                                'class': {
                                    menuHide: this.menuShow(this.AM.FollowBussiness.editorRecord)
                                },
                                on: {
                                    click: () => {
                                        /**
                                         * 该处类型判断
                                         */
                                        this.showInfo(params.row.id);
                                    }
                                }
                            }, '详情'),
                            h('Button', {
                                props: {
                                    type: 'warning',
                                    size: 'small'
                                },
                                style: {

                                },
                                'class': {
                                    menuHide: this.menuShow(this.AM.FollowBussiness.deleteRecord)
                                },
                                on: {
                                    click: () => {
                                        this.deletResult(params.row.id);
                                    }
                                }
                            }, '删除')
                        ]);
                    }
                }],
            // 表格data
            dataList: [],
            follInfo: false, // 详情模态框
            // 当前被点击客户，编辑和详情按钮触发时更换数据
            currentData: {},
            // 门急诊信息
            mjzData: [],
            // 住院信息
            zyData: [],
            // 详情模态框
            patientDetail: false,
            haveSelect: [],
            clickAll: false, // 是否是批量选择，
            allExp: false,   // 记录全部导出,
            idAllArr: [],   // 记录选中的所有的值
            idSelectArr: [],  // 记录选中哪些去掉重复的值
            exportSelectFlag: true,  // 判断是否是导出选择性还是全选
            recordTotal: 0,  // 记录选中多少条
            isall: 0,  // 0代表导出选择项 1。代表导出所有
        };
    },
    methods: {
        restParams(){
            this.searchParams= {
                limit: 10, // 每页条数
                pager: 1, // 第几页
                startDuration : null,
                endDuration: null,
                brxm: '',   // 客户姓名
                mobile: '',  // 手机号
                schemeName: '', // 方案名称
                callTime: '',  // 呼叫次数
                intention: '',  // 是否有意向 （ 1:有  0：无）
                dateAddStart: '',  // 生成开始时间
                dateAddEnd: '',   // 生成结束时间
                datebeginStart: '',  // 执行开始时间
                datebeginEnd: '',    // 执行结束时间
                backStatus: '2',     // 通话状态
                orderno: '',       // 随访编号
                isExport: '',        // 是否导出过（是：1  否：0）
                timeBegin:"",    //执行开始时间段（如：11:00:00）
                timeEnd:""     //执行结束时间段（如：16:59:59）
            };
            this.time_creat=[];
            this.time_action=[];
            this.time_actionTime=[];
        },
        /**
         * 执行时间
         **/
        executionTime(val){
            this.searchParams.timeBegin =val[0];
            this.searchParams.timeEnd =val[1];
        },
        /**
         * 清除时间
         **/
        clearTime(){
            this.searchParams.timeBegin ='';
            this.searchParams.timeEnd = '';
        },
        /**
         * 通话时长开始
         **/
        changeTalk(val) {
            this.searchParams.endDuration = Math.ceil(val);
        },
        /**
         * 通话时长结束
         **/
        changeTalkStart(val){
            this.searchParams.startDuration = Math.ceil(val);
            this.searchParams.endDuration = Math.ceil(val);
        },
        /**
         * 导出选择项
         **/
        cancelAllResult() {
            if (this.idSelectArr.length == 0) {
                return false;
            }
            this.isall = 0;
            this.allExp = false;
            this.exportSelectFlag = true;
            this.modal3 = true;
            /* this.recordTotal = this.idSelectArr.length; */
        },
        /**
         * 设置全选 点击全部导出按钮
         */
        handleSelectAll(status) {
            if(this.dataList.length==0){
                /* this.$Message.error("没有选中任何数据"); */
                return false;
            }
            this.isall = 1;
            this.allExp = true;
            this.exportSelectFlag = false;
            /* this.$refs.selection.selectAll(status); */
            this.modal3 = true;
        },
        /**
         * 取消导出
         * */
        configCancelAction() {
            this.allExp = false;
            this.idSelectArr = [];
            /* this.idAllArr = [];
            this.haveSelect = []; */
            this.exportSelectFlag = true;
            /* this.normalCallDateList(); */
        },
        /**
         * 确定导出
         * */
        configNumExport() {
            this.allExp = false;
            this.exportSelectFlag = true;
            /* this.normalCallDateList(); */
            this.loading = false;
            this.$nextTick(() => {
                this.loading = true;
                this.modal3 = false;
            });
            this.showLayer = true;
            if (!this.isall) {
                let data = {};
                data.isall = 0;
                data.ids = String(this.idSelectArr);
                this.visitorDerExportList(data);
            } else {
                this.idSelectArr = [];
                let data = {};
                data = {
                    isall: 1,
                    brxm: this.searchParams.brxm,
                    mobile: this.searchParams.mobile,
                    schemeName: this.searchParams.schemeName,
                    callTime: this.searchParams.callTime,
                    intention: this.searchParams.intention,
                    dateAddStart: this.searchParams.dateAddStart,
                    dateAddEnd: this.searchParams.dateAddEnd,
                    datebeginStart: this.searchParams.datebeginStart,
                    datebeginEnd: this.searchParams.datebeginEnd,
                    isExport: this.searchParams.isExport,
                    orderno: this.searchParams.orderno,
                    startDuration : this.searchParams.startDuration,
                    endDuration: this.searchParams.endDuration,
                    backStatus: 2
                };
                this.visitorDerExportList(data);
            }
            /* this.idAllArr = [];
            this.haveSelect = []; */
        },
        /**
         * 导出参数
         **/
        visitorDerExportList(data) {
            API.FollowBussiness.visitorDerExport(data).then((res) => {
                if (res.code == 0) {
                    // window.location.href = 'http://192.168.1.215:8080/'+ res.data;
                    window.location.href = '/' + res.data;
                    this.showLayer = false;
                    /* this.idAllArr = [];
                    this.haveSelect = []; */
                    this.idSelectArr = [];
                }
            }).catch((err) => {
                // 弹出错误信息
                this.$Message.error(err);
            });
        },
        /***
         * 取消单个选泽项
         **/
        cancelSingle(selection, row) {
            if (this.idSelectArr.length) {
                for (var i = 0; i < this.idSelectArr.length; i++) {
                    if (row.id == this.idSelectArr[i]) {
                        this.idSelectArr.splice(i, 1);
                        break;
                    }
                }
            };
            /* if (this.idAllArr.length) {
                for (var i = 0; i < this.idAllArr.length; i++) {
                    if (row.id == this.idAllArr[i]) {
                        this.idAllArr.splice(i, 1);
                    }
                }
            } */
        },
        /**
         * 全选按扭 选择单项表格按钮 全选当前页
         **/
        selectAll(selection) {
            if (selection.length == 0) {
                for (const item of this.dataList) {
                    for (let i = 0; i < this.idSelectArr.length; i++) {
                        if (this.idSelectArr[i] == item.id) {
                            this.idSelectArr.splice(i, 1);
                            break;
                        }
                    }
                }
            } else {
                for (const item of selection) {
                    this.idSelectArr.push(item.id);
                }
                this.idSelectArr = [...new Set(this.idSelectArr)];
            }
        },
        /**
         * 页码改变
         */
        changePage(index) {
            this.searchParams.pager = index;
            this.normalCallDateList();
        },
        timeChange_one(date) {
            this.searchParams.dateAddStart = date[0];
            this.searchParams.dateAddEnd = date[1];
        },
        timeChange_two(date) {
            this.searchParams.datebeginStart = date[0];
            this.searchParams.datebeginEnd = date[1];
        },
        /**
         * 显示随访详情
         */
        showInfo(id) {
            /**
             * 获取详情并且赋值到临时数据
             */
            API.FollowBussiness.getOrderDetail({
                visitOrderId: id
            }).then((res) => {
                console.log(res)
                this.formLeft = res.data.order;  // 得到随访结果
                this.orderResultList = res.data.orderResultList; // 得到随访次数
                this.orderReplyQuestionList = res.data.orderReplyQuestionList;  // 得到随访详情
            }).catch((err) => {
                // 弹出错误信息
                this.$Message.error(err);
            });
            this.follInfo = true;
        },
        /**
         * 删除随访记录
         */
        deletResult(id) {
            this.$Modal.confirm({
                title: '删除记录',
                content: '确定删除该条记录？',
                onOk: () => {
                    API.FollowBussiness.deleteOrder({
                        ids: id
                    }).then((res) => {
                        this.$Message.success('删除成功');
                        this.normalCallDateList();
                    }).catch((err) => {
                        // 弹出错误信息
                        this.$Message.error(err);
                    });
                }
            });
        },
        /**
         * 获取列表数据
         */
        normalCallDateList() {
            API.FollowBussiness.normalCallList(this.searchParams).then((res) => {

                // 判断是否全部导出 全部导出的时候全部添加图标
                if (this.allExp) {
                    for (const item of res.data) {
                        item._checked = true;
                    }
                }
                if (this.exportSelectFlag) {
                    // 判断选择性导出
                    if (this.idSelectArr.length) {
                        for (const item of res.data) {
                            if (this.idSelectArr.indexOf(item.id) > -1) {
                                item._checked = true;
                            }
                        }
                    }
                }
                this.dataList = res.data;
                this.totalPage = res.count;
                this.createLoading = false;
            }).catch((err) => {
                // 弹出错误信息
                this.$Message.error(err);
            });
        }
    },
    mounted() {
        this.normalCallDateList();
    }
};
</script>

<style lang="less">
@import "../../styles/common.less";
@import "../../styles/jzda.less";
.followResult {
    &_single {
        &_ai {
            padding-right: calc(50% + 10px);
            box-sizing: border-box;
            font-size: 0;
            .ivu-icon {
                font-size: 20px;
                margin-right: 10px;
                width: 20px;
                margin-top: 10px;
            }
            span {
                display: inline-block;
                background-color: #d9edf7;
                border-radius: 4px;
                padding: 10px;
                font-size: 13px;
                box-sizing: border-box;
                vertical-align: top;
                width: calc(~"100% - 30px");
            }
        }
        &_pat {
            padding-left: calc(50% + 10px);
            box-sizing: border-box;
            .ivu-icon {
                font-size: 20px;
                margin-left: 10px;
                width: 20px;
                margin-top: 10px;
                float: right;
            }
            span {
                display: block;
                float: left;
                background-color: #d9edf7;
                border-radius: 4px;
                padding: 10px;
                font-size: 13px;
                box-sizing: border-box;

                width: calc(~"100% - 30px");
                audio {
                    display: inline-block;
                }
            }
            &:after {
                content: "";
                display: block;
                clear: both;
            }
        }
    }
    &_table {
        width: 100%;
        table {
            width: 100%;
            border: 1px solid #dadada;
            border-collapse: collapse;
        }
        tr {
            height: 35px;
            line-height: 35px;
            font-size: 13px;
            &:nth-of-type(odd) {
                background-color: #f7f7f7;
            }
        }
        td {
            text-align: center;
            width: 25%
        }
    }
    form {
        .ivu-form-item {
            margin-bottom: 10px;
            padding: 0;
            width: 200px;
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
.bb1 {
    border-bottom: 1px solid #fff;
}

.bdx1 {
    border-bottom: 1px dotted #EDF3F4;
}

.mb12 {
    margin-bottom: 12px;
}

.redColor {
    color: red;
}

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

.exportNum {
    .ivu-modal-body {
        p {
            text-align: center;
            font-size: 20px;
        }
    }
}

.patientInfo {
    .ivu-form-item-content {
        width: 233px;
    }
}

.ivu-radio-disabled .ivu-radio-inner:after {
    background-color: #2d8cf0;
}

#fixDownload {
    width: 100%;
    height: 100%;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 9999;
    background: white;
    .ivu-spin-large {
        position: absolute;
        width: 100px;
        height: 100px;
        left: 50%;
        top: 300px;
        margin-top: -50px;
    }
    .dataLoading {
        position: absolute;
        width: 200px;
        height: 100px;
        left: 50%;
        top: 400px;
        margin-top: -50px;
        margin-left: -50px;
    }
}
</style>
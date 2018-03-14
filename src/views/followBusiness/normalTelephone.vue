<template>
    <Row>
        <!-- 搜索栏 -->
        <Col span="24" class="followResult">
        <Row class="inter-down_main_search" :gutter="15">
            <Col span="6">
            <span>
				随访编号
			</span>
            <Input type="text" v-model="searchParams.orderNo" placeholder="请输入随访编号"></Input>
            </Col>
            <Col span="6">
            <span>
				客户姓名
			</span>
            <Input type="text" v-model="searchParams.orderNo" placeholder="请输入随访编号"></Input>
            </Col>
            <Col span="6">
            <span>
				联系电话
			</span>
            <Input type="text" v-model="searchParams.orderNo" placeholder="请输入随访编号"></Input>
            </Col>
            <Col span="6">
            <span>
				随防方案
			</span>
            <Input type="text" v-model="searchParams.brxm" placeholder="请输入患者姓名"></Input>
            </Col>
            <Col span="6" style="margin-top:10px">
            <span>
				呼叫次数
			</span>
            <Select v-model="searchParams.status">
                <Option v-for="item in statusList" :value="item.id" :key="item.id">{{item.name}}</Option>
            </Select>
            </Col>
            <Col span="6" style="margin-top:10px">
            <span>
				有无意向
			</span>
            <Select v-model="searchParams.status">
                <Option v-for="item in statusList" :value="item.id" :key="item.id">{{item.name}}</Option>
            </Select>
            </Col>
            <Col span="6" style="height:32px;margin-top:10px">
            <span>
				生成日期：
			</span>
            <DatePicker @on-change="timeChange_one" type="datetimerange" placeholder="请选择生成日期"></DatePicker>
            </Col>
            <Col span="6" style="height:32px;margin-top:10px">
            <span>
				执行日期：
			</span>
            <DatePicker @on-change="timeChange_two" type="datetimerange" placeholder="请选择执行日期"></DatePicker>
            </Col>
            <Col span="6" style="margin-top:10px">
            <Button @click="searchParams.pager=1;getData()" type="primary">查询</Button>
            </Col>
        </Row>
        </Col>
        <!-- 表格 -->
        <Col span="24" class="fpTable">
        <Table @on-selection-change="selectAll" @on-select-cancel="cancelSingle" @on-select="sigleSelct"  ref="selection" border :columns="config" :data="dataList" class="margin-bottom-10" :loading="createLoading"></Table>
        <Row>
            <Button v-if="!menuShow(this.AM.FollowBussiness.cancleall)" @click="cancelAllResult" :type="haveSelect.length>0?'primary':'dashed'">导出选择项</Button>
            <Button  @click="handleSelectAll(true)" type="primary" >全部导出</Button>
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
                                        <Input v-model="formLeft.input" placeholder="Enter something..."></Input>
                                    </FormItem>
                                </Col>
                                <Col span="12">
                                    <FormItem label="联系电话">
                                        <Input v-model="formLeft.input" placeholder="Enter something..."></Input>
                                    </FormItem>
                                </Col>
                                <Col span="12">
                                    <FormItem label="随访方案">
                                        <Input v-model="formLeft.input" placeholder="Enter something..."></Input>
                                    </FormItem>
                                </Col>
                                <Col span="12">
                                    <FormItem label="是否有意向">
                                        <RadioGroup v-model="formLeft.radio">
                                            <Radio label="male">是</Radio>
                                            <Radio label="female">否</Radio>
                                        </RadioGroup>
                                    </FormItem>
                                </Col>
                            </Row>
                        </Form>
                        <table border="1">
                           <tr>
                               <td>呼叫次数</td>
                               <td>执行时间</td>
                               <td>通话状态</td>
                           </tr>
                            <tr>
                                <td>呼叫次数</td>
                                <td>执行时间</td>
                                <td>通话状态</td>
                            </tr>
                        </table>
                    </div>
                </Panel>
                <Panel name="2">
                    记录详情
                    <ul slot="content" class="followResult_message">
                        <template v-for="item in planInfo.orderReplyQuestions">
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
        <Modal v-model="modal3" class-name="exportNum" @on-ok="configNumExport" :mask-closable="false" :loading="loading ">
            <p>已选择<span style="color: red;">1234</span>位客户，是否确认导出</p>
        </Modal>
    </Row>
</template>

<script>
    import { API } from '@/services/index.js';
    export default {
        data () {
            return {
                formLeft: {
                    input1: '',
                    input2: '',
                    input3: '',
                    radio:1
                },
                loading:true,
                listSelect: [],
                ConversationDetail: false,  //通话详情
                //搜索选项
                createLoading: true,   //loading动画加载
                searchParams: {
                    pager: 1, //当前页码
                    limit: 10,//每页条数
                    schemeName: "",//方案名称（可选）
                    orderNo: "",//编码（可选）
                    brxm: "", //患者姓名（可选）
                    status: "",
                    dateAddBegin: "",  //生成开始日期（可选）
                    dateAddEnd: "",  //生成结束日期（可选）
                    dateEndBegin: "", //执行开始日期（可选）
                    dateEndEnd: "",    //执行结束日期（可选）
                    dateVetBegin: "",         //审核开始日期（可选）
                    dateVetEnd: "",         //审核结束日期（可选）
                    dateBeginBegin: "",         //计划开始日期（可选）
                    dateBeginEnd: ""           //计划结束日期（可选）

                },
                modal3:false,   //导出数量
                statusList: [{
                    name: "全部",
                    id: ""
                }, {
                    name: "等待随访",
                    id: 0
                }, {
                    name: "随访中",
                    id: 1
                }, {
                    name: "已随访",
                    id: 2
                }, {
                    name: "已停止",
                    id: 3
                }, {
                    name: "配置错误",
                    id: 4
                },],//审核状态选项列表
                totalPage: 100,//总页数
                //随访记录详情
                planInfo: {
                    orderReplyQuestions: []
                },
                //表格配置
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
                        align: 'center',
                        render: (h, params) => {
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
                        title: '联系电话',
                        key: 'icdName',
                        align: 'center',

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
                        title: '呼叫次数',
                        key: 'vetDate',
                        align: 'center'
                    },
                    {
                        title: '有无意向',
                        key: 'dateBegin',
                        align: 'center',
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
                                        type: params.row.vetStatus != 0 ? 'primary' : 'dashed',
                                        size: 'small',
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    'class': {
                                        menuHide: this.menuShow(this.AM.FollowBussiness.detailLog)
                                    },
                                    on: {
                                        click: () => {
                                            /**
                                             * 该处类型判断
                                             */
                                            if (params.row.vetStatus != 0) {
                                                this.showInfo(params.row.id);
                                            }
                                        }
                                    }
                                }, params.row.vetStatus == 0 ? '详情' : '详情'),
                                h('Button', {
                                    props: {
                                        type: 'warning',
                                        size: 'small'
                                    },
                                    style: {

                                    },
                                    'class': {
                                        menuHide: this.menuShow(this.AM.FollowBussiness.delLog)
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
                //表格data
                dataList: [],
                follInfo: false,//详情模态框
                //当前被点击患者，编辑和详情按钮触发时更换数据
                currentData: {},
                //门急诊信息
                mjzData: [],
                //住院信息
                zyData: [],
                //详情模态框
                patientDetail: false,
                //终止随访
                zzsfModel: false,//弹框
                sfrName: '',//终止随访人姓名
                nowId: '',//终止随访人数据id
                zzsfForm: {
                    select: '',//终止随访原因
                    textarea: '',//终止随访备注
                    radio: '0',
                },
                zzsfFormRule: {//终止随访form验证
                    select: [
                        { required: true, message: '请选择不通过原因', trigger: 'change' }
                    ],
                    textarea: [
                        { required: true, message: '请输入详情', trigger: 'blur' },
                    ]
                },
                sfStatus: '',//当前患者的随访状态
                haveSelect: [],
                clickAll: false,//是否是批量选择，
                allExp:false,   //记录全部导出,
                idAllArr: [],   //记录选中的所有的值
                idSelectArr: [] //记录选中哪些去掉重复的值
            }
        },
        methods: {
            /**
             * 设置全选
             */
            handleSelectAll (status) {
                this.allExp = true;
                this.$refs.selection.selectAll(status);
                this.modal3 = true;
            },
            /**
             * 确定导出
             * */
            configNumExport () {
                this.allExp = false;
                this.getData();
                this.loading = false;
                this.$nextTick(() => {
                    this.loading = true;
                    this.modal3 = false;
                });
            },
            /**
             * 单选 删除
             * */
            sigleSelct(selection,row){
            },
            /***
             * 取消单选
             **/
            cancelSingle(selection,row){
                if (this.idSelectArr.length) {
                    for (var i = 0; i < this.idSelectArr.length; i++) {
                        if (row.orderNo == this.idSelectArr[i]) {
                            this.idSelectArr.splice(i,1);
                        }
                    }
                };

                if( this.idAllArr.length){
                    for (var i = 0; i < this.idAllArr.length; i++) {
                        if (row.orderNo == this.idAllArr[i]) {
                            this.idAllArr.splice(i,1);
                        }
                    }
                }
            },
            /**
             * 全选按扭
             **/
            selectAll(selection) {
                this.haveSelect = selection;
            },
            /**
             * 页码改变
             */
            changePage(index) {
                this.searchParams.pager = index;
                this.getData();
                for (const item of this.haveSelect) {
                    this.idAllArr.push(item.orderNo);
                    this.idSelectArr = [...new Set(this.idAllArr)];
                }
            },
            /**
             * 批量终止随访
             */
            cancelAllResult() {
                if (this.haveSelect.length == 0) {
                    return false;
                }
                // this.$refs.zzsfForm.resetFields();
                // this.zzsfModel = true;
                // this.sfrName = "选中的";
                // this.zzsfForm.select = '';
                // this.zzsfForm.textarea = '';
                // this.clickAll = true;
            },
            timeChange_one(date) {
                this.searchParams.dateAddBegin = date[0];
                this.searchParams.dateAddEnd = date[1];
            },
            timeChange_two(date) {
                this.searchParams.dateEndBegin = date[0];
                this.searchParams.dateEndEnd = date[1];

            },
            timeChange_three(date) {
                this.searchParams.dateVetBegin = date[0];
                this.searchParams.dateVetEnd = date[1];
            },
            timeChange_four(date) {
                this.searchParams.dateBeginBegin = date[0];
                this.searchParams.dateBeginEnd = date[1];
            },
            /**
             * 获取列表数据,搜索接口
             */
            getData() {
                API.FollowBussiness.listLog(this.searchParams).then((res) => {
                    // console.log(res.data._disabled)
                    //res.data._checked = true;
                    // for (const item of res.data) {
                    //
                    //         item._checked = true;
                    //
                    // }

                    if(this.allExp){
                        for (const item of res.data) {
                            item._checked = true;
                        }
                    }

                    if(this.idSelectArr.length){
                        for (const item of res.data) {
                            if(this.idSelectArr.indexOf(item.orderNo)>-1){
                                item._checked = true;
                            }
                        }
                    }



                    this.dataList = res.data;
                    this.totalPage = res.total;
                    this.createLoading = false;


                }).catch((err) => {
                    //弹出错误信息
                    this.$Message.error(err);
                });
            },

            /**
             * 显示随访详情
             */
            showInfo(id) {
                /**
                 * 获取详情并且赋值到临时数据
                 */
                API.FollowBussiness.detailLog({
                    id: id
                }).then((res) => {
                    this.planInfo = res.data;
                    if (res.data.notPassReason != '') {
                        this.zzsfForm.radio = 1;
                        this.zzsfForm.select = res.data.notPassReason;
                        this.zzsfForm.textarea = res.data.notPassRemark;
                    } else {
                        this.zzsfForm.radio = 0;
                    }
                }).catch((err) => {
                    //弹出错误信息
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
                        API.FollowBussiness.delLog({
                            id: id
                        }).then((res) => {
                            this.$Message.success("删除成功");
                            this.getData();
                        }).catch((err) => {
                            //弹出错误信息
                            this.$Message.error(err);
                        });
                    }
                });
            },
            /**
             * 查看患者详情
             */
            getInfo(id) {
                API.FollowBussiness.detailPat({
                    id: id
                }).then((res) => {
                    if (res.data.mjzs.length) {
                        this.mjzData = res.data.mjzs
                    }
                    if (res.data.cyxjs.length) {
                        this.zyData = res.data.cyxjs
                    }
                    this.currentData = res.data;
                }).catch((err) => {
                    //弹出错误信息
                    this.$Message.error(err);

                });
            },
            /**
             * 终止随访按钮
             */
            zzsfFun(name, id, sfStatus, notPassReason, notPassRemark) {
                this.zzsfModel = true;
                this.sfrName = name;
                this.nowId = id;
                this.sfStatus = sfStatus; //获取当前的随访状态,3=停止
                if (sfStatus == '3') {
                    this.$refs.sfStatusBtn.$el.setAttribute('disabled', true)
                } else {
                    this.$refs.sfStatusBtn.$el.removeAttribute('disabled')
                }
                //清空终止随访的旧值
                if (notPassReason != '') {
                    this.zzsfForm.select = notPassReason;
                    this.zzsfForm.textarea = notPassRemark;
                } else {
                    this.zzsfForm.select = '';
                    this.zzsfForm.textarea = '';
                }
            },
            //选择终止随访的原因
            xzReason(value) {
                this.zzsfForm.select = value
            },
            /**
             * 终止随访取消按钮
             */
            zzsfCancel(name) {
                this.$refs[name].resetFields();
                this.zzsfModel = false;
            },
            /**
             * 终止随访确定按钮
             */
            zzsfOk(name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        if (this.selectAll) {
                            let ids=[];
                            for (const item of this.haveSelect) {
                                ids.push(item.id);
                            }
                            API.FollowBussiness.cancleAllResult({
                                ids: ids,
                                notPassReason: this.zzsfForm.select,
                                notPassRemark: this.zzsfForm.textarea,
                            }).then((res) => {
                                this.$Message.success('成功!');
                                this.zzsfModel = false;
                                this.selectAll = false;
                                this.zzsfForm.select = '';
                                this.zzsfForm.textarea = '';
                                this.getData(this.searchParams.pager);
                            }).catch((err) => {
                                //弹出错误信息
                                this.$Message.error(err);
                                this.selectAll = false;
                            });
                        } else {
                            API.Dataaudit.cancelall({
                                id: this.nowId,
                                notPassReason: this.zzsfForm.select,
                                notPassRemark: this.zzsfForm.textarea,
                            }).then((res) => {
                                this.$Message.success('成功!');
                                this.zzsfModel = false;
                                this.getData(this.searchParams.pager)
                            }).catch((err) => {
                                //弹出错误信息
                                this.$Message.error(err);
                            });
                        }

                    } else {
                        this.$Message.error('失败');
                    }
                })
            },

            normalCallDateList () {
                API.FollowBussiness.normalCallList({}).then((res) => {
                    console.log(res);
                })
            }

        },
        mounted () {
            this.getData();
            this.normalCallDateList();
        }
    }
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
    .exportNum{
        .ivu-modal-body {
            p{
                text-align: center;
                font-size: 20px;
            }
        }
    }
    .patientInfo{
        .ivu-form-item-content{
            width:233px;
        }
    }
</style>
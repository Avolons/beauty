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
            <Input type="text" v-model="searchParams.schemeName" placeholder="请输入随防方案"></Input>
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
            <span>
				通话状态
			</span>
            <Select v-model="searchParams.backStatus">
                <Option v-for="item in telephoneState" :value="item.id" :key="item.id">{{item.name}}</Option>
            </Select>
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
            <Button @click="searchParams.pager=1;normalCallDateList()" type="primary">查询</Button>
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
        <Modal v-model="modal3" class-name="exportNum" @on-ok="configNumExport" @on-cancel="configCancelAction" :mask-closable="false" :loading="loading ">
            <p>已选择<span style="color: red;">{{recordTotal}}</span>位客户，是否确认导出</p>
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
                telephoneState: [   //通话状态
                    {
                        name: '全部',
                        id: ''
                    },
                    {
                        name: '呼叫失败',
                        id: '1'
                    },
                    {
                        name: '正常通话',
                        id: '2'
                    },
                    {
                        name: '通话中',
                        id: '3'
                    },
                    {
                        name: '关停机',
                        id: '4'
                    },
                    {
                        name: '无人接听',
                        id: '5'
                    },
                    {
                        name: '空号',
                        id: '6'
                    },
                    {
                        name: '号码有误',
                        id: '7'
                    }
                ],
                CallTimes:[   //通话次数
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
                isIntention:[   //是否有意向
                    {
                        name: '全部',
                        id: ''
                    },
                    {
                        name: '有',
                        id: '1'
                    },
                    {
                        name: '无',
                        id: '0'
                    }
                ],
                loading:true,
                listSelect: [],
                ConversationDetail: false,  //通话详情
                //搜索选项
                createLoading: true,   //loading动画加载
                searchParams: {
                    limit: 10, //每页条数
                    pager: 1, //第几页
                    brxm: '',   //客户姓名
                    mobile: '',  //手机号
                    schemeName: '',//方案名称
                    callTime: '',  //呼叫次数
                    intention: '',  //是否有意向 （ 1:有  0：无）
                    dateAddStart: '',  //生成开始时间
                    dateAddEnd: '',   //生成结束时间
                    datebeginStart: '',  //执行开始时间
                    datebeginEnd: '',    //执行结束时间
                    backStatus: '',     //通话状态
                    orderno: '',       //随访编号
                    isExport: ''        //是否导出过（是：1  否：0）
                },
                modal3:false,   //导出数量
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
                        key: 'mobile',
                        align: 'center',

                    },
                    {
                        title: '随访方案',
                        key: 'schemeName',
                        align: 'center'
                    },
                    {
                        title: '通话状态',
                        key: 'backStatus',
                        align: 'center',
                        render: (h, params ) => {
                            //1 呼叫失败 2 正常通话 3 通话中 4 关停机 5 无人接听 6 空号 7 号码有误'
                            switch (params.row.backStatus) {
                                case '1':
                                    return '呼叫失败'
                                    break;
                                case '2':
                                    return '正常通话'
                                    break;
                                case '3':
                                    return '通话中'
                                    break;
                                case '4':
                                    return '关停机'
                                    break;
                                case '5':
                                    return '无人接听'
                                    break;
                                case '6':
                                    return '空号'
                                    break;
                                case '7':
                                    return '号码有误'
                                    break;
                            }
                        }
                    },
                    {
                        title: '生成时间',
                        key: 'dateAdd',
                        align: 'center'
                    },
                    {
                        title: '执行日期',
                        key: 'dateBegin',
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
                haveSelect: [],
                clickAll: false,//是否是批量选择，
                allExp: false,   //记录全部导出,
                idAllArr: [],   //记录选中的所有的值
                idSelectArr: [], //记录选中哪些去掉重复的值
                recordTotal: 0  //记录选中多少条

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
             * 取消导出
             * */
            configCancelAction () {
                this.allExp = false;
                this.normalCallDateList();
            },
            /**
             * 确定导出
             * */
            configNumExport () {
                this.allExp = false;
                this.normalCallDateList();
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
            selectAll (selection) {
                this.haveSelect = selection;
                for (const item of this.haveSelect) {
                    this.idAllArr.push(item.orderNo);
                    this.idSelectArr = [...new Set(this.idAllArr)];
                }
            },
            /**
             * 页码改变
             */
            changePage (index) {
                this.searchParams.pager = index;
                this.normalCallDateList();
            },
            /**
             * 批量终止随访
             */
            cancelAllResult () {
                if (this.haveSelect.length == 0) {
                    return false;
                }
                this.recordTotal = this.idSelectArr.length;
                this.modal3 = true;
            },
            /**
             * 生成日期
             * dateAddStart: '',
             * //生成开始时间dateAddEnd: '',
             * //生成结束时间datebeginStart: '',
             * //执行开始时间datebeginEnd: '',
             * //执行结束时间
             **/
            timeChange_one(date) {
                this.searchParams.dateAddStart = date[0];
                this.searchParams.dateAddEnd = date[1];
            },
            /**
             * 执行日期
             **/
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
             *  获取列表数据
             */
            normalCallDateList () {
                API.FollowBussiness.normalCallList(this.searchParams ).then((res) => {
                    //判断是否全部导出 全部导出的时候全部添加图标
                    if (this.allExp) {
                        for (const item of res.data) {
                            item._checked = true;
                        }
                    }
                    //判断选择性导出
                    if(this.idSelectArr.length){
                        for (const item of res.data) {
                            if(this.idSelectArr.indexOf(item.orderNo)>-1){
                                item._checked = true;
                            }
                        }
                    }
                    this.dataList = res.data;
                    this.totalPage = res.count;
                    this.createLoading = false;
                })
            }

        },
        mounted () {
            //this.getData();
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
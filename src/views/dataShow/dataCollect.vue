<style lang="less">
@import "./home.less";
@import "../../styles/common.less";
</style>
<template>
    <div class="home-main">
        <Row :gutter="5" type="flex" justify="space-between">
            <Col :xs="24" :sm="8" :md="8" :lg="5" :style="{marginBottom: '10px'}">
            <else-card id-name="user_created_count_coll" :end-val="topData[0]" iconType="person-stalker" color="#2d8cf0" intro-text="所有客户"></else-card>
            </Col>
            <Col :xs="24" :sm="8" :md="8" :lg="5" :style="{marginBottom: '10px'}">
            <else-card id-name="visit_count_coll" :end-val="topData[1]" iconType="pie-graph" color="#2d8cf0" intro-text="已随访客户"></else-card>
            </Col>
            <Col :xs="24" :sm="8" :md="8" :lg="5" :style="{marginBottom: '10px'}">
            <else-card id-name="collection_count_coll" :end-val="topData[2]" iconType="person-add" color="#2d8cf0" intro-text="待随访客户"></else-card>
            </Col>
            <Col :xs="24" :sm="12" :md="12" :lg="4" :style="{marginBottom: '10px'}">
            <else-card id-name="follow_time_coll" :end-val="topData[3]" iconType="ios-stopwatch" color="#2d8cf0" intro-text="已随访次数"></else-card>
            </Col>
            <Col :xs="24" :sm="12" :md="12" :lg="4" :style="{marginBottom: '10px'}">
            <else-card id-name="message_count_coll" :end-val="topData[4]" iconType="chatbox-working" color="#2d8cf0" intro-text="短信发送总数"></else-card>
            </Col>
        </Row>
        <Row :gutter="5">
            <Card class="follow_box">
                <p slot="title" class="card-title">
                    <Icon type="android-map"></Icon>
                    随访情况统计
                    <Button type="primary" icon="search" style="float:right;margin-left:15px" @click="getFollowData">确定</Button>
                    <DatePicker type="daterange" @on-change="timeChange" placement="bottom-end" placeholder="请选择日期" style="width: 300px"></DatePicker>
                </p>
                <Row :gutter="10">
                    <Col :md="24" :lg="24" :style="{margin: '20px 0',height:'100%'}">
                    <Row type="flex" align="middle">
                        <Col :xs="24" :sm="8" :md="8" :lg="8">
                        <infor-card :params="followCount.param" id-name="followCount_coll" id-names="followCounts_coll" :end-val="followCount.numArray" iconType="ios-paper" color="#2d8cf0" :intro-text="followCount.title"></infor-card>
                        </Col>
                        <Col :xs="24" :sm="8" :md="8" :lg="8">
                        <infor-card :params="phoneTime.param" id-name="phoneTime_coll" id-names="phoneTimes_coll" id-namess="messageCounts_coll" :end-val="phoneTime.numArray" iconType="ios-telephone" color="#64d572" :intro-text="phoneTime.title"></infor-card>
                        </Col>
                        <Col :xs="24" :sm="8" :md="8" :lg="8">
                        <infor-card :params="messageCount.param" id-name="messageCount_coll" :end-val="messageCount.numArray" iconType="ios-email" color="#ffd572" :intro-text="messageCount.title"></infor-card>
                        </Col>
                    </Row>
                    </Col>
                    <Col v-show="phoneList.length>0" :xs="24" :md="24" :lg="12" :style="{marginBottom: '10px',height:'100%'}">
                    <h3 style="text-align:center">通话状态分布</h3>
                    <data-source-pie ref="phone" :data="phoneList"></data-source-pie>
                    </Col>
                    <Col v-show="likeList.length>0" :xs="24" :md="24" :lg="12" :style="{marginBottom: '10px',height:'100%'}">
                    <h3 style="text-align:center">有无意向百分比</h3>
                    <service-requests ref="like" :data="likeList"></service-requests>
                    </Col>
                </Row>
            </Card>
        </Row>
    </div>
</template>

<script>
import Cookies from 'js-cookie';
import { API } from '@/services'
import dataSourcePie from './components/dataSourcePie.vue';
import visiteVolume from './components/visiteVolume.vue';
import serviceRequests from './components/serviceRequests.vue';
import inforCard from '../home/components/inforCard.vue';
import elseCard from '../home/components/elseCard.vue';
export default {
    name: 'home',
    components: {
        dataSourcePie,
        visiteVolume,
        serviceRequests,
        inforCard,
        elseCard
    },
    data() {
        return {
            /** 
              * 基础数据
              */
            topData: {
                0:0,
                1:0,
                2:0,
                3:0,
                4:0,
            },

            /** 实际随访数量 */
            followCount: {
                title: "实际随访数量",
                param: ["正常通话", "有意向客户"],
                numArray: [0, 0],
            },
            /** 通话时长 */
            phoneTime: {
                title: "通话时长",
                param: ["正常通话≤30秒", "正常通话31<=60秒", "正常通话>60秒"],
                numArray: [0, 0, 0],
            },
            /** 
             * 短信统计情况
             */
            messageCount: {
                title: "短信统计",
                param: ["发送数"],
                numArray: [0],
            },
            dateObj: {
                dateEndBegin: "",
                dateEndEnd: "",
            },
            phoneList: [
                {
                    value: 0,
                    name: "呼叫失败"
                },
                {
                    value: 0,
                    name: "正常通话"
                },
                {
                    value: 0,
                    name: "关停机"
                },
                {
                    value: 0,
                    name: "空号"
                },
                {
                    value: 0,
                    name: "通话中"
                },
                {
                    value: 0,
                    name: "号码有误"
                },
                {
                    value: 0,
                    name: "无人接听"
                }
            ],
            likeList: [
                {
                    value: 0,
                    name: "无意向"
                },
                {
                    value: 0,
                    name: "有意向"
                },
            ],
        };
    },
    methods: {

        /** 
         * 时间选项变动
         */
        timeChange(date) {
            this.dateObj = {
                dateEndBegin: date[0],
                dateEndEnd: date[1],
            }
            /*  this.(); */
        },
        /** 
         * 获取基础统计数据，最上层5个栏目
         */
        getBaseData() {
            /** 
             * 获取所有客户数量
             */
            API.Home.clientcount().then((res) => {
                res.data = res.data || 0;
                this.topData[0] = res.data - 0;
            }).catch((err) => {

            });
            /**
             * 获取待随访、已随访客户、已随访次数接口
             */
            API.Home.visitcount().then((res) => {
                res.data = res.data || {};
                this.topData[1] = res.data.doNum ? res.data.doNum - 0 : 0;
                this.topData[2] = res.data.noDoNum ? res.data.noDoNum - 0 : 0;
                this.topData[3] = res.data.totalNum ? res.data.totalNum - 0 : 0;
            }).catch((err) => {

            });
            /** 
             * 获取短信发送总数
             */
            API.Home.smsallcount().then((res) => {
                res.data = res.data || 0;
                this.topData[4] = res.data - 0;
            }).catch((err) => {

            });
        },
        /** 
         * 获取随访情况统计
         */
        getFollowData() {
            /** 
             * 实际随访数量、通话时长
             */
            API.Home.visitedcount(this.dateObj).then((res) => {
                if (res.data) {
                    this.followCount = {
                        title: "实际随访数量  " + res.data.totalNum,
                        param: ["正常通话", "有意向客户"],
                        numArray: [res.data.doNum ? res.data.doNum - 0 : 0, res.data.doIntention ? res.data.doIntention - 0 : 0],
                    };
                    this.phoneTime = {
                        title: "通话时长",
                        param: ["正常通话≤30秒", "正常通话31<=60秒", "正常通话>60秒"],
                        numArray: [res.data.ltDuration ? res.data.ltDuration - 0 : 0, res.data.etDuration ? res.data.etDuration - 0 : 0, res.data.gtDuration ? res.data.gtDuration - 0 : 0],
                    };
                }
            }).catch((err) => {

            });
            /** 
             * 短信统计
             */
            API.Home.smscount(this.dateObj).then((res) => {
                if (res.data) {
                    this.messageCount = {
                        title: "短信统计",
                        param: ["发送数"],
                        numArray: [res.data.doNum ? res.data.doNum - 0 : 0],
                    };
                }
            }).catch((err) => {

            });

            // 有无意向百分比接口
            API.Home.intentioncount(this.dateObj).then((res) => {
                if (res.data) {
                    this.likeList = [
                        {
                            value: res.data.noIntention,
                            name: "无意向"
                        },
                        {
                            value: res.data.doIntention,
                            name: "有意向"
                        },
                    ];

                } else {
                    this.likeList = [
                        {
                            value: 0,
                            name: "无意向"
                        },
                        {
                            value: 0,
                            name: "有意向"
                        },
                    ];
                }
                setTimeout(() => {
                    this.$refs.like.init();
                }, 20);
            }).catch((err) => {

            });

            // 通话状态分布接口
            API.Home.callstatus(this.dateObj).then((res) => {
                if (res.data) {
                    this.phoneList = [
                        {
                            value: res.data.callFail,
                            name: "呼叫失败"
                        },
                        {
                            value: res.data.visited,
                            name: "正常通话"
                        },
                        {
                            value: res.data.callStop,
                            name: "关停机"
                        },
                        {
                            value: res.data.noPhone,
                            name: "空号"
                        },
                        {
                            value: res.data.calling,
                            name: "通话中"
                        },
                        {
                            value: res.data.phoneError,
                            name: "号码有误"
                        },
                        {
                            value: res.data.noPerson,
                            name: "无人接听"
                        }
                    ];
                } else {
                    this.phoneList = [
                        {
                            value: 0,
                            name: "呼叫失败"
                        },
                        {
                            value: 0,
                            name: "正常通话"
                        },
                        {
                            value: 0,
                            name: "关停机"
                        },
                        {
                            value: 0,
                            name: "空号"
                        },
                        {
                            value: 0,
                            name: "通话中"
                        },
                        {
                            value: 0,
                            name: "号码有误"
                        },
                        {
                            value: 0,
                            name: "无人接听"
                        }
                    ];
                }
                setTimeout(() => {
                    this.$refs.phone.init();
                }, 20);
            }).catch((err) => {

            });
        },
    },
    mounted() {
        /** 
         * 获取科室数据
         */
        this.getFollowData();
        this.getBaseData();
    },
    activated() {

    }
};
</script>

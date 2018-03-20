<style lang="less">
@import "./home.less";
@import "../../styles/common.less";
</style>
<template>
    <div class="home-main">
        <Row :gutter="10">
            <Col :md="24" :lg="24">
            <Row>
                <Col :xs="24" :sm="12" :md="8" :lg="4">
                <Row class-name="home-page-row1" :gutter="10">
                    <Col :md="24" :lg="24" :style="{marginBottom: '10px'}">
                    <Card class="home_header">
                        <Row type="flex" class="user-infor">
                            <Col span="8">
                            <Row class-name="made-child-con-middle" type="flex" align="middle">
                                <img class="avator-img" src="../../images/asset.png" />
                            </Row>
                            </Col>
                            <Col span="16" style="padding-left:6px;">
                            <Row class-name="made-child-con-middle" type="flex" align="middle">
                                <div>
                                    <b class="card-user-infor-name">{{baseData.name}}</b>
                                    <p>{{baseData.type}}</p>
                                </div>
                            </Row>
                            </Col>
                        </Row>
                    </Card>
                    </Col>
                </Row>
                </Col>
                <Col :xs="24" :sm="12" :md="8" :lg="4" :style="{marginBottom: '10px'}">
                <else-card id-name="user_created_count" :end-val="topData[0]" iconType="person-stalker" color="#2d8cf0" intro-text="所有客户"></else-card>
                </Col>
                <Col :xs="24" :sm="12" :md="8" :lg="4" :style="{marginBottom: '10px'}">
                <else-card id-name="visit_count" :end-val="topData[1]" iconType="pie-graph" color="#64d572" intro-text="待随访客户"></else-card>
                </Col>
                <Col :xs="24" :sm="12" :md="8" :lg="4" :style="{marginBottom: '10px'}">
                <else-card id-name="collection_count" :end-val="topData[2]" iconType="person-add" color="#ffd572" intro-text="已随访客户"></else-card>
                </Col>
                <Col :xs="24" :sm="12" :md="8" :lg="4" :style="{marginBottom: '10px'}">
                <else-card id-name="follow_time" :end-val="topData[3]" iconType="ios-stopwatch" color="#ff7279" intro-text="已随访次数"></else-card>
                </Col>
                <Col :xs="24" :sm="12" :md="8" :lg="4" :style="{marginBottom: '10px'}">
                <else-card id-name="message_count" :end-val="topData[4]" iconType="chatbox-working" color="#72cbff" intro-text="短信发送总数"></else-card>
                </Col>
            </Row>
            </Col>
            <Col :md="24" :lg="24">
            <Row :gutter="10">
                <div class="map-con">
                    <Col :xs="24" :sm="24" :md="24" :lg="8">
                    <Card :padding="20" :style="{marginBottom: '10px'}">
                        <p slot="title">
                            <Icon type="arrow-graph-up-right"></Icon>
                            今日随访情况
                        </p>
                        <Row type="flex" justify="center" align="middle">
                            <Col :xs="20" :sm="8" :md="8" :lg="20" :style="{marginBottom: '20px'}">
                            <infor-card :params="followCount.param" id-name="followCount" id-names="followCounts" :end-val="followCount.numArray" iconType="ios-paper" color="#2d8cf0" :intro-text="followCount.title"></infor-card>
                            </Col>
                            <Col :xs="20" :sm="8" :md="8" :lg="20" :style="{marginBottom: '20px'}">
                            <infor-card :params="phoneTime.param" id-name="phoneTime" id-names="phoneTimes" :end-val="phoneTime.numArray" iconType="ios-telephone" color="#64d572" :intro-text="phoneTime.title"></infor-card>
                            </Col>
                            <Col :xs="20" :sm="8" :md="8" :lg="20" :style="{marginBottom: '20px'}">
                            <infor-card :params="messageCount.param" id-name="messageCount" id-names="messageCounts" :end-val="messageCount.numArray" iconType="ios-email" color="#ffd572" :intro-text="messageCount.title"></infor-card>
                            </Col>
                        </Row>
                    </Card>

                    </Col>
                    <Col :xs="24" :sm="24" :md="24" :lg="16">
                    <Card :padding="0" :style="{height:'457px'}">
                        <p slot="title">
                            <Icon type="map"></Icon>
                            近7天随访正常通话统计
                        </p>
                        <Row type="flex" justify="center" align="middle">
                            <visite-volume :data="normalPhone" ref="follow"></visite-volume>
                        </Row>
                    </Card>

                    </Col>
                </div>
            </Row>
            </Col>
        </Row>
    </div>
</template>

<script>
import Cookies from 'js-cookie';
import { API } from '@/services'
import visiteVolume from './components/visiteVolume.vue';
import inforCard from './components/inforCard.vue';
import elseCard from './components/elseCard.vue';

export default {
    name: 'home',
    components: {
        visiteVolume,
        inforCard,
        elseCard
    },
    data() {
        return {
            baseData: {},
            /** 
             * 基础数据
             */
            topData: [0, 0, 0, 0, 0],

            /** 实际随访数量 */
            followCount: {
                title: "实际随访数量",
                param: ["正常通话", "有意向客户"],
                numArray: [0, 0],
            },
            /** 通话时长 */
            phoneTime: {
                title: "通话时长",
                param: ["正常通话≤1分钟", "正常通话>1分钟"],
                numArray: [0, 0],
            },
            /** 
             * 短信统计情况
             */
            messageCount: {
                title: "短信统计",
                param: ["有意向发送数", "无意向发送数"],
                numArray: [0, 0],
            },
            /** 
             * 近7天随访正常通话统计
             */
            normalPhone: [],

        };
    },
    computed: {
        avatorPath() {
            return localStorage.avatorImgPath;
        }
    },
    methods: {
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
                this.topData[1] = res.data.doNum?res.data.doNum - 0:0;
                this.topData[2] = res.data.noDoNum?res.data.noDoNum - 0:0;
                this.topData[3] = res.data.totalNum?res.data.totalNum - 0:0;
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
                        param: ["正常通话≤1分钟", "正常通话>1分钟"],
                        numArray: [res.data.ltDuration ? res.data.ltDuration - 0 : 0, res.data.gtDuration ? res.data.gtDuration - 0 : 0],
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
                        param: ["有意向发送数", "无意向发送数"],
                        numArray: [res.data.doNum ? res.data.doNum - 0 : 0, res.data.noDoNum ? res.data.noDoNum - 0 : 0],
                    };
                }
            }).catch((err) => {

            });

            // 近7天随访正常通话统计
            API.Home.callcount().then((res) => {
                this.normalPhone = res.data;
                setTimeout(() => {
                    this.$refs.follow.init();
                }, 20);
            }).catch((err) => {

            });
        },
    },
    mounted() {
        this.baseData = JSON.parse(
            Cookies.get('baseData')
        );
        this.getFollowData();
        this.getBaseData();
    },
    activated() {

    }
};
</script>

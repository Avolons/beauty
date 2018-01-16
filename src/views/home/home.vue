<style lang="less">
@import "./home.less";
@import "../../styles/common.less";
</style>
<template>
    <div class="home-main">
        <Row :gutter="10">
            <Col :md="24" :lg="8">
            <Row class-name="home-page-row1" :gutter="10">
                <Col :md="12" :lg="24" :style="{marginBottom: '10px'}">
                <Card class="home_header">
                    <Row type="flex" class="user-infor">
                        <Col span="8">
                        <Row class-name="made-child-con-middle" type="flex" align="middle">
                            <img class="avator-img" :src="avatorPath" />
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
                    <Row class="margin-top-8">
                        <Col span="8">
                        <p class="notwrap">上次登录时间:</p>
                        </Col>
                        <Col span="16" class="padding-left-8">{{baseData.loginTime}}</Col>
                    </Row>
                </Card>
                </Col>
                <Col :md="12" :lg="24" :style="{marginBottom: '10px'}">
                <Card style="height:370px" class="doctorSort">
                    <p slot="title" class="card-title">
                        <Icon type="map"></Icon>
                        医生接症量排行
                        <Select @on-change="getSortList" v-model="doctorParams.type" style="width:70px">
                            <Option value="1">七天</Option>
                            <Option value="2">一个月</Option>
                        </Select>
                        <Select @on-change="getSortList" v-model="doctorParams.departmentId" style="width:100px">
                            <Option v-for="item in departList" :value="item.departmentId" :key="item.departmentId">{{ item.departmentName }}</Option>
                        </Select>
                    </p>
                    <Table size="small" height="270px" border :columns="config" :data="dataList"></Table>
                </Card>
                </Col>
            </Row>
            </Col>
            <Col :md="24" :lg="16">
            <Row :gutter="5">
                <Col :xs="24" :sm="8" :md="8" :style="{marginBottom: '10px'}">
                <infor-card id-name="user_created_count" id-names="user_created_counts" :end-val="count.createUser" iconType="ios-paper" color="#2d8cf0" intro-text="随访记录审核"></infor-card>
                </Col>
                <Col :xs="24" :sm="8" :md="8" :style="{marginBottom: '10px'}">
                <infor-card id-name="visit_count" id-names="visit_counts" :end-val="count.visit" iconType="briefcase" color="#64d572" intro-text="随访计划审核"></infor-card>
                </Col>
                <Col :xs="24" :sm="8" :md="8" :style="{marginBottom: '10px'}">
                <infor-card id-name="collection_count" id-names="collection_counts" :end-val="count.collection" iconType="ios-bookmarks" color="#ffd572" intro-text="方案重复匹配审核"></infor-card>
                </Col>
            </Row>
            <Row>
                <Card :padding="0">
                    <p slot="title" class="card-title">
                        <Icon type="map"></Icon>
                        就诊患者统计
                        <Select @on-change="getjzcount" v-model="jzParams.type" style="width:100px">
                            <Option value="1">七天</Option>
                            <Option value="2">一个月</Option>
                        </Select>
                        <Select @on-change="getjzcount" v-model="jzParams.departmentId" style="width:150px">
                            <Option v-for="item in departList" :value="item.departmentId" :key="item.departmentId">{{ item.departmentName }}</Option>
                        </Select>

                    </p>
                    <div class="map-con">
                        <Col span="4" class="map_left">
                        <h3>就诊累计情况</h3>
                        <h4>新增患者总数</h4>
                        <h5>{{jzCount}}</h5>
                        </Col>
                        <Col span="20" class="map-incon">
                        <Row type="flex" justify="center" align="middle">
                            <home-map ref="jz" :mapData="jzList"></home-map>
                        </Row>
                        </Col>
                    </div>
                </Card>
            </Row>
            </Col>
        </Row>
        <Row :gutter="10">
            <Card class="follow_box">
                <p slot="title" class="card-title">
                    <Icon type="android-map"></Icon>
                    随访情况统计
                    <Select @on-change="getFollowData" v-model="followParams.type" style="width:100px">
                        <Option value="1">七天</Option>
                        <Option value="2">一个月</Option>
                    </Select>
                    <Select @on-change="getFollowData" v-model="followParams.departmentId" style="width:150px">
                        <Option v-for="item in departList_dis" :value="item.departmentId" :key="item.departmentId">{{ item.departmentName }}</Option>
                    </Select>
                </p>
                <Row :gutter="10" class="follow_inner">
                    <Col :md="6" class="follow_left" :lg="3" :style="{marginBottom: '10px',height:'100%'}">
                        <h3>随访情况</h3>
                        <h5>随访任务量</h5>
                        <h4>{{countvisitorder.totalNum}}</h4>
                        <h5>随访任务完成量</h5>
                        <h4>{{countvisitorder.doNum}}</h4>
                        <h5>随访任务失败量</h5>
                        <h4>{{countvisitorder.noDoNum}}</h4>
                    </Col>
                    <Col :md="18" :lg="9" :style="{marginBottom: '10px',height:'100%'}">
                    <visite-volume :data="followList" ref="follow"></visite-volume>
                    </Col>
                    <Col :md="12" :lg="6" :style="{marginBottom: '10px',height:'100%'}">
                    <h3>任务成功情况统计</h3>
                    <data-source-pie ref="success" :data="finshList"></data-source-pie>
                    </Col>
                    <Col :md="12" :lg="6"  :style="{marginBottom: '10px',height:'100%'}">
                    <h3>任务失败情况统计</h3>
                    <service-requests ref="fail" :data="cancelList"></service-requests>
                    </Col>
                </Row>
            </Card>
        </Row>
        <!-- <Row class="margin-top-10">
                                    <Card>
                                        <p slot="title" class="card-title">
                                            <Icon type="ios-shuffle-strong"></Icon>
                                            上周每日服务调用量(万)
                                        </p>
                                        <div class="line-chart-con">
                                            <service-requests></service-requests>
                                        </div>
                                    </Card>
                                </Row> -->
    </div>
</template>

<script>
import Cookies from 'js-cookie';
import { API } from '@/services'
import cityData from './map-data/get-city-value.js';
import homeMap from './components/map.vue';
import dataSourcePie from './components/dataSourcePie.vue';
import visiteVolume from './components/visiteVolume.vue';
import serviceRequests from './components/serviceRequests.vue';
import userFlow from './components/userFlow.vue';
import countUp from './components/countUp.vue';
import inforCard from './components/inforCard.vue';
import mapDataTable from './components/mapDataTable.vue';
import toDoListItem from './components/toDoListItem.vue';

export default {
    name: 'home',
    components: {
        homeMap,
        dataSourcePie,
        visiteVolume,
        serviceRequests,
        userFlow,
        countUp,
        inforCard,
        mapDataTable,
        toDoListItem
    },
    data() {
        return {
            /** 
             * 基础数据
             */
            baseData:{

            },
            followList:[],
            cancelList:[],//失败列表
            finshList:[],//成功列表
            /** 数据列表 */
            dataList: [],
            /** 表格文件 */
            config: [
                {
                    title: '医生id',
                    key: 'id',
                },
                {
                    title: '医生名字',
                    key: 'realname'
                },
                {
                    title: '接诊量',
                    key: 'jzNum',
                },
                {
                    title: '随访量',
                    key: 'sfNum'
                }
            ],
            /** 
             * 筛选条件集合
             */
            doctorParams: {
                pager: 1,  //当前页码
                limit: 999,  //每页条数
                departmentId: 5, //科室(必传)
                type: "1"   //类型(必传)：1表示7日，2表示30日
            },
            //科室列表
            departList: [],//医生统计科室
            departList_dis: [],//就诊累计情况科室
            /** 基础数据列表 */
            count: {
                createUser: [0, 0],
                visit: [0, 0],
                collection: [0, 0],
            },
            //就诊患者排行
            jzParams: {
                departmentId: 821,   //科室(必传)
                type: "1"
            },
            jzCount: 0,
            jzList: [],
            /** 随访情况数据 */
            followParams: {
                departmentId: 17,   //科室(必传)
                type: '1'           //类型(必传)：1表示7日，2表示30日
            },
            /** 随访情况 */
            countvisitorder: {
                doNum: "43",      //随访任务完成量
                noDoNum: "156",   //随访任务失败量
                totalNum: "204"   //随访任务量
            },
            hccount: [],
            countvisitfinish: [],
            countordercancel: []
        };
    },
    computed: {
        avatorPath() {
            return localStorage.avatorImgPath;
        }
    },
    methods: {
        addNewToDoItem() {
            this.showAddNewTodo = true;
        },
        /** 
         * 获取基础统计数据
         */
        getBaseData() {
            API.Home.orderList().then((res) => {
                this.count.createUser = [res.data.noDoNum, res.data.doNum];
            }).catch((err) => {

            });
            API.Home.tasklist().then((res) => {
                this.count.visit = [res.data.noDoNum, res.data.doNum];
            }).catch((err) => {

            });
            API.Home.taskList({
                type: 2
            }).then((res) => {
                this.count.collection = [res.data.noDoNum, res.data.doNum];
            }).catch((err) => {

            });
        },
        /** 
         * 获取科室列表
         */
        getDepartList() {
            API.Home.getdepartment().then((res) => {
                this.departList = res.data;
                /** 
                 * 统一数据赋值
                 * 
                 */
                this.jzParams.departmentId = res.data[0].departmentId;
                this.doctorParams.departmentId = res.data[0].departmentId;
            }).catch((err) => {

            }).then(()=>{
                
                /* this.getjzcount();
                this.getSortList(); */
            });
            API.Home.departList().then((res) => {
                this.departList_dis = res.data;
                /** 
                 * 统一数据赋值
                 * 
                 */
                this.followParams.departmentId = res.data[0].departmentId;
                /* this.getFollowData(); */
            }).catch((err) => {

            });
        },

        /** 
         * 获取医生排行数据
         */
        getSortList() {
            API.Home.seniority(this.doctorParams).then((res) => {
                this.dataList = res.data;
            }).catch((err) => {

            });
        },
        /** 
         * 获取就诊患者排行数据
         */
        getjzcount() {
            API.Home.jzcount(this.jzParams).then((res) => {
                this.jzCount = res.total;
                this.jzList = res.data;
                setTimeout(()=> {
                        this.$refs.jz.init();
                }, 20);
                
            }).catch((err) => {

            });
        },
        /** 
         * 获取随访情况统计
         */
        getFollowData() {
            // 随访情况接口
            API.Home.countvisitorder(this.followParams).then((res) => {
                this.countvisitorder = res.data;
            }).catch((err) => {

            });
            // 每日随访任务量接口
            API.Home.hccount(this.followParams).then((res) => {
                this.followList=res.data;
                setTimeout(()=> {
                this.$refs.follow.init();
                }, 20);
            }).catch((err) => {

            });
            // 任务完成情况统计接口
            API.Home.countvisitfinish(this.followParams).then((res) => {
                let arr=[];
                for (const item of res.data) {
                  arr.push({
                      name:item.remark,
                      value:item.doNum,
                  })  
                }
                this.finshList=arr;
                setTimeout(()=> {
                this.$refs.success.init();
                }, 20);
            }).catch((err) => {

            });
            // 任务失败情况统计接口
            API.Home.countordercancel(this.followParams).then((res) => {
               let arr=[];
               for (const item of res.data) {
                   arr.push({
                      name:item.remark,
                      value:item.doNum,
                  }) 
               }
               this.cancelList=arr;
               setTimeout(()=> {
               this.$refs.fail.init();
               }, 20);
            }).catch((err) => {

            });
        },
    },
    mounted() {
    this.baseData=JSON.parse(
        Cookies.get('baseData')
    );
        /** 
         * 获取科室数据
         */
        this.getDepartList();
        this.getBaseData();
    },
    activated() {
        for (const ite of [1,1,1,1]) {
            for (const item of [1,1,1]) {
                return 1;
             } 
        }
        return(22);
    }
};
</script>

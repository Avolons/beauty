<style lang="less">
@import "./home.less";
@import "../../styles/common.less";
</style>
<template>
    <div class="home-main">
        <Row :gutter="5" type="flex" justify="space-between">
            <Col :xs="24" :sm="6" :md="6" :style="{marginBottom: '10px'}">
            <infor-card id-name="user_created_count" id-names="user_created_counts" :end-val="count.createUser" iconType="ios-paper" color="#2d8cf0" intro-text="随访记录审核"></infor-card>
            </Col>
            <Col :xs="24" :sm="6" :md="6" :style="{marginBottom: '10px'}">
            <infor-card id-name="visit_count" id-names="visit_counts" :end-val="count.visit" iconType="briefcase" color="#64d572" intro-text="随访计划审核"></infor-card>
            </Col>
            <Col :xs="24" :sm="4" :md="4" :style="{marginBottom: '10px'}">
            <infor-card id-name="collection_count" id-names="collection_counts" :end-val="count.collection" iconType="ios-bookmarks" color="#ffd572" intro-text="方案重复匹配审核"></infor-card>
            </Col>
            <Col :xs="24" :sm="4" :md="4" :style="{marginBottom: '10px'}">
            <infor-card id-name="collection_count" id-names="collection_counts" :end-val="count.collection" iconType="ios-bookmarks" color="#ffd572" intro-text="方案重复匹配审核"></infor-card>
            </Col>
            <Col :xs="24" :sm="4" :md="4" :style="{marginBottom: '10px'}">
            <infor-card id-name="collection_count" id-names="collection_counts" :end-val="count.collection" iconType="ios-bookmarks" color="#ffd572" intro-text="方案重复匹配审核"></infor-card>
            </Col>
        </Row>
        <Row :gutter="5">
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
                <Row :gutter="10" >
                    <Col :md="24"  :lg="24" :style="{marginTop: '10px',height:'100%'}">
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
                    </Col>
                    <!-- <Col :md="18" :lg="9" :style="{marginBottom: '10px',height:'100%'}">
                        <visite-volume :data="followList" ref="follow"></visite-volume>
                        </Col> -->
                    <Col :md="12" :lg="12" :style="{marginBottom: '10px',height:'100%'}">
                    <h3>任务成功情况统计</h3>
                    <data-source-pie ref="success" :data="finshList"></data-source-pie>
                    </Col>
                    <Col :md="12" :lg="12" :style="{marginBottom: '10px',height:'100%'}">
                    <h3>任务失败情况统计</h3>
                    <service-requests ref="fail" :data="finshList" ></service-requests>
                    </Col>
                </Row>
            </Card>
        </Row>
    </div>
</template>

<script>
import Cookies from 'js-cookie';
import { API } from '@/services'
/* import cityData from './map-data/get-city-value.js'; */
import homeMap from './components/map.vue';
import dataSourcePie from './components/dataSourcePie.vue';
import visiteVolume from './components/visiteVolume.vue';
import serviceRequests from './components/serviceRequests.vue';
import userFlow from './components/userFlow.vue';
import countUp from './components/countUp.vue';
import inforCard from './components/inforCard.vue';
import elseCard from './components/elseCard.vue';

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
        elseCard
    },
    data() {
        return {
            /** 
             * 基础数据
             */
            baseData: {

            },
            followList: [],
            cancelList: [],//失败列表
            finshList: [],//成功列表
            /** 数据列表 */
            dataList: [],
            /** 表格文件 */
            config: [
                {
                    title: '排名',
                    type: 'index',
                    align: 'center',
                    width: 70,
                },
                {
                    title: '姓名',
                    key: 'realname',
                },
                {
                    title: '接诊量',
                    key: 'jzNum',
                    sortable: true,
                    width: 90,

                },
                {
                    title: '随访量',
                    key: 'sfNum',
                    width: 75,
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
            departList: [{
                departmentName: "全部",
                departmentId: -1,
            }],//医生统计科室
            departList_dis: [
                {
                    departmentName: "全部",
                    departmentId: -1,
                }
            ],//就诊累计情况科室
            /** 基础数据列表 */
            count: {
                createUser: [0, 0],
                visit: [0, 0],
                collection: [0, 0],
            },
            //就诊患者排行
            jzParams: {
                departmentId: "",   //科室(必传)
                type: "1"
            },
            jzCount: 0,
            jzList: [],
            /** 随访情况数据 */
            followParams: {
                departmentId: "",   //科室(必传)
                type: '1'           //类型(必传)：1表示7日，2表示30日
            },
            /** 随访情况 */
            countvisitorder: {
                doNum: "0",      //随访任务完成量
                noDoNum: "0",   //随访任务失败量
                totalNum: "0"   //随访任务量
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
                if (res.data) {
                    this.count.createUser = [res.data.noDoNum, res.data.doNum];
                }
            }).catch((err) => {

            });
            API.Home.tasklist().then((res) => {
                if (res.data) {
                    this.count.visit = [res.data.noDoNum, res.data.doNum];
                }
            }).catch((err) => {

            });
            API.Home.taskList({
                type: 2
            }).then((res) => {
                if (res.data) {
                    this.count.collection = [res.data.noDoNum, res.data.doNum];
                }
            }).catch((err) => {

            });
        },
        /** 
         * 获取科室列表
         */
        getDepartList() {
            API.Home.getdepartment().then((res) => {
                this.departList = this.departList.concat(res.data);
                /** 
                 * 统一数据赋值
                 * 
                 */
                this.jzParams.departmentId = this.departList[0].departmentId;
                this.doctorParams.departmentId = this.departList[0].departmentId;

            }).catch((err) => {

            }).then(() => {

                /* this.getjzcount();
                this.getSortList(); */
            });
            API.Home.departList().then((res) => {
                this.departList_dis = this.departList_dis.concat(res.data);
                /** 
                 * 统一数据赋值
                 * 
                 */
                this.followParams.departmentId = this.departList_dis[0].departmentId;
                /* this.getFollowData(); */
            }).catch((err) => {

            });
        },

        /** 
         * 获取就诊患者排行数据
         */
        getjzcount() {
            let sendData = JSON.parse(JSON.stringify(this.jzParams));
            sendData.departmentId = sendData.departmentId == -1 ? "" : sendData.departmentId;
            API.Home.jzcount(sendData).then((res) => {
                this.jzCount = res.total;
                this.jzList = res.data;
                setTimeout(() => {
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
            let sendData = JSON.parse(JSON.stringify(this.followParams));
            sendData.departmentId = sendData.departmentId == -1 ? "" : sendData.departmentId;
            API.Home.countvisitorder(sendData).then((res) => {
                this.countvisitorder = res.data;
            }).catch((err) => {

            });
            // 任务完成情况统计接口
            API.Home.countvisitfinish(sendData).then((res) => {
                let arr = [];
                for (const item of res.data) {
                    arr.push({
                        name: item.remark,
                        value: item.doNum,
                    })
                }
                this.finshList = arr;
                setTimeout(() => {
                    this.$refs.success.init();
                    this.$refs.fail.init();
                }, 20);
            }).catch((err) => {

            });
            // 任务失败情况统计接口
            API.Home.countordercancel(sendData).then((res) => {
                let arr = [];
                if (res.data.length > 0) {
                    for (const item of res.data) {
                        arr.push({
                            name: item.remark,
                            value: item.doNum,
                        })
                    }
                    this.cancelList = arr;
                    setTimeout(() => {
                        this.$refs.fail.init();
                    }, 20);
                }

            }).catch((err) => {

            });
        },
    },
    mounted() {
        this.baseData = JSON.parse(
            Cookies.get('baseData')
        );
        /** 
         * 获取科室数据
         */
        this.getDepartList();
        this.getBaseData();
    },
    activated() {

    }
};
</script>

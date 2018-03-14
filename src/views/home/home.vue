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
                <else-card id-name="user_created_count" :end-val="count.createUser" iconType="person-stalker" color="#2d8cf0" intro-text="所有客户"></else-card>
                </Col>
                <Col :xs="24" :sm="12" :md="8" :lg="4" :style="{marginBottom: '10px'}">
                <else-card id-name="visit_count" :end-val="count.visit" iconType="pie-graph" color="#64d572" intro-text="待随访客户"></else-card>
                </Col>
                <Col :xs="24" :sm="12" :md="8" :lg="4" :style="{marginBottom: '10px'}">
                <else-card id-name="collection_count" :end-val="count.collection" iconType="person-add" color="#ffd572" intro-text="已随访客户"></else-card>
                </Col>
                <Col :xs="24" :sm="12" :md="8" :lg="4" :style="{marginBottom: '10px'}">
                <else-card id-name="collection_count" :end-val="count.collection" iconType="ios-stopwatch" color="#ff7279" intro-text="已随访次数"></else-card>
                </Col>
                <Col :xs="24" :sm="12" :md="8" :lg="4" :style="{marginBottom: '10px'}">
                <else-card id-name="collection_count" :end-val="count.collection" iconType="chatbox-working" color="#72cbff" intro-text="短信发送总数"></else-card>
                </Col>
            </Row>
            </Col>
            <Col :md="24" :lg="24">
            <Row :gutter="10">
                <div class="map-con">
                    <Col :xs="24" :sm="24" :md="24" :lg="8" >
                    <Card :padding="20" :style="{marginBottom: '10px'}">
                        <p slot="title">
                            <Icon type="arrow-graph-up-right"></Icon>
                            今日随访情况
                        </p>
                        <Row type="flex" justify="center" align="middle" >
                            <Col :xs="20" :sm="8" :md="8" :lg="20"  :style="{marginBottom: '20px'}">
                            <infor-card id-name="user_created_count" id-names="user_created_counts" :end-val="count.createUser" iconType="ios-paper" color="#2d8cf0" intro-text="实际随访数量：1000"></infor-card>
                            </Col>
                            <Col :xs="20" :sm="8" :md="8" :lg="20" :style="{marginBottom: '20px'}">
                            <infor-card id-name="visit_count" id-names="visit_counts" :end-val="count.visit" iconType="ios-telephone" color="#64d572" intro-text="通话时长"></infor-card>
                            </Col>
                            <Col :xs="20" :sm="8" :md="8" :lg="20" :style="{marginBottom: '20px'}">
                            <infor-card id-name="collection_count" id-names="collection_counts" :end-val="count.collection" iconType="ios-email" color="#ffd572" intro-text="短信统计"></infor-card>
                            </Col>
                        </Row>
                    </Card>

                    </Col>
                    <Col :xs="24" :sm="24" :md="24" :lg="16" >
                    <Card :padding="0" :style="{height:'457px'}">
                        <p slot="title">
                            <Icon type="map"></Icon>
                            近7天随访正常通话统计
                        </p>
                        <Row type="flex" justify="center" align="middle">
                            <visite-volume :data="followList" ref="follow"></visite-volume>
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
            // 每日随访任务量接口
            API.Home.hccount(sendData).then((res) => {
                this.followList = res.data;
                setTimeout(() => {
                    this.$refs.follow.init();
                }, 20);
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

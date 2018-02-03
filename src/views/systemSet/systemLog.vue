<style lang="less">
.sys-syslog {
    &_main {
        &_search {
            box-sizing: border-box;
            margin-bottom: 10px;
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
</style>


<template>
    <div class="user">
        <div class="sys-syslog_main">
            <Row class="sys-syslog_main_search" :gutter="15">
                <Col span="6">
                <span>
                    链接地址：
                </span>
                <Input v-model="searchParam.uriLike" placeholder="请填写链接地址"></Input>
                </Col>
                <Col span="6">
                <span>
                    IP地址：
                </span>
                <Input v-model="searchParam.ipLike" placeholder="请填写ip地址"></Input>
                </Col>
                <Col span="6">
                <span>
                    时间起止：
                </span>
                <DatePicker format="yyyy-MM-dd" @on-change="changeVal" type="daterange" placement="bottom-end" placeholder="请选择起止时间"></DatePicker>
                </Col>
                <Col span="6">
                <Button @click="searchResult" type="primary">查询</Button>
                </Col>
            </Row>
            <div class="sys-syslog_main_list">
                <Table border :columns="config" :data="dataList"  :loading="createLoading"></Table>
            </div>
            <Row class="sys-syslog_main_page">
                <Page :page-size="pageSize" show-total  :total="totalPage" :current="searchParam.page" show-elevator style="float:right" @on-change="changePage"></Page>
            </Row>
        </div>
    </div>
</template>

<script>
import { API } from '../../services/index.js';
export default {
    data() {
        return {
            createLoading:true,		//loading 动画加载中
            pageSize:10,
            totalPage: 10,//总页码
            //当前被点击触发的数据
            currentInfo: {

            },
            //搜索内容
            searchParam: {
                page: 1,
                uriLike: "",
                ipLike: "",
                time: ""
            },
            config: [
                {
                    title: '序号',
                    key: 'id',
                    width: 150
                },
                {
                    title: '所属模块',
                    key: 'moduleType',
                    width: 120
                },
                {
                    title: '操作',
                    key: 'oprateType',
                    width: 80
                },
                {
                    title: '当前权限',
                    key: 'name',
                    width: 120
                },
                {
                    title: '相关链接',
                    key: 'uri',
                    width: 120
                },
                {
                    title: '操作记录',
                    key: 'msg',
                },
                {
                    title: '管理员',
                    key: 'realName',
                    width: 80,
                },
                {
                    title: 'ip',
                    key: 'ip',
                    width: 120,
                },
                {
                    title: '操作时间',
                    key: 'dateAdd',
                    width: 120,
                },

            ],
            dataList: []
        }
    },
    methods: {
        /** 
         * 搜索数据
         */
        searchResult() {
            this.searchParam.page = 1;
            this.getData();
        },
        /** 
         * 获取所有数据
         */
        getData() {
            API.Systems.listSystemLog({
                page: this.searchParam.page,
                uriLike: this.searchParam.uriLike,
                ipLike: this.searchParam.ipLike,
                dateAddBegin: this.searchParam.time[0],
                dateAddEnd: this.searchParam.time[1]
            }
            ).then((res) => {
                this.dataList = this.dataForm(res.data);
                this.totalPage = res.totalRow;
                this.pageSize=res.pageSize;
                this.createLoading = false;
            }).catch((err) => {

            });
        },
        /** 
         * 分页更改
         */
        changePage(page) {
            this.searchParam.page = page;
            this.getData();
        },
        /** 
         * 时间切换
         */
        changeVal(data) {
            this.searchParam.time = data;
        },
        /** 
         * 数据格式化
         */
        dataForm(data) {
            let arrList = [];
            for (let item of data) {
                item = { ...item, ...item.sysLog };
                arrList.push(item);
            }
            return arrList;
        }
    },
    mounted() {
        this.getData();
    }
}
</script>


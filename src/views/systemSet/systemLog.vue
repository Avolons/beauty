<style lang="less">
.sys-syslog {
    &_main {
        &_list {}
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
                <Table border :columns="config" :data="dataList"></Table>
            </div>
            <Row class="sys-syslog_main_page">
                <Page :page-size="pageSize"  :total="totalPage" :current="searchParam.page" show-elevator style="float:right" @on-change="changePage"></Page>
            </Row>
        </div>
    </div>
</template>

<script>
import { API } from '../../services/index.js';
export default {
    data() {
        return {
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
                },
                {
                    title: '所属模块',
                    key: 'moduleType'
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
                    key: 'uri'
                },
                {
                    title: '操作记录',
                    key: 'msg',
                    width: 300
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
                    width: 150,
                },

            ],
            dataList: []
        }
    },
    methods: {
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
            }).catch((err) => {

            });
        },
        show(index) {
            this.$Modal.info({
                title: 'User Info',
                content: `Name：${this.dataList[index].name}<br>Age：${this.dataList[index].age}<br>Address：${this.dataList[index].address}`
            })
        },
        remove(index) {
            this.dataList.splice(index, 1);
        },
        /** 
         * 分页更改
         */
        changePage(page) {
            this.searchParam.page = page;
            this.getData();
        },
        changeVal(data) {
            this.searchParam.time = data;
        },
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


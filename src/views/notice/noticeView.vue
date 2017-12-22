<style lang="less">
.noshow{
    display: none;
}
.inter-down {
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
        <div class="inter-down_main">
            <Row class="inter-down_main_search" :gutter="15">
                <Col span="6">
                <span>
                    计划名称：
                </span>
                <input type="text" v-model="searchParams.activeName" placeholder="请输入计划名称">
                </Col>
                <Col span="6">
                <span>
                    状态：
                </span>
                <Select v-model="searchParams.status" style="width:200px">
                    <Option value=""></Option>
                    <Option value="0">待审核</Option>
                    <Option value="1">不通过</Option>
                    <Option value="2">审核通过</Option>
                    <Option value="3">已排期</Option>
                    <Option value="4">已取消</Option>
                </Select>
                </Col>
                <Col span="6">
                <span>
                    计划时间：
                </span>
                <DatePicker @on-change="timeChange" type="daterange" placement="bottom-end" placeholder="请选择时间范围"></DatePicker>
                </Col>
                <Col span="6">
                    <Button @click="getData" type="primary">查询</Button>
                </Col>
            </Row>
            <div class="inter-down_main_list">
                <Table border :columns="config" :data="dataList"></Table>
            </div>
            <Row class="inter-down_main_page">
                <Page style="float:right" :total="totalPage" @on-change="changePage" show-elevator show-total></Page>
            </Row>
        </div>
    </div>
</template>

<script>
import { API } from '@/services/index.js';
export default {
    data() {
        return {
            //搜索选项
            searchParams: {
                pager: 1, //当前页码
                limit: 10,//每页条数
                activeName: "",//通知计划名称（可选）
                status: "0", //状态（可选）
                dateBegin: "", //通知计划（可选）
                dateEnd: ""    //通知计划（可选）

            },
            totalPage: 100,//总页数
            config: [
                {
                    title: '通知计划名称',
                    key: 'activeName'
                },
                {
                    title: '通知方案',
                    key: 'schemeName'
                },
                {
                    title: '创建时间',
                    key: 'dateAdd'
                },
                {
                    title: '状态',
                    key: 'vetStatusStr'
                },
                {
                    title: '通知总人数',
                    key: 'totalNum'
                },
                {
                    title: '通知完毕人数',
                    key: 'doNum'
                },
                {
                    title: '通知中人数',
                    key: 'noDoNum'
                },
                {
                    title: '操作',
                    key: 'action',
                    width: 150,
                    align: 'center',
                    render: (h, params) => {
                        return h('div', [
                           h('Button', {
                                props: {
                                    type: 'primary',
                                    size: 'small',
                                },
                                'class':{
                                  "noshow":params.row.vetStatusStr=="已取消"||params.row.vetStatusStr=="未开始"
                                },
                                style: {
                                    marginRight: '5px'
                                },
                                on: {
                                    click: () => {
                                        this.stopNotice(params.row.id)
                                    }
                                }
                            }, '停止计划'),
                            h('Button', {
                                props: {
                                    type: 'warning',
                                    size: 'small'
                                },
                                style: {
                                },
                                on: {
                                    click: () => {
                                        this.deletNotice(params.row.id);
                                    }
                                }
                            }, '删除'),
                        ]);
                    }
                }
            ],
            dataList: []
        }
    },
    methods: {
        /** 
         * 时间更改
         */
        timeChange(time){
            this.dateBegin=time[0];
            this.dateEnd=time[1];
        },
        /** 
		 * 获取列表数据,搜索接口
		 */
        getData() {
            API.Notice.listNotice(this.searchParams).then((res) => {
                this.dataList = res.data;
                this.totalPage = res.total;
            }).catch((err) => {

            });
        },
		/** 
		 * 页码改变
		 */
        changePage(index) {
            this.searchParams.pager = index;
            this.getData();
        },
        stopNotice(id) {
            this.$Modal.confirm({
                title: '停止计划',
                content: '确定要停止计划？',
                onOk: () => {
                    API.Notice.cancelNotice({
                        id: id
                    }).then((res) => {
                        this.$Message.success("暂停成功");
                        this.getData();
                    }).catch((err) => {

                    });
                }
            });
        },
		/** 
		 * 删除通知进度
		 */
        deletNotice(id) {
            this.$Modal.confirm({
                title: '删除记录',
                content: '确定删除该条记录？',
                onOk: () => {
                    API.Notice.delNotice({
                        id: id
                    }).then((res) => {
                        this.$Message.success("删除成功");
                        this.getData();
                    }).catch((err) => {

                    });
                }
            });
        }
    },
    mounted() {
        this.getData();
    }
}
</script>


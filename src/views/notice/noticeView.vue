<style lang="less">
.inter-down {
    &_main {
        &_list {}
        &_search {
            box-sizing: border-box;
            margin-bottom: 10px;
            .ivu-col {
                display: flex;
				margin-bottom: 10px;
                >span{
                    background-color: #dadada;
                    text-align: center;
                    line-height: 32px;
                    display: block;
					width: 80px;
					flex-shrink: 0;
                    border-top-left-radius: 4px;
                    border-bottom-left-radius: 4px;
                }
                .ivu-input{
                    border-top-left-radius: 0;
                    border-bottom-left-radius: 0;
				}
				.ivu-date-picker{
					width: 100%;
				}
                .ivu-select{
                    flex-grow: 1;
                    flex-shrink: 1;
                }
                .ivu-select-selection{
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
                    科室：
                </span>
                <Select v-model="model1" style="width:200px">
                    <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
                </Col>
                <Col span="6">
                <span>
                    医生：
                </span>
                <Select v-model="model1" style="width:200px">
                    <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
                </Col>
                <Col span="6">
                <span>
                    计划名称：
                </span>
                <Select v-model="model1" style="width:200px">
                    <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
                </Col>
                <Col span="6">
                <span>
                    状态：
                </span>
                <Select v-model="model1" style="width:200px">
                    <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
                </Col>
                <Col span="6">
                <span>
                    计划时间：
                </span>
                <DatePicker type="daterange" placement="bottom-end" placeholder="Select date" ></DatePicker>
                </Col>
                <Col span="6">
                <Button @click="searchuser" type="primary">查询</Button>
                </Col>

            </Row>
            <div class="inter-down_main_list">
                <Table border ref="selection" :columns="columns7" :data="data6"></Table>

            </div>
            <Row class="inter-down_main_page">
                <Button @click="handleSelectAll(true)">全选</Button>
                <Button @click="handleSelectAll(false)">取消</Button>
                <Button @click="handleSelectAll(false)" type="warning">删除</Button>
                <Page :total="100" :current="1" show-elevator style="float:right" @on-change="changePage"></Page>
            </Row>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            value1: "",
            model1: '',
            cityList: [
                {
                    value: 'New York',
                    label: 'New York'
                },
                {
                    value: 'London',
                    label: 'London'
                },
                {
                    value: 'Sydney',
                    label: 'Sydney'
                },
                {
                    value: 'Ottawa',
                    label: 'Ottawa'
                },
                {
                    value: 'Paris',
                    label: 'Paris'
                },
                {
                    value: 'Canberra',
                    label: 'Canberra'
                }
            ],
            columns7: [
                {
                    type: 'selection',
                    width: 60,
                    align: 'center'
                },
                {
                    title: '通知计划名称',
                    key: 'username'
                },
                {
                    title: '通知方案',
                    key: 'time'
                },
                {
                    title: '创建时间',
                    key: 'username'
                },
                {
                    title: '状态',
                    key: 'time'
                },
                {
                    title: '通知总人数',
                    key: 'username'
                },
                {
                    title: '通知完毕人数',
                    key: 'time'
                },
                {
                    title: '通知中人数',
                    key: 'username'
                },
                {
                    title: '操作',
                    key: 'action',
                    width: 100,
                    align: 'center',
                    render: (h, params) => {
                        return h('div', [
                            h('Button', {
                                props: {
                                    type: 'warning',
                                    size: 'small'
                                },
                                style: {
                                    marginRight: '5px'
                                },
                                on: {
                                    click: () => {
                                        this.show(params.index)
                                    }
                                }
                            }, '删除'),
                        ]);
                    }
                }
            ],
            data6: [
                {
                    role: "医生",
                    username: "1245786",
                    time: "2017-11-30 11:08:30",
                    action: "随访测试",
                    name: "测试",
                    mobile: 14578884125,
                    look: 1,
                },
                {
                    role: "医生",
                    username: "1245786",
                    time: "2017-11-30 11:08:30",
                    action: "随访测试",
                    name: "测试",
                    mobile: 14578884125,
                    look: 1,
                },
                {
                    role: "医生",
                    username: "1245786",
                    time: "2017-11-30 11:08:30",
                    action: "随访测试",
                    name: "测试",
                    mobile: 14578884125,
                    look: 1,
                },
                {
                    role: "医生",
                    username: "1245786",
                    time: "2017-11-30 11:08:30",
                    action: "随访测试",
                    name: "测试",
                    mobile: 14578884125,
                    look: 1,
                }
            ]
        }
    },
    methods: {
        show(index) {
            this.$Modal.info({
                title: 'User Info',
                content: `Name：${this.data6[index].name}<br>Age：${this.data6[index].age}<br>Address：${this.data6[index].address}`
            })
        },
        handleSelectAll(status) {
            this.$refs.selection.selectAll(status);
        },
        remove(index) {
            this.data6.splice(index, 1);
        },
        adduser() {
            this.$router.push('/access/user/inter-down_add/0');
        },
        changePage() {

        },
        searchuser() {

        }
    }
}
</script>


<style lang="less">
.user {
    &_main {
        &_add {
            margin-bottom: 10px;
        }
        &_list {}
        &_search{
            box-sizing: border-box;
            margin-bottom: 10px;
            .ivu-col{
                display: flex;
                >span{
                    background-color: #dadada;
                    text-align: center;
                    line-height: 32px;
                    display: block;
                    width: 80px;
                    border-top-left-radius: 4px;
                    border-bottom-left-radius: 4px;
                }
                .ivu-input{
                    border-top-left-radius: 0;
                    border-bottom-left-radius: 0;
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
        &_page{
            margin-top: 10px;
        }
    }
}
</style>


<template>
    <div class="user">
        <div class="user_main">
            <Row class="user_main_search" :gutter="15">
                <Col span="6">
                <span>
                    所属部门：
                </span>
                <Select v-model="model1" style="width:200px">
                    <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
                </Col>
                <Col span="6">
                <span>
                    用户名：
                </span>
                <Input v-model="value1"  placeholder="large size"></Input>
                </Col>
                <Col span="6">
                <span>
                    身份：
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
            </Row>
            <div class="user_main_add">
                <Button @click="searchuser" type="primary">查询</Button>
                <Button @click="adduser" type="primary">新增用户</Button>
            </div>
            <div class="user_main_list">
                <Table border :columns="columns7" :data="data6"></Table>
            </div>
            <Row class="user_main_page">
            <Page :total="100" :current="1" style="float:right" @on-change="changePage"></Page>
            </Row>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            value1: "",
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
                model1: '',
            columns7: [
                {
                    title: '角色',
                    key: 'role',
                },
                {
                    title: '用户名',
                    key: 'username'
                },
                {
                    title: '最后登录时间',
                    key: 'time'
                },
                {
                    title: '默认方案',
                    key: 'action',
                },
                {
                    title: '姓名',
                    key: 'name'
                },
                {
                    title: '手机',
                    key: 'mobile'
                },
                {
                    title: '所属部门',
                    key: 'department'
                },
                {
                    title: '是否锁定',
                    key: 'look',
                    align: 'center',
                    render:(h, params)=>{
                        if(params.row.look==1){
                            return h('Icon',{
                                props:{
                                    type:"android-done",
                                },
                                style:{
                                    color:"#2d8cf0",
                                    fontSize:"20px"
                                }
                            });
                        }else{
                            return h('Icon',{
                                props:{
                                    type:"android-close",
                                },
                                style:{
                                    color:"#ed3f14"
                                }
                            });
                        }
                         
                    }
                },
                {
                    title: '操作',
                    key: 'action',
                    width: 350,
                    align: 'center',
                    render: (h, params) => {
                        return h('div', [
                            h('Button', {
                                props: {
                                    type: 'primary',
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
                            }, '编辑'),
                            h('Button', {
                                props: {
                                    type: 'primary',
                                    size: 'small'
                                },
                                 style: {
                                    marginRight: '5px'
                                },
                                on: {
                                    click: () => {
                                        this.remove(params.index)
                                    }
                                }
                            }, '重置密码'),
                            h('Button', {
                                props: {
                                    type: 'primary',
                                    size: 'small'
                                },
                                 style: {
                                    marginRight: '5px'
                                },
                                on: {
                                    click: () => {
                                        this.remove(params.index)
                                    }
                                }
                            }, '禁用'),
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
                                        this.remove(params.index)
                                    }
                                }
                            }, '默认方案'),
                            h('Button', {
                                props: {
                                    type: 'error',
                                    size: 'small'
                                },
                                 style: {
                                    marginRight: '5px'
                                },
                                on: {
                                    click: () => {
                                        this.remove(params.index)
                                    }
                                }
                            }, '删除'),
                        ]);
                    }
                }
            ],
            data6: [
                {
                    role:"医生",
                    username:"1245786",
                    time:"2017-11-30 11:08:30",
                    action:"随访测试",
                    name:"测试",
                    mobile:14578884125,
                    department:"技术部",
                    look:1,
                },
                {
                    role:"医生",
                    username:"1245786",
                    time:"2017-11-30 11:08:30",
                    action:"随访测试",
                    name:"测试",
                    mobile:14578884125,
                    department:"技术部",
                    look:1,
                },
                {
                    role:"医生",
                    username:"1245786",
                    time:"2017-11-30 11:08:30",
                    action:"随访测试",
                    name:"测试",
                    mobile:14578884125,
                    department:"技术部",
                    look:1,
                },
                {
                    role:"医生",
                    username:"1245786",
                    time:"2017-11-30 11:08:30",
                    action:"随访测试",
                    name:"测试",
                    mobile:14578884125,
                    department:"技术部",
                    look:1,
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
        remove(index) {
            this.data6.splice(index, 1);
        },
        adduser(){
            this.$router.push('/access/user/user_add/0');
        },
        changePage(){

        },
        searchuser(){
            
        }
    }
}
</script>


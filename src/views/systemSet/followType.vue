<style lang="less">
.sys-follow {
    &_main {
        &_list {}
        &_page{
            margin-top: 10px;
        }
    }
}
</style>


<template>
    <div class="user">
        <div class="sys-follow_main">
            <div class="sys-follow_main_list">
                <Table border :columns="columns7" :data="data6"></Table>
            </div>
            <Row class="sys-follow_main_page">
            <Page :total="100" :current="1" show-elevator show-total style="float:right" @on-change="changePage"></Page>
            </Row>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            columns7: [
                {
                    title: '序号',
                    key: 'role',
                },
                {
                    title: '随访类型',
                    key: 'username'
                },
                {
                    title: '详细说明',
                    key: 'time'
                },
                {
                    title: '优先级',
                    key: 'name'
                },
                {
                    title: '操作',
                    key: 'action',
                    width: 200,
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
							}, '修改优先级'),
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
                    look:1,
                },
                {
                    role:"医生",
                    username:"1245786",
                    time:"2017-11-30 11:08:30",
                    action:"随访测试",
                    name:"测试",
                    mobile:14578884125,
                    look:1,
                },
                {
                    role:"医生",
                    username:"1245786",
                    time:"2017-11-30 11:08:30",
                    action:"随访测试",
                    name:"测试",
                    mobile:14578884125,
                    look:1,
                },
                {
                    role:"医生",
                    username:"1245786",
                    time:"2017-11-30 11:08:30",
                    action:"随访测试",
                    name:"测试",
                    mobile:14578884125,
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
            this.$router.push('/access/user/sys-follow_add/0');
        },
        changePage(){

        },
        searchuser(){
            
        }
    }
}
</script>


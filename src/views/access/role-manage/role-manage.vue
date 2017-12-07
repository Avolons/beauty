<style lang="less">
    .role{
        &_main{
            &_add{
                margin-bottom: 10px;
            }
            &_list{
                
            }
            &_page{
                margin-top: 10px;
            }
        }
    }
</style>


<template>
  <div class="role">
      <div class="role_main">
          <div class="role_main_add">
            <Button @click="addrole" type="primary">新增角色</Button>
          </div>
          <div class="role_main_list">
            <Table border :columns="columns7" :data="data6"></Table>
          </div>
          <Row class="role_main_page">
            <Page :total="100" :current="1" style="float:right" @on-change="changePage"></Page>
         </Row>
      </div>
  </div>
</template>

<script>
export default {
        data () {
            return {
                columns7: [
                    {
                        title: '编号',
                        key: 'number',
                    },
                    {
                        title: '名称',
                        key: 'name'
                    },
                    {
                        title: '说明',
                        key: 'message'
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
                                        type: 'error',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.remove(params.index)
                                        }
                                    }
                                }, '删除')
                            ]);
                        }
                    }
                ],
                data6: [
                    {
                        name: 'John Brown',
                        number: 18,
                        message: 'New York No. 1 Lake Park'
                    },
                    {
                        name: 'Jim Green',
                        number: 24,
                        message: 'London No. 1 Lake Park'
                    },
                    {
                        name: 'Joe Black',
                        number: 30,
                        message: 'Sydney No. 1 Lake Park'
                    },
                    {
                        name: 'Jon Snow',
                        number: 26,
                        message: 'Ottawa No. 2 Lake Park'
                    }
                ]
            }
        },
        methods: {
            show (index) {
                this.$Modal.info({
                    title: 'User Info',
                    content: `Name：${this.data6[index].name}<br>Age：${this.data6[index].age}<br>Address：${this.data6[index].address}`
                })
            },
            remove (index) {
                this.data6.splice(index, 1);
            },
            changePage(){

            },
            addrole(){
                this.$router.push('/access/role/role_add/0');
            }
        }
    }
</script>


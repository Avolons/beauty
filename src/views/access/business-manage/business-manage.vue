
<style lang="less">
    .business{
        &_main{
            &_header{
                margin-bottom: 15px;
            }
            &_page{
                margin-top: 15px;
            }
        }
    }
</style>
<template>
  <div class="business">
      <div class="business_main">
          <Row class="business_main_header">
              <Col span="18">
                <Input v-model="searchResult" placeholder="请输入企业名称" style="width: 200px" />
                <span @click="searchBus" style="margin: 0 10px;"><Button type="primary" icon="search">搜索</Button></span>
                <Button @click="cancelSearch" type="ghost" >取消</Button>
              </Col>
              <Col span="6">
               <Button @click="addBusiness" type="primary" style="float:right">新增企业</Button>
              </Col>
          </Row>
          <Row class="business_main_list">
             <Table border :columns="tableHeader" :data="tableData"></Table>
          </Row>
         <Row class="business_main_page">
            <Page :total="100" :current="1" style="float:right" @on-change="changePage"></Page>
         </Row>
         
      </div>
  </div>
</template>

<script>
export default {
        data () {
            return {
                
                searchResult:"",//搜索内容
                /* 表格表头 */
                tableHeader: [
                    {
                        title: '企业名称',
                        key: 'name',
                    },
                    {
                        title: '企业地址',
                        key: 'address'
                    },
                    {
                        title: '联系电话',
                        key: 'phone'
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 270,
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
                                            this.edit(params.index)
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
                                            this.manage(params.index)
                                        }
                                    }
                                }, '管理部门'),
                                h('Button', {
                                    props: {
                                        type: 'info',
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
                                }, '查看架构'),
                                h('Button', {
                                    props: {
                                        type: 'warning',
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
                /* 表格内容 */
                tableData: [
                    {
                        name: '海宁医院',
                        address: '浙江省杭州市拱墅区',
                        phone: '1712457845',
                    },
                    {
                        name: '上海东方医院',
                        address: '上海市黄浦区桂林路',
                        phone: '1712457845'
                    },
                    {
                        name: '上海华山医院',
                        address: '上海市徐汇区华山路127号',
                        phone: '1712457845'
                    },
                    {
                        name: '浙江西溪医院',
                        address: '浙江省余杭区教工路111号',
                        phone: '1712457845'
                    }
                ],
                pageNumber:10,//一页的数据
                page:1,//当前分页
                totalPage:100//总数据条数
            }
        },
        methods: {
            /**
             * 编辑企业/进入企业编辑
             */
            edit (index) {
                this.$router.push('business/add/0');
            },
            /** 
             * 管理部门
             */
            manage(index){
                this.$router.push('business/business_depart/0');
            },
            /**
             * 删除当前企业（危险操作）
             */
            remove (index) {
                this.$Modal.confirm({
                    title:"删除企业",
                    content:"确定删除该企业",
                    okText:"确定",
                    cancelText:"取消",
                    onOk(){
                        this.data6.splice(index, 1);
                    }
                });
            },
            /**
             * 添加新企业
             */
            addBusiness(index){
                this.$router.push('business/add/0');
            },
            
            /** 
             * 分页改变,返回点击后的分页代码
             */
            changePage(index){
                
            },
            /** 
             * 搜索
             */
            searchBus(){

            },
            /** 
             * 取消搜索
             */
            cancelSearch(){

            }

        }
    }
</script>



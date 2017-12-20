
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
                <Button @click="initData" type="ghost" >取消</Button>
              </Col>
              <Col span="6">
               <Button @click="edit(0)" type="primary" style="float:right">新增企业</Button>
              </Col>
          </Row>
          <Row class="business_main_list">
             <Table border :columns="tableHeader" :data="tableData"></Table>
          </Row>
         <Row class="business_main_page">
            <Page :total="totalPage" show-elevator :current="page" style="float:right" @on-change="changePage"></Page>
         </Row>
         
      </div>
  </div>
</template>

<script>
import {API} from '../../../services';
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
                                            this.edit(1,params.row.id)
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
                                            this.manage(params.row.id)
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
                                            this.lookTree(params.row.id)
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
                                            this.remove(params.row.id)
                                        }
                                    }
                                }, '删除')
                            ]);
                        }
                    }
                ],
                /* 表格内容 */
                tableData: [],
                pageNumber:10,//一页的数据
                page:1,//当前分页
                totalPage:100//总数据条数
            }
        },
        methods: {
            /**
             * 编辑企业/进入企业编辑
             * type 0添加企业 1编辑企业
             * id 
             */
            edit(type,id=-1) {
                this.$router.push({
                    path:"/access/business/add",
                    query:{
                        type:type,
                        business_id:id
                    }
                });
            }, 
            /** 
             * 管理部门
             */
            manage(id){
                this.$router.push({
                    path:"/access/business/depart",
                    query:{
                        business_id:id
                    }
                });
            },
            /**
             * 删除当前企业（危险操作）
             */
            remove (id) {
                let self=this;
                this.$Modal.confirm({
                    title:"删除企业",
                    content:"确定删除该企业",
                    okText:"确定",
                    cancelText:"取消",
                    onOk(){
                        API.Jurisdiction.deletBusiness({
                            id:id
                        }).then((res)=>{
                            self.initData();
                            this.$Message.success("成功删除");
                        }).catch((err)=>{

                        });
                    }
                });
            },
            /** 
             * 分页改变,返回点击后的分页代码
             */
            changePage(index){
                this.page=index;
                this.getList(); 
            },
            /** 
             * 搜索
             */
            searchBus(){
                if(!this.searchResult.trim()){
                    this.$Message.error('请输入搜索条件');
                    this.searchResult="";
                }else{
                    this.page=1;
                    this.getList();
                }
            },
            /** 
             * 获取企业列表
             */
            getList(){
                API.Jurisdiction.listBusiness({
                    page: this.page,  //当前页码
                    namelk:this.searchResult
                }).then((res)=>{
                    this.totalPage=res.totleRow;
                    this.tableData=res.data;
                }).catch((err)=>{
                });
            },
            /** 
             * 初始化数据
             */
            initData(){
                /* 重置所有条件 */
                this.page=1;
                this.searchResult="";
                this.getList();
            },
            /** 
             * 查看架构
             */
            lookTree(id){

            }
        },
        mounted () {
           this.initData(); 
        }
    }
</script>



<style lang="less">
.sys-tasklog {
    &_main {
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
					flex-shrink: 0;
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
        <div class="sys-tasklog_main">
            <Row class="sys-tasklog_main_search" :gutter="15">
                <Col span="6">
                <span>
                    任务名称：
                </span>
                <Input v-model="searchParam.namelk"  placeholder="请输入任务名称"></Input>
                </Col>
				<Col span="6">
                <span>
                    是否成功：
                </span>
                <Select v-model="searchParam.state" style="width:200px">
                    <Option value="" >全部</Option>
                    <Option value=0 >成功</Option>
                    <Option value=1 >未成功</Option>
                </Select>
                </Col>
                <Col span="6">
					<Button @click="searchParam.page=1;getData()" type="primary">查询</Button>
                </Col>
                
            </Row>
            <div class="sys-tasklog_main_list">
                <Table border :columns="config" :data="dataList" :loading="createLoading"></Table>
            </div>
            <Row class="sys-tasklog_main_page">
            <Page show-total  :total="totalPage" :current="searchParam.page" show-elevator style="float:right" @on-change="changePage"></Page>
            </Row>
        </div>
    </div>
</template>

<script>
import { API } from '../../services/index.js';
export default {
    data() {
        return {
            createLoading:true,    //loading 动画加载中
            searchParam:{
                 page: 1,//当前页码
                 namelk:"",
                 state:null,
                 limit:10
            },
            totalPage: 10,//总页码
            config: [
                {
                    title: '序号',
                    key: 'id',
                },
                {
                    title: '任务名称',
                    key: 'moduleName'
                },
                {
                    title: '主机',
                    key: 'hostname'
                },
                {
                    title: 'IP地址',
                    key: 'ipAddress',
				},
				{
                    title: '是否成功',
                    key: 'look',
                    align: 'center',
                    render:(h, params)=>{
                        if(params.row.isSuccess){
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
                    title: '开始时间',
                    key: 'createdAt'
                },
                {
                    title: '结束时间',
                    key: 'updatedAt'
                },
            ],
            dataList: []
        }
    },
    methods: {
        /** 
         * 搜索日志
         */
        searchResult(){
            this.searchParam.page=1;
            this.getData();
        },
        /** 
         * 获取数据
         */
        getData(){
            API.Systems.listTimeLog(this.searchParam).then((res) => {
                this.totalPage=res.total;
                this.dataList=res.data;
                this.createLoading = false;
            }).catch((err) => {

            });
        },
        /** 
         * 页码更改
         */
        changePage(page){
            this.searchParam.page=page;
            this.getData();
        },
    },mounted () {
        this.getData();
    }
}
</script>


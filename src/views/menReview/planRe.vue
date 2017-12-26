<style lang="less">
.sys-dis {
    &_main {
        &_list {}
        &_search {
            box-sizing: border-box;
            margin-bottom: 10px;
            .ivu-col {
                display: flex;
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
        <div class="sys-dis_main">
            <Row class="sys-dis_main_search" :gutter="15">
                <Col span="6">
                <span>
                    疾病名称：
                </span>
                <Input v-model="searchParam.dsName" placeholder="请输入疾病名称"></Input>
                </Col>
                <Col span="6">
                <span>
                    助记码：
                </span>
                <Input v-model="searchParam.zName" placeholder="请输入助记码"></Input>
                </Col>
                <Col span="6">
                <span>
                    ICD编码：
                </span>
                <Input v-model="searchParam.iName" placeholder="请输入ICD编码"></Input>
                </Col>
                <Col span="6">
                <Button @click="searchData" type="primary" style="margin-left:15px">查询</Button>
                <Button @click="modal=true" type="info" style="margin-left:15px">新增</Button>
                </Col>
            </Row>
            <div class="sys-dis_main_list">
                <Table border :columns="config" :data="dataList"></Table>
            </div>
            <Row class="sys-dis_main_page">
                <Page :page-size="pageSize" :total="totalPage" :current="searchParam.page" show-elevator style="float:right" @on-change="changePage"></Page>
            </Row>
        </div>
    </div>
</template>

<script>
import { API } from '../../services';
export default {
    data() {
        return {
            totalPage: 10,//总页码
            pageSize: 10,
            diseaseId:11,//被选中的疾病id
            actionList: {
                departmentId: -1,//部门ID 
                diseaseId: -1 //疾病ID
            },
            //搜索参数
            searchParam: {
                page: 1,//当前页码
                dsName: "",//疾病名称
                zName: "",//助记码
                iName: "", //ICD编码
            },
            //当前被点击触发的数据
            currentInfo: {
                id: "11",
                name: "", //疾病名称
                zjmName: "",//助记码
                icdName: "", //ICD编码
                state: "0",//状态（0正常，1禁用）
                remark: "" //备注
            },
            //添加的数据
            formData: {
                name: "", //疾病名称
                zjmName: "",//助记码
                icdName: "", //ICD编码
                state: "0",//状态（0正常，1禁用）
                remark: "" //备注
            },
            departList: [],//部门列表接口
            tempList: [{
                name:"所有疾病",
                id:-1,
            },{
                name:"公共模板",
                id:0,
            }],//模板方案列表
            actionmodal: false,
            editmodal: false,
            modal: false,
            //列表配置
            config: [
                {
                    title: '助记码',
                    key: 'zjm',
                    render: (h, params) => {
                        return params.row.disease.zjm
                    }
                },
                {
                    title: 'ICD编码',
                    key: 'icd',
                    render: (h, params) => {
                        return params.row.disease.icd
                    }
                },
                {
                    title: '名称',
                    key: 'name',
                    render: (h, params) => {
                        return params.row.disease.name
                    }
                },
                {
                    title: '默认方案',
                    key: 'qtName',
                    /*  render:(h,params)=>{
                         return params.row.disease.pid
                     } */
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
                                        this.editDisease(params.row);
                                    }
                                }
                            }, '编辑'),
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
                                        this.actionDisease(params.row.disease.id);
                                    }
                                }
                            }, '默认方案'),
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
                                        this.delDisease(params.row.disease.id);
                                    }
                                }
                            }, '删除'),
                        ]);
                    }
                }
            ],
            dataList: [],
            actionTree: [],//方案列表
        }
    },
    methods: {
        /** 
         * 获取所有数据
         */
        getData() {
            API.Systems.listDisease(this.searchParam).then((res) => {
                this.dataList = res.data;
                this.totalPage = res.totalRow;
                this.pageSize = res.pageSize;
            }).catch((err) => {

            });
        },
        /** 
         * 搜索数据
         */
        searchData() {
            this.searchParam.page = 1;
            this.getData();
        },
        /** 
         * 设置默认模板
         */
        actionDisease(id) {
            console.log(id);
            this.actionmodal = true;
            this.diseaseId=id;
            this.actionList= {
                departmentId: -1,//部门ID 
                diseaseId: -1 //疾病ID
            };
            this.listDisTemp();
        },
       
        /** 
         * 新增系统设置
         */
        addDisease() {
            this.$refs["formData"].validate((valid) => {
                if (valid) {
                    API.Systems.addDisease(this.formData).then((res) => {
                        this.$Message.success("新增成功");
                        this.modal = false;
                        this.getData();
                        this.formData = {
                            name: "", //疾病名称
                            zjmName: "",//助记码
                            icdName: "", //ICD编码
                            state: "0",//状态（0正常，1禁用）
                            remark: "" //备注
                        };
                    }).catch((err) => {

                    });
                } else {
                    this.$Message.error('补全信息!');
                    return false;
                }

            })
        },
        /** 
         * 删除疾病
         */
        delDisease(id) {
            let self = this;
            this.$Modal.confirm({
                title: '删除疾病',
                content: '确定删除该疾病？',
                onOk: () => {
                    API.Systems.delDisease({
                        id: id
                    }).then((res) => {
                        self.$Message.success("删除成功");
                        self.getData();
                    }).catch((err) => {

                    });
                }
            });

        },
        /** 
         * 编辑疾病设置
         */
        editDisease(data) {
            this.editmodal = true;
            let copyData = JSON.parse(JSON.stringify(data.disease));
            this.currentInfo = {
                id: copyData.id,
                name: copyData.name, //疾病名称
                zjmName: copyData.zjm,//助记码
                icdName: copyData.icd, //ICD编码
                state: copyData.isUse ? "0" : "1",//状态（0正常，1禁用）
                remark: copyData.remark //备注
            }
        },
        /** 
         * 查询所有部门接口
         */
        listDisDepart() {
            API.Systems.listDisDepart().then((res) => {
                this.departList = [{
                   name:"所有科室",
                   id:-1 
                },{
                   name:"公共科室",
                   id:0
                }].concat(res.data);
            }).catch((err) => {

            });
        },
        /** 
         * 查询对应的模板
         */
        listDisTemp() {
            API.Systems.listDisTemp({
                departmentId:this.actionList.departmentId==-1?null:this.actionList.departmentId,
                diseaseId:this.actionList.diseaseId==-1?null:this.actionList.diseaseId
            }).then((res) => {
                this.actionTree = res.data;
            }).catch((err) => {

            });
        },
        /** 
         * 保存方案
         */
        saveDisAction(id) {
            API.Systems.saveDisAction({
               id:this.diseaseId,
               qtId:id
            }).then((res) => {
                this.$Message.success("选择成功");
                this.actionmodal=false;
                this.getData();
            }).catch((err) => {

            });
        },
        /** 
         * 提交修改
         */
        submitDisease() {
            this.$refs['currentInfo'].validate((valid) => {
                if (valid) {
                    API.Systems.editDisease(this.currentInfo).then((res) => {
                        this.$Message.success("修改成功");
                        this.editmodal = false;
                        this.getData();
                    }).catch((err) => {

                    });
                } else {
                    this.$Message.error('补全信息!');
                }

            })
        },
        /** 
         * 分页更改
         */
        changePage(page) {
            this.searchParam.page = page;
            this.getData();
        }

    }, mounted() {
        this.getData();
        this.listDisDepart();
    }
}
</script>


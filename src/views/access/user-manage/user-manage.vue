<style lang="less">
.user {
    &_main {
        &_add {
            margin-bottom: 10px;
        }
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
                    <Option value="0" >管理员</Option>
                    <Option value="1" >医生</Option>
                </Select>
                </Col>
                <Col span="6">
                <span>
                    状态：
                </span>
                <Select v-model="model1" style="width:200px">
                   <Option value="0" >锁定</Option>
                   <Option value="1" >正常</Option>
                </Select>
                </Col>
            </Row>
            <div class="user_main_add">
                <Button @click="searchUser" type="primary">查询</Button>
                <Button @click="adduser" type="primary">新增用户</Button>
            </div>
            <div class="user_main_list">
                <Table border :columns="config" :data="dataList"></Table>
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
            totalPage: 10,//总页码
            pageSize: 10,//每页数据
            //搜索参数
            searchParam: {
                page: 1,//当前页码
                dsName: "",//疾病名称
                zName: "",//助记码
                iName: "", //ICD编码
            },
            config: [
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
            dataList: []
        }
    },
    methods: {
       /** 
         * 获取所有数据
         */
        getData() {
            API.Systems.listUser(this.searchParam).then((res) => {
                this.dataList = res.data;
                this.totalPage = res.totalRow;
                this.pageSize = res.pageSize;
            }).catch((err) => {

            });
        },
        /** 
         * 搜索数据
         */
        searchUser() {
            this.searchParam.page = 1;
            this.getData();
        },
        /** 
         * 设置默认模板
         */
        actionUser(id) {
            console.log(id);
            this.actionmodal = true;
            this.UserId=id;
            this.actionList= {
                departmentId: -1,//部门ID 
                UserId: -1 //疾病ID
            };
            this.listDisTemp();
        },
       
        /** 
         * 新增系统设置
         */
        addUser() {
            this.$refs["formData"].validate((valid) => {
                if (valid) {
                    API.Systems.addUser(this.formData).then((res) => {
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
        delUser(id) {
            let self = this;
            this.$Modal.confirm({
                title: '删除疾病',
                content: '确定删除该疾病？',
                onOk: () => {
                    API.Systems.delUser({
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
        editUser(data) {
            this.editmodal = true;
            let copyData = JSON.parse(JSON.stringify(data.User));
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
                UserId:this.actionList.UserId==-1?null:this.actionList.UserId
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
               id:this.UserId,
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
        submitUser() {
            this.$refs['currentInfo'].validate((valid) => {
                if (valid) {
                    API.Systems.editUser(this.currentInfo).then((res) => {
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
    }
}
</script>


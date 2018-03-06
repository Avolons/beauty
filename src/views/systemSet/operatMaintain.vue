<style lang="less" scoped>
.sys-sysset {
    &_main {
        &_list {
            margin-top: 10px;
        }
        &_page {
            margin-top: 10px;
        }
    }
}
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
        <div class="sys-sysset_main">

            <Row class="sys-tasklog_main_search" :gutter="15">
                <Col span="6">
                <span>
                        名称：
                    </span>
                <Input   placeholder="请输入名称" v-model="serchSyst.trueName"></Input>
                </Col>
                <Col span="6">
                <span>
                            手机号码：
                        </span>
                <Input   placeholder="请输入手机号码" v-model="serchSyst.phone"></Input>
                </Col>

                <Col span="6" style="">
                <Button  type="primary" style="margin-right: 10px;" @click="searchData">查询</Button>
                <Button @click="modal=true;formData.sort=0" v-if="!menuShow(this.AM.Systems.addMaintainDate)" type="primary">添加</Button>
                </Col>
            </Row>

            <div class="sys-sysset_main_list">
                <Table border :columns="config" :data="dataList" :loading="createLoading"></Table>
            </div>
            <Row class="sys-sysset_main_page" >
                <Page :page-size="pageSize" :total="totalPage" :current="page" show-elevator style="float:right" show-total  @on-change="changePage"></Page>
            </Row>
        </div>
        <Modal v-model="modal" title="添加参数" >
            <Form ref="addData" class="sys-sysset_main_form" :model="formData" :rules="validate.operDate" :label-width="80">

                <FormItem label="名称" prop="trueName">
                    <Input v-model="formData.trueName" placeholder="请输入名称"></Input>
                </FormItem>
                <FormItem label="手机号码" prop="phone">
                    <Input v-model="formData.phone" placeholder="请输入手机号码"></Input>
                </FormItem>


                <FormItem label="备注" prop="remark">
                    <Input v-model="formData.remark" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请填写备注"></Input>
                </FormItem>
            </Form>
            <div slot="footer" class="sys-sysset_main_btnList">
                <Button type="primary" @click="addSetting">确认</Button>
            </div>
        </Modal>
        <Modal v-model="editmodal" title="编辑参数" >
            <Form ref="editData" class="sys-sysset_main_form" :model="currentInfo" :rules="validate.operDate" :label-width="80">
                <FormItem label="名称" prop="trueName">
                    <Input  v-model="currentInfo.trueName" placeholder="请输入名称"></Input>
                </FormItem>
                <FormItem label="手机号码" prop="phone">
                    <Input v-model="currentInfo.phone"  placeholder="请填写手机号码"></Input>
                </FormItem>
                <FormItem label="备注" prop="remark">
                    <Input v-model="currentInfo.remark" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请填写备注"></Input>
                </FormItem>
            </Form>
            <div slot="footer" class="sys-sysset_main_btnList">
                <Button type="primary" @click="submitSetting">确认</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
import { API } from '../../services/index.js';
export default {
    data() {
        return {
            createLoading:true,    //loading 动画加载中
            page: 1,//当前页码
            totalPage: 0,//总页码
            pageSize:10,
            //搜索数据
            serchSyst: {
                trueName: '',  //名称（可选）
                phone: '' //手机号码（可选）
            },
            //当前被点击触发的数据
            currentInfo: {
                trueName: '',  //名称
                phone: '',           //手机号码
                remark: ''                     //备注
            },

            //添加的数据
            formData: {
                trueName: '',  //名称
                phone: '',           //手机号码
                remark: ''                     //备注

            },
            //添加的显示隐藏
            editmodal:false,
            modal: false,
            config: [
                {
                    title: '名称',
                    key: 'trueName',
                },
                {
                    title: '手机号码',
                    key: 'phone'
                },
                {
                    title: '创建时间',
                    key: 'dateAdd',
                },
                {
                    title: '备注',
                    key: 'remark'
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
                                'class': {
									menuHide:this.menuShow(this.AM.Systems.editorMaintainDate)
								},
                                on: {
                                    click: () => {
                                        this.editSetting(params.row)
                                    }
                                }
                            }, '编辑'),
                            h('Button', {
                                props: {
                                    type: 'warning',
                                    size: 'small'
                                },
                                style: {
                                    marginRight: '5px'
                                },
                                'class': {
									menuHide:this.menuShow(this.AM.Systems.MaintainDel)
								},
                                on: {
                                    click: () => {
                                        this.delSetting(params.row.id)
                                    }
                                }
                            }, '删除'),
                        ]);
                    }
                }
            ],
            dataList: [

            ]
        }
    },
    methods: {
        /**
         * 查询
         */
        searchData () {
            this.page = 1;
            this.getData();
        },
        /** 
         * 获取所有数据
         */
        getData () {
            API.Systems.operateMaintainList({
                pager: this.page,
                limit: 10,
                trueName: this.serchSyst.trueName,
                phone: this.serchSyst.phone,
            }).then((res) => {
                this.dataList=res.data;
                this.totalPage = res.total;
				// this.pageSize = res.pageSize;
				this.createLoading = false;
            }).catch((err) => {

            });
        },
        /** 
         * 新增系统设置
         */
        addSetting () {
            this.$refs['addData'].validate((valid) => {
                if (valid) {
                    this.createLoading = true;
                    API.Systems.addOperateMaDate(this.formData).then((res) => {
                        this.$Message.success("新增成功");
                        this.modal=false;
                        this.getData();
                        this.formData= {
                            trueName: '',  //名称
                            phone: '',           //手机号码
                            remark: ''                     //备注
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
         * 删除系统设置
         */
        delSetting (id) {
            let self = this;
            this.$Modal.confirm({
                title: '删除设置',
                content: '确定删除该运营维护吗？',
                onOk: () => {
                    this.createLoading = true;
                    API.Systems.delOperateMaDate({
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
         * 编辑系统设置
         */
        editSetting(data) {
            console.log(data)
            this.editmodal=true;
            this.currentInfo = JSON.parse(JSON.stringify(data));
        },
        /** 
         * 提交修改
         */
        submitSetting() {
            this.createLoading = true;
            this.$refs['editData'].validate((valid) => {
                if (valid) {
                    API.Systems.modifyOperateMaDate({
                        id:this.currentInfo.id,
                        trueName: this.currentInfo.trueName,  //名称
                        phone:this.currentInfo.phone,           //手机号码
                        remark:this.currentInfo.remark,
                    }).then((res) => {
                        this.$Message.success("修改成功");
                        this.editmodal=false;
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
            this.page = page;
            this.getData();
        },
    },
    mounted() {
        this.getData();
    }
}
</script>


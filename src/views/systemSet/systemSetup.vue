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
        <div class="sys-sysset_main">

            <Row class="sys-tasklog_main_search" :gutter="15">
                <Col span="6">
                <span>
                    编码：
                </span>
                <Input placeholder="请输入编码" v-model="serchSyst.key"></Input>
                </Col>
                <Col span="6">
                <span>
                    值：
                </span>
                <Input placeholder="请输入值" v-model="serchSyst.value"></Input>
                </Col>
                <Col span="6">
                <span>
                    备注：
                </span>
                <Input placeholder="请输入备注" v-model="serchSyst.remark"></Input>
                </Col>
                <Col span="6">
                <span>
                    分类信息：
                </span>
                <Input placeholder="请输入分类信息" v-model="serchSyst.mainType"></Input>
                </Col>
                <Col span="6" style="margin-top: 10px">
                <Button type="primary" style="margin-right: 10px;" @click="searchData">查询</Button>
                <Button @click="modal=true;formData.sort=0" v-if="!menuShow(this.AM.Systems.addSystem)" type="primary">添加</Button>

                </Col>

            </Row>

            <div class="sys-sysset_main_list">
                <Table border :columns="config" :data="dataList" :loading="createLoading"></Table>
            </div>
            <Row class="sys-sysset_main_page" v-if="totalPage>10">
                <Page :page-size="pageSize" :total="totalPage" :current="page" show-elevator style="float:right" show-total @on-change="changePage"></Page>
            </Row>
        </div>
        <Modal v-model="modal" title="添加参数">
            <Form ref="addData" class="sys-sysset_main_form" :model="formData" :rules="validate.system" :label-width="80">
                <FormItem label="类型" prop="type">
                    <Select v-model="formData.type" placeholder="请选择类型">
                        <Option v-for="item in typeList" :value="item.id" :key="item.id">{{ item.label }}</Option>
                    </Select>
                </FormItem>
                <FormItem label="编码" prop="key">
                    <Input v-model="formData.key" placeholder="请输入编码"></Input>
                </FormItem>
                <FormItem label="分类信息" prop="mType">
                    <Input v-model="formData.mType" placeholder="请输入分类信息"></Input>
                </FormItem>
                <FormItem label="排序字段" prop="sort">
                    <InputNumber :min="0" v-model="formData.sort"></InputNumber>
                </FormItem>
                <FormItem label="参数值" prop="value">
                    <Input v-model="formData.value" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请填写参数值"></Input>
                </FormItem>
                <FormItem label="备注" prop="remark">
                    <Input v-model="formData.remark" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请填写备注"></Input>
                </FormItem>
            </Form>
            <div slot="footer" class="sys-sysset_main_btnList">
                <Button type="primary" @click="addSetting">确认</Button>
            </div>
        </Modal>
        <Modal v-model="editmodal" title="编辑参数">
            <Form ref="editData" class="sys-sysset_main_form" :model="currentInfo" :rules="validate.system" :label-width="80">
                <FormItem label="编码" prop="key">
                    <Input disabled v-model="currentInfo.key" placeholder="请输入编码"></Input>
                </FormItem>
                <FormItem label="参数值" prop="value">
                    <Input v-model="currentInfo.value" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请填写参数值"></Input>
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
            createLoading: true,    //loading 动画加载中
            page: 1,//当前页码
            totalPage: 0,//总页码
            pageSize: 10,
            //搜索数据
            serchSyst: {
                key: '',  //编码（可选）
                value: '',   //值(可选)
                remark: '',  //备注（可选）
                mainType: '' //分类信息（可选）
            },
            //当前被点击触发的数据
            currentInfo: {
                type: "",
                key: "",
                value: "",
                remark: "",
            },

            //添加的数据
            formData: {
                type: "",
                key: "",
                value: "",
                remark: "",
                mType: "",
                sort: 0,
            },
            //类型选项列表
            typeList: [
                {
                    id: 0,
                    label: "文本字符串",
                },
                {
                    id: 1,
                    label: "开关",
                },
                {
                    id: 2,
                    label: "上传文件",
                },
            ],
            //添加的显示隐藏
            editmodal: false,
            modal: false,
            config: [
                {
                    title: '编码',
                    key: 'key',
                },
                {
                    title: '值',
                    key: 'value'
                },
                {
                    title: '分类信息',
                    key: 'mainType',
                },
                {
                    title: '排序字段',
                    key: 'sort'
                },
                {
                    title: '备注',
                    key: 'remark'
                },
                {
                    title: '创建时间',
                    key: 'creatAt'
                },
                {
                    title: '修改时间',
                    key: 'updateAt'
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
                                    menuHide: this.menuShow(this.AM.Systems.editSystem)
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
                                    menuHide: this.menuShow(this.AM.Systems.delSystem)
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
        searchData() {
            this.page = 1;
            this.getData();
        },
        /** 
         * 获取所有数据
         */
        getData() {
            API.Systems.listSystem({
                page: this.page,
                key: this.serchSyst.key,
                value: this.serchSyst.value,
                remark: this.serchSyst.remark,
                mainType: this.serchSyst.mainType
            }).then((res) => {
                this.dataList = res.data;
                this.totalPage = res.totleRow;
                this.pageSize = res.pageSize;
                this.createLoading = false;
            }).catch((err) => {

            });
        },
        /** 
         * 新增系统设置
         */
        addSetting() {
            /* this.createLoading = true; */
            this.$refs['addData'].validate((valid) => {
                if (valid) {
                    this.createLoading = true;
                    API.Systems.addSystem(this.formData).then((res) => {
                        this.$Message.success("新增成功");
                        this.modal = false;
                        this.getData();
                        this.formData = {
                            type: "",
                            key: "",
                            value: "",
                            remark: "",
                        };
                    }).catch((err) => {

                    });
                } else {
                    /* this.$Message.error('补全信息!'); */
                    return false;
                }

            })
        },
        /** 
         * 删除系统设置
         */
        delSetting(id) {
            
            let self = this;
            this.$Modal.confirm({
                title: '删除设置',
                content: '确定删除该系统设置？',
                onOk: () => {
                    this.createLoading = true;
                    API.Systems.delSystem({
                        id: id
                    }).then((res) => {
                        this.createLoading = true;
                        self.$Message.success("删除成功");
                        self.getData();
                    }).catch((err) => {

                    });
                },
                onCancel: () => {
                    this.createLoading = false;
                }
            });

        },
        /** 
         * 编辑系统设置
         */
        editSetting(data) {
            this.editmodal = true;
            this.currentInfo = JSON.parse(JSON.stringify(data));
        },
        /** 
         * 提交修改
         */
        submitSetting() {
            this.createLoading = true;
            this.$refs['editData'].validate((valid) => {
                if (valid) {
                    API.Systems.editSystem({
                        id: this.currentInfo.id,
                        value: this.currentInfo.value,
                        remark: this.currentInfo.remark,
                    }).then((res) => {
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
            this.page = page;
            this.getData();
        },
    },
    mounted() {
        this.getData();
    }
}
</script>


<style lang="less">
.role {
    &_main {
        &_add {
            margin-bottom: 10px;
        }
        &_list {}
        &_page {
            margin-top: 10px;
        }
    }
}
</style>


<template>
    <div class="role">
        <div class="role_main">
            <div class="role_main_add">
                <Button @click="addRole" type="primary">新增角色</Button>
            </div>
            <div class="role_main_list">
                <Table border :columns="config" :data="dataList"></Table>
            </div>
            <!-- <Row class="role_main_page">
                <Page :total="100" :current="1" style="float:right" @on-change="changePage"></Page>
             </Row> -->
            <Modal v-model="modal" title="title">
                <Form ref="addData" class="sys-sysset_main_form" :model="formData" :rules="validate.system" :label-width="80">
                    <FormItem label="名称" prop="key">
                        <Input v-model="formData.key" placeholder="请填写名称"></Input>
                    </FormItem>
                    <FormItem label="说明" prop="value">
                        <Input v-model="formData.value" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请填写说明"></Input>
                    </FormItem>
                    <FormItem label="权限" >
                        <Tree :data="treeList" show-checkbox multiple></Tree>
                    </FormItem>
                </Form>
                <div slot="footer" class="sys-sysset_main_btnList">
                    <Button type="primary" @click="submitRole">确认</Button>
                </div>
            </Modal>
        </div>
    </div>
</template>

<script>
import { API } from '../../../services';
export default {
    data() {
        return {
            title:"编辑参数",
            modal: false,
            //添加的数据
            formData: {
                type: "",
                key: "",
                value: "",
                remark: "",
            },
            config: [
                {
                    title: '编号',
                    key: 'id',
                },
                {
                    title: '名称',
                    key: 'name'
                },
                {
                    title: '说明',
                    key: 'profile'
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
                                        this.editRole(params.index)
                                    }
                                }
                            }, '编辑'),
                            h('Button', {
                                props: {
                                    type: 'warning',
                                    size: 'small'
                                },
                                on: {
                                    click: () => {
                                        this.delRole(params.row.id)
                                    }
                                }
                            }, '删除')
                        ]);
                    }
                }
            ],
            dataList: [],
            treeList: [
                    {
                        title: 'parent 1',
                        expand: true,
                        selected: true,
                        children: [
                            {
                                title: 'parent 1-1',
                                expand: true,
                                children: [
                                    {
                                        title: 'leaf 1-1-1',
                                        disabled: true
                                    },
                                    {
                                        title: 'leaf 1-1-2'
                                    }
                                ]
                            },
                            {
                                title: 'parent 1-2',
                                expand: true,
                                children: [
                                    {
                                        title: 'leaf 1-2-1',
                                        checked: true
                                    },
                                    {
                                        title: 'leaf 1-2-1'
                                    }
                                ]
                            }
                        ]
                    }
                ]
        }
    },
    methods: {
        submitRole(){
            this.$refs['addData'].validate((valid) => {
                if (valid) {
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
                    this.$Message.error('补全信息!');
                    return false;
                }

            })
        },
        /** 
         * 获取数据
         */
        getData() {
            API.Jurisdiction.listRoles().then((res) => {
                this.dataList = res.data;
            }).catch((err) => {

            });
        },
        /** 
        * 新增角色
        */
        addRole() {
            this.modal=true;
        },
        //编辑角色
        editRole(data){
           this.modal=true; 
        },
        delRole(id) {
            this.$Modal.confirm({
                title: '删除角色',
                content: '确定删除该角色？',
                onOk: () => {
                    API.Jurisdiction.delRoles({
                        id: id
                    }).then((res) => {
                        this.$Message.success("删除成功");
                        this.getData();
                    }).catch((err) => {

                    });
                }
            });
        },
    }, mounted() {
        this.getData();
    }
}
</script>


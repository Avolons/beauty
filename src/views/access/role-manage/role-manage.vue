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
        &_treeBox{
           /*  height: 400px;
            overflow-y: auto; */
        }
    }

}
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
    <div class="role">
        <div class="role_main">
            <Row class="business_main_header">
                <Col span="18">
                <Input  placeholder="角色名称" style="width: 200px" v-model="roleName"/>
                <span style="margin: 0 10px;" @click="searchBus"><Button type="primary" icon="search" >搜索</Button></span>
                <Button  type="ghost" @click="initData">取消</Button>
                </Col>
                <Col span="6">
                    <Button @click="addRole" v-if="!menuShow(this.AM.Jur.infoRoles)" type="primary" style="float: right;">新增角色</Button>
                </Col>
            </Row>
            <!--<div class="role_main_add">-->

            <!--</div>-->
            <div class="role_main_list">
                <Table border :columns="config" :data="dataList"></Table>
            </div>
            <Row class="role_main_page" v-if="totalPage>10">
                    <Page :total="totalPage" :current="1" style="float:right" @on-change="changePage"></Page>
            </Row>
            <Modal v-model="modal" :title="title" width="1000">
                <Form ref="addData" class="role_main_form" :model="formData" :rules="validate.system" :label-width="80">
                    <FormItem label="名称" prop="key">
                        <Input v-model="formData.key" placeholder="请填写名称"></Input>
                    </FormItem>
                    <FormItem label="说明" prop="value">
                        <Input v-model="formData.value" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请填写说明"></Input>
                    </FormItem>
                    <FormItem label="权限" >
                        <div class="role_main_treeBox">
                                <Tree :data="treeList" multiple ></Tree>
                        </div>
                    </FormItem>
                </Form>
                <div slot="footer" class="role_main_btnList">
                    <Button type="primary" @click="submitRole">确认</Button>
                </div>
            </Modal>
        </div>
    </div>
</template>

<script>
import { API } from '../../../services';
import {mapGetters, mapActions} from 'vuex';
export default {
    data() {
        return {
            title: "编辑参数",
            modal: false,
            page: 1,
            roleName:"",   //角色名称
            totalPage:100,
            //添加的数据
            formData: {
                type: "",
                key: "",
                value: "",
                remark: "",
            },
            //权限列表
            treeData: [],
            config: [
                // {
                //     title: '编号',
                //     key: 'id',
                // },
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
                                'class':{
									menuHide:this.menuShow(this.AM.Jur.editRoles)
								},
                                on: {
                                    click: () => {
                                        this.editRole(params.row.id,1);
//                                        //保存数据  当再次返回的时候进行重新赋值
//                                        this.saveRoleManageRecord({
//                                            "page":this.searchParam.page,       //页码
//                                        });

                                    }
                                }
                            }, '编辑'),
                            h('Button', {
                                props: {
                                    type: 'warning',
                                    size: 'small'
                                },
                                'class':{
									menuHide:this.menuShow(this.AM.Jur.delRoles)
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
            //权限树
            treeList: [
                {
                    title: '认识医生',
                    expand: true,
                    /* selected: true, */
                    children: [

                    ]
                }
            ]
        }
    },
    computed:{
        ...mapGetters([
            'authorToken'
        ]),
    },

    methods: {
        ...mapActions(['saveRoleManageRecord']),
        submitRole() {
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
         * 获取数据 搜索角色名称
         */
        searchBus(){
            this.getData();
        },
        /**
         * 分页改变,返回点击后的分页代码
         */
        changePage(index){
            this.page=index;
            this.getList();
        },
        /**
         * 点击取消  进行重置
         */
        initData(){
            this.roleName ='';
            this.page=1;
            this.getData();
        },
        /** 
         * 获取数据
         */
        getData() {
            API.Jurisdiction.listRoles({
                pager: this.page,
                limit: 10,
                name: this.roleName

            }).then((res) => {
                this.dataList = res.data;
                this.totalPage=res.total;
            }).catch((err) => {

            });
        },
        /** 
        * 新增角色
        */
        addRole() {
           this.$router.push({
                path:"/access/role/role_add",
                query:{
                    type:0,
                }
            }) 
        },
        //编辑角色
        editRole(id,type) {
            this.$router.push({
                path:"/access/role/role_add",
                query:{
                    id:id,
                    type:type,
                }
            });
            this.modal = true;
            /* API.Jurisdiction.infoRoles({
                id: id
            }).then((res) => {
                this.treeData = res.data;
                this.treeList[0].children = this.dataFormat(res.data, res.beanAction);
            }).catch((err) => {

            }); */
        },
        /** 
         * 数据格式化
         */
        dataFormat(data, access) {
            let arrList = [];
            /** 
             * 等级分组
             */
            let copyAccess = JSON.parse(JSON.stringify(access));
            for (let item of data) {
                item.expand = true;
                item.title = item.name + "URL地址：" + "[" + item.url + "]";
                item.value = item.id;
                /** 
                 * 循环优化
                 */
                if (copyAccess.length > 0) {
                    for (let ite of copyAccess) {
                        if (ite.aid == item.id) {
                            item.selected = true;
                            continue;
                            copyAccess.shift();
                        }
                    }
                }
                if (!arrList[item.level]) {
                    arrList[item.level] = [];
                }
                arrList[item.level].push(item);

            }
            let appendChild = (child, parent) => {
                for (let item of child) {
                    for (const ite of parent) {
                        if (item.pid == ite.id) {
                            if (!ite.children) {
                                ite.children = [];
                            }
                            ite.children.push(item);
                        }
                    }
                }
            }

            for (let i = arrList.length - 1; i > 0; i--) {
                appendChild(arrList[i], arrList[i - 1]);
            }
            return arrList[0];
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


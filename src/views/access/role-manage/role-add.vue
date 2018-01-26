<style lang="less">
.main .single-page-con .single-page {
    height: 100%;
    margin: 0;
    padding: 10px;
    box-sizing: border-box;
}

.roleAdd {
    height: 100%;
    &_main {
        background-color: #fff;
        padding: 10px;
        height: 100%;
        border-radius: 5px;
        box-sizing: border-box;
        >h3 {
            text-align: left;
            line-height: 40px;
            font-size: 15px;
            position: relative;
            margin-bottom: 10px;
            font-weight: 400;
            padding-left: 50px;
            &:after {
                content: "";
                display: block;
                height: 20px;
                width: 4px;
                background-color: #2d8cf0;
                position: absolute;
                top: 50%;
                left: 40px;
                transform: translateY(-50%);
            }
        }
        &_form {
            height: calc(~"100% - 80px");
        }
        &_treebox {
            height: calc(~'100% - 150px');
            overflow-y: auto;
        }
        &_treeinner {
            height: 100%;
            overflow-y: auto;
        }
        &_single {
            >span {
                font-size: 14px;
                text-indent: 10px;
            }
            .ivu-input {
                font-size: 14px;
            }
            display: flex;
            .ivu-tree {
                .ivu-tree-title {
                    border: 1px solid #dadada;
                }
                font-size: 14px;
                ul {
                    font-size: 14px;
                }
                >ul {
                    >li {
                        margin: 0;
                    }
                }
            }
            .ivu-col>span {
                text-align: right;
                display: block;
                width: 100%;
                font-size: 14px;
            }
            margin-bottom: 20px;
        }
    }
}
</style>


<template>
    <div class="roleAdd">
        <div class="roleAdd_main">
            <h3>{{type==0?"新增角色":"编辑角色"}}</h3>
            <Form ref="role" class="roleAdd_main_form" :model="formData" :rules="validate.role" :label-width="90">
                <FormItem label="名称：" prop="name" style="width:500px">
                    <Input v-model="formData.name" placeholder="请填写名称"></Input>
                </FormItem>
                <FormItem label="说明：" prop="profile" style="width:500px">
                    <Input v-model="formData.profile" placeholder="请填写角色说明"></Input>
                </FormItem>
                <FormItem label="权限：" class="roleAdd_main_treebox">
                    <div class="roleAdd_main_treeinner">
                        <Tree ref="tree" :render="renderContent" :data="treeList" show-checkbox></Tree>
                    </div>
                </FormItem>
            </Form>
            <div class="roleAdd_main_btnList">
                <Button type="primary" @click="saveRole()">保存</Button>

            </div>
        </div>
    </div>
</template>


<script>
import { API } from '../../../services';
export default {
    data() {
        return {
            type: 0,
            id: -1,
            title: "编辑角色",
            modal: false,
            //添加的数据
            formData: {
                name: "",
                profile: "",
                actionsIds: []
            },
            //权限列表
            treeData: [],
            //权限树
            treeList: [
                {
                    title: '认识医生',
                    expand: true,
                    /* selected: true, */
                    render: (h, { root, node, data }) => {
                        return h('span', {
                            style: {
                                display: 'inline-block',
                                width: '100%'
                            }
                        }, [
                                h('span', [
                                    h('Icon', {
                                        props: {
                                            type: 'ios-folder-outline'
                                        },
                                        style: {
                                            marginRight: '8px'
                                        }
                                    }),
                                    h('span', data.title)
                                ]),
                            ]);
                    },
                    children: [

                    ]
                }
            ]
        }
    },
    methods: {
        /** 
         * 子部门渲染
         */
        renderContent(h, { root, node, data }) {
            return h('span', {
                style: {
                    display: 'inline-block',
                    width: '100%'
                }
            }, [
                    h('span', {
                        style: {
                            border: "1px solid #efefef",
                            padding: "5px",
                            borderRadius: "3px",
                            fontSize: "12px"
                        }
                    }, [
                            h('Icon', {
                                props: {
                                    type: data.children.length > 0 ? 'ios-folder-outline' : 'ios-paper-outline'
                                },
                                style: {
                                    marginRight: '8px'
                                }
                            }),
                            h('span', {
                            }, data.name + "url地址：" + " " + "[" + data.url + "]")
                        ])
                ]);
        },
        //编辑角色
        editRole() {
            API.Jurisdiction.infoRoles({
                id: this.id
            }).then((res) => {
                this.formData.name = res.bean.name;
                this.formData.profile = res.bean.profile;
                this.treeData = res.data;
                let access=res.beanAction;
                for (let item of access) {
                    for (const ite of res.data) {
                        if(item.aid==ite.id){
                            item.lv=ite.level;
                            item.pid=ite.pid;
                            break;
                        }
                    }
                }
                access=access.sort((a,b)=>{
                    return b.lv-a.lv;     
                });
                let afterAccess=[];
                for (let item of access) {
                    let flag=0;
                    for (let ite of access) {
                        if(item.aid==ite.pid){
                            flag++;
                        }
                    }
                    if(flag==0){
                        afterAccess.push(item);
                    }
                }
                this.treeList[0].children = this.dataFormat(res.data, afterAccess);
            }).catch((err) => {

            });
        },
        /** 
         * 每次执行增删操作后便重新拉取数据
         * 接口请求数据
         */
        treeInit() {
            API.Jurisdiction.listFun().then((res) => {
                this.treeData = res.data;
                this.treeList[0].children = this.dataFormat(res.data, []);
            }).catch((err) => {

            });
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
                /* item.expand = true; */
                item.title = item.name;
                item.value = item.id;
                /** 
                 * 循环优化
                 */
                if (copyAccess.length > 0) {
                    for (let ite of copyAccess) {
                        if (ite.aid == item.id) {
                            item.checked = true;
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
        /** 
         * 最终的数据保存，首先进行数据分层
         */
        saveRole() {
            let arrList = [];
            let data = this.$refs.tree.getCheckedNodes();
            /* for (let item of data) {
               if (!arrList[item.level]) {
                   arrList[item.level] = [];
               }
               arrList[item.level].push(item);
           }
           for (let i = arrList.length-1; i >0 ; i--) {
               for (let j = 0; j < arrList[i-1].length; j++) {
                   for (let k = 0; k < arrList[i].length; k++) {
                       if(arrList[i-1][j].id==arrList[i][k].pid){
                           arrList[i].splice(k,1);
                           k--;
                       }
                   }
               }
           } */
            let getItem = (id, arrList) => {
                for (const item of this.treeData) {
                    if (item.id == id) {
                        if (arrList.length > 0) {
                            let flag = 0;
                            for (const ite of arrList) {
                                if (ite.id == item.id) {
                                    flag++;
                                }
                            }
                            if (flag == 0) {
                                arrList.push(item.id);
                                if (item.pid) {
                                    getItem(item.pid, arrList);
                                }
                            }
                        } else {
                            arrList.push(item.id);
                            if (item.pid) {
                                getItem(item.pid, arrList);
                            }
                        }

                    }
                }
            }
            for (const item of data) {
                if (item.pid) {
                    getItem(item.pid, arrList);
                } 
                arrList.push(item.id);
            }

            if (this.type == 1) {
                this.formData.id = this.id;
            }
            this.formData.actionsIds = arrList;
            API.Jurisdiction.editRoles(this.formData).then((res) => {
                this.$Message.success("编辑成功");
            }).catch((err) => {

            });

        }
    },
    mounted() {
        this.formData = {
            name: "",
            profile: "",
            actionsIds: []
        };
        this.type = this.$route.query.type;
        this.id = this.$route.query.id;
        if (this.type == 0) {
            this.treeInit();
        } else {
            this.editRole();
        }
    }
}
</script>




<style lang="less">
.ivu-modal-confirm-footer{
            margin-top: 10px;
        }
.business {
    height: 100%;
    &_main {
        height: 100%;
        
        .ivu-col {
            height: 100%;
            .ivu-card {
                height: 90%;
            }
        }
        &_header {
            margin-bottom: 15px;
        }
        &_page {
            margin-top: 15px;
        }
        &_title {
            color: #1c2438;
            font-size: 14PX;
            >.ivu-icon {
                margin-right: 5px;
            }
        }
        &_tree {
            background: #fff;
            border-radius: 4px;
            overflow: hidden;
            box-sizing: border-box;
            border: 1px solid #dddee1;
            .ivu-tree {
                /* max-width: 500px; */
            }
        }
        &_edit {
            background: #fff;
            border-radius: 4px;
            overflow: hidden;
            box-sizing: border-box;
            border: 1px solid #dddee1;
        }
        &_single {

            max-width: 300px;
            margin-top: 10px;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            >h4 {
                font-size: 12px;
                display: block;
                text-indent: 10px;
                height: 25px;
                border-radius: 5px;
                line-height: 25px;
                width: 60%;
                text-align: center;
                background-color: #eee;
                outline: none;
                margin-right: 3px;
            }
            .ivu-icon {
                color: #ed3f14;
                font-size: 20px;
                cursor: pointer;
            }
        }
        &_btnList {
            margin-top: 20px;
        }
    }
}
</style>
<template>
    <div class="business">
        <Row :gutter="10" class="business_main">
            <Col span="8">
            <Card class="business_main_tree">
                <h3 slot="title" class="business_main_title">
                    <Icon type="ios-copy-outline"></Icon>编辑企业部门结构
                </h3>
                <Tree :data="depart" :render="renderContent"></Tree>
            </Card>
            </Col>
            <Col span="8">
            <Card class="business_main_edit">
                <h3 slot="title" class="business_main_title">
                    <Icon type="ios-copy-outline"></Icon>下级部门编辑
                </h3>
                <Breadcrumb separator="/">
                    <BreadcrumbItem>认识医生</BreadcrumbItem>
                    <!-- 循环数据展示面包屑 -->
                    <template v-for="item in crumList">
                        <BreadcrumbItem>{{item}}</BreadcrumbItem>
                    </template>
                </Breadcrumb>
                <ul class="business_main_list">
                    <li class="business_main_single" v-for="item,index in copyDepart">
                        <h4>{{item.title}}</h4>
                        <Button size="small" @click="delettTag(0,index)">删除</Button>
                    </li>
                </ul>
                <div class="business_main_btnList">
                    <Button type="primary" @click="addTag(0)">新增</Button>
                    <!-- 获取父节点id，函数中判断新增和删除操作，分发后执行操作 -->
                    <Button type="info" @click="diffData(0)">保存</Button>
                </div>
            </Card>
            </Col>
            <Col span="8">
            <Card class="business_main_edit">
                <h3 slot="title" class="business_main_title">
                    <Icon type="ios-copy-outline"></Icon>部门职位编辑
                </h3>
                <Breadcrumb separator="/">
                    <BreadcrumbItem>认识医生</BreadcrumbItem>
                    <template v-for="item in crumList">
                        <BreadcrumbItem>{{item}}</BreadcrumbItem>
                    </template>
                </Breadcrumb>
                <ul class="business_main_list">
                    <li class="business_main_single" v-for="item,index in copyPosition">
                        <h4>{{item.title}}</h4>
                        <Button size="small" @click="delettTag(1,index)">删除</Button>
                    </li>
                </ul>
                <div class="business_main_btnList">
                    <Button type="primary" @click="addTag(1)">新增</Button>
                    <!-- 获取父节点id，函数中判断新增和删除操作，分发后执行操作 -->
                    <Button type="info" @click="diffData(1)">保存</Button>
                </div>
            </Card>
            </Col>
        </Row>

    </div>
</template>

<script>
export default {
    data() {
        return {
            /* 面包屑列表 */
            crumList:[],
            /* 新增的具体内容 */
            value: "",
            topId: -1,//当前所选中的部门id
            /** 
             * 部门列表
             */
            departList: [
                {
                    title: '计税部',
                    expand: true
                },
                {
                    title: '统计部',
                    expand: true
                }
            ],
            /** 
             * 职位列表
             */
            positionList: [
                {
                    title: '计税部',
                    expand: true
                },
                {
                    title: '统计部',
                    expand: true
                }
            ],
            /** 
             * 当前部门数据临时数据
             */
            copyDepart: [

            ],
            /** 
             * 当前职位临时数据
             */
            copyPosition: [

            ],
            depart: [
                {
                    title: '认识医生',
                    expand: true,
                    id:0,
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
                                h('span', {
                                    style: {
                                        display: 'inline-block',
                                        float: 'right',
                                        marginRight: '32px'
                                    }
                                }, [
                                        h('Button', {
                                            props: Object.assign({}, this.buttonProps, {
                                                icon: 'compose',
                                                type: 'primary'
                                            }),
                                            style: {
                                                width: '52px'
                                            },
                                            on: {
                                                click: () => { this.editDepart(data) }
                                            }
                                        }, "编辑")
                                    ])
                            ]);
                    },
                    children: [
                        {
                            title: '财务部',
                            expand: true,
                            id:1,
                            children: [
                                {
                                    title: '计税部',
                                    id:2,
                                    expand: true
                                },
                                {
                                    title: '统计部',
                                    id:3,
                                    expand: true
                                }
                            ]
                        },
                        {
                            title: '业务部',
                            id:4,
                            expand: true,
                            children: [
                                {
                                    title: '商务部',
                                    id:5,
                                    expand: true
                                },
                                {
                                    title: '销售部',
                                    id:6,
                                    expand: true
                                }
                            ]
                        }
                    ]
                }
            ],
            buttonProps: {
                type: 'ghost',
                size: 'small',
            }
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
                    h('span', [
                        h('Icon', {
                            props: {
                                type: 'ios-paper-outline'
                            },
                            style: {
                                marginRight: '8px'
                            }
                        }),
                        h('span', data.title)
                    ]),
                    h('span', {
                        style: {
                            display: 'inline-block',
                            float: 'right',
                            marginRight: '32px'
                        }
                    }, [
                            h('Button', {
                                props: Object.assign({}, this.buttonProps, {
                                    icon: 'compose'
                                }),
                                style: {
                                    marginRight: '8px'
                                },
                                on: {
                                    click: () => { this.editDepart(data) }
                                }
                            }, '编辑'),
                            h('Button', {
                                props: Object.assign({}, this.buttonProps, {
                                    icon: 'ios-minus-empty'
                                }),
                                on: {
                                    click: () => { this.remove(root, node, data) }
                                }
                            }, "删除")
                        ])
                ]);
        },
        /** 
         * 编辑子部门
         */
        editDepart(data) {
            const children = data.children || [];
            this.departList=children;
            this.copyDepart=JSON.parse(JSON.stringify(children));
            this.Getcrum(data.id);
            /* 根据id拉取职位数据 */
        },
        /** 
         * 删除整个部门
         */
        remove(root, node, data) {
            this.$Modal.confirm({
                title: "删除部门",
                content: "确定删除该部门以及其所有下属部门",
                okText: "删除",
                cancelText: "取消",
                onOk: () => {
                    /**具体的删除逻辑，删除之后重新拉取数据 */
                    this.treeInit();
                }
            })
        },
        /* 确认面包屑 */
        Getcrum(id){
            this.crumList=[];
            if(id==this.depart[0].id){
                return false;
            }
            /* 递归遍历整个tree */
            let rote=(data,id,crum=[])=>{
                for (let item of data.children) {
                    /* 创建新的分支，深拷贝，避免公用内存池 */
                    let copyCrum=JSON.parse(JSON.stringify(crum));
                    copyCrum.push(item.title);
                    if(item.id==id){
                        this.crumList=copyCrum;
                        return false;
                    } else{
                        if(item.children){
                            rote(item,id,copyCrum);
                        }
                    }
                }
            }
            rote(this.depart[0],id);
        },
        /** 
         * 删除标签
         * type 0 1 
         */
        delettTag(type,index){
            if(type==0){
                this.copyDepart.splice(index,1);
            }else{
                this.copyPosition.splice(index,1);
            }
        },
        /** 
         * 新建标签
         * type 0 1 
         */
        addTag(type) {
            let title="添加新部门";
            if(type==1){
                title="添加新职位";
            }
            this.$Modal.confirm({
                render: (h) => {
                    return h('Input', {
                        props: {
                            value: this.value,
                            autofocus: true,
                            placeholder: ''
                        },
                        style:{
                            marginTop:"10px"
                        },
                        on: {
                            input: (val) => {
                                this.value = val;
                            }
                        },

                    })
                },
                title:title,
                okText: '添加',
                cancelText: '取消',
                onOk: () => {
                    if(!this.value.trim()){
                        return false;
                    }
                    if (type == 0) {
                        this.copyDepart.push({
                            title: this.value.trim()
                        });
                    } else {
                        this.copyPosition.push({
                            title: this.value.trim()
                        });
                    }
                    this.value = "";
                    this.diffData(type);
                },
                onCancel: () => {
                    this.value = "";
                }
            });
        },
        /** 
         * 统计新增的数据和删除的数据
         * type：分类 0：部门操作 1：职位操作
         */
        diffData(type) {
            let oldData,
                current,
                removArray = [],
                addArray = [],
                Fadd,//添加函数
                Fremove;//删除函数
            /* 初始数据赋值 */
            if (type == 0) {
                oldData = this.departList;
                current = this.copyDepart;
                Fadd=this.addDepart; 
                Fremove=this.removeDepart;
            } else {
                oldData = this.positionList;
                current = this.copyPosition;
                Fadd=this.addPosition; 
                Fremove=this.removePosition;
            }
            
            /* 首先判断id，凡是无id的均为新增数据 */
            if (current.length > 0) {
                for (let item of current) {
                    if (!item.id) {
                        addArray.push(item.title);
                    }
                }
            }
            /* 嵌套循环，找出被删除的列表 */
            if (oldData.length > 0) {
                for (let ite of oldData) {
                    let flag = 0;
                    for (let item of current) {
                        if (ite.title == item.title) {
                            flag++;
                        }
                    }
                    if (flag == 0) {
                        removArray.push(ite.id);
                    }
                }
            }
            /* 只有存在数据的时候才去执行对应的函数 */
            if (removArray.length > 0) {
               Fremove(removArray);
            }
            if (addArray.length > 0) {
                Fadd(addArray);
            }
        },
        /* 删除部门 */
        removeDepart(data){

        },
        /* 删除职位 */
        removePosition(data){

        },
        /* 新增部门 */
        addDepart(data){

        },
        /* 新增职位 */
        addPosition(data){

        },
        /** 
         * 每次执行增删操作后便重新拉取数据
         * 接口请求数据
         */
        treeInit() {

        },
        /** 
         * 数据格式化
         */
        dataFormat(data){

        }
    }
}
</script>



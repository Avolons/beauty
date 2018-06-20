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
   .addMOAD{
       .ivu-modal-footer{
           display: none;
       }
   }
</style>
<template>
    <div class="user" id="FamilyU">
        <div class="sys-sysset_main">
            <Row class="sys-tasklog_main_search" :gutter="15">
                <Col span="6">
                <span>
                    姓氏：
                </span>
                <Input placeholder="请输入姓氏" v-model="serchSyst.surname"></Input>
                </Col>
                <Col span="6">
                <span>
                    性别：
                </span>
                <Select v-model="serchSyst.sex" clearable filterable>
                    <Option v-for="item in mainTypeSex" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
                </Col>
                <Col span="6">
                <Button type="primary" style="margin-right: 10px;" @click="searchData">查询</Button>
                <Button @click="modal=true;" v-if="!menuShow(this.AM.Systems.updateBjxList)" type="primary">添加</Button>
                <Button  type="primary" style="margin-left: 10px;" @click="btnBatchData">批量上传</Button>
                </Col>
            </Row>
            <div class="sys-sysset_main_list">
                <Table border :columns="config" :data="dataList" :loading="createLoading"></Table>
            </div>
            <Row class="sys-sysset_main_page" >
                <Button style="display:block;float:left;" type="primary" @click="btnDownAction" v-if="!menuShow(this.AM.Systems.updateBjxList)">
                下载模板
            </Button>
                <Page  v-if="totalPage>=10" :page-size="pageSize" :total="totalPage" :current="page" show-elevator style="float:right" show-total @on-change="changePage"></Page>
            </Row>
        </div>
        <Modal v-model="modal" title="添加参数" :class-name='"addMOAD"' @on-cancel="cancelAction">
            <Form ref="addData" class="sys-sysset_main_form" :model="formData" :rules="validate.system" :label-width="80">
                <FormItem label="姓氏" prop="surname">
                    <Input v-model="formData.surname" placeholder="请输入姓氏"></Input>
                </FormItem>
                <FormItem label="性别" prop="sex">
                    <Select v-model="formData.sex" placeholder="请选择性别">
                        <Option v-for="item in mainTypeSex" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                </FormItem>
                <template v-if="formData.surname&&formData.sex">
                    <Upload  ref="uploadAdd" style="margin-left: 79px" :action='actionUrl+"?surname="+formData.surname+"&sex="+formData.sex' :on-success="handleSuccess" name="file">
                        <Button type="ghost" icon="ios-cloud-upload-outline">请上传文件+</Button>
                    </Upload>
                </template>
            </Form>
            <div slot="footer" class="sys-sysset_main_btnList">
                <!--<Button type="primary" @click="addSetting">确认</Button>-->
            </div>
        </Modal>
        <Modal v-model="editmodal" title="编辑参数" @on-cancel="cancelActionEdit">
            <Form ref="editData" class="sys-sysset_main_form" :model="currentInfo" :rules="validate.system" :label-width="80">
                <FormItem label="姓氏" prop="surname">
                    <Input  v-model="currentInfo.surname" placeholder="请输入编码"></Input>
                </FormItem>
                <FormItem label="性别" prop="sex">
                    <Select v-model="currentInfo.sex" placeholder="请选择性别">
                        <Option v-for="item in mainTypeSex" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                </FormItem>
                <template v-if="currentInfo.surname&&currentInfo.sex">
                    <Upload  ref="upload"  style="margin-left: 79px" :action='updateBjxList+"?surname="+currentInfo.surname+"&sex="+currentInfo.sex+"&id="+currentInfo.id' :on-success="editHandleSuccess" name="file">
                        <Button type="ghost" icon="ios-cloud-upload-outline">修改上传文件</Button>
                    </Upload>
                </template>
                <div style="margin-left: 70px;" v-if="showUpload">上传文件名：{{currentInfo.patch}}</div>
            </Form>

            <div slot="footer" class="sys-sysset_main_btnList">
                <Button type="primary" @click="submitSetting" v-if="isModify">确认</Button>
            </div>
        </Modal>
        <!---批量上传---->
        <Modal v-model="batchModal" title="批量上传" @on-cancel="plotlActionEdit">
            <form action="/visit/admin/saveBjxLists" enctype="multipart/form-data" id="formDateR" method="post" target="demoIframe">
                <input type="file" name='excelFile' @change="excelupload"/>
                <Alert type="warning" show-icon>请上传excel格式</Alert>
                <input type="file" name="Bjxfile" @change="zarHandleAction"/>
                <Alert type="warning" show-icon>请上传压缩包</Alert>
            </form>
            <div slot="footer" class="sys-sysset_main_btnList">
                <Button type="primary"  @click="BtnSubmitSetting" :loading="judgeFlag">确认</Button>
            </div>

        </Modal>
        <iframe name="demoIframe" frameborder="0" id="iframeDate" style="display: none;"></iframe>
    </div>
</template>

<script>
    import { API } from '@/services/index.js';
    export default {
        data() {
            return {
                isModify:true,
                batchModal:false,       //批量上传弹窗
                excel:false,   //excel上传成功  false 代表失败
                zipFlag:false,
                showUpload:true,     //显示文件名
                batchDown:"visit/admin/saveBjxLists",    //批量下载接口
                updateBjxList:"/visit/admin/updateBjxList",     //更新数据接口
                actionUrl:"/visit/admin/saveBjxList",           //新增上传接口
                createLoading: true,    //loading 动画加载中
                page: 1,//当前页码
                totalPage: 0,//总页码
                judgeFlag:false,
                pageSize: 10,
                //搜索数据
                serchSyst: {
                    surname: '',  //姓名（可选）
                    sex: '',   //值(可选)
                },
                //当前被点击触发的数据
                currentInfo: {
                    surname:'',
                    sex:''
                },
                mainTypeSex: [
                    {
                        value: '男',
                        label: '男'
                    },
                    {
                        value: '女',
                        label: '女'
                    }
                ],
                //添加的数据
                formData: {
                    surname: "",
                    sex: "",
                },
                //添加的显示隐藏
                editmodal: false,
                modal: false,
                config: [
                    {
                        title: '姓氏',
                        key: 'surname',
                    },
                    {
                        title: '性别',
                        key: 'sex'
                    },
                    {
                        title: '添加路径',
                        key: 'patch',
                    },
                    {
                        title: '创建时间',
                        key: 'createDate'
                    },
                    {
                        title: '修改时间',
                        key: 'updateDate'
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
                                        menuHide: this.menuShow(this.AM.Systems.updateBjxList)
                                    },
                                    on: {
                                        click: () => {
                                            this.showUpload = true;
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
                                        menuHide: this.menuShow(this.AM.Systems.updateBjxList)
                                    },
                                    on: {
                                        click: () => {
                                            this.delSetting(params.row.id,params.row.isDelete)
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
             *   点击取消
             **/
            plotlActionEdit(){
                this.judgeFlag = false;
            },
            /**
             * 编辑取消
             **/
            cancelActionEdit(){

                this.isModify = true;
            },
            /**
             * 取消按钮
             **/
            cancelAction(){
                this.formData={
                    surname: "",
                    sex: "",
                };
            },
            /***
             * excel限制上传格式
             **/
            excelupload(e){
                let file = e.target.files[0];
                var reg = file.name.split(".")[1];
                if(reg =='xls'||reg=='xlsx'){
                    this.excel = true;
                }else{
                    this.excel = false;
                    this.$Message.warning('请上传excel的格式的');
                }
            },
            /***
             * 压缩包限制上传格式
             **/
            zarHandleAction(e){
                let file = e.target.files[0];
                var reg = file.name.split(".")[1];
                if(reg =='zip'||reg=='rar'){
                    this.zipFlag = true;
                }else{
                    this.zipFlag = false;
                    this.$Message.warning('请上传压缩包');
                }
            },
            /***
             * 批量上传确认
             **/
            BtnSubmitSetting(){
                if(!this.excel){
                    this.$Message.warning('请上传正确的excel');
                    return false
                }
                if(!this.zipFlag){
                    this.$Message.warning('请上传正确的压缩包');
                    return false
                }
                this.judgeFlag = true;
                var form = document.getElementById("formDateR");

                var iframeDat = document.getElementById("iframeDate");
                var This = this;
                iframeDat.onload=function () {
                    form.reset();
                    var res = JSON.parse(iframeDat.contentDocument.body.textContent)
                    if(res.code ==0){
                        This.batchModal = false;
                        This.$Message.success('上传成功');
                    }else{
                        This.$Message.error(res.message);
                    }
                    This.judgeFlag = false;
                }
                form.submit();
            },
            /**
             * 确认修改
             **/
            submitSetting(){
                API.Systems.updateBjxList({
                    surname: this.currentInfo.surname,
                    id: this.currentInfo.id,
                    sex: this.currentInfo.sex,
                    file:''
                }).then((res) => {
                    this.$Message.success("编辑成功");
                    this.$refs.upload.clearFiles();
                    this.editmodal = false;
                    this.isModify = true;
                    this.getData();
                }).catch((err) => {

                });
            },
            /***
             * 批量上传
             **/
            btnBatchData(){
                this.batchModal = true;
            },
            /***
             * 新增下载文件
             **/
            btnDownAction(){
                console.log(1);
                window.open('/visit/admin/dowloadBjxMould');
            },
            /**
             * 修改上传文件..
             **/
             editHandleSuccess(res){
                if(JSON.parse(res).code == 0){
                    this.showUpload = false;
                    this.editmodal = false;
                    this.$Message.success("编辑成功");
                    this.$refs.upload.clearFiles();
                    this.getData();
                    this.isModify = true;
                }else{
                    this.$refs.upload.clearFiles();
                    this.isModify = true;
                    this.$Message.error(JSON.parse(res).message);
                }
             },
            /**
             * 查询表格数据
             */
            searchData() {
                this.page = 1;
                this.getData();
            },
            /***
             * 上传文件
             **/
            handleSuccess(res,file) {
                console.log(JSON.parse(res).code)
                if(JSON.parse(res).code == 0){
                    this.modal = false;
                    this. getData();
                    this.$refs.uploadAdd.clearFiles();
                    this.formData={
                        surname: "",
                        sex: "",
                    };
                }else{

                    this.$refs.uploadAdd.clearFiles();
                    this.formData={
                        surname: "",
                        sex: "",
                    };
                    this.$Message.error(JSON.parse(res).message);
                }
            },


            /**
             * 获取所有数据
             */
            getData() {
                API.Systems.BjxListBySomeList({
                    pager: this.page,
                    limit: 10,
                    sex:this.serchSyst.sex ,
                    surname:this.serchSyst.surname ,
                }).then((res) => {
                    console.log(res)
                    this.dataList = JSON.parse(JSON.stringify(res.data));
                    this.dataList = this.dataList.filter((item,index)=>{
                        return item.isDelete==0
                    });
                    this.totalPage = res.total;
                    this.createLoading = false;
                }).catch((err) => {

                });
            },
            /**
             * 删除系统设置
             */
            delSetting(id,isDelete) {
                let self = this;
                this.$Modal.confirm({
                    title: '删除设置',
                    content: '确定删除该条信息吗？',
                    onOk: () => {
                        this.createLoading = true;
                        API.Systems.updateBjxList({
                            id: id,
                            isDelete:1
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


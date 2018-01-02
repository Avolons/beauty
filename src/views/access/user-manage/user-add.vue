<style lang="less">
.main .single-page-con .single-page{
    height: 100%;
}
.busadd {
    height: 100%;
    &_main {
        height: 100%;
        background: #fff;
        border-radius: 4px;
        box-sizing: border-box;
        padding: 10px;
        &_title {
            text-align: left;
            line-height: 40px;
            font-size: 15px;
            position: relative;
            text-indent: 15px;
            margin-bottom: 10px;
            font-weight: 400;
            &:after {
                content: "";
                display: block;
                height: 20px;
                width: 2px;
                background-color: #2d8cf0;
                position: absolute;
                top: 50%;
                left: 0;
                transform: translateY(-50%);
            }
        }
        >h4 {
            height: 30px;
            line-height: 30px;
            background-color: #f9f9f9;
            text-indent: 20px;
            border: 1px solid #ddd;
            font-weight: 400;
        }
        &_form {
            >h5 {
                margin: 10px 0 10px 0;
                font-size: 14px;
                font-weight: 400;
            }
            .ivu-form-item {
                .ivu-form-item-label {
                    width: 120px !important;
                }
                .ivu-form-item-content {
                    margin-left: 120px !important;
                }
            }
        }
        &_city {
            .ivu-row {
                margin-left: 0 !important;
                .ivu-col {
                    padding-left: 0 !important;
                }
            }
        }
    }
}
</style>


<template>
    <div class="busadd">
        <div class="busadd_main">
            <h3 class="busadd_main_title">用户信息</h3>
            <h4>请完善以下信息,方便我们更好的为您服务</h4>
            <Form ref="formData" class="busadd_main_form" :model="formData" :rules="validate.users" :label-width="80">
                <h5>基本信息</h5>
                <FormItem label="用户名" prop="uName" style="width:450px;">
                    <Input v-model="formData.uName" placeholder="请输入用户名"></Input>
                </FormItem>
                <FormItem v-show="id==-1" label="密码" prop="password" style="width:450px;">
                    <Input v-model="formData.password" type="password" placeholder="请输入密码"></Input>
                </FormItem>
                <FormItem label="真实姓名" prop="reName" style="width:450px;">
                    <Input v-model="formData.reName" placeholder="请输入真实姓名"></Input>
                </FormItem>
                <FormItem label="手机号码" prop="tel" style="width:450px;">
                    <Input v-model="formData.tel" placeholder="请输入手机号码"></Input>
                </FormItem>
                <FormItem label="身份"  style="width:450px;">
                    <Select  v-model="formData.types" style="width:200px">
                        <Option value="0" >管理员</Option>
                        <Option value="1" >医生</Option>
                    </Select>
                </FormItem>
                <h5>功能权限</h5>
                <FormItem label="用户角色" prop="rIds" style="width:450px;">
                    <CheckboxGroup v-model="formData.rIds">
                        <Checkbox v-for="item in roleList" :label="item.id" :key="item.id">{{ item.name }}</Checkbox>
                    </CheckboxGroup>
                </FormItem>
                <h5>数据权限</h5>
                <FormItem label="所属部门" prop="adId" style="width:450px;">
                    <Select @on-change="getPosition" v-model="formData.adId" style="width:200px">
                        <Option v-for="item in departList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                    </Select>
                </FormItem>
                <FormItem label="用户职位" prop="apId" style="width:450px;">
                    <Select v-model="formData.apId" style="width:200px">
                        <Option v-for="item in positionList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                    </Select>
                </FormItem>
                <FormItem label="所属科室" prop="dpId">
                    <Select v-model="formData.dpId" style="width:200px">
                        <Option v-for="item in officeList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                    </Select>
                </FormItem>
                <FormItem>
                    <Button type="primary" @click="handleSubmit('formData')">保存</Button>
                </FormItem>
            </Form>
        </div>
    </div>
</template>

<script>
import { API } from '../../../services'
import Vue from 'vue';
export default {
    data() {
        return {
            id: -1,//类型
            formData: {
                types: "0",//身份（0管理员，1医生）
                dpId: "", //科室id
                uName: "",//用户名
                password: "",//密码
                reName: "",//姓名
                tel: null, // 电话号码
                rIds: [],//权限Id（可多选）
                adId: "",//部门id
                apId: ""//职位Id
            },
            departList: [],//部门列表
            officeList: [],//科室列表
            positionList: [],//职位列表
            roleList: [],//角色列表
            List: [],
            //角色列表
        }
    },
    methods: {
        /** 
         * 获取用户基本信息
         */
        getData() {
            API.Jurisdiction.userInfo({
                id: this.id
            }).then((res) => {
                this.formData=this.dataForm(res.data,res.roles);
            }).catch((err) => {

            });
        },
        /** 
         * 获取部门列表
         */
        getDepartlist() {
            API.Jurisdiction.departList().then((res) => {
                this.departList = res.data;
            }).catch((err) => {

            });
        },
        /** 
         * 获取科室列表
         */
        getOffice() {
            API.Systems.listDisDepart().then((res) => {
                this.officeList = res.data;
            }).catch((err) => {

            });
        },
        /** 
         * 获取职位列表
         */
        getPosition() {
            API.Jurisdiction.positionList({
                adId: this.formData.adId
            }).then((res) => {
                this.positionList = res.data;
            }).catch((err) => {

            });
        },
        /** 
         * 获取角色列表
         */
        getRoleList() {
            API.Jurisdiction.roleList().then((res) => {
                this.roleList = res.data;
            }).catch((err) => {

            });
        },
        /** 
         * 数据格式化
         */
        dataForm(data,roles) {
            return {
                aId: data.id,
                types: data.type+'',//身份（0管理员，1医生）
                dpId: data.departmentId, //科室id
                uName: data.username,//用户名
                password: data.pwd,//密码
                reName: data.realname,//姓名
                tel: data.mobile, // 电话号码
                rIds: roles,//权限Id（可多选）
                adId: data.adminDepartmentId,//部门id
                apId: data.adminPositionId//职位Id  
            }
        },
        /** 
         * 提交修改代码
         */
        handleSubmit(name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    /* 属于新增状态 */
                    let copyData=JSON.parse(JSON.stringify(this.formData));
                        copyData.rIds=encodeURI(copyData.rIds);
                    if (this.id == -1) {
                        API.Jurisdiction.addUser(copyData).then((res) => {
                            this.$Message.success("新增成功");
                        }).catch((err) => {

                        });
                    } else {
                        API.Jurisdiction.editUser(copyData).then((res) => {
                            this.$Message.success("修改成功");
                        }).catch((err) => {

                        });
                    }

                } else {
                    this.$Message.error('补全信息!');
                }

            })
        },
        async init() {
            await this.getDepartlist();
            await this.getOffice();;
            await this.getRoleList();
        },
        /** 
         * 重置表单
         */
        handleReset(name) {
            this.$refs[name].resetFields();
        },
    },
    mounted() {
        /** 判断当前的业务类型 -1为新增，其他的为编辑 */
        this.id = this.$route.query.id;
        
        if (this.id != -1) {
            this.getData();
        }
        this.init();
    }
}
</script>

<style lang="less">
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
            <Form ref="formData" class="busadd_main_form" :model="formData" :rules="validate" :label-width="80">
                <h5>基本信息</h5>
                <FormItem label="用户名" prop="uName" style="width:450px;">
                    <Input v-model="formData.uName" placeholder="请输入用户名"></Input>
                </FormItem>
                <FormItem label="密码" prop="password" style="width:450px;">
                    <Input v-model="formData.password" placeholder="请输入密码"></Input>
                </FormItem>
                <FormItem label="真实姓名" prop="reName" style="width:450px;">
                    <Input v-model="formData.reName" placeholder="请输入真实姓名"></Input>
                </FormItem>
                <FormItem label="手机号码" prop="tel" style="width:450px;">
                    <Input v-model="formData.tel" placeholder="请输入手机号码"></Input>
                </FormItem>
                <h5>功能权限</h5>
                <FormItem label="用户角色" prop="types" style="width:450px;">
                    <Select v-model="model1" style="width:200px">
                        <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                </FormItem>
                <h5>数据权限</h5>
                <FormItem label="所属部门" prop="mail" style="width:450px;">
                    <Input v-model="formData.mail" placeholder="请输入企业邮箱"></Input>
                </FormItem>
                <FormItem label="用户职位" prop="dpId" style="width:450px;">
                    <Input v-model="formData.dpId" placeholder="请输入企业邮箱"></Input>
                </FormItem>
                <FormItem label="所属科室" prop="gender">
                    <RadioGroup v-model="formData.gender">
                        <Radio label="male">可以查看</Radio>
                        <Radio label="female">不可以查看</Radio>
                    </RadioGroup>
                </FormItem>
                <FormItem>
                    <Button type="primary" @click="handleSubmit('formData')">下一步</Button>
                    <Button type="ghost" @click="handleReset('formData')" style="margin-left: 8px">重置条件</Button>
                </FormItem>
            </Form>
        </div>
    </div>
</template>

<script>
import {API} from '../../../services'
import Vue from 'vue';
export default {
    data() {
        return {
            formData:{
                types:"0" ,//身份（0管理员，1医生）
                dpId:"", //部门id
                uName:"" ,//用户名
                password:"" ,//密码
                reName:"" ,//姓名
                tel:123, // 电话号码
                rIds:[],//权限Id（可多选）
            },
            //角色列表
            roleList:[],
        }
    },
    methods: {
        handleSubmit(name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    this.$Message.success('Success!');
                    this.$router.push("/access/business/business_depart/0");
                } else {
                    this.$Message.error('Fail!');
                }

            })
        },
        handleReset(name) {
            this.$refs[name].resetFields();
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
        submitData(){
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
        }
    },
    mounted () {
        /** 判断当前的业务类型 -1为新增，其他的为编辑 */
        this.id=this.$route.query.id;
    }
}
</script>

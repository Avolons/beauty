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
            <Form ref="formValidate" class="busadd_main_form" :model="formValidate" :rules="ruleValidate" :label-width="80">
                <h5>基本信息</h5>
                <FormItem label="用户名" prop="name" style="width:450px;">
                    <Input v-model="formValidate.name" placeholder="请输入企业名称"></Input>
                </FormItem>
                <FormItem label="密码" prop="name" style="width:450px;">
                    <Input v-model="formValidate.name" placeholder="请输入企业名称"></Input>
                </FormItem>
                <FormItem label="真实姓名" prop="name" style="width:450px;">
                    <Input v-model="formValidate.name" placeholder="请输入企业名称"></Input>
                </FormItem>
                <FormItem label="手机号码" prop="name" style="width:450px;">
                    <Input v-model="formValidate.name" placeholder="请输入企业名称"></Input>
                </FormItem>
                <h5>功能权限</h5>
                <FormItem label="用户角色" prop="mail" style="width:450px;">
                    <Select v-model="model1" style="width:200px">
                        <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                </FormItem>
                <h5>数据权限</h5>
                <FormItem label="用户职位" prop="mail" style="width:450px;">
                    <Input v-model="formValidate.mail" placeholder="请输入企业邮箱"></Input>
                </FormItem>
                <FormItem label="所属部门" prop="mail" style="width:450px;">
                    <Input v-model="formValidate.mail" placeholder="请输入企业邮箱"></Input>
                </FormItem>
                <FormItem label="部门数据" prop="gender">
                    <RadioGroup v-model="formValidate.gender">
                        <Radio label="male">可以查看</Radio>
                        <Radio label="female">不可以查看</Radio>
                    </RadioGroup>
                </FormItem>
                <FormItem>
                    <Button type="primary" @click="handleSubmit('formValidate')">下一步</Button>
                    <Button type="ghost" @click="handleReset('formValidate')" style="margin-left: 8px">重置条件</Button>
                </FormItem>
            </Form>
        </div>
    </div>
</template>

<script>
import Vue from 'vue';
import iviewArea from 'iview-area';
Vue.use(iviewArea);
export default {
    data() {
        return {
            cityList: [
                {
                    value: 'New York',
                    label: 'New York'
                },
                {
                    value: 'London',
                    label: 'London'
                },
                {
                    value: 'Sydney',
                    label: 'Sydney'
                },
                {
                    value: 'Ottawa',
                    label: 'Ottawa'
                },
                {
                    value: 'Paris',
                    label: 'Paris'
                },
                {
                    value: 'Canberra',
                    label: 'Canberra'
                }
            ],
            model1: '',
            res_s: [],
            formValidate: {
                name: '',
                mail: '',
                city: [],
                gender: '',
                interest: [],
                date: '',
                time: '',
                desc: ''
            },
            ruleValidate: {
                name: [
                    { required: true, message: '请填写企业名称', trigger: 'blur' }
                ],
                mail: [
                    { required: true, message: '请填写企业联系邮箱', trigger: 'blur' },
                    { type: 'email', message: '错误的邮箱格式', trigger: 'blur' }
                ],
                city: [
                    { required: true, type: 'array', message: '请输入企业所在地', trigger: 'change' }
                ],
                gender: [
                    { required: true, message: '请确认企业性质', trigger: 'change' }
                ],
                interest: [
                    { required: true, type: 'array', min: 1, message: 'Choose at least one hobby', trigger: 'change' },
                    { type: 'array', max: 2, message: 'Choose two hobbies at best', trigger: 'change' }
                ],
                desc: [
                    { required: true, message: '请输入企业简介', trigger: 'blur' },
                    { type: 'string', min: 20, message: '请至少输入20字以上的简介', trigger: 'blur' }
                ]
            }
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
        }
    }
}
</script>

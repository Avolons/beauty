<style lang="less">
    @import './login.less';
    .login{
        &_form{
            &_code{
                position: relative;
                img{
                    position: absolute;
                    right: 0;
                    top: 0;
                    height: 100%;
                    display: block;
                }
            }
        }
    }
</style>

<template>
    <div class="login" @keydown.enter="handleSubmit">
        <div class="login-con">
            <Card :bordered="false">
                <p slot="title">
                    <Icon type="log-in"></Icon>
                    欢迎登录
                </p>
                <div class="form-con">
                    <Form ref="loginForm" :model="form" :rules="rules">
                        <FormItem prop="userName">
                            <Input v-model="form.userName" placeholder="请输入用户名">
                                <span slot="prepend">
                                    <Icon :size="16" type="person"></Icon>
                                </span>
                            </Input>
                        </FormItem>
                        <FormItem prop="password">
                            <Input type="password" v-model="form.password" placeholder="请输入密码">
                                <span slot="prepend">
                                    <Icon :size="14" type="locked"></Icon>
                                </span>
                            </Input>
                        </FormItem>
                         <FormItem prop="code" class="login_form_code">
                            <Input type="text" v-model="form.code" placeholder="请输入验证码">
                                <span slot="prepend">
                                    <Icon :size="14" type="key"></Icon>
                                </span>
                            </Input>
                            <img :src="'192.168.1.40:8080/code?rnd=' + '0.12'" alt="code" >
                        </FormItem>
                        <FormItem>
                            <Button @click="handleSubmit" type="primary" long>登录</Button>
                        </FormItem>
                    </Form>
                    <p class="login-tip">输入任意用户名和密码即可</p>
                </div>
            </Card>
        </div>
    </div>
</template>

<script>
import Cookies from 'js-cookie';
import {API} from '../services';
export default {
    data () {
        return {
            /** 
             * 登录验证
             */
            form: {
                userName: 'admin',
                password: 'renshi',
                code:"1234",
            },
            rules: {
                userName: [
                    { required: true, message: '账号不能为空', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '密码不能为空', trigger: 'blur' }
                ],
                code:[
                    { required: true, message: '验证码不能为空', trigger: 'blur'}
                ]
            }
        };
    },
    methods: {
        handleSubmit () {
            this.$refs.loginForm.validate((valid) => {
                if (valid) {
                    API.common.login({
                        username: this.form.userName,
                        password: this.form.password,
                        picCode: this.form.code
                    }).then((res)=>{
                        Cookies.set('user', this.form.userName);
                        Cookies.set('password', this.form.password);
                        this.$store.commit('setAvator', 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3448484253,3685836170&fm=27&gp=0.jpg');
                        if (this.form.userName === 'iview_admin') {
                            Cookies.set('access', 0);
                        } else {
                            Cookies.set('access', 1);
                        }
                        this.$router.push({
                            name: 'home_index'
                        });
                    }).catch((err)=>{
                        console.log(err);
                    });
                    
                }
            });
        }
    }
};
</script>

<style>

</style>

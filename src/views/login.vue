<style lang="less">
@import './login.less';
.login {
    &_form {
        &_code {
            position: relative;
            img {
                position: absolute;
                right: 1px;
                top: 2px;
                height: calc(100% - 4px);
                display: block;
                z-index: 999;
                border-radius: 4px;
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
                        <FormItem prop="name">
                            <Input v-model="form.name" placeholder="请输入用户名">
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
                       <!--  <FormItem prop="code" class="login_form_code">
                            <Input type="text" v-model="form.code" placeholder="请输入验证码">
                            <span slot="prepend">
                                <Icon :size="14" type="key"></Icon>
                            </span>
                            </Input>
                            <img src="/kaptcha.jpg" alt="code">
                        </FormItem> -->
                        <FormItem>
                            <Button @click="handleSubmit" type="primary" long>登录</Button>
                        </FormItem>
                    </Form>
                    <p class="login-tip">输入您的用户名和密码</p>
                </div>
            </Card>
        </div>
    </div>
</template>

<script>
import Cookies from 'js-cookie';
import { API } from '../services';
export default {
    data() {
        return {
            /** 
             * 登录验证
             */
            form: {
                name: '',
                password: '',
               /*  code: "1234", */
            },
            rules: {
                name: [
                    { required: true, message: '账号不能为空', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '密码不能为空', trigger: 'blur' }
                ],
               /*  code: [
                    { required: true, message: '验证码不能为空', trigger: 'blur' }
                ] */
            }
        };
    },
    methods: {
        handleSubmit() {
            this.$refs.loginForm.validate((valid) => {
                if (valid) {
                    API.common.login({
                        username: this.form.name,
                        password: this.form.password,
                        /* picCode: this.form.code */
                    }).then((res) => {
                           localStorage.setItem('randomId', res.randomId);
                            /** 
                             * 菜单权限和功能权限
                             */
                            let menuList=[];//菜单权限列表
                            let funList=[];//功能权限列表
                            for (let item of res.data) {
                                if(item.isMenu){
                                 menuList.push(item);
                                }else{
                                 funList.push(item);
                                }
                            }
                            /** 
                             * 本地存储用户名和用户密码
                             */
                            localStorage.setItem('menuList',JSON.stringify(menuList));
                            localStorage.setItem('funList',JSON.stringify(funList));
                            /** 
                             * cookie保存用户名和用户密码
                             */
                            Cookies.set('user', this.form.name);
                            Cookies.set('password', this.form.password);

                            Cookies.set('baseData', JSON.stringify({
                                adminId:res.admin.id,
                                name:res.admin.username,
                                type:res.admin.typeStr,
                                loginTime:res.admin.dateLogin,
                                relname:res.admin.realname,
                                tel:res.admin.tel
                            }));
                            /** 
                             * 登录后设置头像
                             */
                            this.$store.commit('setAvator', 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3448484253,3685836170&fm=27&gp=0.jpg');
                            
                           /*  if (this.form.name === 'iview_admin') {
                                Cookies.set('access', 0);
                            } else {
                                Cookies.set('access', 1);
                            } */
                            /** 页面跳转 */
                            
                            this.$router.push({
                                name: 'home_index'
                            });
                    }).catch((err) => {
                    });

                }
            });
        }
    }
};
</script>

<style>

</style>

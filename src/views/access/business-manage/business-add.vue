<style lang="less">
.busadd {
    height: 100%;
    &_main {
        min-height: 100%;
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
                margin-bottom: 20px;
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
        <Modal
            v-model="modal"
            title="保存成功"
            ok-text="管理部门"
            cancel-text="以后再说"
            @on-ok="editDepart">
            <p>恭喜你，保存成功，是否进入部门管理</p>
        </Modal>
        <div class="busadd_main">
            <h3 class="busadd_main_title">基本资料</h3>
            <h4>请完善以下信息,方便我们更好的为您服务</h4>
            <Form ref="formValidate" class="busadd_main_form" :model="formValidate" :rules="ruleValidate" :label-width="80">
                <h5>基本信息</h5>
                <FormItem label="企业名称" prop="name" style="width:450px;">
                    <Input v-model="formValidate.name" placeholder="请输入企业名称"></Input>
                </FormItem>
                <FormItem label="企业法人" style="width:450px;">
                    <Input v-model="formValidate.repre" placeholder="请输入企业名称"></Input>
                </FormItem>
                <FormItem label="企业性质">
                    <RadioGroup v-model="formValidate.nature">
                        <Radio label="0">国有企业</Radio>
                        <Radio label="1">非国有企业</Radio>
                    </RadioGroup>
                </FormItem>
                <h5>业务信息</h5>
                <FormItem label="行业应用" style="width:450px;">
                    <Select v-model="formValidate.industry" placeholder="请选择行业" style="width:200px">
                        <Option v-for="item in industryList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                </FormItem>
                <FormItem label="主营业务" style="width:450px;">
                    <Input v-model="formValidate.product" placeholder="产品名"></Input>
                </FormItem>
                <h5>联系信息</h5>

                <FormItem label="所在地区" prop="city" style="width:600px;">
                    <al-selector class="busadd_main_city" v-model="formValidate.city" />
                </FormItem>
                <FormItem label="街道地址" prop="address" style="width:450px;">
                    <Input v-model="formValidate.address" placeholder="请输入具体地址"></Input>
                </FormItem>
                <FormItem label="联系人" prop="contacts" style="width:450px;">
                    <Input v-model="formValidate.contacts" placeholder="请输入企业联系人姓名"></Input>
                </FormItem>
                <FormItem label="联系电话" prop="phone" style="width:450px;">
                    <Input v-model="formValidate.phone" placeholder="请输入联系电话"></Input>
                </FormItem>
                <FormItem label="企业邮箱" prop="mail" style="width:450px;">
                    <Input v-model="formValidate.mail" placeholder="请输入企业邮箱"></Input>
                </FormItem>
                <FormItem label="公司简介" prop="desc" style="width:600px;">
                    <Input v-model="formValidate.desc" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入公司简介"></Input>
                </FormItem>
                <FormItem>
                    <Button type="primary" @click="handleSave('formValidate')">保存</Button>
                    <Button type="ghost" @click="handleReset('formValidate')" style="margin-left: 8px">重置条件</Button>
                </FormItem>
            </Form>
           
        </div>
    </div>
</template>

<script>
import Vue from 'vue';
import iviewArea from 'iview-area';
import {API} from '../../../services';
Vue.use(iviewArea);
export default {
    data() {
        return {
            id:-1,//增查判断
            modal:false,
            //行业分类
            industryList: [
                {
                    value: '移动APP',
                    label: '移动APP'
                },
                {
                    value: 'IT与软件开发',
                    label: 'IT与软件开发'
                },
                {
                    value: '新闻媒体',
                    label: '新闻媒体'
                },
                {
                    value: '通讯社交',
                    label: '通讯社交'
                },
                {
                    value: '电子商务',
                    label: '电子商务'
                },
                {
                    value: '游戏',
                    label: '游戏'
                },
                {
                    value: '音视频',
                    label: '音视频'
                },
                {
                    value: '金融',
                    label: '金融'
                },
                {
                    value: '教育',
                    label: '教育'
                },
                {
                    value: '医疗健康',
                    label: '医疗健康'
                },
                {
                    value: '旅游',
                    label: '旅游'
                },
                {
                    value: '物联网',
                    label: '物联网'
                },
                {
                    value: '汽车业/车联网',
                    label: '汽车业/车联网'
                },
                {
                    value: 'o2o',
                    label: 'o2o'
                },
                {
                    value: '电力/新能源',
                    label: '电力/新能源'
                },
                {
                    value: '交通运输',
                    label: '交通运输'
                },
                {
                    value: '医疗健康',
                    label: '医疗健康'
                },
                {
                    value: '生产制造',
                    label: '生产制造'
                },
                {
                    value: '建筑/地产',
                    label: '建筑/地产'
                },
                {
                    value: '政府/事业单位',
                    label: '政府/事业单位'
                },
                {
                    value: '基因',
                    label: '基因'
                },
                {
                    value: '新零售/烟草业',
                    label: '新零售/烟草业'
                },
                {
                    value: '物流邮政',
                    label: '物流邮政'
                },
                {
                    value: '运营商',
                    label: '运营商'
                },
                {
                    value: '能源重工',
                    label: '能源重工'
                },
                {
                    value: '公共事业/城市服务',
                    label: '公共事业/城市服务'
                },
                
            ],
            res_s: [],
            //所需验证数据
            formValidate: {
                name: '',//企业名称
                repre:"",//企业法人
                nature: '',//企业性质
                industry: '',//行业分类
                product: '',//产品
                city: [],//企业所在地
                address: "",//街道地址
                contacts:"",//企业联系人
                phone:'',//企业联系电话
                mail: '',//企业邮箱
                desc: ''//企业简介
            },
            /* 验证规则 */ 
            ruleValidate: this.validate.addBussiness
        }
    },
    methods: {
        /** 
         * 保存信息
         */
        handleSave(name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    API.Jurisdiction.addBusiness({
                        name:this.formValidate.name,
                        address:this.formValidate.address,
                        contacts:this.formValidate.contacts,
                        phone:this.formValidate.phone,
                    }).then((res)=>{
                        this.modal=true;
                        //绑定返回后的id
                        this.id=res.data;
                    }).catch((err)=>{

                    });
                } else {
                    this.$Message.error('保存失败!');
                }

            })
        },
        /** 
         * 编辑部门
         */
        editDepart(){
            this.modal=false;
            this.$router.push({
                path:"/access/business/depart",
                query:{
                    business_id:this.id,
                    name:this.formValidate.name
                }
            })
        },
        /** 
         * 重置所有属性
         */
        handleReset(name) {
            this.$refs[name].resetFields();
        },
        /** 
         * 初始化所有属性
         */
        initData(){
            if(this.id!=-1){
                API.Jurisdiction.infoBusiness({
                    id:this.id
                }).then((res)=>{
                    this.formValidate={...this.formValidate,...res.data};
                }).catch((err)=>{

                });
            }
        }
    },
    /** 
     * 判断类型
     */
    mounted () {
        /* id为-1 的情况下 是新增*/
        this.id= this.$route.query.business_id;  
        /* 初始化数据 */
        this.initData();
    }
}
</script>

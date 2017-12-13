export default {
    name: [
        { required: true, message: '请填写企业名称', trigger: 'blur' }
    ],
    mail: [
        { type: 'email', message: '错误的邮箱格式', trigger: 'blur' }
    ],
    phone: [
        { required: true, message: '请输入手机号码', trigger: 'blur' }
    ],
    city: [
        { required: true, type: 'array', message: '请输入企业所在地', trigger: 'change' }
    ],
    address: [
        { required: true, message: '请输入街道地址', trigger: 'blur' }
    ],
    contacts: [
        { required: true, message: '请输入联系人姓名', trigger: 'blur' }
    ],
    desc: [
        { type: 'string', min: 20, message: '请至少输入20字以上的简介', trigger: 'blur' }
    ],
    noticeName: [
        { required: true, message: '请选择通知计划', trigger: 'blur' }
    ],
    noticeTime: [
        { required: true, message: '请选择通知起止时间', trigger: 'blur' }
    ],
    noticeDesc: [
        { required: true, message: '请填写计划备注', trigger: 'blur' }
    ]
};

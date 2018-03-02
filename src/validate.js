let ruleList = {
    mobile: /^(\(\d{3,4}\)|\d{3,4}-)?\d{7,8}$/,
    code: /^1(3|4|5|7|8)[0-9]\d{8}$/,
    name: /^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,20}$/
};
export default {
    addBussiness: {
        name: [{
            required: true,
            message: '请填写企业名称',
            trigger: 'blur'
        }],
        mail: [{
            type: 'email',
            message: '错误的邮箱格式',
            trigger: 'blur'
        }],
        phone: [{
            required: true,
            message: '请输入正确的企业座机号码',
            trigger: 'blur',
            pattern: ruleList.mobile
        }],
        city: [{
            required: true,
            type: 'array',
            message: '请输入企业所在地',
            trigger: 'change'
        }],
        address: [{
            required: true,
            message: '请输入街道地址',
            trigger: 'blur'
        }],
        contacts: [{
            required: true,
            message: '请输入联系人姓名',
            trigger: 'blur',
            pattern: ruleList.name
        }],
        desc: [{
            type: 'string',
            min: 20,
            message: '请至少输入20字以上的简介',
            trigger: 'blur'
        }]
    },
    notice: {
        name: [{
            required: true,
            message: '请选择通知计划',
            trigger: 'blur'
        }],
        time: [{
            required: true,
            message: '请选择通知起止时间',
            trigger: 'blur'
        }],
        desc: [{
            required: true,
            message: '请填写计划备注',
            trigger: 'blur'
        }]
    },
    system: {
        type: [{
            required: true,
            type: 'number',
            message: '请输入类型',
            trigger: 'blur'
        }],
        key: [{
            required: true,
            message: '请输入编码',
            trigger: 'blur'
        }],
        value: [{
            required: true,
            message: '请输入参数值',
            trigger: 'blur'
        }],
        remark: [{
            required: true,
            message: '请填写备注',
            trigger: 'blur'
        }],
        main_type: [{
            required: true,
            message: '请输入分类信息',
            trigger: 'blur'
        }],
        sort: [{
            required: true,
            type: 'number',
            message: '请填写排序字段，必须为整数',
            trigger: 'blur'
        }]

    },
    access: {
        name: [{
            required: true,
            message: '请填写名称',
            trigger: 'blur'
        }],
        url: [{
            required: true,
            message: '请填写链接地址',
            trigger: 'blur'
        }],
        isMenu: [{
            required: false,
            message: '请选择类型',
            trigger: 'blur'
        }],
        pid: [{
            required: true,
            type: 'array',
            message: '请选择上级',
            trigger: 'blur'
        }]
    },
    depart: {
        name: [{
            required: true,
            message: '请填写名称',
            trigger: 'blur'
        }],
        paixu: [
        {
            required: true,
            type: 'number',
            message: '请填写序号',
            trigger: 'blur',
            transform(value) {
                return Number(value);
            }
        }
        ],
        types: [{
            required: true,
            message: '请选择类型',
            trigger: 'blur'
        }],
        type: [{
            required: true,
            message: '请选择类型',
            trigger: 'blur'
        }],
        mType: [{
            required: true,
            message: '请选择方案',
            trigger: 'blur'
        }],
        matchType: [{
            required: true,
            message: '请选择方案',
            trigger: 'blur'
        }],
        state: [{
            required: true,
            message: '请选择状态',
            trigger: 'blur'
        }],
        isUse: [{
            required: true,
            message: '请选择状态',
            trigger: 'blur'
        }],
        remark: [{
            required: false,
            message: '请输入备注',
            trigger: 'blur'
        }]
    },
    role: {
        name: [{
            required: true,
            message: '请输入名称',
            trigger: 'blur'
        }],
        profile: [{
            required: false,
            message: '请输入说明',
            trigger: 'blur'
        }]
    },
    disease: {
        name: [{
            required: true,
            message: '请输入名称',
            trigger: 'blur'
        }],
        zjmName: [{
            required: true,
            message: '请输入助记码',
            trigger: 'blur'
        }],
        icdName: [{
            required: true,
            message: '请输入ICD编码',
            trigger: 'blur'
        }],
        remark: [{
            required: false,
            message: '请输入备注',
            trigger: 'blur'
        }]

    },
    formCustom: {
        lxdh: [{
            required: true,
            message: '请输入正确的手机号码',
            trigger: 'blur',
            pattern: ruleList.code
        }],
        jtdh: [{
            required: true,
            message: '请输入正确的手机号码',
            trigger: 'blur',
            pattern: ruleList.code
        }]
    },
    users: {
        uName: [{
            required: true,
            message: '请输入用户名',
            trigger: 'blur'
        }],
        password: [{
            required: true,
            message: '请输入密码',
            trigger: 'blur'
        }],
        reName: [{
            required: true,
            message: '请输入真实姓名',
            trigger: 'blur'
        }],
        tel: [{
            required: true,
            message: '请输入正确的手机号码',
            pattern: ruleList.code,
            trigger: 'blur'
        }],
        types: [{
            required: false,
            message: '请输入正确的手机号码',
            pattern: ruleList.code,
            trigger: 'blur'
        }],
        rIds: [{
            required: true,
            type: 'array',
            message: '请选择用户角色',
            trigger: 'blur'
        }],
        adId: [{
            required: true,
            message: '请选择所属部门',
            trigger: 'blur'
        }],
        apId: [{
            required: false,
            message: '请选择用户职位',
            trigger: 'blur'
        }],
        dpId: [{
            required: true,
            message: '请选择所属科室',
            trigger: 'blur'
        }]
    },
    followAction: {
        name: [{
            required: true,
            message: '请输入方案名称',
            trigger: 'blur'
        }],
        departmentId: [{
            required: true,
            message: '请选择科室类别',
            trigger: 'change'
        }],
        wayTem: [{
            required: true,
            type: 'array',
            message: '请选择模板',
            trigger: 'change'
        }],
        switchWav: [{
            required: true,
            message: '请输入ai语音',
            trigger: 'change'
        }],
        diseaseId: [{
            type: 'array',
            required: true,
            message: '请选择疾病类型',
            trigger: 'blur'
        }]
    },
    followPlan: {
        AIphone: [{
            required: true,
            message: '请输入正确的手机号码',
 /*            pattern: ruleList.code, */
            trigger: 'blur'
        }]
    },
    sendData: {
        mobile: [{
            required: true,
            message: '请输入正确的服务号码',
           /*  pattern: ruleList.code, */
            trigger: 'blur'
        }],
        taskName: [{
            required: true,
            message: '请填写计划名称',
            trigger: 'blur'
        }],
        remark: [{
            required: true,
            message: '请填写通知简介',
            trigger: 'change'
        }]
    },
    operDate: {
        trueName: [
            { required: true, message: '请输入名称', trigger: 'blur' }
        ],
        phone: [
            { required: true, message: '请输入手机号码', pattern: ruleList.code, trigger: 'blur' }
        ]
    }

};

export default {
    addBussiness: {
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
        ]
    },
    notice: {
        name: [
            { required: true, message: '请选择通知计划', trigger: 'blur' }
        ],
        time: [
            { required: true, message: '请选择通知起止时间', trigger: 'blur' }
        ],
        desc: [
            { required: true, message: '请填写计划备注', trigger: 'blur' }
        ]
    },
    system: {
        type: [
            { required: true, type: 'number', message: '请输入类型', trigger: 'blur' }
        ],
        key: [
            { required: true, message: '请输入编码', trigger: 'blur' }
        ],
        value: [
            { required: true, message: '请输入参数值', trigger: 'blur' }
        ],
        remark: [
            { required: true, message: '请填写备注', trigger: 'blur' }
        ],
        main_type: [
            { required: true, message: '请输入分类信息', trigger: 'blur' }
        ],
        sort: [
            { required: true, type: 'number', message: '请填写排序字段，必须为整数', trigger: 'blur' }
        ]

    },
    access: {
        name: [
            { required: true, message: '请填写名称', trigger: 'blur' }
        ],
        url: [
            { required: true, message: '请填写链接地址', trigger: 'blur' }
        ],
        isMenu: [
            { required: false, message: '请选择类型', trigger: 'blur' }
        ],
        pid: [
            { required: true, type: 'array', message: '请选择上级', trigger: 'blur' }
        ]
    },
    depart: {
        name: [
            { required: true, message: '请填写名称', trigger: 'blur' }
        ],
        paixu: [
            { required: true, type: 'number', message: '请填写序号', trigger: 'blur' }
        ],
        types: [
            { required: true, message: '请选择类型', trigger: 'blur' }
        ],
        type: [
            { required: true, message: '请选择类型', trigger: 'blur' }
        ],
        mType: [
            { required: true, message: '请选择方案', trigger: 'blur' }
        ],
        matchType: [
            { required: true, message: '请选择方案', trigger: 'blur' }
        ],
        state: [
            { required: true, message: '请选择状态', trigger: 'blur' }
        ],
        isUse: [
            { required: true, message: '请选择状态', trigger: 'blur' }
        ],
        remark: [
            { required: false, message: '请输入备注', trigger: 'blur' }
        ]
    },
    role: {
        name: [
            { required: true, message: '请输入名称', trigger: 'blur' }
        ],
        profile: [
            { required: false, message: '请输入说明', trigger: 'blur' }
        ]
    },
    disease: {
        name: [
            { required: true, message: '请输入名称', trigger: 'blur' }
        ],
        profile: [
            { required: false, message: '请输入说明', trigger: 'blur' }
        ]
    }

};

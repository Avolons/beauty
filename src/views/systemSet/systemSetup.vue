<style lang="less">
.sys-sysset {
    &_main {
        &_list {
			margin-top: 10px;
		}
        &_page{
            margin-top: 10px;
        }
    }
}
</style>


<template>
    <div class="user">
        <div class="sys-sysset_main">
			<Button @click="modal=true"  type="primary">添加</Button>
            <div class="sys-sysset_main_list">
                <Table border :columns="columns7" :data="data6"></Table>
            </div>
            <Row class="sys-sysset_main_page">
            <Page :total="100" :current="1" show-elevator style="float:right" @on-change="changePage"></Page>
            </Row>
        </div>
		<Modal v-model="modal" title="添加参数" @on-ok="addDepart">
			<Form ref="formValidate" class="busadd_main_form" :model="formValidate" :rules="ruleValidate" :label-width="80">
				<FormItem label="类型" prop="type">
					<Select v-model="formValidate.type" placeholder="请选择类型">
						<Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
					</Select>
				</FormItem>
				<FormItem label="编码" prop="sequential">
					<Input v-model="formValidate.sequential" placeholder="请输入序号"></Input>
				</FormItem>
				<FormItem label="参数值" prop="desc">
					<Input v-model="formValidate.desc" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请填写备注"></Input>

				</FormItem>
				<FormItem label="备注" prop="desc">
					<Input v-model="formValidate.desc" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请填写备注"></Input>

				</FormItem>
			</Form>
		</Modal>
    </div>
</template>

<script>
export default {
    data() {
        return {
			value1: "",
			formValidate: {
				name: "",
				sequential: "",
				type: "",
				action: "",
				status: "",
				desc: "",//备注
			},
			/* 验证规则 */
			ruleValidate: {
				name: [
					{ required: true, message: '请输入科室名称', trigger: 'blur' }
				],
				sequential: [
					{ required: true, message: '请输入序号', trigger: 'blur' }
				],
				type: [
					{ required: true, message: '请选择类型', trigger: 'change' }
				],
				action: [
					{ required: true, message: '请选择匹配方案', trigger: 'change' }
				],
				status: [
					{ required: true, message: '请选择状态', trigger: 'change' }
				],
				desc: [
					{ type: 'string', min: 10, message: '请至少输入10字以上的备注', trigger: 'blur' }
				]
			},
			modal: false,
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
            columns7: [
                {
                    title: '编号',
                    key: 'role',
                },
                {
                    title: '值',
                    key: 'username'
                },
                {
                    title: '备注',
                    key: 'time'
                },
                {
                    title: '创建时间',
                    key: 'name'
                },
                {
                    title: '修改时间',
                    key: 'mobile'
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
                                on: {
                                    click: () => {
                                        this.show(params.index)
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
                                on: {
                                    click: () => {
                                        this.remove(params.index)
                                    }
                                }
                            }, '删除'),
                        ]);
                    }
                }
            ],
            data6: [
                {
                    role:"医生",
                    username:"1245786",
                    time:"2017-11-30 11:08:30",
                    action:"随访测试",
                    name:"测试",
                    mobile:14578884125,
                    look:1,
                },
                {
                    role:"医生",
                    username:"1245786",
                    time:"2017-11-30 11:08:30",
                    action:"随访测试",
                    name:"测试",
                    mobile:14578884125,
                    look:1,
                },
                {
                    role:"医生",
                    username:"1245786",
                    time:"2017-11-30 11:08:30",
                    action:"随访测试",
                    name:"测试",
                    mobile:14578884125,
                    look:1,
                },
                {
                    role:"医生",
                    username:"1245786",
                    time:"2017-11-30 11:08:30",
                    action:"随访测试",
                    name:"测试",
                    mobile:14578884125,
                    look:1,
                }
            ]
        }
    },
    methods: {
		/** 
         * 重置所有属性
         */
		handleReset(name) {
			this.$refs[name].resetFields();
		},
		/** 
		 * 添加新部门
		 */
		addDepart(){

		},
        show(index) {
            this.$Modal.info({
                title: 'User Info',
                content: `Name：${this.data6[index].name}<br>Age：${this.data6[index].age}<br>Address：${this.data6[index].address}`
            })
        },
        remove(index) {
            this.data6.splice(index, 1);
        },
        adduser(){
            this.$router.push('/access/user/sys-sysset_add/0');
        },
        changePage(){

        },
        searchuser(){
            
        }
    }
}
</script>


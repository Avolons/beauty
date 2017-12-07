<template>
	<Row class="suggests">
        <Col span="24" class="colheader">
        	<span class="labelHospital">医院</span>
            <Select v-model="years" style="width:100px;" placeholder="请选择医院" @on-change="handlechangeyear">
		        <Option v-for="item in recentYears" :value="item.value" :key="item.value">{{ item.label }}</Option>
		    </Select>
		    <span class="labelPeople">提交人</span>
		    <Select v-model="month" style="width:100px" placeholder="请选择提交人" @on-change="handlechangemonth">
		        <Option v-for="item in months" :value="item.value" :key="item.value">{{ item.label }}</Option>
		    </Select> 
		    <span class="labelPeople">状态</span>
		    <Select v-model="month" style="width:100px" placeholder="是否被采纳" @on-change="handlechangemonth">
		        <Option value="1" key="accept">未采纳</Option>
		        <Option value="2" key="refuse">已采纳</Option>
		    </Select>
		    <span class="labelPeople">开始时间</span>
		    <DatePicker type="date" placeholder="请选择起始时间" style="width: 200px"></DatePicker>
		    <span class="labelPeople">结束时间</span>
		    <DatePicker type="date" placeholder="请选择结束时间" style="width: 200px"></DatePicker>
            <Button type="primary" @click="searchTime()" class="searchBtn ml20">查询</Button>
        </Col>
        <Col span="24" class="suggesttable">
        	<Table border :columns="columns" :data="data6" height="520" @on-row-click="handleClick"></Table>
        	<Page :total="100" show-total class="pagination right"></Page>
        </Col>
        <Modal v-model="modal1" title="Common Modal dialog box title" @on-ok="ok" @on-cancel="cancel">
            <p>Content of dialog</p>
            <p ref="modelValue"></p>
            <p>Content of dialog</p>
        </Modal>
       
    </Row>
</template>

<script>
	export	default	{
		data() {
			return {
				years: '',
				month: '',
				recentYears: '',
				months: '',
				columns: [
                    {
                    	title: '提交人/职务',
                    	key: 'name',
                    	align: 'center'
                    },
                    {
                        title: '所属医院',
                        key: 'age',
                        align: 'center'
                    },
                    {
                        title: '所属科室',
                        key: 'address',
                        align: 'center'
                    },
                    {
                        title: '建议提交时间',
                        key: 'address',
                        align: 'center'
                    },
                    {
                        title: '建议反馈',
                        key: 'address',
                        align: 'center',
                        ellipsis: 'true',
                         render: (h, params) => {
                            return h('div', {
                                        on: {
                                            click: () => {
                                                console.log(params.row.address)
                                                this.modal1 = true
                                                this.$refs.modelValue.innerHTML = params.row.address
                                            }
                                        }
                            },params.row.address)
                           
                        }
                    },
                    {
                        title: '医生手机号码',
                        key: 'address',
                        align: 'center'
                    },
                    {
                        title: '提交平台',
                        key: 'address',align: 'center'
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
                                }, '采纳'),
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.remove(params.index)
                                        }
                                    }
                                }, '删除')
                            ]);
                        }
                    }
                ],
                data6: [
                    {
                        name: 'John Brown',
                        age: 18,
                        address: 'New York No. 1 Lake Park'
                    },
                    {
                        name: 'Jim Green',
                        age: 24,
                        address: 'London No. 1 Lake Park'
                    },
                    {
                        name: 'Joe Black',
                        age: 30,
                        address: 'Sydney No. 1 Lake Park'
                    },
                    {
                        name: 'Jon Snow',
                        age: 26,
                        address: 'Ottawa No. 2 Lake Park'
                    }
                ],
                modal1: false
			}
		},
		methods: {
			handlechangeyear(value) {

			},
			handlechangemonth(value) {

			},
			searchTime() {

			},
			show (index) {
                this.$Modal.info({
                    title: 'User Info',
                    content: `Name：${this.data6[index].name}<br>Age：${this.data6[index].age}<br>Address：${this.data6[index].address}`
                })
            },
            remove (index) {
                this.data6.splice(index, 1);
            },
            handleClick(index) {
            	// console.log(index)
            },
            ok () {
                this.$Message.info('Clicked ok');
            },
            cancel () {
                this.$Message.info('Clicked cancel');
            }
		}
	}
</script>

<style lang="less">
	.right {
		float: right;
	}
	.suggests {
		
		padding: 15px 0;
		.colheader {
			background: #fff;
			padding: 15px 0;
			.labelHospital, .labelPeople {
				font-weight: bold;
			}
		}
		.suggesttable {
			margin-top: 30px;
			background: #fff;
			padding: 15px;
			.ivu-table-wrapper {

			}
			.pagination {
				margin: 20px 30px 0;
			}
		}
	}
	
</style>
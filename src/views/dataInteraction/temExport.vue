<style lang="less">
.inter-down {
    &_main {
        &_list {}
        &_search{
            box-sizing: border-box;
            margin-bottom: 10px;
            .ivu-col{
                display: flex;
                >span{
                    background-color: #dadada;
                    text-align: center;
                    line-height: 32px;
                    display: block;
					width: 80px;
					flex-shrink: 0;
                    border-top-left-radius: 4px;
                    border-bottom-left-radius: 4px;
                }
                .ivu-input{
                    border-top-left-radius: 0;
                    border-bottom-left-radius: 0;
                }
                .ivu-select{
                    flex-grow: 1;
                    flex-shrink: 1;
                }
                .ivu-select-selection{
                    border-top-left-radius: 0;
                    border-bottom-left-radius: 0;
                }
            }
        }
        &_page{
            margin-top: 10px;
        }
    }
}
</style>


<template>
    <div class="user">
        <div class="inter-down_main">
            <Row class="inter-down_main_search" :gutter="15">
                <Col span="6">
                <span>
                    模板名称：
                </span>
                <Input v-model="value1"  placeholder="large size"></Input>
                </Col>
				<Col span="6">
                <span>
                    疾病类型：
                </span>
                <Input v-model="value1"  placeholder="large size"></Input>
                </Col>
                <Col span="6">
					<Button @click="searchuser" type="primary">查询</Button>
                </Col>
            </Row>
            <div class="inter-down_main_list">
                 <Table border ref="selection" :columns="config" :data="dataList"></Table>
        
            </div>
            <Row class="inter-down_main_page">
				<Button @click="handleSelectAll(true)">全选</Button>
				<Button @click="handleSelectAll(false)">取消</Button>
				<Button @click="handleSelectAll(false)" type="primary">导出</Button>
            <Page :total="100" :current="1" show-elevator style="float:right" @on-change="changePage"></Page>
            </Row>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            value1: "",
                model1: '',
            config: [
                {
					type: 'selection',
                    width: 60,
					align: 'center'
                },
                {
                    title: '模板名称',
                    key: 'username'
                },
                {
                    title: '疾病类型',
                    key: 'time'
                },
                 {
                    title: '操作',
                    key: 'action',
                    width: 200,
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
							}, '导出该随访模板'),
                        ]);
                    }
                }
            ],
            dataList: [
                
            ]
        }
    },
    methods: {
        show(index) {
            this.$Modal.info({
                title: 'User Info',
                content: `Name：${this.dataList[index].name}<br>Age：${this.dataList[index].age}<br>Address：${this.dataList[index].address}`
            })
		},
		handleSelectAll (status) {
                this.$refs.selection.selectAll(status);
            },
        remove(index) {
            this.dataList.splice(index, 1);
        },
        adduser(){
            this.$router.push('/access/user/inter-down_add/0');
        },
        changePage(){

        },
        searchuser(){
            
        }
    }
}
</script>


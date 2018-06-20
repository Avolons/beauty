<template>
    <div>
        <Row class="expand-row">
            <table style="width:100%">
                <tr class="ivu-table-row" v-for="item in data" :key="item.id">
                    <td class="">
                        <div class="ivu-table-cell">
                            <span>{{item.brxm}}</span>
                        </div>
                    </td>
                    <td class="">
                        <div class="ivu-table-cell">
                            <span>{{item.mobile}}</span>
                        </div>
                    </td>
                    <td class="">
                        <div class="ivu-table-cell">
                            <span>{{item.icdName}}</span>
                        </div>
                    </td>
                    <td class="">
                        <div class="ivu-table-cell">
                            <span>{{item.schemeName}}</span>
                        </div>
                    </td>
                    <td class="">
                        <div class="ivu-table-cell">
                            <span>{{item.statusStr}}</span>
                        </div>
                    </td>
                    <td class="">
                        <div class="ivu-table-cell">
                            <span>{{item.dateAdd}}</span>
                        </div>
                    </td>
                    <td class="">
                        <div class="ivu-table-cell">
                            <span>{{item.dateVet}}</span>
                        </div>
                    </td>
                    <td class="">
                        <div class="ivu-table-cell">
                            <span>{{item.adminName}}</span>
                        </div>
                    </td>
                    <td class="">
                        <div class="ivu-table-cell">
                            <span>{{item.operator}}</span>
                        </div>
                    </td>
                    <td class="ivu-table-column-center" style="width:200px">
                        <div class="ivu-table-cell">
                            <Button v-if="!menuShow(AM.Data.listSame)" @click="pass(item.id,2)" type="primary">通过</Button>
                            <Button v-if="!menuShow(AM.Data.listSame)" @click="pass(item.id,1)" type="info">不通过</Button>
                        </div>
                    </td>
                </tr>
            </table>
        </Row>
    </div>
</template>
<script>
import { API } from '@/services/index.js';
import { AM } from '@/accessMenu.js';
export default {
    props: {
        data: Array,
    },
    data () {
        return {
            AM
        }
    },
    methods: {
        pass(id,type){
            this.$Modal.confirm({
				title: '审核确认',
				content: '是否确定执行该操作？',
				onOk: () => {
					API.Dataaudit.passPlan({
						status: type,
						ids: [id]
					}).then((res) => {
						this.$Message.success("操作成功");
						this.$emit('getData')
					}).catch((err) => {

					});
				}
			});
        }
    }
};
</script>
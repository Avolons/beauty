<style lang="less">
.main .single-page-con .single-page{
    height: 100%;
    margin: 0;
    padding: 10px;
    box-sizing: border-box;
}
.roleAdd {
    height: 100%;
    &_main {
        background-color: #fff;
        padding: 10px;
        height: 100%;
        box-sizing: border-box;
        &_single {
            .ivu-col>span{
                text-align: right;
                display: block;
                width: 100%;
                font-size: 14px;
            }
            margin-bottom: 20px;
        }
        
    }
}
</style>


<template>
    <div class="roleAdd">
        <div class="roleAdd_main">
            <Row class="roleAdd_main_single">
                <Col span="4">
                <span>名称：</span>
                </Col>
                <Col span="20">
                <Input v-model="value" placeholder="Enter something..." style="width: 300px"></Input>
                </Col>
            </Row>
            <Row class="roleAdd_main_single">
                <Col span="4">
                <span>说明：</span>
                </Col>
                <Col span="20">
                <Input v-model="value5" type="textarea" placeholder="Enter something..." style="width: 300px"></Input>
                </Col>
            </Row>
            <Row class="roleAdd_main_single">
                <Col span="4">
                <span>权限：</span>
                </Col>
                <Col span="20">
                <Tree :data="data2" show-checkbox></Tree>
                </Col>
            </Row>
        </div>
    </div>
</template>


<script>
export default {
    data() {
        return {
            value:"",
            value5:"",
            data2: [
                {
                    title: 'parent 1',
                    expand: true,
                    children: [
                        {
                            title: 'parent 1-1',
                            expand: true,
                            children: [
                                {
                                    title: 'leaf 1-1-1'
                                },
                                {
                                    title: 'leaf 1-1-2'
                                }
                            ]
                        },
                        {
                            title: 'parent 1-2',
                            expand: true,
                            children: [
                                {
                                    title: 'leaf 1-2-1'
                                },
                                {
                                    title: 'leaf 1-2-1'
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    }
}
</script>



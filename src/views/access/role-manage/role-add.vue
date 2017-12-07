<style lang="less">
.main .single-page-con .single-page {
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
        >h3 {
            text-align: left;
            line-height: 40px;
            font-size: 15px;
            position: relative;
            text-indent: 15px;
            margin-bottom: 10px;
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
        &_single {
            >span {
                font-size: 14px;
                text-indent: 10px;
            }
            .ivu-input {
                font-size: 14px;
            }
            display: flex;
            .ivu-tree {
                >ul {
                    >li {
                        margin: 0;
                    }
                }
            }
            .ivu-col>span {
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
            <h3>添加新角色</h3>
            <div class="roleAdd_main_single">
                <span>名称：</span>
                <Input v-model="value" placeholder="请输入角色名称" style="width: 300px;"></Input>
            </div>
            <div class="roleAdd_main_single">
                <span>说明：</span>
                <Input v-model="value5" type="textarea" placeholder="请输入角色说明" style="width: 300px;"></Input>
            </div>
            <div class="roleAdd_main_single">
                <span>权限：</span>
                <Tree :data="data2" show-checkbox></Tree>
            </div>
            <div class="roleAdd_main_btnList">
                <Button type="primary" @click="handleSave('formValidate')">保存</Button>
                <Button type="ghost" @click="handleReset('formValidate')" style="margin-left: 8px">重置条件</Button>
            </div>
        </div>
    </div>
</template>


<script>
export default {
    data() {
        return {
            value: "",
            value5: "",
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



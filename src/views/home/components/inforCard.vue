<style lang="less">
    @import './styles/infor-card.less';
    .infor-intro-text{
        font-size: 15px;
        color: #333;
        margin-bottom: 5px;
    }
</style>

<template>
    <Card :padding="0">
        <div class="infor-card-con">
            <Col class="infor-card-icon-con" :style="{backgroundColor: color, color: 'white'}" span="8">
                <Row class="height-100" type="flex" align="middle" justify="center">
                    <Icon :type="iconType" :size="iconSize"></Icon>
                </Row>
            </Col>
            <Col span="16" class="height-100" style="padding-left:15px">
                <Row type="flex" align="middle"  class="height-100">
                    <count-up 
                        class="infor-card-count user-created-count" 
                        :id-name="idName" 
                        :id-names="idNames" 
                        :id-namess="idNamess" 
                        :end-val="endVal" 
                        :color="color"
                        :countSize="countSize"
                        :countWeight="countWeight"
                        :params="params"
                    >
                    <p class="infor-intro-text" slot="intro">{{ introText }}</p>
                    </count-up>
                </Row>
            </Col>
        </div>
    </Card>
</template>

<script>
import countUp from './countUp.vue';

export default {
    name: 'inforCard',
    components: {
        countUp
    },
    props: {
        idName: String,
        idNames:String,
        idNamess:String,
        endVal: Array,
        color: String,
        iconType: String,
        introText: String,
        countSize: {
            type: String,
            default: '30px'
        },
        params:{
            type:Array,
        },
        countWeight: {
            type: Number,
            default: 700
        },
        iconSize: {
            type: Number,
            default: 40
        }
    }
};
</script>


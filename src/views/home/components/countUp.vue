<style lang="less">
.count_span {
    font-size: 12px;
    margin-top: 10px;
    font-weight: 700;
}
</style>

<template>
    <div>
        <slot name="intro"></slot>
        <p :class="className" :style="{textAlign: 'center', color: color, fontSize: countSize, fontWeight: countWeight}">
            <div class="count_span">
                {{params[0]}}:&nbsp;&nbsp;&nbsp;
                <span :style="{color: color}" v-cloak :id="idName">{{ startVal }}</span>
            </div>
            <div class="count_span" v-if="params[1]">
                {{params[1]}}:&nbsp;&nbsp;&nbsp;
                <span :style="{color: color}" v-cloak :id="idNames">{{ startVal }}</span>
            </div>
            <div class="count_span" v-if="params[2]">
                {{params[2]}}:&nbsp;&nbsp;&nbsp;
                <span :style="{color: color}" v-cloak :id="idNamess">{{ startVal }}</span>
            </div>
        </p>
    </div>
</template>

<script>
import CountUp from 'countup';

function transformValue(val) {
    return val;
}

export default {
    data() {
        return {
            demo1: {},
            demo2: {},
        };
    },
    name: 'countUp',
    props: {
        idName: String,
        idNames: String,
        idNamess: String,
        className: String,
        startVal: {
            type: Number,
            default: 0
        },
        endVal: {
            type: Array,
            required: true
        },
        decimals: {
            type: Number,
            default: 0
        },
        duration: {
            type: Number,
            default: 2
        },
        delay: {
            type: Number,
            default: 500
        },
        options: {
            type: Object,
            default: () => {
                return {
                    useEasing: true,
                    useGrouping: true,
                    separator: ',',
                    decimal: '.'
                };
            }
        },
        color: String,
        countSize: {
            type: String,
            default: '30px'
        },
        params: {
            type: Array,
        },
        countWeight: {
            type: Number,
            default: 700
        },
        introText: [String, Number]
    },
    mounted() {
        
        this.$nextTick(() => {
            setTimeout(() => {
                let res = transformValue(this.endVal);
                let endVal = res;

                {
                    let demo = {};
                    this.demo1 = demo = new CountUp(this.idName, this.startVal, endVal[0], this.decimals, this.duration, this.options);
                    if (!demo.error) {
                        demo.start();
                    }
                }
                if(endVal[1])
                {
                    let demo = {};
                    this.demo2 = demo = new CountUp(this.idNames, this.startVal, endVal[1], this.decimals, this.duration, this.options);
                    if (!demo.error) {
                        demo.start();
                    }
                }
                if(endVal[2])
                {
                    let demo = {};
                    this.demo2 = demo = new CountUp(this.idNames, this.startVal, endVal[1], this.decimals, this.duration, this.options);
                    if (!demo.error) {
                        demo.start();
                    }
                }

            }, this.delay);
        });
    },
    watch: {
        endVal(val) {
            let res = transformValue(val);
            let endVal = res;
            this.demo1.update(endVal[0]);
            if(endVal[1]){
                this.demo2.update(endVal[1]);
            }
            if(endVal[2]){
                this.demo2.update(endVal[2]);
            }
        }
    }
};
</script>

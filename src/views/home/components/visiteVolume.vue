<template>
    <div :data="data" style="width:100%;height:300px;" id="visite_volume_con">
    </div>
</template>

<script>
import echarts from 'echarts';
export default {
    name: 'visiteVolume',
    data() {
        return {
            visiteVolume: ""
        };
    },
    props: {
        data: Array
    },
    methods: {
        init() {
            let dateList=[];
            let numList=[];
            for (const item of this.data) {
                dateList.push(item.dateBegin);
                numList.push(item.doNum);
            }
            const option = {
                color: ['#3398DB'],
                title: {
                    text: '每日就诊患者',
                    textStyle: {
                        fontWeight: 'normal',
                        fontSize: 16,
                        color: '#333',
                        fontWeight: 700,
                    },
                    top: "10px",
                    left: '20px'
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                        type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                    }
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: [
                    {
                        type: 'category',
                        data: dateList,
                        axisTick: {
                            alignWithLabel: true
                        }
                    }
                ],
                yAxis: [
                    {
                        type: 'value'
                    }
                ],
                series: [
                    {
                        name: '直接访问',
                        type: 'bar',
                        barWidth: '60%',
                        data: numList
                    }
                ]
            };

            this.visiteVolume.setOption(option);
        }
    },
    mounted() {
        this.$nextTick(() => {
            this.visiteVolume = echarts.init(document.getElementById('visite_volume_con'));

            this.init();
            let self = this;
            window.addEventListener('resize', function() {
                self.visiteVolume.resize();
            });
        });
    }
};
</script>

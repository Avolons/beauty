<template>
    <div :data="data" style="width:100%;height:390px;" id="visite_volume_con">
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
            let dateList = [];
            let numList = [];
            let planList = [];
            for (const item of this.data) {
                dateList.push(item.dateBegin);
                numList.push(item.doNum);
                planList.push(item.totalNum);
            }
            const option = {
                color: ['#3398DB'],
                title: {
                    text: '随访正常通话统计',
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
                        name: '实际呼出数量',
                        type: 'bar',
                        barWidth: '60%',
                        data: numList
                    },
                    {
                        name: '计划呼出量',
                        type: 'line',
                        /* barWidth: '60%', */
                        data: planList,
                        "itemStyle": {
                            "normal": {
                                "color": "rgba(0,191,183,1)",
                                "barBorderRadius": 0,
                                "label": {
                                    "show": true,
                                    "position": "top",
                                    formatter: function(p) {
                                        return p.value > 0 ? (p.value) : '';
                                    }
                                }
                            }
                        },
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

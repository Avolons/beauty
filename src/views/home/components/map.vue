<template>
    <div :mapData="mapData" style="width:calc(100% - 10px);height:305px;" id="home_page_map">
    </div>
</template>

<script>
import echarts from 'echarts';
import geoData from '../map-data/get-geography-value.js';
export default {
    name: 'homeMap',
    data(){
        return{
            map:"",
        };
    },
    props: {
        cityData: Array,
        mapData:Array
    },
    watch: {
     mapData(value){
        this.map.resize();
     }
    },
    methods:{
        init(){
            let dateList=[];
            let numList=[];
            for (const item of this.mapData) {
                dateList.push(item.diagnoseTime);
                numList.push(item.jzNum);
            }
            this.map.setOption({
            backgroundColor: '#fff',
            title: {
                text: '每日就诊患者',
                textStyle: {
                    fontWeight: 'normal',
                    fontSize: 16,
                    color: '#333'
                },
                left: '20px'
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    lineStyle: {
                        color: '#57617B'
                    }
                }
            },
            legend: {
                icon: 'rect',
                itemWidth: 14,
                itemHeight: 5,
                itemGap: 13,
                data: ['就诊数量'],
                right: '4%',
                textStyle: {
                    fontSize: 12,
                    color: '#F1F1F3'
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: [{
                type: 'category',
                boundaryGap: false,
                axisLine: {
                    lineStyle: {
                        color: '#57617B'
                    }
                },
                data: dateList
            }, {
                axisPointer: {
                    show: false
                },
                axisLine: {
                    lineStyle: {
                        color: '#57617B'
                    }
                },
                axisTick: {
                    show: false
                },

                position: 'bottom',
                offset: 20,
            }],
            yAxis: [{
                type: 'value',
                name: '单位（人次）',
                axisTick: {
                    show: false
                },
                axisLine: {
                    lineStyle: {
                        color: '#57617B'
                    }
                },
                axisLabel: {
                    margin: 10,
                    textStyle: {
                        fontSize: 14
                    }
                },
                splitLine: {
                    lineStyle: {
                        color: '#fff'
                    }
                }
            }],
            series: [{
                name: '就诊人数',
                type: 'line',
                smooth: true,
                symbol: 'circle',
                symbolSize: 5,
                showSymbol: false,
                lineStyle: {
                    normal: {
                        width: 1
                    }
                },
                areaStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: 'rgba(45, 140, 240, 0.7)'
                        }, {
                            offset: 0.8,
                            color: 'rgba(45, 140, 240, 0.2)'
                        }], false),
                        shadowColor: 'rgba(0, 0, 0, 0.1)',
                        shadowBlur: 10
                    }
                },
                itemStyle: {
                    normal: {
                        color: 'rgb(45, 140, 240)',
                        borderColor: 'rgba(45, 140, 240,0.27)',
                        borderWidth: 12

                    }
                },
                data:numList
            }]

        });
        }
    },
    mounted() {
        this.$nextTick(() => {
            this.map = echarts.init(document.getElementById('home_page_map'));
        this.init();
       let self=this;
        window.addEventListener('resize', function() {
            self.map.resize();
        });
        });
        
    }
};
</script>



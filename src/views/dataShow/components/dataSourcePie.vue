<style lang="less">

</style>

<template>
    <div :data="data" style="height:340px;width:100%" id="data_source_con">
    </div>
</template>

<script>
import echarts from 'echarts';

export default {
    name: 'dataSourcePie',
    data() {
        return {
            dataSourcePie:"",
        };
    },
    props: {
         data:Array
    },
    methods: {
        init(){
             let legend=[];
             let all=0;
           for (const item of this.data) {
               legend.push(item.name);
               all+=(item.value-0);
           }
            const option = {
                backgroundColor: '#fff',
                title: {
                    text:all,
                    /* subtext: '2016年', */
                    x: '38.5%',
                    y: '160px',
                    textStyle: {
                        fontWeight: 'normal',
                        fontSize: 14
                    }
                },
                tooltip: {
                    show: true,
                    trigger: 'item',
                    formatter: "{b}: {c} ({d}%)"
                },
                legend: {
                    type:"scroll",
                    orient: 'vertical',
                    right: '15%',
                    top:"60px",
                    data:legend
                },
                series: [{
                    center: ['40%', '175px'],
                    type: 'pie',
                    selectedMode: 'single',
                    radius: ['25%', '58%'],
                    color: ['#4fabfb', '#64d572', '#ff7279', '#ffde72', '#ffb672',"#caf76a","#7082fe"],
                    label: {
                        normal: {
                            position: 'inner',
                            formatter: '{d}%',

                            textStyle: {
                                color: '#fff',
                                fontWeight: 'bold',
                                fontSize: 12
                            }
                        }
                    },
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },
                    data: this.data
                }, {
                    center: ['40%', '175px'],
                    type: 'pie',
                    radius: ['58%', '78%'],
                    itemStyle: {
                        normal: {
                            color: '#F2F2F2'
                        },
                        emphasis: {
                            color: '#ADADAD'
                        }
                    },
                    label: {
                        normal: {
                            position: 'inner',
                            formatter: '{c}',
                            textStyle: {
                                color: '#777777',
                                fontWeight: 'bold',
                                fontSize: 10
                            }
                        }
                    },
                    data: this.data
                }]
            };
            this.dataSourcePie.setOption(option);
        }  
    },
    mounted() {
        this.$nextTick(() => {
            this.dataSourcePie = echarts.init(document.getElementById('data_source_con'));
            this.init();
            let self=this;
            window.addEventListener('resize', function() {
                self.dataSourcePie.resize();
            });
        });
    }
};
</script>

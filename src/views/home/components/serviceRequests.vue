<template>
    <div :data="data" style="height:280px;width:100%" id="service_request_con">
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
                    text: all,
                    /* subtext: '2016年', */
                    x: 'center',
                    y: '110px',
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
                    orient: 'horizontal',
                    bottom: '0%',
                    data:legend
                },
                series: [{
                    center: ['50%', '120px'],
                    type: 'pie',
                    selectedMode: 'single',
                    radius: ['25%', '58%'],
                    color: ['#86D560', '#AF89D6', '#59ADF3', '#FF999A', '#FFCC67'],
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
                    center: ['50%', '120px'],
                    type: 'pie',
                    radius: ['58%', '83%'],
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
            this.dataSourcePie = echarts.init(document.getElementById('service_request_con'));
            this.init();
            let self=this;
            window.addEventListener('resize', function() {
                self.dataSourcePie.resize();
            });
        });
    }
};
</script>
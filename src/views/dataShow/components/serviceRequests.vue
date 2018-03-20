<template>
    <div :data="data" style="height:340px;width:100%" id="service_request_con">
    </div>
</template>

<script>
import echarts from 'echarts';

export default {
    name: 'dataSourcePie',
    data() {
        return {
            dataSourcePie: "",
        };
    },
    props: {
        data: Array
    },
    methods: {
        init() {
            let legend = [];
            let all = 0;
            for (const item of this.data) {
                legend.push(item.name);
                all += (item.value - 0);
            }
            const option = {
                backgroundColor: '#fff',
                title: {
                    text: all,
                    /* subtext: '2016年', */
                    x: 'center',
                    y: '160px',
                    textStyle: {
                        fontWeight: 'normal',
                        fontSize: 14
                    }
                },
                tooltip: {
                    show: true,
                    trigger: 'item',
                    formatter: "{a} <br/>{b}: {c} ({d}%)"
                },
                legend: {
                    type: "scroll",
                    orient: 'horizontal',
                    bottom: "0",
                    data: legend
                },
                series: [{
                    center: ['center', '175px'],
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
                    name:"意向分布",
                    center: ['center', '175px'],
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
                            formatter: '{a|{a}}{abg|}\n{hr|}\n  {b|{b}：}{c|{c}}  {per|{d}%}  ',
                            backgroundColor: '#eee',
                            borderColor: '#aaa',
                            borderWidth: 1,
                            borderRadius: 4,
                            // shadowBlur:3,
                            // shadowOffsetX: 2,
                            // shadowOffsetY: 2,
                            // shadowColor: '#999',
                            // padding: [0, 7],
                            rich: {
                                a: {
                                    color: '#999',
                                    lineHeight: 22,
                                    align: 'center'
                                },
                                hr: {
                                    borderColor: '#aaa',
                                    width: '100%',
                                    borderWidth: 0.5,
                                    height: 0
                                },
                                b: {
                                    fontSize: 14,
                                    lineHeight: 33,
                                    color: '#333',
                                },
                                c: {
                                    fontSize: 13,
                                    lineHeight: 33,
                                    color: '#333',
                                },
                                per: {
                                    color: '#eee',
                                    backgroundColor: '#334455',
                                    padding: [2, 4],
                                    borderRadius: 2
                                }
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
            let self = this;
            window.addEventListener('resize', function() {
                self.dataSourcePie.resize();
            });
        });
    }
};
</script>
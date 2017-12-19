<template>
	<Row class="searchCondition">
        <Col span="24">
        	<span>年份</span>
            <Select v-model="years" style="width:100px;margin: 0 20px 0 30px;" placeholder="请选择年份" @on-change="handlechangeyear">
		        <Option v-for="item in recentYears" :value="item.value" :key="item.value">{{ item.label }}</Option>
		    </Select>
		    <span>月份</span>
		    <Select v-model="month" style="width:100px" placeholder="请选择月份" @on-change="handlechangemonth">
		        <Option v-for="item in months" :value="item.value" :key="item.value">{{ item.label }}</Option>
		    </Select>
            <Button type="primary" @click="searchTime()" class="searchBtn ml20">查询</Button>
        </Col>
        <Col span="24">
        	<div id="myChart" style="width:100%;height:500px;">
        		
        	</div>
        </Col>
    </Row>
   
</template>

<script>
	import echarts from 'echarts';
	import axios from 'axios';
	export	default	{
		data() {
			return {
				recentYears: [],
				months: [
					{value: '1', label: '1'},
					{value: '2', label: '2'},
					{value: '3', label: '3'},
					{value: '4', label: '4'},
					{value: '5', label: '5'},
					{value: '6', label: '6'},
					{value: '7', label: '7'},
					{value: '8', label: '8'},
					{value: '9', label: '9'},
					{value: '10', label: '10'},
					{value: '11', label: '11'},
					{value: '12', label: '12'},
                ],
				years: '',
				month: '',
				selectYear: '',
				selectMonth: ''
			}
		},
		mounted() {
			this._myChart()
			this._recentYears()
			// this.searchTime()
		},
		methods: {
			_myChart() {
				this._recentYears()

				let _myChart = echarts.init(document.getElementById('myChart'));
				let option = {
				    title: {
				        text: '随访系统呼叫任务完成情况(日)',
				        x: 'center',
				        subtext: '数据来自虚拟医生',

				    },
				    backgroundColor: '#e7e7e7',
				    
				    tooltip: {
				        trigger: 'axis',
				        axisPointer: {
				            type: 'shadow'
				        }
				    },
				    legend: {
				        data: ['实际打完的', '实际生成的(不包括昨日延时,或者未打完的)'],
				        align: 'left',
				        x: 'right',
				        y: '25px'
				    },
				    grid: {
				        left: '3%',
				        right: '4%',


				        bottom: '3%',
				        containLabel: true
				    },
				    yAxis: [
					    {
					        type: 'value',
					        boundaryGap: [0, 0.01]
					    }
				    ],
				    xAxis: [
					    {
					        type: 'category',
					        data: [
					        '2017-10-1','2017-10-2','2017-10-3','2017-10-4','2017-10-5','2017-10-6',
					        '2017-10-7','2017-10-8','2017-10-9','2017-10-10','2017-10-11','2017-10-12',
					        '2017-10-13','2017-10-14','2017-10-15','2017-10-16','2017-10-17','2017-10-18',
					        '2017-10-19','2017-10-20','2017-10-21','2017-10-22','2017-10-23','2017-10-24',
					        '2017-10-25','2017-10-26','2017-10-27','2017-10-28','2017-10-29','2017-10-30','2017-10-31'
					        ],
					        axisLabel: {
					            interval: 0,
					            rotate: 30
					        },
					    },{

					    }
				    ],
				    series: [
				        {
				            name: '实际生成的(不包括昨日延时,或者未打完的)',
				            type: 'bar',
				            data: [
				            18203, 23489, 29034, 104970, 131744, 630230,
				            18203, 23489, 29034, 104970, 131744, 630230,
				            18203, 23489, 29034, 104970, 131744, 630230,
				            18203, 23489, 29034, 104970, 131744, 630230, 
				            18203, 23489, 29034, 104970, 131744, 630230,
				            ]
				        },
				        {
				            name: '实际打完的',
				            type: 'bar',
				            data: [
				            19325, 23438, 31000, 121594, 134141, 681807,
				            19325, 23438, 31000, 121594, 134141, 681807,
				            19325, 23438, 31000, 121594, 134141, 681807, 
				            19325, 23438, 31000, 121594, 134141, 681807,
				            19325, 23438, 31000, 121594, 134141, 681807,
				            ]
				        }
				    ]
				};

				_myChart.setOption(option)
			},


			_recentYears() {
				let today = new Date();//获得当前日期
    			let year = today.getFullYear();//获得年份
    			let month = today.getMonth() +1;//获得年份
				
				//获取当前最近三年
				class Point {
				  constructor(value, label) {
				    this.value = value;
				    this.label = label;
				  }
				}

				const p1 = new Point(year,year)
				const p2 = new Point(year-1,year-1)
				const p3 = new Point(year-2,year-2)
				let arr = [];
				arr.push(p1)
				arr.push(p2)
				arr.push(p3)

				this.recentYears = arr

				//获取当前年、月的电话实际生成和呼出量




			},

			// searchTime() {
			// 	// if(this.selectYear == '') {
			// 	// 	alert('请选择年份')
			// 	// }
			// 	//  if(this.selectMonth == '') {
			// 	// 	alert('请选择月份')
			// 	// }
			// 	//if(this.selectYear != '' && this.selectMonth != ''){
			//       	axios.get('http://localhost:8888/static/phoneCount/phoneCount.json', {
			//       		year: '2017',
			//       		month: '10'
			//       	})
			//       	.then(function(response) {
			//       		const data = eval('(' + response.data +  ')');
			//       		console.log(data.detailTime)
			//       		let _myChart = echarts.init(document.getElementById('myChart'));
			// 			let option = {
			// 			    title: {
			// 			        text: '随访系统呼叫任务完成情况(日)',
			// 			        x: 'center',
			// 			        subtext: '数据来自虚拟医生',

			// 			    },
			// 			    backgroundColor: '#e7e7e7',
						    
			// 			    tooltip: {
			// 			        trigger: 'axis',
			// 			        axisPointer: {
			// 			            type: 'shadow'
			// 			        }
			// 			    },
			// 			    legend: {
			// 			        data: ['实际打完的', '实际生成的(不包括昨日延时,或者未打完的)'],
			// 			        align: 'left',
			// 			        x: 'right',
			// 			        y: '25px'
			// 			    },
			// 			    grid: {
			// 			        left: '3%',
			// 			        right: '4%',


			// 			        bottom: '3%',
			// 			        containLabel: true
			// 			    },
			// 			    yAxis: [
			// 				    {
			// 				        type: 'value',
			// 				        boundaryGap: [0, 0.01]
			// 				    }
			// 			    ],
			// 			    xAxis: [
			// 				    {
			// 				        type: 'category',
			// 				        data: data.detailTime,
			// 				        axisLabel: {
			// 				            interval: 0,
			// 				            rotate: 30
			// 				        },
			// 				    },{

			// 				    }
			// 			    ],
			// 			    series: [
			// 			        {
			// 			            name: '实际生成的(不包括昨日延时,或者未打完的)',
			// 			            type: 'bar',
			// 			            data: data.factCounts
			// 			        },
			// 			        {
			// 			            name: '实际打完的',
			// 			            type: 'bar',
			// 			            data: data.factCall
			// 			        }
			// 			    ]
			// 			};

			// 			_myChart.setOption(option)
			//       	})
			//       	.catch(function(error) {
			//       		console.log(error)
			//       	})
			// 	//}

			// },
			handlechangeyear(value) {
				this.selectYear = value
			},
			handlechangemonth(value) {
				this.selectMonth = value
			}

		}
	}
</script>

<style lang="less">
.ml20 {
	margin-left: 20px;
}
.searchCondition {
	background: #fff;
	.ivu-col {
		height: 60px;
    	line-height: 60px;
	}
}
	
</style>
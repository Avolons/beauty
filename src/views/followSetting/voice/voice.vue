<template>
	<Row class="voice">
		<Col span="24" class="sfproblem">
			<Row class="pad20 fontvoice">
				<Col span="4"> <span>随访问题:</span></Col>
				<Col span="20"><span>高血压并发症</span></Col>
			</Row>
		</Col>
		<Col span="24" class="sfzhibaio">
			<Row class="pad20 fontvoice">
				<Col span="4"> <span>采集指标:</span></Col>
				<Col span="20"><span>高压，低压，空腹吃饭没有</span></Col>
			</Row>
		</Col>
		<Col span="24">
			<Row class="pad20 fontvoice">
				<Col span="4"> <span>AI语音:</span></Col>
				<Col span="20">
					<Upload action="//jsonplaceholder.typicode.com/posts/">
		        <Button type="ghost" icon="ios-cloud-upload-outline">上传AI语音</Button>
			    </Upload>
				</Col>
			</Row>
		</Col>
		<Col span="24" class="voicepz">
			<span class="fontvoice voicetitle">话术配置</span>
			<Timeline ref="Timeline">
	        <TimelineItem color="green">
	        	<Row>
	        		<Col span="24">
	        			<span>无匹配</span>
	        		</Col>
	        		<Col span="24">
						    <Row class="pad10 fontvoice">
									<Col span="4"> <span>AI语音:</span></Col>
									<Col span="20">
										<Upload action="//jsonplaceholder.typicode.com/posts/">
							        <Button type="ghost" icon="ios-cloud-upload-outline">上传AI语音</Button>
								    </Upload>
									</Col>
								</Row>
	        		</Col>
	        		<Col span="24">
						    <Row class="pad10 fontvoice">
									<Col span="4"> <span>超时跳转:</span></Col>
									<Col span="20">
										<Upload action="//jsonplaceholder.typicode.com/posts/">
							        <Button type="ghost" icon="ios-cloud-upload-outline">上传AI语音</Button>
								    </Upload>
									</Col>
								</Row>
	        		</Col>
	        	</Row>
	        </TimelineItem> 
	        <TimelineItem color="green">
	        	<Row>
	        		<Col span="24">
	        			<span>无声音</span>
	        		</Col>
	        		<Col span="24">
						    <Row class="pad10 fontvoice">
									<Col span="4"> <span>AI语音:</span></Col>
									<Col span="20">
										<Upload action="//jsonplaceholder.typicode.com/posts/">
							        <Button type="ghost" icon="ios-cloud-upload-outline">上传AI语音</Button>
								    </Upload>
									</Col>
								</Row>
	        		</Col>
	        	</Row>
	        </TimelineItem> <TimelineItem color="green">
	        	<Row>
	        		<Col span="24">
	        			<span>通用处理</span>
	        		</Col>
	        		<Col span="24">
						    <Row class="pad10 fontvoice">
									<Col span="4"> <span>AI语音:</span></Col>
									<Col span="20">
										<Upload action="//jsonplaceholder.typicode.com/posts/">
							        <Button type="ghost" icon="ios-cloud-upload-outline">上传AI语音</Button>
								    </Upload>
									</Col>
								</Row>
	        		</Col>
	        	</Row>
	        </TimelineItem>
	        </TimelineItem> <TimelineItem color="green">
	        	<Row>
	        		<Col span="24">
	        			<span>Switch1</span>
	        		</Col>
	        		
	        		<Col span="24" class="sfproblem">
								<Row class="pad20 fontvoice">
									<Col span="4"> <span>名称:</span></Col>
									<Col span="20"><Input v-model="value" placeholder="Enter something..." style="width: 300px"></Input></Col>
								</Row>
							</Col>
							<Col span="24" class="sfproblem">
								<Row class="pad20 fontvoice">
									<Col span="4"> <span>判别规则:</span></Col>
									<Col span="20"><Input v-model="value" placeholder="Enter something..." style="width: 300px"></Input></Col>
								</Row>
							</Col>
							<Col span="24">
						    <Row class="pad10 fontvoice">
									<Col span="4"> <span>AI语音:</span></Col>
									<Col span="20">
										<Upload action="//jsonplaceholder.typicode.com/posts/">
							        <Button type="ghost" icon="ios-cloud-upload-outline">上传AI语音</Button>
								    </Upload>
									</Col>
								</Row>
	        		</Col>
	        		<Col span="24">
						    <Row class="pad10 fontvoice">
									<Col span="4"> <span>超时语音:</span></Col>
									<Col span="20">
										<Upload action="//jsonplaceholder.typicode.com/posts/">
							        <Button type="ghost" icon="ios-cloud-upload-outline">上传AI语音</Button>
								    </Upload>
									</Col>
								</Row>
	        		</Col>
	        		<Col span="24" class="sfproblem">
								<Row class="pad20 fontvoice">
									<Col span="4"> <span>超时跳转:</span></Col>
									<Col span="20"><Input v-model="value" placeholder="Enter something..." style="width: 300px"></Input></Col>
								</Row>
							</Col>
							<Col span="24" class="sfproblem">
								<Row class="pad20 fontvoice">
									<Col span="4"> <span>采集指标:</span></Col>
									<Col span="20"><Input v-model="value" placeholder="Enter something..." style="width: 300px"></Input></Col>
								</Row>
							</Col>
	        	</Row>
	        </TimelineItem>
	        
	        
	    </Timeline>
		</Col>
		<Col span="24">
			<Button type="primary" style="margin: 10px 20px;" @click="addVoice()">添加话述</Button><Button  style="margin: 10px 20px;" type="primary" @click="handleSubmit()">保存</Button>
		</Col>
		
		
	</Row>
</template>

<script>
	export default {
		data() {
			return {
				cfRadio: 'yes',
				AIpro: '',
				value: ''
			}
		},
		methods: {
			addVoice() {
				alert('添加')
			},
			handleSubmit() {
				alert('保存')
			},

		}
}
</script>

<style lang="less">
@import "../../../styles/common.less";
.fontvoice {
	font-size: 16px;
	border-bottom: 1px solid #f6f6f6;
}
	.voice {
		width: 900px;
		background: #fff;
		.sfproblem {

		}
		.voicepz {
			.voicetitle {
				margin: 20px 10px;
			}
		}
	}
</style>
<template>
	<Row>
		<Col span="24" class="sfproblem">
			<p>随访问题: <span>高血压并发症</span></p>
		</Col>
		<Col span="24" class="sfzhibaio">
			<p>采集指标: <span>高压，低压，空腹吃饭没有</span></p>
		</Col>
		<Col span="24">
			<div class="cfvoice">
				<span>纯放音:</span>
				<RadioGroup v-model="cfRadio">
	        <Radio label="yes">是</Radio>
	        <Radio label="no">否</Radio>
	    </RadioGroup>
			</div>
		</Col>
		<Col span="24">
			<span>AI问题:</span>
			<Input v-model="AIpro" placeholder="AI问题" style="width: 300px"></Input>
		</Col>
		<Col span="24">
			<Timeline ref="Timeline">
	        <TimelineItem color="green">
	        	<Row>
	        		<Col span="24">
	        			<span>AI问题:</span>
								<Input v-model="AIpro" placeholder="AI问题" style="width: 300px"></Input>
	        		</Col>
	        		<Col span="24">
	        			<span>AI问题:</span>
								<Input v-model="AIpro" placeholder="AI问题" style="width: 300px"></Input>
	        		</Col>
	        		<Col span="24">
	        			<span>AI问题:</span>
								<Input v-model="AIpro" placeholder="AI问题" style="width: 300px"></Input>
	        		</Col>
	        		<Col span="24">
	        			<span>AI问题:</span>
								<Input v-model="AIpro" placeholder="AI问题" style="width: 300px"></Input>
	        		</Col>
	        	</Row>
	        </TimelineItem>
	        <TimelineItem color="green">
	        	<Row>
	        		<Col span="24">
	        			<span>AI问题:</span>
								<Input v-model="AIpro" placeholder="AI问题" style="width: 300px"></Input>
	        		</Col>
	        	</Row>
	        </TimelineItem>
	        <TimelineItem color="red">严重故障</TimelineItem>
	        <TimelineItem color="blue">发布3.0版本</TimelineItem>
	    </Timeline>
		</Col>
		<Col span="24">
			<Button type="primary" @click="addVoice()">添加话述</Button>
		</Col>
		<Col span="24">
			<Button type="primary" @click="handleSubmit()">保存</Button>
		</Col>
		
	</Row>
</template>

<script>
	export default {
		data() {
			return {
				cfRadio: 'yes',
				AIpro: '',
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
	
</style>
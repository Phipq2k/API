<template>
	<div class="tip-wrap">
		<div class="tip">
				<p>{{info}}</p>
		</div>
	</div>
</template>

<script>
export default {
	data () {
		return {

		}
	},
	props: {
		info: {
			type: String,
			default: 'test'
		}
	}
}
</script>

<style lang="scss" scoped>
.tip-wrap {
	border-radius: 8px;
	z-index: 9999;
	width: 120px;
	height: 80px;
	background-color: black;
	opacity: .75;
	position: fixed;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	margin: auto;

	.tip {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100%;

		p {
			font-size: 20px;
			display: inline;
			color: white;
		}
	}
}
</style>
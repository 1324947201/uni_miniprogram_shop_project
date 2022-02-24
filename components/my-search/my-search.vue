<template>
	<view>
		<view class="my-search-container" :style="{ 'background-color': bgColor }" @click="clickHandler">
			<view class="my-search-box" :style="{ 'border-radius': radios + 'px' }">
				<uni-icons type="search" size="18"></uni-icons>
				<text class="placeholder">搜索</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "my-search",
		data() {
			return {

			};
		},
		props:{
			//背景颜色
			bgColor:{
				type:String,
				default:'#000000'
			},
			//圆角尺寸
			radios:{
				type:Number,
				default:18
			}
		},
		methods:{
			clickHandler(){
				this.$emit('click')
			}
		}
	}
</script>

<style lang="scss">
	.my-search-container {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 56px;


		.my-search-box {
			height: 36px;
			width: 710rpx;
			line-height: 36px;
			text-align: center;
			background-color: #fff;

			.placeholder {
				font-size: 16px;
			}
		}
	}
</style>

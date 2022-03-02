<template>
	<view>
		<view class="settle-container">
			<!-- 合计价格 -->
			<view class="total-price">
				合计:<text class="price-text"> ¥{{checkedPrice | tofixed}}</text>
			</view>
			<!-- 结算 -->
			<view class="settle">
				结算 ({{checkedCuont}})
			</view>
		</view>
	</view>
</template>

<script>
	import {mapGetters} from 'vuex'
	export default {
		name: "my-settle",
		data() {
			return {

			};
		},
		computed:{
			...mapGetters('store_cart',['checkedCuont','checkedPrice']),
		},
		filters: {
			tofixed(num) {
				return Number(num).toFixed(2)
			}
		}
	}
</script>

<style lang="scss">
	.settle-container {
		display: flex;
		justify-content: space-between;
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 50px;
		background-color: #fff;
		box-shadow: 0 0 0 #ccc, 0 0 8px #e3e5e7, 0 0 0 #ccc, 0 0 0 #ccc;

		.total-price {
			padding-left: 10px;
			line-height: 50px;

			.price-text {
				margin-left: 5px;
				color: #c00000;
				font-size: 18px;
				font-weight: 700;
			}
		}

		.settle {
			width: 130px;
			height: 100%;
			background-color: var(--main-color-light);
			text-align: center;
			line-height: 50px;
			color: #FFFFFF;
		}
	}
</style>

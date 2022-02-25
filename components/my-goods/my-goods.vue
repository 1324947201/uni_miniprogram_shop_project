<template>
	<view>
		<view class="goods-item">
			<!-- 左侧商品预览图 -->
			<view class="goods-item-left">
				<image :src="goods.goods_small_logo || defaultPic" class="gooods-pic"></image>
			</view>
			<!-- 右侧商品信息 -->
			<view class="goods-item-right">
				<view class="goods-name">{{goods.goods_name}}</view>
				<view class="goods-info">
					<view class="goods-price">￥{{goods.goods_price | tofixed}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "my-goods",
		props: {
			goods: {
				type: Object,
				default: {}
			}
		},
		data() {
			return {
				defaultPic: '../../static/no-data.jpg',
			};
		},
		filters: {
			tofixed(num) {
				return Number(num).toFixed(2)
			}
		}
	}
</script>

<style lang="scss">
	.goods-item {
		display: flex;
		padding: 10px 8px;
		margin-top: 5px;
		border-radius: 8px;
		background-color: #FFFFFF;

		.goods-item-left {
			margin-right: 8px;

			.gooods-pic {
				display: block;
				width: 100px;
				height: 100px;
				border: 1px solid #f0f0f0;
				border-radius: 5px;
			}
		}

		.goods-item-right {
			display: flex;
			flex-direction: column;
			justify-content: space-between;

			.goods-name {
				font-size: 14px;
			}

			.goods-price {
				color: #c00000;
				font-size: 18px;
				font-weight: 700;
			}
		}
	}
</style>

<template>
	<view>
		<view class="goods-item">
			<view class="goods-item-left">
				<!-- 复选框 -->
				<radio :checked="goods.goods_state" color="#92006f" v-if="showRadio" @click.stop="radioClickHandler">
				</radio>
				<!-- 左侧商品预览图 -->
				<image :src="goods.goods_small_logo || defaultPic" class="gooods-pic" @click="gotoDetail"></image>
			</view>
			<!-- 右侧商品信息 -->
			<view class="goods-item-right">
				<view class="goods-name" @click="gotoDetail">{{goods.goods_name}}</view>
				<view class="goods-info">
					<view class="goods-price">¥{{goods.goods_price | tofixed}}</view>
					<uni-number-box :min="1" :max="99" :value="goods.goods_count" v-if="showCount"
						@change="countClickHandler"></uni-number-box>
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
			},
			//控制是否展示多选框
			showRadio: {
				type: Boolean,
				default: false
			},
			//控制是否展示数量
			showCount: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				defaultPic: '../../static/no-data.jpg',
			};
		},
		methods: {
			//radio的点击事件处理函数
			radioClickHandler() {
				this.$emit('radioChange', {
					goods_id: this.goods.goods_id,
					goods_state: !this.goods.goods_state
				})
			},
			//数量改变的事件处理函数
			countClickHandler(val) {
				this.$emit('countChange', {
					goods_id: this.goods.goods_id,
					goods_count: +val,
				})
			},
			//导航到详情界面
			gotoDetail() {
				uni.navigateTo({
					url: "/subpackage/goods_detail/goods_detail?goods_id=" + this.goods.goods_id
				})
			}
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
			display: flex;
			justify-content: space-between;
			align-items: center;
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
			flex: 1;

			.goods-name {
				height: 76px;
				font-size: 14px;
			}

			.goods-info {
				display: flex;
				justify-content: space-between;
				align-items: center;

				.goods-price {
					color: #c00000;
					font-size: 18px;
					font-weight: 700;
				}
			}
		}
	}
</style>

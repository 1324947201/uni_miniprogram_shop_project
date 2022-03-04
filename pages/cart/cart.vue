<template>
	<view v-if="total!==0">
		<!-- 收货地址区域 -->
		<my-address></my-address>
		<!-- 购物车列表标题区 -->
		<view class="sticky">
			<image src="/static/cart_border@2x.png" class="address-border"></image>
			<view class="cart-title">
				<view class="title-left">
					<uni-icons type="cart" size="26"></uni-icons>
					<text>购物车</text>
				</view>
				<label class="title-right" @click="changeCheckAll">
					<view>全选</view>
					<radio :checked="isCkeckAll" color="#92006f" />
				</label>
			</view>
		</view>
		<view class="cart-list">
			<!-- 滑动删除组件 -->
			<uni-swipe-action>
				<!-- 循环渲染购物车信息 -->
				<view class="cart-item-bg" v-for="(goods, i) in cart" :key="i">
					<uni-swipe-action-item :right-options="options" @click="swipeItemClickHandler(goods)">
						<my-goods :goods="goods" :showRadio="true" :showCount="true" @radioChange="radioChangeHandler"
							@countChange="countChangeHandler"></my-goods>
					</uni-swipe-action-item>
				</view>
			</uni-swipe-action>
		</view>
		<!-- 结算组件 -->
		<my-settle></my-settle>
	</view>
	<!-- 空购物车展示 -->
	<view class="empty-cart" v-else>
		<image class="empty-cart-image" src="../../static/empty-cart.png"></image>
		<text class="tip-text">购物车空空如也</text>
	</view>
</template>

<script>
	import badgeMix from '@/mixins/tabBar-badge.js'
	import {
		mapState,
		mapMutations,
		mapGetters
	} from 'vuex'

	export default {
		mixins: [badgeMix],
		data() {
			return {
				//滑动删除右侧配置项
				options: [{
					text: '删除',
					style: {
						backgroundColor: '#c00000'
					}
				}],
			};
		},
		methods: {
			...mapMutations('store_cart', ['updataGoodsState', 'updataAllGoodsState', 'updataGoodsCount',
				'removeGoodsById'
			]),
			//自定义事件radioChange的响应函数
			radioChangeHandler(e) {
				this.updataGoodsState(e)
			},
			//自定义事件countChange的响应函数
			countChangeHandler(e) {
				this.updataGoodsCount(e)
			},
			//修改全选状态，并修改vuex中的状态
			changeCheckAll() {
				this.checkAll = !this.checkAll
				this.updataAllGoodsState(this.checkAll)
			},
			//删除按钮点击处理函数
			swipeItemClickHandler(goods) {
				this.removeGoodsById([goods.goods_id])
			},
		},
		computed: {
			...mapState('store_cart', ['cart']),
			...mapGetters('store_cart', ['total', 'isCkeckAll'])
		},
	}
</script>

<style lang="scss">
	page {
		background-color: var(--gray);
	}

	.sticky {
		position: sticky;
		top: 0;
		padding-top: 1px;
		box-shadow: 0 0 8px #d2d2d2;
		background-color: #fff;
		z-index: 999;
	}

	.address-border {
		display: block;
		width: 100%;
		height: 5px;
	}

	.cart-list {
		margin-bottom: 52.5px;
	}

	.cart-item-bg {
		padding: 2.5px 0;
	}

	.goods-item {
		margin: 0 5px !important;
	}

	.cart-title {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 2.5px;
		padding: 0 5px;
		height: 40px;
		font-size: 16px;
		border-bottom: 1px solid #efefef;
		background-color: #fff;

		.title-left {
			display: flex;
			align-items: center;
		}

		.title-right {
			display: flex;
			align-items: center;

			view {
				margin-right: 3px;
				padding-top: 4px;
			}
		}
	}
	
	.button-group--right,
	.uni-swipe_button {
		border-radius: 8px;
	}

	.empty-cart {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		margin-top: 300rpx;
		
		.empty-cart-image {
			width: 100px;
			height: 100px;
		}
		
		.tip-text{
			color: #8d8f90;
			margin-top: 5px;
		}
	}
</style>

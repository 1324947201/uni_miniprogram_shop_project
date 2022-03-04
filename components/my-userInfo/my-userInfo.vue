<template>
	<view class="user-info-container">
		<!-- 头像昵称区域 -->
		<view class="top-box">
			<image class="avatar" :src="userInfo.avatarUrl"></image>
			<view class="nickname">{{userInfo.nickName}}</view>
		</view>
		<!-- 内容面板区 -->
		<view class="panel-list">
			<view class="panel">
				<view class="panel-body">
					<view class="panel-item">
						<text>14</text>
						<text>收藏</text>
					</view>
					<view class="panel-item" @click="gotoCart">
						<text>{{total}}</text>
						<text>购物车</text>
					</view>
					<view class="panel-item">
						<text>84</text>
						<text>足迹</text>
					</view>
				</view>
			</view>

			<view class="panel">
				<view class="panel-title">我的订单</view>
				<view class="panel-body">
					<view class="panel-item">
						<image class="icon" src="/static/my-icons/1.png"></image>
						<text>代发货</text>
					</view>
					<view class="panel-item">
						<image class="icon" src="/static/my-icons/2.png"></image>
						<text>待付款</text>
					</view>
					<view class="panel-item">
						<image class="icon" src="/static/my-icons/3.png"></image>
						<text>退货</text>
					</view>
					<view class="panel-item">
						<image class="icon" src="/static/my-icons/4.png"></image>
						<text>待评价</text>
					</view>
				</view>
			</view>

			<view class="panel">
				<view class="panel-list-item">
					<text>收货地址</text>
					<uni-icons type="arrowright" size="15"></uni-icons>
				</view>
				<view class="panel-list-item">
					<text>联系客服</text>
					<uni-icons type="arrowright" size="15"></uni-icons>
				</view>
				<view class="panel-list-item" @click="logout">
					<text>退出登录</text>
					<uni-icons type="arrowright" size="15"></uni-icons>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapGetters,
		mapMutations,
	} from 'vuex'
	export default {
		name: "my-userInfo",
		data() {
			return {

			};
		},
		methods: {
			...mapMutations('store_user', ['updataAddress', 'updataUserInfo', 'updataToken']),
			...mapMutations('store_cart', ['removeAllGoods']),
			//跳转至购物车
			gotoCart() {
				uni.switchTab({
					url: "/pages/cart/cart"
				})
			},
			//登出
			async logout() {
				const [err, succ] = await uni.showModal({
					title: '退出登录',
					content: '确认退出当前账号'
				}).catch(err => err)
				console.log(succ)
				if (succ && succ.confirm) {
					this.updataAddress({})
					this.updataUserInfo({})
					this.updataToken('')
					this.removeAllGoods()
				}
			}
		},
		computed: {
			...mapState('store_user', ['userInfo']),
			...mapGetters('store_cart', ['total']),
		},
	}
</script>

<style lang="scss">
	.user-info-container {
		height: 100%;
		background-color: var(--gray);

		.top-box {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			height: 450rpx;
			background-color: var(--main-color);

			.avatar {
				width: 90px;
				height: 90px;
				border-radius: 45px;
				border: 2px solid #fff;
			}

			.nickname {
				font-size: 20px;
				color: #fff;
				font-weight: 400;
				margin-top: 10px;
			}
		}

		.panel-list {
			position: relative;
			top: -10px;
			margin: 0 10px;

			.panel {
				background-color: #fff;
				border-radius: 3px;
				margin-bottom: 8px;

				.panel-title {
					line-height: 45px;
					padding-left: 16px;
					font-size: 16px;
					border-bottom: 1px solid var(--gray);
				}

				.panel-body {
					display: flex;
					justify-content: space-around;

					.panel-item {
						display: flex;
						flex-direction: column;
						align-items: center;
						justify-content: space-around;
						padding: 10px 0;
						font-size: 14px;

						.icon {
							width: 35px;
							height: 35px;

						}
					}
				}

				.panel-list-item {
					display: flex;
					justify-content: space-between;
					align-items: center;
					padding: 0 16px;
					line-height: 45px;
					border-bottom: 1px solid var(--gray);
				}
			}
		}
	}
</style>

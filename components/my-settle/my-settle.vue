<template>
	<view>
		<view class="settle-container">
			<!-- 合计价格 -->
			<view class="total-price">
				合计:<text class="price-text"> ¥{{checkedPrice | tofixed}}</text>
			</view>
			<!-- 结算 -->
			<view class="settle" @click="settlement">结算 ({{checkedCuont}})</view>
		</view>
	</view>
</template>

<script>
	import {
		mapGetters,
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		name: "my-settle",
		data() {
			return {
				//倒计时秒数
				seconds: 3,
				timer: null,
				//由于种种原因，这里的订单编号与订单支付参数对象用假数据代替
				order_number: 'GD20180507000000000110',
				pay: {
					"timeStamp": "1525681145",
					"nonceStr": "BkPggorBXZwPGXe3",
					"package": "prepay_id=wx071619042918087bb4c1d3d72999385683",
					"signType": "MD5",
					"paySign": "D1642DEEF1663C8012EDEB9297E1D516"
				},
			}
		},
		methods: {
			...mapMutations('store_user', ['updataRedirectInfo']),
			//用户点击结算按钮后
			settlement() {
				//判断用户是否勾选了商品
				if (!this.checkedCuont) return uni.$showMsg('请勾选要结算的商品')
				//判断是否选择收货地址
				if (!this.addstr) return uni.$showMsg('请选择收货地址')
				//判断用户是否登陆
				if (!this.token) return this.delayNavigate()
				//调用创建订单函数
				this.payOrder()
			},
			//登陆倒计时提示消息
			showTips(n) {
				uni.showToast({
					icon: 'none',
					title: `您未登录，` + n + '秒后自动跳转至登陆页',
					mask: true,
					duration: 1500
				})
			},
			//延时导航到登陆页面
			delayNavigate() {
				this.showTips(this.seconds)
				this.timer = setInterval(() => {
					this.seconds--
					//当秒数小于0时，跳转到my界面进行登录
					if (this.seconds <= 0) {
						clearInterval(this.timer)
						this.seconds = 3
						uni.switchTab({
							url: '/pages/my/my',
							success: () => {
								this.updataRedirectInfo({
									openType: 'switchTab',
									from: '/pages/cart/cart'
								})
							}
						})
						return
					}
					this.showTips(this.seconds)
				}, 1000)
			},
			//创建订单函数
			async payOrder() {
				//创建订单
				//1.组织订单对象
				const orderInfo = {
					// order_price: this.checkedPrice,
					//这里是可以获取到订单的真实价格的，但是在开发中不建议使用真实价格，建议使用0.01代替
					order_price: 0.01,
					consignee_addr: this.addstr,
					goods: this.cart.filter(item => item.goods_state).map(item => ({
						goods_id: item.goods_id,
						goods_number: item.goods_count,
						goods_price: item.goods_price
					}))
				}

				//2.发起请求创建订单
				const {
					data: res
				} = await uni.$http.post('/api/public/v1/my/orders/create', orderInfo)
				if (res.meta.status !== 200 && res.meta.status !== 401) return uni.$showMsg('创建订单失败 #101')

				//3.得到服务器返回的订单编号
				const orderNumber = this.order_number

				//4.发起请求获取订单的支付信息
				const {
					data: res2
				} = await uni.$http.post('/api/public/v1/my/orders/req_unifiedorder', {
					order_number: orderNumber
				})
				if (res2.meta.status !== 200 && res.meta.status !== 401) return uni.$showMsg('创建订单失败 #102')

				//5.调用微信API发起支付
				const [err, succ] = await uni.requestPayment(this.pay)
				if (err && err.errMsg !== 'requestPayment:fail no permission') return uni.$showMsg('订单未支付 #103')

				uni.showModal({
					title: '假装是支付弹窗',
					content: '点击确认模拟支付成功，取消模拟支付失败',
					success(res) {
						if (res.confirm) {
							uni.showToast({
								title: '订单支付完成',
								icon: 'success'
							})
						} else if (res.cancel) {
							uni.$showMsg('您已取消支付')
						}
					}
				})
			}
		},
		computed: {
			...mapGetters('store_cart', ['total', 'checkedCuont', 'checkedPrice']),
			...mapGetters('store_user', ['addstr']),
			...mapState('store_user', ['token']),
			...mapState('store_cart', ['cart'])
		},
		filters: {
			tofixed(num) {
				return Number(num).toFixed(2)
			}
		},
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
		box-shadow: 0 0 8px #d2d2d2;

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

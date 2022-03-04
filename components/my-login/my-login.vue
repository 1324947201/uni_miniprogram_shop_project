<template>
	<view class="login-container">
		<uni-icons type="contact-filled" size="100" color="#8f8f8f"></uni-icons>
		<button type="default" class="btn-login" @click="getUserInfo">一键登录</button>
		<text class="tip-text">登录后即可享受完整功能</text>
	</view>
</template>

<script>
	import {
		mapMutations,
		mapState
	} from 'vuex'
	export default {
		name: "my-login",
		data() {
			return {
				fakeToken: 'eyJhb6ci0iJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcmShbMUiOiJhZG1pbiIsInBhc3NGb3JkIjoiIiwibmlja25hbwUi0iLms6Xlt7Tlt7QiLCJ1bWFpbCI6ImSpYmFiYUBpdGNhc3QuY24iLCJ1c2VyX3BpYyI6IiIsImlhdCI6MTU3ODAZNjY4MiwiZxhwIjoxNTc4MDcyNjgyfQ.Mwq76qCxJPK-EA8LNrtMG041lKdz33S9KBL3XeuBxuI'
			};
		},
		methods: {
			...mapMutations('store_user', ['updataUserInfo', 'updataToken', 'updataRedirectInfo']),
			//获取用户信息权限
			async getUserInfo() {
				const [err, res] = await uni.getUserProfile({
					desc: '用于下单支付等'
				}).catch(err => err)
				if (err && err.errMsg === 'getUserProfile:fail auth deny') return uni.$showMsg('您已取消授权')
				else if (err || res.errMsg !== 'getUserProfile:ok') return uni.$showMsg('登陆失败 #101')
				this.updataUserInfo(res.userInfo)
				this.getToken(res)
			},
			//获取用户token
			async getToken(info) {
				//获取code值
				const [err, res] = await uni.login().catch(err => err)
				if (err || res.errMsg !== 'login:ok') return uni.$showMsg('登陆失败 #102')
				const query = {
					code: res.code,
					encryptedData: info.encryptedData,
					iv: info.iv,
					rawData: info.rawData,
					signature: info.signature
				}
				const {
					data: loginRes
				} = await uni.$http.post('/api/public/v1/users/wxlogin', query)
				if (loginRes.meta.status !== 200 && loginRes.meta.status !== 400) return uni.$showMsg('登陆失败 #103')
				uni.$showMsg('登陆成功')
				//直接把token保存到vuex中，由于种种原因，这里的token用data中的假数据代替
				this.updataToken(this.fakeToken)
				this.navigateBack()
			},
			navigateBack() {
				if (this.redirectInfo && this.redirectInfo.openType === 'switchTab') {
					uni.switchTab({
						url: this.redirectInfo.from,
						complete: () => {
							this.updataRedirectInfo(null)
						}
					})
				}
			}
		},
		computed: {
			...mapState('store_user', ['redirectInfo']),
		}
	}
</script>

<style lang="scss">
	.login-container {
		display: flex;
		position: relative;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		height: 750rpx;
		background-color: #f8f8fa;
		overflow: hidden;

		.btn-login {
			width: 80%;
			border-radius: 100px;
			margin: 10px 0;
			background-color: var(--main-color);
			color: #fff;
		}

		.tip-text {
			font-size: 12px;
			color: #8f8f8f;
		}
	}

	.login-container::after {
		position: absolute;
		bottom: 0;
		left: 0;
		transform: translateY(50%);
		content: ' ';
		display: block;
		width: 100%;
		height: 40px;
		background-color: #fff;
		border-radius: 50%;

	}
</style>

<template>
	<view>
		<view class="address-choose-box">
			<button size="mini" class="address-choose-button" v-if="JSON.stringify(address) === '{}'"
				@click="chooseAddress">请选择收货地址</button>
			<!-- 收货地址详情区域 -->
			<view class="address-info" v-else @click="chooseAddress">
				<view class="first-row">
					<view class="first-row-left">
						<text class="username">收货人:</text>
						<text>{{address.userName}}</text>
					</view>
					<view class="first-row-right">
						<text class="phone">电话:</text>
						<text>{{address.telNumber}}</text>
						<uni-icons type="arrowright" size="16"></uni-icons>
					</view>
				</view>
				<view class="second-row">
					<text class="second-row-left">收货地址：</text>
					<text class="second-row-right">{{addstr}}</text>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	import {
		mapState,
		mapMutations,
		mapGetters
	} from 'vuex'
	export default {
		name: "my-address",
		data() {
			return {};
		},
		methods: {
			...mapMutations('store_user', ['updataAddress']),
			//选择收货地址
			async chooseAddress() {
				const [err, res] = await uni.chooseAddress().catch(err => err)
				if (err === null && res.errMsg === 'chooseAddress:ok') {
					this.updataAddress(res)
				}
			}
		},
		computed: {
			...mapState('store_user', ['address']),
			...mapGetters('store_user', ['addstr'])
		}
	}
</script>

<style lang="scss">
	.address-choose-box {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 60px;

		.address-choose-button {
			background-color: var(--main-color);
			color: #fff;
		}

		.address-info {
			box-sizing: border-box;
			display: flex;
			flex-direction: column;
			justify-content: center;
			width: 100%;
			height: 60px;
			padding: 0 10px;
			font-size: 12px;
			background-color: #fff;

			.first-row {
				display: flex;
				justify-content: space-between;
				margin-bottom: 5px;

				.first-row-left {
					.username {
						margin-right: 5px;
						color: #9f9f9f;
					}
				}

				.first-row-right {
					display: flex;
					justify-content: space-between;
					align-items: center;

					.phone {
						margin-right: 5px;
						color: #9f9f9f;
					}
				}
			}

			.second-row {
				display: flex;

				.second-row-left {
					margin-right: 5px;
					color: #9f9f9f;
					white-space: nowrap;
				}

				.second-row-right {
					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
				}
			}
		}
	}
</style>

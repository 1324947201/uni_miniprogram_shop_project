<template>
	<view class="backGround" v-if="goods_info.goods_name">
		<!-- 轮播图区域 -->
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
			<swiper-item v-for="(item, i) in goods_info.pics" :key="item.pics_id">
				<image :src="item.pics_big" @click="preview(i)"></image>
			</swiper-item>
		</swiper>
		<!-- 商品信息区 -->
		<view class="goods-info-container">
			<!-- 商品价格 -->
			<view class="goods-prcie">¥{{goods_info.goods_price}}</view>
			<!-- 商品信息主体 -->
			<view class="goods-info_body">
				<!-- 名称 -->
				<view class="goods-name">{{goods_info.goods_name}}</view>
				<!-- 收藏 -->
				<view class="favi">
					<uni-icons type="star" size="26" color="gary"></uni-icons>
					<text>收藏</text>
				</view>
			</view>
			<!-- 运费 -->
			<view class="goods-freight">快递: 免运费</view>
		</view>
		<!-- 图文数据区域 -->
		<rich-text :nodes="goods_info.goods_introduce"></rich-text>
		<!-- 商品操作 -->
		<view class="goods-nav">
			<uni-goods-nav :fill="true" :options="options" :buttonGroup="buttonGroup" @click="onClick"/>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				goods_info: {},
				options: [{
					icon: 'shop',
					text: '店铺',
				}, {
					icon: 'cart',
					text: '购物车',
					info: 2,
					infoBackgroundColor: '#c00000',
					infoColor: "#fff"
				}],
				buttonGroup: [{
						text: '加入购物车',
						backgroundColor: '#e1e3e5',
						color: '#000',
					},
					{
						text: '立即购买',
						backgroundColor: '#6c4ea7',
						color: '#fff'
					}
				]
			}
		},
		methods: {
			//获取商品详情信息
			async getGoodsDetail(id) {
				const {
					data: res
				} = await uni.$http.get('/api/public/v1/goods/detail?goods_id=' + id)
				if (res.meta.status !== 200) return uni.$showMsg()
				res.message.goods_introduce = res.message.goods_introduce.replace(/<img/g,
					"<img style='display: block;'").replace(/.webp/g, ".jpg")
				this.goods_info = res.message
			},
			//图片预览
			preview(i) {
				uni.previewImage({
					current: i,
					urls: this.goods_info.pics.map(x => x.pics_big)
				})
			},
			onClick(e){
				if(e.content.text === "购物车"){
					uni.switchTab({
						url:"/pages/cart/cart"
					})
				}
			}
		},
		onLoad(options) {
			this.getGoodsDetail(options.goods_id)
		}
	}
</script>

<style lang="scss">
	.backGround {
		background-color: #f6f7f8;
		padding-bottom: 50px;
	}

	swiper {
		height: 750rpx;

		image {
			width: 100%;
			height: 100%;
		}
	}

	.goods-info-container {
		margin: 10px;
		padding: 10px;
		padding-right: 0;
		background-color: #fff;
		border-radius: 8px;
		box-shadow: 0 0 8px #e3e5e7;

		.goods-prcie {
			margin: 5px;
			color: #c00000;
			font-size: 24px;
			font-weight: 700;
		}

		.goods-info_body {
			display: flex;
			justify-content: space-between;

			.goods-name {
				font-size: 14px;
				margin-right: 10px;
			}

			.favi {
				display: flex;
				flex-direction: column;
				align-items: center;
				width: 120px;
				height: 45px;
				font-size: 12px;
				color: #61666d;
				border-left: 1px solid #e3e5e7;
			}
		}

		.goods-freight {
			margin: 10px 0;
			font-size: 12px;
			color: gray;
		}
	}
	
	.goods-nav {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
	}
</style>

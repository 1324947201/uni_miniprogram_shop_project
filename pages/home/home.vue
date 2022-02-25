<template>
	<view>
		<view class="search-box">
			<my-search bgColor="#6c4ea7" @click="gotoSearch()"></my-search>
		</view>
		<!-- 轮播图区域 -->
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
			<swiper-item v-for="item in swiperList" :key="item.goods_id">
				<navigator class="swiper-item" :url="'/subpackage/goods_detail/goods_detail?goods_id=' + item.goods_id">
					<image :src="item.image_src"></image>
				</navigator>
			</swiper-item>
		</swiper>
		<!-- 分类导航区域 -->
		<view class="nav-list">
			<view class="nav-item" v-for="(item,i) in navList" :key='i' @click="navClickHandler(item)">
				<image class="nav-image" :src="item.image_src"></image>
			</view>
		</view>
		<!-- 楼层区 -->
		<view class="floor-list">
			<view class="floor-item" v-for="(item,i) in floorList" :key='i'>
				<image class="floor-title" :src="item.floor_title.image_src"></image>
				<!-- 楼层图片区 -->
				<view class="floor-image-box">
					<!-- 左侧大图片 -->
					<navigator class="left-image-box" :url="item.product_list[0].url">
						<image :src="item.product_list[0].image_src"
							:style="{width:item.product_list[0].image_width + 'rpx'}" mode="widthFix"></image>
					</navigator>
					<!-- 循环渲染右侧小图片 -->
					<view class="right-image-box">
						<navigator class="right-image-item" v-for="(item2,i2) in item.product_list" :key="i2"
							v-if="i2 !== 0" :url="item2.url">
							<image :src="item2.image_src" :style="{width:item2.image_width + 'rpx'}" mode="widthFix">
							</image>
						</navigator>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				swiperList: [],
				navList: [],
				floorList: []
			};
		},
		methods: {
			//获取轮播图数据
			async getSwiperList() {
				const {
					data: res
				} = await uni.$http.get('/api/public/v1/home/swiperdata')
				if (res.meta.status !== 200) return uni.$showMsg() //调用自定义方法
				this.swiperList = res.message
			},
			//获取导航栏数据
			async getNavList() {
				const {
					data: res
				} = await uni.$http.get('/api/public/v1/home/catitems')
				if (res.meta.status !== 200) return uni.$showMsg()
				this.navList = res.message
			},
			//导航栏点击跳转
			navClickHandler(item) {
				if (item.name === "分类") {
					uni.switchTab({
						url: '/pages/cate/cate'
					})
				}
			},
			//获取首页楼层数据
			async getFloorList() {
				const {
					data: res
				} = await uni.$http.get('/api/public/v1/home/floordata')
				if (res.meta.status !== 200) return uni.$showMsg()
				//对数据进行处理
				res.message.forEach(floor => {
					floor.product_list.forEach(value => {
						value.url = "/subpackage/goods_list/goods_list?" + value.navigator_url.split(
							'?')[1]
					})
				})
				this.floorList = res.message
			},
			//跳转到搜索页面
			gotoSearch() {
				uni.navigateTo({
					url: '/subpackage/search/search'
				})
			}
		},
		onLoad() {
			this.getSwiperList()
			this.getNavList()
			this.getFloorList()
		}
	}
</script>

<style lang="scss">
	swiper {
		height: 330rpx;

		.swiper-item,
		image {
			width: 100%;
			height: 100%;
		}
	}

	.nav-list {
		display: flex;
		justify-content: space-around;
		margin: 15px 0;

		.nav-image {
			width: 128rpx;
			height: 140rpx;
		}
	}

	.floor-title {
		width: 100%;
		height: 60rpx;
	}

	.floor-image-box {
		display: flex;
		padding: 0 8rpx;

		.left-image-box {
			margin: 0 5rpx;
		}

		.right-image-box {
			display: flex;
			flex-wrap: wrap;
			justify-content: space-around;
		}
	}

	.search-box {
		position: sticky;
		top: 0;
		z-index: 999;
	}
</style>

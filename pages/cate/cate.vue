<template>
	<view>
		<my-search bgColor="#6c4ea7" @click="gotoSearch()"></my-search>
		<view class="scoll-view-container">
			<!-- 左侧滑动区 -->
			<scroll-view class="left-scoll-view" scroll-y="true" :style="{height: windowHeight + 'px'}">
				<block v-for="(item,i) in cateList" :key="i">
					<view :class="['left-scoll-item', i === active ? 'active' : '']" @click="activeChange(i)">
						{{item.cat_name}}
					</view>
				</block>
			</scroll-view>
			<!-- 右侧滑动区 -->
			<scroll-view scroll-y="true" :style="{height: windowHeight + 'px'}" :scroll-top="scrollTop">
				<!-- 二级分类区域 -->
				<view class="cate-level-2" v-for="(item2, i2) in cateLevel2" :key="item2.cat_id">
					<view class="cate-level-title"> {{item2.cat_name.split('').join(' ')}} </view>

					<!-- 三级分类列表 -->
					<view class="cate-level3-list">
						<view class="cate-level3-title-item" v-for="item3 in item2.children" :key="item3.cat_id"
							@click="gotoGoodsList(item3.cat_id)">
							<image :src="item3.cat_icon"></image>
							<text>{{item3.cat_name}}</text>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				windowHeight: 0,
				cateList: [], //一级分类列表
				cateLevel2: [], //二级分类列表
				active: 0,
				scrollTop: 0
			};
		},
		methods: {
			//获取分类列表
			async getCateList() {
				const {
					data: res
				} = await uni.$http.get('/api/public/v1/categories')
				if (res.meta.status !== 200) return uni.$showMsg()
				this.cateList = res.message

				//默认将索引为0的一级分类的children设置为二级分类
				this.cateLevel2 = res.message[0].children
			},
			//切换分类
			activeChange(i) {
				this.active = i
				//重新为二级分类赋值
				this.cateLevel2 = this.cateList[i].children
				//将滚动条高度初始化
				this.scrollTop = this.scrollTop === 0 ? 1 : 0
			},
			//跳转到商品列表页面
			gotoGoodsList(id) {
				uni.navigateTo({
					url: '/subpackage/goods_list/goods_list?cid=' + id
				})
			},
			//跳转到搜索页面
			gotoSearch(){
				uni.navigateTo({
					url:'/subpackage/search/search'
				})
			}
		},
		onLoad() {
			const systemInfo = uni.getSystemInfoSync()
			this.windowHeight = systemInfo.windowHeight - 56
			this.getCateList()
		}
	}
</script>

<style lang="scss">
	.scoll-view-container {
		display: flex;

		.left-scoll-view {
			width: 120px;

			.left-scoll-item {
				background-color: #F7F7F7;
				line-height: 60px;
				text-align: center;
				font-size: 14px;

				&.active {
					position: relative;
					color: var(--main-color);
					background-color: #fff;

					&::before {
						content: '';
						width: 3px;
						height: 30px;
						background-color: var(--main-color);
						position: absolute;
						left: 0;
						top: 50%;
						transform: translateY(-50%);
					}
				}
			}
		}

		.cate-level-2 {
			text-align: center;

			.cate-level-title {
				display: inline-block;
				color: var(--main-color);
				font-size: 16px;
				font-weight: 700;
				text-align: center;
				margin: 30px;
				padding: 5px 5px;
				border-top: 2px solid var(--main-color);
				border-bottom: 2px solid var(--main-color);
			}

			.cate-level3-list {
				display: flex;
				flex-wrap: wrap;


				.cate-level3-title-item {
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;
					width: 33.33%;

					image {
						width: 70px;
						height: 70px;
					}

					text {
						font-size: 12px;
					}
				}

			}
		}
	}
</style>

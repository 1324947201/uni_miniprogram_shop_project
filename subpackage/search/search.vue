<template>
	<view>
		<view class="search-container">
			<uni-search-bar @confirm="confirm" @clear="clearList" :radius="100" cancelButton="none" clearButton="auto" >
			</uni-search-bar>
		</view>
		<!-- 搜索建议列表 -->
		<view class="suggest-list" v-if="searchResult.length !== 0">
			<view class="suggest-item" v-for="(item, i) in searchResult" :key="i" @click="gotoDetail(item)">
				<view class="goods-name">{{item.goods_name}}</view>
				<uni-icons type="arrowright" size="16"></uni-icons>
			</view>
		</view>
		<!-- 搜索历史区 -->
		<view class="history-box" v-else>
			<!-- 搜索历史列表 -->
			<view class="history-title">
				<text>搜索历史</text>
				<uni-icons type="trash" size="18" @click="clean"></uni-icons>
			</view>
			<!-- 列表区域 -->
			<view class="history-list">
				<uni-tag :text="item" type="default" inverted="true" v-for="(item, i) in histories" :key="i" @click="gotoGoodsList(item)">
				</uni-tag>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				timer: null,
				keywords: '',
				searchResult: [],
				historyList: []
			};
		},
		methods: {
			//confirm搜索事件处理函数
			confirm(e) {
					this.keywords = e.value
					this.getSearchList()
					if (this.keywords) {
						this.saveSearchHistory()
					}
			},
			//获取搜索建议列表
			async getSearchList() {
				if (this.keywords.length == 0) {
					this.searchResult = []
					return
				}
				const {
					data: res
				} = await uni.$http.get('/api/public/v1/goods/qsearch', {
					query: this.keywords
				})
				if (res.meta.status !== 200) return uni.$showMsg()
				this.searchResult = res.message
			},
			// 保存搜索历史记录
			saveSearchHistory(value) {
				const set = new Set(this.historyList)
				set.delete(this.keywords)
				set.add(this.keywords)
				this.historyList = Array.from(set)
				//将历史记录存入本地
				uni.setStorageSync('historyData', JSON.stringify(this.historyList))
			},
			//跳转到详情界面
			gotoDetail(item) {
				uni.navigateTo({
					url: '/subpackage/goods_detail/goods_detail?goods_id=' + item.goods_id
				})
			},
			//清空历史记录
			clean() {
				this.historyList = []
				uni.setStorageSync('historyData', '[]')
			},
			//历史记录跳转功能
			gotoGoodsList(item){
				uni.navigateTo({
					url:'/subpackage/goods_list/goods_list?query=' + item
				})
			},
			//点击clear搜索框
			clearList(){
				this.keywords = ''
				this.searchResult = []
			}
		},
		computed: {
			histories() {
				return [...this.historyList].reverse()
			}
		},
		onLoad() {
			//读取本地历史记录
			this.historyList = JSON.parse(uni.getStorageSync('historyData') || '[]')
		}
	}
</script>

<style lang="scss">
	.search-container {
		background-color: var(--main-color);
		position: sticky;
		top: 0;
		z-index: 999;
	}

	.suggest-list {
		padding: 0 10px;

		.suggest-item {
			display: flex;
			justify-content: space-between;
			align-items: center;
			height: 75rpx;
			border-bottom: 1px solid #efefef;

			.goods-name {
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
				font-size: 14px;
			}
		}
	}

	.history-box {
		padding: 5px 5px;
		margin-bottom: 5px;


		.history-title {
			display: flex;
			justify-content: space-between;
			padding: 5px;
			margin-bottom: 2px;
			font-size: 14px;
			border-bottom: 1px solid #efefef;
		}
	}

	.history-list {
		display: flex;
		flex-wrap: wrap;

		.uni-tag {
			display: block;
			margin: 3px;
		}
	}
</style>

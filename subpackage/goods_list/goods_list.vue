<template>
	<view>
		<view class="goods_list">
			<view v-for="(goods , i) in goodsList" :key='i' @click="gotoDetail(goods)">
				<my-goods :goods="goods"></my-goods>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				queryObj: {
					query: '',
					cid: '',
					pagenum: 1,
					pagesize: 10
				},
				goodsList: [],
				total: 0,
				isLoading:false
			};
		},
		methods: {
			//获取商品列表数据
			async getGoodsList(callBack) {
				this.isLoading = true
				const {
					data: res
				} = await uni.$http.get('/api/public/v1/goods/search', this.queryObj)
				this.isLoading = false
				//调用回调，关闭下拉刷新效果
				callBack && callBack()
				
				if (res.meta.status !== 200) return uni.$showMsg()
				this.goodsList = [...this.goodsList, ...res.message.goods]
				this.total = res.message.total
			},
			//导航到商品详情页
			gotoDetail(goods){
				uni.navigateTo({
					url:"/subpackage/goods_detail/goods_detail?goods_id=" + goods.goods_id
				})
			}
		},
		onLoad(options) {
			this.queryObj.query = options.query || ''
			this.queryObj.cid = options.cid || ''
			this.getGoodsList()
		},
		onPullDownRefresh(){
			this.queryObj.pagenum = 1
			this.total = 0
			this.isLoading = false
			this.goodsList = []
			
			this.getGoodsList(()=>{uni.stopPullDownRefresh()})
		},
		onReachBottom() {
			if(this.queryObj.pagenum * this.queryObj.pagesize >= this.total) return uni.$showMsg('数据加载完毕')
			if(this.isLoading) return
			this.queryObj.pagenum++
			this.getGoodsList()
		},
	}
</script>

<style lang="scss">
	.goods_list {
		padding: 0 5px;
		background-color: #f0f0f0;
	}
</style>

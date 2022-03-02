export default {
	namespaced: true,


	state: {
		//cart购物车数组，其中会保存多个商品的信息对象
		//每个信息对都必须包含如下留个属性  id，名称，价格，数量，logo，状态
		//cart数据理应从服务器获取，但是没有提供服务器，这里从本地获取用替代
		cart: JSON.parse(uni.getStorageSync('cart') || '[]')
	},


	mutations: {
		//添加购物车
		addToCart(state, goods) {
			//判断购物车中有没有这种商品，有的话返回商品对象，没有的话返回undefined
			const result = state.cart.find(item => item.goods_id === goods.goods_id)
			if (!result) {
				state.cart.push(goods)
			} else {
				result.goods_count++
			}
			//持久化保存本地
			this.commit('store_cart/saveToStorage', state.cart)
		},
		//将购物车信息保存到服务器（由于没有服务器，这里用保存本地替代）
		saveToStorage(state) {
			uni.setStorageSync('cart', JSON.stringify(state.cart))
		},
		//修改商品勾选状态
		updataGoodsState(state, goods) {
			const result = state.cart.find(item => item.goods_id === goods.goods_id)
			if (result) {
				result.goods_state = goods.goods_state
				this.commit('store_cart/saveToStorage', state.cart)
			}
		},
		//修改全选/全不选状态
		updataAllGoodsState(state, allState) {
			state.cart.forEach((item) => {
				item.goods_state = allState
			})
			this.commit('store_cart/saveToStorage', state.cart)
		},
		//修改商品数量
		updataGoodsCount(state, goods) {
			const result = state.cart.find(item => item.goods_id === goods.goods_id)
			if (result) {
				result.goods_count = goods.goods_count
				this.commit('store_cart/saveToStorage', state.cart)
			}
		},
		//移除商品
		removeGoodsById(state, goodsIdArr) {
			state.cart = state.cart.filter(item => goodsIdArr.indexOf(item.goods_id) === -1)
			uni.$showMsg("移除成功")
			this.commit('store_cart/saveToStorage', state.cart)
		},
	},


	getters: {
		//返回商品总数，用于购物车徽标显示
		total(state) {
			let c = 0
			state.cart.forEach(item => {
				c += item.goods_count
			})
			return c
		},
		//判断商品是否全选
		isCkeckAll(state) {
			if (state.cart.length !== 0) {
				const result = state.cart.find(item => item.goods_state === false)
				if (result) {
					return false
				}
				return true
			}
			return false
		},
		//计算勾选商品的数量
		checkedCuont(state) {
			return state.cart.filter(item => item.goods_state).reduce((total, item) => total += item.goods_count, 0)
		},
		//计算勾选商品的价格
		checkedPrice(state) {
			return state.cart.filter(item => item.goods_state).reduce((total, item) => total += item.goods_price * item
				.goods_count, 0)
		},
	}
}

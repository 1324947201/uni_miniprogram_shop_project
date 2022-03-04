export default {
	namespaced: true,

	state: {
		address: JSON.parse(uni.getStorageSync('address') || '{ }'),
		userInfo: JSON.parse(uni.getStorageSync('userInfo') || '{ }'),
		token: uni.getStorageSync('token') || '',
		//重定向obj
		redirectInfo: null
	},

	mutations: {
		updataAddress(state, address) {
			state.address = address
			this.commit('store_user/saveAddressToStorage')
		},
		//将用户信息保存到服务器（由于没有服务器，这里用保存本地替代）
		saveAddressToStorage(state) {
			uni.setStorageSync('address', JSON.stringify(state.address))
		},
		//更新用户信息
		updataUserInfo(state, userInfo) {
			state.userInfo = userInfo
			this.commit('store_user/saveUserInfoToStorage')
		},
		//将用户信息保存到本地
		saveUserInfoToStorage(state) {
			uni.setStorageSync('userInfo', JSON.stringify(state.userInfo))
		},
		//更新token
		updataToken(state, token) {
			state.token = token
			this.commit('store_user/saveTokenToStorage')
		},
		//将token保存到本地
		saveTokenToStorage(state) {
			uni.setStorageSync('token', state.token)
		},
		//更新重定向obj
		updataRedirectInfo(state, info){
			state.redirectInfo = info
		}
	},

	getters: {
		addstr(state) {
			if (!state.address.provinceName) return ''
			let str = state.address.provinceName + ' ' + state.address.cityName + ' ' + state.address.countyName + ' ' +
				state.address.detailInfo
			return str
		}
	}
}

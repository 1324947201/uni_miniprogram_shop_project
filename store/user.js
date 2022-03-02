export default {
	namespaced: true,

	state: {
		address: JSON.parse(uni.getStorageSync('address') || '{ }')
	},

	mutations: {
		updataAddress(state, address) {
			state.address = address
			this.commit('store_user/saveToStorage', state.address)
		},
		//将用户信息保存到服务器（由于没有服务器，这里用保存本地替代）
		saveToStorage(state) {
			uni.setStorageSync('address', JSON.stringify(state.address))
		},
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

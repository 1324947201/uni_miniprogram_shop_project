import {
	mapGetters
} from 'vuex'

export default {
	methods: {
		setBadge() {
			uni.setTabBarBadge({
				index: 2,
				//text属性为角标值，必须是字符串
				text: this.total + ''
			})
		}
	},
	computed: {
		...mapGetters('store_cart', ['total']),
	},
	watch: {
		total: {
			handler(newVal) {
				this.setBadge()
				if (this.total === 0) {
					uni.removeTabBarBadge({
						index: 2,
					})
				}
			}
		}
	},
	onShow() {
		if (this.total !== 0) {
			this.setBadge()
		}
	}
}

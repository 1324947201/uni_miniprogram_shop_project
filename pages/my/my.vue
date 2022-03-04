<template>
	<view class="my-view">
		<my-login v-if="!token"></my-login>
		<my-userInfo v-else></my-userInfo>
	</view>
</template>

<script>
	import badgeMix from '@/mixins/tabBar-badge.js'
	import {
		mapState
	} from 'vuex'

	export default {
		mixins: [badgeMix],
		data() {
			return {

			};
		},
		computed: {
			...mapState('store_user', ['token']),
		},
	}
</script>

<style lang="scss">
	page,
	.my-view {
		height: 100%;
	}
</style>

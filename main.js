// #ifndef VUE3
import Vue from 'vue'
import App from './App'

//导入网络请求相关包
import {
	$http
} from '@escook/request-miniprogram'
uni.$http = $http
$http.baseUrl = "https://www.uinav.com" //请求根路径

$http.beforeRequest = function(option) { //请求拦截器
	uni.showLoading({ //展示loading效果
		title: '加载中'
	})
}

$http.afterRequest = function(option) { //响应拦截器
	uni.hideLoading() //隐藏loading效果
}

//封装弹窗方法
uni.$showMsg = function(title = "数据加载失败", duration = 1500) {
	uni.showToast({
		title,
		duration,
		icon: 'none'
	})
}
Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()
// #endif

// #ifdef VUE3
import {
	createSSRApp
} from 'vue'
import App from './App.vue'
export function createApp() {
	const app = createSSRApp(App)
	return {
		app
	}
}
// #endif

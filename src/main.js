import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import 'reset-css';
import SlideVerify from 'vue-monoplasty-slide-verify' // 拼图验证码
import LoadMore from 'load-more-zhao'
import VueLazyload from 'vue-lazyload'

Vue.use(SlideVerify)
Vue.use(LoadMore)
// 配置项
Vue.use(VueLazyload, {
  preLoad: 1.3,
  // error: 'dist/error.png',
  // 这里注意，不能写相对路径，因此打包上线也需要修改这个地址
  loading: 'http://codesohigh.com/store-pc/img/img_loading.gif', 
  attempt: 1
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

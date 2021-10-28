import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import 'reset-css';
import SlideVerify from 'vue-monoplasty-slide-verify' // 拼图验证码
import LoadMore from 'load-more-zhao'

Vue.use(SlideVerify)
Vue.use(LoadMore)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import 'reset-css';
import SlideVerify from 'vue-monoplasty-slide-verify' // 拼图验证码

Vue.use(SlideVerify)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

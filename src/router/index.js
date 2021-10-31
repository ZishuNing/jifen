import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Store from '../store'

Vue.use(VueRouter)
Vue.use(Store)

const routes = [
  {
    path: "/",
    redirect: "/home"
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/goods',
    name: 'Goods',
    component: () => import(/* webpackChunkName: "goods" */ '../views/Goods.vue')
  },
  {
    path: '/user',
    redirect: '/user/center',
    name: 'User',
    component: () => import(/* webpackChunkName: "user" */ '../views/User.vue'),
    children: [
      {
        path: 'center',
        name: 'Center',
        component: () => import(/* webpackChunkName: "center" */ '../components/user/Center.vue')
      },
      {
        path: 'cart',
        name: 'Cart',
        component: () => import(/* webpackChunkName: "cart" */ '../components/user/Cart.vue')
      }
    ]
  },
  {
    path: '/order',
    name: 'Order',
    component: () => import(/* webpackChunkName: "order" */ '../views/Order.vue')
  },
  {
    path: '/free',
    name: 'Free',
    component: () => import(/* webpackChunkName: "free" */ '../views/Free.vue')
  },
  {
    path: '/details/:id',
    name: 'Details',
    component: () => import(/* webpackChunkName: "details" */ '../views/Details.vue')
  }
]

const router = new VueRouter({
  // mode: 'history',   // 默认mode就是hash，所以可以不写
  base: process.env.BASE_URL,
  routes
})

// 解决Vue-Router升级导致的Uncaught(in promise) navigation guard问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}

// 导航守卫
router.beforeEach((to,from,next)=>{
  // if(to.path==='/user'){
  if(to.path.indexOf('/user')!==-1){
    // 必须要有token
    let token = localStorage.getItem("x-auth-token");
    if(token){
      next();
    }else{
      // 给出提示
      let obj = {content: "请先登录",icon: "info"};
      Store.dispatch("toastAsync", obj);
    }
    return;
  }
  next();
})

export default router

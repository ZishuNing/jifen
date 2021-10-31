<template>
  <div class="banxin">
    <Breadcrumb :breadArr="breadArr" />
    <main class="tanxin">
      <aside>
        <img class="avatar" v-lazy="avatar" alt="">
        <div class="userInfo">
          <span>{{username}}</span>
        </div>
        <div class="title"><img width="20" src="../assets/images/person/transaction.png" alt=""> 交易管理</div>
        <ul>
          <li @click="$router.push('/user/center')" :class="{'active': $route.path.includes('center')}">个人中心</li>
          <li @click="asideActive=1" :class="{'active': asideActive==1}">我的订单</li>
          <li @click="$router.push('/user/cart')" :class="{'active': $route.path.includes('cart')}">购物车</li>
          <li @click="asideActive=3" :class="{'active': asideActive==3}">消息通知</li>
          <li @click="asideActive=4" :class="{'active': asideActive==4}">积分明细</li>
          <li @click="asideActive=5" :class="{'active': asideActive==5}">积分攻略</li>
        </ul>
        <div class="title"><img width="20" src="../assets/images/person/information.png" alt=""> 个人信息管理</div>
        <ul>
          <li @click="asideActive=6" :class="{'active': asideActive==6}">地址管理</li>
          <li @click="asideActive=7" :class="{'active': asideActive==7}">账号安全</li>
        </ul>
      </aside>
      <article>
        <!-- 应该用来放动态变化的路由对应的组件 -->
        <router-view @updateKeyFn="$emit('updateKeyFn')"></router-view>
      </article>
    </main>
  </div>
</template>
 
<script>
import Breadcrumb from "@/components/Breadcrumb.vue"
export default {
  data() {
    return {
      // 面包屑数组
      breadArr: ['首页', '个人中心'],
      asideActive: -1,
      // 头像
      avatar: localStorage.getItem("avatar"), 
      // 用户昵称
      username: localStorage.getItem("username")
    };
  },
  components: {
    Breadcrumb
  }
};
</script>
 
<style lang = "less" scoped>
@import "../assets/base.less";

main{
  border-top: 1px solid #ECECEC;
  padding-top: 28px;
  padding-bottom: 48px;
  min-height: 740px;
  aside{
    width: 200px;
    margin-right: 60px;
    background: #E7E7E7;
    .avatar{
      width: 100px;
      height: 100px;
      display: block;
      margin: 30px auto 19px;
    }
    .userInfo{
      text-align: center;
      margin-bottom: 43px;
      a{
        color: @blue;
      }
    }
    .title{
      display: flex;
      align-items: center;
      padding-left: 18px;
      margin-bottom: 14px;
      img{
        margin-right: 6px;
      }
    }
    ul{
      padding-left: 20px;
      li{
        margin-bottom: 17px;
        color: #666666;
        cursor: pointer;
        &.active{
          border-left: 2px solid @blue;
          padding-left: 10px;
          color: @blue;
        }
      }
    }
  }
  article{
    flex: 1;
  }
}
</style>
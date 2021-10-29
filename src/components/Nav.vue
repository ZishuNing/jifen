<template>
  <nav>
    <div class="banxin tanxin nav_in">
      <img src="../assets/images/indexLogo.png" alt="" />
      <ul class="tanxin">
        <li @click="$router.push('/home')" :class="{'active': $route.path==='/home' || $route.path==='/'}">首页</li>
        <li @click="$router.push('/goods')" :class="{'active': $route.path.indexOf('/goods')!==-1}">全部商品</li>
        <li @click="$router.push('/user')" :class="{'active': $route.path.indexOf('/user')!==-1}">个人中心</li>
        <li @click="$router.push('/order')" :class="{'active': $route.path==='/order'}">我的订单</li>
        <li @click="$router.push('/free')" :class="{'active': $route.path==='/free'}">专属福利</li>
      </ul>
      <div class="search tanxin">
        <input type="text" placeholder="搜索全部商品直接回车" v-model="value" @keyup.13="keyupFn" />
        <div class="btn" @click="keyupFn">
          <img src="../assets/images/search.png" alt="" />
        </div>
      </div>
    </div>
  </nav>
</template>
 
<script>
export default {
  data() {
    return {
      // 输入框的值
      value: ""
    };
  },
  methods: {
    keyupFn(){
      // 跳转到商品页
      this.$router.push(`/goods?keyword=${this.value}`)
    }
  }
};
</script>
 
<style lang = "less" scoped>
@import "../assets/base.less";
nav {
  background: #fff;
  .nav_in {
    align-items: center;
    height: 118px;
    ul {
      width: 500px;
      li {
        font-size: 16px;
        color: @black;
        cursor: pointer;
        &.active {
          color: @blue;
          font-weight: bold;
        }
      }
    }
    .search {
      height: 40px;
      width: 264px;
      border-radius: 40px;
      overflow: hidden;
      input {
        width: 214px;
        outline: none;
        height: 40px;
        border-radius: 20px 0 0 20px;
        border: 2px solid #dedede;
        box-sizing: border-box;
        border-right: 0;
        text-indent: 1em;
      }
      .btn {
        width: 50px;
        height: 40px;
        background: @blue;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
      }
    }
  }
}
</style>
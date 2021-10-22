<template>
  <header>
    <div class="banxin tanxin header_in">
      <section>欢迎来到叩丁狼积分商城</section>
      <ul>
        <li class="avatar_li">
          <img width="26" class="avatar" :src="avatar" alt="" /> 用户名：游客
        </li>
        <li>我的积分：--</li>
        <li>获取积分</li>
        <li>叩丁狼官网</li>
        <li class="header_btn cart_btn" v-if="ifLogin">
          <img src="../assets/images/Shopping.png" width="20" alt="" />
          <span>购物车</span>
          <b>0</b>
        </li>
        <li class="header_btn login_btn" v-else>登录</li>
      </ul>
    </div>
  </header>
</template>
 
<script>
export default {
  data() {
    return {
      avatar: require("../assets/images/userImg.png"),  // 头像
      ifLogin: false,       // 是否登录，默认false未登录
    };
  },
};
</script>
 
<style lang = "less" scoped>
@import "../assets/base.less";

header {
  background: @black;
  height: 40px;
  color: #fffefe;
  font-size: 14px;
  .header_in {
    align-items: center;
    height: 40px;
    ul {
      display: flex;
      height: 40px;
      align-items: center;
      li {
        margin-right: 20px;
        &.avatar_li {
          height: 26px;
          display: flex;
          align-items: center;
          .avatar {
            border-radius: 50%;
            margin-right: 5px;
          }
        }
        &.header_btn {
          width: 124px;
          height: 40px;
          background: @blue;
          cursor: pointer;
          margin-right: 0;
        }
        &.login_btn {
          text-align: center;
          line-height: 40px;
        }
        &.cart_btn {
          display: flex;
          align-items: center;
          justify-content: center;
          span {
            margin-left: 8px;
            margin-right: 6px;
          }
          b {
            width: 22px;
            height: 22px;
            background: @orange;
            border-radius: 11px;
            text-align: center;
            line-height: 22px;
          }
        }
      }
    }
  }
}
</style>
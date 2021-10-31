<template>
  <header>
    <div class="banxin tanxin header_in">
      <section>欢迎来到叩丁狼积分商城</section>
      <ul>
        <li class="avatar_li" @click="$router.push('/user/center')">
          <img width="26" class="avatar" v-lazy="userInfo.headImg" alt="" />
          用户名：{{ userInfo.nickName }}
        </li>
        <li>我的积分：{{ userInfo.coin }}</li>
        <li>获取积分</li>
        <li>叩丁狼官网</li>
        <li class="header_btn cart_btn" v-if="ifLogin" @click="$router.push('/user/cart')">
          <img src="../assets/images/Shopping.png" width="20" alt="" />
          <span>购物车</span>
          <b>{{ cartTotal }}</b>
        </li>
        <li class="header_btn login_btn" v-else @click="goLogin">登录</li>
      </ul>
    </div>
  </header>
</template>
 
<script>
import { UserInfoApi, WeixinLoginApi } from "@/request/api";
export default {
  data() {
    return {
      // 用户信息
      userInfo: {
        headImg: require("../assets/images/userImg.png"), // 头像
        nickName: "游客",
        coin: "--",
      },
      ifLogin: false, // 是否登录，默认false未登录
      cartTotal: 0,
    };
  },
  methods: {
    goLogin() {
      // 触发mutations去打开login
      this.$store.commit("changeLoginShow", true);
    },
    // 一个公用函数，有code直接手机绑定微信
    bindWechatFn() {
      // 根据是否地址栏有code来决定是否做手机绑定微信
      let code = this.$route.query.code;
      if (code) {
        // 通过微信扫码跳转过来首页的
        WeixinLoginApi({ code }).then((res) => {
          if (res.code === 0) {
            // 成功
            let obj = { content: res.message, icon: "success" };
            this.$store.dispatch("toastAsync", obj);
            // 存储token
            localStorage.setItem("x-auth-token", res["x-auth-token"]);
            // 更新Header组件
            this.$emit("updateKeyFn");
            // 相当于在删除地址栏的code
            this.$router.push(this.$route.path);
            setTimeout(()=>{
              this.$router.go(0);
            }, 200)
          } else if (res.code === 400) {
            // 请重新扫描
            let obj = { content: "请重新扫描二维码登录", icon: "danger" };
            this.$store.dispatch("toastAsync", obj);
            // 重新打开登录框
            this.$store.commit("changeLoginShow", true);
          } else if (res.code === 407) {
            // 需要手机验证码登录
            let obj = {
              content: "请使用手机号登录绑定微信",
              icon: "danger",
            };
            this.$store.dispatch("toastAsync", obj);
            // 重新打开登录框
            this.$store.commit("changeLoginShow", true);
            // 临时保留uuid
            sessionStorage.setItem("uuid", res.uuid);
          } else {
            // 直接报错
            let obj = { content: res.message, icon: "success" };
            this.$store.dispatch("toastAsync", obj);
          }
        });
      }
    },
    
  },
  watch: {
    "$route": {
      handler(newVal, oldVal) {
        if (newVal.query.code !== oldVal.query.code) {
          // 调用绑定微信
          this.bindWechatFn();
        }
      },
      deep: true
    }
  },
  created() {
    let token = localStorage.getItem('x-auth-token')
    if (token) {
      // 获取用户信息
      UserInfoApi().then((res) => {
        if (res.code === 0) {
          let { cartTotal, userInfo } = res.data;
          this.cartTotal = cartTotal;
          this.userInfo = userInfo;
          this.ifLogin = true;
          // 存储我的积分、头像和昵称
          localStorage.setItem("mycoin", userInfo.coin);
          localStorage.setItem("avatar", userInfo.headImg);
          localStorage.setItem("username", userInfo.nickName);
        }
      });
    }
    // 调用绑定微信
    this.bindWechatFn();
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
          cursor: pointer;
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
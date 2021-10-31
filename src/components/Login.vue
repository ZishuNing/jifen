<template>
  <div class="modal" v-show="$store.state.ifOpenLogin">
    <div class="modal_bg" @click="closeLogin"></div>
    <div class="modal_content">
      <img
        src="../assets/images/login/userArrow.png"
        @click="closeLogin"
        class="close"
        alt=""
      />
      <section>
        <span :class="{ active: showPhone }" @click="showPhone = true">手机号码登录</span>
        <span :class="{ active: !showPhone }" @click="wechatLoginFn">微信扫码登录</span>
      </section>
      <div class="phone_login" v-show="showPhone">
        <div class="line tanxin">
          <input type="number" v-model="phone" placeholder="请输入手机号" />
        </div>
        <div class="verify_box">
          <slide-verify
            :l="42"
            :r="20"
            :w="362"
            :h="140"
            @success="onSuccess"
            @fail="onFail"
            @refresh="onRefresh"
            :style="{ width: '100%' }"
            class="slide-box"
            ref="slideBlock"
            :slider-text="msg"
          ></slide-verify>
        </div>
        <div class="line tanxin">
          <input type="text" v-model="code" placeholder="请输入短信验证码" />
          <div class="btn" @click="getCodeFn" v-if="codeStatus">获取验证码</div>
          <div class="daojishi" v-else>{{ count }} s</div>
        </div>
        <div class="btn_login" @click="submitFn">登录</div>
      </div>
      <div id="weixin" v-show="!showPhone"></div>
    </div>
  </div>
</template>
 
<script>
import { GetCodeApi, LoginApi, BindWechatApi } from "@/request/api";
// 校验手机号的方法
const validateTelephone = (phone) => {
  let reg =
    /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
  // 手机号正确返回true， 手机号错误返回false
  return reg.test(phone.trim());
};

export default {
  data() {
    return {
      // true表示显示手机号，false表示显示微信
      showPhone: true,
      // 滑块默认值
      msg: "向右滑动",
      // 手机号
      phone: "",
      // 验证码
      code: "",
      // 倒计时时间
      count: 60,
      // 获取验证码的状态,true代表要显示“获取验证码”，false代表要显示倒计时
      codeStatus: true,
    };
  },
  methods: {
    // 切换到微信登录
    wechatLoginFn() {
      this.showPhone = false;
      let _this = this;
      new WxLogin({
        id: "weixin",
        appid: "wx67cfaf9e3ad31a0d", // 这个appid要填死
        scope: "snsapi_login",
        // 扫码成功后重定向的接口
        redirect_uri: "https://sc.wolfcode.cn/cms/wechatUsers/shop/PC",
        // state填写编码后的url
        state: encodeURIComponent(
          window.btoa(process.env.VUE_APP_STATE_URL + _this.$route.path)
        ),
        // 调用样式文件
        href: "data:text/css;base64,LmltcG93ZXJCb3ggLnRpdGxlLCAuaW1wb3dlckJveCAuaW5mb3sNCiAgICBkaXNwbGF5OiBub25lOw0KfQ0KDQoud3JwX2NvZGV7DQogICAgbWFyZ2luLXRvcDogMDsNCn0=",
      });
    },
    // 获取验证码
    getCodeFn() {
      // 判断有没有手机号
      let result = validateTelephone(this.phone);
      if (!result) {
        // 校验到手机号错误
        let obj = { content: "请重新输入手机号", icon: "danger" };
        this.$store.dispatch("toastAsync", obj);
        return;
      }
      // 如果手机号没问题，就正常往下走
      // 调接口 - 获取验证码
      GetCodeApi({
        phone: this.phone,
      }).then((res) => {
        if (res.code === 0) {
          // 成功发送验证码
          let obj = { content: res.message, icon: "success" };
          this.$store.dispatch("toastAsync", obj);
          // 倒计时
          this.codeStatus = false; // 显示倒计时
          let timer = setInterval(() => {
            this.count--;
            if (this.count === 0) {
              clearInterval(timer); // 终止定时器
              this.count = 60;
              this.codeStatus = true; // 显示“获取验证码”
            }
          }, 1000);
        } else {
          // 发送验证码失败
          let obj = { content: res.message, icon: "danger" };
          this.$store.dispatch("toastAsync", obj);
        }
      });
    },
    // 关闭登录框
    closeLogin() {
      this.$store.commit("changeLoginShow", false);
    },
    // 拼图成功
    onSuccess(times) {
      let ms = (times / 1000).toFixed(1);
      this.msg = "login success, 耗时 " + ms + "s";
    },
    // 拼图失败
    onFail() {
      this.onRefresh(); // 重新刷新拼图
    },
    // 拼图刷新
    onRefresh() {
      this.msg = "再试一次";
    },
    // 点击登录按钮
    submitFn() {
      // 校验手机号是否正确
      let result = validateTelephone(this.phone);
      if (!result) {
        // 校验到手机号错误
        let obj = { content: "请重新输入手机号", icon: "danger" };
        this.$store.dispatch("toastAsync", obj);
        return;
      }
      // 校验验证码填写了没有
      let mycode = this.code.trim(); // 去除前后空格
      if (mycode == "") {
        let obj = { content: "请输入验证码", icon: "danger" };
        this.$store.dispatch("toastAsync", obj);
        return;
      }
      // 校验滑块是否滑动
      if (this.msg == "再试一次" || this.msg == "向右滑动") {
        // 提示用户滑动滑块
        let obj = { content: "请滑动拼图", icon: "danger" };
        this.$store.dispatch("toastAsync", obj);
        return;
      }
      // 以上如果全部都通过了，就终于可以开始登录了

      // 存在uuid，
      let uuid = sessionStorage.getItem("uuid");
      if (uuid) {
        // 证明此时是从微信扫码后想要做的手机号登录
        BindWechatApi({
          phone: this.phone,
          verifyCode: this.code,
          uuid: uuid,
        }).then((res) => {
          if (res.code === 0) {
            // 存储token
            localStorage.setItem("x-auth-token", res["x-auth-token"]);
            // 提示成功
            let obj = { content: res.message, icon: "success" };
            this.$store.dispatch("toastAsync", obj);
            // 关闭登录框
            this.$store.commit("changeLoginShow", false);
            // 更新一下Header组件
            this.$emit("updateKeyFn");
            // /home  /user   /goods
            // 拿到这个路径 this.$route.path
            this.$router.push(this.$route.path) // 相当于在删除地址栏的code
            // 清除uuid
            sessionStorage.removeItem("uuid");
          }
        });
      } else {
        // 纯粹的手机号登录,不是从微信扫码过来的
        LoginApi({
          verifyCode: this.code,
          phone: this.phone,
        }).then((res) => {
          if (res.code === 0) {
            // 存储token
            localStorage.setItem("x-auth-token", res["x-auth-token"]);
            // 提示成功
            let obj = { content: res.message, icon: "success" };
            this.$store.dispatch("toastAsync", obj);
            // 关闭登录框
            this.$store.commit("changeLoginShow", false);
            // 更新一下Header组件
            this.$emit("updateKeyFn");
          }
        });
      }
    },
  },
};
</script>
 
<style lang = "less" scoped>
@import "../assets/base.less";
.modal {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  .modal_bg {
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
  }
  .modal_content {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    margin: auto;
    width: 555px;
    height: 423px;
    background: url(../assets/images/login/loginBg.png);
    .close {
      position: absolute;
      right: 60px;
      top: 10px;
      cursor: pointer;
    }
    section {
      display: flex;
      justify-content: center;
      padding-top: 40px;
      margin-bottom: 30px;
      span {
        color: #ccc;
        cursor: pointer;
        &:nth-of-type(1) {
          border-right: 1px solid #ccc;
          padding-right: 10px;
          margin-right: 10px;
        }
        &.active {
          color: #333;
        }
      }
    }
    .line {
      width: 360px;
      margin: 0 auto 20px;
      height: 50px;
      input {
        flex: 1;
        text-indent: 1em;
      }
      .btn {
        color: #fff;
        background: @blue;
        text-align: center;
        width: 90px;
        height: 50px;
        margin-left: 10px;
        line-height: 50px;
        cursor: pointer;
      }
      .daojishi {
        color: #fff;
        background: #ccc;
        text-align: center;
        width: 90px;
        height: 50px;
        margin-left: 10px;
        line-height: 50px;
        cursor: pointer;
      }
    }
    .btn_login {
      width: 360px;
      background: @blue;
      color: #fff;
      height: 50px;
      line-height: 50px;
      margin: auto;
      text-align: center;
      cursor: pointer;
    }
  }
}

.verify_box {
  width: 360px;
  margin: 0 auto 20px;
  /deep/.slide-box {
    width: 100%;
    position: relative;
    box-sizing: border-box;
    canvas {
      position: absolute;
      left: 0;
      top: -140px;
      display: none;
      width: 100%;
      box-sizing: border-box;
    }
    .slide-verify-block {
      width: 85px;
      height: 136px;
    }
    .slide-verify-refresh-icon {
      top: -140px;
      display: none;
    }
    &:hover {
      canvas {
        display: block;
      }
      .slide-verify-refresh-icon {
        display: block;
      }
    }
  }
}

#weixin {
  width: 300px;
  margin: auto;
}
</style>
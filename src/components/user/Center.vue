<template>
  <div>
    <div class="btn" @click="logout">退出登录</div>
    <div class="btn" @click="jiebangFn">解绑微信</div>
  </div>
</template>
 
<script>
import { UnBindWechatApi } from "@/request/api"
export default {
  data() {
    return {

    }
  },
  methods: {
    // 解绑微信
    jiebangFn() {
      UnBindWechatApi().then((res) => {
        if (res.code === 0) {
          let obj = { content: res.data, icon: "success" };
          this.$store.dispatch("toastAsync", obj);
        }
      });
    },
    // 退出登录
    logout() {
      // 删除token
      localStorage.clear();
      // 跳去首页
      let obj = { content: "您已退出登录，即将返回首页", icon: "success" };
      this.$store.dispatch("toastAsync", obj);
      // 触发App.vue中的updateKeyFn
      this.$emit("updateKeyFn")
      // 返回首页
      setTimeout(()=>{
          this.$router.push("/")
      }, 2000)
    }
  }
}
</script>
 
<style lang = "less" scoped>
@import "../../assets/base.less";
.btn {
  width: 100px;
  height: 40px;
  line-height: 40px;
  background: @blue;
  text-align: center;
  color: #fff;
  border-radius: 5px;
  margin-bottom: 20px;
  cursor: pointer;
}
</style>
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 登录框的状态
    ifOpenLogin: true,
    // Toast的变量
    toast: {
      show: false,
      content: "你好世界",
      icon: "icon-toast_chenggong"
    }
  },
  mutations: {
    // 修改登录框的状态
    changeLoginShow(state, payload) {
      state.ifOpenLogin = payload;
    },
    // 打开toast
    openToast(state, payload) {
      state.toast.show = true;
      state.toast.content = payload.content;
      switch (payload.icon) {
        case "info":
          // 警告
          state.toast.icon = "icon-toast-jinggao";
          break;
        case "success":
          // 成功
          state.toast.icon = "icon-toast_chenggong";
          break;
        case "danger":
          // 失败
          state.toast.icon = "icon-toast-shibai_huaban";
          break;
        case "loading":
          // 加载中
          state.toast.icon = "icon-loading";
          break;
        default:
          state.toast.icon = "icon-toast_chenggong";
          break;
      }
    },
    // 同步关闭Toast
    closeToast(state) {
      state.toast.show = false;
    }
  },
  actions: {
    // payload要求{ content, icon }
    // icon: info | success | danger | loading
    /* 
      Toast调用方式:
      let obj = {content: "你好哇",icon: "danger"};
      this.$store.dispatch("toastAsync", obj);
    */
    toastAsync({commit}, payload){
      commit("openToast", payload);
      setTimeout(() => {
        commit("closeToast");
      }, 2000);
    }
  },
  modules: {
  }
})

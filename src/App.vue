<template>
  <div id="app">
    <!-- 
      更新一个组件，本质是修改key
     -->
    <Header :key="updateKey" @updateKeyFn="updateKeyFn" />
    <Nav />
    <router-view />
    <Footer />
    <Login @updateKeyFn="updateKeyFn" />
    <transition name="fade">
      <Toast v-show="$store.state.toast.show" />
    </transition>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import Nav from "@/components/Nav.vue";
import Login from "@/components/Login.vue"
import Toast from "@/components/Toast.vue"
export default {
  data(){
    return {
      updateKey: 0
    }
  },
  methods: {
    // 更新Header的key值
    updateKeyFn(){
      this.updateKey++;
    }
  },
  components: {
    Header,
    Footer,
    Nav,
    Login,
    Toast
  },
};
</script>

<style lang="less">
body {
  font-size: 18px;
  font-family: SourceHanSansSC;
  font-weight: 300;
  color: #333333;
  background: #f5f5f5;
}

a{
  color: #333;
  text-decoration: none;
}

input{
  outline: none;
}

.fade-enter, .fade-leave-to{
  opacity: 0;
}

.fade-enter-active, .fade-leave-active{
  transition: opacity .5s linear;
}

.fade-enter-to, .fade-leave{
  opacity: 1;
}
</style>

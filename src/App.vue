<template>
  <div id="app">
    <Header />
    <Nav />
    <router-view />
    <Footer />
    <Login />
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

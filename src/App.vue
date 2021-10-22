<template>
  <div id="app">
    <Header />
    <Nav />
    <router-view />
    <Footer />
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import Nav from "@/components/Nav.vue";
export default {
  components: {
    Header,
    Footer,
    Nav
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
</style>

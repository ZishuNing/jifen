<template>
  <div class="home">
    <div class="banner">
      <div class="banxin">
        <img src="../assets/images/home/banner.png" width="100%" alt="" />
      </div>
    </div>
    <Title :src="Recommend" title="精品推荐" />
    <Title :src="hot" title="热门兑换" />
    <Title :src="integral" title="积分攻略" />
  </div>
</template>

<script>
import { JingpinApi } from "@/request/api";
import Title from "@/components/home/Title.vue"
export default {
  name: "Home",
  data(){
    return {
      Recommend: require('../assets/images/home/Recommend.png'),
      hot: require('../assets/images/home/hot.png'),
      integral: require('../assets/images/home/integral.png'),
    }
  },
  created() {
    JingpinApi().then((res) => {
      if (res.code === 0) {
        console.log(res.data);
      }
    });
  },
  components: {
    Title
  }
};
</script>
<style lang="less" scoped>
@import "../assets/base.less";
.banner {
  width: 100%;
  background: #fff;
  padding-bottom: 30px;
  img {
    display: block;
  }
}


</style>

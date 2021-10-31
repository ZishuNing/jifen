<template>
  <div class="home">
    <div class="banner">
      <div class="banxin">
        <img src="../assets/images/home/banner.png" width="100%" alt="" />
      </div>
    </div>
    <Title :src="Recommend" title="精品推荐" />
    <Products :arr="records" />
    <Title :src="hot" title="热门兑换" />
    <img src="../assets/images/home/ad.png" class="ad banxin" alt="" />
    <Products :arr="hot" />
    <div class="jifen">
      <Title :src="integral" title="积分攻略" />
      <ul class="tanxin banxin">
        <li>
          <h4>签到得鸡腿</h4>
          <div class="btn">去签到</div>
        </li>
        <li>
          <h4>购课得鸡腿</h4>
          <div class="btn">去购课</div>
        </li>
        <li>
          <h4>推荐得鸡腿</h4>
          <div class="btn">去推荐</div>
        </li>
        <li>
          <h4>做任务得鸡腿</h4>
          <div class="btn">做任务</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { JingpinApi, HotApi } from "@/request/api";
import Title from "@/components/home/Title.vue";
import Products from "@/components/Products.vue";
export default {
  name: "Home",
  data() {
    return {
      Recommend: require("../assets/images/home/Recommend.png"),
      hot: require("../assets/images/home/hot.png"),
      integral: require("../assets/images/home/integral.png"),
      // 精品推荐数组
      records: [],
      // 热门兑换数组
      hot: [],
    };
  },
  created() {
    JingpinApi().then((res) => {
      if (res.code === 0) {
        this.records = res.data.data.records;
      }
    });

    HotApi().then((res) => {
      if (res.code === 0) {
        this.hot = res.data.data.records;
      }
    });
  },
  components: {
    Title,
    Products,
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

.ad {
  display: block;
  margin-bottom: 30px;
}

.jifen {
  background: #fff;
  padding-bottom: 47px;
  li {
    color: #fff;
    width: 285px;
    height: 168px;
    padding-top: 43px;
    padding-left: 29px;
    box-sizing: border-box;
    transition: background-size 0.5s linear;
    background-size: 100% 100%;
    cursor: pointer;
    h4 {
      font-size: 24px;
      font-weight: bold;
      margin-bottom: 19px;
    }
    .btn {
      width: 96px;
      height: 27px;
      border: 1px solid #ffffff;
      text-align: center;
      line-height: 27px;
    }
    &:nth-of-type(1) {
      background-image: url(../assets/images/home/integral-01.png);
    }
    &:nth-of-type(2) {
      background-image: url(../assets/images/home/integral-02.png);
    }
    &:nth-of-type(3) {
      background-image: url(../assets/images/home/integral-03.png);
    }
    &:nth-of-type(4) {
      background-image: url(../assets/images/home/integral-04.png);
    }
    &:hover {
      background-size: 105% 105%;
    }
  }
}
</style>

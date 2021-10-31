<template>
  <div class="jingpin banxin">
    <div class="title tanxin">
      <div class="title_l">
        <img v-lazy="src" alt="" />
        <h2>{{title}}</h2>
      </div>
      <div class="more" v-show="title!=='积分攻略'" @click="goGoodsPage">
        <span>更多</span>
        <img src="../../assets/images/home/Arrow.png" alt="" />
      </div>
    </div>
  </div>
</template>
 
<script>
export default {
  data() {
    return {};
  },
  props: ["src", "title"],
  methods: {
    goGoodsPage(){
      this.$router.push(`/goods?did=${this.title==='精品推荐'?1:2}`)
    }
  }
};
</script>
 
<style lang = "less" scoped>
@import "../../assets/base.less";
.title {
  align-items: center;
  height: 106px;
  .title_l {
    display: flex;
    h2 {
      font-size: 30px;
      font-weight: bold;
      color: @black;
      margin-left: 10px;
    }
  }
  .more {
    cursor: pointer;
    span {
      font-size: 16px;
      margin-right: 6px;
      color: #666666;
    }
  }
}
</style>
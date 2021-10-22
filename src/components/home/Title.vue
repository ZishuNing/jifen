<template>
  <div class="jingpin banxin">
    <div class="title tanxin">
      <div class="title_l">
        <img :src="src" alt="" />
        <h2>{{title}}</h2>
      </div>
      <div class="more" v-show="title!=='积分攻略'">
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
  props: ["src", "title"]
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
    span {
      font-size: 16px;
      margin-right: 6px;
      color: #666666;
    }
  }
}
</style>
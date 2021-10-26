<template>
  <ul class="products banxin">
    <li v-for="item in arr" :key="item.id">
      <div class="products_box">
        <img :src="'http://sc.wolfcode.cn' + item.coverImg" alt="" />
        <h3>{{ item.name }}</h3>
        <section>
          <span>{{ item.coin }}</span>
          <img width="20" src="../assets/images/home/monad.png" alt="" />
        </section>
        <div class="btn">立即兑换</div>
        <img
          src="../assets/images/home/new-j.png"
          class="img_p"
          v-show="item.isLatest === 1"
          alt=""
        />
        <img
          src="../assets/images/home/hot-j.png"
          class="img_p"
          v-show="item.isHotSale === 1"
          alt=""
        />
      </div>
    </li>
  </ul>
</template>
 
<script>
export default {
  data() {
    return {};
  },
  props: ["arr"],
};
</script>
 
<style lang = "less" scoped>
@import "../assets/base.less";
.products {
  flex-wrap: wrap;
  display: flex;
  justify-content: flex-start;
  li {
    width: 285px;
    text-align: center;
    margin-right: 20px;
    cursor: pointer;
    margin-bottom: 20px;
    /* 每一行的第4个盒子 4 8 12 16 */
    &:nth-of-type(4n){
      margin-right: 0;
    }
    &:hover {
      .products_box {
        top: -10px;
        .btn {
          color: #fff;
          background: @blue;
        }
      }
    }
    .products_box {
      position: relative;
      padding-bottom: 32px;
      background: #fff;
      top: 0;
      transition: top 0.5s linear;
      h3 {
        margin-top: 22px;
        margin-bottom: 16px;
        font-size: 18px;
      }
      section {
        margin-bottom: 20px;
        font-size: 18px;
        font-weight: bold;
        color: @orange;
      }
      .btn {
        width: 100px;
        height: 36px;
        border: 1px solid @blue;
        line-height: 36px;
        color: @blue;
        cursor: pointer;
        margin: auto;
      }
      .img_p {
        position: absolute;
        left: 0;
        top: 0;
      }
    }
  }
}
</style>
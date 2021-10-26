<template>
  <div class="goods banxin">
    <Breadcrumb />
    <img
      style="display: block"
      src="../assets/images/products/banner.png"
      alt=""
    />
    <section class="list">
      <div>
        <strong>排序：</strong>
        <span
          v-for="(item, index) in paixuArr"
          :key="index"
          :class="{ active: paixuActive == index }"
          >{{ item.txt }}</span
        >
      </div>
      <div>
        <strong>分类：</strong>
        <span
          v-for="(item, index) in fenleiArr"
          :key="index"
          :class="{ active: fenleiActive == index }"
          @click="changeFenlei(item.value)"
          >{{ item.txt }}</span
        >
      </div>
    </section>
    <Products :arr="goodsArr" />
  </div>
</template>
 
<script>
import Breadcrumb from "@/components/Breadcrumb.vue";
import Products from "@/components/Products.vue";
import { GoodsDataApi } from "@/request/api";
import { mapState, mapMutations } from "vuex";

export default {
  data() {
    return {
      paixuActive: 0,
      fenleiActive: 0,
      // 排序的数组
      paixuArr: [
        { txt: "全部", min: 0, max: 10000 },
        { txt: "我能兑换的", min: 0, max: localStorage.getItem("mycoin") || 0 },
        { txt: "0-500分", min: 0, max: 500 },
        { txt: "500-1000分", min: 500, max: 1000 },
        { txt: "1000-1500分", min: 1000, max: 1500 },
        { txt: "1500-2500分", min: 1500, max: 2500 },
      ],
      // 分类的数组
      fenleiArr: [
        { txt: "全部", value: 0 },
        { txt: "实物商品", value: 1 },
        { txt: "虚拟商品", value: 2 },
      ],
      // 商品数组
      goodsArr: [],
    };
  },
  computed: {
    ...mapState({
      goodsObj: (state) => state.goods.goodsObj,
    }),
  },
  created() {
      this.GetGoodsFn();
  },
  methods: {
    ...mapMutations({
      changeGoodsObj: "goods/changeGoodsObj",
    }),
    // 发送请求
    GetGoodsFn() {
      GoodsDataApi(this.goodsObj).then((res) => {
        if (res.code === 0) {
          this.goodsArr = res.data;
        }
      });
    },
    // 点击了分类
    changeFenlei(value) {
      this.changeGoodsObj({
        did: 0,
        type: value,
        min: 0,
        max: 10000,
        keyword: "",
      });
      // 做请求
      this.GetGoodsFn();
    },
  },
  components: {
    Breadcrumb,
    Products,
  },
};
</script>
 
<style lang = "less" scoped>
@import "../assets/base.less";

.goods {
  .list {
    padding: 40px 0 8px;
    div {
      margin-bottom: 32px;
      strong {
        font-weight: bold;
        color: #000;
        margin-right: 10px;
      }
      span {
        margin-right: 28px;
        color: #999;
        cursor: pointer;
        &.active {
          color: @blue;
          font-weight: bold;
        }
      }
    }
  }
}
</style>
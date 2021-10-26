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
          @click="changePaixu(item.min, item.max, index)"
          >{{ item.txt }}</span
        >
      </div>
      <div>
        <strong>分类：</strong>
        <span
          v-for="(item, index) in fenleiArr"
          :key="index"
          :class="{ active: fenleiActive == index }"
          @click="changeFenlei(item.value, index)"
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
      // 获取从搜索框过来的keyword
      if(this.$route.query.keyword){
          this.changeGoodsObj({keyword: this.$route.query.keyword});
      }else{
          this.changeGoodsObj({keyword: ""});
      }
      // 获取从首页过来的did
      if(this.$route.query.did){
          this.changeGoodsObj({did: this.$route.query.did});
      }
      this.getGoodsFn();
  },
  watch: {
      "$route": {
          handler(newVal, oldVal){
              // keyword新值与旧值不同时，页面要刷新
              if(newVal.query.keyword !== oldVal.query.keyword){
                  this.$router.go(0)
              }
          },
          deep: true
      }
  },
  methods: {
    ...mapMutations({
      changeGoodsObj: "goods/changeGoodsObj",
    }),
    // 发送请求
    getGoodsFn() {
      GoodsDataApi(this.goodsObj).then((res) => {
        if (res.code === 0) {
          this.goodsArr = res.data;
        }
      });
    },
    // 点击了分类
    changeFenlei(value, index) {
      this.changeGoodsObj({type: value});
      // 修改当前项
      this.fenleiActive = index;
      // 做请求
      this.getGoodsFn();
    },
    // 点击了排序
    changePaixu(min, max, index) {
      this.changeGoodsObj({min, max});
      // 修改当前项
      this.paixuActive = index;
      // 做数据请求
      this.getGoodsFn();
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
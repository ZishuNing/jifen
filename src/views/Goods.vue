<template>
  <div class="goods banxin">
    <Breadcrumb :breadArr="breadArr" />
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
    <!-- 
      瀑布流效果
      内容分发(slot插槽)：
      每一次渲染不同的内容到同一个组件去渲染
      
      bigarr代表原数组（大数组）
      smallarr代表处理过后分发出来的数组（小数组）
      size代表每次滚动时显示多少项
     -->
    <LoadMore :bigarr="goodsArr" :size="8">
      <Products slot-scope="scope" :arr="scope.smallarr" />
    </LoadMore>
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
      // 面包屑数组
      breadArr: ["首页", "全部商品"],
      paixuActive: 0,
      fenleiActive: 0,
      // 排序的数组
      paixuArr: [
        { txt: "全部", min: 0, max: 10000 },
        { txt: "我能兑换的", min: 0, max: localStorage.getItem("mycoin") },
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
    if (this.$route.query.keyword) {
      this.changeGoodsObj({ keyword: this.$route.query.keyword });
    } else {
      this.changeGoodsObj({ keyword: "" });
    }
    // 获取从首页过来的did
    if (this.$route.query.did) {
      this.changeGoodsObj({ did: this.$route.query.did });
    }
    this.getGoodsFn();
  },
  watch: {
    $route: {
      handler(newVal, oldVal) {
        // keyword新值与旧值不同时，页面要刷新
        if (newVal.query.keyword !== oldVal.query.keyword) {
          this.$router.go(0);
        }
      },
      deep: true,
    },
  },
  methods: {
    ...mapMutations({
      changeGoodsObj: "goods/changeGoodsObj",
    }),
    // 发送请求
    getGoodsFn() {
      this.goodsArr = [];
      GoodsDataApi(this.goodsObj).then((res) => {
        if (res.code === 0) {
          this.goodsArr = res.data;
        }
      });
    },
    // 点击了分类
    changeFenlei(value, index) {
      this.changeGoodsObj({ type: value });
      // 修改当前项
      this.fenleiActive = index;
      // 做请求
      this.getGoodsFn();
    },
    // 点击了排序
    changePaixu(min, max, index) {
      // 如果点击的是“我能兑换的”
      if (index === 1) {
        // 判断是否登录
        let token = localStorage.getItem("x-auth-token");
        if (!token) {
          // 提示请先登录
          let obj = { content: "请先登录", icon: "danger" };
          this.$store.dispatch("toastAsync", obj);
          return;
        }
      }
      this.changeGoodsObj({ min, max });
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
<template>
  <div class="details banxin">
    <Breadcrumb :breadArr="breadArr" />
    <div class="content tanxin">
      <main class="tanxin">
        <div class="main_l">
          <div class="bigImg">
            <img width="100%" v-lazy="bigImg" alt="" />
          </div>
          <ul class="smallImg tanxin">
            <li :class="productActive===index ? 'active' : ''" v-for="item,index in productInfo.imgAltas" :key="index" @mouseover="bigImg='https://sc.wolfcode.cn'+item.src">
              <img width="100%" v-lazy="'https://sc.wolfcode.cn'+item.src" alt="" />
            </li>
          </ul>
        </div>
        <div class="main_r">
          <h2>{{productInfo.seriesTitle}}</h2>
          <p>{{productInfo.seriesSubTitle}}</p>
          <section>{{productInfo.coin}}积分</section>
          <div id="asdasdsajdha" v-for="item,index in productInfo.parameterJson" :key="index">
            <h3>{{item.title}}</h3>
            <ul>
              <li @click="$router.push(`/details/${items.id}`)" :class="{'active': items.currentActivate}" v-for="items in item.parameters" :key="items.id">{{items.title}}</li>
            </ul>
          </div>
          <h3>数量</h3>
          <div class="stepper tanxin">
            <!-- productInfo.stock  库存数 -->
            <div class="btn jia" @click="addFn">+</div>
            <input type="text" v-model="stepNum" disabled />
            <div class="btn jian" @click="cutFn">-</div>
          </div>
          <div class="btns">
            <div @click="addToCartFn">加入购物车</div>
            <div class="buynow" @click="buyNow">立即购买</div>
          </div>
        </div>
      </main>
      <aside>
        <h3 class="ellipsis">你还可以兑换</h3>
        <ul>
          <li @click="$router.push(`/details/${item.id}`)" class="tanxin" v-for="item in themYouCanBuy" :key="item.id">
            <img v-lazy="'https://sc.wolfcode.cn'+item.img" alt="">
            <section class="tanxin">
              <div class="title ellipsis">{{item.name}}</div>
              <div class="jifen tanxin">{{item.coin}} <img src="../assets/images/home/monad.png" alt=""></div>
            </section>
          </li>
        </ul>
      </aside>
    </div>
    <ul class="tab tanxin">
      <li :class="{'active': tabActive===1}" @click="tabActive=1">商品详情</li>
      <li :class="{'active': tabActive===2}" @click="tabActive=2">常见问题</li>
    </ul>
    <div class="img_text" :style="{display: tabActive==1 ? 'block' : 'none'}" v-html="productInfo.description"></div>
    <div class="issue" :style="{display: tabActive==2 ? 'block' : 'none'}">
      <h4>兑换后运费如何收取？</h4>
      <p>商城内大部分实物产品均可包邮，也支持上门自提。虚拟产品则无需运费，可在兑换后直接使用。</p>
      <p>（注：新疆，西藏，内蒙古，青海，海南，宁夏暂不支持包邮，在此地区兑换商品需提前与客服确认运费。）</p>

      <h4>如何申请退换货？</h4>
      <p>所有产品均为鸡腿兑换礼品，无质量问题不支持退换货；</p>
      <p>如因喜好不同，或到货后后悔等原因，不支持退货；</p>
      <p>因客户原因如联系方式有误、电话停机、不接电话、无理由拒收等造成快件无法正常签收的情况，叩丁狼均不进行补发或赔付；</p>
      <p>如因质量问题需要退货，将由客服人员与客户联系，确认邮寄地址与流程。退回物品不得有人为损坏或使用痕迹，否则拒绝退换；</p>
      <p>如顾客选择自行寄回商品，请先垫付运费，到货验证商品后，叩丁狼将以鸡腿发放形式为用户报销运费，不接受单方面到付件。</p>

      <h4>如何开具发票？</h4>
      <p>叩丁狼积分商城产品均为定制礼品，使用积分兑换的产品均不支持开票。</p>

      <h4>关于鸡腿价格问题</h4>
      <p>因可能存在系统缓存、页面更新延迟等不确定性情况，导致价格显示异常，商品具体售价请以订单结算页价格为准。如您发现异常情况出现，请立即联系我们补正，以便您能顺兑换。</p>

      <h4>联系我们</h4>
      <a href="http://www.wolfcode.cn">www.wolfcode.cn</a>
      <p>微信公众号搜索“叩丁狼”</p>
    </div>
  </div>
</template>
 
<script>
import Breadcrumb from "@/components/Breadcrumb.vue";
import { GoodsDetailsApi, AddToCartApi } from "@/request/api"
export default {
  data() {
    return {
      breadArr: ['首页', '全部商品', '商品详情'],
      // tab栏的当前项
      tabActive: 1,
      // 你还可以兑换
      themYouCanBuy: [],
      // 产品信息
      productInfo: {
        coverImg: "",
        imgAltas: [],
        seriesTitle: "",
        seriesSubTitle: "",
        coin: 0,
        parameterJson: [],
        description: ""
      },
      // 商品小图切换当前项
      productActive: 0,
      // 步进器的值
      stepNum: 1,
      bigImg: ""
    };
  },
  components: {
    Breadcrumb,
  },
  watch: {
    "$route": {
      handler(n, o) {
        this.$router.go(0)
      },
      deep: true
    }
  },
  methods: {
    // 步进器增加
    addFn() {
      if (this.stepNum >= this.productInfo.stock) {
        return;
      }
      this.stepNum++;
    },
    // 步进器减少
    cutFn() {
      if (this.stepNum <= 1) {
        return;
      }
      this.stepNum--;
    },
    // 加入购物车
    addToCartFn() {
      AddToCartApi({
        productId: this.productInfo.productId,
        total: this.stepNum
      }).then(res => {
        if (res.code === 0) {
          let obj = { content: "已成功添加到购物车", icon: "success" };
          this.$store.dispatch("toastAsync", obj);
        } else {
          let obj = { content: res.message, icon: "info" };
          this.$store.dispatch("toastAsync", obj);
        }
      })
    },
    // 立即购买
    buyNow() {
      let obj = { content: "该功能暂未开放", icon: "danger" };
      this.$store.dispatch("toastAsync", obj);
    }
  },
  created() {
    // console.log(this.$route.params.id);
    let myid = this.$route.params.id
    GoodsDetailsApi({
      id: myid
    }).then(res => {
      if (res.code === 0) {
        let { themYouCanBuy, productInfo } = res.data;
        this.themYouCanBuy = themYouCanBuy;
        productInfo.description = productInfo.description.replace(/<img src="/g, '<img src="http://sc.wolfcode.cn/')
        this.productInfo = productInfo;
        this.bigImg = 'https://sc.wolfcode.cn'+productInfo.coverImg;
      }
    })
  }
};
</script>
 
<style lang = "less" scoped>
@import "../assets/base.less";

.details {
  .content {
    min-height: 560px;
    border-bottom: 1px solid #ececec;
    padding-bottom: 53px;
    main {
      width: 970px;
      border-right: 1px solid #ececec;
      box-sizing: border-box;
      padding-right: 49px;
      .main_l {
        width: 459px;
        margin-right: 32px;
        .bigImg {
          width: 459px;
          margin-bottom: 21px;
          img {
            display: block;
          }
        }
        .smallImg {
          width: 459px;
          li {
            width: 100px;
            height: 100px;
            cursor: pointer;
            opacity: 0.7;
            &.active {
              opacity: 1;
            }
          }
        }
      }
      .main_r {
        flex: 1;
        h2 {
          font-size: 28px;
          color: #000000;
        }
        p {
          font-size: 14px;
          margin-top: 15px;
          font-weight: 300;
          color: #999999;
          line-height: 1.2;
          margin-bottom: 26px;
        }
        section {
          font-size: 28px;
          font-weight: bold;
          color: #fd604d;
          padding-bottom: 23px;
          border-bottom: 1px solid #ececec;
        }
        h3 {
          margin-top: 19px;
          margin-bottom: 14px;
          font-size: 16px;
          font-weight: 300;
          color: #000000;
        }
        ul {
          display: flex;
          flex-wrap: wrap;
          li {
            height: 32px;
            border: 1px solid #d1d1d1;
            color: #666666;
            padding: 0 17px;
            line-height: 32px;
            cursor: pointer;
            margin-right: 20px;
            margin-bottom: 11px;
            &.active {
              color: @blue;
              border-color: @blue;
            }
          }
        }
        .stepper {
          background: #fff;
          width: 105px;
          .btn {
            width: 30px;
            height: 30px;
            text-align: center;
            line-height: 30px;
            border: 1px solid #d1d1d1;
            box-sizing: border-box;
            color: #999999;
            cursor: pointer;
            user-select: none;
          }
          input {
            width: 45px;
            border: 0;
            box-sizing: border-box;
            border-top: 1px solid #d1d1d1;
            border-bottom: 1px solid #d1d1d1;
            text-align: center;
          }
        }
        .btns {
          margin-top: 24px;
          display: flex;
          div {
            width: 150px;
            height: 46px;
            background: #3dc36b;
            color: #fff;
            text-align: center;
            line-height: 46px;
            cursor: pointer;
            margin-right: 19px;
            &.buynow {
              background: @orange;
            }
          }
        }
      }
    }
    aside {
      flex: 1;
      padding-left: 19px;
      box-sizing: border-box;
      h3 {
        font-size: 18px;
        font-weight: 400;
        color: #333333;
        margin-bottom: 20px;
      }
      ul {
        li {
          cursor: pointer;
          margin-bottom: 30px;
          img {
            width: 80px;
            border: 1px solid transparent;
          }
          section {
            width: 110px;
            justify-content: space-around;
            flex-direction: column;
            .title {
              font-family: SourceHanSansSC;
              color: #666666;
            }
            .jifen {
              color: @orange;
              font-size: 18px;
              font-weight: bold;
              justify-content: flex-start;
              align-items: center;
              img {
                width: 30px;
                margin-left: 20px;
              }
            }
          }
          &:hover {
            & > img {
              border-color: @blue;
            }
            section {
              .title {
                color: @blue;
              }
            }
          }
        }
      }
    }
  }

  .tab {
    justify-content: flex-start;
    li {
      width: 120px;
      height: 50px;
      font-weight: bold;
      text-align: center;
      line-height: 50px;
      cursor: pointer;
      &.active {
        background: @blue;
        color: #fff;
      }
    }
  }

  .issue {
    padding-bottom: 20px;
    h4 {
      font-weight: bold;
      margin-top: 10px;
      margin-bottom: 10px;
    }
    p {
      line-height: 2;
    }
  }
}
</style>
<template>
  <div class="details banxin">
    <Breadcrumb />
    <div class="content tanxin">
      <main class="tanxin">
        <div class="main_l">
          <div class="bigImg">
            <img
              width="100%"
              src="http://sc.wolfcode.cn/upload/images/product_images/20201118/e5504529-34e7-4772-a411-30c52a4749a6.jpg"
              alt=""
            />
          </div>
          <ul class="smallImg tanxin">
            <li class="active">
              <img
                width="100%"
                src="http://sc.wolfcode.cn/upload/images/product_images/20201118/e5504529-34e7-4772-a411-30c52a4749a6.jpg"
                alt=""
              />
            </li>
            <li>
              <img
                width="100%"
                src="http://sc.wolfcode.cn/upload/images/product_images/20201118/e5504529-34e7-4772-a411-30c52a4749a6.jpg"
                alt=""
              />
            </li>
            <li>
              <img
                width="100%"
                src="http://sc.wolfcode.cn/upload/images/product_images/20201118/e5504529-34e7-4772-a411-30c52a4749a6.jpg"
                alt=""
              />
            </li>
            <li>
              <img
                width="100%"
                src="http://sc.wolfcode.cn/upload/images/product_images/20201118/e5504529-34e7-4772-a411-30c52a4749a6.jpg"
                alt=""
              />
            </li>
          </ul>
        </div>
        <div class="main_r">
          <h2>叩丁狼定制保温水杯</h2>
          <p>
            持久保温，只能温度测量，有效防止温暖流失。环保杯盖，圆滑杯口，精致杯身，硅胶杯底。
          </p>
          <section>600积分</section>
          <h3>选择颜色</h3>
          <ul>
            <li class="active">爱上科技大厦的</li>
            <li>阿斯顿发送到</li>
            <li>沃尔沃</li>
            <li>1</li>
            <li>123123</li>
          </ul>
          <h3>数量</h3>
          <div class="stepper tanxin">
            <div class="btn jia">+</div>
            <input type="text" value="1" disabled />
            <div class="btn jian">-</div>
          </div>
          <div class="btns">
            <div>加入购物车</div>
            <div class="buynow">立即购买</div>
          </div>
        </div>
      </main>
      <aside></aside>
    </div>
  </div>
</template>
 
<script>
import Breadcrumb from "@/components/Breadcrumb.vue";
export default {
  data() {
    return {};
  },
  components: {
    Breadcrumb,
  },
};
</script>
 
<style lang = "less" scoped>
@import "../assets/base.less";

.content {
  min-height: 560px;
  main {
    width: 970px;
    background: pink;
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
          opacity: 0.7;
          &.active {
            opacity: 1;
          }
        }
      }
    }
    .main_r {
      flex: 1;
      background: tan;
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
    background: skyblue;
  }
}
</style>
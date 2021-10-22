<template>
  <footer>
    <div class="banxin footer_in tanxin">
      <div class="footer_in_l">
        <img src="../assets/images/home/slogan.png" alt="" />
        <p>
          叩丁狼是一家专注于培养高级IT技术人才，为学员提供定制化IT职业规划方案及意见咨询服务的教育科技公司，为您提供海量优质课程，以及创新的线上线下学习体验，帮助您获得全新的个人发展和能力提升。
        </p>
      </div>
      <ul class="footer_in_c">
        <li>
          <a href="javascript:;" @mouseenter="showWx=true" @mouseleave="showWx=false">微信公众号</a>
          <img class="wx" v-show="showWx" src="../assets/images/home/wx.png" alt="">
        </li>
        <li>
          <a href="javascript:;">新浪微博</a>
        </li>
        <li>
          <a href="javascript:;" @mouseenter="showService=true" @mouseleave="showService=false">在线客服</a>
          <img class="service" v-show="showService" src="../assets/images/home/service.png" alt="">
        </li>
      </ul>
      <div class="footer_in_r">
        <p>全国免费咨询热线：</p>
        <h2>020-85628002</h2>
      </div>
    </div>
  </footer>
</template>
 
<script>
export default {
  data() {
    return {
        showWx: false,
        showService: false
    };
  },
};
</script>
 
<style lang = "less" scoped>
@import "../assets/base.less";

footer {
  background: @black;
  color: #7d879a;
  a {
    color: #7d879a;
  }
  .footer_in {
    height: 240px;
    .footer_in_l {
      width: 426px;
      p {
        font-size: 12px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        line-height: 1.4;
      }
      img {
        margin-top: 33px;
        margin-bottom: 27px;
      }
    }
    .footer_in_c {
      display: flex;
      justify-content: center;
      margin-top: 123px;
      li {
        border-right: 1px solid #7d879a;
        padding-right: 18px;
        padding-left: 18px;
        height: 19px;
        position: relative;
        &:last-of-type {
          border: 0;
        }
        a {
          font-size: 16px;
        }
        .wx, .service{
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            top: -110px;
        }
      }
    }
    .footer_in_r {
      padding-top: 92px;
      p {
        font-size: 14px;
        font-family: Microsoft YaHei;
        margin-bottom: 10px;
        color: #7d879a;
      }
      h2 {
        color: #fff;
        font-size: 28px;
        font-weight: bold;
      }
    }
  }
}
</style>
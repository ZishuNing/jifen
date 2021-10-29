<template>
  <div class="cart">
    <table>
      <thead>
        <tr>
          <th width="50"><i class="iconfont icon-yduifuxuankuangxuanzhong"></i></th>
          <th width="300">礼品信息</th>
          <th>兑换分数</th>
          <th>数量</th>
          <th>小计 (鸡腿)</th>
          <th width="100">操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item,index in goodsArr" :key="item.id">
          <!-- 选中icon-yduifuxuankuangxuanzhong   不选中icon-yduifuxuankuang -->
          <td align="center">
            <i @click="oneSelect(index)" :class="item.ischecked ? 'iconfont icon-yduifuxuankuangxuanzhong' : 'iconfont icon-yduifuxuankuang'"></i>
          </td>
          <td>
            <img class="good_img" width="84" :src="'https://sc.wolfcode.cn'+item.coverImg" alt="">
            <section>
              <div class="title ellipse">{{item.title}}</div>
              <div class="desc ellipse">{{item.versionDescription}}</div>
            </section>
          </td>
          <td align="center">{{item.coin}}鸡腿</td>
          <td align="center">
            <div class="step tanxin">
              <div class="btn">-</div>
              <div>{{item.total}}</div>
              <div class="btn">+</div>
            </div>
          </td>
          <td align="center">{{item.totalCost}}鸡腿</td>
          <td align="center">
            <div class="del">删除</div>
          </td>
        </tr>
      </tbody>
    </table>
    <h3>总计：<span>0鸡腿</span></h3>
    <div class="submit">提交</div>
  </div>
</template>
 
<script>
import { CartDataApi } from "@/request/api"
export default {
  data() {
    return {
      goodsArr: []
    }
  },
  created() {
    CartDataApi().then(res => {
      console.log(res.data);
      this.goodsArr = res.data;
      this.goodsArr.forEach(item => {
        item.ischecked = false;   // 给每一项都添加一个ischekced属性，用来让复选框未勾选
      })
    })
  },
  methods: {
    oneSelect(index) {
      this.goodsArr[index].ischecked = true;
      // 数据更新了，视图没更新  数据：复杂数据类型
      //   this.$set()
      this.$forceUpdate();
    }
  }
}
</script>
 
<style lang = "less" scoped>
@import "../../assets/base.less";

.cart {
  table {
    border-collapse: collapse;
    border: 1px solid #ccc;
    width: 100%;
    thead {
      background: #efefef;
      th {
        padding-top: 20px;
        padding-bottom: 20px;
        font-weight: bold;
      }
    }
    i {
      cursor: pointer;
      &.icon-yduifuxuankuangxuanzhong {
        color: @blue;
      }
    }
    tbody {
      tr {
        td {
          padding-top: 20px;
          padding-bottom: 20px;
          vertical-align: middle;
          .good_img {
            float: left;
          }
          section {
            float: left;
            margin-left: 10px;
            padding-top: 20px;
            .title {
              margin-bottom: 20px;
            }
            .desc {
              font-size: 14px;
              color: #666;
            }
          }
          .step {
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
            div {
              width: 45px;
              border: 0;
              height: 30px;
              line-height: 30px;
              box-sizing: border-box;
              border-top: 1px solid #d1d1d1;
              border-bottom: 1px solid #d1d1d1;
              text-align: center;
            }
          }
          .del {
            padding: 5px 10px;
            display: inline;
            border: 1px solid #ccc;
            border-radius: 5px;
            cursor: pointer;
          }
        }
      }
    }
  }
  h3 {
    text-align: right;
    font-size: 20px;
    color: #000;
    margin-top: 20px;
    margin-bottom: 20px;
    span {
      color: @orange;
    }
  }
  .submit {
    background: @blue;
    color: #fff;
    text-align: center;
    line-height: 40px;
    height: 40px;
    width: 100px;
    float: right;
    cursor: pointer;
  }
}
</style>
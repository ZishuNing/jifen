<template>
  <div class="cart">
    <table>
      <thead>
        <tr>
          <th width="50">
            <i
              @click="checkAllFn"
              :class="
                checkAll
                  ? 'iconfont icon-yduifuxuankuangxuanzhong'
                  : 'iconfont icon-yduifuxuankuang'
              "
            ></i>
          </th>
          <th width="300">礼品信息</th>
          <th>兑换分数</th>
          <th>数量</th>
          <th>小计 (鸡腿)</th>
          <th width="100">操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in goodsArr" :key="item.id">
          <!-- 选中icon-yduifuxuankuangxuanzhong   不选中icon-yduifuxuankuang -->
          <td align="center">
            <i
              @click="oneSelect(index)"
              :class="
                item.ischecked
                  ? 'iconfont icon-yduifuxuankuangxuanzhong'
                  : 'iconfont icon-yduifuxuankuang'
              "
            ></i>
          </td>
          <td>
            <img
              class="good_img"
              width="84"
              v-lazy="'https://sc.wolfcode.cn' + item.coverImg"
              alt=""
            />
            <section>
              <div class="title ellipse">{{ item.title }}</div>
              <div class="desc ellipse">{{ item.versionDescription }}</div>
            </section>
          </td>
          <td align="center">{{ item.coin }}鸡腿</td>
          <td align="center">
            <div class="step tanxin">
              <div class="btn" @click="cutFn(index)">-</div>
              <div>{{ item.total }}</div>
              <div class="btn" @click="addFn(index)">+</div>
            </div>
          </td>
          <td align="center">{{ item.totalCost }}鸡腿</td>
          <td align="center">
            <div class="del" @click="delFn(index, item.id)">删除</div>
          </td>
        </tr>
      </tbody>
    </table>
    <h3>
      总计：<span>{{ allMoney }}鸡腿</span>
    </h3>
    <div class="submit" @click="submitFn">提交</div>
  </div>
</template>
 
<script>
import { CartDataApi, CartDelApi } from "@/request/api";
export default {
  data() {
    return {
      goodsArr: [],
      // 全选的状态
      checkAll: false,
      // 总价
      allMoney: 0,
    };
  },
  created() {
    CartDataApi().then((res) => {
      this.goodsArr = res.data;
      this.goodsArr.forEach((item) => {
        item.ischecked = false; // 给每一项都添加一个ischekced属性，用来让复选框未勾选
      });
    });
  },
  methods: {
    // 单项点击
    oneSelect(index) {
      this.goodsArr[index].ischecked = !this.goodsArr[index].ischecked;
      // 数据更新了，视图没更新  数据：复杂数据类型
      //   this.$set()
      let sum = 0;
      this.goodsArr.map((item) => {
        if (item.ischecked) {
          sum++;
        }
      });

      // 修改全选的状态
      this.checkAll = sum >= this.goodsArr.length;

      this.countMoney(); // 计算总价

      this.$forceUpdate();
    },
    // 全选按钮点击
    checkAllFn() {
      this.checkAll = !this.checkAll;

      this.goodsArr.map((item) => {
        item.ischecked = this.checkAll;
      });

      this.countMoney(); // 计算总价
    },
    // 计算总价
    countMoney() {
      this.allMoney = 0; // 归零
      this.goodsArr.map((item) => {
        if (item.ischecked) {
          this.allMoney += item.totalCost; // 计算总价
        }
      });
    },
    // 步进器+
    addFn(index) {
      this.goodsArr[index].total++;
      this.goodsArr[index].totalCost =
        this.goodsArr[index].coin * this.goodsArr[index].total;
      this.countMoney(); // 计算总价
    },
    // 步进器-
    cutFn(index) {
      if (this.goodsArr[index].total <= 1) {
        return;
      }
      this.goodsArr[index].total--;
      this.countMoney(); // 计算总价
    },
    // 删除
    delFn(index, id) {
      this.goodsArr.splice(index, 1);
      this.countMoney(); // 计算总价

      CartDelApi({
        id,
      }).then((res) => {
        if (res.code === 0) {
          let obj = { content: "删除成功", icon: "success" };
          this.$store.dispatch("toastAsync", obj);
        }
      });
    },
    // 提交按钮
    submitFn() {
      let obj = { content: "该功能暂未开放", icon: "info" };
      this.$store.dispatch("toastAsync", obj);
    },
  },
};
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
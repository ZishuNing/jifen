<template>
  <div>
    <slot :samllarr="samllarr"></slot>
    <p v-if="samllarr.length<bigarr.length" style="line-height: 2;text-align: center;">玩命加载中...</p>
    <p v-else style="line-height: 2;text-align: center;">已经到底了~</p>
  </div>
</template>
 
<script>
let timer = null;  // 定时器名称
export default {
  data() {
    return {
      // samllarr代表处理过后要分发出去的数组
      samllarr: [],
      // 切割的起始索引值
      pageIndex: 0
    };
  },
  // bigarr代表原来的大数组
  props: ["bigarr", "size"],
  // 监听大数组
  watch: {
    bigarr: {
      handler(n, o) {
        this.sliceArrFn();
      },
      deep: true,
    },
  },
  created() {
    /* 
        slice和splice的区别
        slice(start, end)  不包含end - 下标
        splice(start, length) start起始索引值
      */
  },
  mounted() {
    // 渲染完成，监听window滚动事件
    window.addEventListener('scroll', this.scrollFn);
  },
  destroyed() {
    // 离开页面时，要移除监听
    window.removeEventListener('scroll', this.scrollFn);
  },
  methods: {
    // 处理数组的事件
    sliceArrFn() {
      let _this = this;
      // 如果bigarr多于8项，切割数组，如果少于8项，直接赋值
      if (this.bigarr.length >= this.size * (this.pageIndex + 1)) {
        // this.smallarr  [1,2,3]   [4,5,6]
        // 合并切割出来的数组，不是直接赋值 [0,8)  [8,16)  [16,24)  [index*8, length+8)
        let myarr = this.bigarr.slice(this.pageIndex * this.size, this.samllarr.length + this.size);
        myarr.forEach(item => {
          // this.smallarr[this.samllarr.length] = item;
          _this.$set(_this.samllarr, _this.samllarr.length, item);
        })

        // this.samllarr.concat(myarr);
        // 数据更新，视图没更新
        // this.$forceUpdate();
        // vue是无法检测复杂数据类型的更新的
        /* 
            // 对象this.obj
            this.obj.key = value;  ×
            this.$set(this.obj, key, value)

            // 数组this.arr
            this.arr[index] = value;  ×
            this.$set(this.arr, index, value)

            假设myarr=[4,5,6]   smallarr=[1,2,3] -> [1,2,3,4,5,6]
            要使用this.$set实现两个数组合并

            this.smallarr[this.smallarr.length] = myarr[0];      ->    [1,2,3,4]
            this.smallarr[this.smallarr.length] = myarr[1];      ->    [1,2,3,4,5]
            this.smallarr[this.smallarr.length] = myarr[2];      ->    [1,2,3,4,5,6]

            // 根据myarr到底有多少项，来决定以上这个代码操作多少次  （for循环）
            myarr.forEach((item,index)=>{
                this.smallarr[this.smallarr.length] = item;
            })
        */
      } else {
        this.samllarr = this.bigarr;
      }
    },
    // 滚动事件
    scrollFn() {

      if (timer) {
        clearTimeout(timer)
      }

      // 函数截流
      timer = setTimeout(() => {
        //获取滚动时的高度
        let st = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
        // 浏览器窗口（文档）的可视高度(windowHeight)：（就是你肉眼可见的那部分全屏高度）
        let winHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
        // 文档的真实高度(documentHeight)：
        let docHeight = document.documentElement.scrollHeight || document.body.scrollHeight;

        //scrollTop + winHeight >= docHeight 代表触底了 
        if (st + winHeight >= docHeight) {
          this.pageIndex++;     // 加载后续的8项
          // 当小数组的长度等于大数组长度，那么就滚动彻底结束
          if (this.samllarr.length >= this.bigarr.length) {
            // 停止定时器
            clearTimeout(timer);
            // 彻底让滚动监听结束
            window.removeEventListener('scroll', this.scrollFn);
            return; // 阻止它再去切割数组
          }
          this.sliceArrFn();    // 调用切割数组的方法
        }
      }, 500)

    }
  }
};
</script>
 
<style lang = "less" scoped>
</style>
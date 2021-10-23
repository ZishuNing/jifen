<template>
  <div class="toast tanxin">
      <i :class="['iconfont', $store.state.toast.icon]"></i>
      <section>{{$store.state.toast.content}}</section>
  </div>
</template>
 
<script>
export default {
  data() {
    return {};
  },
};
</script>
 
<style lang = "less" scoped>
@import "../assets/base.less";
.toast{
    padding: 10px 20px;
    background: #fff;
    align-items: center;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: 0;
    border-radius: 5px;
    box-shadow: 0 0 10px pink;
    section{
        margin-left: 10px;
    }
}

.icon-toast_chenggong{
    color: green;
}

.icon-toast-jinggao{
    color: orange;
}

.icon-toast-shibai_huaban{
    color: red;
}

.icon-loading{
    color: blue;
}
</style>
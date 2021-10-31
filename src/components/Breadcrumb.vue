<template>
  <ul class="bread">
    <li v-for="item,index in breadArr" :key="index"><span>{{item}}</span> <i>/</i></li>
  </ul>
</template>
 
<script>
export default {
  data() {
    return {};
  },
  props: ["breadArr"]
};
</script>
 
<style lang = "less" scoped>
.bread{
  display: flex;
  padding: 15px 0;
  li{
    font-size: 16px;
    i{
      margin-right: 5px;
    }
    &:last-of-type{
      i{
        display: none;
      }
    }
    &:first-of-type{
      span{
        font-weight: bold;
      }
    }
  }
}
</style>
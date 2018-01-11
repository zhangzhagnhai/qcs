<template>
   <div style="font-size: 0">
      <img src="/static/vipIntroduce.jpg" style="width: 7.5rem">
      <div style="height: 0.9rem"></div>
      <router-link to="vipSubmit" tag="div" class="addVIP">加入会员</router-link>
   </div>
</template>
<script>
    export default {
        data() {
            return {}
        },
        methods: {},
        components: {}
    }
</script>
<style scoped="">
  .addVIP{position:fixed; bottom:0; width:7.5rem; height: 0.9rem;line-height:0.88rem; font-size: 0.36rem; color: white; text-align: center; background:url("../../../static/gudinganniu.png");}
</style>

<template>
  <div>
      <div class="des">
         <div>
           <img src="static/gou.png"/>
           <span>恭喜您成为氢苗会员</span>
         </div>
      </div>
      <div class="gn">您可享用氢苗会员八大权益!</div>
      <router-link :to="{name:'memberEdit'}" tag="div" class="wshy">完善会员信息</router-link>
      <router-link :to="{name:'cityMenu',query: {typeMenu: 3}}" tag="div" class="ck">查看氢创圈</router-link>
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
   .des{margin-top:2.04rem; height: 0.7rem; line-height: 0.7rem;  text-align: center}
   .des div{display: inline-block; }
   .des img{height: 0.7rem; float: left}
   .des span{float: left; margin-left: 0.25rem; font-size: 0.48rem;   color: #464c56}
   .gn{margin-top:0.62rem; height:0.36rem; font-size:0.36rem; line-height:0.36rem; color:#6c747c; text-align: center}
   .wshy{margin:5.4rem auto 0; width: 3.25rem; height: 0.7rem; font-size: 0.36rem; line-height: 0.7rem; text-align: center; border: 0.5px solid #4285f4; color:#4285f4; border-radius: 3px;}
   .ck{font-size: 0.28rem; line-height: 1.08rem; color: #969fa9; text-align: center;}
</style>


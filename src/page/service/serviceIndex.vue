<template>
  <div style="background-color: #f7f7f7; bottom: 0; top:0">
    <div v-title data-title="服务中心">
      服务中心
    </div>
    <div class="serviceContainer">
       <div class="serviceContain">
         <img src="../../assets/images/zhaozijin.png">
         <h1>找资金</h1>
         <h2>让你的好项目不会</h2>
         <h2>缺失在资金短缺上</h2>
         <router-link to="investorList" class="anniu">免费查找</router-link>
       </div>
        <div class="serviceContain">
          <img src="../../assets/images/zhiku.png">
          <h1>智库</h1>
          <h2>节约你宝贵时间</h2>
          <h2>帮你解决专业难题</h2>
          <router-link to="thinkList" class="anniu">马上解决</router-link>
        </div>
    </div>
 <!--   <addresss></addresss>-->
    <foot select="2"></foot>
  </div>
</template>
<script>
  import foot from '../../components/Foot'
  export default{
    data(){
        return{
          templateId:""
        }
    },mounted(){
      this.templateId=this.$route.query.templateId;
      var href=location.href.split('#')[0]+"#serviceIndex?templateId="+this.templateId;
      JSDK.setShare({
        title:"氢创同城丨服务",
        desc:"让项目资本资源，精准对接。给得再多，不如懂你！",
        imgUrl:window.fenshe.fenshe_logo,
        href:href
      });
    },
    components: {
      foot
    }
  }
</script>
<style scoped>
   .serviceContainer{padding: 0.3rem 0.11rem; font-size: 0; display: inline-block;}
   .serviceContain{float: left; background-color: white; width: 3.34rem; height: 3.8rem; border-radius: 5px; margin:0 0.15rem; }
   .serviceContain img{margin:0.4rem auto 0.3rem; height: 0.75rem;  display: block;}
   h1{font-size: 0.34rem; font-weight: normal; color: #464c56; height: 0.34rem; line-height: 0.34rem; text-align: center;margin-bottom: 0.22rem}
   h2{font-size: 0.26rem; font-weight: normal; color: #969fa9; height: 0.41rem; line-height: 0.41rem; text-align: center; }
   .anniu{margin:0.05rem auto; padding-top: 0.03rem; height:0.76rem; line-height:0.76rem; font-size: 0.26rem;  width:1.76rem; color: white; text-align: center; background: url(../../assets/images/anniu.png); background-size: cover;}
</style>

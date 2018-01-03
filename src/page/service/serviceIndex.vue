<template>
  <div style="background-color: #f7f7f7; bottom: 0; top:0">
    <div v-title data-title="服务中心">
      服务中心
    </div>
    <router-link to="investorList" class="serviceContainer">
       <div class="serviceContain">
          <div style="height:0.56rem;margin-top: 0.49rem">
            <img src="static/zhaozijin.png" />
            <h1>找资金</h1>
          </div>
          <h2>让你的好项目不会缺失在资金短缺上</h2>
       </div>
       <div style="width: 1.76rem; height:2rem;  float: left;">
          <div class="anniu">免费查找</div>
       </div>
    </router-link>
    <router-link to="thinkList" class="serviceContainer">
      <div class="serviceContain">
        <div style="height:0.56rem;margin-top: 0.49rem">
          <img src="static/zhiku.png" />
          <h1>智库</h1>
        </div>
        <h2>节约你宝贵时间帮你解决专业难题</h2>
      </div>
      <div style="width: 1.76rem; height:2rem;  float: left;">
        <div class="anniu">马上解决</div>
      </div>
    </router-link>

    <img src="static/ditu.png" style="margin: 1.36rem auto 0; display: block; width: 6.98rem;">
    <foot select="2"></foot>
  </div>
</template>
<script>
  import foot from '../../components/Foot'
  import {host,shareHref} from '../../assets/js/util'
  export default{
    data(){
        return{
          templateId:""
        }
    },mounted(){
      this.templateId=this.$route.query.templateId;
      var href=shareHref+"#serviceIndex?templateId="+this.templateId;
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
   .serviceContainer{height:2rem; width: 6.98rem; margin: 0.3rem auto 0; background-color: white; border-radius: 3px;}
   .serviceContain{width: 4.7rem; height:2rem;  float: left; margin-left: 0.3rem;}
   .serviceContain img{height: 0.56rem; width: 0.56rem; float: left;}
   h1{margin-left:0.15rem; font-size: 0.34rem; color: #464c56;height: 0.56rem; line-height:0.56rem;float: left}
   h2{font-size: 0.28rem; font-weight: normal; color: #969fa9; height: 0.28rem; line-height: 0.28rem; margin-top: 0.2rem;}
   .anniu{margin:0.62rem auto; padding-top: 0.03rem; height:0.76rem; line-height:0.76rem; font-size: 0.26rem;  width:1.76rem; color: white; text-align: center; background: url(../../assets/images/anniu.png); background-size: cover;}
</style>

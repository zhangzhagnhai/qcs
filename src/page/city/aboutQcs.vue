<template>
  <div>
    <div v-if="!otherQcs" class="fsNav">
      <div class="fsNavs">
        <div :class="select==1?'select':''" @click="select=1">分社</div>
        <div :class="select==2?'select':''" @click="select=2">氢创同城</div>
      </div>
    </div>

    <div v-if="select==1">
      <div class="mainFS">
        <img class="mainFSImg" :src="aboutQcs.fenshe_logo">
        <div class="mainFSFontContain">
          <div class="mainFSName">{{aboutQcs.name}}</div>
          <div class="mainFsArea">{{aboutQcs.province_str+" "+aboutQcs.city_str+" "+ aboutQcs.county_str}}</div>
        </div>
      </div>

      <!--分社简介-->
      <div class="cutLineFont">分社简介</div>
      <pre class="companyContentx">{{aboutQcs.introduce}}</pre>
      <!--联系方式-->
      <div class="cutLineFont">联系方式</div>
      <div>
        <a class="contact" :href="'tel:'+aboutQcs.mobile">
          <img src="../../assets/images/dianhua.png" class="contactImg">
          <div class="contactIntroduce">电话<span style="visibility: hidden">号</span></div>
          <div class="contactFont">{{aboutQcs.mobile?aboutQcs.mobile:'无'}}</div>
        </a>
        <div class="smallLine"></div>
        <div class="contact">
          <img src="../../assets/images/youxiang.png" class="contactImg">
          <div class="contactIntroduce">邮箱<span style="visibility: hidden">号</span></div>
          <div class="contactFont">{{aboutQcs.email?aboutQcs.email:'无'}}</div>
        </div>
        <div class="smallLine"></div>
        <div class="contact">
          <img src="../../assets/images/dizhi.png" class="contactImg">
          <div class="contactIntroduce">地址<span style="visibility: hidden">号</span></div>
          <div class="contactFont">{{aboutQcs.address?aboutQcs.address:'无'}}</div>
        </div>
        <div class="smallLine"></div>
        <div class="contact">
          <img src="../../assets/images/wanhzhi.png" class="contactImg">
          <div class="contactIntroduce">公众号</div>
          <div class="contactFont">{{aboutQcs.mp_name?aboutQcs.mp_name:'无'}}</div>
        </div>
      </div>
      <!--其他分社-->
      <div v-if="!otherQcs">
        <div class="cutLineFont">其他分社</div>
        <router-link :to="{name:'aboutDetail',query:{id:fs.id}}" key="fs.id" v-for="(fs,index) in aboutQcs.fensheList">
          <div class="mainFS">
            <img class="mainFSImg" :src="fs.fenshe_logo">
            <div class="mainFSFontContain">
              <div class="elseFsName">{{fs.name}}</div>
              <div class="mainFsArea">{{fs.address}}</div>
            </div>
          </div>
          <div v-if="index!=aboutQcs.fensheList.length-1" class="smallLine"></div>
        </router-link>
      </div>

    </div>

    <div v-if="select==2">
        <div class="template" v-html="aboutQcs.center.company_info" style="font-size: 0.3rem;">
        </div>

        <router-link to="addQcs" class="addButton">加入氢创同城</router-link>
    </div>


  </div>
</template>
<script>
  export default {
    data () {
      return {
        select:1
      }
    },created(){
      if(this.otherQcs){
        this.select=1;
      }
    },
    props: ['aboutQcs','otherQcs']
  }
</script>
<style src="../../assets/css/connectionDetail.css" scoped></style>
<style scoped>
  .fsNav{height: 0.88rem; background-color: #f7f7f7}
  .fsNavs{height: 0.58rem; width: 7rem; border: 1px solid #4285F4; border-radius: 3px; margin: 0 auto; overflow: hidden}
  .fsNavs div{width: 3.5rem; height: 0.58rem; line-height:0.58rem; float: left; text-align: center; font-size: 0.28rem;background-color:white; color:#4285F4;}
  .fsNavs .select{background-color:#4285F4; color:white;}
  .mainFS{height: 1.2rem; padding: 0.3rem 0.26rem; font-size: 0}
  .mainFSImg{width: 1.2rem; height: 1.2rem; float: left; border-radius: 3px}
  .mainFSFontContain{height: 1.2rem; width:5.48rem; float: left; margin-left: 0.3rem;}
  .mainFSName{height: 0.76rem; line-height: 0.76rem; font-size: 0.36rem; color: #464c56}
  .mainFsArea{height: 0.36rem; line-height: 0.36rem;font-size: 0.26rem; color: #6c747c; overflow: hidden;}
  .elseFsName{margin-top:0.02rem; height: 0.76rem; line-height: 0.76rem;font-size: 0.32rem; color: #464c56}

  .contactFont{overflow: hidden;max-width: 5rem; white-space:nowrap;}
  .smallLine{margin-left: 0.26rem; width: 7.24rem}
  .addButton{width: 6.5rem; height: 0.84rem; line-height: 0.84rem; text-align: center; margin: 1rem auto; font-size: 0.36rem; color: white; background-color:#4285F4; border-radius: 3px; }
</style>

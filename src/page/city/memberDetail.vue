<template>
  <div style="font-size: 0;">
      <div v-title :data-title="companyDetail.name">
        {{companyDetail.name}}
      </div>
      <member :connection=companyDetail></member>
      <!--单位简介-->
      <div class="cutLineFont">单位简介</div>
      <pre class="companyContentx">{{companyDetail.company_introduce}}</pre>
      <!--产品与服务-->
      <div class="cutLineFont">产品与服务</div>
      <div v-if="companyDetail.products.length==0">
        <img src="static/b.png" style="width: 2.91rem" class="noDataImg">
        <div class="noDataFont">暂时还没有产品与服务~</div>
      </div>
      <ul class="productList">
         <li v-for="product in companyDetail.products">
            <img :src="product.image">
            <div>{{product.title}}</div>
         </li>
      </ul>
      <!--联系方式-->
      <div v-if="isVip">
        <div class="cutLineFont">联系方式</div>
        <div>
          <a class="contact" :href="'tel:'+companyDetail.mobile">
            <img src="../../assets/images/dianhua.png" class="contactImg">
            <div class="contactIntroduce">电话</div>
            <div class="contactFont">{{companyDetail.mobile?companyDetail.mobile:'无'}}</div>
          </a>
          <div class="smallLine"></div>
          <div class="contact">
            <img src="../../assets/images/youxiang.png" class="contactImg">
            <div class="contactIntroduce">邮箱</div>
            <div class="contactFont">{{companyDetail.email?companyDetail.email:'无'}}</div>
          </div>
          <div class="smallLine"></div>
          <div class="contact">
            <img src="../../assets/images/dizhi.png" class="contactImg">
            <div class="contactIntroduce">地址</div>
            <div class="contactFont">{{companyDetail.location?companyDetail.location:'无'}}</div>
          </div>
          <div class="smallLine"></div>
          <div class="contact">
            <img src="../../assets/images/wanhzhi.png" class="contactImg">
            <div class="contactIntroduce">网址</div>
            <div class="contactFont">{{companyDetail.website?companyDetail.website:'无'}}</div>
          </div>
        </div>
      </div>
      <div v-if="!isVip">
        <div class="cutLineFont">更多信息</div>
        <p class="more">与智者同行,与高人为伍<br>加入氢创会员,对接精准人脉</p>
        <router-link to="vipIntroduce" class="add">加入氢创圈</router-link>
      </div>

      <!--对话-->
      <div v-if="showSubmit&&companyDetail.user_id" class="defaultSubmit"></div>
      <div v-if="showSubmit&&companyDetail.user_id" class="submitButton" @click="showTalk=true">沟通</div>


      <talk @setTalk="setTalk" :showTalk="showTalk" :id='uid' :hasTalked="companyDetail.hasTalked"></talk>
  </div>
</template>
<script>
  import member from '../../components/member.vue'
  import {host} from '../../assets/js/util'
  import talk from '../../components/talk'
  export default {
    data () {
      return {
        companyDetail: {
          products:[]
         },
        talkString:"",
        showSubmit:true,
        showTalk:false,
        showMengCeng:false,
        uid:'',
        templateId:"",
        isVip:false
      }
    },created(){
      this.id=this.$route.query.id;
    },methods:{
      getData(){
        var _this=this;
        var href=location.href.split('#')[0]+"#connectionDetail?id="+this.id+"&templateId="+this.templateId;
        _this.$emit("loading",true);
        $.getJSON(host+"/city/relationshipDetail",{id:this.id}).then(function (response) {
          _this.uid=response.relationship.user_id;
          _this.companyDetail =response.relationship;
          _this.$emit("loading",false);
          _czc.push(["_trackPageview",response.relationship.name]);
          JSDK.setShare({
            title:response.relationship.name,
            desc:"每一段成功的背后，总是因为他们做对了什么。氢创创投，领航成功！",
            imgUrl:response.relationship.image,
            href:href
          });
        })

        $.getJSON(host+"/center/centerRelationshipType",{id:this.id}).then(function (response) {
          _this.isVip=(response.typeCode!=0);
          _this.$emit("loading",false);
        })
      },setTalk(){
        this.showTalk=false;
        this.companyDetail.hasTalked=true;
      }
    }, components:{
      member,
      talk
    },mounted(){
      this.id=this.$route.query.id;
      this.templateId=this.$route.query.templateId;
      if(localStorage.getItem("userId")!=this.id){
        this.showSubmit=true;
      }else{
        this.showSubmit=false;
      }
      this.getData();
    }
  }
</script>
<style src="../../assets/css/connectionDetail.css" scoped></style>
<style scoped>
  .smallLine{margin-left: 0.26rem; width: 7.24rem}
  .contactFont{overflow: hidden; max-width: 5rem;}
  .more{margin-top:0.82rem; color:#999999; font-size: 0.3rem;line-height: 0.45rem; text-align: center}
  .add{background:url("../../../static/anniu.png"); background-size:cover; margin: 0.5rem auto; text-align:center; font-size: 0.3rem; color: white; width: 2.5rem; height: 0.7rem; line-height: 0.7rem; border-radius: 15px; }
</style>

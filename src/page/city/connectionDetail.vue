<template>
  <div style="font-size: 0;">
      <div v-title :data-title="companyDetail.name">
        {{companyDetail.name}}
      </div>
      <connection :connection=companyDetail></connection>
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
      <!--对话-->
      <div v-if="showSubmit&&companyDetail.user_id" class="defaultSubmit"></div>
      <div v-if="showSubmit&&companyDetail.user_id" class="submitButton" @click="showTalk=true">沟通</div>


      <talk @setTalk="setTalk" :showTalk="showTalk" :id='uid' :hasTalked="companyDetail.hasTalked"></talk>
  </div>
</template>
<script>
  import connection from '../../components/connection'
  import {host,shareHref} from '../../assets/js/util'
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
        templateId:""
      }
    },created(){
      this.id=this.$route.query.id;
    },methods:{
      getData(){
        var _this=this;
        var href=shareHref+"#connectionDetail?id="+this.id+"&templateId="+this.templateId;
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
      },setTalk(){
        this.showTalk=false;
        this.companyDetail.hasTalked=true;
      }
    }, components:{
      connection,
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
</style>

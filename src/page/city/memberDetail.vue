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
      <div v-if="isVip==0">
        <div class="cutLineFont">更多信息</div>
        <p class="more">与智者同行,与高人为伍<br>加入氢创会员,对接精准人脉</p>
        <router-link to="vipIntroduce" class="add">成为氢苗会员</router-link>
      </div>

      <div v-if="isVip==1">
        <div class="cutLineFont">更多信息</div>
        <p class="more">与智者同行,与高人为伍<br>加入氢创会员,对接精准人脉</p>
        <div class="add" @click="pay">成为氢苗会员</div>
      </div>

      <div v-if="isVip==2">
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
      <!--对话-->
      <div v-if="showSubmit&&companyDetail.user_id" class="defaultSubmit"></div>
      <div v-if="showSubmit&&companyDetail.user_id" class="submitButton" @click="showTalk=true">沟通</div>


      <talk @setTalk="setTalk" :showTalk="showTalk" :id='uid' :hasTalked="companyDetail.hasTalked"></talk>
  </div>
</template>
<script>
  import member from '../../components/member.vue'
  import {host,shareHref} from '../../assets/js/util'
  import talk from '../../components/talk'
  import wx from 'weixin-js-sdk'
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
        var href=shareHref+"#memberDetail?id="+this.id+"&templateId="+this.templateId;
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
          _this.isVip=response.typeCode;
          _this.$emit("loading",false);
        })
      },setTalk(){
        this.showTalk=false;
        this.companyDetail.hasTalked=true;
      },
      pay(){
        var _this=this;
        $.post(host+"/pay/relationship").then(function (res) {
          if(res.responese.code==1){
            var data = res.responese.config;
            wx.chooseWXPay({
              timestamp: data.timestamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
              nonceStr: data.nonceStr, // 支付签名随机串，不长于 32 位
              package: data.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
              signType:data.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
              paySign:data.paySign, // 支付签名
              success: function (e) {
                _this.$router.push({name:"vipSuccess"})
              }
            });
          }else{
            Overlay.show(res.responese.msg, 2000);
          }
        })
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

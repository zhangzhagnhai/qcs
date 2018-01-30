<template>
   <div style="font-size: 0">
     <div v-title data-title="加入会员">
       加入会员
     </div>

     <img src="static/vipIntroduce.jpg" style="width: 7.5rem">
      <div v-if="showButton" style="height: 0.9rem"></div>
      <router-link v-if="typeCode==0" to="vipSubmit" tag="div" class="addVIP">加入会员</router-link>
      <div v-if="typeCode==1" class="addVIP" @click="pay">升级</div>
   </div>
</template>
<script>
   import {host,shareHref} from '../../assets/js/util'
   import wx from 'weixin-js-sdk'
    export default {
        data() {
            return {
              showButton:false,
              typeCode:1
            }
        },
       mounted(){
         this.templateId = this.$route.query.templateId;
         this.getData();
       },
        methods: {
          getData(){
            var _this=this;
            var href=shareHref+"#vipIntroduce?templateId="+this.templateId;
            _this.$emit("loading",true);
            $.getJSON(host+"/center/centerRelationshipType").then(function (response) {
              _this.showButton=(response.typeCode==0||response.typeCode==1);
              _this.typeCode=response.typeCode
              _this.$emit("loading",false);
              JSDK.setShare({
                title:'加入氢创圈',
                desc:"世界上本没有圈，志同道合的人多了，便有了圈。",
                imgUrl:window.fenshe.fenshe_logo,
                href:href
              });
            })
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
        },
        components: {
        }
    }
</script>
<style scoped="">
  .addVIP{position:fixed; bottom:0; width:7.5rem; height: 0.9rem;line-height:0.88rem; font-size: 0.36rem; color: white; text-align: center; background:url("../../../static/gudinganniu.png");}
</style>

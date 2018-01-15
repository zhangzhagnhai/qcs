<template>
  <div>
    <div v-title data-title="提交会员信息">
      提交会员信息
    </div>

    <div>
      <div class="connectionInfo">
        <div class="connectionName">姓名:</div>
        <input type="text" placeholder="请输入你的姓名" v-model="userInfo.name">
      </div>
      <div class="connectionInfo">
        <div class="connectionName">性别:</div>
        <img class="sexImg" @click="userInfo.sex=1" :src="userInfo.sex==1?'static/biaodanxuanzhong.png':'static/biaodanweixuanzhong.png'"/>
        <span class="sexSpan" @click="userInfo.sex=1">先生</span>
        <img class="sexImg" @click="userInfo.sex=2" :src="userInfo.sex==2?'static/biaodanxuanzhong.png':'static/biaodanweixuanzhong.png'" style="margin-left: 0.5rem"/>
        <span class="sexSpan" @click="userInfo.sex=2">女士</span>
      </div>
      <div class="smallLine"></div>
      <div class="connectionInfo">
        <div class="connectionName">电话:</div>
        <input type="text" placeholder="请输入你的联系电话" v-model="userInfo.mobile">
      </div>
      <div class="smallLine"></div>
      <div class="connectionInfo">
        <div class="connectionName">单位名称:</div>
        <input type="text" placeholder="请输入你的公司名称" v-model="userInfo.company">
      </div>
      <div class="smallLine"></div>
      <div class="connectionInfo">
        <div class="connectionName">职位:</div>
        <input type="text" placeholder="请输入你的职位" v-model="userInfo.job">
      </div>
      <div class="smallLine"></div>
      <div class="type">
        <div class="connectionName">会员类型:</div>
        <ul>
           <li><img class="sexImg" @click="userInfo.type=1" :src="userInfo.type==1?'static/biaodanxuanzhong.png':'static/biaodanweixuanzhong.png'"/> <span @click="userInfo.type=1" class="sexSpan">氢芽会员</span></li>
           <li><img class="sexImg" @click="userInfo.type=2" :src="userInfo.type==2?'static/biaodanxuanzhong.png':'static/biaodanweixuanzhong.png'"/> <span @click="userInfo.type=2" class="sexSpan">氢苗会员</span></li>
           <li><img class="sexImg" src="static/biaodanbukexuanzeannui.png"/> <span class="sexSpan">氢松会员<span style="font-size: 0.21rem; margin-left: 0.1rem">(线上申请未开发)</span></span></li>
        </ul>
      </div>
      <div class="smallLine"></div>
      <div class="rules">
        <img class="sexImg" @click="agree=(agree+1)%2" :src="agree==1?'static/biaodanxuanzhong.png':'static/biaodanweixuanzhong.png'"/>
        <span class="agree">我已同意<router-link :to="{name:'vipRules'}" tag="span">《会员章程》</router-link>
          和<router-link :to="{name:'vipRules'}" tag="span">《保密合同》</router-link></span>
      </div>
    </div>

    <div class="defaultSubmit"></div>
    <div class="submitButton" @click="submit">提交</div>
    <prevRegister  v-if="!mobile"></prevRegister>

   <!-- <vipRules  class="ht"></vipRules>-->
  </div>
</template>
<script>
  import {host} from '../../assets/js/util'
  import prevRegister from '../../components/prevRegister'
  import vipRules from '../vip/vipRules.vue'
  import wx from 'weixin-js-sdk'
  export default {
    data(){
      return {
        userInfo:{
          name:'',
          sex:1,
          type:1,
          mobile:'',
          company:'',
          job:''
        },
        agree:1,
        isVip:false,
        showRule:false,
        mobile:false
      }
    },mounted(){
      this.templateId = this.$route.query.templateId;
      this.getData();
    },methods:{
      submit(){
        var _this=this;
        if(this.isVip){
          //会员不处理
        }else if(this.agree!=1){
          Overlay.show("请先阅读会员章程和保密合同");
        }else{
          /*表单校验*/
          if(!this.userInfo.name){
            Overlay.show("请输入你的名称");
            return;
          }

          var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
          if((this.userInfo.mobile)&&!myreg.test(this.userInfo.mobile)){
            Overlay.show("请输入正确的手机号");
            return;
          }

          $.post(host+"/city/relationshipApply", this.userInfo).then(function (response) {
              if(response.code==1){
                if(_this.userInfo.type==1){
                  _this.$router.push({name:"vipSuccess"})
                }else if(_this.userInfo.type==2){
                  $.post(host+"/pay/relationship", this.userInfo).then(function (res) {
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
              }else{
                Overlay.show(response.msg);
              }
          })
        }
      },
      getData(){
        var _this=this;
        _this.$emit("loading",true);
        $.getJSON(host + "/wx/getUserInfoByUid").then(function (res) {
          _this.mobile=res.mobile;
        })

        $.getJSON(host+"/center/centerRelationshipType").then(function (response) {
          if(response.typeCode!=0){
            Overlay.show("您已经是会员，无需申请")
            _this.isVip=true
            setTimeout(function () {
              _this.$router.push({name: 'personCenter'});
            },2000)
          }
          _this.$emit("loading",false);
        })

        $.getJSON(host+"/center/centerIndex").then(function (response) {
          _this.userInfo.mobile=response.user.mobile;
        })
      }
    },
    components:{
      prevRegister,
      vipRules
    }
  }
</script>
<style src="../../assets/css/connectionEdit.css" scoped></style>
<style scoped>
  .sexImg{float: left; height: 0.22rem;}
  .sexSpan{float: left;font-size: 0.3rem; color: #6c747c; margin-left: 0.1rem}
  .type{  height: 2.06rem}
  .type .connectionName{float: left; line-height: 0.88rem;}
   ul{float: left; margin-top: 0.18rem;}
   li{width: 4.94rem; height: 0.55rem;  display: -moz-flex;  display: -webkit-flex;  -webkit-box-align: center;  -ms-flex-align: center;  align-items: center;  -webkit-align-items: center;  }
  .rules{height: 0.22rem;line-height: 0.22rem;margin-top:0.4rem;}
  .rules img{ margin-left: 0.26rem}
  .agree{float: left; font-size: 0.22rem; margin-left: 0.1rem; color: #969fa9}
  .agree span{color: #4285F4}

  .ht{position: absolute; top:0; background-color: white; width: 100%; z-index: 99999 }
</style>

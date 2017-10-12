<template>
  <div>
    <div v-title :data-title="active.title">
      {{active.title}}
    </div>

    <div class="logoImg" :style="{backgroundImage:'url('+active.image+')'}"></div>
    <div class="projectName">{{active.title}}</div>
    <p class="summary">{{active.summary}}</p>
    <div style="padding:0 0 0 0.3rem;">
      <div class="activeInfo">时间：{{active.start_time | formatDate}} 至 {{active.end_time | formatDate}}</div>
      <div class="activeInfo">地址：{{active.province_str+active.city_str+active.county_str}}</div>
      <div class="activeInfo">人数：已报名<span id="bm">{{active.sign_count}}</span>人 / <span v-if="active.people_num==99999">不限</span><span v-if="active.people_num!=99999">限<span id="bmTotal">{{active.people_num}}</span>人</span></div>
      <div class="activeInfo">价格：<span style="color:#4285F4;">￥{{active.price}}</span></div>

      <div class="projectMeetingTop" style="margin-bottom: 0.1rem" >
        <img :src=active.fenshe.fenshe_logo >
        <div class="fenShe">
          <div class="fensheName">{{active.fenshe.name}}</div>
          <div class="fs">
            <div>主办</div>
          </div>
        </div>
      </div>
    </div>
    <!--活动详情页-->
    <div class="cutLineFont">
      <span class="leftFont">活动概况</span>
    </div>
    <div class="template" v-html="active.introduce" style="font-size: 14px; text-align: center">
    </div>

    <!--报名列表-->
    <div v-if="active.sign&&active.sign.length!=0">
      <router-link :to="{name:'activeBaomingList',query:{id:active.id}}" class="cutLineFont">
        <span class="leftFont">已报名</span>
        <img class="allImg" src="../../assets/images/youjian.png"/>
        <span class="rightFont">全部</span>
      </router-link>

      <div style="font-size: 0">
        <ul class="baoMingList">
            <li v-for="baoming in filterBaoMingList" >
              <div class="img" :style="{backgroundImage:'url('+baoming.user.show_img+')'}"></div>
              <div class="font">{{baoming.user.show_name}}</div>
            </li>
        </ul>
      </div>
    </div>

    <!--更多活动-->
    <router-link :to="{name:'cityMenu', query: {typeMenu: 1}}" class="cutLineFont">
      <span class="leftFont">更多活动</span>
      <img class="allImg" src="../../assets/images/youjian.png"/>
      <span class="rightFont">全部</span>
    </router-link>

    <div v-for="(activeItem,index) in active.latest">
      <active :active="activeItem"></active>
      <div v-if="index!=active.latest.length-1" class="cutLine" style="height: 0.15rem;"></div>
    </div>

    <!--参加报名-->
    <div v-if="showMenu" class="defaultSubmit"></div>
    <div v-if="showMenu" style="height: 0.88rem; position: fixed; bottom: 0; background-color: white;">
      <div class="smallLine"></div>
      <div class="buttonLeft" @click="openShare">
          <img src="../../assets/images/fenxiang.png" style="float: left; height: 0.36rem;">
          <span>分享</span>
      </div>
      <div class="buttonRight" @click="openActivePay" :style="{backgroundColor: active.sign_able==1?'#4285F4':'#a8a7a7'}">{{baomingString}}</div>
    </div>

    <!--分享-->
    <div class="shareImg" v-if="showShare" @click="closeShare"></div>

    <!--活动支付-->
    <div v-if="showActivePay" class="mengceng" >
          <div class="mengcengBg" style="opacity: 0.5" @click="showActivePay=false"></div>
          <div class="payContainer">
            <div class="smallLine"></div>
            <div class="baoMingTitle">请填写报名信息</div>
            <div class="baoMIngInput" style="margin-top: 0.5rem;">
              <div>姓名</div>
              <input id="name" type="text" placeholder="请输入姓名" v-model="submitData.name" />
            </div>
            <div class="baoMIngInput">
              <div>手机</div>
              <input id="mobile" type="tel" placeholder="请输入手机号" v-model="submitData.mobile"/>
            </div>
            <div class="baoMIngInput">
              <div>企业名称</div>
              <input id="company" type="text" v-model="submitData.company"/>
            </div>

            <div class="countNum">
              <span>购买数量</span>
              <img @click="minusNum" src="../../assets/images/jian.png">
              <span style="width: 0.8rem; text-align: center;">{{filterNum}}</span>
              <img @click="addNum" src="../../assets/images/jia.png">

              <div v-if="showErrInfo" class="errInfo">此活动最多可报名{{maxNum}}位</div>
            </div>

            <div @click="submit" class="submit">提交</div>
          </div>
     </div>

    <!--报名成功-->
    <div v-if="showMengCeng" class="mengceng">
      <div @click='showMengCeng=false' class="mengcengBg"></div>
      <div class="mengcengContain">
        <div class="mengcengTitle" style="margin-bottom: 0.5rem;">活动报名成功</div>
        <div class="mengcengButtons">
          <div @click='showMengCeng=false' class="mengcengButtonB">确 定</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import active from '../../components/active';
  import {formatDate} from '../../assets/js/date.js';
  import wx from 'weixin-js-sdk'
  import {host} from '../../assets/js/util'
  export default {
    data () {
      return {
        active:{
          fenshe:{
            fenshe_logo:""
          }
        },
        submitData:{
          name:"",
          mobile:"",
          company:"",
          num:1
        },
        baomingString:"",
        showShare:false,
        showActivePay:false,
        showMengCeng:false,
        maxNum:5,
        totalNum:4,
        showErrInfo:false,
        isClick:false,
        showMenu:false
      }
    },
    created(){
      this.templateId=this.$route.query.templateId;
      this.getData();
    },watch: {
      "$route": "getData"
    },mounted(){
      //this.getData();
      var _this=this;
      window.onscroll = function () {
        if(document.body.scrollTop>0){
          _this.showMenu=true;
        }
      }
    },methods:{
      getData(){
        var _this=this;
        this.id=this.$route.query.id;
        document.body.style.display="none";
        var href=location.href.split('#')[0]+"#activeDetail?id="+this.id+"&templateId="+this.templateId;
        $.getJSON(host+"/city/activityDetail",{id:this.id}).then(function (response) {
          _this.active =response.activity;
          _this.reset();
          document.body.style.display="block";
          JSDK.setShare({
            title:response.activity.title,
            desc:response.activity.summary,
            imgUrl:response.activity.image,
            href:href
          });
        })
      },
      reset(){
        console.log(this.active.sign_able)
        this.active.id = this.$route.query.id;
        switch(this.active.sign_able){
          case 1:
               this.baomingString="我要报名";
               break;
          case 2:
              this.baomingString="来晚了，名额已售罄";
              break;
          case 3:
              this.baomingString="活动已结束";
              break;
          case 4:
              this.baomingString="活动已下架";
              break;
        }
      },
      minusNum(){
        this.submitData.num--
      },
      addNum(){
        this.submitData.num++
      },
      openShare(){
        this.showShare=true;
      },
      closeShare(){
         this.showShare=false;
      },
      openActivePay(){
        if(this.active.sign_able==1)
          this.showActivePay=true;
      },
      closeActivePay(){
        this.showActivePay=false;
      },
      openMengCeng(){
        this.showMengCeng=true;
      },
      closeMengCeng(){
        this.showMengCeng=false;
      },
      submit(){
        console.log(this.name)

        if(!this.submitData.name)
        {
          Overlay.show("请输入您的姓名", 2000);
          return;
        }
        if(!this.submitData.mobile)
        {
          Overlay.show("请输入手机号", 2000);
          return;
        }
        if(this.isClick==true)
          return;
        this.isClick=true;

        var _this=this;
        this.submitData.aid=this.active.id;
        if(this.active.price!=0){
            $.getJSON(host+"/pay/activity",this.submitData).then(function (res) {
              _this.isClick=false;
              console.log(res)
              if(res.responese.code==1){
                var data = res.responese.config;
                wx.chooseWXPay({
                  timestamp: data.timestamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
                  nonceStr: data.nonceStr, // 支付签名随机串，不长于 32 位
                  package: data.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
                  signType:data.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
                  paySign:data.paySign, // 支付签名
                  success: function (e) {
                    _this.closeActivePay();
                    _this.openMengCeng();
                  }
                });
              }else{
                Overlay.show(res.responese.msg, 2000);
              }
          })
        }else{
          $.getJSON(host+"/city/activityDoSign",this.submitData).then(function (res) {
            _this.isClick=false;
            console.log(res)
            _this.closeActivePay();
            _this.openMengCeng();
          })
        }
      }
    },computed:{
      filterNum(){
        if(this.maxNum>this.totalNum)
        {
          this.maxNum=this.totalNum;
        }
        if(this.submitData.num>this.maxNum){
          this.submitData.num=this.maxNum;
          //this.showErrInfo=true;
        }else{
          this.showErrInfo=false;
        }
        if(this.submitData.num<1){
          this.submitData.num=1;
        }
        return this.submitData.num
      },
      filterBaoMingList:function(){
        return this.active.sign.slice(0,6)
      }
    },
    filters: {
      formatDate(time) {
        var date = new Date(time);
        return formatDate(time, "MM-dd hh:mm");
      }
    },
    components:{
      active
    }
  }


</script>
<style src="../../assets/css/project.css" scoped></style>
<style src="../../assets/css/activeDetail.css" scoped></style>
<style scoped>
    .logoImg{background-size: cover;}
    .projectName{padding:0 0.26rem; margin-top: 0.4rem; height: 0.34rem; line-height: 0.34rem; font-size: 0.34rem; color: #464c56; font-weight: bold;}
    .summary{padding:0 0.26rem; line-height: 0.5rem; font-size: 0.3rem; margin: 0.2rem 0;  color: #6c747c;overflow : hidden;  text-overflow: ellipsis;  display: -webkit-box;  -webkit-line-clamp: 3;  -webkit-box-orient: vertical;}
    .font{line-height:0.24rem; width: 0.85rem; height: 0.24rem; overflow: hidden;white-space:nowrap;text-overflow:ellipsis;}
    .allImg{float:right; margin: 0.29rem 0.3rem 0 0.1rem;  height: 0.32rem;}
    .payContainer{position: fixed; bottom: 0; width: 100% ;background-color: white; }
    .baoMingTitle{margin-top: 0.55rem; font-size:0.36rem;  height: 0.36rem; line-height: 0.36rem; color: #464c56; text-align: center; }
    .baoMIngInput{border-radius:3px; color: #464c56; width:6.9rem; height: 0.9rem; line-height: 0.9rem; border: 1px solid #c3ced9; margin: 0.39rem auto 0; font-size: 0.3rem; }
    .baoMIngInput div{display: inline-block; float: left; width: 1.45rem; margin-left: 0.25rem; font-size: 0.3rem}
    .baoMIngInput input{display: inline-block; color: #969fa9; float: left; height: 0.32rem; line-height: 0.32rem;  font-size: 0.3rem; padding: 0.28rem 0;border-radius: 0;}
    ::-webkit-input-placeholder{height: 0.4rem; line-height: 0.4rem; }
    .errInfo{float: left; height: 0.6rem; line-height: 0.6rem; color: red; margin-left: 0.5rem}
    .countNum{padding-left: 0.48rem; height: 0.5rem; line-height: 0.5rem;  font-size: 0.3rem; margin-top: 0.4rem; margin-bottom: 1.48rem;}
    .countNum span{float: left; width:1.47rem; color: #464c56;}
    .countNum img{float:left; height: 0.5rem;}
</style>

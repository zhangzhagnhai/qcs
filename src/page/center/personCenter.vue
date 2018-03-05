<template>
  <div style="background-color: #f7f7f7; top:0; bottom: 0;">
    <div v-title data-title="个人中心">
      个人中心
    </div>

    <img src="static/beijing.png" class="headerBg">
    <router-link tag="div" to="personManager" style="height: 3.72rem;">
      <img :src="userInfo.show_img" class="header">
      <img v-if="userInfo.hasRelationship>0" :src="vipImg[userInfo.hasRelationship-1]" class="vipImg">
      <div style="float: left; margin-top:0.5rem">
        <div class="centerName">{{userInfo.show_name}}</div>
        <div class="centerPhone">{{userInfo.mobile?userInfo.mobile:"未绑定手机号"}}</div>
        <div style="clear: both"></div>
        <router-link to="vipIntroduce">
          <img src="static/huiyuanquanyi.png" class="centerEdit">
        </router-link>
      </div>
    </router-link>
    <div class="cutLine"></div>
    <div class="centerContainBg">
      <div class="centerContain">
        <div class="leftIcon">
          <img src="static/xiaoxi.png">
        </div>
        <router-link to="messageList">
          <span class="leftWord">我的消息</span>
          <img src="../../assets/images/youjiantou.png" class="rightArrow">
          <span class="rightWord">有<span>{{userInfo.unread_message}}</span>条新消息</span>
        </router-link>
      </div>
    </div>

    <div class="centerContainBg" >
      <div class="centerContain" style="border: none">
        <div class="leftIcon">
          <img src="static/renmai.png">
        </div>
        <span class="leftWord">氢创圈</span>
        <router-link :to="{name:userInfo.hasRelationship==0?'vipIntroduce':'memberEdit'}">
          <img src="../../assets/images/youjiantou.png" class="rightArrow">
          <span class="rightWord">{{userInfo.hasRelationship==0?"申请成为会员":"完善信息进入氢创圈"}}</span>
        </router-link>
      </div>
    </div>

    <div class="cutLine"></div>
    <div class="centerContainBg">
      <div class="centerContain">
        <div class="leftIcon">
          <img src="static/xiangmu.png">
        </div>
        <router-link to="myProject">
          <span class="leftWord">我的项目</span>
          <img src="../../assets/images/youjiantou.png" class="rightArrow">
          <span class="rightWord">提交我的项目</span>
        </router-link>
      </div>
    </div>
    <div class="centerContainBg">
      <div class="centerContain" style="border: none">
        <div class="leftIcon">
          <img src="static/touziren.png">
        </div>
        <router-link to="myInvestor">
          <span class="leftWord">我是投资人</span>
          <img src="../../assets/images/youjiantou.png" class="rightArrow">
          <span class="rightWord">{{userInfo.hasInvestor?"查看完善你的投资人信息":"认证投资人"}}</span>
        </router-link>
      </div>
    </div>

    <div class="cutLine"></div>
    <div class="centerContainBg">
      <div class="centerContain">
        <div class="leftIcon">
          <img src="static/duijihui.png">
        </div>
        <router-link to="myProjectMeeting">
          <span class="leftWord">我参加的对接会</span>
          <img src="../../assets/images/youjiantou.png" class="rightArrow">
          <span class="rightWord"><span>{{userInfo.communication_count}}</span>个待参加的对接会</span>
        </router-link>
      </div>
    </div>

    <div class="centerContainBg">
      <div class="centerContain" style="border: none">
        <div class="leftIcon">
          <img src="static/huodong.png">
        </div>
        <router-link to="myActive">
          <span class="leftWord">已报名的活动</span>
          <img src="../../assets/images/youjiantou.png" class="rightArrow">
          <span class="rightWord"><span>{{userInfo.activity_count}}</span>个未完成的活动</span>
        </router-link>
      </div>
    </div>

    <foot select="3"></foot>
  </div>
</template>
<script>
  import foot from '../../components/Foot'
  import {host} from '../../assets/js/util'
  export default {
    data(){
      return {
        userInfo: {
        },
        vipImg:["static/qingyahuiuyan.png","static/qingmiaohuiyuan.png","static/qingsonghuiyuan.png"]
      }
    }, mounted(){
      this.templateId = this.$route.query.templateId;
      this.getData();
    },methods:{
      getData(){
        var _this=this;
        _this.$emit("loading",true);
        $.getJSON(host+"/center/centerIndex",{id:this.id}).then(function (response) {
          _this.userInfo=response.user;
          //_this.userInfo.hasRelationship=2
          _this.$emit("loading",false);
        })
      }
    },
    components: {
      foot
    }
  }
</script>
<style scoped>
  .headerBg {
    height: 3.72rem;
    width: 7.5rem;
    position: absolute;
    display: block;
  }

  .header {
    height: 1.46rem;
    width: 1.46rem;
    float: left;
    position: relative;
    margin-left: 0.47rem;
   /* left: 2.94rem;*/
    border-radius: 50%;
    top: 0.5rem;
    border:0.08rem solid white;
  }
  .centerEdit{
    position: relative;  float: left; top:0.5rem; left: 0.25rem; width: 1.57rem; height: 0.45rem;
  }

  .centerName {
    position: relative;
    float: left;
   /* top: 2.51rem;*/
    margin-left: 0.25rem;
    top: 0.3rem;
    font-size: 0.34rem;
    height: 0.34rem;
    line-height: 0.34rem;
    text-align: center;
    color: white;
  }
  .centerPhone{
    position: relative;
    float: left;
    top: 0.36rem;
    margin-left: 0.15rem;
    font-size: 0.28rem;
    height: 0.28rem;
    line-height: 0.28rem;
    text-align: center;
    color: white;
  }
  .centerContainBg {
    background-color: white
  }

  .centerContain {
    height: 0.34rem;
    padding: 0.33rem 0;
    width: 7.24rem;
    margin-left: 0.26rem;
    border-bottom: 0.5px solid #dddddd;
  }

  .leftIcon {
    width: 0.62rem;
    height: 0.34rem;
    float: left;
  }

  .leftIcon img {
    height: 0.32rem;
    float: left;
  }

  .leftWord {
    font-size: 0.32rem;
    line-height: 0.32rem;
    color: #464c56;
    float: left;
  }

  .rightWord {
    font-size: 0.26rem;
    line-height: 0.34rem;
    color: #969fa9;
    float: right;
    margin-right: 0.3rem;
  }

  .rightWord span {
    color: #4285F4
  }

  .rightArrow {
    float: right;
    margin-right: .26rem;
    height: 0.34rem;
  }

  .vipImg{
    position: absolute; top: 1.92rem; left: 0.67rem; width: 1.2rem; height: 0.3rem
  }
</style>

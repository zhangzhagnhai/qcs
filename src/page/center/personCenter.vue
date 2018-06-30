<template>
  <div style="background-color: #f7f7f7; top:0; bottom: 0;">
    <div v-title data-title="个人中心">
      个人中心
    </div>

    <img src="static/beijing.png" class="headerBg">
    <router-link tag="div" to="personManager" style="position:relative; height: 3.72rem;; overflow: hidden; z-index: 1000">
      <div class="centerManage">
        <img :src="userInfo.show_img" class="header">
        <img v-if="userInfo.hasRelationship>0" :src="vipImg[userInfo.hasRelationship-1]" class="vipImg">
        <div class="pullLeft">
          <div class="pullLeft">
            <div class="centerName">{{userInfo.show_name}}</div>
            <div class="centerPhone">{{userInfo.mobile?userInfo.mobile:"未绑定手机号"}}</div>
          </div>
          <div style="clear: both"></div>
          <router-link to="vipIntroduce" class="pullLeft">
            <img src="static/huiyuanquanyi.png" class="centerEdit">
          </router-link>
        </div>
      </div>
      <div style="clear: both"></div>
      <div class="yeContain">
        <router-link to="myWallet" tag="span">
            <div class="yeNum">{{money}}</div>
            <div class="yeName">伯乐金</div>
        </router-link>
        <router-link  v-if="!bid" to="addBL" tag="span">
            <img src="static/chengweibole.png">
        </router-link>
        <router-link  v-if="bid" to="deposit" tag="span">
          <img src="static/tixian.png">
        </router-link>
      </div>
      <router-link to="addBL" tag="span">
       <img src="static/boletubiao.png" class="boletubiao">
      </router-link>
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
        <span class="leftWord">加入会员</span>
        <router-link :to="{name:userInfo.hasRelationship==0?'vipIntroduce':'memberEdit'}">
          <img src="../../assets/images/youjiantou.png" class="rightArrow">
          <span class="rightWord">{{userInfo.hasRelationship==0?"申请成为会员":"完善信息加入会员"}}</span>
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
          <img  src="static/bolejihua.png">
        </div>
        <router-link to="BLPlan">
          <span class="leftWord">伯乐计划</span>
          <img src="../../assets/images/youjiantou.png" class="rightArrow">
          <span class="rightWord">我的计划</span>
        </router-link>
      </div>
    </div>
    <div class="centerContainBg">
      <div class="centerContain">
        <div class="leftIcon">
          <img src="static/hezuodexiangmu.png">
        </div>
        <router-link to="cooperationProject">
          <span class="leftWord">我合作的项目</span>
          <img src="../../assets/images/youjiantou.png" class="rightArrow">
          <span class="rightWord">查看已合作的项目</span>
        </router-link>
      </div>
    </div>
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
      <div class="centerContain" >
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

    <div class="centerContainBg">
      <router-link :to="{name:'aboutQcsIndex'}">
      <div class="centerContain" style="border: none">
        <div class="leftIcon">
          <img src="static/aboutus.png">
        </div>
          <span class="leftWord">关于我们</span>
         <img src="../../assets/images/youjiantou.png" class="rightArrow">
          <span class="rightWord"></span>
      </div>
      </router-link>
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
        money:0,
        bid:'',
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
         // _this.userInfo.hasRelationship=2
          _this.$emit("loading",false);
        })

        $.getJSON(host+"/bole/boleInfo",{id:this.id}).then(function (response) {
          _this.money=response.money;
          _this.bid=response.id;
          // _this.userInfo.hasRelationship=2
          //_this.$emit("loading",false);
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
    height: 1.24rem;
    width: 1.24rem;
    float: left;
    margin-left: 0.47rem;
   /* left: 2.94rem;*/
    border-radius: 50%;
    border:0.08rem solid white;
  }
  .centerManage{position:relative; height: 1.5rem; margin-top: 0.5rem;}
  .centerEdit{  position: relative;  float: left; left: 0.25rem; height: 0.45rem; margin-top: 0.2rem;  }
  .centerName {
    float: left;
   /* top: 2.51rem;*/
    margin-left: 0.25rem;
    margin-top: 0.3rem;
    font-size: 0.34rem;
    height: 0.34rem;
    line-height: 0.34rem;
    text-align: center;
    color: white;
  }
  .centerPhone{
    float: left;
    margin-top: 0.36rem;
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
    position: absolute; top: 1.2rem; left: 0.6rem; width: 1.2rem; height: 0.3rem
  }
  .boletubiao{position: absolute; top:0.3rem; right:0.26rem; width: 1.12rem }
  .pullLeft{float: left}
  .yeContain{height: 0.82rem; margin-top: 0.55rem}
  .yeContain span{float: left; width: 3.75rem; height: 0.7rem;margin-top: 0.06rem;text-align: center; font-size: 0;}
  .yeContain span:first-child{ border-right: 0.5px solid white; box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box; }
  .yeNum{color:white; font-size: 0.38rem; line-height: 0.38rem; height: 0.38rem; font-weight: bold;  margin-top: -0.06rem}
  .yeName{color:white; margin-top: 0.2rem; font-size: 0.24rem; line-height: 0.24rem; height: 0.24rem;}
  .yeContain img{/*width: 1.16rem; */ height:0.4rem; margin-top: 0.1rem}
</style>

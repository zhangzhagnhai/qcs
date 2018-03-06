<template>
  <div style="font-size: 0">
    <div v-title :data-title="invest.title">
      {{invest.title}}
    </div>

    <projectMeeting :projectMeeting="invest" isDetail="detail"></projectMeeting>
    <div style="height: 0.2rem; background-color: #f7f7f7"></div>
    <div class="col">
        <div class="left" style="background-image: url('static/canhuirenci.png');">
            <div class="numContain">
               <div>
                 <span class="nums">{{invest.joinProgramCount*6+invest.joinPeopleCount}}</span>
                 <span class="people">人</span></div>
            </div>
            <div class="peopleNums">参会总数</div>
        </div>
        <div class="right">
            <div class="fs">
               <img :src="invest.fenshe.fenshe_logo">
               <span class="fsName">{{invest.fenshe.name}}</span>
               <span class="fsStatu">主办</span>
            </div>
            <ul class="items">
              <li>
                <div class="itemContain">
                    <div class="itemContainer">
                       <div>{{invest.joinProgramCount}}</div>
                       <span>项</span>
                    </div>
                </div>
                <div class="itemName">线上项目</div>
                <div class="sBorder"></div>
              </li>
              <li>
                <div class="itemContain">
                  <div class="itemContainer">
                    <div>{{invest.joinPeopleCount}}</div>
                    <span>人</span>
                  </div>
                </div>
                <div class="itemName">线上报名</div>
                <div class="sBorder"></div>
              </li>
              <li>
                <div class="itemContain">
                  <div class="itemContainer">
                    <div>{{invest.joinProgramReqCount}}</div>
                    <span>项</span>
                  </div>
                </div>
                <div class="itemName">需求总量</div>
              </li>
            </ul>
        </div>
    </div>
    <div style="height: 0.2rem; background-color: #f7f7f7"></div>

    <div style="height: 0.86rem; border-bottom:  0.5px solid #dddddd;">
      <div class="menus">
        <div :class="selectItem==1?'menuWordx':'menuWord'" @click="selectItem=1">
          <div class="menuFont">对接会详情</div>
          <div class="menuBlueLine"></div>
        </div>
      </div>
      <div class="menus">
        <div :class="selectItem==2?'menuWordx':'menuWord'" @click="selectItem=2" style="border-right: none">
          <div class="menuFont">参会项目({{invest.programs?invest.programs.length:0}})</div>
          <div class="menuBlueLine"></div>
        </div>
      </div>
    </div>
    <!--对接会详情-->
    <div v-if="selectItem==1" v-html="invest.introduce" class="template" style="padding-bottom: 0.3rem"></div>

    <!--参会项目介绍-->
    <ul v-if="selectItem==2" class="team_ul">
      <li class="inverstList" v-for="(project,index) in invest.programs">
        <router-link :to="{name:'projectDetail', query: {id: project.id,isMeeting:true}}">
          <project v-bind:project=project isMeeting="true"></project>
        </router-link>
        <div v-if="index!=invest.programs.length-1" style="height: 0.2rem; background-color: #f7f7f7"></div>
      </li>
    </ul>


    <div v-if="showMenu" class="defaultSubmit"></div>

    <div v-if="showMenu" class="footerContainer">
      <router-link :to="{name:'selectProject',query:{meetingId:invest.id}}" class="leftButton">项目报名</router-link>
      　
      <router-link :to="{name:'projectAttend',query:{id:invest.id}}" class="rightButton">参会报名</router-link>
    </div>

    <img src="static/xiangqingyetubiao.png" class="blIcon">
  </div>
</template>
<script>
  import projectMeeting from '../../components/projectMetting.vue'
  import project from '../../components/project.vue'
  import {host,shareHref} from '../../assets/js/util'
  export default {

    name: 'app',
    data () {
      return {
        invest: {
          fenshe:{}
        },
        templateId:"",
        id:"",
        selectItem: 1,
        showInterest: false,
        showMenu:false
      }
    },
    created(){
      console.log(this.$route.query)
      this.id =this.$route.query.id;
      this.templateId=this.$route.query.templateId;
    },
    components: {
      projectMeeting,
      project
    },
    methods: {
      getData: function () {
        var _this=this;
        var href=shareHref+"#projectMeetingDetail?id="+this.id+"&templateId="+this.templateId;
        _this.$emit("loading",true);
        $.getJSON(host+"/communication/communicationDetail", {id:_this.id,templateId: _this.templateId}).then(function (response) {
          _this.invest =response.communication;
         // _this.$set(_this,"invest",response.communication);
          console.log(_this.invest.programs )
          _this.$emit("loading",false);
          _czc.push(["_trackPageview",response.communication.title]);
          JSDK.setShare({
            title:response.communication.title,
            desc:" 让项目资本资源，精准对接。给得再多，不如懂你！",
            imgUrl:response.communication.image,
            href:href
          });
        })
      }
    },mounted(){
      this.getData();
      var _this=this;
      window.onscroll = function () {
        if(document.body.scrollTop>0){
          _this.showMenu=true;
        }
      }
    }
  }

</script>
<style scoped>
  .col{height: 2.5rem; padding: 0 0.26rem;}
  .col .left{width: 1.7rem; height: 1.7rem; float: left; margin-top: 0.4rem; background: url('/static/canhuirenci.png') center center; background-size: cover;}
  .numContain{height: 0.46rem; margin-top: 0.43rem; text-align: center; color: #4285F4}
  .numContain div{display: inline-block; font-size: 0}
  .numContain .nums{font-size: 0.46rem; height: 0.46rem; line-height: 0.46rem; font-weight: bold; float: left;}
  .numContain .people{font-size: 0.22rem; height: 0.22rem; line-height: 0.22rem;float: left; margin-top: 0.18rem}
  .peopleNums{margin-top:0.15rem; height: 0.26rem; line-height: 0.26rem; font-size: 0.26rem; text-align: center; color: #4285F4}
  .col .right{width: 4.98rem; margin-left: 0.3rem; height: 2.5rem; float: left;}
  .fs{height: 0.6rem; line-height: 0.6rem; padding: 0.25rem 0; border-bottom: 0.5px solid #dddddd}
  .fs img{width: 0.6rem; height: 0.6rem; float: left;  border-radius: 50%; border: 0.5px solid #efefef; box-sizing:border-box;}
  .fsName{float: left; margin-left: 0.2rem; font-size: 0.3rem; color: #464c56}
  .fsStatu{float: left; margin-left: 0.15rem; font-size: 0.22rem; color: #969fa9}

  .items li{float: left; position: relative;}
  .itemContain{height:0.36rem; width: 1.66rem; margin-top: 0.35rem; text-align: center;}
  .itemContainer{display: inline-block; font-size: 0;}
  .itemContainer div{float: left; font-weight: bold; color: #4285F4; font-size: 0.36rem; line-height: 0.36rem;}
  .itemContainer span{float: left; color: #969fa9;font-size: 0.22rem; line-height: 0.22rem; margin-top: 0.1rem; margin-left: 0.08rem;}
  .items li .itemName{height:0.56rem; line-height: 0.56rem; font-size: 0.26rem; color: #969fa9; width: 1.66rem; text-align: center;}
  .sBorder{position: absolute; height: 0.45rem; top:0.48rem; right: 0; border-right: 1px solid #dddddd;}
  .mengceng {
    position: fixed;
    top: 0;
    width: 100%;
    height: 15rem;
  }

  .mengcengBg {
    position: absolute;
    top: 0;
    height: 15rem;
    width: 100%;
    background-color: black;
    opacity: 0.2;
  }

  .mengcengContain {
    position: absolute;
    top: 3rem;
    width: 5.5rem;
    left: 0;
    right: 0;
    margin: auto;
    background-color: white;
    border-radius: 6px;
  }

  .mengcengTitle {
    margin-top: 0.47rem;
    color: #464c56;
    font-size: 0.34rem;
    height: 0.34rem;
    line-height: 0.34rem;
    text-align: center;
  }

  .mengcengContent {
    margin-top: 0.35rem;
    margin-bottom: 0.4rem;
    color: #6c747c;
    font-size: 0.3rem;
    line-height: 0.5rem;
    text-align: center;
  }

  .mengcengButtons {
    width: 5.5rem;
    border-top: 0.5px solid #d1d1d1;
  }

  .mengcengButtonLine {
    height: 100%;
    float: right;
    display: inline-block;
    border-right: 0.5px solid #d1d1d1;
  }

  .mengcengButtonA {
    color: #969fa9;
    width: 50%;
    height: 0.96rem;
    line-height: 0.96rem;
    text-align: center;
    font-size: 0.3rem;
    display: inline-block;
    float: left;
  }

  .footerContainer {
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 0.88rem;
    border-top: 0.5px solid #dddddd;
    background-color: white
  }

  .leftButton {
    box-sizing: border-box;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    width: 2.8rem;
    height: 0.88rem;
    line-height: 0.88rem;
    float: left;
    font-size: 0.36rem;
    text-align: center;
    color: #464c56;
    border-right: 0.5px solid #dddddd;
  }

  .rightButton {
    box-sizing: border-box;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    width: 4.7rem;
    height: 0.88rem;
    line-height: 0.88rem;
    float: left;
    font-size: 0.36rem;
    text-align: center;
    color: white;
    background-color: #4285F4;
  }

  .menus {
    float: left;
    height: 0.86rem;
    width: 50%;
    position: relative
  }

  .menuWord, .menuWordx {
    height: 0.42rem;
    line-height: 0.42rem;
    border-right: 0.5px solid #dddddd;
    position: relative;
    top: 0.16rem;
    text-align: center
  }

  .menuFont {
    height: 0.42rem;
    font-size: 0.3rem;
    line-height: 0.42rem;
    margin-top: 0.08rem;
    color: #464c56;
    font-weight: bold;
  }

  .menuBlueLine {
    position: relative;
    width: 0.7rem;
    height: 0.04rem;
    left: 1.53rem;
    top: .16rem;
    background-color: #4285F4;
    display: none;
  }

  .menuWordx .menuFont {
    color: #4285F4;
  }

  .menuWordx .menuBlueLine {
    display: block;
  }

  .team_ul {
    display: inline-block;
  }

  .team_ul li {
    float: left;
    width: 100%
  }

  .teamContain {
    padding-left: 0.3rem;
  }

  .teamContain1 {
    border-bottom: 0.5px solid #d1d1d1;
  }

  .teamContain2 {
    margin-top: 0.3rem;
    height: 1.2rem;
  }

  .teamIcon {
    height: 1.2rem;
    width: 1.2rem;
    border-radius: 100%;
    display: inline-block;
    float: left;
  }

  .teamIconItem {
    height: 1.2rem;
    margin-left: 0.3rem;
    display: inline-block;
    float: left;
  }

  .footer li {
    width: 33.3%;
    height: 1rem;
    float: left;
  }
</style>


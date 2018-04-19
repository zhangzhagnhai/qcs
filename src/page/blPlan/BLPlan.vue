<template>
  <div>
    <div v-title data-title="伯乐计划">
      伯乐计划
    </div>
    <div class="cutLines"></div>
    <div class="fsNav">
      <div class="fsNavs">
        <div :class="select==1?'select':''" @click="selectMenu(1)">项目成交</div>
        <div :class="select==2?'select':''" @click="selectMenu(2)">对接会推荐</div>
        <div :class="select==3?'select':''" @click="selectMenu(3)">项目推荐</div>
      </div>
    </div>

    <ul v-if="select==1" class="projectList">
        <li v-for="item in programDealList">
           <div class="navs">
              <img :src="item.image">
              <div>
                <h1>{{item.program_name}}</h1>
                <h2><img :src="item.user_img">{{item.user_name}}</h2>
                <h3>伯乐金<span>¥{{item.bolejin}}</span></h3>
              </div>
           </div>
           <div class="status">
              <div>意向金已付</div>
              <div>沟通确认中</div>
              <div>合作成功</div>
           </div>
          <img v-if="item.weikuan_status==0" :src="imgArr[2]">
          <img v-if="item.weikuan_status==1" :src="imgArr[3]">
          <div class="time">
            <div>{{item.created_at}}</div>
            <div style="visibility: hidden">{{item.created_at}}</div>
            <div>{{item.bolejin_pass}}</div>
          </div>
        </li>
    </ul>

    <ul v-if="select==2" class="projectList">
      <li v-for="item in projectMeetingList">
        <div class="navs">
          <img :src="item.image">
          <div>
            <h1>{{item.communication_name}}</h1>
            <h2>{{item.program_name}}</h2>
            <h3>伯乐金<span>¥{{item.bolejin}}</span></h3>
          </div>
        </div>
        <div class="status">
          <div>项目已报名</div>
          <div>审核中</div>
          <div v-if="item.status!=2">审核通过</div>
          <div v-if="item.status==2" @click="showMC=true">审核被拒<img src="static/wenhao.png"></div>
        </div>
        <img v-if="item.status==0" :src="imgArr[2]">
        <img v-if="item.status==1" :src="imgArr[3]">
        <img v-if="item.status==2" :src="imgArr[0]">
        <div class="time">
          <div>{{item.created_at}}</div>
          <div></div>
          <div>{{item.bolejin_pass}}</div>
        </div>
      </li>
    </ul>

    <ul v-if="select==3" class="projectList">
      <li v-for="item in programList">
        <div class="navs">
          <img :src="item.image">
          <div>
            <h1>{{item.program_name}}</h1>
            <h2><img :src="item.user_image">{{item.user_name}}</h2>
            <h3>伯乐金<span>¥{{item.bolejin}}</span></h3>
          </div>
        </div>
        <div class="status">
          <div>项目已报名</div>
          <div>审核中</div>
          <div v-if="item.status!=2">审核通过</div>
          <div v-if="item.status==2" @click="showMC=true">审核被拒<img src="static/wenhao.png"></div>
        </div>
        <img v-if="item.status==0" :src="imgArr[2]">
        <img v-if="item.status==1" :src="imgArr[3]">
        <img v-if="item.status==2" :src="imgArr[0]">
        <div class="time">
          <div>{{item.created_at}}</div>
          <div style="visibility: hidden">{{end_time | formatDate}}</div>
          <div>{{item.bolejin_pass}}</div>
        </div>
      </li>
    </ul>

    <div v-if="select==1&&programDealList.length==0">
      <img src="static/f.png" style="width: 3.02rem" class="noDataImg">
      <div class="noDataFont">暂时还没有项目成交~</div>
    </div>

    <div v-if="select==2&&projectMeetingList.length==0">
      <img src="static/f.png" style="width: 3.02rem" class="noDataImg">
      <div class="noDataFont">暂时还没有对接会推荐~</div>
    </div>

    <div v-if="select==3&&programList.length==0">
      <img src="static/f.png" style="width: 3.02rem" class="noDataImg">
      <div class="noDataFont">暂时还没有项目推荐~</div>
    </div>

    <div class="defaultSubmit"></div>
    <a class="submitButton" href="tel:13957756423"><div style="display: inline-block"><img src="static/lianxikefu.png"><span>联系客服</span></div></a>

    <div v-if="showMC" class="mengceng">
      <div class="mengcengBg" @click="showMC=false"></div>
      <div class="mengcengContain">
        <div class="mengcengTitle" style="font-size: 0; line-height: normal">
          <div class="mengcengTitleContain">
            <img src="static/shenhebeiju.png" style="margin-top: .13rem">
            <div>审核被拒</div>
          </div>
        </div>

        <div class="mengcengContent" style="margin-top: 0.12rem">由于项目不在平台投向行业中，<br>所以审核被拒！</div>
        <div class="mengcengButtons">
          <div class="mengcengButtonB" @click="showMC=false" style="color: #4285F4">确定</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
    import {host,shareHref} from '../../assets/js/util'
    import {formatDateA} from '../../assets/js/date.js';
    export default {
        data() {
            return {
              select:1,
              strArr:["项目成交","对接会推荐","项目推荐"],
              programDealList:[],
              programList:[],
              projectMeetingList:[],
              imgArr:["static/kongbai.png","static/xiangmuyibaoming.png","static/shenhezhong.png","static/shenhetongguo.png"],
              end_time:new Date().getTime(),
              showMC:false
            }
        },
        methods: {
          selectMenu(index){
            console.log(index)
            this.select=index;
            var _this=this;
            _this.$emit("loading",true);
            if(index==1){
              $.getJSON(host+"/bole/boleProgramChengjiao").then(function (response) {
                _this.$emit("loading",false);
                _this.programDealList=response.programs
              })
            }else if(index==2){
              $.getJSON(host+"/bole/boleCommunication").then(function (response) {
                _this.$emit("loading",false);
                _this.projectMeetingList=response.result
              })
            }else if(index==3){
              $.getJSON(host+"/bole/boleProgram").then(function (response) {
                _this.$emit("loading",false);
                _this.programList=response.program
              })
            }
          },
        },
        mounted(){
          this.templateId = this.$route.query.templateId;
          this.selectMenu(this.select);
        },
        filters: {
          formatDate(time) {
            var date = new Date(time);
            return formatDateA(date, "yyyy-MM-dd hh:mm");
          },
        },
        components: {}
    }
</script>
<style scoped>
   .projectList{padding-left: 0.26rem}
   .projectList li{border-bottom: 0.5px solid #eee; padding: 0.3rem 0; font-size: 0; }
   .projectList li:last-child{border: none}
   li img{width: 6.98rem;}
   .navs{height: 1.55rem;}
   .navs img{width: 1.55rem; height: 1.55rem; float: left; border-radius: 3px;}
   .navs div{float: left; margin-left: 0.3rem}
   .navs h1{font-size: 0.36rem; line-height: 0.56rem;  font-weight: normal; color: #464c56; height: 0.56rem;    width: 5.13rem;  overflow: hidden;  text-overflow: ellipsis;  white-space: nowrap;}
   .navs h2{font-size: 0.28rem; line-height: 0.4rem; margin: 0.05rem 0 0.02rem;  font-weight: normal; color: #6c747c; width: 5.13rem; overflow: hidden; text-overflow: ellipsis; white-space:nowrap;}
   .navs h2 img{width: 0.4rem;height: 0.4rem;border-radius: 50%;margin-right: 0.15rem}
   .navs h3{font-size: 0.25rem; line-height: 0.45rem; margin-top: 0rem; font-weight: normal; color:#969fa9;}
   .navs h3 span{font-size: 0.28rem; color: #4285f4; margin-left: 0.1rem;}
   .status{width: 6.98rem; height: 0.26rem; margin: 0.4rem 0 0.15rem; display: -webkit-flex; display:flex; display: -webkit-box;  display: -ms-flexbox;  -webkit-box-align: center;  align-content: center;  justify-content:center;}
   .status div{font-size:0.26rem; color:#969fa9; -webkit-box-align: center; align-content: center; justify-content:center;  align-items:center;  -webkit-align-items:center;  text-align: center; width: 100%;  -webkit-flex: 1;  flex: 1;  -webkit-box-flex: 1;  -moz-box-flex: 1;  -ms-flex: 1;}
   .status img{height: 0.26rem; width: 0.26rem; margin-left: 0.1rem}
   .time{width: 6.98rem; height: 0.26rem; margin: 0.15rem 0 0; display: -webkit-flex; display:flex; display: -webkit-box;  display: -ms-flexbox;  -webkit-box-align: center;  align-content: center;  justify-content:center;}
   .time div{font-size:0.2rem; color:#969fa9; -webkit-box-align: center; align-content: center; justify-content:center;  align-items:center;  -webkit-align-items:center;  text-align: center; width: 100%;  -webkit-flex: 1;  flex: 1;  -webkit-box-flex: 1;  -moz-box-flex: 1;  -ms-flex: 1;}
   .submitButton img{float: left; height: 0.34rem; margin-right: 0.15rem; margin-top: 0.26rem}
   .submitButton div span{float: left}
</style>

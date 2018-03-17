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
        <li>
           <div class="navs">
              <img src="static/share1.png">
              <div>
                <h1>婆婆妈妈生活网</h1>
                <h2><img src="static/share1.png">2017201720172017201720172017201720172017</h2>
                <h3>伯乐金<span>¥3000</span></h3>
              </div>
           </div>
           <div class="status">
              <div>意向金已付</div>
              <div>沟通确认中</div>
              <div>合作失败</div>
           </div>
          <img :src="imgArr[2]">
          <div class="time">
            <div>{{end_time | formatDate}}</div>
            <div style="visibility: hidden">{{end_time | formatDate}}</div>
            <div>{{end_time| formatDate}}</div>
          </div>
        </li>
    </ul>

    <ul v-if="select==2" class="projectList">
      <li>
        <div class="navs">
          <img src="/static/share1.png">
          <div>
            <h1>婆婆妈妈生活网</h1>
            <h2>2017201720172017201720172017201720172017</h2>
            <h3>伯乐金<span>¥3000</span></h3>
          </div>
        </div>
        <div class="status">
          <div>项目已报名</div>
          <div>审核中</div>
          <div>审核被拒<img src="static/wenhao.png"></div>
        </div>
        <img :src="imgArr[1]">
        <div class="time">
          <div>{{end_time | formatDate}}</div>
          <div></div>
          <div>{{end_time| formatDate}}</div>
        </div>
      </li>
    </ul>

    <ul v-if="select==3" class="projectList">
      <li>
        <div class="navs">
          <img src="/static/share1.png">
          <div>
            <h1>婆婆妈妈生活网</h1>
            <h2><img src="static/share1.png">陈道明</h2>
            <h3>伯乐金<span>¥3000</span></h3>
          </div>
        </div>
        <div class="status">
          <div>项目已报名</div>
          <div>审核中</div>
          <div>审核被拒<img src="static/wenhao.png"></div>
        </div>
        <img :src="imgArr[0]">
        <div class="time">
          <div>{{end_time | formatDate}}</div>
          <div style="visibility: hidden">{{end_time | formatDate}}</div>
          <div>{{end_time| formatDate}}</div>
        </div>
      </li>
    </ul>

    <div v-if="projectMeetingList.length==0">
      <img src="static/f.png" style="width: 3.02rem" class="noDataImg">
      <div class="noDataFont">暂时还没有{{strArr[select-1]}}~</div>
    </div>

    <div class="defaultSubmit"></div>
    <a class="submitButton" href="tel:13968851416"><div style="display: inline-block"><img src="static/lianxikefu.png"><span>联系客服</span></div></a>

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
    import {formatDateA} from '../../assets/js/date.js';/*
    import kongbai from 'static/kongbai.png'
    import xiangmuyibaoming  from 'static/xiangmuyibaoming.png'
    import shenhezhong  from 'static/shenhezhong.png'
    import shenhetongguo  from 'static/shenhetongguo.png'*/
    export default {
        data() {
            return {
              select:1,
              strArr:["项目成交","对接会推荐","项目推荐"],
              projectMeetingList:[{}],
              imgArr:["static/kongbai.png","static/xiangmuyibaoming.png","static/shenhezhong.png","static/shenhetongguo.png"],
              end_time:new Date().getTime(),
              showMC:true
            }
        },
        methods: {
          selectMenu(index){
            this.select=index;
          },
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
   .navs h1{font-size: 0.36rem; line-height: 0.56rem;  font-weight: normal; color: #464c56; height: 0.56rem;}
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

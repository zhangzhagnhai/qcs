<template>
  <div>
     <img :src="project.image" class="front">
     <div style="padding-left: 0.26rem">
          <div class="container">
             <div class="key">项目名称:</div>
             <div class="value">{{project.name}}</div>
          </div>
         <div class="container">
           <div class="key">创始人:</div>
           <div class="value">{{project.founder}}</div>
         </div>
         <div class="container">
           <div class="key">联系电话:</div>
           <div class="value">{{project.mobile}}</div>
         </div>
         <div class="container">
           <div class="key">项目领域:</div>
           <div class="value"><span v-for="field in project.tag">{{field.name}}&nbsp;&nbsp;&nbsp;</span></div>
         </div>
         <div class="container">
           <div class="key">所在地区:</div>
           <div class="value"><span>{{project.province_str}}&nbsp;&nbsp;&nbsp;</span><span>{{project.city_str}}</span></div>
         </div>
         <div class="container" style="border: none">
           <div class="key">项目概述:</div>
         </div>
         <p class="introduce">{{project.summary}}</p>

         <div v-if="isMyProject==='false'">
           <div class="smallLine"></div>
           <div class="container" style="border: none">
             <div class="key">诉求:</div>
           </div>
           <div class="request"><span v-for="field in project.request">{{field.name}}&nbsp;&nbsp;&nbsp;</span></div>
         </div>
     </div>
      <div v-if="isMyProject==='true'">
        <div v-if="project.deliverReturn&&project.deliverReturn.length" class="cutLineFont">投递反馈</div>
          <ul class="interestList">
            <li v-for="(item,index) in project.deliverReturn" :style="index==project.deliverReturn.length-1?'border:none':''">
              <img :src="item.image">
              <div class="listContain">
                <div class="name">{{item.name}}</div>
                <div class="job">{{item.motto}}</div>
                <div class="tag"><span :class="item.result>=1?'select':''">已反馈</span>
                  <span :class="item.result==1?'select':''">感兴趣</span>
                  <span :class="item.result==3?'select':''">已约谈</span></div>
              </div>
            </li>
          </ul>

        <div v-if="false" class="cutLineFont">感兴趣的人</div>
          <ul v-if="false" class="interestList">
            <li v-for="(item,index) in interestList" :style="index==interestList.length-1?'border:none':''">
              <img :src="userInfo.img">
              <div class="listContain">
                <div class="name">王阳军</div>
                <div class="job">移动互联网资深人事</div>
                <div class="tag" style="font-size: 0.26rem">13666673225</div>
              </div>
            </li>
          </ul>

        <div v-if="project.comments&&project.comments.length" class="cutLineFont">评论</div>
        <ul class="commentList">
          <li v-for="(comment,index) in project.comments" :style="index==project.comments.length-1?'':'border-bottom: 0.5px solid #dddddd'">
            <div style="height: 0.9rem; margin-top: 0.3rem; ">
              <img :src="comment.user.show_img" />
              <div class="commentContain">
                <div class="commentName">{{comment.user.show_name}}</div>
                <div class="commentDate">{{comment.created_at | formatDate}}</div>
              </div>
            </div>
            <p class="commentDetail">{{comment.body}}</p>
          </li>
        </ul>
      </div>


  </div>
</template>
<script>
  import {formatDate} from '../../assets/js/date.js';
  export default {
    data(){
      return {
        userInfo:{
        },
        interestList:[]
      }
    },
    props: ["isMyProject","project"],
    methods: {

    },
    components: {
    },
    filters: {
      formatDate(time) {
        var date = new Date(time);
        return formatDate(time, "yyyy-MM-dd  hh:mm");
      }
    }
  }
</script>
<style src="../../assets/css/comment.css" scoped></style>
<style scoped>
  .front{height: 3.92rem; width: 6.98rem; display: block; margin: 0.3rem auto 0}
  .container{/*height: 1rem; */border-bottom: 0.5px solid #dddddd; overflow: hidden}
  .key{width: 1.68rem; float: left; color: #464c56;height: 1rem; line-height: 1rem; font-size: 0.32rem;}
  .value{width: 5.3rem; float: left; color: #6c747c;/*height: 1rem;*/ line-height: 1rem; font-size: 0.32rem;}
  .introduce{width:7rem;  display: inline-block; margin-top:-0.15rem; margin-bottom:0.3rem; color: #6c747c; font-size: 0.32rem; line-height: 0.5rem;}
  .request{height: 0.3rem; line-height: 0.3rem; font-size: 0.3rem; margin-bottom: 0.4rem; color: #6c747c;}

  .interestList{padding-left: 0.26rem;}
  .interestList li{border-bottom: 0.5px solid #dddddd; height: 1.55rem; padding: 0.3rem 0}
  .interestList img{float: left; width: 1.55rem; height: 1.55rem; border-radius: 3px;}
   .listContain{width: 5.13rem; float: left; margin-left: 0.3rem}
  .name{height: 0.46rem; line-height: 0.46rem; font-size: 0.32rem; font-weight: bold; color: #464c56}
  .job{height: 0.76rem; line-height: 0.76rem; font-size: 0.26rem; color: #464c56; overflow: hidden;}
  .tag{height: 0.3rem; line-height: 0.3rem; font-size: 0.24rem; color: #969fa9}
   .tag .select{color:#4285F4}
   .tag span{margin-right: 0.4rem;}
</style>

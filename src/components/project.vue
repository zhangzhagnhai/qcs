<template>
  <div>
    <img :src="project.image" class="projectMeetingImgs"  v-if="project.isMeetingProject&&isDetail">
    <div style="padding: 0 0.26rem; font-size: 0">
        <div v-if="!project.isMeetingProject||!isDetail">
          <div  class="projectMeetingTop" >
            <img :src=project.fenshe.fenshe_logo >
            <div class="fenShe">
              <div class="fensheName">{{project.fenshe.name}}</div>
              <div class="fs">
                <div>{{project.owner}}</div>
              </div>
            </div>
          </div>

     <!--     <div v-if="isMeeting" style="height: 0.3rem"></div>-->

          <div style="position: relative; border-radius: 3px; overflow: hidden; height: 3.92rem;">
            <img :src="project.image" class="projectMeetingImg">
            <div v-if="!isDetail" class="countNumBG"></div>
            <div v-if="!isDetail" class="countNum">
              <span>{{project.comments_count}} 评论</span>
              <span>·</span>
              <span>{{project.star_count}} 赞</span>
              <span>·</span>
              <span>{{project.interesting_count}} 感兴趣</span>
            </div>
          </div>
        </div>

        <div class="projectName">{{project.name}}</div>
        <div v-if="isDetail">
            <p :class="isDetail?'summary':'summarys'">{{project.summary}}</p>

            <div class="rzComContain">
              <div class="rzComItems">
                <div class="rzComItem">
                   <div>{{2100000 | toPrice}}</div>
                   <div>起投额</div>
                </div>
                <div class="rzComItem">
                  <div>{{21000000 | toPrice}}</div>
                  <div>融资总额</div>
                </div>
              </div>
              <div class="rzComItems">
                <div class="rzComItem">
                  <div>{{18900000 | toPrice}}</div>
                  <div>已预约金额</div>
                </div>
                <div class="rzComItem">
                  <div>10</div>
                  <div>总份数</div>
                </div>
              </div>
              <div class="djsItem">
                预计期倒计时<span>4天21时59分</span>
              </div>
            </div>
          <!--旧版诉求-->
           <!-- <p class="appeal"><span style="font-weight: bold">诉求: </span>{{project.summary}}</p>-->

            <div style="height: 0.26rem; margin: 0.3rem 0">
              <div class="title_tag" v-for="tags in project.tag">
                <div class="img"></div>
                <div class="font">{{tags.name}}</div>
              </div>
              <div class="address">
                  <span>{{project.city_str}}</span>
                  <span style="margin-right: 0.2rem">{{project.province_str}}</span>
                  <img src="../assets/images/didian.png" style="margin-right: 0.1rem">
              </div>
            </div>

            <div class="smallLine"></div>
            <div style="display: inline-block">
               <div class="appeals">诉求:</div>
               <ul class="appealList">
                 <li v-for="request in project.request">{{request.name}}</li>
               </ul>
            </div>
        </div>
     </div>
   </div>
</template>

<script>
  import {toPrice} from '../assets/js/util'
  export default {
    data(){
      return {
      }
    },
    props: ['project','isDetail','isMeeting'],
    created(){
      if(!this.project.fenshe)
        this.project.fenshe={}
    },
    filters: {
      toPrice(time) {
        return toPrice(time);
      }
    },
  }
</script>
<style src="../assets/css/project.css" scoped></style>
<style lang="scss" scoped>
    .countNumBG{bottom: 0; height: 0.55rem; margin-top: -0.55rem; background-color: black; opacity: 0.6;  padding-left: 0.15rem; }
    .countNum{bottom: 0.55rem; height: 0.55rem; padding-left: 0.15rem; position: relative }
    .countNum span{float: left; line-height: 0.55rem; height: 0.55rem; padding-left: 0.1rem;  font-size: 0.26rem; color: white; font-weight: bold;}
    .projectName{margin-top: 0.4rem; height: 0.34rem; line-height: 0.34rem; font-size: 0.34rem; color: #464c56; font-weight: bold;}
    .summary{line-height: 0.5rem; font-size: 0.3rem; margin: 0.2rem 0;  color: #6c747c; padding: 0}
    .summarys{line-height: 0.5rem; font-size: 0.3rem; margin: 0.2rem 0;  color: #6c747c; padding: 0;overflow : hidden;  text-overflow: ellipsis;  display: -webkit-box;  -webkit-line-clamp: 3;  -webkit-box-orient: vertical;}
    .appeal{font-size: 0.26rem; line-height: 0.4rem; color: #969fa9; padding: 0.13rem 0.2rem;  background-color: #f9fafa; border: 1px solid #c3ced9; border-radius: 5px;}
    .appeals{float: left;font-size: 0.26rem; line-height: 0.26rem; height: 0.26rem; margin-top:0.3rem; padding: 0.07rem 0;  width: 0.65rem; color:#464c56}
    .appealList{float: left; width: 6.5rem; margin-bottom: 0.3rem; margin-left: -0.17rem;}
    .appealList li{font-size: 0.26rem; line-height: 0.26rem; height: 0.26rem; margin-top:0.3rem; margin-left: 0.3rem;  padding: 0.07rem 0.1rem; background-color:#f6f9f8; color: #969fa9; border-radius: 5px; float: left}
    .rzComContain{padding: 0 0.26rem; background-color: #eee; width: 100%; margin:0.1rem 0 0.1rem -0.26rem}
    .rzComItems{height: 1.25rem;  border-bottom:0.5px solid #ddd;}
    .rzComItem{float: left; height: 1.25rem; width: 50%; box-sizing: border-box; border-right: 0.5px solid #ddd;}
    .rzComItem:last-child{border: none}
    .rzComItem div:first-child{ font-size: 0.36rem; height: 0.36rem; line-height: 0.36rem; padding-top: 0.25rem; color: #464c56; text-align: center;}
    .rzComItem div:last-child{ font-size: 0.26rem; height: 0.26rem; line-height: 0.28rem; padding-top: 0.15rem; color: #969fa9; text-align: center;}
    .djsItem{ height: 0.9rem; line-height: 0.9rem; font-size: 0.28rem; text-align: center; color: #464c56}
    .djsItem span{margin-left: 0.15rem;color: #4285f4;}
</style>

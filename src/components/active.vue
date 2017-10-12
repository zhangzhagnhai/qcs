<template>
  <div>
    <router-link :to="{name :'activeDetail',query: {id:active.id}}" class="active" style="position:relative; background-color: white;padding: 0 0.26rem; font-size: 0">
      <div style="">
        <div class="projectMeetingTop">
          <img :src=active.fenshe.fenshe_logo >
          <div class="fenShe">
            <div class="fensheName">{{active.fenshe.name}}</div>
            <div class="fs">
              <div>发起活动</div>
            </div>
          </div>
        </div>

        <div style="position: relative; border-radius: 3px; overflow: hidden; height: 3.92rem;">
          <img :src="active.image" class="projectMeetingImg">
          <div class="countNumBG"></div>
          <div class="countNum">
            <span>{{statusStr}}</span>
            <span style="float: right">已报名 {{active.sign_count}}/{{active.people_num==99999?"不限":active.people_num}}</span>
          </div>
        </div>
      </div>

      <div class="projectMeetingName">{{active.title}}</div>

      <div style="height: 0.26rem">
        <img src=../assets/images/riqi.png class="iconImg">
        <div class="iconFont">{{active.start_time | formatDate}} 至 {{active.start_time | formatDate}}</div>
      </div>

      <div style="height: 0.26rem; margin-top: 0.25rem; margin-bottom: 0.4rem;">
        <img src=../assets/images/didian.png class="iconImg">
        <div class="iconFont">{{active.province_str+active.city_str+active.county_str}}</div>
      </div>

      <div class="activePrice">{{active.price==0?"免费":'￥'+active.price}}</div>
    </router-link>

  </div>
</template>
<script>
  import {formatDate} from '../assets/js/date.js';
  export default {
    data(){
      return {
        statusStr:""
      }
    },
    filters: {
      formatDate(time) {
        //var date = new Date(time);
        return formatDate(time, "MM-dd hh:mm");
      },
      getMinutes(time){
       // var date = new Date(time);
        return formatDate(time, "hh:mm");
      }
    },
    props: ['active'],
    created(){
      if(!this.active.fenshe){
        this.active.fenshe={}
      }
      switch (this.active.act_status){
        case 0:
             this.statusStr="未开始";
             break;
        case 1:
            this.statusStr="进行中";
            break;
        case 2:
            this.statusStr="已结束";
            break;
      }
    },methods:{
      flushCom:function(){

        //router是路由实例,例如:var router = new Router({})history

        //router.go(n)是路由的一个方法，意思是在history记录中前进或者后退多少步，0就表示还是当前，类似window.history.go(n)

        //this.$router.go(0);
        //this.$router.replace("/activeDetail")
      }
    }
  }
</script>
<style src="../assets/css/project.css" scoped></style>
<style lang="scss" scoped>
   .activeItem span{font-size: 0.28rem; height: 0.28rem; line-height: 0.28rem;}
    .countNumBG{bottom: 0; height: 0.55rem; margin-top: -0.55rem; background-color: black; opacity: 0.6;  padding-left: 0.15rem; }
    .countNum{bottom: 0.55rem; height: 0.55rem; padding:0 0.2rem; position: relative }
    .countNum span{float: left; line-height: 0.55rem; height: 0.55rem; font-size: 0.24rem; color: white;}
    .activePrice{position:absolute; top:6.84rem; right:0.26rem; font-size: 0.3rem;line-height: 0.3rem; height: 0.3rem; font-weight: bold; color:#4285F4}
</style>


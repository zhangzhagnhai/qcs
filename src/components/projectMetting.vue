<template>
  <div>
    <img :src="projectMeeting.image" class="projectMeetingImgs"  v-if="isDetail">
    <div style="padding: 0 0.26rem; font-size: 0">
      <div v-if="!isDetail">
        <div class="projectMeetingTop">
          <img :src="projectMeeting.fenshe.fenshe_logo" >
          <div class="fenShe">
            <div class="fensheName">{{projectMeeting.fenshe.name}}</div>
            <div class="fs">
              <div>{{projectMeeting.owner}}</div>
            </div>
          </div>
        </div>

        <img :src="projectMeeting.image" class="projectMeetingImg">
      </div>

      <div class="projectMeetingName">{{projectMeeting.title}}</div>

      <div style="height: 0.26rem">
        <img src=../assets/images/riqi.png class="iconImg">
        <div class="iconFont">{{projectMeeting.start_time | formatDate}} 至 {{projectMeeting.end_time | formatDate}}</div>
      </div>

      <div style="height: 0.26rem; margin-top: 0.25rem; margin-bottom: 0.4rem;">
        <img src=../assets/images/didian.png class="iconImg">
        <div class="iconFont">{{projectMeeting.location}}</div>
      </div>

      <div v-if="isDetail&&false">
        <div class="smallLine"></div>
        <div class="projectMeetingTop">
          <img :src="projectMeeting.fenshe.fenshe_logo" >
          <div class="fenShe">
            <div class="fensheName">{{projectMeeting.fenshe.name}}</div>
            <div class="fs">
              <div>{{projectMeeting.owner}}</div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>
<script>
  import {formatDate} from '../assets/js/date.js';
  export default {
    data(){
      return {
      }
    },
    props: ['projectMeeting','isDetail'],
    filters: {
      formatDate(time) {
        //var date = new Date(time);
        return formatDate(time, "MM-dd hh:mm");
      }
    },
    created(){
       if(!this.projectMeeting.fenshe)
          this.projectMeeting.fenshe={}
       //console.log(this.projectMeeting)
    }
  }
</script>
<style src="../assets/css/project.css" scoped></style>
<style lang="scss" scoped>
</style>

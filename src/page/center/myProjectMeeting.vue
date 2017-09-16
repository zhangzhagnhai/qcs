<template>
   <div>
     <div v-title data-title="我参加的对接会">
       我参加的对接会
     </div>

     <ul>
       <li v-for="projectMeeting in projectMeetingList">
          <router-link :to="{name:'projectMeetingDetail',query:{id:projectMeeting.id}}">
            <div class="imgContainer">
              <img :src="projectMeeting.image"/>
              <div class="statusBG"></div>
              <div class="status">{{projectMeeting.com_statusString}}</div>
            </div>

            <div class="right">
                <div class="rightName">{{projectMeeting.title}}</div>
                <div class="rightItem">
                  <img src="../../assets/images/riqi.png">
                  <span class="iconFont">{{projectMeeting.created_at | formatDate}} 至 {{projectMeeting.end_time | formatDate}}</span>
                </div>
                <div class="rightItem">
                  <img src="../../assets/images/dizhi.png">
                  <span class="iconFont">{{projectMeeting.location}}</span>
                </div>
            </div>
          </router-link>
       </li>
     </ul>

     <div v-if="projectMeetingList.length==0">
       <img src="static/n.png" style="width: 3.02rem" class="noDataImg">
       <div class="noDataFont">还没参加过对接会哦~</div>
     </div>
   </div>
</template>
<script>
   import {formatDate} from '../../assets/js/date.js';
   import {host} from '../../assets/js/util'
   export default{
     data(){
       return{
          projectMeetingList: []
       }
     }, mounted(){
       this.templateId = this.$route.query.templateId;
       this.getData();
     },methods:{
       getData(){
         var _this=this;
         _this.$emit("loading",true);
         $.getJSON(host+"/center/centerJoinCommunication",{id:this.id}).then(function (response) {
           _this.projectMeetingList=response.communiation;
           for(var i=0;i< _this.projectMeetingList.length;i++){
             switch(_this.projectMeetingList[i].com_status){
               case 0:
                 _this.projectMeetingList[i].com_statusString="未开始";
                 break;
               case 1:
                 _this.projectMeetingList[i].com_statusString="进行中";
                 break;
               case 2:
                 _this.projectMeetingList[i].com_statusString="已结束";
                 break;
             }
           }
           _this.$emit("loading",false);
         })
       }
     },
     filters: {
       formatDate(time) {
         var date = new Date(time);
         return formatDate(time, "MM-dd hh:mm");
       }
     },
   }
</script>
<style src="../../assets/css/myProjectMeeting.css" scoped>

</style>

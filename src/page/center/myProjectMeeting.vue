<template>
   <div>
     <div v-title data-title="我参加的对接会">
       我参加的对接会
     </div>

     <div class="cutLines"></div>
     <div class="fsNav">
       <div class="fsNavs">
         <div :class="select==1?'select':''" @click="selectMenu(1)">资源方参会</div>
         <div :class="select==2?'select':''" @click="selectMenu(2)">项目方参会</div>
       </div>
     </div>

     <ul class="zyList" v-if="select==1">
       <li v-for="projectMeeting in personProjectMeetingList">
          <router-link :to="{name:'projectMeetingDetail',query:{id:projectMeeting.id}}">
            <div class="imgContainer">
              <img :src="projectMeeting.image"/>
              <div class="statusBG"></div>
              <div class="status">{{projectMeeting.com_statusStr}}</div>
            </div>

            <div class="right">
                <div class="rightName">{{projectMeeting.title}}</div>
                <div class="rightItem">
                  <img src="../../assets/images/riqi.png">
                  <span class="iconFont">{{projectMeeting.start_time}} 至 {{projectMeeting.end_time}}</span>
                </div>
                <div class="rightItem">
                  <img src="../../assets/images/dizhi.png">
                  <span class="iconFont">{{projectMeeting.location}}</span>
                </div>
            </div>
          </router-link>
       </li>
     </ul>

     <ul class="xmList" v-if="select==2">
       <li v-for="projectMeeting in programCommunicationProgram">
         <router-link :to="{name:'projectMeetingDetail',query:{id:projectMeeting.id}}">
           <div style="display: inline-block">
             <div class="imgContainer">
               <img :src="projectMeeting.image"/>
               <div class="statusBG"></div>
               <div class="status">{{projectMeeting.communication_statusStr}}</div>
             </div>
             <div class="right">
               <div class="rightName">{{projectMeeting.communication_name}}</div>
               <div class="rightItem">
                 <img src="../../assets/images/riqi.png">
                 <span class="iconFont">{{projectMeeting.start_time}} 至 {{projectMeeting.end_time}}</span>
               </div>
               <div class="rightItem">
                 <img src="../../assets/images/dizhi.png">
                 <span class="iconFont">{{projectMeeting.location}}</span>
               </div>
             </div>
           </div>

           <div class="xmDetail">
              <div class="xmName">
                <img src="static/xiangmuer.png">
                <span>{{projectMeeting.program_name}}</span>
                <i>{{projectMeeting.statusStr}}</i>
              </div>
             <!-- <div class="xmPrice">
                 <span class="dj"><span>已付定金</span><span class="price">¥8888.00</span></span>
                <span><span>尾款待确认</span><span class="price">¥8888.00</span></span>
              </div>-->
           </div>
         </router-link>
       </li>
     </ul>
     <div v-if="(personProjectMeetingList.length==0&&select==1)||(programCommunicationProgram.length==0&&select==2)">
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
          select:1,
         personProjectMeetingList: [],
         programCommunicationProgram:[]
       }
     }, mounted(){
       this.templateId = this.$route.query.templateId;
       this.getData();
     },methods:{
       getData(){
         var _this=this;
         _this.$emit("loading",true);
        /* $.getJSON(host+"/center/centerJoinCommunication",{id:this.id}).then(function (response) {
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
         })*/
         $.getJSON(host+"/center/joinCommunicationPerson").then(function (response) {
           _this.personProjectMeetingList=response.communiation;
           _this.$emit("loading",false);
         })

         $.getJSON(host+"/center/joinCommunicationProgram").then(function (response) {
           _this.programCommunicationProgram=response.communication;
           _this.$emit("loading",false);
         })
       },
       selectMenu(index){
         this.select=index
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

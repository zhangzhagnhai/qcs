<template>
  <div>
    <div v-title data-title="我的项目">
      我的项目
    </div>
    <!--我的项目-->
    <ul class="myProject">
       <li class="myProjectLi" v-for="(project,index) in myProjectList" @click="submit(project.id,index)" :style="index==myProjectList.length-1?'border:none':''">
         <div>
           <img :src="project.image">
           <div class="container">
             <div class="name">{{project.name}}</div>
             <ul>
               <li>
                  <div class="status">投递</div>
                  <div class="statusNum">{{project.deliver_count?project.deliver_count:"一"}}</div>
               </li>
               <li>
                 <div class="status">反馈</div>
                 <div class="statusNum">{{project.feedback_count?project.feedback_count:"一"}}</div>
               </li>
               <li>
                 <div class="status">兴趣</div>
                 <div class="statusNum">{{project.interesting_count?project.interesting_count:"一"}}</div>
               </li>
               <li>
                 <div class="status">评论</div>
                 <div class="statusNum">{{project.comments_count?project.comments_count:"一"}}</div>
               </li>
               <li>
                 <div class="status">赞</div>
                 <div class="statusNum">{{project.star_count?project.star_count:"一"}}</div>
               </li>
             </ul>
           </div>
          </div>
       </li>
    </ul>

    <div class="defaultSubmit"></div>
    <router-link :to="{name:'projectSubmit',query:{meetingId:meetingId}}" class="submitButton">创建新项目</router-link>
  </div>
</template>
<script>
  import projectCenter from "../../components/projectCenter.vue";
  import {host} from '../../assets/js/util'
  export default {
    data(){
      return {
        myProjectList:[],
        meetingId:""
      }
    },created(){
    },
    methods:{
      getData(){
        var _this=this;
        _this.$emit("loading",true);
        $.getJSON(host+"/center/userProgramList",{id:this.id}).then(function (response) {
          _this.myProjectList=response.programs;
          _this.$emit("loading",false);
        })
      },submit(id,index){
        console.log(id)
        var _this=this;
        if(this.meetingId){
          $.getJSON(host+"/communication/joinCommunicationOfProgram",{communication_id:this.meetingId,program_id:id}).then(function (response) {
            if(response.code){
              Overlay.show("报名成功")
            }else{
              Overlay.show(response.msg)
            }
          })
        }else{
          $.getJSON(host+"/service/deliverProgram",{investor_id:this.id,program_id:id}).then(function (response) {
            if(response.code){
              if(_this.myProjectList[index].deliver_count)
                _this.myProjectList[index].deliver_count=parseInt(_this.myProjectList[index].deliver_count)+1;
              else{
                _this.myProjectList[index].deliver_count=1
              }
              Overlay.show("投递成功")
            }else{
              Overlay.show(response.msg)
            }
          })
        }
      }
    }, mounted(){
      this.id = this.$route.query.id;
      this.meetingId = this.$route.query.meetingId;
      this.templateId = this.$route.query.templateId;
      this.getData();
    },
    components:{
      projectCenter
    }
  }
</script>
<style src="../../assets/css/investorMenu.css" scoped></style>
<style scoped>
  .myProject{padding-left: 0.26rem}
  .myProject .myProjectLi{padding: 0.3rem 0; height: 1.5rem; border-bottom: 0.5px solid #dddddd;}
  .myProject img{height: 1.5rem; width: 1.5rem; float: left; border-radius: 3px; border: 0.5px solid #c3ced9;}
  .myProject .container{float: left; width: 5.23rem; margin-left: 0.25rem; height: 1.5rem;}
  .name{height:0.52rem; line-height: 0.52rem; font-size: 0.32rem; color: #464c56}

  .myProject ul{height: 0.7rem;margin-top: 0.33rem;margin-left: -0.6rem;}
  .myProject ul li{float: left; margin-left: 0.6rem}
  .status{height: 0.26rem; line-height: 0.26rem; font-size: 0.26rem; color: #969fa9}
  .statusNum{margin-top:0.15rem; height: 0.24rem; line-height: 0.24rem; font-size: 0.24rem;color: #4285F4; text-align: center}

  .interest{padding-left: 0.26rem;}
  .interest li{height: 1.6rem; padding: 0.3rem 0; border-bottom: 0.5px solid #dddddd; position: relative;}
</style>

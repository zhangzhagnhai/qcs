<template>
  <div>
    <div v-title data-title="我的项目">
      我的项目
    </div>
    <div class="cutLines"></div>
    <div class="fsNav">
      <div class="fsNavs">
        <div :class="select==1?'select':''" @click="selectMenu(1)">我的项目</div>
        <div :class="select==2?'select':''" @click="selectMenu(2)">感兴趣的项目</div>
      </div>
    </div>

    <!--我的项目-->
    <ul v-if="select==1" class="myProject">
       <li class="myProjectLi" v-for="(project,index) in myProjectList" :style="index==myProjectList.length-1?'border:none':''">
         <router-link :to="{name:'projectDisplay',query:{id:project.id,isMyProject:'true'}}">
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
          </router-link>
       </li>
    </ul>

    <!--我感兴趣的项目-->
    <ul v-if="select==2" class="interest">
      <li v-for="(project,index) in projectList" :style="index==projectList.length-1?'border:none':''">
        <router-link :to="{name:'projectDetail',query:{id:project.id}} ">
          <projectCenter :project="project"></projectCenter>
        </router-link>
      </li>
    </ul>

    <div v-if="myProjectList.length==0&&select==1">
      <img src="static/f.png" style="width: 3.02rem" class="noDataImg">
      <div class="noDataFont">暂时还没有发布项目~</div>
    </div>

    <div v-if="projectList.length==0&&select==2">
      <img src="static/f.png" style="width: 3.02rem" class="noDataImg">
      <div class="noDataFont">还没有我感兴趣的项目~</div>
    </div>

    <div class="defaultSubmit"></div>
    <router-link to="projectSubmit" class="submitButton">创建新项目</router-link>
  </div>
</template>
<script>
  import projectCenter from "../../components/projectCenter.vue";
  import {host} from '../../assets/js/util'
  export default {
    data(){
      return {
        select: 1,
        myProjectList:[],
        projectList:[]
      }
    },methods:{
      getData(){
        var _this=this;
        if(this.select==1){
          if(this.myProjectList.length==0){
            _this.$emit("loading",true);
            $.getJSON(host+"/center/userProgramList").then(function (response) {
              _this.myProjectList=response.programs;
              _this.$emit("loading",false);
            })
          }
        }else{
          if(this.projectList.length==0){
            _this.$emit("loading",true);
            $.getJSON(host+"/center/userProgramInteresting").then(function (response) {
              _this.projectList=response.interesting;
              _this.$emit("loading",false);
            })
          }
        }
      },
      selectMenu(index){
        this.select=index;
        this.getData();
      }
    }, mounted(){
      this.id = this.$route.query.id;
      this.templateId = this.$route.query.templateId;
      this.getData();
    },
    components:{
      projectCenter
    }
  }
</script>
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

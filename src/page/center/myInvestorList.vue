<template>
  <div>
    <!--接受项目列表-->
    <ul v-if="isInvestor">
      <li v-for="(project,index) in projectList" :style="index==projectList.length-1?'border:none':''">
          <router-link :to="{name:'projectDisplay',query:{isMyProject:'false',id:project.id}}">
           <projectCenter :project="project" showStatus="true"></projectCenter>
          </router-link>
      </li>
    </ul>

    <div v-if="projectList.length==0">
      <img src="static/f.png" style="width: 3.02rem" class="noDataImg">
      <div class="noDataFont">暂时还没有接受到的项目呢~</div>
    </div>
  </div>
</template>
<script>
  import projectCenter from "../../components/projectCenter.vue";
  export default {
    data(){
      return {
       // projectList:[]
      }
    },props:["isInvestor","projectList"],
    created(){
      //this.projectList=[]
    },
    methods:{
      goToRZ:function(){
        console.log(11)
        /*去认证，判断是否选择投资类型*/
        if(this.isInvestorType==0){
          this.isInvestorTypeSelect=this.isInvestorType;
          this.showCheckType=true;
        }else{
          this.select=2
        }
      }
    }, components:{
      projectCenter
    }
  }
</script>
<style src="../../assets/css/project.css" scoped></style>
<style scoped>
  ul{padding-left: 0.26rem;}
  li{height: 1.6rem; padding: 0.3rem 0; border-bottom: 0.5px solid #dddddd; position: relative;}
</style>

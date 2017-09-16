<template>
  <div>
    <img class="logoIcon" :src="project.image">
    <span v-if="showStatus" class="fk fkSelect">{{project.result_str}}</span>
    <div class="projectAttend">
      <div class="projectAttendName">{{project.name}}</div>
      <div style="margin-top: 0.14rem; height: 0.26rem">
        <div class="title_tag" v-for="labelsArr in project.request">
          <div class="img"></div>
          <div class="font">{{labelsArr.name}}</div>
        </div>
      </div>
      <div style="margin-top: 0.24rem; height: 0.26rem">
        <div class="address" style="float: left">
          <span>{{project.county_str}}</span>
          <span style="margin-right: 0.2rem">{{project.city_str}}</span>
          <img src="../assets/images/didian.png" style="margin-right: 0.1rem">
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data(){
      return {}
    },props:["project","showStatus"],
    methods:{
      goToRZ:function(){

      }
    }
  }
</script>
<style src="../assets/css/project.css" scoped></style>
<style scoped>
  ul{padding-left: 0.26rem;}
  li{height: 1.6rem; padding: 0.3rem 0; border-bottom: 0.5px solid #dddddd; position: relative;}
  .logoIcon{object-fit:cover; float: left; height: 1.5rem; width: 1.5rem; border-radius: 5px;}
  .projectAttend{float: left; margin-left: 0.3rem; width: 4.8rem; height: 1.5rem; font-size: 0}
  .projectAttendName{width:4.1rem; display: inline-block; overflow:hidden; text-overflow: ellipsis; white-space: nowrap; font-size: 0.32rem; height: 0.52rem; line-height: 0.52rem; color: #464c56}
  .check{float:left; background:url('../assets/images/xuanzhong.png') center center; background-size: cover; width: 0.36rem; height: 0.36rem; margin-top: 0.58rem;}
  .unCheck{float:left; background:url('../assets/images/kong.png') center center; background-size: cover; width: 0.36rem; height: 0.36rem; margin-top: 0.58rem;}

  .fk{position:absolute; box-sizing: border-box; right:0.26rem; font-size: 0.24rem; height: 0.4rem; line-height: 0.4rem; padding: 0.01rem 0.1rem; border: 0.5px solid #969fa9; color: #969fa9; border-radius: 3px;}
  li .fkSelect{border: 0.5px solid #4285F4; color:#4285F4 }
</style>

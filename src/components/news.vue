<template>
   <router-link :to="{name : 'newsDetail',query: {id: personInfo.id, newsType: newsType}}" style="height: 1.8rem; padding: 0.3rem 0.26rem;">
     <div class="infoList">
       <p>{{personInfo.title}}</p>
       <div class="newsFs">{{personInfo.fenshe.name}}</div>
       <div class="infoContainer">
         <span class="infoDate">{{personInfo.created_at|formatDate}}</span>
         <span class="infoReads">{{personInfo.show_views}} 阅</span>
       </div>
     </div>
     <div class="infoListImg" :style="{'backgroundImage':'url('+personInfo.image+')'}"></div>
   </router-link>
</template>
<script>
  import {formatDate} from '../assets/js/date.js';
  export default {
    data(){
      return {

      }
    },
    filters: {
      formatDate(time) {
        //var date = new Date(time);
        return formatDate(time, "yyyy-MM-dd hh:mm");
      }
    },
    props: ['personInfo','newsType'],
    created(){
      if(!this.personInfo.fenshe){
        this.personInfo.fenshe={}
      }
    }
  }
</script>
<style src="../assets/css/infoList.css" scoped></style>
<style lang="scss" scoped>
</style>

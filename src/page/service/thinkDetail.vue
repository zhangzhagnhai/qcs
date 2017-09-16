<template>
  <div>
    <div v-title :data-title="personInfo.title">
      {{personInfo.title}}
    </div>

    <div class="newsTitle">{{personInfo.title}}</div>
   <!-- <div style="height: 0.5rem; padding: 0 0.26rem;">
      <img :src="personInfo.img" class="fsImg">
      <div class="fsName">{{personInfo.fs}}</div>
    </div>-->
    <div class="time">
      <div>{{personInfo.created_at|formatDate}}&nbsp;&nbsp;|&nbsp;&nbsp;{{personInfo.show_views}}热度</div>
    </div>
    <div class="template" style="margin-top:0.3rem; font-size: 16px; color: #444444; line-height:1.5; padding-top:0">
  <!--    <div class="smallLine"></div>-->
      <div v-html="this.personInfo.content"></div>
    </div>
  </div>
</template>
<script>
  import {formatDate} from '../../assets/js/date.js';
  import {host} from '../../assets/js/util'
  export default {
    data () {
      return {
        personInfo:
          {},
        id:0,
        newsType:0
      }
    },created(){

    },mounted(){
      this.id=this.$route.query.id;
      this.templateId = this.$route.query.templateId;
      this.getData();
    }, methods: {
      getData(){
        var _this = this;
        _this.$emit("loading",true);
        $.getJSON(host + "/service/zhikuDetail",{id:this.id}).then(function (response) {
          _this.$emit("loading",false);
          if(response.zhiku.readable){
            _this.personInfo = response.zhiku;
          }else{
            _this.$router.push("thinkList");
          }
        })
      }
    },
    filters: {
      formatDate(time) {
        var date = new Date(time);
        return formatDate(time, "yyyy-MM-dd hh:mm");
      }
    }
  }


</script>
<style src="../../assets/css/infoList.css" scoped></style>
<style scoped>
    .newsTitle{font-size: 0.46rem; font-weight: bold; line-height: 0.71rem; text-align: left; color: #464c56; padding: 0.28rem 0.26rem}
    .fsImg{float: left; width: 0.5rem; height: 0.5rem;  border-radius: 50%}
    .fsName{float: left; height: 0.5rem; line-height: 0.5rem; color: #464c56; font-size: 0.26rem; margin-left: 0.2rem}
    .time{height: 0.26rem; font-size: 0; padding: 0 0.26rem;}
    .time div{font-size: 0.26rem; line-height: 0.26rem; float: left; color: #969fa9}
</style>

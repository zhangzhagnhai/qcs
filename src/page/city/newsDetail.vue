<template>
  <div>
    <div v-title :data-title='newsTypeName'>
      {{newsTypeName}}
    </div>

    <div class="newsTitle">{{personInfo.title}}</div>
    <div style="height: 0.5rem; padding: 0 0.26rem;">
      <img :src="personInfo.fenshe.fenshe_logo" class="fsImg">
      <div class="fsName">{{personInfo.fenshe.name}}</div>
    </div>
    <div class="time">
      <div>{{personInfo.created_at|formatDate}}&nbsp;&nbsp;|&nbsp;&nbsp;{{personInfo.show_views}}阅</div>
    </div>
    <div class="template" style="font-size: 0.36rem; color: #6c747c; line-height:0.66rem; padding-top:0">
  <!--    <div class="smallLine"></div>-->
      <div v-html="personInfo.content"></div>
    </div>
  </div>
</template>
<script>
  import {formatDate} from '../../assets/js/date.js';
  import {host,shareHref} from '../../assets/js/util'
  export default {
    data () {
      return {
        personInfo:
        {
          fenshe:{}
        },
        id:"",
        newsType:0,
        templateId:"",
        newsTypeName:""
      }
    },created(){
      this.newsType=this.$route.query.newsType;
      switch (this.newsType-0){
        case 0:
          this.newsTypeName="创投资讯"
          break;
        case 1:
          this.newsTypeName="区块链"
          break;
        case 2:
          this.newsTypeName="创投人物"
          break;
        default:
          this.newsTypeName="创投资讯"
      }
      this.id=this.$route.query.id;
      this.templateId=this.$route.query.templateId;

    },methods:{
      getData(){
        var _this=this;
        _this.$emit("loading",true);
        var href=shareHref+"#newsDetail?id="+this.id+"&newsType="+this.newsType+"&templateId="+this.templateId;
        $.getJSON(host+"/city/newsDetail",{id:this.id}).then(function (response) {
          _this.personInfo=response.news;
          _this.$emit("loading",false);
          _czc.push(["_trackPageview",response.news.title]);
          JSDK.setShare({
            title:response.news.title,
            desc:response.news.summary,
            imgUrl:response.news.image,
            href:href
          });
        })
      }
    },
    filters: {
      formatDate(time) {
        var date = new Date(time);
        return formatDate(time, "yyyy-MM-dd hh:mm");
      }
    },mounted(){
      this.getData();
    }
  }


</script>
<style src="../../assets/css/infoList.css" scoped></style>
<style scoped>
    .newsTitle{font-size: 0.46rem; font-weight: bold; line-height: 0.71rem; text-align: left; color: #464c56; padding: 0.28rem 0.26rem}
    .fsImg{float: left; width: 0.5rem; height: 0.5rem;  border-radius: 50%; border: 0.5px solid #efefef; box-sizing:border-box;}
    .fsName{float: left; height: 0.5rem; line-height: 0.5rem; color: #464c56; font-size: 0.26rem; margin-left: 0.2rem}
    .time{height: 0.6rem; font-size: 0; padding: 0 0.26rem;}
    .time div{font-size: 0.26rem; line-height: 0.82rem; float: left; color: #969fa9}
</style>

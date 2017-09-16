<template>
  <div>
    <loading :showLoading="showLoading"></loading>
    <router-view ref="routerView" class="child-view" :style="{display:display}" @loading="setLoading"></router-view>
  <!--  <transition :name="transitionName">
      <router-view ref="routerView" class="child-view" :style="{display:display}"></router-view>
    </transition>-->
  </div>
</template>

<script>
  import {host} from '../assets/js/util'
  import loading from '../components/loading'
  export default {
    data () {
      return {
        transitionName: 'slide-left',
        getFenSheData:false,
        display:true,
        showLoading:false
      }
    },
    created(){
      this.templateId=this.$route.query.templateId?this.$route.query.templateId:'5';
      var stateArray=this.getQueryStringByName('state').split("_");
      if(stateArray&&stateArray.length>1&&(location.href.length-location.href.indexOf("#"))<=2){
        var stateObj={};
        console.log(stateArray);
        for(var i=0;i<stateArray.length;i++){
          var tempArray=stateArray[i].split("+");
          stateObj[tempArray[0]]=tempArray[1]
        }
        if(stateObj.templateId)
          this.$route.query.templateId=stateObj.templateId;
        this.$router.push({path: stateObj.dist,query:stateObj});
      }else{
        this.$route.query.templateId=this.templateId;
      }
      var ua = window.navigator.userAgent.toLowerCase();
      if(ua.match(/MicroMessenger/i) == 'micromessenger'){

      }else{
       // this.$router.push({path: 'hello'});
      }
      this.setShare();
    },
    methods:{
      setShare(to,from){
        if(to&&from&&to.name==from.name)
          return
        var href='http://' + location.host + location.pathname+"?templateId="+this.templateId;
        this.$route.query.fenshe=window.fenshe;
        JSDK.setShare({
          title:"氢创同城",
          desc:"世界上本没有城，志同道合的人多了，便有了城。关注创投，分享精彩！",
          imgUrl:window.fenshe.fenshe_logo,
          href:href
        });
      },
      setLoading(flag){
        this.showLoading=flag
      },
      getQueryStringByName(name) {
          var result = location.href.match(new RegExp("[\?\&]" + name + "=([^\&]+)", "i"));
          if (result == null || result.length < 1) {

            return "";

          }
          return result[1];
       }},
    beforeRouteUpdate (to, from, next) {

      var ua = window.navigator.userAgent.toLowerCase();
      if(ua.match(/MicroMessenger/i) == 'micromessenger'){

      }else{
        console.log(to.name)
        if(to.name!='hello'){
          //this.$router.push({path: 'hello'});
        }
      }
      //this.display="none";
      window.scrollTo(0, 0)

      let isBack = this.$router.isBack
      if (isBack) {
        this.transitionName = 'slide-right'
      } else {
        this.transitionName = 'slide-left'
      }
      this.$router.isBack = false;
      console.log(this.$router.isBack)
      next();

    },
    watch: {
      "$route": "setShare"
    },components: {
      loading
    }
  }
</script>

<style scoped>
  .child-view {
  position: absolute;
  width:100%;
/*  transition: all .8s cubic-bezier(.55,0,.1,1);*/
  }
  .slide-left-enter, .slide-right-leave-active {
    opacity: 0;
    -webkit-transform: translate(50px, 0);
    transform: translate(50px, 0);
  }
  .slide-left-leave-active, .slide-right-enter {
    opacity: 0;
    -webkit-transform: translate(-50px, 0);
    transform: translate(-50px, 0);
  }
  .header {
    position:absolute;
    height:44px;
    background:#0058f1;
    width:100%
  }
</style>

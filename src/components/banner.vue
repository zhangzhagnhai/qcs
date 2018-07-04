<template>
  <div style="font-size: 0px; width: 100%; overflow: hidden; position: relative">
    <ul class="imgUl" :style="{transform: 'translate(-'+(7.5*banners.length)+'rem, 0px)'}">
      <li v-for="(banner,index) in banners">
        <a :href="banner.url"><img :src="banner.image" class="logoImg"></a>
      </li>
      <li v-for="(banner,index) in banners">
        <a :href="banner.url"><img :src="banner.image" class="logoImg"></a>
      </li>
    </ul>
    <div style="position:absolute; height: 0.18rem; bottom: 0.2rem;left: 0; right: 0; margin: 0 auto; text-align: center;">
      <div id="whiteList" style="display: inline-block">
        <div v-for="(banner,index) in banners" :id="'radio'+index" class="white" :value="index+1" :style="(index==0)?'background-color: rgb(1, 147, 230)':'white'"></div>
       <!-- <div id="radio1" class="white" value="1" style="background-color: rgb(1, 147, 230);"></div>
        <div id="radio2" class="white" value="2" style="background-color: white;"></div>-->
      </div>
    </div>

    <input id="lunboCount" :value=banners.length style="display: none">
  </div>
</template>
<script>
  import '../assets/js/jquery.min.js';
  import '../assets/js/hammer.js';
  import {host,shareHref} from '../assets/js/util'
  import {scroll} from '../assets/js/scroll.js';
  export default {
    data(){
      return{
        banners:[
        ]
      }
    },created(){
      var _this=this
      $.getJSON(host+"/global/getProgramLunbo").then(function (response) {
        _this.banners=response;
        setTimeout(function(){
          var obj=scroll(_this.banners.length)
          obj.init();
        })
      })
    }
  }
</script>
<style src="../assets/css/infoList.css" scoped></style>
<style scoped>
  ul{
    touch-action: none; -webkit-user-select: none; -webkit-user-drag: none; -webkit-tap-highlight-color: rgba(0, 0, 0, 0); transition: all 1s ease;
  }
</style>


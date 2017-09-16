<template>
  <div style="font-size: 0px; width: 100%; overflow: hidden; position: relative">
    <ul class="imgUl" :style="{transform: 'translate(-'+(7.5*banners.length)+'rem, 0px)'}">
      <li v-for="(banner,index) in banners">
        <router-link :to="{name : banner.href}"><img :src="banner.src" class="logoImg"></router-link>
      </li>
      <li v-for="(banner,index) in banners">
        <router-link :to="{name : banner.href}"><img :src="banner.src" class="logoImg"></router-link>
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
  import {scroll} from '../assets/js/scroll.js';
  export default {
    data(){
      return{
        banners:[{
          href:"index",
          src:"http://www.hcsoo.com/test/Public/upload/img/2017-04-22/58fae5c1ef66c.jpg"
        },{
          href:"index",
          src:"http://www.hcsoo.com/test/Public/upload/img/2017-04-22/58fae6046e699.jpg"
        },
          {
            href:"index",
            src:"http://www.hcsoo.com/test/Public/upload/img/2017-04-22/58fae6046e699.jpg"
          }
        ]
      }
    },created(){
      setTimeout(function(){
        var obj=scroll()
        obj.init();
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


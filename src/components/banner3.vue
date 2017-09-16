<template>
  <swiper :options="swiperOption" ref="mySwiper" style="font-size: 14px; overflow: hidden; height: 4.3rem; padding-left: 0.4rem;  background-color: #f7f7f7;">
    <!-- slides -->
    <swiper-slide v-for="banner in banners" :key="banner.index" style="width: 6.7rem; height: 4.3rem">
      <router-link :to="{name : banner.href}" style="width: 6.7rem; height: 4.3rem"><img :src="banner.src" class="logoImg"></router-link>
    </swiper-slide>
    <!-- Optional controls -->
    <div class="swiper-pagination" slot="pagination"></div>
    <div class="swiper-button-prev" slot="button-prev"></div>
    <div class="swiper-button-next" slot="button-next"></div>
    <div class="swiper-scrollbar"   slot="scrollbar"></div>
  </swiper>
</template>

<script>
  import { swiper, swiperSlide } from 'vue-awesome-swiper'
  // swiper options example:
  export default {
    name: 'carrousel',

    data() {
      return {
        banners: [
          {
            index: 0,
            href: "index",
            src: "http://www.hcsoo.com/test/Public/upload/img/2017-04-22/58fae5c1ef66c.jpg"
          }, {
            index: 1,
            href: "index",
            src: "http://www.hcsoo.com/test/Public/upload/img/2017-04-22/58fae6046e699.jpg"
          },
          {
            index: 2,
            href: "index",
            src: "http://www.hcsoo.com/test/Public/upload/img/2017-04-22/58fae6046e699.jpg"
          }
        ],
        swiperOption: {//以下配置不懂的，可以去swiper官网看api，链接http://www.swiper.com.cn/api/
          // notNextTick是一个组件自有属性，如果notNextTick设置为true，组件则不会通过NextTick来实例化swiper，也就意味着你可以在第一时间获取到swiper对象，<br>　　　　　　　　假如你需要刚加载遍使用获取swiper对象来做什么事，那么这个属性一定要是true
          notNextTick: true,
          // swiper configs 所有的配置同swiper官方api配置
          autoplay: 2500,
          direction: 'horizontal',
          spaceBetween: 10,
          slidesPerView: 'auto',
         /* centeredSlides: true,*/
          autoplayDisableOnInteraction : false,
          grabCursor: true,
          setWrapperSize: true,
          autoHeight: true,
          pagination: '.swiper-pagination',
          paginationClickable: true,
          prevButton: '.swiper-button-prev',//上一张
          nextButton: '.swiper-button-next',//下一张
          scrollbar: '.swiper-scrollbar',//滚动条
          mousewheelControl: true,
          observeParents: true,
          loop: true,
          // 如果自行设计了插件，那么插件的一些配置相关参数，也应该出现在这个对象中，如下debugger
          debugger: true,
        }
      }
    }, components: {
      swiper,
      swiperSlide
    }

  }
</script>

<style>
  .swiper-wrapper{
    width: 9999px;
  }
  .swiper-slide {
    float: left;
    width: 6.7rem;
    height: 4.3rem;
  }

  .swiper-slide img{
    width: 6.7rem;
    height: 3.44rem;
    margin:0.43rem 0;
    border-radius: 5px;
  }

  .swiper-slide-active img{
    width: 6.7rem;
    height: 3.7rem;
    margin:0.3rem 0;
  }

  .swiper-pagination{display:none; position: absolute; width: 7.5rem; height: 0.18rem; top: 3.74rem; left: 0px; right: 0px; margin: 0 auto; text-align: center; font-size: 0}
  .swiper-pagination-bullet{
    height: .18rem;
    width: .18rem;
    background-color: #fff;
    border-radius: 50%;
    margin: 0 .08rem;
    display: inline-block;}

  .swiper-pagination-bullet-active{background-color: #0193e6}
</style>


<template>
  <div style="font-size: 0">
    <div v-title data-title="城里">
      城里
    </div>
    <banner></banner>
    <!--菜单-->
    <div v-if="showMenu" class="cityMenuContain">
      <div ref="scrollMenu" class="scrollMenu">
        <div class="cityMenu">
          <router-link :to="{name:'cityMenu',query: {typeMenu: 0}}" tag="span">创投资讯<div class="cityMenuBorder"></div></router-link>
          <router-link :to="{name:'cityMenu',query: {typeMenu: 1}}" tag="span">区块链<div class="cityMenuBorder"></div></router-link>
          <router-link :to="{name:'cityMenu',query: {typeMenu: 2}}" tag="span">活动<div class="cityMenuBorder"></div></router-link>
          <router-link :to="{name:'cityMenu',query: {typeMenu: 3}}" tag="span">创投人物<div class="cityMenuBorder"></div></router-link>
          <router-link :to="{name:'cityMenu',query: {typeMenu: 4}}" tag="span">氢创圈<div class="cityMenuBorder"></div></router-link>
          <router-link :to="{name:'cityMenu',query: {typeMenu: 5}}" tag="span">氢创同城<div class="cityMenuBorder"></div></router-link>
        </div>
      </div>
     <!-- <div class="cutLines"></div>-->
      <img src="../../assets/images/yinying.png">
      <div class="smallLine" style="width: 100%; margin: 0; padding: 0;"></div>
    </div>

    <!--创投资讯-->
    <div class="menu">
        <div class="menuLeftImg"></div>
        <div class="menuLeftName">创投资讯</div>
         <router-link v-if="filterNewsList.length>0" :to="{name:'cityMenu',query: {typeMenu: 0}}">
          <div class="menuRightImg"></div>
          <div class="menuRightName">全部</div>
        </router-link>
    </div>

    <div v-if="filterNewsList.length>0">
      <div v-for="(newsInfo,index) in filterNewsList">
        <news v-bind:personInfo=newsInfo newsType="0"></news>
        <div v-if="index!=filterNewsList.length-1" class="smallLine"></div>
      </div>

      <div v-if="newsShowZK&&newsList.length>newsLimit" class="zhanKai">
        <div style="display: inline-block" @click="expandNews">
          <span>展开更多</span>
          <img src="../../assets/images/zhankai.png">
        </div>
      </div>
    </div>

    <div v-if="filterNewsList.length==0">
      <img src="static/z.png" style="width: 3.31rem" class="noDataImg">
      <div class="noDataFont">暂无创投资讯呢~</div>
    </div>

    <div class="cutLines"></div>
    <!--区块链-->
    <div class="menu">
      <div class="menuLeftImg"></div>
      <div class="menuLeftName">区块链</div>
      <router-link v-if="filterNewsList.length>0" :to="{name:'cityMenu',query: {typeMenu: 1}}">
        <div class="menuRightImg"></div>
        <div class="menuRightName">全部</div>
      </router-link>
    </div>

    <div v-if="filterBlockList.length>0">
      <div v-for="(blockInfo,index) in filterBlockList">
        <news v-bind:personInfo=blockInfo newsType="1"></news>
        <div v-if="index!=filterBlockList.length-1" class="smallLine"></div>
      </div>

      <div v-if="BlockShowZK&&BlockList.length>BlockLimit" class="zhanKai">
        <div style="display: inline-block" @click="expandBlock">
          <span>展开更多</span>
          <img src="../../assets/images/zhankai.png">
        </div>
      </div>
    </div>

    <div v-if="filterBlockList.length==0">
      <img src="static/z.png" style="width: 3.31rem" class="noDataImg">
      <div class="noDataFont">暂无区块链呢~</div>
    </div>

    <div class="cutLines"></div>
    <!--活动-->
    <div class="menu">
      <div class="menuLeftImg"></div>
      <div class="menuLeftName">活动</div>
      <router-link v-if="filterActiveList.length>0" :to="{name:'cityMenu',query: {typeMenu: 2}}">
        <div class="menuRightImg"></div>
        <div class="menuRightName">全部</div>
      </router-link>
    </div>

    <div v-if="filterActiveList.length>0">
      <div v-for="(active,activeIndex) in filterActiveList">
          <active v-bind:active=active></active>
          <div v-if="activeIndex!=filterActiveList.length-1" class="smallLine"></div>
      </div>

      <div v-if="activeShowZK&&activeList.length>activeLimit" class="zhanKai">
        <div style="display: inline-block" @click="expandActive">
          <span>展开更多</span>
          <img src="../../assets/images/zhankai.png">
        </div>
      </div>
     </div>

    <div v-if="filterActiveList.length==0">
      <img src="static/x.png" style="width: 3.27rem" class="noDataImg">
      <div class="noDataFont">还没有开展任何的活动~</div>
    </div>

    <div class="cutLines"></div>

    <!--创投人物-->
    <div class="menu">
      <div class="menuLeftImg"></div>
      <div class="menuLeftName">创投人物</div>
      <router-link v-if="filterNewsPersonList.length>0" :to="{name:'cityMenu',query: {typeMenu: 3}}">
        <div class="menuRightImg"></div>
        <div class="menuRightName">全部</div>
      </router-link>
    </div>

    <div v-if="filterNewsPersonList.length>0">
      <div v-if="filterNewsPersonList.length>0">
        <div v-for="(personInfo,personIndex) in filterNewsPersonList">
          <news v-bind:personInfo=personInfo newsType="2"></news>
          <div v-if="personIndex!=filterNewsPersonList.length-1" class="smallLine"></div>
        </div>

        <div v-if="newsPersonShowZK&&newsPersonList.length>newsPersonLimit" class="zhanKai">
          <div style="display: inline-block" @click="expandPersonNews">
            <span>展开更多</span>
            <img src="../../assets/images/zhankai.png">
          </div>
        </div>
      </div>
    </div>

    <div v-if="filterNewsPersonList.length==0">
      <img src="static/c.png" style="width: 3.49rem" class="noDataImg">
      <div class="noDataFont">暂无创投人物的专访~</div>
    </div>
    <div class="cutLines"></div>

    <!--广告-->
    <img class="ad" src="static/ad.jpg" >
    <div class="cutLines"></div>

    <!--人脉-->
    <div class="menu">
      <div class="menuLeftImg"></div>
      <div class="menuLeftName">人脉</div>
      <router-link v-if="filterConnection.length>0" :to="{name:'cityMenu', query: {typeMenu: 4}}">
        <div class="menuRightImg"></div>
        <div class="menuRightName">全部</div>
      </router-link>
    </div>

    <div v-if="filterConnection.length>0">
      <div v-for="(connection,connectionIndex) in filterConnection">
        <connection v-bind:connection=connection></connection>
        <div v-if="connectionIndex!=filterConnection.length-1" class="smallLine"></div>
      </div>

      <div v-if="connectionShowZK&&connectionList.length>connectionLimit" class="zhanKai">
        <div style="display: inline-block" @click="expandConnection">
          <span>展开更多</span>
          <img src="../../assets/images/zhankai.png">
        </div>
      </div>
    </div>

    <div v-if="filterConnection.length==0">
      <img src="static/v.png" style="width: 3.74rem" class="noDataImg">
      <div class="noDataFont">还没有人脉加入,快来抢占先机~</div>
    </div>
    <div class="cutLines"></div>

    <!--关于氢创同城-->
    <div class="menu">
      <div class="menuLeftImg"></div>
      <div class="menuLeftName">关于氢创同城</div>
      <router-link :to="{name:'cityMenu', query: {typeMenu: 5}}">
        <div class="menuRightImg"></div>
        <div class="menuRightName">全部</div>
      </router-link>
    </div>

    <router-link :to="{name:'cityMenu', query: {typeMenu: 4}}">
      <img :src="center.web_image" class="aboutQcs">
    </router-link>
    <foot select="1"></foot>
  </div>
</template>
<script>
  import news from '../../components/news'
  import active from '../../components/active'
  import connection from '../../components/connection'
  import foot from '../../components/Foot'
  import {host,shareHref} from '../../assets/js/util'
  import banner from '../../components/banner'
  export default {
    data(){
      return {
        newsList:[],
        newsLimit:3,
        newsShowZK:true,
        BlockList:[],
        BlockLimit:3,
        BlockShowZK:true,
        newsPersonList:[],
        newsPersonLimit:3,
        newsPersonShowZK:true,
        activeList:[],
        activeLimit:2,
        activeShowZK:true,
        connectionList:[],
        connectionLimit:4,
        connectionShowZK:true,
        center:{},
        defaultHeight:0,
        showMenu:false,
        templateId:""
      }
    },
    created(){
    },
    methods: {
      setShare(){
        var href=shareHref+"#cityIndex?templateId="+this.templateId;
        JSDK.setShare({
          title:"氢创同城丨城里",
          desc:"世界上本没有城，志同道合的人多了，便有了城。关注创投，分享精彩！",
          imgUrl:window.fenshe.fenshe_logo,
          href:href
        });
      },
      getData: function () {
        var _this=this;
        _this.$emit("loading",true);
        $.getJSON(host+"/city/cityIndex").then(function (response) {
          _this.newsList=response.news;
          _this.BlockList=response.newsQukuailian;
          _this.newsPersonList=response.newsPerson;
          _this.connectionList=response.relationship;
          _this.activeList=response.activity;
          _this.center=response.center;
          _this.setShare();
          _this.$emit("loading",false);
        })
      },
      expandNews:function(){
        if(!this.newsShowZK)
          return;
        this.newsShowZK=false;
        this.newsLimit=this.newsList.length>8?8:this.newsList.length;
      },
      expandBlock:function(){
        if(!this.BlockShowZK)
          return;
        this.BlockShowZK=false;
        this.BlockLimit=this.BlockList.length>8?8:this.BlockList.length;
      },
      expandPersonNews:function(){
        if(!this.newsPersonShowZK)
          return;
        this.newsPersonShowZK=false;
        this.newsPersonLimit=this.newsPersonList.length>8?8:this.newsPersonList.length;
      },
      expandActive:function(){
        if(!this.activeShowZK)
          return;
        this.activeShowZK=false;
        this.activeLimit=this.activeList.length>8?8:this.activeList.length;
      },
      expandConnection:function(){
        if(!this.connectionShowZK)
          return;
        this.connectionShowZK=false;
        this.connectionLimit=this.connectionList.length>8?8:this.connectionList.length;
      }
    },
    computed:{
      filterNewsList:function(){
        console.log(this.newsList.slice(0,this.newsLimit))
        return this.newsList.slice(0,this.newsLimit)
      },
      filterBlockList:function(){
        console.log(this.BlockList.slice(0,this.BlockLimit))
        return this.BlockList.slice(0,this.BlockLimit)
      },
      filterNewsPersonList:function(){
        return this.newsPersonList.slice(0,this.newsPersonLimit)
      },
      filterActiveList:function(){
        return this.activeList.slice(0,this.activeLimit)
      },
      filterConnection:function(){
        return this.connectionList.slice(0,this.connectionLimit)
      }
    },
    components: {
      news,
      banner,
      active,
      connection,
      foot
    },mounted(){
      if(this.newsList.length>0){
        return
      }
      this.templateId=this.$route.query.templateId;
      this.getData();
      var _this=this;
      window.onscroll = function () {
        console.log(document.documentElement.scrollTop)
        _this.defaultHeight=4.12*document.body.offsetWidth/7.5;
        if(_this.defaultHeight<document.documentElement.scrollTop){
          _this.showMenu=true;
        }
        else{
          _this.showMenu=false;
        }
      }
    }
  }
</script>
<style src="../../assets/css/cityMenu.css" scoped></style>
<style lang="scss" scoped>
    .smallLine{width: 7.24rem; margin-left: 0.26rem}
    .ad{height: 2rem; width: 7.5rem;}
    .aboutQcs{padding:0.3rem 0.26rem; width: 6.98rem; height: 3.92rem; border-radius: 5px;}

    .cityMenuContain{position: fixed; top:0; width: 100%; background-color: white; z-index: 100;}
</style>

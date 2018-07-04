<template>
  <div>
    <div v-title data-title="城里">
      城里
    </div>

    <!--菜单-->
    <div class="cityMenuContain">
      <div ref="scrollMenu" class="scrollMenu">
        <div class="cityMenu">
          <span ref="a" :class="selectIndex==0?'select':''"  @click="selectMenu(0)" >创投资讯<div class="cityMenuBorder"></div></span>
          <span ref="b" :class="selectIndex==1?'select':''"  @click="selectMenu(1)" >区块链<div class="cityMenuBorder"></div></span>
          <span ref="c" :class="selectIndex==2?'select':''"  @click="selectMenu(2)" >活动<div class="cityMenuBorder"></div></span>
          <span ref="d" :class="selectIndex==3?'select':''"  @click="selectMenu(3)" >创投人物<div class="cityMenuBorder"></div></span>
          <span ref="e" :class="selectIndex==4?'select':''"  @click="selectMenu(4)" >氢创圈<div class="cityMenuBorder"></div></span>
          <span ref="f" :class="selectIndex==5?'select':''"  @click="selectMenu(5)" >投资人<div class="cityMenuBorder"></div></span>
        </div>
      </div>
      <div class="cutLines"></div>
      <img src="../../assets/images/yinying.png">
    </div>

    <div style="height: 1.15rem;"></div>
    <div   v-if="control">
        <div v-if="selectIndex==0" v-for="(news,newsIndex) in newInfos" class="infos">
          <news :personInfo="news" newsType="0"></news>
        </div>
        <div v-if="newInfos.length==0&&selectIndex==0">
          <img src="static/z.png" style="width: 3.31rem" class="noDataImg">
          <div class="noDataFont">暂无创投资讯呢~</div>
        </div>

        <div v-if="selectIndex==1" v-for="(blockchain,blockchainIndex) in blockchains" class="infos">
          <news :personInfo="blockchain" newsType="1"></news>
        </div>
        <div v-if="blockchains.length==0&&selectIndex==1">
          <img src="static/z.png" style="width: 3.31rem" class="noDataImg">
          <div class="noDataFont">暂无创投资讯呢~</div>
        </div>

        <div v-if="selectIndex==2" v-for="(active,activeIndex) in activeList" class="infos">
          <active v-bind:active=active></active>
        </div>
        <div v-if="activeList.length==0&&selectIndex==2">
          <img src="static/x.png" style="width: 3.27rem" class="noDataImg">
          <div class="noDataFont">还没有开展任何的活动~</div>
        </div>

        <div v-if="selectIndex==3" v-for="(personInfo,personIndex) in personInfos" class="infos">
          <news :personInfo="personInfo"  newsType="2"></news>
        </div>
        <div v-if="personInfos.length==0&&selectIndex==3">
          <img src="static/c.png" style="width: 3.49rem" class="noDataImg">
          <div class="noDataFont">暂无创投人物的专访~</div>
        </div>

        <div v-if="selectIndex==4" v-for="(connection,connectionIndex) in connectionList" class="infos">
          <member v-bind:connection=connection></member>
        </div>
        <div v-if="connectionList.length==0&&selectIndex==4">
          <img src="static/v.png" style="width: 3.74rem" class="noDataImg">
          <div class="noDataFont">还没有会员加入,快来抢占先机~</div>
        </div>

        <div v-if="selectIndex==5" v-for="(investor,investorIndex) in investorList" class="infos">
          <router-link class="aDiv"  :to="{ name : 'investorDetail', query: {id: investor.id,investType:1}}">
            <investor v-bind:investor=investor></investor>
           </router-link>
        </div>
        <div v-if="investorList.length==0&&selectIndex==5">
          <img src="static/s.png" style="width: 3.74rem" class="noDataImg">
          <div class="noDataFont">还没有投资人的加入~</div>
        </div>
        <!--<div v-if="selectIndex==5">
          <aboutQcs v-bind:aboutQcs=aboutQcs></aboutQcs>
        </div>-->


    </div>

    <foot select="1"></foot>
  </div>
</template>
<script>
  import news from '../../components/news';
  import active from '../../components/active'
  import connection from '../../components/connection'
  import member from '../../components/member'
  import investor from '../../components/investor'
  import aboutQcs from '../city/aboutQcs'
  import foot from '../../components/Foot'
  import {host,shareHref} from '../../assets/js/util'
  export default {
    data () {
      return {
        selectIndex:1,
        newInfos:[
        ],
        blockchains:[],
        personInfos:[
        ],
        activeList:[
         ],
        connectionList:[
        ],
        investorList:[],
        aboutQcs:{

        },
        width:[],
        control:false,
        templateId:""
      }
    },
    created(){
      this.selectIndex= parseInt(this.$route.query.typeMenu);
      if(this.selectIndex!=1&&this.selectIndex!=2&&this.selectIndex!=3&&this.selectIndex!=4&&this.selectIndex!=5){
        this.selectIndex=0
      }
      this.type = this.$route.params.type;
      this.templateId=this.$route.query.templateId;
      this.control=false;
     // this.getData();
    },
    methods:{
      shareInit(){
        this.setShare(window.fenshe.fenshe_logo);
      },
      getData(){
        var _this=this;
        console.log(this.selectIndex)
        this.shareInit();
        this.setMenu();
        switch(this.selectIndex){
          case 0:
            if(this.newInfos.length<1){
              _this.$emit("loading",true);
              $.getJSON(host+"/city/newsList").then(function (response) {
                _this.newInfos=response.news;
                //_this.newInfos.length=6;
                _this.control=true;
                _this.$emit("loading",false);
              })
            }else{
              _this.control=true;
            }
            break;
          case 1:
            if(this.blockchains.length<1){
              _this.$emit("loading",true);
              $.getJSON(host+"/city/newsQukuailianList").then(function (response) {
                _this.blockchains=response.newsQukuailian;
                //_this.newInfos.length=6;
                _this.control=true;
                _this.$emit("loading",false);
              })
            }else{
              _this.control=true;
            }
            break;
          case 2:
            if(this.activeList.length<1){
              _this.$emit("loading",true);
              $.getJSON(host+"/city/activityList").then(function (response) {
                _this.activeList=response.activity;
                _this.control=true;
                _this.$emit("loading",false);
              })
            }else{
              _this.control=true;
            }
            break;
          case 3:
            if(this.personInfos.length<1){
              _this.$emit("loading",true);
              $.getJSON(host+"/city/newsPersonList").then(function (response) {
                _this.personInfos=response.newsPerson;
                _this.control=true;
                _this.$emit("loading",false);
              })
            }else{
              _this.control=true;
            }
            break;
          case 4:
            if(this.connectionList.length<1){
              _this.$emit("loading",true);
              $.getJSON(host+"/city/relationshipList").then(function (response) {
                _this.connectionList=response.relationship;
                _this.control=true;
                _this.$emit("loading",false);
              })
            }else{
              _this.control=true;
            }
            break;
          case 5:
            if(this.investorList.length<1){
              _this.$emit("loading",true);
              $.getJSON(host+"/city/investorList").then(function (response) {
                _this.investorList=response.investor;
                _this.control=true;
                _this.$emit("loading",false);
              })
            }else{
              _this.control=true;
            }
            break;
          default:
            if(this.newInfos.length<1){
              _this.$emit("loading",true);
              $.getJSON(host+"/city/newsList").then(function (response) {
                _this.newInfos=response.news;
                _this.control=true;
                _this.$emit("loading",false);
              })
            }else{
              _this.control=true;
            }
        }
      },
      setShare(imgUrl){
        var href=shareHref+"#cityMenu?typeMenu="+this.selectIndex+"&templateId="+this.templateId;
        console.log(href)
        var title='';
        var desc='';
        switch(this.selectIndex){
          case 0:
            title="氢创同城丨创投资讯";
            desc="放眼全球，汇集全国，聚焦同城。热门不造作，前沿不浮夸，来点猛料！";
            break;
          case 1:
            title="氢创同城丨创投资讯";
            desc="放眼全球，汇集全国，聚焦同城。热门不造作，前沿不浮夸，来点猛料！";
            break;
          case 2:
            title="氢创同城丨活动列表";
            desc="让项目资本资源，精准对接。给得再多，不如懂你！";
            break;
          case 3:
            title="氢创同城丨创投人物";
            desc="每一段成功的背后，总是因为他们做对了什么。氢创创投，领航成功！";
            break;
          case 4:
            title="氢创同城丨人脉";
            desc="你的朋友，决定圈子";
            break;
          case 5:
            title="氢创同城丨找资金";
            desc="让项目资本资源，精准对接。氢创创投，给你需要！";
            break;
          default:
            title="氢创同城丨创投资讯";
            desc="放眼全球，汇集全国，聚焦同城。热门不造作，前沿不浮夸，来点猛料！";

        }
        JSDK.setShare({
          title:title,
          desc:desc,
          imgUrl:imgUrl,
          href:href
        });
      },
      selectMenu(index){
        this.selectIndex=index;
        this.control=false;
        this.getData();
        this.setShare();
      },
      setMenu(){
        if(this.$refs.a&&!this.width[0]){
          this.width[0]=this.$refs.a.offsetWidth;
          this.width[1]=this.$refs.b.offsetWidth;
          this.width[2]=this.$refs.c.offsetWidth;
          this.width[3]=this.$refs.d.offsetWidth;
          this.width[4]=this.$refs.e.offsetWidth;
          this.width[5]=this.$refs.f.offsetWidth;
          var containWidth=this.$refs.scrollMenu.offsetWidth;
          var totalWidth=0;
          for(var i=0;i<=this.selectIndex;i++)
          {
            totalWidth+=  this.width[i];
          }
          totalWidth-=containWidth;
          this.$refs.scrollMenu.scrollLeft =totalWidth>0?totalWidth:0;
        }
      },
      refresh:function(done){
        console.log("bbb")
        done();
      },
      infinite: function (done) {
        console.log(this.newInfos.length)
        var _this = this;
        $.getJSON(host+"/city/newsList").then(function (response) {
          _this.newInfos=_this.newInfos.concat(response.news);
          console.log(_this.newInfos.length)
          _this.control=true;
          done();
        })
      }
    },mounted(){
      this.getData();
      this.setMenu();
    },
    components:{
      news,
      active,
      connection,
      member,
      investor,
      aboutQcs,
      foot
    }
  }


</script>
<style src="../../assets/css/cityMenu.css" scoped></style>
<style scoped>
  .infos > :first-child{border-bottom: 0.5px solid #ddd}
  .infos:last-child > :first-child{border: none}
</style>


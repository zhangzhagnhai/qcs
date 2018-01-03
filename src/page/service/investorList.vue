<template>
  <div>
    <div v-title data-title="找资金">
      找资金
    </div>

    <div class="cutLines"></div>
    <div class="fsNav">
      <div class="fsNavs">
        <div :class="select==1?'select':''" @click="select=1">投资人</div>
        <div :class="select==2?'select':''" @click="select=2">投资机构</div>
      </div>
    </div>
    <!--投资人-->
    <ul v-if="select==1">
      <li v-for="(investor,index) in investorList">
        <router-link class="aDiv"  :to="{ name : 'investorDetail', query: {id: investor.id,investType:1}}">
          <investor :investor="investor" investType="1"></investor>

          <div v-if="index!=investorList.length-1" class="smallLine" style="margin-left: 0.26rem; width: 7.24rem;"></div>
        </router-link>
      </li>
    </ul>
    <div v-if="investorList.length==0&&select==1">
      <img src="static/s.png" style="width: 3.36rem" class="noDataImg">
      <div class="noDataFont">还没有投资人的加入~</div>
    </div>
    <!--投资机构-->
    <ul v-if="select==2">
      <li v-for="(investor,index) in organizationList">
        <router-link class="aDiv"  :to="{ name : 'investorDetail', query: {id: investor.id,investType:2}}">
          <investor :investor="investor" investType="2"></investor>
          <div v-if="index!=organizationList.length-1" class="smallLine" style="margin-left: 0.26rem; width: 7.24rem;"></div>
        </router-link>
      </li>
    </ul>
    <div v-if="organizationList.length==0&&select==2">
      <img src="static/a.png" style="width: 3.36rem" class="noDataImg">
      <div class="noDataFont">还没有投资机构的加入~</div>
    </div>
  </div>
</template>

<script>
  import investor from '../../components/investor'
  import {host,shareHref} from '../../assets/js/util'
  export default {
    data(){
      return{
          select:1,
          investorList:[],
          organizationList:[]
      }
    },
    created(){
      //this.investorList=[]
      this.templateId=this.$route.query.templateId;
    }, methods:{
      getData(){
        var _this=this;
        this.setShare();
        _this.$emit("loading",true);
        $.getJSON(host+"/service/investor").then(function (response) {
           _this.investorList=response.investor;
           _this.organizationList=response.organization;
          console.log(response)
          _this.$emit("loading",false);
        })
      },
      setShare(){
        var href=shareHref+"#investorList?templateId="+this.templateId;
        JSDK.setShare({
          title:"氢创同城丨找资金",
          desc:"让项目资本资源，精准对接。氢创创投，给你需要！",
          imgUrl:window.fenshe.fenshe_logo,
          href:href
        });
      }
    },mounted(){
      this.templateId=this.$route.query.templateId;
      this.getData();
    },
    components: {
      investor
    }
  }
</script>
<style src="../../assets/css/investorMenu.css" scoped></style>

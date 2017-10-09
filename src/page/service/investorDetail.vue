<template>
   <div>
     <div v-title :data-title="investor.name">
       {{investor.name}}
     </div>
     <!--头部-->
     <div style="height: 1.55rem; padding:0.3rem 0.26rem">
       <div style="float:left;position: relative; width: 6.98rem">
         <span class="fs">{{investor.fenshe.name}}</span>
         <img :src="investor.image" class="img" :style="investType==1?'border-radius:50%':'border-radius:3px'">
         <div class="nav_right">
           <div class="nav_name">
             <div>{{investor.name}}</div>
           </div>
           <div class="summary">{{investor.motto}}</div>
           <div class="fkl">
             <span>投递数:</span><span class="num">{{investor.programs_count}}</span><span style="padding-left: 0.4rem">反馈率:</span><span class="num">{{investor.return_percent}}%</span>
           </div>
         </div>
       </div>
     </div>

     <div class="cutLineFont">{{investType==1?"人物介绍":"机构介绍"}}</div>
     <p class="companyContentx">{{investor.introduce}}</p>

     <div class="cutLineFont">{{investType==1?"投资偏好":"投资与资源"}}</div>
     <div style="padding: 0 0.26rem; font-size: 0.28rem;">
       <div class="frame">投资领域</div>
       <p class="frameP">{{investor.invest_field}}</p>
       <div style="border-bottom: 0.5px solid #d1d1d1;"></div>

       <div class="frame">投资案例</div>
       <p class="frameP">{{investor.invest_case}}</p>
       <div style="border-bottom:0.5px solid #d1d1d1;"></div>

       <div class="frame">行业资源</div>
       <p class="frameP">{{investor.invest_resource}}</p>
       <div style="border-bottom:0.5px solid #d1d1d1;"></div>

       <div class="frame">投资地区</div>
       <p class="frameP">{{investor.invest_area}}</p>
       <div style="border-bottom: 0.5px solid #d1d1d1;"></div>

       <div class="frame">投资阶段</div>
       <p class="frameP">{{investor.invest_stage}}</p>
     </div>

     <div class="cutLineFont">{{investType==1?"投资的公司":"经营的公司"}}</div>
     <div v-for="(company,index) in investor.companys"  class="companyContain"  :style="index!=investor.companys.length-1?'border-bottom: 0.5px solid #d1d1d1':''">
       <div style="display: inline-block">
         <div class="companyImg" :style="{'backgroundImage':'url('+company.image+')'}"></div>
         <div class="companyRight">
           <div>{{company.name}}</div>
           <p>{{company.introduce}}</p>
         </div>
       </div>
     </div>
     <div v-if="investor.companys.length==0" style="margin: 1rem auto; font-size: 0.28rem; height:0.28rem;color: #999999;text-align: center ">暂无经营公司</div>

     <div v-if="investor.user_id" class="defaultSubmit"></div>
     <div v-if="investor.user_id" style="height: 0.88rem; position: fixed; bottom: 0; background-color: white;">
       <div class="smallLine"></div>
       <div class="buttonLeft">
         <img src="../../assets/images/liuyan.png" style="float: left; height: 0.36rem;">
         <span @click="showTalkText">留言</span>
       </div>
       <router-link :to="{name:'selectProject',query:{id:id}}" class="buttonRight">投递项目</router-link>
     </div>

     <talk @setTalk="setTalk" :showTalk="showTalk" :id='uid' :hasTalked="investor.hasTalked"></talk>
   </div>
</template>

<script>
  import investor from '../../components/investor'
  import talk from '../../components/talk'
  import {host} from '../../assets/js/util'
  export default {
    data(){
      return{
        investor:{
          fenshe:{},
          companys:[]
        },
        id:"",
        uid:"",
        investType:"",
        showTalk:false
      }
    },
    created(){

    },
    methods:{
      getData(){
        var _this=this;
        var href=location.href.split('#')[0]+"#investorDetail?id="+this.id+"&investType="+this.investType+"&templateId="+this.templateId;
        _this.$emit("loading",true);
        $.getJSON(host+"/service/investorDetail",{id:this.id}).then(function (response) {
          _this.uid=response.investor.user_id;
          _this.investor=response.investor;
          _this.$emit("loading",false);

          JSDK.setShare({
            title:response.investor.name,
            desc:response.investor.motto,
            imgUrl:response.investor.image,
            href:href
          });
        })
      },
      setTalk(){
        this.showTalk=false;
        this.investor.hasTalked=true;
      },
      showTalkText(){
        if(localStorage.getItem("userId")!=this.id){
          this.showTalk=true;
        }
      }
    },
    components: {
      investor,
      talk
    },mounted(){
      this.id = this.$route.query.id;
      this.investType = this.$route.query.investType;
      this.templateId=this.$route.query.templateId;
      this.getData();
    }
  }
</script>
<style src="../../assets/css/investorDetail.css" scoped></style>
<style src="../../assets/css/activeDetail.css" scoped></style>
<style scoped>
   .img{width: 1.55rem; height: 1.55rem; float:left; border-radius: 3px;  border: 0.5px solid #efefef; box-sizing:border-box;}
   .nav_right{display:inline-block; float:left;height: 1.55rem; margin-left: 0.3rem}
   .nav_name{ height: 0.48rem; line-height: 0.48rem; font-size: 0.4rem; font-weight: bold; max-width: 5rem;overflow: hidden;}
   .nav_name div{float: left; color: #464c56;}
   .summary{font-size: 0.26rem; height: 0.66rem; line-height: 0.66rem; color:#6c747c; max-width: 5rem; white-space: nowrap; overflow: hidden;text-overflow: ellipsis;}
   .fkl{font-size: 0.26rem; height: 0.26rem; line-height: 0.26rem; color: #969fa9; }
   .num{color: #4285F4; padding-left: 0.22rem;}

   .fs{position:absolute; right:0; top: 0; padding: 0.04rem 0.1rem; border: 0.5px solid #dddddd; border-radius: 3px; font-size: 0.24rem; color: #969fa9;}

   .companyContentx{line-height: 0.5rem; font-size: 0.3rem; margin-top: 0.2rem; margin-bottom: 0.26rem;  padding: 0 0.3rem; color:#6c747c;   white-space: pre-wrap;  word-wrap: break-word; }

   .companyContain{padding: 0 0 0.2rem 0.3rem; height: 1.8rem; margin-top:0.2rem;}
   .companyImg{border-radius:5px; border: 0.5px solid #dddddd;}

   .companyRight div{overflow: hidden}
   .companyRight p{height: 1.32rem; overflow: hidden;}
</style>

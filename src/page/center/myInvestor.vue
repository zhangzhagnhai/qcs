<template>
   <div :class="isInvestor||select==2?'':'isGray'">
     <div v-title data-title="我是投资人">
       我是投资人
     </div>
     <div class="cutLines"></div>
     <div class="fsNav">
       <div class="fsNavs">
         <div :class="select==1?'select':''" @click="selectMenu(1)">接收的项目</div>
         <div :class="select==2?'select':''" @click="selectMenu(2)">投资人资料</div>
       </div>
     </div>

     <!--接受项目列表-->
     <investorList v-if="select==1&&isInvestor" :isInvestor="isInvestor" :projectList="projectList"></investorList>

     <!--去认证-->
     <div v-if="select==1&&!isInvestor">
       <img src="/static/yindaorenzheng.png" class="rzImg">
       <div class="rzIntroduce">想要接受项目,需要先认证成为投资人</div>
       <div class="rzGo" @click="selectMenu(2)">去认证</div>
     </div>


     <!--投资人投资机构编辑-->
     <investorEdit v-if="select==2" :isInvestorType="investor.type" :investor="investor"></investorEdit>

     <!--选择类型-->
     <div v-if="showCheckType" class="mengceng">
       <div class="mengcengBg" @click="showCheckType=false"></div>
       <div class="mengcengContain">
         <div class="mengcengTitle">
           请选择你的身份
         </div>
         <div class="mengcengCheck" style="margin-top:0.32rem;">
           <div class="mengcengCheckDiv" @click="isInvestorTypeSelect=1">
             <img :src="isInvestorTypeSelect==1?'/static/dagou.png':'/static/dagouer.png'">
             <div>我是投资人</div>
           </div>
         </div>
         <div class="mengcengCheck" style="margin-top:0.2rem; margin-bottom:0.23rem;">
           <div class="mengcengCheckDiv" @click="isInvestorTypeSelect=2">
             <img :src="isInvestorTypeSelect==2?'/static/dagou.png':'/static/dagouer.png'">
             <div>我是投资机构</div>
           </div>
         </div>
         <div class="mengcengButtons">
           <div class="mengcengButtonA" @click="showCheckType=false">取消<div class="mengcengButtonLine"></div></div>
           <div class="mengcengButtonA" @click="checkType" style="color: #4285F4">确定</div>
         </div>
       </div>
     </div>

     <prevRegister v-if="showMobile"></prevRegister>
   </div>
</template>
<script>
  import investorList from '../center/myInvestorList.vue'
  import investorEdit from '../center/myInvestorEdit.vue'
  import prevRegister from '../../components/prevRegister'
  import {host} from '../../assets/js/util'
  export default {
    data(){
      return {
        select:1,
        projectList:[],
        investor:{},
        isInvestor:true,
        isInvestorTypeSelect:1,
        showCheckType:false,
        mobile:"",
        showMobile:false
      }
    },mounted(){
      this.templateId = this.$route.query.templateId;
      this.getData();
    },methods:{
      getData(){
        var _this=this;
        _this.$emit("loading",true);
        $.getJSON(host + "/wx/getUserInfoByUid").then(function (res) {
            _this.mobile=res.mobile;
            $.getJSON(host+"/center/investorAcceptProgram").then(function (response) {
              _this.isInvestor=response.tag;
              _this.investor=response.investor;
              if(!response.tag)
                _this.investor.type=0;
              _this.projectList=response.programs;
              _this.$emit("loading",false);
            })
        })
        return;
        if(this.select==1){
          $.getJSON(host+"/center/investorAcceptProgram").then(function (response) {
            _this.isInvestor=response.tag;
            _this.investor=response.investor;
            if(!response.tag)
              _this.investor.type=0;
            _this.projectList=response.programs;
            _this.$emit("loading",false);
          })
        }else{
          $.getJSON(host+"/center/centerInvestorInfo").then(function (response) {
            _this.investor=response.investor;
            _this.$emit("loading",false);
          })
        }
      },

      selectMenu(index){
        if(index==1){
          this.select=index;
         // this.getData();
        }if(index==2){
          if(!this.mobile){
            this.showMobile=true;
          }else if(this.investor.type==0&&!this.isInvestor){
            this.isInvestorTypeSelect=this.investor.type;
            this.showCheckType=true;
          }else{
            this.select=index;
            //this.getData();
          }
        }
      },
      checkType:function(){
        /*选择投资类型*/
         this.investor.type=this.isInvestorTypeSelect;
         this.showCheckType=false;
         this.select=2
      }
    },components:{
      investorList,
      investorEdit,
      prevRegister
    }
  }
</script>
<style src="../../assets/css/investorMenu.css" scoped></style>
<style scoped>
     .isGray{background-color: #f7f7f7; bottom: 0; top:0}
     .rzImg{width:2.56rem; height: 2.14rem; display: block; margin: 0.8rem auto 1.15rem;}
     .rzIntroduce{font-size: 0.3rem; height: 0.3rem; line-height: 0.3rem; color:  #6c747c; text-align: center;}
     .rzGo{height: 0.7rem; line-height: 0.7rem; width: 1.9rem; font-size: 0.3rem; color: white; background-color:#4285F4; text-align: center; margin: 0.6rem auto; border-radius: 3px;}

     .mengcengCheck{margin-bottom:0.12rem; height: 0.44rem; line-height: 0.44rem; font-size: 0.3rem; color:  #6c747c; padding-left: 1.52rem;}
     .mengcengCheck img{height: 0.44rem; float: left;}
     .mengcengCheckDiv{display: inline-block}
     .mengcengCheckDiv div{float: left; margin-left: 0.25rem}
</style>

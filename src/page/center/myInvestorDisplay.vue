<template>
   <div>
     <img :src=investor.image   style="display:block; height: 1.55rem; width: 1.55rem; margin: 0.6rem auto 0;  overflow: hidden; box-sizing: border-box;  border: 0.5px solid #c3ced9; border-radius: 50%" />

     <div class="connectionInfo">
       <div class="connectionName">{{isInvestorType==2?'机构名称:':'姓名:'}}</div>
       <div class="inputValue">{{investor.name}}</div>
     </div>
     <div class="smallLine"></div>
     <div class="connectionInfo">
       <div class="connectionName">{{isInvestorType==2?'机构签名:':'身份签名:'}}</div>
       <div class="inputValue">{{investor.motto}}</div>
     </div>
     <!--机构介绍-->
     <div class="cutLineFont">{{isInvestorType==2?'机构介绍':'人物介绍'}}</div>
     <div class="companyContentx" style="height: auto; border: none; padding: 0">{{investor.introduce}}</div>

     <!--投资偏好-->
     <div class="cutLineFont">投资偏好</div>
     <div class="field">
       <div class="fieldArea">投资领域</div>
       <div class="companyContentx" style="height: auto; border: none; padding: 0">{{investor.invest_field}}</div>
       <div class="fieldArea">投资案例</div>
       <div class="companyContentx" style="height: auto; border: none; padding: 0">{{investor.invest_case}}</div>
       <div class="fieldArea">行业资源</div>
       <div class="companyContentx" style="height: auto; border: none; padding: 0">{{investor.invest_resource}}</div>
       <div class="fieldArea">投资地区</div>
       <div class="companyContentx" style="height: auto; border: none; padding: 0">{{investor.invest_area}}</div>
       <div class="fieldArea">投资阶段</div>
       <div class="companyContentx" style="height: auto; border: none; padding: 0">{{investor.invest_stage}}</div>
     </div>

     <!--经营的公司-->
     <div class="cutLineFont">{{isInvestorType==2?'经营的公司':'投资的公司'}}</div>
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

     <div class="defaultSubmit"></div>
     <div class="submitButton" @click="submit">编辑</div>

   </div>
</template>
<script>
  import imageUpload from '../../components/imageUpload'
  import companyItem from '../../components/companyItem.vue'
  import {host} from '../../assets/js/util'
  export default {
    data(){
      return{
      }
    },
    props:["isInvestorType","investor"],
   components:{
      imageUpload,
      companyItem
    },methods:{
      onChange () {
        console.log('New picture selected!')
        if (this.$refs.pictureInput.image) {
          this.investor.image=this.$refs.pictureInput.image;
          this.investor.img=this.$refs.pictureInput.imgId;
          console.log('Picture loaded.')
        } else {
          console.log('FileReader API not supported: use the <form>, Luke!')
        }
      },
      submit(){
        this.$emit("select",3);
        //this.showMengCeng=true;
      },
      add(){
        this.investor.companys.push({img:'',image:'',name:''})
      },
      deleteItem(e){
         this.investor.companys.splice(e,1);
      }
    }
  }
</script>
<style src="../../assets/css/connectionEdit.css" scoped></style>
<style src="../../assets/css/investorDetail.css" scoped></style>
<style scoped>
    .fieldArea{ box-sizing: border-box; padding-top:0.01rem; margin-top:0.3rem; margin-left: 0.26rem; width: 1.2rem; height: 0.4rem; line-height: 0.4rem; font-size: 0.26rem; color: white; text-align: center; background-color:#4285F4; border-radius: 3px; }
    .field .companyContentx{height: 1.8rem;}
    .delete{display:inline-block; float: right; width: 0.9rem; height: 0.4rem; border-radius: 3px; margin-right: 0.26rem; }
    .addButton{width: 6.98rem; text-align: center; border: 0.5px solid #4285F4; margin: 0.3rem auto; height: 0.7rem; border-radius: 3px; font-size: 0.28rem; line-height: 0.7rem; color: #4285f4}
    .jiaHao{margin-top:0.21rem; height: 0.28rem; float: left}
    .jiaCompany{float: left; margin-left: 0.2rem}

    .inputValue{width: 5.24rem;  overflow: hidden; white-space: nowrap; color: #6c747c;  font-size: 0.3rem;  height: 0.3rem;  line-height: 0.3rem;  padding: 0.35rem 0;}

    .companyContentx{line-height: 0.5rem; font-size: 0.3rem; margin-top: 0.2rem; margin-bottom: 0.26rem;  padding: 0 0.3rem; color:#6c747c;   white-space: pre-wrap;  word-wrap: break-word; }

    .companyContain{padding: 0 0 0.2rem 0.3rem; height: 1.8rem; margin-top:0.2rem;}
    .companyImg{border-radius:5px; border: 0.5px solid #dddddd;}

    .companyRight div{overflow: hidden}
    .companyRight p{height: 1.32rem; overflow: hidden;}
</style>

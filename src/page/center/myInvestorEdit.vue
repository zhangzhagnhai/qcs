<template>
   <div>
     <imageUpload
       ref="pictureInput"
       @change="onChange"
       :defaultImg="investor.image?investor.image:'/static/shangchuantouxiang.png'"
       style="height: 1.55rem; width: 1.55rem; margin: 0.6rem auto 0;  overflow: hidden;  box-sizing: border-box;  border: 0.5px solid #c3ced9; border-radius: 50%"></imageUpload>
     <div class="uploadHeader">上传头像</div>

     <div class="connectionInfo">
       <div class="connectionName">{{isInvestorType==2?'机构名称:':'姓名:'}}</div>
       <input type="text" placeholder="请输入你的名称" v-model="investor.name">
     </div>
     <div class="smallLine"></div>
     <div class="connectionInfo">
       <div class="connectionName">{{isInvestorType==2?'机构签名:':'身份签名:'}}</div>
       <input type="text" placeholder="请输入你的身份签名" v-model="investor.motto">
     </div>
     <!--机构介绍-->
     <div class="cutLineFont">{{isInvestorType==2?'机构介绍':'人物介绍'}}</div>
     <textarea class="companyContentx" placeholder="添加文字内容" v-model="investor.introduce"></textarea>

     <!--投资偏好-->
     <div class="cutLineFont">投资偏好</div>
     <div class="field">
       <div class="fieldArea">投资领域</div>
       <textarea class="companyContentx" placeholder="请输入你的投资领域,比如: 最新科技、农业、医疗健康等让你接受的项目更精准" v-model="investor.invest_field"></textarea>
       <div class="fieldArea">投资案例</div>
       <textarea class="companyContentx" placeholder="请输入你已经投资的案例,可以获得更多创业者的信任"  v-model="investor.invest_case"></textarea>
       <div class="fieldArea">行业资源</div>
       <textarea class="companyContentx" placeholder="请输入你拥有的资源.对接项目更精准"  v-model="investor.invest_resource"></textarea>
       <div class="fieldArea">投资地区</div>
       <textarea class="companyContentx" placeholder="主要是投资哪些地区的项目?是否有地区限制?"  v-model="investor.invest_area"></textarea>
       <div class="fieldArea">投资阶段</div>
       <textarea class="companyContentx" placeholder="主要是投资项目的哪些发展阶段?"  v-model="investor.invest_stage"></textarea>
     </div>

     <!--经营的公司-->
     <div class="cutLineFont">{{isInvestorType==2?'经营的公司':'投资的公司'}}</div>
     <ul style="font-size: 0">
       <li  v-for="(company,index) in investor.companys">
         <company-item :ref="index==investor.companys.length-1?'newCompany':''" @change="" :company="company"></company-item>
         <div style="height: 0.7rem; font-size: 0">
           <img class="delete" src="static/shanchu.png" @click="deleteItem(index)">
         </div>
         <div class="smallLine"></div>
       </li>
     </ul>

     <div class="addButton"  @click="add">
       <div style="display: inline-block">
         <img src="static/wdtztjgs.png" class="jiaHao"><div class="jiaCompany">添加公司</div>
       </div>
     </div>
     <div class="defaultSubmit"></div>
     <div class="submitButton" @click="submit">保存</div>

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
        $.post(host+"/center/centerInvestorSave", this.investor).then(function (response) {
          if(response.code){
            Overlay.show("提交成功，等待审核");
            window.history.go(-1)
          }else {
            Overlay.show(response.msg);
          }
        })
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
<style scoped>
    .fieldArea{ box-sizing: border-box; padding-top:0.01rem; margin-top:0.3rem; margin-left: 0.26rem; width: 1.2rem; height: 0.4rem; line-height: 0.4rem; font-size: 0.26rem; color: white; text-align: center; background-color:#4285F4; border-radius: 3px; }
    .field .companyContentx{height: 1.8rem;}
    .delete{display:inline-block; float: right; width: 0.9rem; height: 0.4rem; border-radius: 3px; margin-right: 0.26rem; }
    .addButton{width: 6.98rem; text-align: center; border: 0.5px solid #4285F4; margin: 0.3rem auto; height: 0.7rem; border-radius: 3px; font-size: 0.28rem; line-height: 0.7rem; color: #4285f4}
    .jiaHao{margin-top:0.21rem; height: 0.28rem; float: left}
    .jiaCompany{float: left; margin-left: 0.2rem}
</style>

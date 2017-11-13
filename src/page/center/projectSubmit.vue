<template>
  <div>
    <div v-title data-title="提交项目">
      提交项目
    </div>
    <div style="position: fixed; top:0; width: 100%; z-index: 100001">
      <div class="cutLines"></div>
      <div class="fsNav">
        <div class="fsNavs">
          <div :class="select==1?'select':''" @click="select=1">基本信息</div>
          <div :class="select==2?'select':''" @click="select=2">详细信息</div>
          <div :class="select==3?'select':''" @click="select=3" style="border: none">团队介绍</div>
        </div>
      </div>
    </div>
    <div style="height: 1.18rem"></div>

    <div v-if="select==1" style="font-size: 0">
      <projectPageOne :userInfo="userInfo"></projectPageOne>
    </div>
    <div v-if="select==2" style="font-size: 0">
      <projectPageTwo :userInfo="userInfo"></projectPageTwo>
    </div>
    <div v-if="select==3" style="font-size: 0">
      <projectPageThree :userInfo="userInfo"></projectPageThree>
    </div>

    <div class="defaultSubmit"></div>
    <div class="submitButton" @click="submit">{{id?"保存":"提交"}}</div>
  </div>
</template>
<script>
  //import pictureInput from 'vue-picture-input'
  import imageUpload from '../../components/imageUpload'
  import projectPageOne from '../../page/center/projectPageOne'
  import projectPageTwo from '../../page/center/projectPageTwo'
  import projectPageThree from '../../page/center/projectPageThree'
  import {host} from '../../assets/js/util'
  export default {
    data(){
      return {
        select: 1,
        id:"",
        meetingId:"",
        userInfo:{
        }
      }
    },mounted(){
      console.log(this.$route.query.isMyProject)
      this.id=this.$route.query.id;
      this.meetingId=this.$route.query.meetingId;
      this.select=this.$route.query.select?this.$route.query.select:1;
      this.isMyProject=true;
      this.getData();

    },methods:{
      getData(){
        var _this=this;
        _this.$emit("loading",true);
        if(this.id){
          $.getJSON(host+"/center/centerProgramEdit", {id: this.id}).then(function (response) {
            _this.userInfo=response.program;
            _this.$emit("loading",false);
          })
        }else{
          $.getJSON(host+"/center/centerProgramCreate").then(function (response) {
            _this.userInfo=response.program;
            _this.$emit("loading",false);
          })
        }
      },submit(){
        if(!this.userInfo.name){
          Overlay.show("请输入项目名称");
          return;
        }
        if(!this.userInfo.founder){
          Overlay.show("请输入项目创始人");
          return;
        }
        console.log(this.userInfo.mobile)
        var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
        if((this.userInfo.mobile)&&!myreg.test(this.userInfo.mobile)){
          Overlay.show("请输入正确的手机号");
          return;
        }

        var totalField=0;
        var _this=this;
        for(var i=0;i<this.userInfo.tag.length;i++){
          if( this.userInfo.tag[i].checked){
            totalField++;
          }
        }
        if(totalField>3){
          Overlay.show("项目领域最多选择三项");
          return;
        }

        var totalReq=0;
        for(var j=0;j<this.userInfo.req.length;j++){
          if( this.userInfo.req[j].checked){
            totalReq++;
          }
        }
        if(totalReq>4){
          Overlay.show("诉求最多选择四项");
          return;
        }

        $.post(host+"/center/centerProgramSave", this.userInfo).then(function (response) {
           if(response.code){
             if(_this.meetingId){
               $.getJSON(host+"/communication/joinCommunicationOfProgram",{communication_id:_this.meetingId,program_id:response.program_id}).then(function (res) {
                 if(res.code){
                   Overlay.show("提交成功");
                   window.history.go(-1)
                 }else {
                   Overlay.show(res.msg);
                 }
               });
             }else{
               Overlay.show("提交成功");
               window.history.go(-1)
             }

           }
        })
      }
    },
    components:{
      imageUpload,
      projectPageOne,
      projectPageTwo,
      projectPageThree
    }
  }
</script>
<style src="../../assets/css/projectMenu.css" scoped></style>
<style src="../../assets/css/connectionEdit.css" scoped></style>
<style scoped>

</style>

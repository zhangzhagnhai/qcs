<template>
  <div>
    <div v-title data-title="提交会员信息">
      提交会员信息
    </div>

    <div style="padding-left: 0.26rem">
      <div class="connectionInfo">
        <div class="connectionName">姓名:</div>
        <input type="text" placeholder="请输入你的姓名" v-model="userInfo.name">
      </div>
      <div class="connectionInfo">
        <div class="connectionName">性别:</div>
        <img class="sexImg" @click="userInfo.isMan=1" :src="userInfo.isMan==1?'/static/biaodanxuanzhong.png':'/static/biaodanweixuanzhong.png'"/>
        <span class="sexSpan" @click="userInfo.isMan=1">先生</span>
        <img class="sexImg" @click="userInfo.isMan=0" :src="userInfo.isMan==0?'/static/biaodanxuanzhong.png':'/static/biaodanweixuanzhong.png'" style="margin-left: 0.5rem"/>
        <span class="sexSpan" @click="userInfo.isMan=0">女士</span>
      </div>
      <div class="smallLine"></div>
      <div class="connectionInfo">
        <div class="connectionName">电话:</div>
        <input type="text" placeholder="请输入你的联系电话" v-model="userInfo.mobile">
      </div>
      <div class="smallLine"></div>
      <div class="connectionInfo">
        <div class="connectionName">单位名称:</div>
        <input type="text" placeholder="请输入你的公司名称" v-model="userInfo.company">
      </div>
      <div class="smallLine"></div>
      <div class="connectionInfo">
        <div class="connectionName">职位:</div>
        <input type="text" placeholder="请输入你的职位" v-model="userInfo.job">
      </div>
      <div class="smallLine"></div>
      <div class="type">
        <div class="connectionName">会员类型:</div>
        <ul>
           <li><img class="sexImg" @click="userInfo.vipType=1" :src="userInfo.vipType==1?'/static/biaodanxuanzhong.png':'/static/biaodanweixuanzhong.png'"/> <span @click="userInfo.vipType=1" class="sexSpan">氢芽会员</span></li>
           <li><img class="sexImg" @click="userInfo.vipType=2" :src="userInfo.vipType==2?'/static/biaodanxuanzhong.png':'/static/biaodanweixuanzhong.png'"/> <span @click="userInfo.vipType=2" class="sexSpan">氢苗会员</span></li>
           <li><img class="sexImg" src="/static/biaodanbukexuanzeannui.png"/> <span class="sexSpan">氢松会员<span style="font-size: 0.21rem; margin-left: 0.1rem">(线上申请未开发)</span></span></li>
        </ul>
      </div>
      <div class="smallLine"></div>
      <div class="rules">
        <img class="sexImg" @click="userInfo.agree=(userInfo.agree+1)%2" :src="userInfo.agree==0?'/static/biaodanxuanzhong.png':'/static/biaodanweixuanzhong.png'"/>
        <span class="agree">我已同意<router-link :to="{name:'vipRules'}" tag="span">《会员章程》</router-link>
          和<router-link :to="{name:'vipRules'}" tag="span">《保密合同》</router-link></span>
      </div>
    </div>

    <div class="defaultSubmit"></div>
    <div class="submitButton" @click="submit">提交</div>
  </div>
</template>
<script>
  import {host} from '../../assets/js/util'
  export default {
    data(){
      return {
        userInfo:{
          isMan:1,
          vipType:1,
          agree:0
        },
        project:{}
      }
    },mounted(){

    },methods:{
      submit(){
        return
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
    }
  }
</script>
<style src="../../assets/css/connectionEdit.css" scoped></style>
<style scoped>
  .sexImg{float: left; height: 0.22rem;}
  .sexSpan{float: left;font-size: 0.3rem; color: #6c747c; margin-left: 0.1rem}
  .type{  height: 2.06rem}
  .type .connectionName{float: left; line-height: 0.88rem;}
  ul{float: left; margin-top: 0.18rem;}
   li{width: 4.94rem; height: 0.55rem;  display: -moz-flex;  display: -webkit-flex;  -webkit-box-align: center;  -ms-flex-align: center;  align-items: center;  -webkit-align-items: center;  }
  .rules{height: 0.22rem;line-height: 0.22rem;margin-top:0.4rem;}
  .rules img{ margin-left: 0.26rem}
  .agree{float: left; font-size: 0.22rem; margin-left: 0.1rem; color: #969fa9}
  .agree span{color: #4285F4}
</style>

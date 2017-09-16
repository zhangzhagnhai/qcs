<template>
    <div>
      <div v-title data-title="加入氢创同城">
        加入氢创同城
      </div>
      <div class="connectionInfo">
        <div class="connectionName">姓名:</div>
        <input type="text" placeholder="请输入您的姓名" v-model="userInfo.name">
      </div>
      <div class="smallLine"></div>
      <div class="connectionInfo">
        <div class="connectionName">电话:</div>
        <input type="text" placeholder="请输入您的电话" v-model="userInfo.mobile">
      </div>
      <div class="smallLine"></div>
      <div class="connectionInfo">
        <div class="connectionName">城市:</div>
        <input type="text" placeholder="请输入您所在的城市" v-model="userInfo.location">
      </div>
      <div class="smallLine"></div>
      <div class="connectionInfo">
        <div class="connectionName">公司名称:</div>
        <input type="text" placeholder="请输入你的公司名称" v-model="userInfo.company">
      </div>
      <div class="smallLine"></div>

      <div class="connectionInfo">
        <div class="connectionName">资源:</div>
      </div>
      <textarea class="companyContentx" placeholder="请输入您的资源" v-model="userInfo.resource"></textarea>

      <div class="defaultSubmit"></div>
      <div class="submitButton" @click="submit">提交申请</div>
    </div>
</template>
<script>
  import {host} from '../../assets/js/util'
  export default {
    data(){
      return {
        userInfo:{
          name:"",
          mobile:"",
          location:"",
          company:"",
          resource:""
        }
      }
    },
    created(){
    },
    methods:{
      submit(){
        var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
        if(!myreg.test(this.userInfo.mobile)){
          Overlay.show("请输入正确的手机号")
          return;
        }
        $.getJSON(host+"/city/fensheApply",this.userInfo).then(function (response) {
            if(response.code){
              Overlay.show("提交成功")
            }
        })

      },
      addressChange(city){
          this.userInfo.province=city.province;
          this.userInfo.city=city.city;
          this.userInfo.county=city.county;
      }
    }
  }
</script>
<style src="../../assets/css/connectionEdit.css" scoped></style>
<style scoped>
  .fieldList{display:inline-block; margin:-0.2rem 0 0.15rem 1.65rem; width: 5.5rem}
  .fieldList li{margin: 0.2rem 0 0.2rem 0.3rem; float: left; width: 2.45rem; height: 0.35rem}
  .fieldList .check{height: 0.35rem; width: 0.35rem; float: left; background:url('../../assets/images/xuanzhong.png') center center; background-size: cover;}
  .fieldList .unCheck{height: 0.35rem; width: 0.35rem;  float: left; background:url('../../assets/images/kong.png') center center; background-size: cover; }
  .fieldList .fieldName{height: 0.35rem; line-height: 0.35rem; font-size: 0.32rem; color: #6c747c;float: left; margin-left: 0.18rem;}
  .tiXing{height: 0.3rem; line-height: 0.3rem;font-size: 0.3rem; color: #969fa9;}
  .companyContentx{margin: 0 auto 0.35rem; height: 2.8rem; font-size: 0.3rem;}
</style>

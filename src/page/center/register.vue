<template>
    <div style="top:0; bottom: 0; background-color: #f7f7f7;">
      <div v-title data-title="手机号绑定">
         手机号绑定
      </div>
      <div>
         <div class="bind">请绑定您的手机号</div>
        <div class="inputContent">
          <div class="inputWord">+86</div>
          <input type="number" placeholder="手机号" class="inputText" v-model='userInfo.mobile'/>
        </div>

        <div style="display: inline-block; width: 100%;">
          <div class="inputContent" style="margin-top: 0.3rem; width: 3.8rem; float: left; margin-left: 0.5rem;">
            <input type="number" placeholder="请输入短信验证码" class="inputText" v-model="userInfo.verify"/>
          </div>

          <div id="getCode" class="inputContent" @click="getCode" :style="{backgroundColor:getCodeColor,borderColor:borderColor,color:fontColor}">
            {{getCodeHtml}}
          </div>
        </div>

        <div class="button" @click="submit">立即绑定</div>
      </div>
    </div>
</template>
<script>
  import {host} from '../../assets/js/util'
  export default {
    data () {
      return {
        userInfo:{
          mobile:"",
          verify:''
        },
        checkCode:"",
        checkMobile:"",
        getCodeHtml:"获取验证码",
        getCodeColor:"white",
        borderColor:"#4285F4",
        fontColor:"#4285F4",
        num:0,
        timer:''
      }
    }, methods:{
      getCode(){
        if(this.num>0)
          return;
        var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
        if(!myreg.test(this.userInfo.mobile)){
            Overlay.show("请输入正确的手机号")
            return;
        }
        var _this=this;
        this.checkMobile=this.userInfo.mobile;
        $.getJSON(host+"/center/mobileVerify",this.userInfo).then(function (response) {
            if(response.code){
                _this.checkCode=response.verify;
                _this.countDown();
            }else{
              Overlay.show(response.msg)
            }
        })
      },countDown(){
        this.num=60;
        this.getCodeColor="#eeeeee";
        this.borderColor="#c3ced9";
        this.fontColor="#969fa9";
        this.getCodeHtml=60+"s后重新发送";
        if(this.timer)
          clearInterval(this.timer);

        var _this=this;
        this.timer=setInterval(function(){
          _this.num--;
          if(_this.num==0){
            _this.getCodeColor="white";
            _this.getCodeHtml='获取验证码';
            _this.borderColor="#4285F4";
            _this.fontColor="#4285F4";
            clearInterval(_this.timer);
          }else{
            _this.getCodeHtml=_this.num+"s后重新发送";
          }
        },1000)
      },
      submit(){
        /*绑定手机号*/
        console.log(this.checkCode)
        console.log(this.userInfo.verify)
        if(this.checkCode.toString().length>0&&this.checkCode==this.userInfo.verify&&this.checkMobile==this.userInfo.mobile){
          $.post(host+"/center/centerUserInfo",this.userInfo).then(function (response) {
            if(response.code){
              Overlay.show("绑定手机号成功")
              window.history.go(-1)
            }else{
              Overlay.show(response.msg)
            }
          })
        }else{
          Overlay.show("请输入正确的验证码")
        }

      }
    }
  }
</script>
<style scoped>
    .bind{height: 0.4rem; line-height: 0.4rem; font-size: 0.4rem; margin: 0.8rem 0 0.6rem 0.5rem; font-weight: bold; color: #464c56;}
    .inputContent{height:0.8rem; width: 6.5rem; margin: 0 auto; background-color: white; border: 0.5px solid #dddddd; border-radius: 3px;}
     #getCode{margin-top: 0.3rem; width: 2.5rem; float: right; margin-right: 0.5rem; font-size: 0.32rem; line-height: 0.8rem; text-align: center;}
    .inputWord{height: 0.32rem; line-height: 0.32rem; padding: 0.24rem 0;  float: left; margin-left: 0.3rem; font-size: 0.32rem; color: #464c56; border-radius: 3px;}
    .inputText{height: 0.32rem; line-height: 0.32rem; padding: 0.24rem 0;  float: left; margin-left: 0.35rem; width: 4.45rem; font-size: 0.32rem; color: #464c56; border-radius: 3px; }
    ::-webkit-input-placeholder{height: 0.32rem; line-height: 0.32rem; font-size: 0.32rem; padding-top: 0.09rem;}
    .button{width: 6.5rem; margin: 0.3rem auto; height: 0.88rem; line-height: 0.88rem; color: white; background-color: #4285F4; border-radius: 5px; font-size: 0.36rem; text-align: center}
</style>

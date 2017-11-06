<template>
    <div style="top:0; bottom: 0; background-color: #f7f7f7;">
      <div v-title data-title="个人中心">
        个人中心
      </div>
      <div style="padding-left: 0.26rem; background-color: white ">
        <div class="container">
           <div class="personName">头像</div>
           <img class="personArrow" src="../../assets/images/youjiantou.png">
           <div class="personImg">
             <imageUpload
               ref="pictureInput"
               @change="onChange"
               :defaultImg="userInfo.image?userInfo.image:'static/shangchuantouxiang.png'"
               style="overflow: hidden; margin: 0 auto; border-radius: 50%"></imageUpload>
           </div>

         </div>
         <router-link to="personNameEdit" class="itemContainer">
           <div class="personName">昵称</div>
           <img class="personArrow" src="../../assets/images/youjiantou.png">
           <div class="personDetail">{{userInfo.show_name}}</div>
         </router-link>
        <router-link to="register" class="itemContainer" style="border: none">
          <div class="personName">手机号</div>
          <img class="personArrow" src="../../assets/images/youjiantou.png">
          <div class="personDetail">{{userInfo.mobile?userInfo.mobile:"绑定手机号"}}</div>
        </router-link>
      </div>
    </div>
</template>
<script>
  import imageUpload from '../../components/imageUpload'
  import {host} from '../../assets/js/util'
  export default {
    data () {
      return {
         userInfo:{}
      }
    },mounted(){
      this.templateId = this.$route.query.templateId;
      this.getData();
    },methods:{
      getData(){
        var _this=this;
        _this.$emit("loading",true);
        $.getJSON(host+"/center/centerIndex").then(function (response) {
          _this.userInfo=response.user;
          _this.userInfo.image=_this.userInfo.show_img;
          _this.$emit("loading",false);
        })
      },
      onChange () {
        console.log('New picture selected!')
        if (this.$refs.pictureInput.image) {
          this.userInfo.img=this.$refs.pictureInput.imgId;
          this.userInfo.image=this.$refs.pictureInput.image;
          $.post(host+"/center/centerUserInfo",this.userInfo).then(function (response) {

          })
          console.log('Picture loaded.')
        } else {
          console.log('FileReader API not supported: use the <form>, Luke!')
        }
      }
    },
    components:{
      imageUpload
    }

  }
</script>
<style scoped>
   .container{ height:1.25rem; border-bottom: 0.5px solid #dddddd}
   .personName{float: left; font-size: 0.32rem; line-height: 1.25rem; height: 1.25rem; color: #464c56}
   .personArrow{float: right; height: 0.3rem; margin: 0.49rem 0.26rem 0 0.15rem;}
   .personImg{float: right; height: 0.9rem; width: 0.9rem; margin-top:0.16rem; border-radius: 50%; border: 0.5px solid #c3ced9; }

   .itemContainer{height: 1rem; border-bottom: 0.5px solid #dddddd}
   .itemContainer .personName{line-height: 1rem; height: 1rem;}
   .itemContainer .personArrow{margin-top: 0.35rem;}
   .personDetail{float: right;line-height: 1rem; height: 1rem; font-size: 0.28rem; color: #969fa9}
</style>

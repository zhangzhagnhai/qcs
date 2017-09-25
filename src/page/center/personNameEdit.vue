<template>
  <div style="top:0; bottom: 0; background-color: #f7f7f7;">
    <div v-title data-title="个人中心">
      个人中心
    </div>
    <div class="editContainer">
      <input class="personName" v-model="userInfo.name" @change="change" placeholder="请输入昵称"/>
      <img v-if="userInfo.name" class="personArrow" src="static/nichengshanchu.png" @click="clear">
    </div>
  </div>
</template>
<script>
  import pictureInput from 'vue-picture-input'
  import {host} from '../../assets/js/util'
  export default {
    data () {
      return {
        userInfo: {
        }
      }
    }, mounted(){
      this.templateId = this.$route.query.templateId;
      this.getData();
    }, methods: {
      getData(){
        var _this = this;
        _this.$emit("loading",true);
        $.getJSON(host + "/center/centerIndex", {id: this.id}).then(function (response) {
          _this.userInfo = response.user;
          _this.userInfo.name=_this.userInfo.show_name;
          _this.$emit("loading",false);
        })
      },
      change(){
        if(this.userInfo.name){
          $.post(host+"/center/centerUserInfo",this.userInfo).then(function (response) {

          })
        }
      },
      clear(){
        this.userInfo.name = "";
        console.log(this.userInfo.name)
      }
    },
    components: {
      pictureInput
    }

  }
</script>
<style scoped>
  .editContainer {
    padding-left: 0.26rem;
    background-color: white;
    margin-top: 0.3rem;
    height: 1rem;
  }

  .personName {
    float: left;
    line-height: 0.32rem;
    height: 0.32rem;
    font-size: 0.32rem;
    color: #464c56;
    padding: 0.34rem 0;
    width: 6rem;
  }

  .personArrow {
    float: right;
    height: 0.3rem;
    margin: 0.35rem 0.26rem 0 0.15rem;
  }

  ::-webkit-input-placeholder {
    height: 0.32rem;
    line-height: 0.32rem;
    font-size: 0.32rem;
    padding-top: 0.09rem;
  }
</style>

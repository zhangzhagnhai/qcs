<template>
    <div style="font-size: 0; background-color: #fff5eb">
      <div v-title data-title="我有好项目">
        我有好项目
      </div>
      <img src="static/woyouhaoxiangmu.png" style="width: 7.5rem">
      <router-link to="addBL"><img src="static/xiangqingyetubiao.png" class="blIcon"></router-link>
      <div style="height: 0.9rem"></div>
      <router-link to="projectSubmit" class="addBL">提交项目</router-link>
    </div>
</template>
<script>
  import {host,shareHref} from '../../assets/js/util'
  import wx from 'weixin-js-sdk'
  export default {
    data() {
      return {
        isBL:false,
        showShare:false
      }
    },
    mounted(){
      this.templateId = this.$route.query.templateId;
      this.getData();
    },
    methods: {
      getData(){
      },
      submit(){
        this.$router.push({name:'register'})
      },
      openShare(){
        this.showShare=true;
      },
      closeShare(){
        this.showShare=false;
      },
    },
    components: {
    }
  }
</script>
<style scoped="">
  .addBL{position:fixed; bottom:0; width:7.5rem; height: 0.9rem;line-height:0.88rem; font-size: 0.36rem; color: white; text-align: center; background-color: #4285F4;}
  .shareImg{background: url(/static/share1.png); background-size: cover; width: 100%; position: fixed;  height:13.34rem;  top: 0;}
</style>

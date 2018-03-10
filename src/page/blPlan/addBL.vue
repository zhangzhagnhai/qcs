<template>
    <div style="font-size: 0;">
      <div v-title data-title="加入伯乐计划">
        加入伯乐计划
      </div>
      <img src="static/jiarubolejihua.png" style="width: 7.5rem">
      <div style="height: 0.9rem"></div>
      <div v-if="!isBL" class="addBL" @click="submit">马上加入伯乐计划</div>
      <div v-if="isBL" class="addBL" @click="openShare">邀请好友成为伯乐</div>
      <div class="shareImg" v-if="showShare" @click="closeShare"></div>
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
  .addBL{position:fixed; bottom:0; width:7.5rem; height: 0.9rem;line-height:0.88rem; font-size: 0.36rem; color: #9c291d; text-align: center; background:url("../../../static/anniuBL.png");}
  .shareImg{background: url(/static/share1.png); background-size: cover; width: 100%; position: fixed;  height:13.34rem;  top: 0;}
</style>

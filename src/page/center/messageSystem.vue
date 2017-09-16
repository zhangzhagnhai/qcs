<template>
  <div class="bg">
    <div v-title data-title="系统消息">
      系统消息
    </div>
    <!--没有消息的情况-->
    <div v-if="messageList.length==0">
      <img class="emptyImg" src="static/wuxiaoxi.png">
      <div class="emptyFont">暂时没有消息呢~</div>
    </div>

    <ul id="sysContent" style="font-size: 0">
      <li v-for="message in messageList" class="left">
          <div class="time">{{message.time | formatDate}}</div>
          <div class="container">
            <img class="img" :src="fenshe.fenshe_logo">
            <div class="info">
              <div class="arrow"></div>
              <div class="message">{{message.body}}</div>
            </div>
          </div>
      </li>
    </ul>
  </div>
</template>
<script>
  import {formatDate} from '../../assets/js/date.js';
  import {host} from '../../assets/js/util'
  export default{
    data(){
      return {
        messageList: [],
        fenshe:{}
      }
    },filters: {
      formatDate(time) {
        var date = new Date(time);
        return formatDate(time, "yyyy-MM-dd hh:mm");
      }
    },mounted(){
      this.fenshe=window.fenshe;
      this.templateId = this.$route.query.templateId;
      this.id=this.$route.query.id;
      this.getData();
    },methods:{
      getData(){
        var _this = this;
        _this.$emit("loading",true);
        $.getJSON(host + "/center/centerMessageNotification", {talkId: this.id}).then(function (response) {
          if(response){
            _this.messageList = response.notification;
            _this.$emit("loading",false);
            setTimeout(function(){
              $('body').scrollTop( $('#sysContent').height());
            },100)
          }
        })
      }
    }
  }
</script>
<style src="../../assets/css/system.css" scoped></style>

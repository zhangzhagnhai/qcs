<template>
    <div>
      <div v-title data-title="我的消息">
        我的消息
      </div>
      <router-link to="messageSystem" style="height: 0.9rem; padding: 0.3rem 0.26rem;">
          <img class="icon" src="static/xitongxiaoxi.png" >
          <div class="iconName">系统消息</div>
          <div v-if="systemNum!=0" class="systemNums">{{systemNum}}</div>
          <img class="youjian" src="../../assets/images/youjian.png" >
      </router-link>

      <div class="cutLine"></div>

      <ul>
        <router-link tag="li" :to="{name:'messagePerson',query:{id:message.id}}" :key="message.id" v-for="(message,index) in messageList">
           <div style="float: left; position: relative">
             <img class="icon" :src="message.show_img">
             <div v-if="message.unread_count>0" class="redCircle"></div>
           </div>
           <div class="messageContainer">
              <div style="height: 0.44rem;">
                <div class="messageName">{{message.name}}</div>
                <div class="messageTime">{{message.recentMessage.created_at | formatDate}}</div>
              </div>
              <div class="messageInfo">{{message.recentMessage.body}}</div>
           </div>
        </router-link>
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
          systemNum:0
        }
      }, mounted(){
        this.templateId = this.$route.query.templateId;
        this.getData();
      }, methods: {
        getData(){
          var _this = this;
          _this.$emit("loading",true);
          $.getJSON(host + "/center/centerMessageList", {id: this.id}).then(function (response) {
            if(response){
              _this.messageList = response.talkers;
              _this.systemNum=response.unreadNotificationCount;
              _this.$emit("loading",false);
            }
          })
        }
      },filters: {
        formatDate(time) {
          var date = new Date(time);
          return formatDate(time, "yyyy-MM-dd hh:mm");
        }
      }
    }
</script>
<style scoped>
    .icon{width: 0.9rem; height: 0.9rem; border-radius: 50%; float: left;}
    .iconName{float: left; height: 0.9rem; line-height: 0.9rem; font-size: 0.34rem; color: #464c56; margin-left: 0.3rem;}
    .systemNums{float:left; height:0.4rem; line-height: 0.4rem; width:0.4rem; text-align: center; font-size: 0.24rem; color: white; border-radius:50%; background-color: #cc0000; margin-top: 0.25rem;margin-left: 0.15rem}
    .youjian{float: right; height: 0.34rem; margin-top: 0.28rem;}
    ul{padding-left: 0.26rem;}
    ul li{height: 0.9rem; padding: 0.3rem 0; border-bottom: 0.5px solid #dddddd;}
    .redCircle{position: absolute; top:0; left: 0.69rem; width: 0.2rem;  height: 0.2rem; background-color: #cc0000; border-radius: 50%;}

    .messageContainer{float: left; margin-left: 0.3rem; width: 5.78rem;height: 0.9rem;}
    .messageName{height: 0.44rem; line-height: 0.44rem; font-size: 0.34rem; color: #464c56; float: left;}
    .messageTime{height: 0.34rem; line-height: 0.34rem; font-size: 0.24rem; color: #969fa9; float: right;}
    .messageInfo{height:0.61rem;  line-height: 0.61rem; font-size: 0.26rem; color: #6c747c; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;}
</style>

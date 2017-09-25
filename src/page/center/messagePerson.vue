<template>
  <div class="bg">
    <div v-title data-title="消息">
      消息
    </div>
    <ul id="content" style="font-size: 0;background-color: #f7f7f7;">
      <li v-for="message in messageList" :class="message.type">
          <div class="time">{{message.time | formatDates}}</div>
          <div class="container">
            <img class="img" :src="message.send_user.show_img">
            <div class="info">
              <div class="arrow"></div>
              <div class="message">{{message.info}}</div>
            </div>
          </div>
      </li>
    </ul>

    <div style="height: 0.3rem;background-color: #f7f7f7"></div>
    <!--对话-->
    <div v-if="!showTalk">
      <div class="defaultSubmit"></div>
      <div class="submitButton" @click="showTalk=true">对话</div>
    </div>

    <div v-if="showTalk">
      <div class="mengceng">
        <div class="mengcengBg" @click='showTalk=false'></div>
        <div>
          <div class="cutLine" style="position: fixed; bottom: 4.94rem; width: 100%;"></div>
          <textarea name="content" v-model="talkString" placeholder="请输入对话内容..." ></textarea>
          <div class="submitButton" @click="talk">提交</div>
        </div>
      </div>
     </div>
  </div>
</template>
<script>
  import {formatDate,formatDateA} from '../../assets/js/date.js';
  import {host} from '../../assets/js/util'
  export default{
    data(){
      return {
        messageList: [],
        user:{},
        showTalk:false,
        talkString:""
      }
    }, mounted(){
      this.templateId = this.$route.query.templateId;
      this.id=this.$route.query.id;
      this.getData();
    },filters: {
      formatDates(time) {
        //var date = new Date(time);
        return formatDate(time, "yyyy-MM-dd hh:mm");
      }
    },methods:{
      getData(){
        var _this = this;
        _this.$emit("loading",true);
        $.getJSON(host + "/center/centerMessageDetail", {talkId: this.id}).then(function (response) {
          if(response){
            _this.messageList = response.message;
            _this.user=response.user;
            _this.$emit("loading",false);
            setTimeout(function(){
              console.log($('#content').height())
              $('body').scrollTop( $('#content').height());
            },100)
            //console.log($('#content').height())
          }
        })
      },
      talk(){
        var date = formatDateA(new Date(),"yyyy-MM-dd hh:mm:ss");

        var _this = this;
        if (this.talkString.length > 150) {
          Overlay.show("最多可输入150个字", 2000);
          return;
        }

        if (this.talkString) {
          this.messageList.push({send_user:{show_img: this.user.show_img},time:date,type:"right",info:this.talkString});
          setTimeout(function(){
            console.log($('#content').height())
            $('body').scrollTop( $('#content').height());
          },500)
          $.getJSON(host + "/center/talkToRelationship", {
            id: this.id,
            body: this.talkString
          }).then(function (response) {
            if (response) {
              _this.talkString = "";
              _this.showTalk=false;
              Overlay.show("提交成功")
            } else {
              Overlay.show("提交失败")
            }
          })
        }
      }
    }
  }
</script>
<style src="../../assets/css/system.css" scoped></style>
<style scoped>
  ul{background-color: #f7f7f7}
  textarea{position: fixed; bottom: 0.88rem; background-color: white; padding-left: 0.18rem; padding-right:0.18rem; width: 7.14rem; margin: 0 auto; height: 4.06rem; font-size: 0.27rem; display: block; line-height: 0.6rem;}
</style>

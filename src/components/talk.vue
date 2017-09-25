<template>
    <div>
      <div v-if="showTalk" class="mengceng">
        <div @click='setShowTalk' class="mengcengBg"></div>
        <div>
          <div style="height: 5.16rem;"></div>
          <div class="cutLine"></div>
          <textarea name="content" v-model="talkString" placeholder="请输入对话内容..." ></textarea>
          <div class="submitButton" @click="talk">提交</div>
        </div>
      </div>

      <div v-if="showMengCeng&&!hasTalked" class="mengceng">
        <div @click='showMengCeng=false' class="mengcengBg"></div>
        <div class="mengcengContain">
          <div class="mengcengTitle">留言已发送成功</div>
          <div class="mengcengContent" style="text-align: left;">对方回复的内容可以在个人中心的消息里查看留言</div>
          <div class="mengcengButtons">
            <div @click="showMengCeng=false" class="mengcengButtonB">确定</div>
          </div>
        </div>
      </div>
    </div>
</template>
<script>
  import {host} from '../assets/js/util'
  export default {
    data(){
      return{
        talkString:"",
        showMengCeng:false
      }
    },
    props:['id',"showTalk","hasTalked"],
    methods: {
      talk(){
        console.log(this.id);
        if (this.talkString.length > 150) {
          Overlay.show("最多可输入150个字", 2000);
          return;
        }

        if (this.talkString) {
          var _this = this;
          $.getJSON(host + "/center/talkToRelationship", {
            id: this.id,
            body: this.talkString
          }).then(function (response) {
            if (response) {
              _this.setShowTalk();
              _this.talkString = "";
              _this.showMengCeng = true;
            } else {
              Overlay.show("提交失败")
            }
          })
        }
      },
      setShowTalk(){
        this.$emit('setTalk')
      }
    }
  }
</script>
<style src="../assets/css/connectionDetail.css" scoped></style>
<style scoped>
  .smallLine{margin-left: 0.26rem; width: 7.24rem}
  .contactFont{overflow: hidden; max-width: 5rem;}
  textarea{position: fixed; bottom: 0.88rem; background-color: white; padding-left: 0.18rem; padding-right:0.18rem; width: 7.14rem; margin: 0 auto; height: 4.06rem; font-size: 0.27rem; display: block; line-height: 0.6rem;}
</style>

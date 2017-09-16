<template>
  <div>
    <div v-title data-title="评论列表">
      评论列表
    </div>

    <div class="main">
      <ul class="commentList">
        <li v-for="(comment,index) in commentList" :style="index==commentList.length-1?'':'border-bottom: 0.5px solid #dddddd'">
          <div style="height: 0.9rem; margin-top: 0.3rem; ">
            <img :src="comment.user.show_img" />
            <div class="commentContain">
              <div class="commentName">{{comment.user.show_name}}</div>
              <div class="commentDate">{{comment.created_at | formatDate}}</div>
            </div>
          </div>
          <p class="commentDetail">{{comment.body}}</p>
        </li>
      </ul>
      <div class="defaultSubmit"></div>
    </div>

    <div v-if="commentList.length==0">
      <img src="static/zanwupinglun.png" style="width: 3.02rem" class="noDataImg">
      <div class="noDataFont">暂时没有评论呢~</div>
    </div>

    <div class="submitButton" @click="showCommentInput=true">发布评论</div>
    <div v-if="showCommentInput" class="mengceng">
      <div class="mengcengBg" @click="showCommentInput=false"></div>
      <div class="textareaContainer">
        <textarea placeholder="请输入评价内容..." v-model="commentData"></textarea>
      </div>
      <div class="submitButton" @click="submit">提交</div>
    </div>


  </div>
</template>
<script>
  import {formatDate} from '../../assets/js/date.js';
  import {host} from '../../assets/js/util'
  export default {
    data(){
      return {
        commentList:[
        ],
        showCommentInput:false,
        commentData:"",
        id:"",
        templateId:""
      }

    },
    created(){
      this.id = this.$route.query.id;
      this.templateId=this.$route.query.templateId;
      console.log(1);
    },methods: {
      getData(){
        var _this=this;
        _this.$emit("loading",true);
        var href=location.href.split('#')[0]+"#projectCommentList?id="+this.id+"&templateId="+this.templateId;
        $.getJSON(host+"/communication/programCommentsList", {id:this.id}).then(function (response) {
          _this.commentList=response.comments;
          _this.$emit("loading",false);
          JSDK.setShare({
            title:"氢创同城",
            desc:"氢创同城",
            imgUrl:response.fenshe.fenshe_logo,
            href:href
          });
        })
      },
      stopEvent(e){
        e.preventDefault();
      },
      submit(){
        if(!this.commentData)
        {
          Overlay.show("请输入评论内容")
          return
        }
        var _this=this;
        var obj={};
        obj.body=this.commentData;
        obj.user={show_img:"show_img","show_name":"show_name"};
        obj.created_at=new Date();
        $.getJSON(host+"/communication/programDoComment", {id:this.id,body:this.commentData}).then(function (response) {
          if(response.code){
            _this.commentList.push(response.comment)
            _this.commentData="";
            Overlay.show("提交成功")
          }else {
            Overlay.show("提交失败")
          }
        })
        this.showCommentInput=false;
      }
    },watch:{
      showCommentInput:function(){
        console.log(arguments)
        if(this.showCommentInput==true)
           document.addEventListener('touchmove', this.stopEvent, false);
        else
           document.removeEventListener('touchmove', this.stopEvent, false);
      }
    },
    filters: {
      formatDate(time) {
        var date = new Date(time);
        return formatDate(time, "yyyy-MM-dd  hh:mm");
      }
    },
    mounted(){
      this.getData();
    }
  }
</script>
<style src="../../assets/css/comment.css" scoped></style>
<style lang="scss" scoped>
    textarea{box-sizing: border-box;  -moz-box-sizing: border-box;  -webkit-box-sizing: border-box; color: #6c747c;
      font-size: 0.3rem; padding: 0.2rem 0.25rem; line-height: 0.5rem; width: 6.98rem; height: 3.4rem; margin: 0.3rem 0.26rem; border: 1px solid #c3ced9; border-radius: 5px;}
    .main{ position: absolute; top:0; bottom: .88rem; /* 使之可以滚动 */  overflow-y: visible; -webkit-overflow-scrolling: touch;}
    .textareaContainer{height: 4rem; width: 100%; background-color: white; position: fixed; bottom: 0.88rem; left: 0; right: 0; }
    .mengceng{position:fixed; top:auto; bottom: 0; width:100%; height: 15rem;}
</style>

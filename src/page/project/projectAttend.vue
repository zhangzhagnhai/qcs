<template>
  <div>
    <div v-title data-title="参会报名">
       参会报名
    </div>

    <div style="padding-left: 0.26rem; font-size: 0">
      <div class="inputContainer">
        <input class="input" disabled style="width: 1.69rem" type="text" value="姓名:">
        <input class="input" type="text" v-model="userInfo.name" placeholder="请输入您的姓名"/>
      </div>
      <div class="inputContainer">
        <input class="input" disabled style="width: 1.69rem" type="text" value="电话:">
        <input class="input" type="tel" v-model="userInfo.mobile" placeholder="请输入您的电话"/>
      </div>
      <div class="inputContainer">
        <input class="input" disabled style="width: 1.69rem" type="text" value="公司名称:">
        <input class="input" type="text" v-model="userInfo.company" placeholder="请输入您的公司"/>
      </div>
      <div class="inputContainer">
        <input class="input" disabled style="width: 1.69rem" type="text" value="职位:">
        <input class="input" type="text" v-model="userInfo.job" placeholder="请输入您的职位"/>
      </div>
      <div class="inputContainer" style="border: none">
        <input class="input" disabled style="width: 1.69rem" type="text" value="参会诉求:">
        <textarea  class="input" maxlength="32"  v-model="userInfo.request" placeholder="请输入参与此次对接会的诉求，eg：加盟、投资、产业资源合作" style="line-height: 0.43rem;  text-indent:0; margin-left: -0.05rem"></textarea>
      </div>
    </div>

   <!-- <div style="height: 0.3rem; background-color: #f7f7f7"></div>

    <div class="selectTitle">选择你感兴趣的项目</div>
    <div class="smallLine"></div>

    <ul>
      <li v-for="(project,index) in projectList" :style="index==projectList.length-1?'border:none':''">
        <img class="logoIcon" :src="project.img">
        <div class="projectAttend">
            <div class="projectAttendName">{{project.name}}</div>
            <div style="margin-top: 0.14rem; height: 0.26rem">
              <div class="title_tag" v-for="labelsArr in project.labelsArr">
                <div class="img"></div>
                <div class="font">{{labelsArr}}</div>
              </div>
            </div>
            <div style="margin-top: 0.24rem; height: 0.26rem">
              <div class="address" style="float: left">
                <span>杭州</span>
                <span style="margin-right: 0.2rem">浙江</span>
                <img src="../../assets/images/didian.png" style="margin-right: 0.1rem">
              </div>
            </div>
        </div>
        <div :class="project.check?'check':'unCheck'"  @click="project.check=!project.check"></div>
      </li>
    </ul>-->
    <div style="height: 0.9rem"></div>
    <div class="submitButton" @click="submit">确认报名</div>
  </div>
</template>
<script>
  import {host,shareHref} from '../../assets/js/util'
  export default {
    data(){
      return {
        userInfo:{communication_id:"",name:"",mobile:"",company:"",job:"",request:""},
        projectList:[
          {
            "img":"http:\/\/www.hcsoo.com\/test\/Public\/upload\/img\/2017-05-28\/592a972bee983.jpg",
            "name": "盛才教育托管连锁",
            "labelsArr": ["时尚","休闲度假a", "轻奢"],
            "check":false
          },
          {
            "img":"http:\/\/www.hcsoo.com\/test\/Public\/upload\/img\/2017-05-28\/592a972bee983.jpg",
            "name": "盛才教育托管连锁a",
            "labelsArr": ["时尚","休闲度假", "轻奢"],
            "check":false
          }
        ]
      }
    },created(){
      this.userInfo.communication_id=this.$route.query.id;
      this.setShare()
    },
    methods: {
      setShare(){
        var href=shareHref+"#projectAttend?id="+this.userInfo.communication_id+"&templateId="+this.templateId;
        JSDK.setShare({
          title:"氢创同城",
          desc:"氢创同城",
          imgUrl:window.fenshe.fenshe_logo,
          href:href
        });
      },
      check(project){
        console.log(!project.check)
        project.check=!project.check;
      },
      submit(){
        var _this=this;
        if(!this.userInfo.name){
          Overlay.show("请输入您的姓名")
        }else if(!this.userInfo.mobile){
          Overlay.show("请输入您的手机")
        }else if(!this.userInfo.company){
          Overlay.show("请输入您的公司")
        }else if(!this.userInfo.job){
          Overlay.show("请输入您的职位")
        }else if(!this.userInfo.request){
          Overlay.show("请输入您的需求")
        }else{
          $.getJSON(host+"/communication/communicationDoSign", this.userInfo).then(function (response) {
            if(response.code){
              Overlay.show("提交成功");
              window.history.go(-1)
            }else {
              Overlay.show(response.msg);
            }
          })
        }
      }
   },watch: {
      "$route": "setShare"
    }
  }
</script>
<style src="../../assets/css/project.css" scoped></style>
<style scoped>
    input:disabled{
      color:#464c56;
      opacity: 1;
      -webkit-text-fill-color: #464c56;
    }
    .inputContainer{display:inline-block; border-bottom: 0.5px solid #dddddd; }
    .input{ text-align:left; float: left; color: #464c56; width: 5.55rem;  height: auto; line-height: normal; padding: 0.35rem 0.26rem 0.35rem 0;  font-size: 0.3rem;box-sizing: border-box; vertical-align: middle;display: block;}
    .selectTitle{height: 0.95rem; line-height: 0.95rem; font-size: 0.36rem; padding-left: 0.26rem; color: #464c56}

    ul{padding-left: 0.26rem;}
    li{height: 1.6rem; padding: 0.3rem 0; border-bottom: 0.5px solid #dddddd}
    .logoIcon{float: left; height: 1.5rem; width: 1.5rem; border-radius: 5px;}
    .projectAttend{float: left; margin-left: 0.3rem; width: 4.8rem; height: 1.5rem; font-size: 0}
    .projectAttendName{font-size: 0.32rem; height: 0.52rem; line-height: 0.52rem; color: #464c56}
    .check{float:left; background:url('../../assets/images/xuanzhong.png') center center; background-size: cover; width: 0.36rem; height: 0.36rem; margin-top: 0.58rem;}
    .unCheck{float:left; background:url('../../assets/images/kong.png') center center; background-size: cover; width: 0.36rem; height: 0.36rem; margin-top: 0.58rem;}
</style>

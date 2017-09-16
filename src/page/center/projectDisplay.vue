<template>
  <div>
    <div v-title :data-title="project.name">
      {{project.name}}
    </div>
    <div class="cutLines"></div>
    <div class="fsNav">
      <div class="fsNavs">
        <div :class="select==1?'select':''" @click="selectMenu(1)">基本信息</div>
        <div :class="select==2?'select':''" @click="selectMenu(2)">详细信息</div>
        <div :class="select==3?'select':''" @click="selectMenu(3)" style="border: none">团队介绍</div>
      </div>
    </div>


    <div v-if="select==1" style="font-size: 0">
      <projectDisplayOne :project="project" :isMyProject="isMyProject"></projectDisplayOne>
    </div>
    <div v-if="select==2" style="font-size: 0">
      <projectDisplayTwo :project="project"></projectDisplayTwo>
    </div>
    <div v-if="select==3" style="font-size: 0">
      <projectDisplayThree :project="project"></projectDisplayThree>
    </div>

    <!--底部操作按钮-->
    <div v-if="isMyProject==='true'">
      <div class="defaultSubmit"></div>
      <router-link :to="{name:'projectSubmit',query:{id:id,select:select}}" class="submitButton" @click="submit" >编辑</router-link>
    </div>


    <div v-if="isMyProject==='false'">
      <div style="height: 1rem"></div>
      <ul class="footer" style="height: 1rem; position: fixed; bottom: 0; width: 100%;">
        <li @click="selected(0)">
          <div :class="project.return==2?['icon-bgxer']:['icon-bgx']"></div>
          <div :class="project.return==2?'footerFont footerColor':'footerFont'">不敢兴趣</div>
        </li>
        <li @click="selected(1)">
          <div :class="project.return==1?['icon-gxer']:['icon-gx']"></div>
          <div :class="project.return==1?'footerFont footerColor':'footerFont'">敢兴趣</div>
        </li>
        <li @click="selected(2)">
          <div :class="project.yuetan_status==1?['icon-yter']:['icon-yt']"></div>
          <div :class="project.yuetan_status==1?'footerFont footerColor':'footerFont'">{{project.yuetan_status==1?'已约谈':"约谈"}}</div>
        </li>
      </ul>
    </div>

    <div v-if="showYT" class="mengceng">
      <div class="mengcengBg" @click="showYT=false"></div>
      <div class="mengcengContain">
        <div class="mengcengTitle" style="font-size: 0; line-height: normal">
          <div class="mengcengTitleContain">
            <img src="../../assets/images/gou.png">
            <div>此项目约谈意向<br>已成功发送</div>
          </div>
        </div>

        <div class="mengcengContent" style="margin-top: 0.12rem">联系电话 {{user.mobile}}</div>
        <div class="mengcengButtons">
          <div class="mengcengButtonA" @click="showYT=false">取消
            <div class="mengcengButtonLine"></div>
          </div>
          <div class="mengcengButtonA" @click="yueTan" style="color: #4285F4">确定</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import pictureInput from 'vue-picture-input'
  import projectDisplayOne from '../../page/center/projectDisplayOne'
  import projectDisplayTwo from '../../page/center/projectDisplayTwo'
  import projectDisplayThree from '../../page/center/projectDisplayThree'
  import {host} from '../../assets/js/util'
  export default {
    data(){
      return {
        select:1,
        isInterest:true,
        project:{
        },
        user:{},
        isMyProject:false,
        showYT:false
      }
    },created(){

    },mounted(){
      console.log(this.select)
      console.log(arguments)
      if(window.select)
        this.select= window.select;
      this.id=this.$route.query.id;
      this.isMyProject=this.$route.query.isMyProject||false;
      console.log(this.isMyProject)
      this.getData();
    },methods:{
      getData(){
        var _this=this;
        _this.$emit("loading",true);
        $.getJSON(host+"/center/centerProgramDetail", {id: this.id,type: this.isMyProject}).then(function (response) {
          _this.project=response.program;
          _this.user=response.user;
          _this.$emit("loading",false);
        })
      },
      selected(index){
        if (index == 0) {
          this.project.return=2;
          $.getJSON(host+"/center/centerProgramInterestingReturn", {id: this.id,status: 2}).then(function (response) {
            _this.project=response.program;
          })
        } else if (index == 1) {
          this.project.return=1;
          $.getJSON(host+"/center/centerProgramInterestingReturn", {id: this.id,status: 1}).then(function (response) {
            _this.project=response.program;
          })
        } else {
          if(this.project.yuetan_status!=1)
          {
            this.showYT = true;
          }
        }
      },
      selectMenu(index){
        this.select=index;
        window.select=index;
      },
      yueTan(){
        this.showYT=false;
        this.project.yuetan_status=1;
        $.getJSON(host+"/center/centerProgramYuetanReturn", {id: this.id}).then(function (response) {

        })
      },
      submit(){
        console.log(this.userInfo.province)
        console.log(this.userInfo.city)
        console.log(this.userInfo.county)
      }
    },
    components:{
      pictureInput,
      projectDisplayOne,
      projectDisplayTwo,
      projectDisplayThree
    }
  }
</script>
<style src="../../assets/css/projectMenu.css" scoped></style>
<style scoped>
  .footer li {
    width: 33.3%;
    height: 1rem;
    float: left;
  }
</style>

<template>
  <div style="font-size: 0">
    <div v-title :data-title="invest.name">
      {{invest.name}}
    </div>

    <project :project="invest" isDetail="detail"></project>
    <div style="height: 0.2rem; background-color: #f7f7f7"></div>

    <div style="height: 0.86rem; border-bottom:  0.5px solid #dddddd;">
      <div class="menus">
        <div :class="selectItem==1?'menuWordx':'menuWord'" @click="selectItem=1">
          <div class="menuFont">项目详情</div>
          <div class="menuBlueLine"></div>
        </div>
      </div>
      <div class="menus">
        <div :class="selectItem==2?'menuWordx':'menuWord'" @click="selectItem=2" style="border-right: none">
          <div class="menuFont">团队介绍</div>
          <div class="menuBlueLine"></div>
        </div>
      </div>
    </div>
    <!--项目详情-->
    <div v-if="selectItem==1" class="template" style="padding-bottom: 0.3rem">
        <div v-for="(item,index) in invest.introduce">
            <p v-if="item.type=='text'">{{item.value}}</p>
            <img v-if="item.type=='img'" :src="item.value" />
        </div>
    </div>

    <!--团队介绍-->
    <ul v-if="selectItem==2" class="team_ul">
      <li v-for="(founder,founderIndex) in invest.teams">
        <div class="teamContain">
          <div class="teamContain1" :style="founderIndex==invest.teams.length-1?'border:none':''">
            <teamDisplay :founder="founder"></teamDisplay>
          </div>
        </div>
      </li>
    </ul>

    <div v-if="selectItem==2&&invest.teams.length==0">
      <div class="noDataFont" style="margin: 1rem auto">项目方还未上传团队成员</div>
    </div>
    <!--底部操作按钮-->
    <div v-if="showMenu&&(isMeeting==='false'||!isMeeting)">
      <div style="height: 1rem"></div>
      <ul class="footer" style="height: 1rem; position: fixed; bottom: 0; width: 100%;">
        <li @click="selected(0)">
          <div class="icon-pl"></div>
          <div class="footerFont">评论</div>
        </li>
        <li @click="selected(1)">
          <div :class="invest.hasStar?['icon-dzer']:['icon-dz']"></div>
          <div :class="invest.hasStar?'footerFont footerColor':'footerFont'">点赞</div>
        </li>
        <li @click="selected(2)">
          <div :class="invest.hasInteresting?['icon-gxer']:['icon-gx']"></div>
          <div :class="invest.hasInteresting?'footerFont footerColor':'footerFont'">我感兴趣</div>
        </li>
      </ul>
    </div>

    <div v-if="showInterest" class="mengceng">
      <div class="mengcengBg"></div>
      <div class="mengcengContain">
        <div class="mengcengTitle" style="font-size: 0; line-height: normal">
          <div class="mengcengTitleContain">
            <img src="../../assets/images/gou.png">
            <div>确定发送你的意向</div>
          </div>
        </div>
        <div class="mengcengContent" style="margin-bottom: 0; margin-top: 0.2rem">将推送你的意向及联系电话</div>
        <div class="mengcengContent" style="margin-top: 0">给项目发布人</div>
        <div class="mengcengButtons">
          <div class="mengcengButtonA" @click="showInterest=false">取消
            <div class="mengcengButtonLine"></div>
          </div>
          <div class="mengcengButtonA" @click="submitInterest" style="color: #4285F4">确定</div>
        </div>
      </div>
    </div>

    <prevRegister v-if="showRegister"></prevRegister>
  </div>
</template>

<script>
  import project from '../../components/project.vue'
  import teamDisplay from '../../components/teamDisplay'
  import prevRegister from '../../components/prevRegister'
  import {host,shareHref} from '../../assets/js/util'
  export default {

    name: 'app',
    data () {
      return {
        invest: {
          title:''
        },
        user:{},
        showRegister:false,
        templateId:"",
        selectItem: 1,
        showInterest: 0,
        isMeeting:0,
        showMenu:false
      }
    },
    components: {
      project,
      teamDisplay,
      prevRegister
    },
    methods: {
      getData(){
        var _this=this;
        _this.$emit("loading",true);
        this.id = this.$route.query.id;
        this.templateId=this.$route.query.templateId;
        this.isMeeting=this.$route.query.isMeeting;

        var href=shareHref+"#projectDetail?id="+this.id+"&isMeeting="+this.isMeeting+"&templateId="+this.templateId;
        $.getJSON(host+"/communication/programDetail", {id:_this.id,templateId: _this.templateId}).then(function (response) {
          _this.invest =response.program;
          _this.user=response.user;
          // _this.$set(_this,"invest",response.communication);
          _this.$emit("loading",false);
          console.log(_this.isMeeting)
          _czc.push(["_trackPageview",response.program.name]);
          JSDK.setShare({
            title:response.program.name,
            desc:response.program.summary,
            imgUrl:response.program.image,
            href:href
          });
        })
      },
      //选择图片后返回的数据
      selected(index){
        if (index == 0) {
          this.$router.push({path: '/projectCommentList', query: {id: this.id}})
        } else if (index == 1) {
          if(this.invest.hasStar){
            this.invest.hasStar=0;
            Overlay.show("取消点赞", 1500)
          }
          else{
            this.invest.hasStar=1;
            Overlay.show("点赞成功", 1500)
          }
          $.getJSON(host+"/communication/programStar", {id:this.id,value:this.invest.hasStar}).then(function (response) {

          })
        } else {
          if(!this.user.mobile){
            this.showRegister=true;
            return;
          }
          if(!this.invest.hasInteresting){
            this.showInterest = true;
          }
        }
      },
      submitInterest(){
        this.showInterest = false
        this.invest.hasInteresting=1
        $.getJSON(host+"/communication/programIntesting", {id:this.id,value:this.invest.hasInteresting}).then(function (response) {

        })
      }
    },
    created(){

    },mounted(){
      this.getData();
      var _this=this;
      window.onscroll = function () {
        if(document.body.scrollTop>0){
          _this.showMenu=true;
        }
      }
    }
  }

</script>
<style scoped>
  .template p{width: 100% !important; height: auto !important; color: #464c56; margin-bottom: 0.2rem; font-size: 0.28rem}
  .template img{margin-bottom: 0.2rem}
  .menus {
    float: left;
    height: 0.86rem;
    width: 50%;
    position: relative
  }

  .menuWord, .menuWordx {
    height: 0.42rem;
    line-height: 0.42rem;
    border-right: 0.5px solid #dddddd;
    position: relative;
    top: 0.16rem;
    text-align: center
  }

  .menuFont {
    height: 0.42rem;
    font-size: 0.3rem;
    line-height: 0.42rem;
    margin-top: 0.08rem;
    color: #464c56;
    font-weight: bold;
  }

  .menuBlueLine {
    position: relative;
    width: 0.7rem;
    height: 0.04rem;
    left: 1.53rem;
    top: .16rem;
    background-color: #4285F4;
    display: none;
  }

  .menuWordx .menuFont {
    color: #4285F4;
  }

  .menuWordx .menuBlueLine {
    display: block;
  }

  .team_ul {
    display: inline-block;
  }

  .team_ul li {
    float: left;
    width: 100%
  }

  .teamContain {
    padding-left: 0.3rem;
  }

  .teamContain1 {
    border-bottom: 0.5px solid #d1d1d1;
  }


  .footer li {
    width: 33.3%;
    height: 1rem;
    float: left;
  }
</style>


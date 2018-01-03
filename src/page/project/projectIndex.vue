<template>
  <div style="font-size: 0">
    <div v-title data-title="对接会">
      对接会
    </div>
    <!--项目对接会-->
    <div class="menu">
        <div class="menuLeftImg"></div>
        <div class="menuLeftName">项目对接会</div>
         <router-link v-if="filterMeetingList.length!=0" to="projectMeetingList">
          <div class="menuRightImg"></div>
          <div class="menuRightName">全部</div>
        </router-link>
    </div>

    <div v-if="filterMeetingList.length==0">
      <img src="static/n.png" style="width: 3.02rem" class="noDataImg">
      <div class="noDataFont">此分社还没有举办过对接会呢~</div>
    </div>

    <div>
      <div class="inverstList" v-for="(meet,index) in filterMeetingList">
        <router-link :to="{name:'projectMeetingDetail', query: {id: meet.id }}">
          <projectMetting v-bind:projectMeeting=meet></projectMetting>
        </router-link>
        <div v-if="index!=filterMeetingList.length-1" class="cutLine"></div>
      </div>
    </div>

    <div v-if="communicationShowZK&&communicationList.length>communicationLimit" class="zhanKai">
       <div style="display: inline-block" @click="expandMeeting">
         <span>展开更多</span>
         <img src="../../assets/images/zhankai.png">
       </div>
    </div>
    <div class="cutLines"></div>

    <!--项目-->
    <div class="menu">
      <div class="menuLeftImg"></div>
      <div class="menuLeftName">项目展示</div>
      <router-link v-if="filterProjectList.length!=0" to="projectList">
        <div class="menuRightImg"></div>
        <div class="menuRightName">全部</div>
      </router-link>
    </div>

    <div v-if="filterProjectList.length==0">
      <img src="static/f.png" style="width: 3.02rem" class="noDataImg">
      <div class="noDataFont">此分社还没有要展示的项目呢~</div>
    </div>

    <div>
      <div class="inverstList" v-for="(project,index) in filterProjectList">
        <router-link :to="{name:'projectDetail', query: {id: project.id,isMeeting:false }}">
          <project v-bind:project=project isMeeting="false"></project>
        </router-link>
        <div v-if="index!=filterProjectList.length-1" class="cutLine"></div>
      </div>
    </div>

    <div v-if="projectShowZK&&projectList.length>projectLimit" class="zhanKai">
      <div style="display: inline-block" @click="expandProject">
        <span>展开更多</span>
        <img src="../../assets/images/zhankai.png">
      </div>
      <div class="cutLines"></div>
    </div>

    <foot select="0"></foot>
  </div>
</template>
<script>
  import projectMetting from '../../components/projectMetting.vue'
  import project from '../../components/project.vue'
  import foot from '../../components/Foot'
  import {host,shareHref} from '../../assets/js/util'
  export default {
    data(){
      return {
        communicationList:[],
        communicationLimit:2,
        communicationShowZK:true,
        projectList:[],
        projectLimit:2,
        projectShowZK:true,
        clickIndex: -1,
        templateId:""
      }
    },
    created(){
      this.templateId=this.$route.query.templateId;
    },
    methods: {
      getData: function () {

        var _this=this;
        var href=shareHref+"#projectIndex?templateId="+this.templateId;
        _this.$emit("loading",true);
        $.getJSON(host+"/communication/communicationIndex", { templateId: _this.templateId}).then(function (response) {
          _this.communicationList =response.communication;
          _this.projectList=response.program;
          _this.$emit("loading",false);
          JSDK.setShare({
            title:"氢创同城丨对接会",
            desc:" 让项目资本资源，精准对接。给得再多，不如懂你！",
            imgUrl:response.fenshe.fenshe_logo,
            href:href
          });
        })
      },
      expandMeeting:function(){
         if(!this.communicationShowZK)
            return;
         this.communicationShowZK=false;
         this.communicationLimit=this.communicationList.length>8?8:this.communicationList.length;
      },
      expandProject:function(){
        if(!this.projectShowZK)
          return;
        this.projectShowZK=false;
        this.projectLimit=this.projectList.length>8?8:this.projectList.length;
      }
    },mounted(){
      if(this.projectList.length>0){
        return
      }
     // document.body.style.display="none";
      this.getData();
    },
    computed:{
      filterMeetingList:function(){
        console.log(this.communicationList.slice(0,this.communicationLimit))
        return this.communicationList.slice(0,this.communicationLimit)
      },
      filterProjectList:function(){
        console.log(this.projectList.slice(0,this.projectListLimit))
        return this.projectList.slice(0,this.projectListLimit)
      }
    },
    components: {
      projectMetting,
      project,
      foot
    }
  }
</script>
<style lang="scss" scoped>
    .menu{height: 0.35rem; line-height: 0.35rem; padding: 0.3rem 0.26rem; border-bottom: 0.5px solid #dddddd;}
    .menuLeftImg{width: 0.08rem; height: 0.32rem;  background-color: #4285F4; border-radius: 4px; float: left;/*background: url("../../assets/images/shu.png") center center; background-size: cover*/}
    .menuLeftName{height: 0.35rem; line-height:0.35rem; font-size: 0.35rem; color:#4b4c56; float: left; margin-left: 0.2rem; font-weight: bold;}
    .menuRightImg{height: 0.29rem; width:0.18rem; margin-top: 0.03rem; float: right; background: url("../../assets/images/youjian.png") center center; background-size: cover }
    .menuRightName{height: 0.35rem; line-height:0.35rem; font-size: 0.31rem; color:#989fa2; float: right; margin-right: 0.15rem}
    .zhanKai{border-top:0.5px solid #dddddd; text-align: center; font-size: 0}
    .zhanKai span{float: left; font-size: 0.3rem; line-height: 0.9rem; color:#4285F4;}
    .zhanKai img{float: left; margin-left: 0.15rem; margin-top: 0.37rem; height: 0.14rem; width: 0.26rem;}
</style>

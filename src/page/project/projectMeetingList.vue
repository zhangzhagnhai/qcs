<template>
  <div>
    <div v-title data-title="项目对接会">
      项目对接会
    </div>

    <div id="list">
      <div class="inverstList" v-for="(invest,index) in investList">
        <router-link :to="{name:'projectMeetingDetail', query: {id: invest.id }}">
          <projectMetting v-bind:projectMeeting=invest></projectMetting>
        </router-link>
        <div v-if="index!=investList.length-1" class="cutLine"></div>
      </div>
    </div>

    <div v-if="investList.length==0&&false">
      <img src="static/n.png" style="width: 3.02rem" class="noDataImg">
      <div class="noDataFont">此分社还没有举办过对接会呢~</div>
    </div>
  </div>
</template>
<script>
  import projectMetting from '../../components/projectMetting.vue'
  import foot from '../../components/Foot'
  import {host,shareHref} from '../../assets/js/util'
  export default {
    data(){
      return {
        clickIndex: -1,
        investList: [],
        templateId:""
      }
    },
    created(){
      this.templateId=this.$route.query.templateId;
    },
    methods: {
      getData: function () {
        var _this=this;
        var href=shareHref+"#projectMeetingList?templateId="+this.templateId;
        _this.$emit("loading",true);
        $.getJSON(host+"/communication/communicationList", { templateId: _this.templateId}).then(function (response) {
          _this.investList =response.communication;
          _this.$emit("loading",false);
          JSDK.setShare({
            title:"氢创同城丨对接会列表",
            desc:" 让项目资本资源，精准对接。给得再多，不如懂你！",
            imgUrl:response.fenshe.fenshe_logo,
            href:href
          });
        })
      }
    },mounted(){
       this.getData();
    },
    watch: {
      clickIndex: function (val) {
        console.log(val)
        if (this.clickIndex == -1)
          return
        var _this = this;
        setTimeout(function () {
          _this.clickIndex = -1;
          _this.$router.push({path: '/projectDetail', query: {id: _this.investList[val].id}})
        }, 100)
      }
    },
    components: {
      projectMetting
    }
  }
</script>
<style lang="scss" scoped>

</style>

<template>
  <div>
    <div v-title data-title="项目展示">
      项目展示
    </div>

    <div id="list">
      <div class="inverstList" v-for="(invest,index) in investList">
      <!--  <div value="/test/Project/projectDetail/id/23.html" :to="{name:'hello'}" @click="clickIndex=index" :style="{'backgroundColor':clickIndex==index?'#ebebeb':'white'}">
          <project v-bind:project=invest></project>
        </div>-->
        <router-link :to="{name:'projectDetail', query: {id: invest.id,isMeeting:false  }}">
          <project v-bind:project=invest isMeeting="false"></project>
        </router-link>
        <div v-if="index!=investList.length-1" class="cutLine"></div>
      </div>
    </div>

    <div style="height: 0.9rem"></div>
    <router-link to="projectSubmit" class="submit">我有好项目</router-link>

  </div>
</template>
<script>
  import project from '../../components/project.vue'
  import foot from '../../components/Foot'
  import {host,shareHref} from '../../assets/js/util'
  export default {
    data(){
      return {
        clickIndex:-1,
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
        var href=shareHref+"#projectList?templateId="+this.templateId;
        _this.$emit("loading",true);
        $.getJSON(host+"/communication/programList", { templateId: _this.templateId}).then(function (response) {
          _this.investList =response.program;
          _this.$emit("loading",false);
          JSDK.setShare({
            title:"氢创同城丨项目列表",
            desc:" 每个项目，不仅是一闪而过的灵光，更是反复打磨的梦想",
            imgUrl:response.fenshe.fenshe_logo,
            href:href
          });
        })

       /* this.$http.post(host + "/Api/getHetouList", {
          status: this.status,
          city: this.city,
          keyword: this.keyword
        }).then(res = > {
          console.log(res.body);
        this.investList = res.body == null ? [] : res.body;
      })*/
      }
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
    },mounted(){
      this.getData();
    },
    components: {
      project
    }
  }
</script>
<style lang="scss" scoped>

</style>

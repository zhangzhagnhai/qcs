<template>
  <div style="font-size:0">
    <div v-title data-title="项目展示">
      项目展示
    </div>
    <banner></banner>
    <div class="rzContain"><div class="rzItem">
        <div class="rzNum">{{webData.web_investor}}</div>
        <div class="rzName">融资项目</div>
      </div><div class="rzItem">
        <div class="rzNum">{{webData.web_rongzi_money | toPrice}}万</div>
        <div class="rzName">累计融资额</div>
      </div><div class="rzItem">
        <div class="rzNum">{{webData.web_investor}}</div>
        <div class="rzName">认证投资人数</div>
      </div></div>
    <div class="cutLine"></div>
    <div id="list">
      <div class="inverstList" v-for="(invest,index) in filterProjectList">
      <!--  <div value="/test/Project/projectDetail/id/23.html" :to="{name:'hello'}" @click="clickIndex=index" :style="{'backgroundColor':clickIndex==index?'#ebebeb':'white'}">
          <project v-bind:project=invest></project>
        </div>-->
        <router-link :to="{name:'projectDetail', query: {id: invest.id,isMeeting:false  }}">
          <project v-bind:project=invest :isMeeting="true"></project>
          <div class="djs" v-if="invest.buy_end_time_timstamp-0>=60">预计期倒计时<span>{{invest.buy_end_time_timstamp | countTime}}</span></div>
          <div class="djs" v-if="invest.buy_end_time_timstamp-0<60">融资已经结束</div>
          <div class="jd" >
              <div class="jdleft">
                <div :style="{width: invest.precent}"></div>
              </div>
              <div class="jdRigth" >{{invest.precent }}</div>
          </div>
          <div class="rzContain"><div class="rzItem">
            <div class="rzNum">{{invest.dest_money-0}}万</div>
            <div class="rzName">目标额</div>
          </div><div class="rzItem">
            <div class="rzNum">{{invest.every_money-0}}万</div>
            <div class="rzName">起投额</div>
          </div><div class="rzItem">
            <div class="rzNum">{{invest.dest_fenshu}}份</div>
            <div class="rzName">总份数</div>
          </div></div>
        </router-link>
        <div v-if="index!=filterProjectList.length-1" class="cutLine"></div>
      </div>
    </div>
    <div v-if="projectShowZK&&investList.length>projectListLimit" class="zhanKai">
      <div style="display: inline-block" @click="expandProject">
        <span>展开更多</span>
        <img src="../../assets/images/zhankai.png">
      </div>
    </div>
    <foot select="0"></foot>
   <!-- <div style="height: 0.9rem"></div>
    <router-link to="projectSubmit" class="submit">我有好项目</router-link>-->

  </div>
</template>
<script>
  import project from '../../components/project.vue'
  import foot from '../../components/Foot'
  import banner from '../../components/banner'
  import {host,shareHref,toPrice,countTime} from '../../assets/js/util'
  export default {
    data(){
      return {
        clickIndex:-1,
        investList: [],
        webData:{},
        templateId:"",
        projectShowZK:true,
        projectListLimit:3
      }
    },
    created(){
      this.templateId=this.$route.query.templateId;
    },
    filters: {
      toPrice(time) {
        return toPrice(time);
      },
      countTime(time){
        return countTime(time);
      }
    },
    methods: {
      getData: function () {
        var _this=this;
        var href=shareHref+"#projectList?templateId="+this.templateId;
        _this.$emit("loading",true);
        $.getJSON(host+"/communication/programList", { templateId: _this.templateId}).then(function (response) {
          _this.investList =response.program;
          _this.investList.forEach(function(item){
            if(item.already_money >item.dest_money){
              item.precent='100%'
            }else{
              item.precent=item.dest_money-0?(item.already_money *100/item.dest_money).toFixed(0)+'%':'100%'
            }
          })
          setInterval(function(){
            _this.investList.forEach(function(item){
              if(item.buy_end_time_timstamp){
                item.buy_end_time_timstamp-=1
              }else{
                item.buy_end_time_timstamp=0
              }
            })
          },1000)
          _this.$emit("loading",false);
          JSDK.setShare({
            title:"氢创同城丨项目列表",
            desc:" 每个项目，不仅是一闪而过的灵光，更是反复打磨的梦想",
            imgUrl:response.fenshe.fenshe_logo,
            href:href
          });
        })
        $.getJSON(host+"/global/getProgramRongziInfo", { templateId: _this.templateId}).then(function (response){
          _this.webData=response
        })
        /* this.$http.post(host + "/Api/getHetouList", {
           status: this.status,
           city: this.city,
           keyword: this.keyword
         }).then(res = > {
           console.log(res.body);
         this.investList = res.body == null ? [] : res.body;
       })*/
      },
      expandProject(){
        if(!this.projectShowZK)
          return;
        this.projectShowZK=false;
        this.projectListLimit=this.investList.length;
      }
    },
    computed:{
      filterProjectList:function(){
        console.log(this.investList.slice(0,this.projectListLimit))
        return this.investList.slice(0,this.projectListLimit)
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
      project,
      banner,
      foot
    }
  }
</script>
<style scoped>
  .adpro{width: 100%; height: 3.5rem; display: block;}
  .rzContain{display: inline-block; font-size: 0}
  .rzItem{float: left; width: 2.5rem; }
  .rzNum{font-size: 0.32rem; text-align: center; padding-top: .37rem; ;line-height: .32rem;  color:#464c56}
  .rzName{font-size: 0.28rem; text-align: center; padding-top: .3rem; padding-bottom: .36rem ;line-height: .28rem;  color:#6c747c}
  .djs{height: 0.28rem; line-height: 0.28rem; margin:0.3rem 0.26rem 0.2rem; font-size: 0.28rem;color: #464c56;}
  .djs span{margin-left: 0.15rem;color: #4285f4;}
  .jd{margin-top: 0.12rem; height: 0.3rem}
  .jdleft{float: left; width: 6.2rem; height: 0.15rem; margin-left: 0.26rem; margin-top: 0.07rem; border-radius: 10px; 	background-color: rgba(66, 133, 244, 0.2);}
  .jdleft div{width: 100%; height: 0.15rem; border-radius: 10px; background-color: #4285f4;}
  .jdRigth{float: left; margin-left: 0.15rem; height: 0.3rem; line-height: 0.3rem; font-size: 0.3rem; color: #4285f4;}
</style>

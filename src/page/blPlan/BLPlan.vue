<template>
  <div>
    <div v-title data-title="伯乐计划">
      伯乐计划
    </div>
    <div class="cutLines"></div>
    <div class="fsNav">
      <div class="fsNavs">
        <div :class="select==1?'select':''" @click="selectMenu(1)">项目成交</div>
        <div :class="select==2?'select':''" @click="selectMenu(2)">对接会推荐</div>
        <div :class="select==3?'select':''" @click="selectMenu(3)">项目推荐</div>
      </div>
    </div>

    <ul class="projectList">
        <li>
           <div class="navs">
              <img src="/static/share1.png">
              <div>
                <h1>婆婆妈妈生活网</h1>
                <h2>2017201720172017201720172017201720172017</h2>
                <h3>伯乐金<span>¥3000</span></h3>
              </div>
           </div>
           <div>

           </div>
        </li>
    </ul>
    <div v-if="projectMeetingList.length==0">
      <img src="static/f.png" style="width: 3.02rem" class="noDataImg">
      <div class="noDataFont">暂时还没有{{strArr[select-1]}}~</div>
    </div>
  </div>
</template>
<script>
    export default {
        data() {
            return {
              select:1,
              strArr:["项目成交","对接会推荐","项目推荐"],
              projectMeetingList:[{}]
            }
        },
        methods: {
          selectMenu(index){
            this.select=index;
          },
        },
        components: {}
    }
</script>
<style scoped>
   .projectList{padding-left: 0.26rem}
   .projectList li{border-bottom: 0.5px solid #eee; padding: 0.3rem 0}
   .navs{height: 1.55rem;}
   .navs img{width: 1.55rem; height: 1.55rem; float: left; border-radius: 3px;}
   .navs div{float: left; margin-left: 0.3rem}
   .navs h1{font-size: 0.36rem; line-height: 0.56rem;  font-weight: normal; color: #464c56; height: 0.56rem;}
   .navs h2{font-size: 0.28rem; line-height: 0.48rem; margin-top: 0.03rem;  font-weight: normal; color: #6c747c; width: 5.13rem; overflow: hidden; text-overflow: ellipsis; white-space:nowrap;}
   .navs h3{font-size: 0.25rem; line-height: 0.45rem; margin-top: 0rem; font-weight: normal; color:#969fa9;}
   .navs h3 span{font-size: 0.28rem; color: #4285f4; margin-left: 0.1rem;}
</style>

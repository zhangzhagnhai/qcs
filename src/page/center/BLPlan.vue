<template>
  <div>
    <div v-title data-title="伯乐计划">
      伯乐计划
    </div>
    <div class="cutLines"></div>
    <div class="fsNav">
      <div class="fsNavs">
        <div :class="select==1?'select':''" @click="selectMenu(1)">接收的项目</div>
        <div :class="select==2?'select':''" @click="selectMenu(2)">投资人资料</div>
        <div :class="select==3?'select':''" @click="selectMenu(3)">投资人资料</div>
      </div>
    </div>
    <div v-if="projectMeetingList.length==0">
      <img src="static/f.png" style="width: 3.02rem" class="noDataImg">
      <div class="noDataFont">暂时还没有项目成交~</div>
    </div>
  </div>
</template>
<script>
    export default {
        data() {
            return {
              select:1,
              projectMeetingList:[]
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
<style src="../../assets/css/investorMenu.css" scoped></style>
<style scoped>
</style>

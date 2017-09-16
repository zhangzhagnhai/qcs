<template>
  <div>
    <div v-for="(team,index) in userInfo.teams">
      <teamItem :team="team"></teamItem>
      <div style="height: 0.4rem; font-size: 0px;">
        <img src="static/shanchu.png" class="delete" @click="deleteItem(index)" />
      </div>
      <div class="smallLine"></div>
    </div>

    <div class="addButton" @click="add">
      <div style="display: inline-block">
        <img src="static/wdtztjgs.png" class="jiaHao"><div class="jiaCompany">添加团队人员</div>
      </div>
    </div>
  </div>
</template>
<script>
  import teamItem from '../../components/teamItem'
  export default {
    data(){
      return{
      }
    },
    props:["userInfo"],
    methods: {
      add(){
        this.userInfo.teams.push({image:'',img:'',name:'',job:"",introduce:""})
        console.log( this.userInfo.teams)
      },
      deleteItem(index){
        this.userInfo.teams.splice(index,1);
      }
    },
    components: {
      teamItem
    }
  }
</script>
<style scoped>
  .addButton{width: 6.98rem; text-align: center; border: 0.5px solid #4285F4; margin: 0.3rem auto; height: 0.7rem; border-radius: 3px; font-size: 0.28rem; line-height: 0.7rem; color: #4285f4}
  .jiaHao{margin-top:0.21rem; height: 0.28rem; float: left}
  .jiaCompany{float: left; margin-left: 0.2rem}
  .delete{display:inline-block; float: right; width: 0.9rem; height: 0.4rem; border-radius: 3px; margin-right: 0.26rem; }
  .smallLine{margin-top: 0.3rem; margin-left: 0.26rem; width: 7.24rem; /*height: 1px;*/}
</style>

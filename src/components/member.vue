<template>
  <div class="container">
    <router-link :to="{name:'memberDetail', query: {id: connection.id }}">
      <img :src="connection.image">
      <div class="connectionFont">
        <div style="height: 0.3rem">
          <div class="connectionName">{{connection.name}}</div>
          <div :class="connection.type==1?'vipType':'vipType gjVip'">{{connection.type_str}}</div>
        </div>
        <div class="connectionCompany">{{connection.company}}  <span>| {{connection.job}}</span></div>
        <div class="connectionFs">{{connection.fenshe.name}}</div>
      </div>
    </router-link>
  </div>
</template>
<script>
  export default {
    data(){
      return {
      }
    },
    props: ['connection'],
    created(){
      if(!this.connection.fenshe){
        this.connection.fenshe={}
      }
    }
  }
</script>
<style scoped>
  .container{height: 1.2rem; padding: 0.3rem 0.26rem}
  img{height: 1.2rem; width: 1.2rem; float: left; border-radius: 50%;  border: 0.5px solid #efefef; box-sizing:border-box;}
  .connectionFont{float: left;margin-left: 0.3rem; width: 5.48rem; height: 1.2rem;}
  .connectionName{float: left;font-size: 0.3rem; line-height: 0.3rem; height: 0.3rem;  color: #464c56;}
  .vipType{box-sizing:border-box; float:left; padding:0 0.1rem; height: 0.3rem; text-align: center; margin-left:0.2rem; color: #4285f4; border: 0.5px solid #4285f4; border-radius: 3px;  line-height: 0.3rem; font-size: 0.22rem}
  .connectionFont .gjVip{color:#eb6100; border: 0.5px solid #eb6100; }
  .connectionCompany{font-size: 0.26rem; line-height: 0.57rem; height: 0.57rem; color: #6c747c; overflow: hidden}
  .connectionCompany span{color: #969fa9}
  .connectionFs{height: 0.24rem; line-height: 0.24rem; font-size: 0.24rem; color: #969fa9}
</style>

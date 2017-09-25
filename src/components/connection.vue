<template>
  <div class="container">
    <router-link :to="{name:'connectionDetail', query: {id: connection.id }}">
      <img :src="connection.image">
      <div class="connectionFont">
          <div class="connectionName">{{connection.name}}</div>
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
    .connectionName{font-size: 0.3rem; line-height: 0.3rem; height: 0.3rem;  color: #464c56;}
    .connectionCompany{font-size: 0.26rem; line-height: 0.57rem; height: 0.57rem; color: #6c747c; overflow: hidden}
    .connectionCompany span{color: #969fa9}
    .connectionFs{height: 0.24rem; line-height: 0.24rem; font-size: 0.24rem; color: #969fa9}
</style>

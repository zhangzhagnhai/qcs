<template>
  <div>
    <div style="height: 1rem"></div>
    <ul class="footer" style="height: 1rem; position: fixed; bottom: 0; width: 100%;">
      <li v-for="(li,index) in goWhere">
          <router-link :to="{name : li.href}">
            <div :class="index==select?['icon-'+li.id+'er']:['icon-'+li.id]"></div>
            <div :class="index==select?'footerFont footerColor':'footerFont'">{{li.name}}</div>
          </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    data(){
      return{
         goWhere:[{
           href:"projectIndex",
           id:'dj',
           name:"对接会"
         },{
           href:"cityIndex",
           id:'cl',
           name:"城里"
         },{
           href:"serviceIndex",
           id:'fw',
           name:"服务"
         },{
           href:"personCenter",
           id:'wd',
           name:"我的"
         }]
      }
    },
    created(){

    },
    props: ['select'],
    mounted(){
    }
  }
</script>

<style scoped>

</style>

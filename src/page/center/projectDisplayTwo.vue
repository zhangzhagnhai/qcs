<template>
  <div>

    <div v-for="(item,index) in project.introduce" style="margin-bottom: 0.3rem;">
      <p v-if="item.type=='text'" >{{item.value}}</p>

      <img v-if="item.type=='img'" :src="item.value">
    </div>
  </div>
</template>
<script>
  export default {
    data(){
      return {
      }
    },
    props: ["project"],
    methods: {

    },
    components: {
    }
  }
</script>
<style scoped>
  img{display:block; width: 6.98rem; margin: 0.3rem auto 0; border: 0.5px solid #c3ced9;border-radius: 3px;overflow: hidden;}
  p{width: 6.98rem; margin: 0.3rem auto 0;  font-size: 0.32rem; line-height: 0.51rem; color: #6c747c; word-break:break-all;}
</style>

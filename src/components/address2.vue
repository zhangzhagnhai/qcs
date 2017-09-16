<template>
  <div>
    <input id="area" @click="clickEvent"  type="button" style="background-color:red; height: 100px" v-model="province_str" >
  </div>
</template>
<script>
  import  jquery from '../assets/js/jquery.min.js'
  import {areaData} from '../assets/js/AreaData.js'
  import  {IAreas} from '../assets/js/lArea.min.js'
  export default{
    data(){
      return {
        province_str:"浙江省",
        city_str:"2",
        county_str:"3"
      }
    },
    created(){

    },methods:{
      clickEvent:function(){
        var area = new lArea();
        area.init({
          'trigger': '#area',
          'data':areaData().data
        });
      }
    }
  }
</script>
<style  scoped>
  @import '../assets/css/lArea.css';
</style>

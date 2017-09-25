<template>
   <div>
      <div v-show="showLoading" style="position: fixed; background-color: white; top:0; bottom:0;  width:100%; z-index: 999999">
         <div style="position:relative; top:4rem">
           <vue-loading type="beat" color="#969fa9" :size="{ width: '0.8rem', height: '0.8rem'}"></vue-loading>
         </div>

      </div>
   </div>
</template>
<script>
  import vueLoading from 'vue-loading-template'
  export default {
    data(){
      return {
      }
    },props:["showLoading"],
    components: {
      vueLoading
    }
  }
</script>

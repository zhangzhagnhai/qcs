<template>
   <div>
      <div v-show="showLoading" style="position: fixed; background-color: white; top:0; bottom:0;  width:100%; z-index: 999999">
         <div style="position:relative; top:4rem">
           <vue-loading type="spiningDubbles" color="#4285F4" :size="{ width: '1rem', height: '1rem'}"></vue-loading>
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

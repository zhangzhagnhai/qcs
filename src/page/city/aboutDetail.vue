<template>
    <div>
      <aboutQcs v-bind:aboutQcs=aboutQcs otherQcs="true"></aboutQcs>
    </div>
</template>
<script>
  import {host} from '../../assets/js/util'
  import aboutQcs from '../city/aboutQcs'
  export default {
    data () {
      return {
        aboutQcs:{}
      }
    },created(){

    },methods:{
      getData(){
        var _this=this;
        $.getJSON(host+"/city/fensheDetail",{id:this.id}).then(function (response) {
          _this.aboutQcs=response.fenshe;
        })
      }
    },mounted(){
      this.id=this.$route.query.id;
      this.templateId=this.$route.query.templateId;
      this.getData();
    },
    components: {aboutQcs}
  }

</script>

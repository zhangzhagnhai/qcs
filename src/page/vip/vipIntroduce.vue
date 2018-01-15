<template>
   <div style="font-size: 0">
     <div v-title data-title="加入会员">
       加入会员
     </div>

     <img src="static/vipIntroduce.jpg" style="width: 7.5rem">
      <div v-if="showButton" style="height: 0.9rem"></div>
      <router-link v-if="showButton" to="vipSubmit" tag="div" class="addVIP">加入会员</router-link>
   </div>
</template>
<script>
   import {host} from '../../assets/js/util'
    export default {
        data() {
            return {
              showButton:false
            }
        },
       mounted(){
         this.templateId = this.$route.query.templateId;
         this.getData();
       },
        methods: {
          getData(){
            var _this=this;
            _this.$emit("loading",true);
            $.getJSON(host+"/center/centerRelationshipType",{id:this.id}).then(function (response) {
              _this.showButton=(response.typeCode==0);
              _this.$emit("loading",false);
            })
          }
        },
        components: {
        }
    }
</script>
<style scoped="">
  .addVIP{position:fixed; bottom:0; width:7.5rem; height: 0.9rem;line-height:0.88rem; font-size: 0.36rem; color: white; text-align: center; background:url("../../../static/gudinganniu.png");}
</style>

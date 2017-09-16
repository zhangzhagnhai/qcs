<template>
  <div>
    <pictureInput
      ref="pictureInput"
      @change="onChange"
      accept="image/jpeg,image/png"
      size="10"
      buttonClass="btn"
      :customStrings="{ }"
      :defaultImg="defaultImg"
      :noCut="noCut"
      style="overflow: hidden; margin: 0 auto; "></pictureInput>
  </div>
</template>
<script>
  import pictureInput from 'vue-picture-input'
  import {host} from '../assets/js/util'
  export default{
    data(){
      return {
        img:''
      }
    },
    props:["defaultImg","noCut"],
    methods:{
      onChange () {
        var _this=this;
        if (this.$refs.pictureInput.image) {
          console.log(this.$refs.pictureInput.image.length)
          $.post(host+"/uploadImg", {file: this.$refs.pictureInput.image,random:Math.random()}).then(function (response) {
            if(response){
              _this.image=response.allPath;
              _this.imgId=response.cover_id;
              _this.$emit('change')
            }
          })
        } else {

        }
      }
    },components:{
      pictureInput
    }
  }
</script>

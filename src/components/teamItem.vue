<template>
  <div style="padding-left: 0.26rem">
    <div class="teamContain">
      <div class="teamLogo">
        <imageUpload
          ref="pictureInput"
          @change="onChange"
          accept="image/jpeg,image/png"
          size="10"
          radius="50"
          buttonClass="btn"
          :customStrings="{ }"
          :defaultImg="team.image?team.image:'/static/wdxmshangchuanzhaopian.png'"
          style="width:100%; height:100%; overflow: hidden; margin: 0 auto; border-radius: 50%;"></imageUpload>
      </div>

      <div style="float:left; margin-left: 0.3rem; width: 4.35rem">
         <input type="text" placeholder="请输入你的名称" v-model="team.name" maxlength="12" style="margin-top: 0.15rem">
         <input type="text" placeholder="请输入你的职位" v-model="team.job" maxlength="12">
      </div>
    </div>
    <div style="height:0.48rem; line-height: 0.48rem; font-size: 0.28rem; color: #464c56">个人介绍：</div>
    <textarea  class="companyContentx" placeholder="添加文字内容" v-model="team.introduce" maxlength="150"></textarea>
  </div>
</template>
<script>
  import imageUpload from '../components/imageUpload'
  export default {
    data(){
      return {

      }
    },
    props:["team"],
    methods:{
      onChange () {
        console.log('New picture selected!')
        if (this.$refs.pictureInput.image) {
          this.team.image=this.$refs.pictureInput.image;
          this.team.img=this.$refs.pictureInput.imgId;
          console.log('Picture loaded.')
        } else {
          console.log('FileReader API not supported: use the <form>, Luke!')
        }
      }
    },components:{
      imageUpload
    }
  }
</script>
<style scoped>
   .teamContain{height: 1.55rem; padding: 0.3rem 0;}
   .teamLogo{height: 1.55rem; width: 1.55rem; float: left; border: 0.5px solid #c3ced9;border-radius: 50%; box-sizing: border-box}
   input{ margin-top: 0.22rem;font-size: 0.28rem; line-height: 0.28rem; height: 0.28rem; padding: 0.1rem 0.2rem; width: 3.85rem; border: 0.5px solid #c3ced9; color: #464c56}
   ::-webkit-input-placeholder{font-size: 0.28rem; line-height: 0.28rem; height: 0.28rem; padding-top: 0.05rem }
   .companyContentx{display:block; padding: 0.12rem 0.2rem; font-size: 0.28rem; line-height: 0.51rem; color: #6c747c; box-sizing:border-box; margin: 0.2rem 0; height: 2.2rem; width: 6.98rem; border: 0.5px solid #dddddd; border-radius: 3px;}
</style>

<template>
  <div style="padding: 0.3rem 0.26rem 0.2rem; height: 1.8rem;">
       <div style="float: left; width: 2.4rem; height: 1.8rem; border-radius: 3px; overflow: hidden; border: 0.5px solid #c3ced9; box-sizing: border-box;">
         <imageUpload
           ref="pictureInput"
           @change="onChange"
           accept="image/jpeg,image/png"
           size="10"
           buttonClass="btn"
           :customStrings="{ }"
           :defaultImg="company.image?company.image:'static/wdtzshangchuantupian.png'"
           style="  border-radius: 3px;"></imageUpload>
       </div>

       <div class="srContain">
          <input type="text" placeholder="请输入公司名称" v-model="company.name" @change="textChange" maxlength="12"/>
          <textarea placeholder="请输入公司简介" @change="textChange" v-model="company.introduce" maxlength="45"></textarea>
       </div>
  </div>
</template>
<script>
  import imageUpload from '../components/imageUpload'
  export default {
    data(){
      return {
      }
    },
    props: ['company'],
    components:{
      imageUpload
    },
    methods:{
      onChange(){
        console.log('New picture selected!')
        if (this.$refs.pictureInput.image) {
          this.company.image=this.$refs.pictureInput.image;
          this.company.img=this.$refs.pictureInput.imgId;
          this.$emit('change')
          console.log('Picture loaded.')
        } else {
          console.log('FileReader API not supported: use the <form>, Luke!')
        }
      },textChange(){
        this.$emit('change')
      }
    },
    created(){

    }
  }
</script>
<style scoped>
  .srContain{float: left; width: 4.38rem; height: 1.8rem; margin-left: 0.2rem; font-size: 0}
  input{padding:0.1rem 0.2rem; line-height: 0.26rem; height: 0.26rem;  width: 3.98rem; font-size: 0.26rem; color: #464c56;  border: 0.5px solid #dddddd; border-radius: 3px;}
  ::-webkit-input-placeholder{height: 0.26rem; line-height: 0.26rem; font-size: 0.26rem; }
  textarea{ margin-top:0.1rem; padding: 0.05rem 0.2rem; height: 1.06rem; line-height: 0.36rem; width: 3.98rem; font-size: 0.26rem; color:#6c747c; border: 0.5px solid #dddddd; border-radius: 3px; }
</style>

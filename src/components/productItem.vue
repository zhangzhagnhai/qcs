<template>
    <div style="font-size: 0">
      <div style="width:3.39rem; height:2.4rem; border-radius: 5px; border: 0.8px solid #c3ced9; box-sizing: border-box;  overflow: hidden;">
        <imageUpload
          ref="pictureInput"
          @change="onChange"
          accept="image/jpeg,image/png"
          size="10"
          buttonClass="btn"
          :customStrings="{ }"
          :defaultImg="product.image?product.image:'static/rmzsshangchuantuopian.png'"
          style="width:100%; height:100%; border-radius: 5px; overflow: hidden;"></imageUpload>
      </div>

      <input class="productInput" v-model="product.title" placeholder="输入产品与服务内容" maxlength="11"   @change="textChange">
    </div>
</template>
<script>
  import imageUpload from '../components/imageUpload'

  export default {
    name: 'app',
    data () {
      return {
      }
    },
    props: ['product'],
    components:{
      imageUpload
    },
    methods:{
      //选择图片后返回的数据
      secelted(data){
        console.log(data)
      },
      onChange(){
        console.log('New picture selected!')
        if (this.$refs.pictureInput.image) {
         // this.image=this.$refs.pictureInput.image;
          this.product.image=this.$refs.pictureInput.image;
          this.product.img=this.$refs.pictureInput.imgId;
          this.$emit('change')
          console.log('Picture loaded.')
        } else {
          console.log('FileReader API not supported: use the <form>, Luke!')
        }
      },textChange(){
        this.$emit('change')
      }
    },created(){
      console.log(this.$route.query.templateId)
    }
  }
</script>
<style scoped>
    .productInput{height: 0.28rem; line-height: 0.28rem; font-size: 0.28rem; color: #464c56; width: 3.39rem; padding: 0.25rem 0 0.2rem}
</style>

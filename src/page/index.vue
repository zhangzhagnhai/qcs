<template>
  <div>
    index
    <div v-title data-title="标题内容">
      首页
    </div>
    <foot></foot>
  </div>
</template>

<script>
  import project from '../components/project.vue'
  import upload from "../components/upload-img.vue";
  import foot from '../components/Foot'
  export default {
    name: 'app',
    data () {
      return {

      }
    },
    components:{
      'img-upload': upload,
      foot:foot,
      project
    },
    methods:{
      //选择图片后返回的数据
      secelted(data){
        console.log(data)
      }
    },created(){
      console.log(this.$route.query.templateId)
    }
  }


</script>


<template>
  <div>
    <div class="cutLines"></div>
    <aboutQcs v-bind:aboutQcs=aboutQcs></aboutQcs>
  </div>
</template>
<script>
  import aboutQcs from '../city/aboutQcs'
  import {host,shareHref} from '../../assets/js/util'
    export default {
        data() {
            return {
              aboutQcs:{
                fensheList:[]
              },
            }
        },
        created(){
          this.templateId=this.$route.query.templateId;
        },
        methods: {
          shareInit(){
            this.setShare(window.fenshe.fenshe_logo);
          },
          setShare(imgUrl){
            var href=shareHref+"#aboutQcsIndex?templateId="+this.templateId;
            var title=window.fenshe.name;
            var desc="世界上本没有城，志同道合的人多了，便有了城。关注创投，分享精彩！";
            JSDK.setShare({
              title:title,
              desc:desc,
              imgUrl:imgUrl,
              href:href
            });
          },
          getData(){
            var _this=this;
            this.shareInit();
            _this.$emit("loading",true);
            $.getJSON(host+"/city/fensheList").then(function (response) {
              _this.aboutQcs=response.fenshe;
              _this.$emit("loading",false);
            })
          }
        },mounted(){
        this.getData();
      },
        components: {
          aboutQcs,
        }
    }
</script>

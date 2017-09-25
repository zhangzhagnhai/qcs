<template>
  <div>
    <div class="teamContain2">
      <img :src="founder.image" class="teamIcon">
      <div class="teamIconItem">
        <div style="height:0.76rem; line-height:0.76rem; font-size:0.36rem; color: #464c56;">{{founder.name}}
        </div>
        <div style="height:0.28rem; line-height:0.28rem; font-size:0.28rem; color: #969fa9;">{{founder.job}}
        </div>
      </div>
    </div>

    <div style="margin-top: 0.3rem; font-size: 0.3rem; color: #969fa9; height: 0.3rem; line-height: 0.3rem">
      个人介绍:
    </div>
    <div
      style="margin: 0.2rem 0; font-size: 0.3rem; color: #5b6370; line-height: 0.5rem; padding-right: 0.3rem; ">
      {{founder.introduce}}
    </div>
  </div>
</template>
<script>
   export default{
      data(){
        return {}
      },props:["founder"]
   }
</script>
<style scoped>
  .teamContain2 {
    margin-top: 0.3rem;
    height: 1.2rem;
  }

  .teamIcon {
    height: 1.2rem;
    width: 1.2rem;
    border-radius: 50%;
    display: inline-block;
    float: left;
    border: 0.5px solid #efefef; box-sizing:border-box;
  }

  .teamIconItem {
    height: 1.2rem;
    margin-left: 0.3rem;
    display: inline-block;
    float: left;
  }

  .footer li {
    width: 33.3%;
    height: 1rem;
    float: left;
  }
</style>

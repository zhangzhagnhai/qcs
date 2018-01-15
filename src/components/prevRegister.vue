<template>
  <div>
    <div class="mengceng">
      <router-link :to="{name:'register'}" class="mengcengBg"></router-link>
      <div class="mengcengContain">
        <div class="mengcengTitle">未绑定手机号</div>
        <div class="mengcengContent">未绑定手机号，前去绑定</div>
        <div class="mengcengButtons">
          <router-link :to="{name:'register'}" class="mengcengButtonB">确 定</router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data(){
      return {
      }
    },props:["msg"]
  }
</script>

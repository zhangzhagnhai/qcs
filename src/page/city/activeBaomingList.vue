<template>
    <div>
      <div v-title data-title="全部报名">
         全部报名
      </div>
      <div style="padding: 0 0 0 0.3rem;">
          <div v-for="(item,index) in alreadyBaomingList" class="items" :style="{borderBottom:index!=alreadyBaomingList.length-1?'0.5px solid #d1d1d1':'none'}">
            <div class="bmLeft">
              <div v-if="item.user" class="img" :style="{backgroundImage: 'url('+item.user.show_img+')'}"></div>
              <div class="bmLeftFont">{{item.user.show_name}}</div>
            </div>
            <div class="bmRight">
              <div class="bmRightFont">{{item.num}}　　　{{item.created_at | formatDate}}</div>
            </div>
          </div>
      </div>
    </div>
</template>
<script>
  import {formatDate} from '../../assets/js/date.js';
  import {host} from '../../assets/js/util'
  export default {
    data () {
      return {
        alreadyBaomingList:[]
      }
    }, created(){
      this.id=this.$route.query.id;
      this.templateId=this.$route.query.templateId;
      document.body.style.display="none";
    },methods:{
      getData(){
        var _this=this;
        //var href=location.href.split('#')[0]+"#activeBaomingList?id="+this.id+"&templateId="+this.templateId;
        $.getJSON(host+"/city/activitySignList",{id:this.id}).then(function (response) {
          _this.alreadyBaomingList =response.signList;
          document.body.style.display="block";
        })
      }
    },filters: {
      formatDate(time) {
        var date = new Date(time);
        return formatDate(time, "yyyy-MM-dd");
      }
    },mounted(){
      this.getData();
    }
  }
</script>
<style scoped>
   .items{height: 1.5rem; }
   .img{width: 0.9rem; height: 0.9rem; background-size: cover; border-radius: 50%; background-position: center center; }
   .bmLeft{height: 1.5rem;  float: left; display: flex;  display: -moz-flex; display: -webkit-flex;  align-items: center;  -webkit-align-items: center;}
   .bmLeftFont{font-size: 0.3rem; margin-left:0.3rem; color:#464c56; max-width: 2.4rem;}
   .bmRight{height: 1.5rem;  float: right;margin-right: 0.3rem; display: flex;  display: -moz-flex; display: -webkit-flex;  align-items: center;  -webkit-align-items: center;}
   .bmRightFont{font-size: 0.3rem; margin-left:0.3rem; color: #969fa9; float: right; align-self: center}
</style>

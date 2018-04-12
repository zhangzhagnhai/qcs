<template>
  <div>
    <div v-title data-title="我合作的项目">
      我合作的项目
    </div>
    <ul>
       <li v-for="item in cooperationProject">
         <img :src="item.image">
         <span class="projectContain">
           <div class="cooperationName">{{item.name}}</div>
           <div class="cooperationDes">已付<span>¥{{item.pay_dingjin}}</span></div>
           <div class="cooperationDes">{{item.weikuan_statusStr}}<span v-if="item.pay_weikuan-0!=0">¥{{item.pay_weikuan}}</span></div>
         </span>
         <span class="zs">{{item.request}}</span>
       </li>
    </ul>
    <div v-if="cooperationProject.length==0">
      <img src="static/b.png" style="width: 3.02rem" class="noDataImg">
      <div class="noDataFont">暂时还没有合作的项目呢~</div>
    </div>
  </div>
</template>
<script>
    import {host,shareHref} from '../../assets/js/util'
    export default {
        data() {
            return {
              cooperationProject:[
              ]
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
            $.getJSON(host+"/center/myBuyProgram").then(function (response) {
              _this.cooperationProject=response;
              // _this.userInfo.hasRelationship=2
             _this.$emit("loading",false);
            })
          }
        },
        components: {}
    }
</script>
<style scoped="">
  ul{padding-left: 0.26rem}
  li{height:1.5rem; padding:0.3rem 0; border-bottom: 0.5px solid #eee;}
  li:last-child{border: none}
  li img{width: 1.5rem; height: 1.5rem; float: left; border-radius: 3px;}
  .projectContain{float: left; margin-left: 0.25rem; width: 3.5rem; height: 1.5rem;}
  .cooperationName{font-size: 0.32rem; height:0.52rem;line-height: 0.52rem; overflow: hidden; white-space: nowrap;  text-overflow: ellipsis; color: #464c56; margin-bottom: 0.1rem }
  .cooperationDes{font-size: 0.26rem; height:0.46rem;line-height: 0.46rem; color: #969fa9}
  .cooperationDes span{margin-left: 0.1rem; font-size: 0.28rem; color: #4285f4}
  .zs{float: right; margin-right: 0.26rem; width: 1.15rem; border: 0.5px solid #4285f4; color: #4285f4; height: 0.4rem; line-height: 0.4rem; border-radius: 3px; font-size: 0.24rem; text-align: center; box-sizing:border-box;  -moz-box-sizing:border-box;  -webkit-box-sizing:border-box;}
</style>

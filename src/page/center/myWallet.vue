<template>
   <div style="text-align: center">
     <div v-title data-title="我的余额">
       我的余额
     </div>
     <div class="yeBg">
       <img src="static/yue.png" class="yeImg">
       <div class="yeName">我的余额</div>
       <div class="yeNum">¥ {{money}}</div>
       <router-link to="deposit" class="tx">提现</router-link>
     </div>
     <ul>
       <li v-for="item in lsList">
         <div class="orderContain">
           <span class="orderName">{{item.type_str}}</span>
           <span class="orderPrice">{{item.money2}}</span>
         </div>
         <div class="orderDes">
           <span class="orderNum">订单号： {{item.liushuiorder}}</span>
           <span class="orderTime">{{item.created_time}}</span>
         </div>
       </li>
     </ul>

   </div>
</template>
<script>
    import {host} from '../../assets/js/util'
    export default {
        data() {
            return {
              money:0,
              lsList:[]
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
            $.getJSON(host+"/bole/boleInfo").then(function (response) {
              _this.money=response.money;
              _this.$emit("loading",false);
            })
            $.getJSON(host+"/bole/boleLiushuidan").then(function (response) {
              _this.lsList=response;
              // _this.userInfo.hasRelationship=2
              _this.$emit("loading",false);
            })
          }
        },
        components: {}
    }
</script>
<style scoped="">
    .yeBg{overflow: hidden; background-color: #f7f7f7; font-size: 0; padding-bottom: 0.4rem;}
    .yeImg{margin-top: 0.57rem; width: 1.4rem;}
    .yeName{font-size: 0.3rem; margin-top: 0.68rem; line-height: 0.3rem; color: #464c56}
    .yeNum{font-size: 0.54rem; margin-top: 0.3rem; line-height: 0.54rem; color: #464c56}
    .tx{width: 6.7rem; height: 0.95rem; border: 0.5px solid #4186f4; border-radius: 3px; margin: 0.6rem auto 0; color: #4186f4; font-size: 0.38rem; line-height: 0.95rem; text-align: center;}
    ul{margin-left: 0.26rem; width: 7.24rem}
    ul li{border-bottom: 0.5px solid #eee}
    ul li:last-child{border: none}
    .orderContain{height:0.3rem; margin-top: 0.2rem; margin-bottom: 0.15rem; color: #464c56;}
    .orderName{float: left; font-size: 0.28rem; line-height: 0.3rem}
    .orderPrice{float: right; margin-right: 0.26rem; font-size: 0.3rem; line-height: 0.3rem}
    .orderDes{height: 0.54rem; line-height: 0.5rem; font-size: 0.24rem; color: #969fa9}
    .orderNum{float: left; font-size: 0.24rem; }
    .orderTime{float: right; margin-right: 0.26rem; font-size: 0.24rem;}
</style>

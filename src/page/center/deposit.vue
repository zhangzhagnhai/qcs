<template>
  <div style="background-color: #f7f7f7; min-height: 100%;">
    <div v-title data-title="我的余额">
      我的余额
    </div>
    <div class="depositContainer">
        <div class="deposits">
          <span>支付宝账户</span>
          <input v-model="formInfo.zfb_zhanghao" type="text" placeholder="请输入提现支付宝账号" />
        </div>
        <div class="deposits" style="margin-top: 0.3rem; ">
          <span>支付宝姓名</span>
          <input v-model="formInfo.zfb_xingming" type="text" placeholder="请输入提现支付宝账户名" />
        </div>
        <div class="depositNav">
           <div class="depositName">提现金额:</div>
           <div class="depositNums">
             <span>¥</span>
             <input type="number" placeholder="请输入提现金额" v-model="formInfo.money" />
           </div>
        </div>
        <div class="ye">余额 ¥ {{money}}</div>
        <div @click="tx" class="tx">提现</div>
    </div>
    <div class="lx">申请提交后1到2个工作日到账</div>
    <div v-if="showMc" class="mengceng">
      <div class="mengcengBg" @click="showMc=false"></div>
      <div class="mengcengContain">
        <div class="mengcengTitle" style="font-size: 0; line-height: normal">
          <div class="mengcengTitleContain">
            <img src="../../assets/images/gou.png">
            <div>申请已提交</div>
          </div>
        </div>

        <div class="mengcengContent" style="margin-top: 0.12rem">工作人员会在1到2个工作日内转账到您的指定账户！</div>
        <div class="mengcengButtons">
          <div class="mengcengButtonB" @click="txApply" style="color: #4285F4">确定</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import {host} from '../../assets/js/util'
    export default {
        data() {
            return {
              showMc:false,
              formInfo:{
                zfb_zhanghao:"",
                zfb_xingming:"",
                money:'',
             },
              money:0
            }
        }, mounted(){
          this.templateId = this.$route.query.templateId;
          this.getData();
       },
        methods: {
          tx(){
            var _this=this;
            $.getJSON(host+"/bole/tixian",this.formInfo).then(function (response) {
               if(response.code==1){
                 _this.showMc=true;
               }
            })
          },
          txApply(){
            this.showMc=false;
            this.$router.push({name:'personCenter'})
          },
          getData(){
            var _this=this;
            _this.$emit("loading",true);
            $.getJSON(host+"/bole/boleInfo",{id:this.id}).then(function (response) {
              _this.money=response.money;
              _this.formInfo.zfb_zhanghao=response.zfb_zhanghao
              _this.formInfo.zfb_xingming=response.zfb_xingming
              _this.$emit("loading",false);
            })
          }
        },
        components: {}
    }
</script>
<style scoped>
  .depositContainer{width: 6.18rem; margin: 0.3rem auto; background-color: white; padding: 0.4rem}
  .deposits{height: 0.28rem;color: #464c56; }
  .deposits span{float: left; font-size: 0.28rem; color: #464c56; margin-right: 0.3rem}
  .deposits input{float: left; font-size: 0.28rem;  line-height: 0.28rem; }
  .deposits ::-webkit-input-placeholder{height: 0.28rem; line-height: 0.28rem; font-size: 0.28rem; padding-top: 0.09rem;}
  .depositNav{height: 2.4rem; border-top:0.5px solid #ddd; border-bottom: 0.5px solid #ddd; margin-top: 0.4rem}
  .depositName{font-size: 0.3rem; line-height: 0.3rem; margin-top: 0.5rem; font-weight: bold; color: #464c56;}
  .depositNums{height:0.7rem; line-height: 0.7rem; margin-top: 0.4rem; font-weight: bold; color: #464c56;}
  .depositNums span{float:left; }
  .depositNums input{float:left; margin-left:0.15rem; height: 0.7rem; line-height: 0.7rem; font-size: 0.7rem; width: 5rem; color: #464c56;}
  .depositNums ::-webkit-input-placeholder{height: 0.7rem; line-height: 0.7rem; font-size: 0.7rem; padding-top: 0.09rem;}
  .ye{text-align: center; font-size: 0.3rem; color: #969fa9; line-height: 0.9rem}
  .tx{margin:0 auto; width:5.7rem; height: 0.9rem; line-height: 0.9rem; font-size: 0.3rem; border-radius: 3px; color: white; background-color: #4385f4; text-align: center;}
  .lx{text-align: center; font-size: 0.24rem; color: #969fa9; line-height: 0.84rem}
</style>

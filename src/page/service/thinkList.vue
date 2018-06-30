<template>
  <div>
    <div v-title data-title="智库">
      智库
    </div>
    <ul>
      <li v-for="(think,index) in thinkList">
        <div @click="submit(index)" :to="{name:'thinkDetail',query:{id:think.id}}" class="thinkContain">
          <img :src="think.image">
          <div class="thinkTitle">{{think.title}}</div>
          <div class="thinkRead">{{think.show_views}} 热度<span>{{think.price==0?"免费":"￥"+think.price}}</span></div>
        </div>
        <div v-if="index!=thinkList.length-1" class="cutLine"></div>
      </li>
    </ul>
    <foot select="2"></foot>

  </div>
</template>
<script>
  import {host,shareHref} from '../../assets/js/util'
  import foot from '../../components/Foot'
  import wx from 'weixin-js-sdk'
  export default{
    components: {
      foot
    },
    data: function () {
      return {
        thinkList: []
      }
    },created(){
      this.templateId = this.$route.query.templateId;
    }, mounted(){
      this.templateId = this.$route.query.templateId;
      this.getData();
    },
    methods: {
      getData(){
        var _this = this;
        _this.$emit("loading",true);
        this.setShare();
        $.getJSON(host + "/service/zhikuList").then(function (response) {
          _this.thinkList = response.zhikuList;
          console.log(response)
          _this.$emit("loading",false);
        })
      },
      setShare(){
        var href = shareHref+ "#thinkList?templateId=" + this.templateId;
        JSDK.setShare({
          title: "氢创同城丨智库",
          desc: "知识，沉淀智慧。氢创创投，领航成功！",
          imgUrl: window.fenshe.fenshe_logo,
          href: href
        });
      },
      submit(index){
        var id=this.thinkList[index].id;
        var price=this.thinkList[index].price;
        var _this=this;
        if(price==0||this.thinkList[index].readable){
          this.$router.push({name:'thinkDetail',query:{id:id}})
        }else{
          $.getJSON(host+"/pay/zhiku",{id:id}).then(function (res) {
            if(res.responese.code==1){
              var data = res.responese.config;
              wx.chooseWXPay({
                timestamp: data.timestamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
                nonceStr: data.nonceStr, // 支付签名随机串，不长于 32 位
                package: data.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
                signType:data.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
                paySign:data.paySign, // 支付签名
                success: function (e) {
                  _this.$router.push({name:'thinkDetail',query:{id:id}})
                }
              });
            }else{
              Overlay.show(res.responese.msg, 2000);
            }
          })
        }
      }
    }
  }
</script>
<style scoped>
  .thinkContain {
    padding: 0 0.26rem;
    width: 6.98rem;
  }

  img {
    width: 6.98rem;
    height: 3.92rem;
    margin: 0.3rem auto;
    border-radius: 3px;
    display: block;
  }

  .thinkTitle {
    font-size: 0.34rem;
    height: 0.54rem;
    line-height: 0.54rem;
    color: #464c56
  }

  .thinkRead {
    font-size: 0.3rem;
    height: 0.5rem;
    line-height: 0.5rem;
    color: #969fa9;
    margin-bottom: 0.3rem;
  }

  .thinkRead span {
    float: right;
    color: #4285F4;
    font-weight: bold;
  }
</style>

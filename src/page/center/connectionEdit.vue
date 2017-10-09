<template>
  <div style="font-size: 0;">
    <div v-title data-title="人脉展示">
      人脉展示
    </div>
    <imageUpload
      ref="pictureInput"
      @change="onChange"
      accept="image/jpeg,image/png"
      size="10"
      radius="50"
      buttonClass="btn"
      :customStrings="{ }"
      :defaultImg="connectionDetail.image?connectionDetail.image:'/static/shangchuantouxiang.png'"
      style="height: 1.55rem; width: 1.55rem; margin: 0.6rem auto 0;  overflow: hidden; box-sizing: border-box;  border: 0.5px solid #c3ced9; border-radius: 50%"></imageUpload>

    <div class="uploadHeader">上传头像</div>

    <div class="connectionInfo">
      <div class="connectionName">姓名:</div>
      <input type="text" placeholder="请输入你的姓名" v-model="connectionDetail.name">
    </div>
    <div class="smallLine"></div>
    <div class="connectionInfo">
      <div class="connectionName">单位名称:</div>
      <input type="text" placeholder="请输入你的单位名称" v-model="connectionDetail.company">
    </div>
    <div class="smallLine"></div>
    <div class="connectionInfo">
      <div class="connectionName">职位:</div>
      <input type="text" placeholder="请输入你的职位" v-model="connectionDetail.job">
    </div>
    <!--单位简介-->
    <div class="cutLineFont">单位简介</div>
    <textarea class="companyContentx" placeholder="添加文字内容" v-model="connectionDetail.company_introduce"></textarea>
    <!--产品与服务-->
    <div class="cutLineFont">产品与服务</div>
    <ul class="productListx">
      <li v-for="(product,index) in connectionDetail.products">
        <productItem :product="product"></productItem>
        <img src="static/shanchu.png" class="delete" @click="deleteItem(index)">
      </li>
    </ul>
    <div class="smallLine" style="margin-left: 0.26rem; width: 6.98rem;"></div>
    <div class="addButton" @click="addProductItem">
      <div style="display: inline-block">
        <img src="static/wdtztjgs.png" class="jiaHao">
        <div class="jiaCompany">添加产品与服务</div>
      </div>
    </div>
    <!--联系方式-->
    <div class="cutLineFont">联系方式</div>
    <div>
      <div class="contact">
        <img src="../../assets/images/dianhua.png" class="contactImg">
        <div class="contactIntroduce">电话</div>
        <input type="number" class="contactFont" v-model="connectionDetail.mobile" placeholder="请输入电话"/>
      </div>
      <div class="smallLine"></div>
      <div class="contact">
        <img src="../../assets/images/youxiang.png" class="contactImg">
        <div class="contactIntroduce">邮箱</div>
        <input type="email" class="contactFont" v-model="connectionDetail.email" placeholder="请输入邮箱地址"/>
      </div>
      <div class="smallLine"></div>
      <div class="contact">
        <img src="../../assets/images/dizhi.png" class="contactImg">
        <div class="contactIntroduce">地址</div>
        <input class="contactFont" v-model="connectionDetail.location" placeholder="请输入居住地址"/>
      </div>
      <div class="smallLine"></div>
      <div class="contact">
        <img src="../../assets/images/wanhzhi.png" class="contactImg">
        <div class="contactIntroduce">网址</div>
        <input class="contactFont" v-model="connectionDetail.website" placeholder="请输入网址"/>
      </div>
    </div>

    <div class="defaultSubmit"></div>
    <div class="submitButton" @click="submit">保存</div>

    <!--弹窗-->
    <div v-if="mobile&&showMengCeng" class="mengceng">
      <div @click='showMengCeng=false' class="mengcengBg"></div>
      <div class="mengcengContain">
        <div class="mengcengTitle">完善个人信息</div>
        <div class="mengcengContent">完善个人信息<br/>我们城里-人脉见</div>
        <div class="mengcengButtons">
          <div @click="showMengCeng=false" class="mengcengButtonB">马上去完善信息</div>
        </div>
      </div>
    </div>

    <prevRegister v-if="!mobile"></prevRegister>
  </div>
</template>
<script>
  import imageUpload from '../../components/imageUpload'
  import productItem from "../../components/productItem.vue";
  import prevRegister from '../../components/prevRegister'
  import {host} from '../../assets/js/util'
  export default {
    data () {
      return {
        connectionDetail: {},
        showMengCeng: true,
        mobile:""
      }
    }, mounted(){
      this.getData();
    },
    methods: {
      getData(){
        var _this = this;
        _this.$emit("loading",true);
        $.getJSON(host + "/wx/getUserInfoByUid").then(function (res) {
            _this.mobile=res.mobile;
            $.getJSON(host + "/center/centerRelationshipInfo").then(function (response) {
              _this.connectionDetail = response.relationship;
              if(response.relationship&&response.relationship.company){
                _this.showMengCeng=false;
              }else{
                _this.showMengCeng=true;
              }
              console.log(_this.showMengCeng)
              _this.$emit("loading",false);
            })
        })
      }
      ,
      onChange () {
        console.log('New picture selected!')
        if (this.$refs.pictureInput.image) {
          this.$set(this.connectionDetail,"image",this.$refs.pictureInput.image);
          this.connectionDetail.img=this.$refs.pictureInput.imgId;
          //this.connectionDetail.img = this.$refs.pictureInput.image;
          console.log(   this.connectionDetail.img)
          console.log('Picture loaded.')
        } else {
          console.log('FileReader API not supported: use the <form>, Luke!')
        }
      },
      submit(){
        if(!this.connectionDetail.company)
        {
          Overlay.show("请输入你的单位名称");
          return;
        }
        var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
        if(!myreg.test(this.connectionDetail.mobile)){
          Overlay.show("请输入正确的手机号")
          return;
        }
        $.post(host+"/center/centerRelationshipSave", this.connectionDetail).then(function (response) {
          if(response.code){
            Overlay.show("提交成功，等待审核");
            window.history.go(-1)
          }else {
            Overlay.show(response.msg);
          }
        })
        //this.showMengCeng=true;
      },
      addProductItem(){
        this.connectionDetail.products.push({image:'',img: '', title: ''})
      },
      deleteItem(e){
        this.connectionDetail.products.splice(e, 1);
      }
    },
    components: {
      imageUpload,
      productItem,
      prevRegister
    }
  }
</script>
<style src="../../assets/css/connectionDetail.css" scoped></style>
<style src="../../assets/css/connectionEdit.css" scoped></style>
<style scoped>
  .addButton {
    width: 6.98rem;
    text-align: center;
    border: 0.5px solid #4285F4;
    margin: 0.3rem auto;
    height: 0.7rem;
    border-radius: 3px;
    font-size: 0.28rem;
    line-height: 0.7rem;
    color: #4285f4
  }

  .jiaHao {
    margin-top: 0.21rem;
    height: 0.28rem;
    float: left
  }

  .jiaCompany {
    float: left;
    margin-left: 0.2rem
  }

  .productListx li .delete {
    width: 0.9rem;
    height: 0.4rem;
    float: right;
    margin-bottom: 0.3rem;
  }
</style>

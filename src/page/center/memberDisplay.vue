<template>
  <div style="font-size: 0;">
    <div v-title data-title="人脉展示">
      人脉展示
    </div>

    <img :src=connectionDetail.image   style="display:block; height: 1.55rem; width: 1.55rem; margin: 0.6rem auto 0;  overflow: hidden; box-sizing: border-box;  border: 0.5px solid #c3ced9; border-radius: 50%" />
    <div class="uploadHeader" style="visibility: hidden">上传头像</div>

    <div class="connectionInfo">
      <div class="connectionName">姓名:</div>
      <div class="InputValue">{{connectionDetail.name}}</div>
    </div>
    <div class="smallLine"></div>
    <div class="connectionInfo">
      <div class="connectionName">单位名称:</div>
      <div class="InputValue">{{connectionDetail.company}}</div>
    </div>
    <div class="smallLine"></div>
    <div class="connectionInfo">
      <div class="connectionName">职位:</div>
      <div class="InputValue">{{connectionDetail.job}}</div>
    </div>
    <!--单位简介-->
    <div class="cutLineFont">单位简介</div>
    <p class="companyContentx" style="height: auto; border: none; padding: 0">{{connectionDetail.company_introduce}}</p>
    <!--产品与服务-->
    <div class="cutLineFont">产品与服务</div>
    <div v-if="connectionDetail.products.length==0">
      <img src="static/b.png" style="width: 2.91rem" class="noDataImg">
      <div class="noDataFont">暂时还没有产品与服务~</div>
    </div>
    <ul class="productList">
      <li v-for="product in connectionDetail.products">
        <img :src="product.image">
        <div>{{product.title}}</div>
      </li>
    </ul>
    <!--联系方式-->
    <div class="cutLineFont">联系方式</div>
    <div>
      <div class="contact">
        <img src="../../assets/images/dianhua.png" class="contactImg">
        <div class="contactIntroduce">电话</div>
        <div class="contactFont">{{connectionDetail.mobile||"无"}}</div>
      </div>
      <div class="smallLine"></div>
      <div class="contact">
        <img src="../../assets/images/youxiang.png" class="contactImg">
        <div class="contactIntroduce">邮箱</div>
        <div class="contactFont">{{connectionDetail.email||"无"}}</div>
      </div>
      <div class="smallLine"></div>
      <div class="contact">
        <img src="../../assets/images/dizhi.png" class="contactImg">
        <div class="contactIntroduce">地址</div>
        <div class="contactFont">{{connectionDetail.location||"无"}}</div>
      </div>
      <div class="smallLine"></div>
      <div class="contact">
        <img src="../../assets/images/wanhzhi.png" class="contactImg">
        <div class="contactIntroduce">网址</div>
        <div class="contactFont">{{connectionDetail.website||"无"}}</div>
      </div>
    </div>

    <div class="defaultSubmit"></div>
    <router-link class="submitButton" to="memberEditEdit">编辑</router-link>

  </div>
</template>
<script>
  import connection from '../../components/connection'
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
      connection
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

  .InputValue{
    width: 5.24rem;
    overflow: hidden;
    white-space: nowrap;
    color: #6c747c;
    font-size: 0.3rem;
    height: 0.3rem;
    line-height: 0.3rem;
  }
</style>

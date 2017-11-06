<template>
    <div>
      <div style="height: 3.92rem;width: 6.98rem; margin: 0.3rem auto 0; border: 0.5px solid #c3ced9;border-radius: 3px;overflow: hidden;">
        <imageUpload
          ref="pictureInput"
          @change="onChange"
          :defaultImg="userInfo.image?userInfo.image:'static/wdxmtijiaoxiangmu.png'"
          style="width:100%; height:100%; overflow: hidden; margin: 0 auto; border-radius: 3px;"></imageUpload>
      </div>
      <div class="connectionInfo">
        <div class="connectionName">项目名称:</div>
        <input type="text" placeholder="请输入项目名称" v-model="userInfo.name">
      </div>
      <div class="smallLine"></div>
      <div class="connectionInfo">
        <div class="connectionName">创始人:</div>
        <input type="text" placeholder="请输入项目创始人" v-model="userInfo.founder">
      </div>
      <div class="smallLine"></div>
      <div class="connectionInfo">
        <div class="connectionName">联系电话:</div>
        <input type="text" placeholder="请输入你的联系电话" v-model="userInfo.mobile">
      </div>
      <div class="smallLine"></div>

      <div class="connectionInfo">
        <div class="connectionName">项目领域:</div>
        <div class="tiXing">( 最多只能选择3项 )</div>
      </div>

      <ul class="fieldList">
        <li v-for="(field,index) in userInfo.tag">
          <div :class="field.checked?'check':'unCheck'" :value="index" @click="selectProjectField"></div>
          <div class="fieldName">{{field.name}}</div>
        </li>
      </ul>
      <div class="smallLine"></div>

      <div class="connectionInfo">
        <div class="connectionName">所在地区:</div>
        <addressComponent @change="addressChange" :myProvince="userInfo.province" :myCity="userInfo.city" :myCounty="userInfo.county" noCounty="false"></addressComponent>
      </div>
      <div class="smallLine"></div>

      <div class="connectionInfo">
        <div class="connectionName">项目概述:</div>
      </div>
      <textarea class="companyContentx" placeholder="概括一下你的项目，让投资人很快的了解你的项目" v-model="userInfo.summary"></textarea>
      <div class="smallLine"></div>

      <div class="connectionInfo">
        <div class="connectionName">诉求:</div>
        <div class="tiXing" style="margin-left: -0.8rem">( 最多只能选择4项 )</div>
      </div>
      <ul class="fieldList">
        <li v-for="(request,index) in userInfo.req">
          <div :class="request.checked?'check':'unCheck'" :value="index" @click="selectRequestField"></div>
          <div class="fieldName">{{request.name}}</div>
        </li>
      </ul>
    </div>
</template>
<script>
  import imageUpload from '../../components/imageUpload'
  import addressComponent from '../../components/address.vue'
  export default {
    data(){
      return {

      }
    },props:["userInfo"],
    created(){
      //this.checkField();
      //this.checkRequest();
    },
    methods:{
      onChange () {
        console.log('New picture selected!')
        if (this.$refs.pictureInput.image) {
          this.userInfo.image=this.$refs.pictureInput.image;
          this.userInfo.img=this.$refs.pictureInput.imgId;
          //console.log(this.$refs.pictureInput.image)
        } else {
          console.log('FileReader API not supported: use the <form>, Luke!')
        }
      },
      selectProjectField(e){
        var index=e.target.getAttribute("value");
        console.log(index)
        this.userInfo.tag[index].checked=this.userInfo.tag[index].checked?0:1;
        //this.checkField();
      },
      selectRequestField(e){
        var index=e.target.getAttribute("value")
        this.userInfo.req[index].checked=this.userInfo.req[index].checked?0:1;
        //this.checkRequest();
      },
      checkField(){
        for(var i=0;i<this.fieldList.length;i++){
          if(this.userInfo.field[this.fieldList[i].id]){
            this.$set(this.fieldList[i],"checked",1);
          }else{
            this.$set(this.fieldList[i],"checked",0);
          }
        }
      },
      checkRequest(){
        for(var i=0;i<this.requestList.length;i++){
          if(this.userInfo.request[this.requestList[i].id]){
            this.$set(this.requestList[i],"checked",1);
          }else{
            this.$set(this.requestList[i],"checked",0);
          }
        }
      },
      addressChange(city){
         console.log(city)
          this.userInfo.province=city.province;
          this.userInfo.city=city.city;
          this.userInfo.county=city.county;

          this.userInfo.province_str=city.provinceStr;
          this.userInfo.city_str=city.cityStr;
          this.userInfo.county_str=city.countyStr;
      }
    },
    computed:{
      filterFieldList:function(){

      }
    },
    components:{
      imageUpload,
      addressComponent
    }
  }
</script>
<style src="../../assets/css/connectionEdit.css" scoped></style>
<style scoped>
  .fieldList{display:inline-block; margin:-0.2rem 0 0.15rem 1.65rem; width: 5.5rem}
  .fieldList li{margin: 0.2rem 0 0.2rem 0.3rem; float: left; width: 2.45rem; height: 0.35rem}
  .fieldList .check{height: 0.35rem; width: 0.35rem; float: left; background:url('../../assets/images/xuanzhong.png') center center; background-size: cover;}
  .fieldList .unCheck{height: 0.35rem; width: 0.35rem;  float: left; background:url('../../assets/images/kong.png') center center; background-size: cover; }
  .fieldList .fieldName{height: 0.35rem; line-height: 0.35rem; font-size: 0.32rem; color: #6c747c;float: left; margin-left: 0.18rem;}
  .tiXing{height: 0.3rem; line-height: 0.3rem;font-size: 0.3rem; color: #969fa9;}
  .companyContentx{margin: 0 auto 0.35rem; height: 2rem; font-size: 0.3rem;}
</style>

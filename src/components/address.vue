<template>
  <div class="citiesLinkage">
    <select class="provinces" v-model="province"><option v-for="(item,key) in provincesName" :value="key">{{item}}</option></select>
    <select class="citys" v-model="city"><option v-for="(item,key) in citysName" :value="key">{{item}}</option></select>
    <select class="countys" v-model="county" @change="changeArea"><option v-for="(item,key) in countysName" :value="key">{{item}}</option></select>
  </div>
</template>

<script>
  import { addrobj, addrname } from '../assets/addr.js'
  export default {
    data () {
      return {
        province:this.myProvince,
        city:this.myCity,
        county:this.myCounty,
        init:false
      }
    },
    props:["myProvince","myCity","myCounty","noCounty"],
    methods:{
      changeArea(){
        this.$emit("change",{province:this.province,city:this.city,county:this.county,
          provinceStr:addrname[this.province],cityStr:addrname[this.city],countyStr:addrname[this.county]});
       // this.$emit("change",{province:this.provincesName[this.province],city:this.citysName[this.city],county:this.countysName[this.county]})
      }
    },
    computed:{
      provincesName:function(){
        var provinceName={};
        for(var i in addrobj){
          provinceName[i]=addrname[i];
        }
        return provinceName
      },
      citysName:function(){
        var cityName={};
        if(this.province&&addrobj){
          for(var i in addrobj[this.province]){
            cityName[i]=addrname[i]
          }
        }
        return cityName
      },
      countysName:function(){
        var countyName={};
        if(this.city&&this.province&&addrobj[this.province]){
          for(var i in addrobj[this.province][this.city]){
            var county=addrobj[this.province][this.city][i];
            countyName[county]=addrname[county]
          }
        }
        return countyName
      }
    },
    watch:{
      'province':function(n,o){
        if(this.init)
          return
        if(n!=o) this.city=Object.getOwnPropertyNames(this.citysName)[0];
      },
      'city':function(n,o){
        if(this.init)
          return
        if(n!=o) this.county=Object.getOwnPropertyNames(this.countysName)[0];
        this.changeArea();
      },
      'myProvince':function(n,o){
        if(!n)
          return;
        this.province=n;
        this.init=true;
        var _this=this;
        setTimeout(function(){
          _this.init=false;
        },200)
      },
      'myCity':function(n,o){
        if(!n)
          return
        this.city=n;
      },
      'myCounty':function(n,o){
        if(!n)
          return
        this.county=n;
      }
    }
  }
</script>

<style scoped>
    select{font-size: 0.3rem; line-height: 0.3rem; color: #6c747c;}
</style>

import {host,strToJson} from '../../assets/js/util'
(function () {
  var PRODUCTION = true;
  var defaultUser=30;
  var userDefer = $.Deferred();
  //window.PRODUCTION=PRODUCTION;
  function getQueryStringByName(name) {

    //console.log(location)
    //var result = location.search.match(new RegExp("[\?\&]" + name + "=([^\&]+)", "i"));
    var result = location.href.match(new RegExp("[\?\&]" + name + "=([^\&]+)", "i"));
    if (result == null || result.length < 1) {

      return "";

    }

    return result[1];

  }

  function getSearchObject() {
    var string=window.location.hash.substring(window.location.hash.indexOf("?")+1);
    var pairs = string.split("&"),
      obj = {},
      pair,
      i;

    for ( i in pairs ) {
      if ( pairs[i] === "" ) continue;

      pair = pairs[i].split("=");
      obj[ decodeURIComponent( pair[0] ) ] = decodeURIComponent( pair[1] );
    }

    return obj;
  }


  window.AuthService = {
    getSubmitToken: getSubmitToken,
    getUser: getUser
  };

  function getSubmitToken() {
    return $.getJSON(host + '/sdk/get/resubmit/token').then(function (response) {
      return response.value;
    });
  }

  (function () {
    $.ajaxSetup({
      beforeSend: function (request) {
        if (!localStorage.getItem('userId')) {
          console.log('获取验证信息失败.无法请求');
        }

        request.setRequestHeader("templateId",  localStorage.getItem('templateID'));
        request.setRequestHeader("uid", localStorage.getItem('userId'));
      }
    });
  })();

  function strToJson(str){
     return JSON.parse(str);
  }

  //初始化验证.
  (function () {
    var templateID=localStorage.getItem('templateID')||5;

    var stateArray=getQueryStringByName('state').split("_");
    console.log(stateArray);
    if(stateArray&&stateArray.length>0){
      for(var i=0;i<stateArray.length;i++){
        var tempArray=stateArray[i].split("+");
        if(tempArray[0]=="templateId"&&tempArray[1]){
          templateID=tempArray[1];
          console.log("state template init");
          break;
        }else if(getQueryStringByName('templateId')){
          templateID=getQueryStringByName('templateId')
        }
      }
    }else if(getQueryStringByName('templateId')){
      templateID=getQueryStringByName('templateId')
      console.log("getQueryStringByName template init");
    }else{
      templateID=localStorage.getItem('templateID')
    }

  /*  if((!stateArray)||stateArray[0]=="")
      redirectAndGetCode();
    else
      return;*/
    localStorage.setItem("templateID",templateID);
    //localStorage.removeItem("userId");
    if (localStorage.getItem('userId')/*&&false*/) {
      /*获取氢创社用户信息*/
      /*$.getJSON('http://vip.xuege.com/vip/get').then(function (response) {
        userDefer.resolve(response.value);
      });*/
      return;
    } else {
      if (!PRODUCTION) {
        /*获取氢创社用户信息*/
        var obj = {
          access_token: "XP4f963E-s6bXC0jSmCGavcpNr24v1zhDZNLj8XuTj51r8ctJJv2rXp6rMJbB7-I8ya3HW38XEgERpbFJrxkeA",
          expires_in: 7200,
          openid: "oUECJxBA-leMy_Lywgs6vwMO-57o",
          refresh_token: "SegY1DxUDAKdB-fQEbMOfFAdbHB26SVqrnEL4hDL6aWJOv_5D0z7QgaLjalAZXPDF9lrDo9MXDR2NiNehoNDbg",
          scope: "snsapi_userinfo",
          unionid: "oFEYev1ch6EMJJ3Xdv4As-SevlSE"
        }
        var data=JSON.stringify(obj)
       // sessionStorage.setItem('jwt', data);
        localStorage.setItem('userId', defaultUser);
       /* $.getJSON('http://vip.xuege.com/vip/get').then(function (response) {
          userDefer.resolve(response.value);
        });*/
        return;
      }

      var code = getQueryStringByName('code');
      if (!code) {
        if (PRODUCTION) {
          var getJwtTimes = localStorage.getItem('getJwtTimes') || 0;
          var userId=localStorage.getItem('userId')

          if (getJwtTimes < 3) {
            redirectAndGetCode();
          }else if(!userId){
            redirectAndGetCode();
          }
          //redirectAndGetCode();
          localStorage.setItem('getJwtTimes', getJwtTimes + 1);
        }else{
          localStorage.setItem('userId', defaultUser);
        }
      }else{
        $.getJSON(host + "/wx/getUserInfoByCode", {code: code}).then(function (response) {
          if (!response.succeed) {
            redirectAndGetCode();
          } else {
            //var token=JSON.stringify(response.data.token)
            //sessionStorage.setItem('jwt', token);
            localStorage.setItem('userId', response.user.id);
           // reloadUrl();

          }
        });
      }

    }
  })();

  function getUser() {
    return userDefer.promise();


    if (!PRODUCTION) {
      var defer = $.Deferred();
      defer.resolve({
        "id": 9,
        "openId": "oFHCouB-te98guNf0joExHYnT_MA",
        "name": null,
        "mobile": "",
        "birth": null,
        "storeId": null,
        "nickname": "fankle\uD83D\uDC39",
        "sex": null,
        "language": null,
        "province": null,
        "city": null,
        "country": null,
        "headimgurl": "http://wx.qlogo.cn/mmopen/DXgfT2rBIEOXvwvYFTIdQiaewjvicpcbnXXvRzWujO7lKIvG7h7zVicoNCia5hw2tGzAvy1Nog2TLgicS2ibaxptkwxmskxaaBlBpJ/0",
        "unionid": null,
        "attention": false,
        "isAdmin": true,
        "bosId": 480392,
        "accountId": null,
        "creater": 5,
        "updater": 5,
        "createTime": 1444627451000,
        "updateTime": 1467364927000,
        "isAttention": null,
        "stores": null,
        "bosVip": {
          "id": 480392,
          "cardNo": "1826157596601",
          "oldVip": null,
          "password": "1826157596601",
          "vipTypeId": 6,
          "customerId": 3088,
          "storeId": 7195,
          "employeeId": null,
          "customerUpId": 176,
          "openCardDate": 20160630,
          "validDate": 20990105,
          "idNo": "465510766955049711",
          "vipName": null,
          "vipEname": null,
          "birthMonth": "1",
          "age": 30,
          "sex": "W",
          "creditRemain": 0,
          "birthDay": 19860101,
          "integral": null,
          "country": null,
          "provinceId": 399,
          "cityId": 197,
          "areaId": 362,
          "address": null,
          "post": null,
          "phone": null,
          "mobile": "18261575966",
          "email": null,
          "wechat": null,
          "deliveryAddress": null,
          "imgUrl1": null,
          "imgUrl2": null,
          "imgUrl3": null,
          "o2oImgUrl1": null,
          "o2oImgUrl2": null,
          "o2oImgUrl3": null,
          "isActive": "Y",
          "vipAccount": null,
          "store": null,
          "vipType": null
        }
      });
      return defer.promise();
    } else {
      return userDefer.promise();
    }
  }

  function reloadUrl(){
    console.log("reloadUrl")
    var index=location.href.indexOf("zzh");
    var end=location.href.indexOf("wjj");
    var newHref="#"+location.href.substring(location.href.indexOf("zzh")+3,location.href.indexOf("wjj"));
    if(index>0&&end>0){
      console.log(newHref)
      //newHref=decodeURI(newHref)
      newHref=newHref.replace("_","&")
      console.log(newHref)
      console.log('http://' + location.host + location.pathname+newHref)
      location.href='http://' + location.host + location.pathname+newHref;
    }
    console.log(newHref)
  }
  // reloadUrl();
  function redirectAndGetCode() {
    document.body.style.display="none"
    var dist= window.location.hash.substring(2,window.location.hash.indexOf("?"));
    var state="dist+"+dist+"_";
    var hashObj=getSearchObject();
    for(var obj in hashObj){
       state+=obj+"+"+hashObj[obj]+"_"
    }
    console.log(state)
    //http://laravel.hcsoo.com/index.html?#/investorDetail?id=8&investType=1
    //location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx0952e81967686150&redirect_uri=' + encodeURI('http://' + location.host + location.pathname+myHash) + '&response_type=code&scope=snsapi_userinfo&state=xgabcd';
    location.href= 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx0952e81967686150&redirect_uri=' + encodeURI('http://' + location.host + location.pathname) + '&response_type=code&scope=snsapi_userinfo&state='+state;
  }
})();

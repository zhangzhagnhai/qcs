/**
 * Created by Administrator on 2017/7/25.
 */
import wx from 'weixin-js-sdk'
//import '../js/jquery.min.js';
import {host,strToJson} from '../../assets/js/util'
(function () {
  //var url = window.location.href;
  var url = [
    location.protocol,
    '//',
    location.host,
    location.pathname,
    location.search
  ]
  url=location.href.split('#')[0]
  var defer = $.Deferred();
  var getCode=false;
  var bid=-1
  $.getJSON(host+"/wx/wxApi", {url: url}).then(function (response) {
    var data = strToJson(response.config);
    console.log(data)
    var wxConfig = {
      debug: false,
      appId: data.appId,
      timestamp: data.timestamp,
      nonceStr: data.nonceStr,
      signature: data.signature,
      jsApiList: [
        'onMenuShareTimeline',
        'onMenuShareAppMessage',
        'chooseWXPay'
      ]
    };

    wx.error(function(res){
      console.log(res)
    });

    console.log(wx);
    console.log(wxConfig);
    wx.config(wxConfig);

    getCode=true;
    //alert(JSON.stringify(response))
  }).fail(function (err) {
    //alert(JSON.stringify(err));
    //alert('获取签名失败,无法调用微信接口.');
  });

  var timer=setInterval(function(){
    if(localStorage.getItem('userId')){
      $.getJSON(host+"/bole/boleInfo").then(function (response) {
        bid=response.id;
        // _this.userInfo.hasRelationship=2
        _this.$emit("loading",false);
      })
      clearInterval(timer)
    }
  },100)

  var setShare=function(data){
    console.log(data.href)
    if(getCode==false||bid==-1){
      setTimeout(function(){
        setShare(data);
      },10000)
      return;
    }
    data.href+="&BLId="+bid
    //var href=window.location.href.substr(0,window.location.href.indexOf('?'));
    wx.ready(function () {
      wx.onMenuShareTimeline({
        title: data.title, // 分享标题
        link: data.href, // 分享链接
        imgUrl: data.imgUrl, // 分享图标
        success: function () {
          // 用户确认分享后执行的回调函数
        },
        cancel: function () {
          // 用户取消分享后执行的回调函数
        }
      });

      wx.onMenuShareAppMessage({
        title: data.title, // 分享标题
        desc: data.desc, // 分享描述
        link: data.href, // 分享链接
        imgUrl: data.imgUrl, // 分享图标
        success: function () {
          // 用户确认分享后执行的回调函数
        },
        cancel: function () {
          // 用户取消分享后执行的回调函数
        }
      });
    })

  }

  window.JSDK = {
    wx: wx,
    setShare:setShare
  };
})();


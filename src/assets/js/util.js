/**
 * Created by Administrator on 2017/7/26.
 */
var host='http://laravel.hcsoo.com/api';
host='https://www.hcsoo.com/api'
host='http://6620da8d.ngrok.io/api'
 //host='http://192.168.1.108:8081/api'
//host='http://192.168.1.117:8081/api'
var shareHref='https://www.hcsoo.com/mp/index.html'
var strToJson=function(str){
  var json = eval('(' + str + ')');
  return json;
}
//http://laravel.hcsoo.com/api/wx/wxApi

var toPrice=function (num) {
  var num = (num || 0).toString();
  var result = '';
  while (num.length > 3) {
    result = ',' + num.slice(-3) + result;
    num = num.slice(0, num.length - 3);
  }
  if (num) { result = num + result; }
  return result;
}
export {host,shareHref,strToJson,toPrice}

